import { UserLayout } from "@/components/layout/user-layout";
import { Seo } from "@/components/seo/Seo";
import CartPage from "../../components/cart/cart";

export default function Page() {
  return (
    <>
      <Seo title="Shop Online | mon compte" description="account" />
      <UserLayout withSidebar pageTitle="Mon panier">
        <CartPage />
      </UserLayout>
    </>
  );
}
