/* eslint-disable @next/next/no-img-element */
import { heroTranslations as t } from "@/translations";
import { Navbar } from "@/components";
import { CheckBoxIcon, HexagonIcon } from "../icons";
import { StatsSwiper } from "./StatsSwiper";
import { AppTranslator, Locale } from "../utils";
import { HeroBookForm } from "./HeroBookForm";

export function Hero({ locale = "nl" }: { locale?: Locale }) {
  return (
    <section className={``}>
      <div className="relative pb-15 lg:pb-30">
        <img
          src={"/hero-bg.png"}
          alt="hero-bg"
          className="absolute lg:rounded-t-4xl top-0 left-0 w-full h-full object-center object-cover"
        />
        <div className="relative max-w-310 2xl:max-w-350 mx-auto p-4 lg:py-10">
          <Navbar />
          <div className="pt-22 lg:pt-36.25 lg:flex space-y-8 gap-x-8">
            <div className="space-y-4 flex-2 mt-0 lg:mt-14">
              <div className="text-center lg:text-left">
                <span className="bg-[#CACACA1A]/10 px-4 text-xs lg:text-sm py-1.5 lg:py-2.5 rounded-[100px] text-secondary inline-flex items-center gap-x-1.5 border border-[#B6DDA8]">
                  <HexagonIcon />
                  {AppTranslator.getLocaleText({
                    locale,
                    translations: t.badge,
                  })}
                </span>
              </div>
              <p className="font-bold text-dark text-center lg:text-left text-3xl lg:text-5xl leading-[120%]">
                {AppTranslator.getLocaleText({
                  locale,
                  translations: t.title,
                })}
                <span className="text-secondary">
                  {" "}
                  {AppTranslator.getLocaleText({
                    locale,
                    translations: t.titleHighlight,
                  })}
                  .
                </span>
              </p>
              <p className="text-center text-sm lg:text-left lg:text-base text-grey">
                {AppTranslator.getLocaleText({
                  locale,
                  translations: t.description,
                })}
              </p>

              <div className="my-4 lg:my-1 space-y-2 text-sm lg:text-base">
                <div className="flex items-center gap-x-3">
                  <CheckBoxIcon />
                  <p className="text-grey">
                    {AppTranslator.getLocaleText({
                      locale,
                      translations: t.features.ai,
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-x-3">
                  <CheckBoxIcon />
                  <p className="text-grey">
                    {" "}
                    {AppTranslator.getLocaleText({
                      locale,
                      translations: t.features.confidence,
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-x-3">
                  <CheckBoxIcon />
                  <p className="text-grey">
                    {AppTranslator.getLocaleText({
                      locale,
                      translations: t.features.pricing,
                    })}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex-2">
              <HeroBookForm />
            </div>
          </div>
        </div>
        <StatsSwiper />
      </div>
    </section>
  );
}
