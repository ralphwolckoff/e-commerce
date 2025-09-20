
"use client";

import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import { UploadIcon } from "@/components/icons";
import { useImageStore } from "@/store/imageStore";
import { FormsType } from "@/types/form";
import { Input } from "@/ui/design/forms/input";
import { Textarea } from "@/ui/design/forms/textarea";
import { Button } from "@/ui/design/button/button";
import { useAuthStore } from "@/store/authStore";
import { Modal } from "@/ui/modules/seller/orders/modal";

// On définit les types pour les champs du formulaire et les images
export interface PersonalInfo {
  firstName?: string;
  lastName?: string;
  phoneNumber?: number;
  bio?: string;
  photoUrl?: string | null;
  email?: string;
}


interface EditPersonalModalProps {
  isOpen: boolean;
  form: FormsType;
  onClose: () => void;
}

export const EditPersonalInfoModal = ({
  isOpen,
  form,
  onClose,
}: EditPersonalModalProps) => {
  const { onSubmit, register, errors, isLoading, handleSubmit } = form;
  const {profile} = useAuthStore()

  const [previewImage, setPreviewImage] = useState<string | null>( null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropzoneRef = useRef<HTMLDivElement>(null);
  const { authUser } = useAuth();

  // Gère la sélection de fichier via le bouton de navigation
  const handleFileBrowse = () => {
    if (!uploading) {
      fileInputRef.current?.click();
    }
  };

  const handleUploadImage = async (file: File) => {
    if (!authUser?.id) {
      toast.error("Utilisateur non authentifié.");
      return;
    }

    setUploading(true);
    try {
      // Prévisualisation de l'image immédiatement après la sélection
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string || profile?.photoUrl as string);
      };
      reader.readAsDataURL(file);

      // Création du FormData pour l'upload
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);
      uploadFormData.append("userId", authUser.id);

      const response = await fetch("/api/upload-avatar", {
        method: "POST",
        body: uploadFormData,
      });

      if (!response.ok) {
        throw new Error("Échec du téléversement de l'image.");
      }

      const data = await response.json();
      const newAvatarUrl = data.newAvatarUrl;
      useImageStore.getState().setUserAvatar(newAvatarUrl);
    } catch (error) {
      console.error("Erreur lors du téléversement de l'image:", error);
      setPreviewImage(typeof previewImage === "string" ? previewImage : null);
    } finally {
      setUploading(false);
    }
  };

  // Logique du glisser-déposer (Drag and Drop)
  useEffect(() => {
    const dropzone = dropzoneRef.current;
    if (!dropzone) return;

    // Empêche le comportement par défaut du navigateur
    const preventDefaults = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e: DragEvent) => {
      preventDefaults(e);
      if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
        handleUploadImage(e.dataTransfer.files[0]);
      }
      dropzone.classList.remove("border-indigo-600");
    };

    const handleDragOver = (e: DragEvent) => {
      preventDefaults(e);
      dropzone.classList.add("border-indigo-600");
    };

    const handleDragLeave = (e: DragEvent) => {
      preventDefaults(e);
      dropzone.classList.remove("border-indigo-600");
    };

    dropzone.addEventListener("dragover", handleDragOver);
    dropzone.addEventListener("dragleave", handleDragLeave);
    dropzone.addEventListener("drop", handleDrop);

    return () => {
      dropzone.removeEventListener("dragover", handleDragOver);
      dropzone.removeEventListener("dragleave", handleDragLeave);
      dropzone.removeEventListener("drop", handleDrop);
    };
  }, [handleUploadImage]);

    


  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      // title="Modifier les informations personnelles"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {
        <Input
          label="Nom :"
          isLoading={isLoading}
          type="text"
          placeholder="Votre nom"
          defaultValue={profile?.firstName}
          register={register}
          errors={errors}
          errorMsg="tu dois renseigner ce champ"
          id="firstName"
          className="p-2"
        />}
        <Input
          label="Prenom"
          isLoading={isLoading}
          type="text"
          placeholder="Votre prénom"
          defaultValue={profile?.lastName}
          register={register}
          errors={errors}
          errorMsg="tu dois renseigner ce champ"
          id="lastName"
          className="p-2"
        />
        <Input
          label="Telephone"
          isLoading={isLoading}
          type="number"
          placeholder="Téléphone"
          defaultValue={String(profile?.phoneNumber)}
          register={register}
          errors={errors}
          errorMsg="tu dois renseigner ce champ"
          id="phoneNumber"
          className="p-2"
        />
        <Textarea
          label="Biographie"
          isLoading={isLoading}
          row={3}
          placeholder="Petite description de vous"
          defaultValue={profile?.bio || ""}
          register={register}
          errors={errors}
          errorMsg="tu dois renseigner ce champ"
          id="bio"
        />

        {/* Section pour l'image de profil */}
        <div className="pt-4">
          <label className="block text-sm font-medium text-gray-700">
            Photo de profil
          </label>
          { profile?.photoUrl && <div className="mt-2 flex flex-col items-center justify-center space-y-2">
              <img
                src={profile.photoUrl}
                alt="Aperçu de la photo de profil"
                className="w-32 h-32 rounded-full object-cover"
              />
            </div>}
          {previewImage ? (
            <div className="mt-2 flex flex-col items-center justify-center space-y-2">
              <img
                src={previewImage}
                alt="Aperçu de la photo de profil"
                className="w-32 h-32 rounded-full object-cover"
              />
              <Button
                type="button"
                size="very-small"
                className="text-sm text-red-600 hover:text-red-500"
                action={() => setPreviewImage(null)}
              >
                Supprimer l'image
              </Button>
            </div>
          ) : (
            <div
              ref={dropzoneRef}
              className={`mt-2 flex flex-col items-center justify-center p-6 border-2 border-gray-300 border-dashed rounded-lg transition-colors ${
                uploading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <UploadIcon className="w-12 h-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                {uploading
                  ? "Téléversement en cours..."
                  : "Glissez & Déposez vos fichiers ici"}
              </h3>
              <p className="mt-1 text-sm text-center text-gray-500">
                Glissez et déposez vos images PNG, JPG, WebP, SVG ici ou
              </p>
              <Button
                type="button"
                size="very-small"
                action={handleFileBrowse}
                disabled={isLoading}
              >
                Parcourir les fichiers
              </Button>
              
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleUploadImage(file);
                }}
                accept="image/png, image/jpeg, image/webp, image/svg+xml"
                disabled={isLoading}
              />
            </div>
          )}
        </div>

        {/* Boutons d'action */}
        <div className="flex justify-end space-x-2 pt-4">
          <Button
            type="button"
            size="small"
            action={onClose}
            variant="outline"
            isLoading={uploading}
          >
            Annuler
          </Button>
          <Button size="small" type="submit" isLoading={isLoading}>
            Enregistrer
          </Button>
        </div>
      </form>
    </Modal>
  );
};
