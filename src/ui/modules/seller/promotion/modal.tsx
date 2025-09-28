import React from "react";

interface ConfirmationModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  show: boolean;
}

/**
 * Modale de confirmation réutilisable.
 */
const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
  show,
}) => {
  if (!show) return null;

  return (
    // Conteneur de la modale (arrière-plan sombre)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-70 backdrop-blur-sm transition-opacity p-4">
      {/* Fenêtre de la modale */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 transform transition-all duration-300">
        <h3 className="text-xl font-bold text-red-600 mb-4 border-b pb-2">
          {title}
        </h3>
        <p className="text-gray-700 mb-6">{message}</p>

        {/* Boutons d'action */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="py-2 px-4 rounded-lg text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 transition"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="py-2 px-4 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition shadow-md"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
