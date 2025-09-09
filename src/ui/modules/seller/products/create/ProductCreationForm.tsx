"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { productService } from "@/services/productService";
import Image from "next/image";
import { Button } from "@/ui/design/button/button";
import { categoryService } from "@/services/categoryService";
import { FaTimes, FaPlus } from "react-icons/fa";
import { useStoreStore } from "@/store/storeStore";
import { useProductStore } from "@/store/productStore";

// On définit les types pour les champs du formulaire et les images
interface FormState {
  name: string;
  description: string;
  price: number;
  stock: number;
  images: ImageForm[];
  categoryId?: string;
}

interface ImageForm {
  url: string;
  altText?: string;
}

interface Category {
  id: string;
  name: string;
}

export default function ProductCreationForm() {
  const { store } = useStoreStore();
  const { authUser } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<FormState>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    images: [],
  });

  // Nouveaux états pour la gestion des catégories
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [newCategoryName, setNewCategoryName] = useState<string>("");

  // Charge les catégories existantes de la boutique de l'utilisateur
  useEffect(() => {
    const fetchCategories = async () => {
      if (store?.id) {
        try {
          const fetchedCategories =
            await categoryService.getCategoriesByStoreId(store.id);
          setCategories(fetchedCategories);
          if (fetchedCategories.length > 0) {
            setSelectedCategory(fetchedCategories[0].id);
          } else {
            setSelectedCategory("new");
          }
        } catch (error) {
          console.error("Erreur lors du chargement des catégories:", error);
          toast.error("Échec du chargement des catégories.");
        }
      }
    };
    fetchCategories();
  }, [authUser]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? parseFloat(value) : value,
    }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
        const res = data.newAvatarUrl;
        return res;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      console.log({ uploadedUrls });

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

      toast.success("Images uploadées avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'upload des images:", error);
      toast.error("Échec de l'upload des images.");
    } finally {
      setUploading(false);
    }
  };


  const removeImage = (index: number) => {
    setFormData((prev) => {
      const newImages = prev.images.filter((_, i) => i !== index);
      return { ...prev, images: newImages };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!authUser) {
      toast.error("Veuillez vous connecter pour créer un produit.");
      return;
    }
    if (!store) {
      toast.error("Vous devez avoir une boutique pour créer un produit.");
      return;
    }
    if (formData.images.length === 0) {
      toast.error("Veuillez uploader au moins une image.");
      return;
    }
    if (!selectedCategory || (selectedCategory === "new" && !newCategoryName)) {
      toast.error("Veuillez sélectionner ou créer une catégorie.");
      return;
    }

    setLoading(true);
    try {
      let finalCategoryId = selectedCategory;
      const payloadCategory = {
        name: newCategoryName,
        storeId: store.id,
      };

      if (selectedCategory === "new") {
        const newCategory = await categoryService.createCategory(
          payloadCategory
        );
        finalCategoryId = newCategory.id;
      }

      const payload = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        stock: formData.stock,
        storeId: store.id,
        categoryId: finalCategoryId,
        images: formData.images.map((image) => ({
          url: image.url,
          altText: image.altText || formData.name,
        })),
      };

      const newProduct = await productService.createProduct(payload);
      useProductStore.getState().addProduct(newProduct);
      toast.success("Produit créé avec succès !");
      router.push("/seller/product");
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        const errorMessage =
          (axiosError.response.data as any)?.message ||
          "Échec de la création du produit.";
        if (Array.isArray(errorMessage)) {
          toast.error(errorMessage.join(", "));
        } else {
          toast.error(errorMessage);
        }
      } else if (axiosError.request) {
        toast.error(
          "Impossible de se connecter au serveur. Vérifiez votre connexion."
        );
      } else {
        toast.error("Une erreur inattendue est survenue.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Créer un nouveau produit</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        {/* Champs de base */}
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

        {/* Section Catégorie */}
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-gray-700 font-bold mb-2"
          >
            Catégorie
          </label>
          <select
            id="category"
            name="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          >
            {categories.length > 0 ? (
              <>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
                <option value="new">-- Créer une nouvelle catégorie --</option>
              </>
            ) : (
              <option value="new">Créer une nouvelle catégorie</option>
            )}
          </select>
        </div>

        {/* Champ pour la nouvelle catégorie, visible uniquement si "new" est sélectionné */}
        {selectedCategory === "new" && (
          <div className="mb-4">
            <label
              htmlFor="newCategoryName"
              className="block text-gray-700 font-bold mb-2"
            >
              Nom de la nouvelle catégorie
            </label>
            <input
              type="text"
              id="newCategoryName"
              name="newCategoryName"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              required={selectedCategory === "new"}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        )}

        {/* Section de gestion des images avec le nouveau modèle */}
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-4">Images</h3>
          <div className="flex flex-wrap items-center gap-4">
            {formData.images.map((image, index) => (
              <div
                key={index}
                className="relative w-24 h-24 border rounded-md overflow-hidden group"
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
            <label className="flex items-center justify-center w-24 h-24 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-green-500 transition-colors">
              <FaPlus className="text-gray-400" />
              <input
                type="file"
                multiple
                onChange={handleImageChange}
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
          disabled={loading || uploading || formData.images.length === 0}
        >
          {loading ? "Création en cours..." : "Créer le produit"}
        </Button>
      </form>
    </div>
  );
}
