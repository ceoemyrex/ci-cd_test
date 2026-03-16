/* eslint-disable @next/next/no-img-element */
"use client";
import { AppTag, Navbar } from "@/components";
import { StatsSwiper } from "@/app/components";
import { Locale, AppTranslator } from "@/app/utils";
import Link from "next/link";

export function BlogHero({ locale = "nl" }: { locale?: Locale }) {
  return (
    <section>
      <div className="relative pb-15 lg:pb-30 lg:rounded-t-4xl">
        <img
          src="/hero-bg.png"
          alt="hero-bg"
          className="absolute lg:rounded-t-4xl top-0 left-0 w-full h-full object-center object-cover"
        />
        <div className="relative max-w-310 2xl:max-w-350 mx-auto p-4">
          <Navbar />
          <div className="pt-22 lg:pt-36.25">
            <div className="space-y-4 max-w-150 mx-auto text-center">
              <div className="text-center">
                <AppTag
                  title={AppTranslator.getLocaleText({
                    locale,
                    translations: {
                      en: "Quick Booking",
                      nl: "Snelle Boeking",
                    },
                  })}
                />
              </div>
              <p className="font-bold text-dark text-center text-3xl lg:text-6xl leading-[120%]">
                {AppTranslator.getLocaleText({
                  locale,
                  translations: {
                    en: "Moving and inventory",
                    nl: "Tips voor je verhuizing",
                  },
                })}{" "}
                <span className="text-secondary">
                  {AppTranslator.getLocaleText({
                    locale,
                    translations: { en: "Guides", nl: "" },
                  })}
                </span>
              </p>
              <p className="text-center text-sm lg:text-lg text-grey">
                {AppTranslator.getLocaleText({
                  locale,
                  translations: {
                    en: "Explore practical articles on move planning, inventory creation, pricing, and logistics.",
                    nl: "Lees handige tips over het plannen van je verhuizing, het maken van een inboedellijst en alles wat daarbij komt kijken.",
                  },
                })}
              </p>

              <Link href={`/${locale}/book-move`} className="bg-theme rounded-2xl inline-flex items-center text-white h-12 lg:h-17.5 px-12 lg:px-16 mt-5 lg:mt-10 font-medium text-base lg:text-xl">
                {AppTranslator.getLocaleText({
                  locale,
                  translations: {
              en:"Get Quotes",
              nl:"Vraag offertes aan"
            },
                })}
              </Link>
            </div>
          </div>
        </div>
        <StatsSwiper />
      </div>
    </section>
  );
}