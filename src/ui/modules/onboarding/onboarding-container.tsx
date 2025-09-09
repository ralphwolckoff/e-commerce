import { useState } from "react";
import { OnboardingView } from "./onboarding-view";
import { onboardingStepListInterface } from "@/types/onboarding-step-list";
import { WelcomeStep } from "./components/steps/welcome-step/welcome-step";
import { ProfileStep } from "./components/steps/profile-step/profile-step";
import { AvatarStep } from "./components/steps/avatar-step/avatar-step";
import { FinalStep } from "./components/steps/final-step/final-step";

export const OnboardingContainer = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const stepList: onboardingStepListInterface[] = [
    {
      id: 1,
      label: "Bienvenue",
      component: { step: WelcomeStep },
    },
    {
      id: 2,
      label: "Boutique",
      component: { step: ProfileStep },
    },
    {
      id: 3,
      label: "Logo",
      component: { step: AvatarStep },
    },
    {
      id: 4,
      label: "Last Step",
      component: { step: FinalStep },
    },
  ];

  const getCurrentStep = () => {
    return stepList.find((el) => el.id === currentStep);
  };

  const next = () => {
    if (currentStep < stepList.length) {
      setCurrentStep(currentStep + 1);
    }
  };
  const prev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isFirstStep = () => {
    if (currentStep === 1) {
      return true;
    }
    return false;
  };

  const isFinalStep = () => {
    if (currentStep === stepList.length) {
      return true;
    }
    return false;
  };

  return (
    <OnboardingView
      getCurrentStep={getCurrentStep}
      next={next}
      prev={prev}
      isFirstStep={isFirstStep}
      isFinalStep={isFinalStep}
      stepList={stepList}
    />
  );
};
