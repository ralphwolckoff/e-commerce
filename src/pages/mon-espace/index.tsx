import React from "react";
import { UserLayout } from "@/components/layout/user-layout";
import { Seo } from "@/components/seo/Seo";
import SellerDashboardPage from "../../ui/modules/seller/dashbord/dashboard";

export default function DashboardPage() {

  return (
    <>
      <Seo title="mon espace" description="account" />
      <UserLayout withSidebar pageTitle="Seller Page">
        <SellerDashboardPage />
      </UserLayout>
    </>
  );
}
