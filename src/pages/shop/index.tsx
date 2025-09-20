import FeaturesBanner from "@/common/features/FeaturesBanner";
import { Layout } from "@/components/layout/layout";
import { Seo } from "@/components/seo/Seo";
import { ShopPage } from "@/ui/modules/shop";

export default function Home() {
  return (
    <>
      <Seo title="Shop" description="tout sur les produits" />
      <Layout>
        <FeaturesBanner />
        <ShopPage />
      </Layout>
    </>
  );
}
