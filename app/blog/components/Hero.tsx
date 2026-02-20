/* eslint-disable @next/next/no-img-element */
"use client";
import { AppTag, Navbar } from "@/components";
import { StatsSwiper } from "@/app/components";

export function BlogHero() {
  return (
    <section className={`lg:pt-8 px-8`}>
      <div className=" relative pb-15 lg:pb-30 lg:rounded-t-4xl">
        <img
          src={"/hero-bg.png"}
          alt="hero-bg"
          className="absolute lg:rounded-t-4xl top-0 left-0 w-full h-full object-center object-cover"
        />
        <div className="relative max-w-310 mx-auto p-4 lg:py-10 lg:p-10">
          <Navbar />
          <div className="pt-12 lg:pt-26.25">
            <div className="space-y-4 max-w-150 mx-auto text-center">
              <div className="text-center">
                <AppTag title="Quick Booking" />
              </div>
              <p className="font-bold text-dark text-center text-3xl lg:text-6xl leading-[120%]">
                Moving and inventory
                <span className="text-secondary">Guides</span>
              </p>
              <p className="text-center text-sm lg:text-lg text-grey">
                Explore practical articles on move planning, inventory creation,
                pricing, and logistics.
              </p>

              <button className="bg-theme rounded-2xl text-white h-12 lg:h-17.5 px-12 lg:px-16 mt-5 lg:mt-10 font-medium text-base lg:text-xl">
                Start your move
              </button>
            </div>
          </div>
        </div>
        <StatsSwiper />
      </div>
    </section>
  );
}
