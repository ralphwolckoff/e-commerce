// src/app/admin/orders/page.tsx
import React from "react";
import { Seo } from "@/components/seo/Seo";
import { UserLayout } from "@/components/layout/user-layout";
import { Role } from "@/common/role.enum";
import OrderManagementPage from "../../orders";

export default function OrderManagementPages() {
  // useAuthRedirect({ isPublicPage: false, allowedRoles: Role.SELLER });

  return (
    <>
      <Seo title="command" description="command" />

      <UserLayout withSidebar pageTitle="commandes">
        <OrderManagementPage />
      </UserLayout>
    </>
  );
}
