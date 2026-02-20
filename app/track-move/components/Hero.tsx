/* eslint-disable @next/next/no-img-element */
import { ArrowDropDownIcon } from "@/app/icons";
import { Navbar } from "@/components";
import { TrackingCodeInput } from "./TrackingCodeInput";

export function TrackMoveHero() {
  return (
    <section className={`lg:pt-8`}>
      <div className="max-w-310 relative pb-15 lg:pb-30 lg:rounded-t-4xl  mx-auto">
        <img
          src={"/hero-bg.png"}
          alt="hero-bg"
          className="absolute lg:rounded-t-4xl top-0 left-0 w-full h-full object-center object-cover"
        />
        <div className="relative p-4 lg:py-10 lg:p-10">
          <Navbar />
          <div className="pb-12.5 lg:pb-37.5 pt-10 lg:pt-20">
            <header className="flex items-center">
              <div className="text-grey flex items-center text-sm lg:text-xl">
                <p>Home</p>
                <span className="-rotate-90 pt-1">
                  <ArrowDropDownIcon />
                </span>
              </div>
              <p className="lg:text-2xl font-medium">Track your move progress </p>
            </header>
            <div className="mt-8 lg:mt-20 bg-white/50 p-4 space-y-8 rounded-2xl border border-white max-w-175.5 mx-auto">
              <div className="h-40 lg:h-60 relative">
                <img
                  src="/images/map.png"
                  className="w-full h-full rounded-2xl object-cover"
                  alt="Map Image"
                />
              </div>
              <p className="text-dark font-medium lg:text-2xl text-center">Enter code to tracking move</p>
              <div className="mt-4">
                <TrackingCodeInput/>
              </div>
              <div className="mt-10 lg:mt-28.5 pb-4 lg:pb-8 text-center">
                <button className="px-9 py-4 w-full lg:w-auto lg:py-5 text-sm lg:text-lg font-medium bg-theme text-white rounded-xl">Start Tracking Move</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
