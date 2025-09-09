import { UserLayout } from "@/components/layout/user-layout";
import { Seo } from "@/components/seo/Seo";
import CartPage from "./cart";

export default function Page() {
  return (
    <>
      <Seo title="mon compte" description="account" />
      <UserLayout withSidebar pageTitle="Mes commandes">
        <CartPage />
      </UserLayout>
    </>
  );
}
