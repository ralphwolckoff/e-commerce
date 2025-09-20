import { Input } from "@/ui/design/forms/input";
import { FormsType } from "@/types/form";
import { Button } from "@/ui/design/button/button";
import { useAddressStore } from "@/store/addressStore";
import { Modal } from "@/ui/modules/seller/orders/modal";

interface EditAddressModalProps {
  isOpen: boolean;
  form: FormsType;
  onClose: () => void;
}

export const EditAddressModal = ({
  isOpen,
  form,
  onClose,
}: EditAddressModalProps) => {
  const {address} = useAddressStore()
  const { onSubmit, register, errors, isLoading, handleSubmit } = form;

  return (
    <Modal isOpen={isOpen} onClose={onClose} >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Rue :"
          isLoading={isLoading}
          type="text"
          placeholder="Votre nom"
          defaultValue={address?.street}
          register={register}
          errors={errors}
          errorMsg="tu dois renseigner ce champ"
          id="street"
        />
        <Input
          label="Ville :"
          isLoading={isLoading}
          type="text"
          placeholder="Votre nom"
          defaultValue={address?.city}
          register={register}
          errors={errors}
          errorMsg="tu dois renseigner ce champ"
          id="city"
        />
        <Input
          label="Pays :"
          isLoading={isLoading}
          type="text"
          placeholder="Votre nom"
          defaultValue={address?.state}
          register={register}
          errors={errors}
          errorMsg="tu dois renseigner ce champ"
          id="state"
        />
        <Input
          label="Code Postal :"
          isLoading={isLoading}
          type="text"
          placeholder="Votre nom"
          defaultValue={address?.zipCode}
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
