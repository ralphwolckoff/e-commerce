import { EditIcon } from "@/components/icons";
import { useAuth } from "@/context/AuthContext";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import { EditPersonalInfoModal, PersonalInfo } from "../edit/edit-personal-infoModal";
import { AuthService } from "@/services/authService";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { useToggle } from "@/hooks/use-toggle";
import { useImageStore } from "@/store/imageStore";


export const PersonalInformationSection = () => {
   const { value: isLoading, setValue: setIsLoading } = useToggle({
     initial: false,
   });
  const [showPersonalModal, setShowPersonalModal] = useState(false);
  const {authUser} = useAuth()
  const {profile} = useAuthStore()
  const onEditPersonal = () => {
    setShowPersonalModal(true);
  };
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<PersonalInfo>();

  const onSubmit: SubmitHandler<PersonalInfo> = async (newInfo) => {
    const photoUrl = useImageStore.getState().userAvatarUrl

    try {
      if (!authUser) {
        toast.error("Veuillez vous connecter d'abord.");
        return;
      }

      if (profile) {
        // Créer un objet pour stocker les champs qui ont changé
        const updatedFields: Partial<PersonalInfo> = {};

        if (newInfo.firstName !== profile.firstName) {
          updatedFields.firstName = newInfo.firstName;
        }
        if (newInfo.lastName !== profile.lastName) {
          updatedFields.lastName = newInfo.lastName;
        }
        if (newInfo.phoneNumber !== profile.phoneNumber) {
          updatedFields.phoneNumber = newInfo.phoneNumber;
        }
        if (newInfo.bio !== profile.bio) {
          updatedFields.bio = newInfo.bio;
        }
        if (newInfo.photoUrl !== profile.photoUrl) {
          updatedFields.photoUrl = newInfo.photoUrl;
        }
      
        // Vérifier s'il y a des champs à mettre à jour
        if (Object.keys(updatedFields).length > 0) {
          const phone = Number(newInfo.phoneNumber)

          const updateData = {
            ...updatedFields,
            phoneNumber: phone,
            photoUrl: photoUrl,
          };
          const updatedProfile = await AuthService.createUserProfile(
            authUser.id,
            updateData as PersonalInfo
          );
          if (updatedProfile) {
            toast.success(
              "Informations personnelles mises à jour avec succès !"
            );
            setShowPersonalModal(false);
          }
        } else {
          // Informer l'utilisateur qu'aucune modification n'a été faite

          toast.info("Aucune modification détectée.");
          setShowPersonalModal(false);
        }
      }else{
        const phone = Number(newInfo.phoneNumber);

        const updateData = {
          ...newInfo,
          phoneNumber: phone,
          photoUrl: photoUrl,
        };
        const updatedProfile = await AuthService.createUserProfile(
          authUser.id,
          updateData as PersonalInfo
        );
        if (updatedProfile) {
          toast.success("Informations personnelles mises à jour avec succès !");
          setShowPersonalModal(false);
        }
      }
    } catch (error) {
      console.log("echec de l'opération", error);
    }
  };

  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-auto">
      <div className="flex justify-between items-center gap-9 mb-4">
        <h2 className="text-xl font-bold text-gray-900">
          Informations personnelles
        </h2>
        <button
          onClick={onEditPersonal}
          className="flex items-center space-x-1 text-gray-500 hover:text-gray-700"
        >
          <EditIcon className="w-4 h-4" />
          <span className="text-sm">Modifier</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
        <div>
          <h4 className="text-xs text-gray-500 uppercase font-semibold">
            Prénom
          </h4>
          <p className="text-base text-gray-800">{profile?.lastName}</p>
        </div>
        <div>
          <h4 className="text-xs text-gray-500 uppercase font-semibold">Nom</h4>
          <p className="text-base text-gray-800">{profile?.firstName}</p>
        </div>
        <div>
          <h4 className="text-xs text-gray-500 uppercase font-semibold">
            Adresse email
          </h4>
          <p className="text-base text-gray-800">{authUser?.email}</p>
        </div>
        <div>
          <h4 className="text-xs text-gray-500 uppercase font-semibold">
            Téléphone
          </h4>
          <p className="text-base text-gray-800">{profile?.phoneNumber}</p>
        </div>
        <div className="md:col-span-2">
          <h4 className="text-xs text-gray-500 uppercase font-semibold">Bio</h4>
          <p className="text-base text-gray-800">{profile?.bio}</p>
        </div>
      </div>

      <EditPersonalInfoModal
        isOpen={showPersonalModal}
        form={{
          errors,
          register,
          handleSubmit,
          onSubmit,
          isLoading,
        }}
        onClose={() => setShowPersonalModal(false)}
      />
    </div>
  );
}
