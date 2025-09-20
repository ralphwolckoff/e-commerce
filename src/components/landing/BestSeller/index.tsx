import React, { useEffect, useState } from "react";
import SingleItem from "../../products/SingleItem";
import Link from "next/link";
import { productService } from "@/services/productService";
import { Product } from "@/types/products";
import { toast } from "react-toastify";
import { Typography } from "@/ui/design/typography/Typography";

const BestSeller = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        toast.error("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading products...</div>;
  }
  return (
    <section className="py-20 overflow-hidden  bg-[#F6F7FB]">
      <div className="max-w-[1370px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        {/* <!-- section title --> */}
        <div className="mb-10 flex items-center justify-center ">
          <div>
            <Typography variant="h2" component="h2">
              Best Sellers
            </Typography>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-9">
          {products.slice(7, 15).map((item, key) => (
            <SingleItem item={item} key={key} />
          ))}
        </div>

        <div className="text-center mt-12.5 mb-7">
          <Link
            href="/shop/shop"
            className="inline-flex font-medium text-custom-sm py-3 px-7 sm:px-12.5 rounded-md border-gray-3 border bg-primary text-white ease-out duration-200 hover:bg-primary-900 hover:text-white hover:border-transparent"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSeller;
