/* eslint-disable @next/next/no-img-element */
import { heroTranslations as t } from "@/translations";
import { Navbar } from "@/components";
import { HexagonIcon } from "../icons";
import { StatsSwiper } from "./StatsSwiper";
import { AppTranslator, Locale } from "../utils";
import {  HeroBookFormLg } from "./HeroBookForm";

export function HeroLg({ locale = "nl" }: { locale?: Locale }) {
  return (
    <section className={``}>
      <div className="relative pb-15 lg:pb-30">
        <img
          src={"/hero-bg.png"}
          alt="hero-bg"
          className="absolute lg:rounded-t-4xl top-0 left-0 w-full h-full object-center object-cover"
        />
        <div className="relative max-w-310 2xl:max-w-350 mx-auto p-4">
          <Navbar />
          <div className="pt-16 max-w-210 mx-auto space-y-8 gap-x-8">
            <div className="space-y-4 flex-2 mt-0 lg:mt-14">
              <div className="text-center">
                <span className="bg-[#CACACA1A]/10 px-4 text-xs lg:text-sm py-1.5 lg:py-2.5 rounded-[100px] text-secondary inline-flex items-center gap-x-1.5 border border-[#B6DDA8]">
                  <HexagonIcon />
                  {AppTranslator.getLocaleText({
                    locale,
                    translations: t.badge,
                  })}
                </span>
              </div>
              <p className="font-bold text-dark text-center text-3xl lg:text-6xl leading-[120%]">
                {AppTranslator.getLocaleText({
                  locale,
                  translations: {
                    en:"Welcome",
                    nl:"Welkom"
                  }
                })}
                <br className="lg:hidden"/>
                {AppTranslator.getLocaleText({
                  locale,
                  translations: {
                    en:" to",
                    nl:" bij"
                  }
                })}
                <span className="text-secondary">
                  {" "}
                  {AppTranslator.getLocaleText({
                    locale,
                     translations: {
                    en:"Stress-free ",
                    nl:"Stressvrij "
                  },
                  })}
                </span>
                <br className="lg:hidden"/>
                 {AppTranslator.getLocaleText({
                  locale,
                  translations: {
                    en:"Moving",
                    nl:"Verhuizen"
                  }
                })}
              </p>
              <p className="text-center text-sm lg:text-base text-grey">
                {AppTranslator.getLocaleText({
                  locale,
                  translations: {
                    en:"Create your inventory and receive quotes from trusted movers",
                    nl:"Maak uw inventaris en ontvang offertes van betrouwbare verhuizers."
                  },
                })}
              </p>
            </div>
            <div className="flex-2 max-w-180 mx-auto">
              <HeroBookFormLg />
            </div>
          </div>
        </div>
        <StatsSwiper />
      </div>
    </section>
  );
}
