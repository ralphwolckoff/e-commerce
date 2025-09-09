import { EmailIcon, LocationIcon, WritingIcon } from "@/components/icons";
import MyAccount from "@/components/MyAccounts";
import StoreOnboarding from "@/components/onboarding";
import Orders from "@/components/Orders";
import { Seo } from "@/components/seo/Seo";
import { OnboardingContainer } from "@/ui/modules/onboarding/onboarding-container";
import { CategoryIndex } from "@/ui/modules/seller/category";
import App from "@/ui/modules/sellerDashbord";

export default function Onboarding() {
  return (
    <>
      <Seo title="onboarding" description="Description de page onboarding" />
      <OnboardingContainer />
    </>
  );
}
