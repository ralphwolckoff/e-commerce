import { Breadcrumbs } from "@/components/breadcrumbs/breadcrumbs";
import Footer from "@/components/navigation/footer";
import { Seo } from "@/components/seo/Seo";
import { Session } from "@/components/session/session";
import { GUEST } from "@/lib/session-status";
import { RegisterContainer } from "@/ui/modules/authentication/register/register-container";

export default function Register() {
  return (
    <Session sessionStatus={GUEST}>
      <Seo title="Inscription" description="Page d'inscription" />
      <Breadcrumbs />
      <RegisterContainer />
      <Footer />
    </Session>
  );
}
