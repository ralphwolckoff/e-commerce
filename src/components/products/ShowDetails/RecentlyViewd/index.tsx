"use client";
import React, { useEffect, useState } from "react";

import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { useCallback, useRef } from "react";
import "swiper/css/navigation";
import "swiper/css";
import ProductItem from "../../ProductItem";
import { Product } from "@/types/products";
import { productService } from "@/services/productService";
import { Typography } from "@/ui/design/typography/Typography";
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/outline";

const RecentlyViewdItems = ({ categoryName, onQuickView }: { categoryName: string, onQuickView: (product: Product) => void }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef<SwiperRef>(null);


  const handlePrev = useCallback(() => {
      if (!sliderRef.current || !sliderRef.current.swiper) return;
      sliderRef.current.swiper.slidePrev();
    }, []);
  
    const handleNext = useCallback(() => {
      if (!sliderRef.current || !sliderRef.current.swiper) return;
      sliderRef.current.swiper.slideNext();
    }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getProducts();
        const productCategory = data.filter(
          (p) => p.category?.name === categoryName
        );
        setProducts(productCategory);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center p-8">chargement...</div>;
  }
  if (products.length === 0) {
    return (
      <div className="text-center p-8">
        Aucun produit trouvé dans cette catégorie.
      </div>
    );
  }

  return (
    <section className="overflow-hidden pt-17.5">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0 pb-15 border-b border-gray-3">
        <div className="swiper categories-carousel common-carousel">
          {/* <!-- section title --> */}
          <div className="mb-10 flex items-center justify-between">
            <div className="mt-6">
              <Typography
                variant="lead"
                component="h2"
                className="font-semibold"
              >
                Afficharge par Categorie
              </Typography>
            </div>

            <div className="flex items-center gap-6">
              <button
                onClick={handlePrev}
                className="h-8 w-8 rounded  hover:cursor-pointer"
              >
                <ChevronDoubleLeftIcon className="w-5 h-5 text-primary-800" />
              </button>

              <button
                onClick={handleNext}
                className="h-8 w-8 rounded  hover:cursor-pointer"
              >
                <ChevronDoubleRightIcon className="w-5 h-5 text-primary-800" />
              </button>
            </div>
          </div>

          <Swiper
            ref={sliderRef}
            slidesPerView={4}
            spaceBetween={20}
            className="justify-between"
            preventClicksPropagation={false}
          >
            {products.map((item, key) => (
              <SwiperSlide key={key}>
                <ProductItem item={item} onQuickView={onQuickView} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewdItems;
