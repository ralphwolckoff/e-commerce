
import { UserLayout } from "@/components/layout/user-layout";
import { Seo } from "@/components/seo/Seo";
import ProductCreationForm from "@/ui/modules/seller/products/create/ProductCreationForm";

export default function Page() {

  return (
    <>
      <Seo title="create product" description="creer un produit" />
      <UserLayout withSidebar pageTitle="Add New Product">
        <ProductCreationForm />
      </UserLayout>
    </>
  );
}
