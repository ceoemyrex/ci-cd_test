/* eslint-disable @next/next/no-img-element */
"use client";
import { Navbar } from "@/components";
import {
  ArrowDropDownIcon,
  CheckBoxIcon,
  HexagonIcon,
  LocationIcon,
} from "../icons";
import { StatsSwiper } from "./StatsSwiper";


export function Hero() {
  return (
    <section className={`lg:py-8`}>
      <div className="max-w-310 relative pb-15 lg:pb-30 lg:rounded-t-4xl  mx-auto">
        <img
          src={"/hero-bg.png"}
          alt="hero-bg"
          className="absolute lg:rounded-t-4xl top-0 left-0 w-full h-full object-center object-cover"
        />
        <div className="relative p-4 lg:py-10 lg:p-10">
          <Navbar />
          <div className="pt-12 lg:pt-26.25 lg:flex space-y-8 gap-x-11 items-center">
            <div className="space-y-4 flex-2">
              <div className="text-center lg:text-left">
                <span className="bg-[#CACACA1A]/10 px-4 text-xs lg:text-sm py-1.5 lg:py-2.5 rounded-[100px] text-secondary inline-flex items-center gap-x-1.5 border border-[#B6DDA8]">
                  <HexagonIcon />
                  Best & Trusted Place
                </span>
              </div>
              <p className="font-bold text-dark text-center lg:text-left text-3xl lg:text-5xl leading-[120%]">
                Move coordination starts with a 
                <span className="text-secondary">Clear Inventory.</span>
              </p>
              <p className="text-center text-sm lg:text-left lg:text-lg text-grey">
                Zinter helps you plan and coordinate your move by creating a
                clear inventory first. Upload photos using AI or build a manual
                list whichever works best for you.
              </p>

              <div className="my-4 lg:my-1 space-y-2 lg:space-y-4 text-sm lg:text-base">
                <div className="flex items-center gap-x-3">
                  <CheckBoxIcon />
                  <p className="text-grey">
                    Create inventory your way AI or manual
                  </p>
                </div>
                <div className="flex items-center gap-x-3">
                  <CheckBoxIcon />
                  <p className="text-grey">Coordinate with confidence</p>
                </div>
                <div className="flex items-center gap-x-3">
                  <CheckBoxIcon />
                  <p className="text-grey">
                    Get clear pricing without surprises
                  </p>
                </div>
              </div>
            </div>
            <div className="flex-2">
              <div className="bg-white shadow-xl rounded-[20px]">
                <header className="p-4 lg:p-8 border-b border-black/10">
                  <p className="text-dark text-lg lg:text-2xl font-medium">
                    Get started in seconds
                  </p>
                  <p className="text-grey text-xs lg:text-sm">
                    Create a clear inventory first, then coordinate the move
                    details.
                  </p>
                </header>
                <div className="p-4 lg:p-8 space-y-4">
                  <div className="space-y-3">
                    <p className="text-dark text-sm lg:text-base">Moving From</p>
                    <div className="bg-[#F3F3F4] gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center">
                      <LocationIcon />
                      <p className="text-grey text-xs lg:text-sm">Moving From</p>
                      <span className="ml-auto">
                        <ArrowDropDownIcon />
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-dark text-sm lg:text-base">Moving To</p>
                    <div className="bg-[#F3F3F4] gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center">
                      <LocationIcon />
                      <p className="text-grey text-xs lg:text-sm">Moving To</p>
                      <span className="ml-auto">
                        <ArrowDropDownIcon />
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-dark">Moving Size</p>
                    <div className="bg-[#F3F3F4] gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center">
                      <LocationIcon />
                      <p className="text-grey text-xs lg:text-sm">Moving Size</p>
                      <span className="ml-auto">
                        <ArrowDropDownIcon />
                      </span>
                    </div>
                  </div>
                  <button className="text-white bg-theme w-full h-12 lg:h-17.5 mt-8 rounded-lg lg:rounded-2xl lg:text-lg font-medium">
                    Continue
                  </button>
                </div>
                <div className="text-center py-4">
                  <p className="text-grey text-xs lg:text-base">
                    No calls. No spam. Just clear next steps.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <StatsSwiper />
      </div>
    </section>
  );
}
