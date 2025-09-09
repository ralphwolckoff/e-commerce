import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterView } from "./register.view";
import { RegisterFormType } from "@/types/form";
import { toast } from "react-toastify";
import { useToggle } from "@/hooks/use-toggle";
import { useRouter } from "next/router";
import z from "zod";
import api from "@/services/api";
import { Role } from "@/common/role.enum";
import { AxiosError } from "axios";
import { AuthService } from "@/services/authService";

export const RegisterContainer = () => {
  const router = useRouter();
  const { value: isLoading, setValue: setIsLoading } = useToggle({
    initial: false,
  });
  const {
    handleSubmit,
    formState: { errors },
    register,
    setError,
    reset,
  } = useForm<RegisterFormType>();

  const handleCreateUserAuthentication = async ({
      email,
      password,
      role
    
  }: RegisterFormType) => {
    try {
      const formData = {  email, password, role };
      await AuthService.registers(formData);
      toast.success("inscription reussi");
      
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response) {
        const errorMessage =
          (axiosError.response.data as any)?.message ||
          "Une erreur est survenue lors de l'inscription.";
        if (Array.isArray(errorMessage)) {
          toast.error(errorMessage.join(", "));
        } else {
          toast.error(errorMessage);
        }
      } else if (axiosError.request) {
        toast.error(
          "Impossible de se connecter au serveur. Vérifiez votre connexion."
        );
      } else {
        toast.error("Une erreur inattendue est survenue.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit: SubmitHandler<RegisterFormType> = async (formData) => {
    setIsLoading(true);
    handleCreateUserAuthentication(formData);
  };

  return (
    <>
      <RegisterView
        form={{
          errors,
          register,
          handleSubmit,
          onSubmit,
          isLoading,
        }}
      />
    </>
  );
};
