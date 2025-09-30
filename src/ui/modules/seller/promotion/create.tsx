"use client";

import promotionService from "@/services/promotionService";
import { useProductStore } from "@/store/productStore";
import { useStoreStore } from "@/store/storeStore";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

const PromotionCreator = () => {
  const { vendorProducts } = useProductStore();
  const {store} = useStoreStore()
  const [selectedProduct, setSelectedProduct] = useState(vendorProducts[0]);
  const [discount, setDiscount] = useState(0);
  const [newPrice, setNewPrice] = useState(selectedProduct?.price || 0);
  const [message, setMessage] = useState({ title: "", content: "" });
  const [deadline, setDeadline] = useState("");
const router = useRouter();

  // Fonction pour calculer le nouveau prix après réduction
  const calculateNewPrice = (originalPrice: number, discountPercentage: number) => {
      const reduction = originalPrice * (discountPercentage / 100);
      return (originalPrice - reduction).toFixed(2);
    };

  useEffect(() => {
    if (selectedProduct) {
      const price = calculateNewPrice(selectedProduct.price, discount);
      setNewPrice(Number(price));
    }
  }, [selectedProduct, discount]);

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Math.min(100, Number(e.target.value)));
    setDiscount(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedProduct || !deadline || !message.title || !message.content) {
      console.error("Veuillez remplir tous les champs.");
      return;
    }
 if (store) {
   const storeId = store.id;
   const payload = {
     productName: selectedProduct.name,
     discountPercentage: Number(discount),
     finalPrice: Number(newPrice),
     deadline,
     storeId,
     message: {
       messageTitle: message.title,
       messageContent: message.content,
     },
   };
    try {     

      const promotion = await promotionService.create(payload);
      router.push('/mon-espace/promotions');
      console.log("Nouvelle promotion créée :", promotion);
    } catch (error) {
      console.error("Erreur lors de la création de la promotion :", error);
    }
  } else {
   console.error("Utilisateur non authentifié ou magasin introuvable.");
 }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8 space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Créer une nouvelle promotion
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="product-select"
              className="block text-sm font-medium text-gray-700"
            >
              Sélectionner un produit
            </label>
            <select
              id="product-select"
              value={selectedProduct?.id}
              onChange={(e) => {
                const product = vendorProducts.find(
                  (p) => p.id === e.target.value
                );
                if (product) {
                  setSelectedProduct(product);
                }
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              {vendorProducts.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Message publicitaire
            </h2>
            <label
              htmlFor="promo-title"
              className="block text-sm font-medium text-gray-700"
            >
              Titre de la promotion
            </label>
            <input
              id="promo-title"
              type="text"
              value={message.title}
              onChange={(e) =>
                setMessage({ ...message, title: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Ex: Offre Spéciale ! -20%"
              required
            />
            <label
              htmlFor="promo-content"
              className="mt-4 block text-sm font-medium text-gray-700"
            >
              Contenu du message
            </label>
            <textarea
              id="promo-content"
              value={message.content}
              onChange={(e) =>
                setMessage({ ...message, content: e.target.value })
              }
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Décrivez l'offre en quelques mots."
              required
            ></textarea>
          </div>

          {/* Zone de prix et réduction */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="discount"
                className="block text-sm font-medium text-gray-700"
              >
                Pourcentage de réduction (%)
              </label>
              <input
                id="discount"
                type="number"
                min="0"
                max="100"
                value={discount}
                onChange={handleDiscountChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <p className="block text-sm font-medium text-gray-700">
                Prix original :{" "}
                <span className="font-semibold">{selectedProduct?.price} €</span>
              </p>
              <p className="block text-sm font-medium text-gray-700">
                Nouveau prix :{" "}
                <span className="font-bold text-lg text-green-600">
                  {newPrice} €
                </span>
              </p>
            </div>
          </div>

          {/* Zone de la date limite */}
          <div>
            <label
              htmlFor="deadline"
              className="block text-sm font-medium text-gray-700"
            >
              Date et heure de fin de la promotion
            </label>
            <input
              id="deadline"
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Bouton de soumission */}
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Créer la promotion
          </button>
        </form>
      </div>
    </div>
  );
};

export default PromotionCreator;
