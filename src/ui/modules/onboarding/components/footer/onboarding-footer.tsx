import { Button } from "@/ui/design/button/button";
import clsx from "clsx";

interface Props {
  next?: () => void;
  prev?: () => void;
  isFirstStep?: () => boolean;
  isFinalStep?: () => boolean;
  isLoading?: boolean
}

export const OnboardingFooter = ({next,
    prev,
    isFirstStep,
    isFinalStep, isLoading}:Props) =>{
        let actionButtonTitle:string

        if (isFirstStep && isFirstStep()) {
            actionButtonTitle="Démarrer"
        }else if (isFinalStep && isFinalStep()) {
            actionButtonTitle="Terminer" 
        }else{
            actionButtonTitle="Continer"
        }
    return (
      <div className="absolute bottom-0 left-0 w-full p-1 bg-white/20 border-t border-gray-400">
        <div
          className={clsx(
            prev && !next && "justify-start",
            !prev && next && "justify-end",
            prev && next && "justify-between",
            "flex items-center gap-5"
          )}
        >
          {prev && (
            <Button
              disabled={isLoading}
              variant={!isLoading ? "outline" : "disabled"}
              action={prev}
            >
              Retour
            </Button>
          )}
          {next && (
            <Button isLoading={isLoading} action={next}>
              {actionButtonTitle}
            </Button>
          )}
        </div>
      </div>
    );
}