import { FormsType } from "@/types/form";
import { Button } from "@/ui/design/button/button";
import { Input } from "@/ui/design/forms/input";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface Props {
  form: FormsType;
}
export const LoginForm = ({ form }: Props) => {
  const { onSubmit, register, errors, isLoading, handleSubmit } = form;
  const [showPassword, setShowPassword] = useState(false);


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pt-8 pb-5 space-y-4">
      <Input
        isLoading={isLoading}
        type="email"
        placeholder="johndoe@gmail.com"
        register={register}
        errors={errors}
        errorMsg="tu dois renseigner ce champ"
        id="email"
      />
      <div className="relative">
        <Input
          isLoading={isLoading}
          type={showPassword ? "text": "password"}
          placeholder="Entre ton mot de passe"
          register={register}
          errors={errors}
          errorMsg="tu dois renseigner ce champ"
          id="password"
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute z-10 -translate-y-1/2 cursor-pointer right-4 top-1/2"
        >
          {showPassword ? (
            <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
          ) : (
            <EyeSlashIcon className="fill-gray-500 dark:fill-gray-400" />
          )}
        </span>
      </div>
      <Button isLoading={isLoading} type="submit" fullWith>
        Connexion
      </Button>
    </form>
  );
};
