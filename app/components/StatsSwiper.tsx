/* eslint-disable @next/next/no-img-element */
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay } from "swiper/modules";
import Image from "next/image";
// import { useParams } from "next/navigation";
// import { AppTranslator, Locale } from "../utils";

const stats = [
  {
    image: "/images/stats-image-1.jpg",
    translations: {
      en: "20,000+ Moves completed in 2024 alone",
      nl: "Meer dan 20.000 verhuizingen afgerond in 2024",
    },
    avatars: [
      <div
        key={"stats_1_avatar_1"}
        className="bg-[#DFDFDF] h-6 lg:h-8 w-6 lg:w-8 relative rounded-full"
      >
        {" "}
        <img
          src="/stats/stats-profile-1.png"
          className="h-full w-full rounded-full absolute object-cover"
          alt=""
        />{" "}
      </div>,
      <div
        key={"stats_1_avatar_2"}
        className="bg-[#FFFFFF] relative -mx-3.5 h-6 lg:h-8 w-6 lg:w-8 rounded-full"
      >
        {" "}
        <img
          src="/stats/stats-profile-2.png"
          className="h-full w-full rounded-full absolute object-cover"
          alt=""
        />{" "}
      </div>,
      <div
        key={"stats_1_avatar_3"}
        className="bg-[#CDCCCC] relative h-6 lg:h-8 w-6 lg:w-8 rounded-full"
      >
        {" "}
        <img
          src="/stats/stats-profile-3.png"
          className="h-full w-full rounded-full absolute object-cover"
          alt=""
        />{" "}
      </div>,
    ],
  },
  {
    image: "/images/stats-image-2.jpg",
    translations: {
      en: "6000+ Active users are happy with Zinter",
      nl: "Meer dan 6.000 tevreden Zinter-gebruikers",
    },
    avatars: [
      <div
        key={"stats_1_avatar_1"}
        className="bg-[#DFDFDF] h-6 lg:h-8 w-6 lg:w-8 relative rounded-full"
      >
        {" "}
        <img
          src="/stats/stats-profile-1.png"
          className="h-full w-full rounded-full absolute object-cover"
          alt=""
        />{" "}
      </div>,
      <div
        key={"stats_1_avatar_2"}
        className="bg-[#FFFFFF] relative -mx-3.5 h-6 lg:h-8 w-6 lg:w-8 rounded-full"
      >
        {" "}
        <img
          src="/stats/stats-profile-2.png"
          className="h-full w-full rounded-full absolute object-cover"
          alt=""
        />{" "}
      </div>,
      <div
        key={"stats_1_avatar_3"}
        className="bg-[#CDCCCC] relative h-6 lg:h-8 w-6 lg:w-8 rounded-full"
      >
        {" "}
        <img
          src="/stats/stats-profile-3.png"
          className="h-full w-full rounded-full absolute object-cover"
          alt=""
        />{" "}
      </div>,
    ],
  },
  {
    image: "/images/stats-image-3.jpg",
    translations: {
      en: "20,000+ Moves completed in 2024 alone",
      nl: "Meer dan 20.000 verhuizingen afgerond in 2024",
    },
    avatars: [
      <div
        key={"stats_1_avatar_1"}
        className="bg-[#DFDFDF] h-6 lg:h-8 w-6 lg:w-8 relative rounded-full"
      >
        {" "}
        <img
          src="/stats/stats-profile-1.png"
          className="h-full w-full rounded-full absolute object-cover"
          alt=""
        />{" "}
      </div>,
      <div
        key={"stats_1_avatar_2"}
        className="bg-[#FFFFFF] relative -mx-3.5 h-6 lg:h-8 w-6 lg:w-8 rounded-full"
      >
        {" "}
        <img
          src="/stats/stats-profile-2.png"
          className="h-full w-full rounded-full absolute object-cover"
          alt=""
        />{" "}
      </div>,
      <div
        key={"stats_1_avatar_3"}
        className="bg-[#CDCCCC] relative h-6 lg:h-8 w-6 lg:w-8 rounded-full"
      >
        {" "}
        <img
          src="/stats/stats-profile-3.png"
          className="h-full w-full rounded-full absolute object-cover"
          alt=""
        />{" "}
      </div>,
    ],
  },
  {
    image: "/images/stats-image-4.jpg",
    translations: {
      en: "800+ Moving companies fully verified",
      nl: "Meer dan 800 volledig geverifieerde verhuisbedrijven",
    },
    avatars: [
      <div
        key={"stats_1_avatar_1"}
        className="bg-[#DFDFDF] h-6 lg:h-8 w-6 lg:w-8 relative rounded-full"
      >
        {" "}
        <img
          src="/stats/stats-profile-1.png"
          className="h-full w-full rounded-full absolute object-cover"
          alt=""
        />{" "}
      </div>,
      <div
        key={"stats_1_avatar_2"}
        className="bg-[#FFFFFF] relative -mx-3.5 h-6 lg:h-8 w-6 lg:w-8 rounded-full"
      >
        {" "}
        <img
          src="/stats/stats-profile-2.png"
          className="h-full w-full rounded-full absolute object-cover"
          alt=""
        />{" "}
      </div>,
      <div
        key={"stats_1_avatar_3"}
        className="bg-[#CDCCCC] relative h-6 lg:h-8 w-6 lg:w-8 rounded-full"
      >
        {" "}
        <img
          src="/stats/stats-profile-3.png"
          className="h-full w-full rounded-full absolute object-cover"
          alt=""
        />{" "}
      </div>,
    ],
  },
];

export function StatsSwiper() {
  // const { locale } = useParams() as { locale: Locale };

  return (
    <div className="mt-14 max-w-310 2xl:max-w-350 mx-auto">
      <Swiper
        modules={[FreeMode, Autoplay]}
        slidesPerView={1.3}
        spaceBetween={12}
        autoplay
        loop
        breakpoints={{
          640: { slidesPerView: 1.5, spaceBetween: 12 },
          768: { slidesPerView: 2.3, spaceBetween: 32 },
          1024: { slidesPerView: 2.5, spaceBetween: 40 },
          1200: { slidesPerView: 3, spaceBetween: 20 },
          1440: { slidesPerView: 3.5, spaceBetween: 20 },
        }}
      >
        {stats.map((stat, index) => {
          const topMargin =
            index % 3 === 0 ? "mt-0" : index % 3 === 1 ? "mt-6" : "mt-12";

          return (
            <SwiperSlide key={index} className={topMargin}>
              <div className="border border-white px-4 py-3 rounded-2xl">
                <div className="relative w-full h-40 lg:h-80 rounded-2xl overflow-hidden">
                  <Image
                    src={stat.image}
                    alt={`Stats Image ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    width={500}
                    height={320}
                  />
                  <div
                    className={`absolute ${
                      index % 2 !== 0 ? "flex flex-col-reverse" : ""
                    } top-0 p-2 lg:p-4 h-full w-full`}
                  >
                    {/* <div className="border lg:flex items-center gap-x-3 border-white p-4 bg-black/25 backdrop-blur-sm rounded-2xl">
                      <div className="flex items-center">{stat.avatars}</div>
                      <p className="text-white font-semibold text-[8px] lg:text-xs">
                        {AppTranslator.getLocaleText({
                          translations: stat.translations,
                          locale,
                        })}
                      </p>
                    </div> */}
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
