// import { Promotion } from "@/types/promotion";

// const mockPromotions: Promotion[] = [
//   {
//     id: "promo-1",
//     productName: "Ordinateur portable UltraMax",
//     message: {
//       title: "Offre Spéciale : 20% de réduction !",
//       content:
//         "Profitez d'une offre exclusive sur le dernier ordinateur portable pour booster votre productivité. L'offre se termine bientôt, alors ne perdez pas de temps !",
//     },
//     discountPercentage: 20,
//     finalPrice: 1279.99,
//     deadline: "2025-10-01T23:59:59",
//     storeId: "store-1",
//     store: {
//       id: "store-1",
//       name: "TechStore",
//       address: "123 Rue de la Technologie, Paris",
//     },
//     createdAt: "2025-09-01T10:00:00",
//     updatedAt: "2025-09-15T16:30:00",
//   },
//   {
//     id: "promo-2",
//     productName: "Casque audio HyperBass",
//     message: {
//       title: "Prix Choc sur le casque HyperBass !",
//       content:
//         "Plongez dans une qualité de son exceptionnelle avec ce casque en promotion. C'est le moment idéal pour mettre à jour votre équipement audio.",
//     },
//     discountPercentage: 15,
//     finalPrice: 127.49,
//     deadline: "2025-10-05T12:00:00",
//     storeId: "store-2",
//     store: {
//       id: "store-2",
//       name: "AudioWorld",
//       address: "456 Avenue du Son, Lyon",
//     },
//     createdAt: "2025-09-05T09:00:00",
//     updatedAt: "2025-09-20T14:45:00",
//   }
// ];

// const mockProducts = [
//   {
//     id: "1",
//     name: "Ordinateur portable UltraMax",
//     description:
//       "Le summum de la technologie pour les professionnels exigeants.",
//     price: 1599.99,
//     images: [{ url: "https://placehold.co/400x400/EBF6FF/3F4E5A?text=Laptop" }],
//   },
//   {
//     id: "2",
//     name: "Casque audio HyperBass",
//     description: "Plongez dans un son immersif avec une qualité studio.",
//     price: 149.99,
//     images: [{ url: "https://placehold.co/400x400/EBF6FF/3F4E5A?text=Casque" }],
//   },
//   {
//     id: "3",
//     name: "Montre connectée SmartFit",
//     description: "Suivez votre santé et restez connecté en toute élégance.",
//     price: 249.99,
//     images: [{ url: "https://placehold.co/400x400/EBF6FF/3F4E5A?text=Montre" }],
//   },
//   {
//     id: "4",
//     name: "Clavier mécanique ProGamer",
//     description: "Réactivité et précision pour une expérience de jeu inégalée.",
//     price: 89.99,
//     images: [
//       { url: "https://placehold.co/400x400/EBF6FF/3F4E5A?text=Clavier" },
//     ],
//   },
//   {
//     id: "5",
//     name: "Souris ergonomique Flow",
//     description: "Confort ultime pour des heures de travail sans fatigue.",
//     price: 59.99,
//     images: [{ url: "https://placehold.co/400x400/EBF6FF/3F4E5A?text=Souris" }],
//   },
// ];


"use client";

import promotionService from "@/services/promotionService";
import { Promotion } from "@/types/promotion";
import React, { useEffect, useState } from "react";

// Données fictives de promotions pour cet exemple
// Dans une application réelle, cela viendrait d'une base de données.

const PromotionList = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [editingPromoId, setEditingPromoId] = useState<string | null>(null);
  const [editedPromo, setEditedPromo] = useState<Promotion>({} as Promotion);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        setLoading(true);
        const data = await promotionService.findAll();
        setPromotions(data);
      } catch (error) {
        console.error("Failed to fetch promotions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPromotions();
  }, [loading]);

  if (loading) return <div>Chargement des promotions...</div>;

  const handleEditClick = (promo: Promotion) => {
    setEditingPromoId(promo.id);
    setEditedPromo({ ...promo });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "title" || name === "content") {
      setEditedPromo((prev) => ({
        ...prev,
        message: { ...prev.message, [name]: value },
      }));
    } else {
      setEditedPromo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    if (
      !editedPromo.productName ||
      !editedPromo.message.messageTitle ||
      !editedPromo.message.messageContent ||
      !editedPromo.deadline
    ) {
      alert("Veuillez remplir tous les champs."); // Utiliser une modale personnalisée dans une vraie application
      return;
    }

    setPromotions(
      promotions.map((p) => (p.id === editedPromo.id ? editedPromo : p))
    );
    setEditingPromoId(null);
  };

  // Annule l'édition
  const handleCancel = () => {
    setEditingPromoId(null);
  };

  // Gère la suppression d'une promotion
  const handleDelete = (id: string) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cette promotion ?")
    ) {
      // Utiliser une modale personnalisée
      setPromotions(promotions.filter((promo) => promo.id !== id));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8 space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Gérer les Promotions
        </h1>

        <div className="space-y-6">
          {promotions.length > 0 ? (
            promotions.map((promo) => (
              <div key={promo.id} className="p-6 bg-gray-50 rounded-lg shadow">
                {editingPromoId === promo.id ? (
                  // Mode d'édition
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Titre
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={editedPromo.message.messageTitle}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Produit
                        </label>
                        <input
                          type="text"
                          name="productName"
                          value={editedPromo.productName}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Contenu
                      </label>
                      <textarea
                        name="content"
                        value={editedPromo.message.messageContent}
                        onChange={handleChange}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Date limite
                      </label>
                      <input
                        type="datetime-local"
                        name="deadline"
                        value={editedPromo.deadline.substring(0, 16)}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      />
                    </div>
                    <div className="flex justify-end space-x-2 mt-4">
                      <button
                        type="button"
                        onClick={handleSave}
                        className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                      >
                        Sauvegarder
                      </button>
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300"
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                ) : (
                  // Mode d'affichage
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {promo.message.messageTitle}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        Pour le produit : {promo.productName}
                      </p>
                      <p className="mt-2 text-sm text-gray-500">
                        {promo.message.messageContent}
                      </p>
                      <p className="mt-2 text-sm text-gray-500 font-medium">
                        Date limite :{" "}
                        {new Date(promo.deadline).toLocaleDateString()} à{" "}
                        {new Date(promo.deadline).toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="flex space-x-2 mt-2 md:mt-0">
                      <button
                        onClick={() => handleEditClick(promo)}
                        className="p-2 rounded-md text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(promo.id)}
                        className="p-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              Aucune promotion à afficher pour le moment.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromotionList;
