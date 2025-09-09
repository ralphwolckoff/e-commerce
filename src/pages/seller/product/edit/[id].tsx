// src/app/admin/products/edit/[id]/page.tsx

import { UserLayout } from "@/components/layout/user-layout";
import { Seo } from "@/components/seo/Seo";
import ProductEditPage from "@/ui/modules/seller/products/edit/[id]";
import { useRouter } from "next/router";
import React from "react";

export default function Page() {
  // useAuthRedirect({ isPublicPage: false, allowedRoles: Role.SELLER });

  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <div>Loading or invalid URL...</div>;
  }

  return (
    <>
      <Seo title="mon espace" description="account" />

      <UserLayout withSidebar pageTitle="Edit Product">
        <ProductEditPage />
      </UserLayout>
    </>
  );
}
