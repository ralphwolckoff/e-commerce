"use client";

import { useAuth } from "@/context/AuthContext";
import promotionService from "@/services/promotionService";
import { Promotion } from "@/types/promotion";
import React, { useEffect, useState, useCallback } from "react";
import PromotionEditForm from "./edit";
import { useStoreStore } from "@/store/storeStore";
import { usePromotionStore } from "@/store/promotionStore";
import ConfirmationModal from "./modal";
// Note: Le composant 'Modale' de "@/components/cart/cart" a été retiré car il était inutilisé
// et remplacé par ConfirmationModal pour la suppression.

const PromotionList = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [editingPromoId, setEditingPromoId] = useState<string | null>(null);
  const [editedPromo, setEditedPromo] = useState<Promotion>({} as Promotion);
  const [loading, setLoading] = useState(true);

  // NOUVEAUX ÉTATS pour la modale de suppression et les erreurs
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [promoToDeleteId, setPromoToDeleteId] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const { authUser } = useAuth();
  const { store } = useStoreStore(); // Utilisation du store pour l'ID du magasin

  const fetchPromotions = useCallback(async () => {
    try {
      if (!store?.id) return;

      setLoading(true);
      const data = await promotionService.findByStoreId(store.id);
      usePromotionStore.getState().setPromotions(data);
      setPromotions(data);
    } catch (error) {
      console.error("Failed to fetch promotions:", error);
    } finally {
      setLoading(false);
    }
  }, [store?.id]);

  useEffect(() => {
    fetchPromotions();
  }, [fetchPromotions]);

  if (loading)
    return (
      <div className="p-8 text-center text-xl font-medium">
        Chargement des promotions...
      </div>
    );

  // --- GESTION DES ÉVÉNEMENTS DU FORMULAIRE ---

  const handleEditClick = (promo: Promotion) => {
    setValidationError(null); // Réinitialiser l'erreur
    setEditingPromoId(promo.id);
    setEditedPromo({ ...promo });
  };

  const handleCancel = () => {
    setEditingPromoId(null);
    setValidationError(null); // Réinitialiser l'erreur
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValidationError(null); // Effacer l'erreur lors de la saisie

    if (name === "messageTitle" || name === "messageContent") {
      setEditedPromo((prev) => ({
        ...prev,
        message: { ...prev.message, [name]: value },
      }));
    } else {
      setEditedPromo((prev) => ({ ...prev, [name]: value }));
    }
  };

  // --- LOGIQUE CRUD (Sauvegarde) ---

  const handleSave = async () => {
    setValidationError(null); // Réinitialiser l'erreur au début de la sauvegarde

    // 1. Validation (remplace alert)
    if (
      !editedPromo.productName ||
      !editedPromo.message?.messageTitle ||
      !editedPromo.message?.messageContent ||
      !editedPromo.deadline
    ) {
      setValidationError(
        "Veuillez remplir tous les champs obligatoires avant de sauvegarder."
      );
      return;
    }

    try {
      // 2. Préparation du DTO de mise à jour (UpdatePromotionDto)
      const updateDto = {
        productName: editedPromo.productName,
        deadline: editedPromo.deadline,
        message: {
          messageTitle: editedPromo.message.messageTitle,
          messageContent: editedPromo.message.messageContent,
        },
      };

      // 3. Appel API
      const updatedData = await promotionService.update(
        editedPromo.id,
        updateDto
      );

      // 4. Mise à jour de l'état local et du store Zustand
      setPromotions((prevPromotions) =>
        prevPromotions.map((p) => (p.id === updatedData.id ? updatedData : p))
      );
      usePromotionStore.getState().updatePromotion(updatedData);
      setEditingPromoId(null); // Quitte le mode d'édition
    } catch (error) {
      console.error("Failed to save promotion:", error);
      setValidationError(
        "Erreur lors de la sauvegarde de la promotion. Veuillez vérifier votre connexion."
      ); // Remplace alert
    }
  };

  // --- LOGIQUE DE SUPPRESSION (avec Modale) ---

  // Ouvre la modale (remplace window.confirm)
  const handleDelete = (id: string) => {
    setPromoToDeleteId(id);
    setShowDeleteModal(true);
  };

  // Exécute la suppression après confirmation
  const handleConfirmDelete = async () => {
    if (!promoToDeleteId) {
      setShowDeleteModal(false);
      return;
    }

    try {
      // 1. Appel API de suppression
      await promotionService.remove(promoToDeleteId);

      // 2. Mise à jour de l'état local et du store Zustand
      setPromotions(promotions.filter((promo) => promo.id !== promoToDeleteId));
      usePromotionStore.getState().deletePromotion(promoToDeleteId);
    } catch (error) {
      console.error("Failed to delete promotion:", error);
      // Gérer l'erreur de suppression ici (ex: définir une erreur visible)
    } finally {
      // 3. Fermeture de la modale
      setShowDeleteModal(false);
      setPromoToDeleteId(null);
    }
  };

  // Annule la suppression
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setPromoToDeleteId(null);
  };

  // --- RENDU ---

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8 space-y-8">
        <h1 className="text-2xl font-bold text-gray-800 border-b pb-4">
          Gestion des Promotions de la Boutique
        </h1>
        <div className="space-y-6">
          {promotions.length > 0 ? (
            promotions.map((promo) => (
              <div
                key={promo.id}
                className="p-6 bg-gray-50 rounded-lg shadow border border-gray-100 transition duration-300 hover:shadow-lg"
              >
                {editingPromoId === promo.id ? (
                  <PromotionEditForm
                    editedPromo={editedPromo}
                    onSave={handleSave}
                    onCancel={handleCancel}
                    onChange={handleChange}
                    validationError={validationError} // Passage de l'erreur
                  />
                ) : (
                  // Mode d'affichage
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0 pr-4">
                      <h3 className="text-xl font-semibold text-gray-900 truncate">
                        {promo.message.messageTitle}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        Produit :{" "}
                        <span className="font-medium">{promo.productName}</span>
                      </p>
                      <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                        {promo.message.messageContent}
                      </p>
                      <p className="mt-2 text-sm text-blue-600 font-semibold">
                        Date limite :{" "}
                        {new Date(promo.deadline).toLocaleDateString()} à{" "}
                        {new Date(promo.deadline).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <div className="flex space-x-2 mt-1 md:mt-0 flex-shrink-0">
                      <button
                        onClick={() => handleEditClick(promo)}
                        className="py-2 px-3 rounded-md text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 transition shadow-sm"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(promo.id)}
                        className="py-2 px-3 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition shadow-sm"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 p-8 text-lg bg-gray-50 rounded-lg border">
              Aucune promotion à afficher pour le moment.
            </p>
          )}
        </div>
      </div>

      {/* Modale de Confirmation de Suppression */}
      <ConfirmationModal
        title="Confirmer la suppression"
        message="Êtes-vous sûr de vouloir supprimer définitivement cette promotion ? Cette action est irréversible et retirera la promotion de tous les utilisateurs."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        show={showDeleteModal}
      /> 
    </div>
  );
};

export default PromotionList;
