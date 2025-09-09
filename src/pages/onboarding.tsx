import { Seo } from "@/components/seo/Seo";
import { OnboardingContainer } from "@/ui/modules/onboarding/onboarding-container";

export default function Onboarding() {
  return (
    <>
      <Seo title="onboarding" description="Description de page onboarding" />
      <OnboardingContainer />
    </>
  );
}
