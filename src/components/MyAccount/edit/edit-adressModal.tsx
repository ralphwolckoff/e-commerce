import { Modal } from "../modal";
import { Address } from "@/types/address";
import { Input } from "@/ui/design/forms/input";
import { FormsType } from "@/types/form";
import { Button } from "@/ui/design/button/button";

interface EditAddressModalProps {
  isOpen: boolean;
  form: FormsType;
  onClose: () => void;
  onSave: (address: Address) => void;
  initialData: Address;
}

export const EditAddressModal = ({
  isOpen,
  form,
  onClose,
  initialData,
}: EditAddressModalProps) => {
  const { onSubmit, register, errors, isLoading, handleSubmit } = form;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Modifier l'adresse">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Rue :"
          isLoading={isLoading}
          type="text"
          placeholder={initialData.street || "Votre nom"}
          register={register}
          errors={errors}
          errorMsg="tu dois renseigner ce champ"
          id="street"
        />
        <Input
          label="Ville :"
          isLoading={isLoading}
          type="text"
          placeholder={initialData.city || "Votre nom"}
          register={register}
          errors={errors}
          errorMsg="tu dois renseigner ce champ"
          id="city"
        />
        <Input
          label="Pays :"
          isLoading={isLoading}
          type="text"
          placeholder={initialData.state || "Votre nom"}
          register={register}
          errors={errors}
          errorMsg="tu dois renseigner ce champ"
          id="state"
        />
        <Input
          label="Code Postal :"
          isLoading={isLoading}
          type="text"
          placeholder={initialData.zipCode || "Votre nom"}
          register={register}
          errors={errors}
          errorMsg="tu dois renseigner ce champ"
          id="zipCode"
        />
        <div className="flex justify-end space-x-2 pt-4">
          <Button
            type="button"
            variant="outline"
            size="very-small"
            action={onClose}
          >
            Annuler
          </Button>
          <Button type="submit" size="very-small" isLoading={isLoading}>
            Enregistrer
          </Button>
        </div>
      </form>
    </Modal>
  );
};
