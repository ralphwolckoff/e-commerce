import { Role } from "@/common/role.enum";
import { FormsType } from "@/types/form";
import { Button } from "@/ui/design/button/button";
import { Input } from "@/ui/design/forms/input";
import { Select } from "@/ui/design/forms/select";

interface Props {
  form: FormsType;
}
export const RegisterForm = ({ form }: Props) => {
  const { onSubmit, register, errors, isLoading, handleSubmit } = form;
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
      <Input
        isLoading={isLoading}
        type="password"
        placeholder="Mot de passe"
        register={register}
        errors={errors}
        errorMsg="tu dois renseigner ce champ"
        id="password"
      />
      <div>
        <label
          htmlFor="role"
          className="block text-gray-700 text-sm font-bold mb-1"
        >
          Je suis un:
        </label>
        <Select
          isLoading={isLoading}
          id="role"
          register={register}
          errors={errors}
          errorMsg="tu dois renseigner ce champ"
        >
          <option value={Role.CLIENT}>Client</option>
          <option value={Role.VENDOR}>Vendeur</option>
        </Select>
      </div>

      <Button isLoading={isLoading} type="submit" fullWith>
        S'inscrire
      </Button>
    </form>
  );
};
