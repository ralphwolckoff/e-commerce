import { SubmitHandler, useForm } from "react-hook-form";
import { LoginView } from "./login.view";
import { useState } from "react";
import { LoginFormType } from "@/types/form";
import { toast } from "react-toastify";
import z from "zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AxiosError } from "axios";
import { useAuthStore } from "@/store/authStore";
import { AuthService } from "@/services/authService"; // Importation du service

export const LoginContainer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // const callbackUrl = searchParams.get("callbackUrl") || "/";

  const callbackUrl = `${pathname}${
        searchParams.toString() ? "?" + searchParams.toString() : ""
      }`;

  const {
    handleSubmit,
    formState: { errors },
    register,
    setError,
    reset,
  } = useForm<LoginFormType>();

  const LoginShema = z.object({
    email: z.string(),
    password: z.string(),
  });

  const handleSignInUser = async ({ email, password }: LoginFormType) => {
    const formData = { email, password };
    try {
      const { access_token, user } = await AuthService.login(
        formData
      );
      console.log({user});
      useAuthStore.getState().setAuth(true, access_token, user);
      toast.success("Bienvenue à toi !");
      setIsLoading(false);
      reset();
      router.push(decodeURIComponent(callbackUrl));
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          "Échec de la connexion : " +
            (error.response?.data?.message || error.message)
        );
      } else {
        toast.error("Échec de la connexion. Veuillez réessayer.");
      }
      setIsLoading(false);
      reset();
    }
  };

  const onSubmit: SubmitHandler<LoginFormType> = async (formData) => {
    setIsLoading(true);
    const { password } = formData;
    if (password.length <= 7) {
      toast.error("Ton mot de passe doit comporter au moins 8 caractères");
      setIsLoading(false);
      return;
    }
    handleSignInUser(formData);
  };

  return (
    <LoginView
      form={{
        errors,
        register,
        handleSubmit,
        onSubmit,
        isLoading,
      }}
    />
  );
};
