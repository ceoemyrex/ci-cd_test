import { HexagonIcon } from "@/app/icons";
import Link from "next/link";
import { Locale, AppTranslator } from "@/app/utils";

/* eslint-disable @next/next/no-img-element */
export function GetStarted({ locale = "nl" }: { locale?: Locale }) {
  /* ---------------- TRANSLATIONS ---------------- */
  const getStartedText = {
    ctaLabel: {
      en: "CTA",
      nl: "CTA",
    },
    title: {
      en: "Ready to get started?",
      nl: "Klaar om te beginnen?",
    },
    description: {
      en: "Create your inventory and take the first step toward a smoother move.",
      nl: "Breng je inboedel in kaart en zet de eerste stap naar een soepele verhuizing.",
    },
    buttonText: {
      en: "Start Your Move",
      nl: "Start je verhuizing",
    },
  };

  return (
    <section className="max-w-310 2xl:max-w-350 mx-auto px-4">
      <div className="relative rounded-4xl overflow-clip lg:min-h-140">
        <img
          src="/images/get-started.png"
          className="absolute object-cover top-0 right-0 h-full w-full lg:w-8/12"
          alt={AppTranslator.getLocaleText({ locale, translations: getStartedText.title })}
        />
        <img
          src="/images/get-started-art.png"
          className="absolute object-cover top-0 left-0 h-full w-full rounded-4xl"
          alt={AppTranslator.getLocaleText({ locale, translations: getStartedText.title })}
        />

        <div className="relative py-10 bg-secondary/80 lg:bg-transparent lg:min-h-140 flex items-center p-4 lg:px-30">
          <div className="flex-1 text-center lg:text-left">
            <span className="border gap-x-2 items-center border-[#B6DDA8] bg-[#CACACA1A]/10 backdrop-blur-xs inline-flex rounded-[100px] text-white px-3 lg:px-6 py-2 text-xs lg:text-sm lg:py-3">
              <HexagonIcon fill="#ffffff" />
              <span>
                {AppTranslator.getLocaleText({ locale, translations: getStartedText.ctaLabel })}
              </span>
            </span>

            <div className="mt-6 mb-12 space-y-4 text-white">
              <p className="text-white text-2xl lg:text-6xl text-center lg:text-left font-bold">
                {AppTranslator.getLocaleText({ locale, translations: getStartedText.title })}
              </p>
              <p className="text-sm lg:text-base text-center lg:text-left">
                {AppTranslator.getLocaleText({ locale, translations: getStartedText.description })}
              </p>
            </div>

            <Link
              href={`/${locale}/book-move`}
              className="bg-theme inline-flex items-center justify-center px-6 lg:px-13 min-h-12 lg:py-5 text-sm lg:text-lg text-white rounded-2xl font-medium"
            >
              {AppTranslator.getLocaleText({ locale, translations: getStartedText.buttonText })}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}