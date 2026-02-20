/* eslint-disable @next/next/no-img-element */
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

const images = [
  "/images/stats-image-1.jpg",
  "/images/stats-image-2.jpg",
  "/images/stats-image-3.jpg",
  "/images/stats-image-4.jpg",
];

export function StatsSwiper() {
  return (
    <div className="mt-14">
      <Swiper
        modules={[FreeMode, Autoplay]}
        slidesPerView={1.3}
        spaceBetween={12}
        autoplay
        loop
        breakpoints={{
          640: {
            slidesPerView: 1.5,
            spaceBetween: 12,
          },
          768: {
            slidesPerView: 2.3,
            spaceBetween: 32,
          },
          1024: {
            slidesPerView: 2.5,
            spaceBetween: 40,
          },
        }}
      >
        {images.map((src, index) => {
          const topMargin =
            index % 3 === 0 ? "mt-0" : index % 3 === 1 ? "mt-6" : "mt-12";

          return (
            <SwiperSlide key={index} className={topMargin}>
              <div className="border border-white px-4 py-3 rounded-2xl">
                <div className="relative w-full h-80 rounded-2xl overflow-hidden">
                  <img
                    src={src}
                    alt={`Stats Image ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div
                    className={`absolute ${index % 2 != 0 ? "flex flex-col-reverse " : ""} top-0 p-2 lg:p-4 h-full w-full`}
                  >
                    <div className="border lg:flex items-center gap-x-3 border-white p-4 bg-black/25 backdrop-blur-sm rounded-2xl">
                      <div className="flex items-center">
                        <div className="bg-[#DFDFDF] h-6 lg:h-8 w-6 lg:w-8 rounded-full"></div>
                        <div className="bg-[#FFFFFF] -mx-3.5 h-6 lg:h-8 w-6 lg:w-8 rounded-full"></div>
                        <div className="bg-[#CDCCCC] h-6 lg:h-8 w-6 lg:w-8 rounded-full"></div>
                      </div>
                      <p className="text-white font-semibold text-[10px] lg:text-sm">
                        6000+ Active users are happy with Zinter
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}