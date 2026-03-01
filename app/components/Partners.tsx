"use client";
import { HexagonIcon, StarOutlineTheme } from "../icons";
import { HomeIcon } from "../icons/home";
import { PackageIcon } from "../icons/package";
import { TruckIcon } from "../icons/truck";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

export function PartnersSlider() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      icon: <TruckIcon />,
      title: "SwiftMove Logistics",
      tag: "Verified Partner",
    },
    {
      icon: <PackageIcon />,
      title: "MetroPack Movers",
      tag: "Licensed & Insured",
    },
    {
      icon: <StarOutlineTheme />,
      title: "NorthStar Transport",
      tag: "Local Expert",
    },
    {
      icon: <HomeIcon />,
      title: "UrbanShift Storage",
      tag: "Storage Partner",
    },
  ];

  return (
    <div className="mt-10 lg:mt-20">
      <Swiper
        modules={[Pagination,Autoplay]}
        spaceBetween={16}
        slidesPerView={1.2}
        loop
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        className="pb-12!"
      >
        {slides.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white border border-black/10 rounded-2xl px-4 py-5 lg:py-10">
              <div>
                <div className="bg-[#EBF5EF] mx-auto h-16 w-16 rounded-2xl flex items-center justify-center">
                  {item.icon}
                </div>

                <div className="mt-6 lg:mt-12 space-y-4 text-center">
                  <p className="font-medium text-lg lg:text-2xl">
                    {item.title}
                  </p>

                  <span className="text-secondary border-secondary/10 text-sm py-2 px-4 rounded-[100px] bg-[#CACACA1A]/10">
                    {item.tag}
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ✅ CUSTOM PAGINATION */}
      <div className="flex justify-center gap-2 mt-6">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => swiperRef.current?.slideToLoop(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeIndex === index
                ? "bg-theme w-8"
                : "bg-black/20 w-2"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function Partners() {
  return (
    <section id="partner" className="py-18.5 lg:py-37.5 bg-[#F8FBFF]">
      <div className="max-w-310 2xl:max-w-350 px-4 mx-auto">
        <header className="text-center max-w-153.75 mx-auto">
          <span className="bg-[#CACACA1A]/10 px-4 text-sm py-2.5 rounded-[100px] text-secondary inline-flex items-center gap-x-1.5 border border-[#B6DDA8]">
            <HexagonIcon />
            Trusted Partners
          </span>
          <div className="mt-6 space-y-4">
            <p className="font-bold text-2xl lg:text-5xl">
              Moving services powered by reliable partners
            </p>
            <p className="text-grey text-sm lg:text-lg">
              Zinter works with verified moving companies and service providers
              to ensure smooth coordination and dependable service delivery.
            </p>
          </div>
          <div className="mt-8 space-y-6">
            <p className="text-lg lg:text-3xl font-medium">Want to become a partner?</p>
            <button className="py-2.5 lg:py-5 px-10 lg:px-[72.5px] font-medium bg-theme text-white rounded-2xl text-base lg:text-xl">
              Join as Partner
            </button>
          </div>
        </header>
        <PartnersSlider/>
      </div>
    </section>
  );
}
