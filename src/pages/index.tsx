import { WhyChooseUsSection } from "@/components/landing/why-choose-us-section";
import { ProductsSection } from "@/components/landing/products-section";
import { Layout } from "@/components/layout/layout";
import { Seo } from "@/components/seo/Seo";
import BestSeller from "@/components/landing/BestSeller";
import Categories from "@/components/landing/Categories";
import PromoBanner from "@/components/landing/PromoBanner";
import Newsletter from "@/components/landing/Newsletter";
import Hero from "@/components/landing/Hero";
import App from "@/components/landing/Countdown";

export default function Home() {
  return (
    <div>
      <Seo title="Shop Online" description="description" />

      <Layout>
        <Hero />
        <Categories />
        <PromoBanner />
        <ProductsSection />
        <WhyChooseUsSection />
        <BestSeller />
        <App />
        <Newsletter />
      </Layout>
    </div>
  );
}
