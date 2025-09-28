"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css";
import Image from "next/image";
import React, { useEffect, useState, useMemo } from "react";
import { Typography } from "@/ui/design/typography/Typography";
import Link from "next/link";
import { Promotion } from "@/types/promotion";
import { useProductStore } from "@/store/productStore";

interface CountdownCarouselProps {
  promotions: Promotion[]; 
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const getRemainingTime = (deadline: string): TimeRemaining => {
  const time = Date.parse(deadline) - Date.now();
  if (time <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  return {
    days: Math.floor(time / (1000 * 60 * 60 * 24)),
    hours: Math.floor((time / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((time / 1000 / 60) % 60),
    seconds: Math.floor((time / 1000) % 60),
  };
};

const CountdownCarousel = ({ promotions }: CountdownCarouselProps) => {
  const { products } = useProductStore();
  const [, setCurrentTime] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Si la liste de promotions est vide, on n'affiche rien.
  if (!promotions || promotions.length === 0) {
    return null;
  }
console.log({promotions});
  return (
    <Swiper
      spaceBetween={90}
      centeredSlides={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="hero-carousel"
    >
      {promotions.map((promo, index) => {
        const { days, hours, minutes, seconds } = getRemainingTime(
          promo.deadline
        );
        const product = products.find((p) => p.name === promo.productName);
        const formatTime = (time: number) => (time < 10 ? "0" + time : time);

        const isPromoActive =
          days > 0 || hours > 0 || minutes > 0 || seconds > 0;

        return (
          <SwiperSlide key={index}>
            <section className="overflow-hidden py-20">
              <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
                <div className="relative overflow-hidden z-1 rounded-lg bg-primary-200 p-4 sm:p-7.5 lg:p-10 xl:p-15">
                  <div className="max-w-[422px] w-full">
                    <span className="block font-semibold text-xl text-blue-700 mb-2.5">
                      {isPromoActive
                        ? "Ne manquez pas !"
                        : "Promotion terminée !"}
                    </span>
                    <Typography
                      variant="lead"
                      component="h2"
                      className="font-bold mb-3"
                      theme="gray"
                    >
                      {promo.message?.messageTitle}
                    </Typography>
                    <Typography variant="caption2" component="p">
                      {promo.message?.messageContent}
                    </Typography>

                    <div
                      className={`flex flex-wrap gap-6 mt-6 ${
                        !isPromoActive ? "opacity-50" : ""
                      }`}
                    >
                      {[
                        { time: days, label: "Jours" },
                        { time: hours, label: "Heures" },
                        { time: minutes, label: "Minutes" },
                        { time: seconds, label: "Secondes" },
                      ].map((t) => (
                        <div key={t.label}>
                          <span className="min-w-[64px] h-14.5 font-semibold text-xl lg:text-3xl text-dark rounded-lg flex items-center justify-center bg-white shadow-2 px-4 mb-2">
                            {formatTime(t.time)}
                          </span>
                          <span className="block text-custom-sm text-dark text-center">
                            {t.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Link
                      href={`/shop/ShowDetails/${product?.id}`}
                      className={`inline-flex font-medium text-custom-sm text-white bg-primary py-3 px-9.5 rounded-md ease-out duration-200 hover:bg-primary-900 mt-7.5 ${
                        !isPromoActive ? "pointer-events-none bg-gray-500" : ""
                      }`}
                    >
                      Voir la promotion !
                    </Link>
                  </div>

                  {/* */}
                  <Image
                    src="/assets/countdown/countdown-bg.png"
                    alt="bg shapes"
                    className="hidden sm:block absolute right-0 bottom-0 -z-1"
                    width={737}
                    height={482}
                  />
                  <Image
                    src={
                      product?.images?.[0]?.url ||
                      "/assets/countdown/countdown-01.png"
                    }
                    alt={promo?.productName}
                    className=" lg:block absolute right-4 xl:right-33 bottom-4 xl:bottom-10 "
                    width={411}
                    height={376}
                  />
                </div>
              </div>
            </section>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default CountdownCarousel;
