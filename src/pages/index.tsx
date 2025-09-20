import { HeroSection } from "@/components/landing/hero-section";
import { WhyChooseUsSection } from "@/components/landing/why-choose-us-section";
import { ProductsSection } from "@/components/landing/products-section";
import { JoinUsSection } from "@/components/landing/join-us-section";
import { Layout } from "@/components/layout/layout";
import { Seo } from "@/components/seo/Seo";
import BestSeller from "@/components/landing/BestSeller";
import Categories from "@/components/landing/Categories";
import PromoBanner from "@/components/landing/PromoBanner";

export default function Home() {
  return (
    <div>
      <Seo title="Acceuill" description="description" />

      <Layout>
        <HeroSection />
        <Categories />
        <PromoBanner/>
        <ProductsSection />
        <WhyChooseUsSection />
        <BestSeller />
        <JoinUsSection />
      </Layout>
    </div>
  );
}
