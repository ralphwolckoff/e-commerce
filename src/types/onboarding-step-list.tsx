export interface BaseComponentProps {
    next: ()=> void;
    prev: () => void;
    isFirstStep: () => boolean;
    isFinalStep: () => boolean;
    stepList: onboardingStepListInterface[];
    getCurrentStep: () => onboardingStepListInterface | undefined;
  }

export interface onboardingStepListInterface{
    id : number
    label: string
    component:{
        step: React.ComponentType<BaseComponentProps>
    }
}