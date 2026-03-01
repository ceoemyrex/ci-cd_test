/* eslint-disable @next/next/no-img-element */
"use client";
import { AppTag, Navbar } from "@/components";
import { StatsSwiper } from "@/app/components";

export function HowItWorksHero() {
  return (
    <section className={``}>
      <div className=" relative pb-15 lg:pb-30 lg:rounded-t-4xl">
        <img
          src={"/hero-bg.png"}
          alt="hero-bg"
          className="absolute lg:rounded-t-4xl top-0 left-0 w-full h-full object-center object-cover"
        />
        <div className="relative max-w-310  2xl:max-w-350 mx-auto p-4">
          <Navbar />
          <div className="pt-22 lg:pt-36.25">
            <div className="space-y-4 max-w-150 mx-auto text-center">
              <div className="text-center">
                <AppTag title="Smooth Process" />
              </div>
              <p className="font-bold text-dark text-center text-3xl lg:text-6xl leading-[120%]">
                How Zinter helps coordinate 
                <span className="text-secondary">Your Move</span>
              </p>
              <p className="text-center text-sm lg:text-lg text-grey">
                Zinter focuses on one thing first: creating a clear inventory.
                Once that&apos;s done, move coordination becomes faster, easier,
                and more accurate.
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
