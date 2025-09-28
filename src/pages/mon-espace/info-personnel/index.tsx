import { UserLayout } from "@/components/layout/user-layout";
import { Seo } from "@/components/seo/Seo";
import App from "@/components/MyAccount";

export default function Page() {
  return (
    <>
      <Seo title="Shop Online | mon compte" description="account" />
      <UserLayout withSidebar pageTitle="Mon Compte">
        <App />
      </UserLayout>
    </>
  );
}
