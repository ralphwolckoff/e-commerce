import { Seo } from "@/components/seo/Seo";
import { Session } from "@/components/session/session";
import { GUEST } from "@/lib/session-status";
import ForgotPasswordPage from "@/ui/modules/authentication/forget-password/forget-password.view";

export default function ForgetPassword() {
  return (
    <Session sessionStatus={GUEST}>
      <Seo
        title="Shop Online | Récupération de mot de passe"
        description="Récupération de mot de passe"
      />
      <ForgotPasswordPage />
    </Session>
  );
}
