import React from "react";
import { UserLayout } from "@/components/layout/user-layout";
import { Seo } from "@/components/seo/Seo";
import { Role } from "@/common/role.enum";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { CategoryIndex } from "@/ui/modules/seller/category";

export default function CategoryPage() {
  // useAuthRedirect({ isPublicPage: false, allowedRoles: Role.VENDOR });

  return (
    <>
      <Seo title="mon espace" description="account" />

      <UserLayout withSidebar pageTitle="Seller Page">
        <CategoryIndex />
      </UserLayout>
    </>
  );
}
