
import { UserLayout } from "@/components/layout/user-layout";
import { Seo } from "@/components/seo/Seo";
import OrderManagementPage from "@/ui/modules/client/orders";

export default function Page() {

  return (
    <>
      <Seo title="mon compte" description="account" />
      <UserLayout withSidebar pageTitle="Mon Compte">
        <OrderManagementPage />
      </UserLayout>
    </>
  );
}
