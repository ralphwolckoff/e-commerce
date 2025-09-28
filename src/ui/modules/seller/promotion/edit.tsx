import { Promotion } from "@/types/promotion";
import React from "react";

interface PromotionEditFormProps {
  editedPromo: Promotion;
  onSave: () => void;
  onCancel: () => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  validationError: string | null; // NOUVEAU: pour afficher l'erreur de validation
}

/**
 * Formulaire d'édition d'une promotion.
 */
const PromotionEditForm: React.FC<PromotionEditFormProps> = ({
  editedPromo,
  onSave,
  onCancel,
  onChange,
  validationError,
}) => {
  const formatDeadline = (dateString: string) => {
    return dateString ? dateString.substring(0, 16) : "";
  };

  const inputClass =
    "mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500";

  return (
    <div className="space-y-4">
      {/* Message d'erreur de validation */}
      {validationError && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm"
          role="alert"
        >
          <strong className="font-bold">Erreur: </strong>
          <span className="block sm:inline">{validationError}</span>
        </div>
      )}

      {/* Champs d'édition */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Titre du Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Titre
          </label>
          <input
            type="text"
            name="messageTitle"
            value={editedPromo.message?.messageTitle || ""}
            onChange={onChange}
            className={inputClass}
            required
          />
        </div>
        {/* Nom du Produit */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Produit
          </label>
          <input
            type="text"
            name="productName"
            value={editedPromo.productName || ""}
            onChange={onChange}
            className={inputClass}
            required
          />
        </div>
      </div>

      {/* Contenu du Message */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Contenu
        </label>
        <textarea
          name="messageContent"
          value={editedPromo.message?.messageContent || ""}
          onChange={onChange}
          rows={3}
          className={inputClass}
          required
        ></textarea>
      </div>

      {/* Date limite */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Date limite
        </label>
        <input
          type="datetime-local"
          name="deadline"
          value={formatDeadline(editedPromo.deadline)}
          onChange={onChange}
          className={inputClass}
          required
        />
      </div>

      {/* Boutons d'action */}
      <div className="flex justify-end space-x-2 mt-6">
        <button
          type="button"
          onClick={onSave}
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition disabled:opacity-50"
        >
          Sauvegarder
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 transition"
        >
          Annuler
        </button>
      </div>
    </div>
  );
};

export default PromotionEditForm;
