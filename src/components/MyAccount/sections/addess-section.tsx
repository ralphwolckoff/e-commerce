import { EditIcon } from "@/components/icons";
import { addressService } from "@/services/addressService";
import { useAddressStore } from "@/store/addressStore";
import { Address } from "@/types/address";
import { toast } from "react-toastify";
import { EditAddressModal } from "../edit/edit-adressModal";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Typography } from "@/ui/design/typography/Typography";
import { useToggle } from "@/hooks/use-toggle";
import { SubmitHandler, useForm } from "react-hook-form";

export const AddressSection = () => {
  const [showAddressModal, setShowAddressModal] = useState(false);
    const { address, fetchAddress } = useAddressStore();
  const { authUser } = useAuth();
  const { value: isLoading, setValue: setIsLoading } = useToggle({
     initial: false,
   });
   const {
       handleSubmit,
       formState: { errors },
       register,
     } = useForm<Address>();

  const onEditAddress = () => {
    setShowAddressModal(true); 
  };

  const onSubmit: SubmitHandler<Address> = async (newAddress) => {
    try {
      if (!authUser) {
        toast.error("Veuillez vous connecter d'abord.");
        return;
      }
      const updatedAddress = await addressService.createOrUpdateAddress(
        newAddress
      );
      if (updatedAddress) {
        toast.success("Adresse mise à jour avec succès !");
      }
    } catch (error) {
      console.log("echec de l'opération", error);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, [fetchAddress]);

  


  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Adresse</h2>
        <button
          onClick={onEditAddress}
          className="flex items-center space-x-1 text-gray-500 hover:text-gray-700"
        >
          <EditIcon className="w-4 h-4" />
          <span className="text-sm">Modifier</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
        <div className="space-y-2">
          <Typography
            variant="caption3"
            component="h4"
            theme="gray"
            className="uppercase"
          >
            Rue
          </Typography>
          <Typography variant="body-base" component="p" theme="primary">
            {address?.street}
          </Typography>
        </div>
        <div className="space-y-2">
          <Typography
            variant="caption3"
            component="h4"
            theme="gray"
            className="uppercase"
          >
            Ville
          </Typography>
          <Typography variant="body-base" component="p" theme="gray">
            {address?.city}
          </Typography>
        </div>
        <div className="space-y-2">
          <Typography
            variant="caption3"
            component="h4"
            theme="gray"
            className="uppercase"
          >
            État
          </Typography>
          <Typography variant="body-base" component="p" theme="gray">
            {address?.state}
          </Typography>
        </div>
        <div className="space-y-2">
          <Typography
            variant="caption3"
            component="h4"
            theme="gray"
            className="uppercase"
          >
            Code postal
          </Typography>
          <Typography variant="body-base" component="p" theme="gray">
            {address?.zipCode}
          </Typography>
        </div>
      </div>

      <EditAddressModal
        isOpen={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        form={{
          errors,
          register,
          handleSubmit,
          onSubmit,
          isLoading,
        }}
        
      />
    </div>
  );};
