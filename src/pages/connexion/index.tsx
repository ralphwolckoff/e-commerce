import { Breadcrumbs } from "@/components/breadcrumbs/breadcrumbs";
import Footer from "@/components/navigation/footer";
import { Seo } from "@/components/seo/Seo";
import { Session } from "@/components/session/session";
import { GUEST } from "@/lib/session-status";
import { LoginContainer } from "@/ui/modules/authentication/login/login-container";

export default function Connexion() {
  return (
    <Session sessionStatus={GUEST}>
      <Seo title="Connexion" description="Page de connexion" />
      <Breadcrumbs />
      <LoginContainer />
      <Footer />
    </Session>
  );
}
