import CheckoutPage from "@/components/checkout";
import { UserLayout } from "@/components/layout/user-layout";
import { Seo } from "@/components/seo/Seo";

export default function Page() {
  return (
    <>
      <Seo title="mon compte" description="account" />
      <UserLayout withSidebar pageTitle="Paiement">
        <CheckoutPage />
      </UserLayout>
    </>
  );
}
