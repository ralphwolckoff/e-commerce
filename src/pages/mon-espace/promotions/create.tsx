import { UserLayout } from "@/components/layout/user-layout";
import { Seo } from "@/components/seo/Seo";
import PromotionCreator from "@/ui/modules/seller/promotion/create";

export default function Page() {
  return (
    <>
      <Seo
        title="Shop Online | mon espace | create promotion"
        description="creer une promotion"
      />
      <UserLayout withSidebar pageTitle="Add New Promotion">
        <PromotionCreator />
      </UserLayout>
    </>
  );
}
