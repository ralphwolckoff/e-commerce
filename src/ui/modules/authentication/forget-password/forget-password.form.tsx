"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { AuthService } from "@/services/authService";
import { ResetPasswordFormType } from "@/types/form";



export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { token } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues, 
  } = useForm<ResetPasswordFormType>();

  const onSubmit: SubmitHandler<ResetPasswordFormType> = async (formData) => {
    if (!token || Array.isArray(token)) {
      toast.error("Jeton de réinitialisation invalide.");
      return;
    }

    setIsLoading(true);
    try {
      await AuthService.resetPassword(token as string, formData);
      toast.success("Votre mot de passe a été réinitialisé avec succès !");
      router.push("/login"); 
    } catch (error) {
      console.error("Erreur lors de la réinitialisation:", error);
      toast.error("Le jeton est invalide ou a expiré. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-md px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-6">
        Réinitialiser votre mot de passe
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Entrez et confirmez votre nouveau mot de passe.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md"
      >
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Nouveau mot de passe
          </label>
          <input
            id="password"
            type="password"
            {...register("password", {
              required: "Le mot de passe est requis.",
              minLength: {
                value: 6,
                message: "Le mot de passe doit contenir au moins 6 caractères.",
              },
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
          {errors.password && (
            <p className="mt-2 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Confirmer le mot de passe
          </label>
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword", {
              required: "Veuillez confirmer le mot de passe.",
              validate: (value) =>
                value === getValues("password") ||
                "Les mots de passe ne correspondent pas.",
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
          {errors.confirmPassword && (
            <p className="mt-2 text-sm text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-800 transition duration-300 disabled:opacity-50"
        >
          {isLoading
            ? "Réinitialisation en cours..."
            : "Réinitialiser le mot de passe"}
        </button>
      </form>
    </div>
  );
}
