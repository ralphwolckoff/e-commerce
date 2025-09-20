import { Layout } from "@/components/layout/layout";
import { Seo } from "@/components/seo/Seo";
import ShopDetails from "@/components/products/ShowDetails/[id]";

export default function Home() {
  return (
    <>
      <Seo title="Detail produit" description="tout sur le produit" />
      <Layout>
        <ShopDetails />
      </Layout>
    </>
  );
}
