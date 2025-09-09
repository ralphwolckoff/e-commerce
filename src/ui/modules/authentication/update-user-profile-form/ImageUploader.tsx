"use client";

import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/authStore";

// La prop onUploadSuccess accepte maintenant un objet File
interface ImageUploaderProps {
  onUploadSuccess: (file: File) => void;
  isLoading: boolean;
}

export default function ImageUploader({
  onUploadSuccess,
  isLoading,
}: ImageUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<string>("");
  const [compressedSize, setCompressedSize] = useState<string>("");
  const [isCompressing, setIsCompressing] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setOriginalSize(`${(file.size / (1024 * 1024)).toFixed(2)} MB`);
      setCompressedSize("");
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
      setOriginalSize("");
      setCompressedSize("");
    }
  };

  const handleCompressionAndSend = async () => {
    if (!selectedFile) {
      toast.error("Veuillez d'abord sélectionner une image.");
      return;
    }
    setIsCompressing(true);

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
      useWebWorker: true,
      fileType: "image/jpeg",
      quality: 0.8,
    };

    try {
      const compressedFile = await imageCompression(selectedFile, options);
      setCompressedSize(
        `${(compressedFile.size / (1024 * 1024)).toFixed(2)} MB`
      );
      onUploadSuccess(compressedFile);
    } catch (error) {
      console.error("Échec de la compression de l'image:", error);
      toast.error("Échec de la compression de l'image.");
    } finally {
      setIsCompressing(false);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <label
          htmlFor="profile-image-input"
          className="block text-gray-700 font-medium mb-2"
        >
          Sélectionnez une nouvelle photo de profil :
        </label>
        <input
          type="file"
          id="profile-image-input"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        />
      </div>

      {previewUrl && (
        <div className="flex flex-col items-center mb-6">
          <h3 className="text-lg font-semibold mb-2">Aperçu de l'image :</h3>
          <div className="relative w-32 h-32 rounded-full overflow-hidden border border-gray-300 shadow-sm mb-2">
            <img
              src={previewUrl}
              alt="Profile Preview"
              className="object-cover w-full h-full"
            />
          </div>
          <p className="text-sm text-gray-600">Original: {originalSize}</p>
          {compressedSize && (
            <p className="text-sm text-gray-600">Compressé: {compressedSize}</p>
          )}
        </div>
      )}

      <div className="flex justify-end space-x-3">
        <button
          onClick={handleCompressionAndSend}
          disabled={!selectedFile || isCompressing || isLoading}
          className="bg-green-700 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-800 transition duration-300 disabled:opacity-50"
        >
          {isCompressing
            ? "Compression..."
            : isLoading
            ? "Téléversement..."
            : "Téléverser l'image"}
        </button>
      </div>
    </div>
  );
}
