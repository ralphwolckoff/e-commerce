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
        placeholder="john Doe"
        defaultValue={store?.name}
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
        placeholder="123 Rue de Akwa-Douala"
        defaultValue={store?.address}
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
        placeholder="Indique une courte description de toi..."
        defaultValue={store?.description}
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
