
import { UserLayout } from "@/components/layout/user-layout";
import { Seo } from "@/components/seo/Seo";
import ProductEditPage from "@/ui/modules/seller/products/edit/[id]";
import React from "react";

export default function Page() {

  return (
    <>
      <Seo title="mon espace" description="account" />

      <UserLayout withSidebar pageTitle="Edit Product">
        <ProductEditPage />
      </UserLayout>
    </>
  );
}
