// src/app/admin/orders/page.tsx
import React from "react";
import { Seo } from "@/components/seo/Seo";
import { UserLayout } from "@/components/layout/user-layout";
import OrderManagementPage from "../../orders";

export default function OrderManagementPages() {

  return (
    <>
      <Seo title="command" description="command" />
      <UserLayout withSidebar pageTitle="commandes">
        <OrderManagementPage />
      </UserLayout>
    </>
  );
}
