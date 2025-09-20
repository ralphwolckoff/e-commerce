"use client";

import { useEffect, useState } from "react";
import { productService } from "@/services/productService";
import { Product } from "@/types/products";
import { Button } from "@/ui/design/button/button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Typography } from "@/ui/design/typography/Typography";
import ProductItem from "@/components/products/ProductItem";

export function ProductsSection() {
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
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100 ">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-between mx-10">
          <Typography variant="h3" component="h2" className="mb-12">
            Our Products
          </Typography>
          <Button size="small" baseUrl="/shop" className="font-bold mb-12">
            View All Products
          </Button>
        </div>

        <div className="grid grid-cols-1 min-h-[403px] sm:grid-cols-3  gap-28">
          {products.length > 0 ? (
            products
              .slice(0, 6)
              .map((product) => <ProductItem key={product.id} item={product} />)
          ) : (
            <p className="col-span-4 text-center text-gray-500">
              Aucun produit disponible pour le moment.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
