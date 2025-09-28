
import { UserLayout } from "@/components/layout/user-layout";
import { Seo } from "@/components/seo/Seo";
import ClientDashboardPage from "@/ui/modules/client/client-dashbord/client-dashbord";

export default function Page() {

  return (
    <>
      <Seo title="Shop Online | mon compte" description="account" />
      <UserLayout withSidebar pageTitle="Mon Compte">
        <ClientDashboardPage />
      </UserLayout>
    </>
  );
}
