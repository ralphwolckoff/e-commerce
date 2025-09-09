"use client";

import api from "@/services/api";
import { useAuthStore } from "@/store/authStore";
import { FormsType } from "@/types/form";
import { Button } from "@/ui/design/button/button";
import { Input } from "@/ui/design/forms/input";
import { useEffect, useState } from "react";

interface Props {
  form: FormsType;
}

export const UpdateUserProfileForm = ({ form }: Props) => {
  const { onSubmit, register, errors, isLoading, handleSubmit } = form;  
  const {profile} = useAuthStore()

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto pt-8 pb-5 w-2xl space-y-4"
    >
      <div className="flex items-center justify-between">
        <Input
          label="FirstName"
          isLoading={isLoading}
          type="text"
          placeholder={profile?.firstName || "Nom"}
          register={register}
          errors={errors}
          required={false}
          errorMsg="tu dois renseigner ce champ"
          id="firstName"
        />
        <Input
          label="LastName"
          isLoading={isLoading}
          type="text"
          placeholder={profile?.lastName || "Prenom"}
          register={register}
          errors={errors}
          required={false}
          errorMsg="tu dois renseigner ce champ"
          id="lastName"
        />
      </div>
      <Input
        label="Phone number"
        isLoading={isLoading}
        type="number"
        placeholder={"Telephone"}
        register={register}
        errors={errors}
        required={false}
        errorMsg="tu dois renseigner ce champ"
        id="phone"
      />
      <Input
        label="Address"
        isLoading={isLoading}
        type="text"
        placeholder={profile?.address || "Votre addresse"}
        register={register}
        errors={errors}
        required={false}
        errorMsg="tu dois renseigner ce champ"
        id="address"
      />
      <Input
        label="City"
        isLoading={isLoading}
        type="text"
        placeholder={profile?.city || "Votre ville"}
        register={register}
        errors={errors}
        required={false}
        errorMsg="tu dois renseigner ce champ"
        id="city"
      />
      <Input
        label="Country"
        isLoading={isLoading}
        type="text"
        placeholder={profile?.country || "Votre pays"}
        register={register}
        errors={errors}
        required={false}
        errorMsg="tu dois renseigner ce champ"
        id="country"
      />

      <div className="md:col-span-2 mt-4">
        <Button
          isLoading={isLoading}
          type="submit"
          className=" text-white px-8 py-3 rounded-md font-semibold  transition duration-300 shadow-md"
        >
          Update Changes
        </Button>
      </div>
    </form>
  );
};
