import { BaseComponentProps } from "@/types/onboarding-step-list";


export const OnboardingView = ({next,
    prev,
    isFirstStep,
    isFinalStep,
    stepList,
    getCurrentStep}: BaseComponentProps) => {
        if (getCurrentStep()?.component) {
            
            const Component = getCurrentStep()?.component.step
            return (
                <div>
                    {
                        Component && (
                            <Component 
                            next= {next}
                            prev = {prev}
                            isFirstStep={isFirstStep}
                            isFinalStep= {isFinalStep}
                            stepList={stepList}
                            getCurrentStep= {getCurrentStep} />
                        )
                    }
                </div>
            );
        } 
        return null
};