import { Layout } from "@/components/layout/layout";
import { Seo } from "@/components/seo/Seo";
import { ShopByCategory } from "@/ui/modules/shop/ShopByCategory";

export default function Home() {
  return (
    <>
      <Seo
        title="Shop Online | Shop"
        description="tout sur le produit"
      />
      <Layout>
        <ShopByCategory />
      </Layout>
    </>
  );
}
