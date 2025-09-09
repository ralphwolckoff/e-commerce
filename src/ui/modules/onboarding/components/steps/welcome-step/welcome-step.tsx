import { BaseComponentProps } from "@/types/onboarding-step-list";
import { OnboardingFooter } from "../../footer/onboarding-footer";
import { Typography } from "@/ui/design/typography/Typography";
import { RiCheckboxCircleLine } from "react-icons/ri";
import { useAuthStore } from "@/store/authStore";
import Image from "next/image";
export const WelcomeStep = ({
  next,
  isFirstStep,
  isFinalStep,
  stepList,
  getCurrentStep,
}: BaseComponentProps) => {
  const { profile } = useAuthStore();

  return (
    <div className="relative h-screen w-full flex items-center justify-center pb-17 px-7">
      <Image
        src={"/assets/imgs/pexels-lloyd.jpg"}
        alt="toop"
        width={1920}
        height={1080}
        className="fixed -z-10 overflow-hidden"
      />
      <div className="grid grid-cols-1 relative w-full h-full ">
        <div className="absolute bottom-0 rounded-lg bg-primary-800/80 w-[90%] h-[60%]">
          <div className="m-4">
            <div className="flex items-center mb-8">
              <Image
                src="/assets/logo/logo-light.png"
                alt="Logo"
                width={40}
                height={40}
                className="mr-2"
              />
              <span className="text-xl font-bold">Mon Entreprise</span>
            </div>
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold mb-2">
                Bienvenue, {profile?.firstName} !
              </h1>
              <p className="text-gray-300">
                Commençons la configuration de votre boutique.
              </p>
            </div>
          </div>
          <Image
            src="/assets/countdown/countdown-bg.png"
            alt="bg shapes"
            className="hidden sm:block absolute right-0 bottom-0 z-10"
            fill
          />
        </div>
        <div className="absolute right-0 w-[40%] mr-10 h-[50%] z-10 overflow-hidden transform translate-y-10 translate-x-10  ">
          <div className="flex flex-col items-center gap-6 p-6">
            <div>
              <Typography variant="lead" theme="secondary" component="div" className="font-bold">
                Avoir le pouvoir sur votre Boutique
              </Typography>
              <Typography variant="lead" component="div">
                {" "}
              </Typography>
            </div>
            <div className="space-y-3">
              <ListPoint>Modeliser votre boutique a votre convenance</ListPoint>
              <ListPoint>Creer et poster des produits de vos marques</ListPoint>
              <ListPoint>
                Suiver les commandes de vos clients et les tenir informer de
                leur évolution
              </ListPoint>
            </div>
          </div>
          <Image
            src="/assets/shapes/newsletter-bg.jpg"
            alt="background illustration"
            className="fixed -z-1  left-0 top-0 rounded-lg shadow-xl"
            fill
          />
        </div>
      </div>
      <OnboardingFooter
        next={next}
        isFirstStep={isFirstStep}
        isFinalStep={isFinalStep}
      />
    </div>
  );
};

interface Props {
  children: React.ReactNode;
}
const ListPoint = ({ children }: Props) => {
  return (
    <div className="flex items-start gap-2">
      <RiCheckboxCircleLine size={24} className="mt-1 text-secondary" />
      <Typography variant="body-lg" component="span" theme="white">
        {children}
      </Typography>
    </div>
  );
};
