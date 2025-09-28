import React from "react";
import HeroCarousel from "./HeroCarousel";
import HeroFeature from "./HeroFeature";
import Image from "next/image";
import { useProductStore } from "@/store/productStore";
import { Typography } from "@/ui/design/typography/Typography";
import Link from "next/link";

const Hero = () => {
  const {products} = useProductStore()
  return (
    <section className="overflow-hidden pb-10 lg:pb-12.5 xl:pb-15 pt-27.5 sm:pt-15 lg:pt-20 xl:pt-11.5 bg-[#E5EAF4]">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="flex flex-wrap items-center pb-10 justify-between gap-5">
          <div className="xl:max-w-[757px] w-full">
            <div className="relative z-1 rounded-[10px] bg-white overflow-hidden">
              {/* <!-- bg shapes --> */}
              <Image
                src="/assets/hero/hero-bg.png"
                alt="hero bg shapes"
                className="absolute right-0 bottom-0 -z-1"
                width={534}
                height={520}
              />

              <HeroCarousel />
            </div>
          </div>

          <div className="xl:max-w-[393px] w-full">
            <div className="flex flex-col justify-between sm:flex-row xl:flex-col gap-5">
              {products.slice(2, 4).map((product, key) => (
                <div key={key} className="w-full relative rounded-[10px] bg-white p-4 sm:p-7.5">
                  <div className="flex items-center gap-14">
                    <div>
                      <Typography
                        variant="lead"
                        component="h2"
                        className="max-w-[153px] mb-10"
                      >
                        <Link href="#"> {product.name}</Link>
                      </Typography>

                      <div>
                        <Typography
                          variant="caption3"
                          component="p"
                          className="mb-1.5"
                        >
                          limited time offer
                        </Typography>
                        <span className="flex items-center gap-3">
                          <Typography
                            theme="secondary"
                            variant="lead"
                            component="span"
                            className="font-bold "
                          >
                            {product.price}€
                          </Typography>
                          <Typography
                            variant="lead"
                            component="span"
                            className="font-bold line-through"
                          >
                            {product.price * 2}€
                          </Typography>
                          <span className="font-medium text-2xl text-blue-800 "></span>
                        </span>
                      </div>
                    </div>

                    <div>
                      <Image
                        src={
                          product.images?.[0]?.url || "/assets/hero/hero-02.png"
                        }
                        alt="mobile image"
                        width={123}
                        height={161}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <HeroFeature />
    </section>
  );
};

export default Hero;
