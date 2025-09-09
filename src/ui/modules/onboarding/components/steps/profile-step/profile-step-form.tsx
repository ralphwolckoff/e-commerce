import { useStoreStore } from "@/store/storeStore";
import { FormsType } from "@/types/form";
import { Input } from "@/ui/design/forms/input";
import { Textarea } from "@/ui/design/forms/textarea";

interface Props {
  form: FormsType;
}

export const ProfileStepForm = ({ form }: Props) => {
  const {store} = useStoreStore();
  const { register, errors, isLoading } = form;
  return (
    <form className="w-full max-w-md space-y-4">
      <Input
        label="Nom de la boutique"
        isLoading={isLoading}
        placeholder={store?.name || "john Doe"}
        type="text"
        register={register}
        errors={errors}
        errorMsg="Tu dois renseigner ce champ"
        id="name"
        required={false}
      />
      <Input
        label="Adresse de Localisation"
        isLoading={isLoading}
        placeholder={store?.address || "123 Rue de Akwa-Douala"}
        type="text"
        register={register}
        errors={errors}
        errorMsg="Tu dois renseigner ce champ"
        id="address"
        required={false}
      />
      <Textarea
        label="Description"
        isLoading={isLoading}
        placeholder={store?.description || "Indique une courte description de toi..."}
        row={5}
        register={register}
        errors={errors}
        errorMsg="Tu dois renseigner ce champ"
        id="description"
        required={false}
      />
    </form>
  );
};
