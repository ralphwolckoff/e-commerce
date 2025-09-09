import { UserLayout } from "@/components/layout/user-layout";
import { Seo } from "@/components/seo/Seo";
import ClientOrdersPage from "../../orders";

export default function Page() {
  return (
    <>
      <Seo title="mes commandes" description="les commandes" />
      <UserLayout withSidebar pageTitle="Mes Commandes ">
        <ClientOrdersPage />
      </UserLayout>
    </>
  );
}
