"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { AuthService } from "@/services/authService";
import { ForgetPasswordFormType } from "@/types/form";
import { AxiosError } from "axios";



export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);

  // Utilisation de react-hook-form pour gérer le formulaire
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordFormType>();

  // Fonction de soumission du formulaire
  const onSubmit: SubmitHandler<ForgetPasswordFormType> = async (formData) => {
    setIsLoading(true);
    try {
      // Appel au service backend pour demander la réinitialisation
      await AuthService.requestPasswordReset(formData);
      toast.success(
        "Si votre e-mail est dans notre système, un lien de réinitialisation a été envoyé."
      );
    } catch (error) {
      const AxiosError = error as AxiosError
      if (AxiosError.response) {
        
      }
      console.error("Erreur lors de la demande de réinitialisation:", error);
      toast.error(
        "Une erreur est survenue. Veuillez vérifier votre e-mail et réessayer."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-md px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-6">
        Mot de passe oublié ?
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Entrez votre adresse e-mail pour recevoir un lien de réinitialisation.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md"
      >
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Adresse E-mail
          </label>
          <input
            id="email"
            type="email"
            {...register("email", { required: "L'e-mail est requis." })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-800 transition duration-300 disabled:opacity-50"
        >
          {isLoading ? "Envoi en cours..." : "Envoyer le lien"}
        </button>
      </form>
    </div>
  );
}
