import { Layout } from "@/components/layout/layout";
import { Seo } from "@/components/seo/Seo";
import FAQComponent from "@/ui/modules/FAQ";

export default function App() {
  return (
    <>
      <Seo title="Shop Online | FAQ" description="Get in touch with us" />
      <Layout>
        <div className="bg-gray-100 min-h-screen py-10 px-4">
          <div className="max-w-6xl mx-auto">
            <FAQComponent />
          </div>
        </div>
      </Layout>
    </>
  );
}