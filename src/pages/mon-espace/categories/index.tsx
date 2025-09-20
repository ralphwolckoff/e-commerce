import React from "react";
import { UserLayout } from "@/components/layout/user-layout";
import { Seo } from "@/components/seo/Seo";
import { CategoryIndex } from "@/ui/modules/seller/category";

export default function CategoryPage() {

  return (
    <>
      <Seo title="mon espace" description="account" />

      <UserLayout withSidebar pageTitle="Seller Page">
        <CategoryIndex />
      </UserLayout>
    </>
  );
}
