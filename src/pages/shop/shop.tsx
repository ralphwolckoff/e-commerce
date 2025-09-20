import FeaturesBanner from "@/common/features/FeaturesBanner";
import { Layout } from "@/components/layout/layout";
import { Seo } from "@/components/seo/Seo";
import { ShopWithoutSidebar } from "@/ui/modules/shop/ShopWithoutSidebar";

export default function Home() {
  return (
    <>
      <Seo title="Shop" description="tout sur les produits" />
      <Layout>
        <FeaturesBanner />
        <ShopWithoutSidebar />
      </Layout>
    </>
  );
}
