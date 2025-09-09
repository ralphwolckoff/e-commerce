import { Layout } from "@/components/layout/layout";
import { Seo } from "@/components/seo/Seo";
import { ContactModule } from "@/ui/modules/contact";

export default function App() {
  return (
    <>
      <Seo title="Contact Us" description="Get in touch with us" />
      <Layout>
          <div className="bg-gray-100 min-h-screen py-10 px-4">
           <div className="max-w-6xl mx-auto">
             <ContactModule />
          </div>
        </div>
      </Layout>
    </>
  );
}