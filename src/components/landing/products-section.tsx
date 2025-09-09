"use client";

import { useEffect, useState } from "react";
import { productService } from "@/services/productService";
import { Product } from "@/types/products";
import { Button } from "@/ui/design/button/button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Typography } from "@/ui/design/typography/Typography";
import { EyeIcon, HeartIcon, ShopIcon } from "../icons";
import Image from "next/image";
import ProductModal from "@/pages/product-detail/[id]";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { Role } from "@/common/role.enum";

export function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const {isAuthenticated,  user} = useAuthStore()
  const {addItem} = useCartStore()
  const onEditPersonal = () => {
    setShowModal(true);
  };

  const handleAddToCart = (product: Product) =>{
    if (isAuthenticated && user?.role===Role.CLIENT) {
      addItem(product, 1)
    }else{
      return
    }

  }

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
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-orange-100/20">
      <div className="max-w-7xl mx-auto text-center">
        <Typography variant="h3" component="h2" className="mb-12">
          Our Products
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {products.length > 0 ? (
            products.slice(0, 3).map((product) => (
              <div className="group w-full max-w-sm rounded-lg overflow-hidden bg-white shadow-md p-4 flex flex-col items-center">
                     <div className="relative overflow-hidden flex items-center justify-center rounded-lg  min-h-[270px] mb-4 w-full">
                       <img
                         src={product.images?.[0].url}
                         alt={product.name}
                         width={250}
                         height={250}
                       />
                       <div className="absolute left-0 bottom-0 translate-y-full w-full flex items-center justify-center gap-2.5 pb-5 ease-linear duration-200 group-hover:translate-y-0">
                         <button
                           onClick={onEditPersonal}
                           aria-label="button for quick view"
                           className="flex items-center justify-center w-9 h-9 rounded-full shadow-md transition-colors text-gray-800 bg-white hover:bg-gray-200"
                         >
                           <EyeIcon className="w-5 h-5" />
                         </button>
                         <Button size="very-small" action={()=> handleAddToCart(product)}>Add to cart</Button>
                         <button
                           aria-label="button for favorite select"
                           className="flex items-center justify-center w-9 h-9 rounded-full shadow-md transition-colors text-gray-800 bg-white hover:bg-gray-200"
                         >
                           <HeartIcon className="w-5 h-5" />
                         </button>
                       </div>
                     </div>
                     <div className="text-center">
                       <Typography variant="h5" component="h3" className="font-semibold">
                         {product.name}
                       </Typography>
                       <span className="flex items-center justify-center gap-2 font-medium text-lg">
                         <Typography
                           variant="body-lg"
                           component="span"
                           theme="secondary"
                           className="font-bold"
                         >
                           ${Number(product.price)}
                         </Typography>{" "}
                       </span>
                     </div>
                     <ProductModal isOpen={showModal} onClose={() => setShowModal(false)} productId ={product.id} />
              </div>
              
            ))
          ) : (
            <p className="col-span-4 text-center text-gray-500">
              No products available at the moment.
            </p>
          )}
        </div>
        <div className="mt-12">
          <Button
            baseUrl="/products"
            className=" font-bold py-3 px-8 rounded-full transition-colors"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}
