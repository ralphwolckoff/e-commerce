import { BaseComponentProps } from "@/types/onboarding-step-list";
import { OnboardingFooter } from "../../footer/onboarding-footer";
import { OnboardingTabs } from "../../tabs/onboarding-tabs";
import { Container } from "@/components/container/container";
import { ProfileStepForm } from "./profile-step-form";
import { SubmitHandler, useForm } from "react-hook-form";
import { OnboardingFormFeildType } from "@/types/form";
import { useToggle } from "@/hooks/use-toggle";
import { Typography } from "@/ui/design/typography/Typography";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { storeService } from "@/services/storeService";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useStoreStore } from "@/store/storeStore";

export const ProfileStep = ({
  next,
  prev,
  isFirstStep,
  isFinalStep,
  stepList,
  getCurrentStep,
}: BaseComponentProps) => {
  const { authUser } = useAuth();
  const { value: isLoading, setValue: setLoading } = useToggle();
  const { store } = useStoreStore();

 



  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
    reset,
  } = useForm<OnboardingFormFeildType>();

  const handleUpdateUserDocument = async (
    FormData: OnboardingFormFeildType
  ) => {
    if (authUser) {
      try {
        setLoading(true);
          const newStore = await storeService.createStore(FormData);
          useStoreStore.setState({ store: newStore });
          toast.success("Boutique créée avec succès !")

        setLoading(false);
        reset();
        next();
      } catch (error) {
        const axiosError = error as AxiosError;
        console.error(
          "Erreur lors de la création de la boutique:",
          axiosError.message
        );
        if (axiosError.response?.status === 409) {
          toast.error("Vous avez déjà créé une boutique.");
        } else {
          toast.error(
            "Échec de la création de la boutique. Veuillez réessayer."
          );
        }
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("vous n'est pas connecté. Veuillez vous connecter.");
      setLoading(false);
    }
  };

  const onSubmit: SubmitHandler<OnboardingFormFeildType> = async (formData) => {
    setLoading(true);
    if (!store) {
      handleUpdateUserDocument(formData);      
    }else{
      if (formData.name === "" && formData.address === "" && formData.description === "") {
        return
      }
      await storeService.updateStore(store.id, formData)
    }
    setLoading(false);
    next();
  };

  return (
    <div className="relative h-screen pb-[91px]">
      <Image
        src={"/assets/imgs/pexels-lloyd.jpg"}
        alt="toop"
        width={1920}
        height={1080}
        className="fixed -z-10 overflow-hidden"
      />
      <div className="h-full overflow-auto">
        <div className="p-10">
          <OnboardingTabs tabs={stepList} getCurrentStep={getCurrentStep} />
        </div>
        <Container className="grid h-full grid-cols-12">
          <div className="relative z-10 flex items-center h-full col-span-6 py-10">
            <div className="w-full space-y-5 pb-4.5">
              <Typography variant="h1" component="h1" theme="gray">
                Présentation de la boutique !
              </Typography>
              <Typography variant="body-base" component="p" theme="gray">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consectetur voluptatem facilis asperiores quia nobis facere
                maxime deserunt laborum ullam. Enim consequuntur ea quia, veniam
                delectus maxime minus at, laudantium maiores optio vel
              </Typography>
            </div>
          </div>
          <div className="flex items-center h-full col-span-6">
            <div className="flex justify-end w-full">
              <ProfileStepForm
                form={{
                  errors,
                  control,
                  register,
                  handleSubmit,
                  onSubmit,
                  isLoading,
                }}
              />
            </div>
          </div>
        </Container>
      </div>
      <OnboardingFooter
        prev={prev}
        next={handleSubmit(onSubmit)}
        isFirstStep={isFirstStep}
        isFinalStep={isFinalStep}
        isLoading={isLoading}
      />
    </div>
  );
};
