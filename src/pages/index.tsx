
import { HeroSection } from "@/components/landing/hero-section";
import { SponsorsSection } from "@/components/landing/sponsors-section";
import { AboutSection } from "@/components/landing/about-section";
import { WhyChooseUsSection } from "@/components/landing/why-choose-us-section";
import { ProductsSection } from "@/components/landing/products-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { JoinUsSection } from "@/components/landing/join-us-section";
import { Layout } from "@/components/layout/layout";
import { Seo } from "@/components/seo/Seo";

export default function Home() {
  
  return (
    <div>
      <Seo title="Acceuill" description="description" />

      <Layout>
        <HeroSection />
        <SponsorsSection />
        <AboutSection />
        <WhyChooseUsSection />
        <ProductsSection />
        <TestimonialsSection />
        <JoinUsSection />
      </Layout>
    </div>
  );
}
