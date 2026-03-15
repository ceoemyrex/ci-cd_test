/* eslint-disable @next/next/no-img-element */
"use client";
import { AppTag, Navbar } from "@/components";
import { StatsSwiper } from "@/app/components";
import Link from "next/link";
import { Locale, AppTranslator } from "@/app/utils";

export function HowItWorksHero({ locale = "nl" }: { locale?: Locale }) {
  /* ---------------- TRANSLATIONS ---------------- */
  const heroText = {
    tagTitle: {
      en: "Smooth Process",
      nl: "Zorgeloos geregeld",
    },
    heading: {
      en: "How Zinter helps coordinate Your Move",
      nl: "Zo regelt Zinter jouw verhuizing",
    },
    headingHighlight: {
      en: "Your Move",
      nl: "",
    },
    description: {
      en: "Zinter focuses on one thing first: creating a clear inventory. Once that's done, move coordination becomes faster, easier, and more accurate.",
      nl: `Zinter start met een duidelijk overzicht van je inboedel. 
Daarna verloopt je verhuizing sneller en met meer zekerheid.`,
    },
    buttonText: {
      en: "Get Quotes",
      nl: "Vraag offertes aan",
    },
  };

  return (
    <section className={``}>
      <div className="relative pb-15 lg:pb-30 lg:rounded-t-4xl">
        <img
          src={"/hero-bg.png"}
          alt={AppTranslator.getLocaleText({
            locale,
            translations: heroText.heading,
          })}
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
                    translations: heroText.tagTitle,
                  })}
                />
              </div>

              <p className="font-bold text-dark text-center text-3xl lg:text-6xl leading-[120%]">
                {AppTranslator.getLocaleText({
                  locale,
                  translations: heroText.heading,
                })}
                <span className="text-secondary">
                  {AppTranslator.getLocaleText({
                    locale,
                    translations: heroText.headingHighlight,
                  })}
                </span>
                {AppTranslator.getLocaleText({
                  locale,
                  translations: heroText.heading,
                }).split(
                  AppTranslator.getLocaleText({
                    locale,
                    translations: heroText.headingHighlight,
                  }),
                )[1] || ""}
              </p>

              <p className="text-center text-sm lg:text-lg text-grey">
                {AppTranslator.getLocaleText({
                  locale,
                  translations: heroText.description,
                })}
              </p>

              <Link
                href={`/${locale}/book-move/`}
                className="bg-theme inline-flex items-center justify-center rounded-2xl text-white h-12 lg:h-17.5 px-12 lg:px-16 mt-5 lg:mt-10 font-medium text-base lg:text-xl"
              >
                {AppTranslator.getLocaleText({
                  locale,
                  translations: heroText.buttonText,
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
