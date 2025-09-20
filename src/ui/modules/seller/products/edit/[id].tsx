"use client";

import { useState, useEffect } from "react";
import { productService } from "@/services/productService";
import { toast } from "react-toastify";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/ui/design/button/button";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { FaTimes, FaPlus } from "react-icons/fa";

// Définition des types pour l'état du formulaire et les images
interface FormState {
  name: string;
  description: string;
  price: number;
  stock: number;
  images: ImageForm[];
}

interface ImageForm {
  id?: string;
  url: string;
  altText?: string;
}

export default function ProductEditPage() {
  const router = useRouter();
  const { id } = useParams();
  const productId = id as string;
  const { authUser } = useAuth();

  const [formData, setFormData] = useState<FormState>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    images: [],
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Effet pour charger les données du produit existant
  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      try {
        setLoading(true);
        const product = await productService.getProductById(productId);
        const productImages =
          product.images?.map((img: any) => ({
            id: img.id,
            url: img.url,
            altText: img.altText,
          })) ?? [];

        setFormData({
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          images: productImages,
        });
      } catch (error) {
        console.error("Erreur lors du chargement du produit:", error);
        toast.error("Échec du chargement du produit.");
        router.push("/mon-espace/dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId, router]);

  // Gère les changements dans les champs de texte et numériques
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    let newValue: string | number = value;
    if (name === "price" || name === "stock") {
      const parsedValue = parseFloat(value);
      newValue = isNaN(parsedValue) ? 0 : parsedValue;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  // Gère l'upload des fichiers dès leur sélection
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (!authUser || !authUser.id) {
      toast.error("Veuillez vous connecter pour uploader des images.");
      return;
    }

    setUploading(true);
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("userId", authUser.id);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Échec de l'upload de l'image.");
        }

        const data = await response.json();
        return data.newAvatarUrl;
      });

      const uploadedUrls = await Promise.all(uploadPromises);

      setFormData((prev) => {
        const newImages = [
          ...prev.images,
          ...uploadedUrls.map((url) => ({
            id: crypto.randomUUID(),
            url: url,
            altText: "",
          })),
        ];

        return { ...prev, images: newImages };
      });

    } catch (error) {
      console.error("Erreur lors de l'upload des images:", error);
      toast.error("Échec de l'upload des images.");
    } finally {
      setUploading(false);
    }
  };

  // Supprime une image du tableau
  const removeImage = async (index: number) => {
    const imageToDelete = formData.images[index];

    // Si l'image a un ID, cela signifie qu'elle est déjà sur le serveur et doit être supprimée du backend
    if (imageToDelete.id) {
      try {
        await productService.deleteImage(imageToDelete.id);
      } catch (error) {
        console.error(
          "Échec de la suppression de l'image sur le serveur:",
          error
        );
        toast.error("Échec de la suppression de l'image sur le serveur.");
      }
    }

    setFormData((prev) => {
      const newImages = prev.images.filter((_, i) => i !== index);
      return { ...prev, images: newImages };
    });
  };

  // Gère la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!authUser) {
      toast.error("Veuillez vous connecter.");
      return;
    }

    if (formData.images.length === 0) {
      toast.error("Veuillez uploader au moins une image.");
      return;
    }

    if (formData.price <= 0 || formData.stock <= 0) {
      toast.error("Le prix et le stock doivent être des nombres positifs.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        stock: formData.stock,
        images: formData.images.map((img) => ({
          id: img.id,
          url: img.url,
          altText: img.altText || formData.name,
        })),
      };

      await productService.updateProduct(productId, payload);

      router.push("/mon-espace/product");
    } catch (error) {
      console.error("Échec de la mise à jour du produit:", error);
      toast.error("Échec de la mise à jour du produit.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Chargement du produit...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Éditer le produit : {formData.name}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        {/* Champs de texte */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Nom du produit
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            rows={4}
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
            Prix (€)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="stock" className="block text-gray-700 font-bold mb-2">
            Stock
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        {/* Gestion des images */}
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-4">Images</h3>
          <div className="flex flex-wrap items-center gap-4">
            {formData.images.map((image, index) => (
              <div
                key={image.id || `temp-${index}`}
                className="relative w-36 h-36 border rounded-md overflow-hidden group"
              >
                <Image
                  src={image.url}
                  alt={image.altText || `Aperçu de l'image ${index + 1}`}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <FaTimes className="w-3 h-3" />
                </button>
              </div>
            ))}
            <label className="flex items-center justify-center w-36 h-36 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-green-500 transition-colors">
              <FaPlus className="text-gray-400" />
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                accept="image/*"
                disabled={uploading}
              />
            </label>
          </div>
          {uploading && (
            <p className="text-blue-500 mt-2">Upload en cours...</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={submitting || uploading || formData.images.length === 0}
        >
          {submitting ? "Mise à jour en cours..." : "Mettre à jour le produit"}
        </Button>
      </form>
    </div>
  );
}
