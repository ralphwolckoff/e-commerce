import { AboutSection } from "@/components/landing/about-section";
import { HeroSection } from "@/components/landing/hero-section";
import { JoinUsSection } from "@/components/landing/join-us-section";
import { SponsorsSection } from "@/components/landing/sponsors-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { Layout } from "@/components/layout/layout";
import { Seo } from "@/components/seo/Seo";
import PromotionCreator from "@/ui/modules/seller/promotion/create";

export default function App() {
  return (
    <>
      <Seo title="Shop Online | About Us" description="Get in touch with us" />
      <Layout>
        <HeroSection />
        <SponsorsSection />
        <AboutSection />
        <TestimonialsSection />
        <JoinUsSection />
        <PromotionCreator />
      </Layout>
    </>
  );
}
