import { Seo } from "@/components/seo/Seo";
import { Session } from "@/components/session/session";
import { GUEST } from "@/lib/session-status";
import ResetPasswordPage from "@/ui/modules/authentication/forget-password/forget-password.form";

export default function Register() {
  return (
    <Session sessionStatus={GUEST}>
      <Seo
        title="Shop Online | Réinitialisation de mot de passe"
        description="Page d'inscription"
      />
      <ResetPasswordPage />
    </Session>
  );
}
