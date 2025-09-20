import { useToggle } from "@/hooks/use-toggle";
import { BaseComponentProps } from "@/types/onboarding-step-list";
import { OnboardingFooter } from "../../footer/onboarding-footer";
import { Container } from "@/components/container/container";
import { Typography } from "@/ui/design/typography/Typography";
import { AuthService } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";


export const FinalStep = ({ isFinalStep }: BaseComponentProps) => {
  const { authUser } = useAuth();
  const { value: isLoading, toggle } = useToggle();
  const router = useRouter()


  const handleCloseOnboarding = async () => {
    toggle();
    if (authUser) {
      const update= await AuthService.updateUser(authUser.id, {
        onboardingIsCompleted: true,
      });
      if (update) {
        router.push("/mon-espace")
      }
    }
    toggle();
  };

  return (
    <>
      <div className="relative h-screen pb-[91px]">
        <div className="h-full overflow-auto">
          <Container className=" h-full ">
            <div className="relative z-10 flex items-center h-full py-10">
              <div className="w-full max-w-xl mx-auto space-y-5 pb-4.5">
                <div className="flex justify-center"></div>
                <Typography variant="h1" component="h1" className="text-center">
                  Félicitation
                </Typography>
                <Typography
                  variant="body-base"
                  component="p"
                  theme="gray"
                  className="text-center"
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consectetur voluptatem facilis asperiores quia nobis facere
                  maxime deserunt laborum ullam. Enim consequuntur ea quia,
                  veniam delectus maxime minus at, laudantium maiores optio vel
                </Typography>
              </div>
            </div>
          </Container>
        </div>
        <OnboardingFooter
          isFinalStep={isFinalStep}
          next={handleCloseOnboarding}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};
