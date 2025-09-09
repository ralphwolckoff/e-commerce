import { SubmitHandler, useForm } from "react-hook-form";
import { ForgetPasswordView } from "./forget-password.view";
import { useState } from "react";
import { ForgetPasswordFormType } from "@/types/form";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useToggle } from "@/hooks/use-toggle";

export const ForgetpasswordContainer = () => {
  const { value: isLoading, setValue: setIsLoading } = useToggle();
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<ForgetPasswordFormType>();

  const handlResetPassword = async ({ email }: ForgetPasswordFormType) => {
   
    toast.success(`Un email a ete envoye a ${email}`);
    setIsLoading(false);
    reset();
    router.push("/connexion");
  };
  const onSubmit: SubmitHandler<ForgetPasswordFormType> = async (formData) => {
    setIsLoading(true);
    handlResetPassword(formData);
  };
  return (
    <ForgetPasswordView
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
