"use client";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { useCallback, useRef, useEffect, useState } from "react";
import "swiper/css/navigation";
import "swiper/css";
import SingleItem from "./SingleItem";
import { Categorie } from "@/types/category";
import { categoryService } from "@/services/categoryService";
import { Typography } from "@/ui/design/typography/Typography";
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/outline";

const Categories = () => {
  const [category, setCategories] = useState<Categorie[]>([])
  const [loading, setLoading] = useState(true)
  const sliderRef = useRef<SwiperRef>(null);

  const fetchCategorie =async () =>{
    setLoading(true)
    try {
      const categories = await categoryService.getCategories()
      setCategories(categories)
      setLoading(false)
    } catch (error) {
      console.log("echec de l'operation");
    }
  }

  useEffect(()=>{
    fetchCategorie()
  },[])


  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev(); 
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.swiper.init();
    }
  }, []);
  if (loading) {
    <div className="text-center">Chargement...</div>
  }
  return (
    <section className="overflow-hidden pt-17.5">
      <div className="max-w-[1370px] w-full mx-auto px-4 sm:px-8 xl:px-0 pb-15">
        <div className="swiper categories-carousel common-carousel">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <Typography
                variant="body-base"
                component="span"
                className="flex items-center gap-2.5"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_834_7356)">
                    <path
                      d="M3.94024 13.4474C2.6523 12.1595 2.00832 11.5155 1.7687 10.68C1.52908 9.84449 1.73387 8.9571 2.14343 7.18231L2.37962 6.15883C2.72419 4.66569 2.89648 3.91912 3.40771 3.40789C3.91894 2.89666 4.66551 2.72437 6.15865 2.3798L7.18213 2.14361C8.95692 1.73405 9.84431 1.52927 10.6798 1.76889C11.5153 2.00851 12.1593 2.65248 13.4472 3.94042L14.9719 5.46512C17.2128 7.70594 18.3332 8.82635 18.3332 10.2186C18.3332 11.6109 17.2128 12.7313 14.9719 14.9721C12.7311 17.2129 11.6107 18.3334 10.2184 18.3334C8.82617 18.3334 7.70576 17.2129 5.46494 14.9721L3.94024 13.4474Z"
                      stroke="#3C50E0"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="7.17245"
                      cy="7.39917"
                      r="1.66667"
                      transform="rotate(-45 7.17245 7.39917)"
                      stroke="#3C50E0"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M9.61837 15.4164L15.4342 9.6004"
                      stroke="#3C50E0"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_834_7356">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Categories
              </Typography>
              <Typography variant="h3" component="h2" className=" mb-4">
                Browse by Category
              </Typography>

              <h2 className="font-semibold text-xl xl:text-heading-5 text-dark"></h2>
            </div>

            <div className="flex items-center gap-3">
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
            slidesPerView={6}
            className=""
            breakpoints={{
              // when window width is >= 640px
              0: {
                slidesPerView: 2,
              },
              1000: {
                slidesPerView: 4,
                // spaceBetween: 4,
              },
              // when window width is >= 768px
              1200: {
                slidesPerView: 6,
              },
            }}
          >
            {category.map((item, key) => (
              <SwiperSlide key={key} className="flex justify-center">
                <SingleItem item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Categories;
