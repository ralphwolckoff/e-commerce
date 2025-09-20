// app/client/dashboard.tsx
import React from "react";
import { UserLayout } from "@/components/layout/user-layout";
import { Seo } from "@/components/seo/Seo";
import App from "@/components/MyAccount";

export default function CommandPage() {

  return (
    <>
      <Seo title="mon espace" description="account" />

      <UserLayout withSidebar pageTitle="Info Personnelle">
        <App />
      </UserLayout>
    </>
  );
}
