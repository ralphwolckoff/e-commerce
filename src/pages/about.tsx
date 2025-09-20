import { AboutSection } from "@/components/landing/about-section";
import { SponsorsSection } from "@/components/landing/sponsors-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { Layout } from "@/components/layout/layout";
import { Seo } from "@/components/seo/Seo";

export default function App() {
  return (
    <>
      <Seo title="About Us" description="Get in touch with us" />
      <Layout>
        <SponsorsSection />
        <AboutSection />
        <TestimonialsSection />
      </Layout>
    </>
  );
}