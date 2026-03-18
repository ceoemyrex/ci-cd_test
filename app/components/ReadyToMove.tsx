/* eslint-disable @next/next/no-img-element */
import { HexagonIcon } from "@/app/icons";
import { Locale, AppTranslator } from "@/app/utils";
import Link from "next/link";

export function ReadyToMove({
  locale = "nl",
  title,
  description,
  buttonText,
  ctaText,
}: {
  locale?: Locale;
  title?: string;
  description?: string;
  buttonText?: string;
  ctaText?: string;
}) {
  return (
    <section className="max-w-310 2xl:max-w-350 mx-auto px-4">
      <div className="relative rounded-4xl overflow-clip lg:min-h-140">
        <img
          src="/images/ready-to-move.png"
          className="absolute object-cover top-0 right-0 h-full w-full"
          alt="Get Started"
        />
        <img
          src="/images/ready-to-move-art.png"
          className="absolute object-cover top-0 left-0 h-full w-full rounded-4xl"
          alt="Ready To Move"
        />

        <div className="relative py-10 bg-secondary/80 lg:bg-transparent lg:min-h-140 flex items-center p-4 lg:px-30">
          <div className="flex-1 text-center lg:text-left">
            <span className="border gap-x-2 items-center border-[#B6DDA8] bg-[#CACACA1A]/10 backdrop-blur-xs inline-flex rounded-[100px] text-white px-3 lg:px-6 py-2 text-xs lg:text-sm lg:py-3">
              <HexagonIcon fill="#ffffff" />
              <span>
                {AppTranslator.getLocaleText({
                  locale,
                  translations: { en: "CTA", nl: "CTA" },
                  defaultText: ctaText,
                })}
              </span>
            </span>
            <div className="mt-6 max-w-125 mb-12 space-y-4 text-white">
              <p className="text-white text-2xl lg:text-6xl text-center lg:text-left font-bold">
                {AppTranslator.getLocaleText({
                  locale,
                  translations: {
                    en: "Ready to start your move?",
                    nl: "Klaar om te beginnen?",
                  },
                  defaultText: title,
                })}
              </p>
              <p className="text-sm lg:text-base text-center lg:text-left">
                {AppTranslator.getLocaleText({
                  locale,
                  translations: {
                    en: "Create your inventory and move forward in just a few steps.",
                    nl: "Breng je spullen in kaart en zet de eerste stap naar een soepele verhuizing.",
                  },
                  defaultText: description,
                })}
              </p>
            </div>
            <Link href={`/${locale}/book-move`} className="bg-theme inline-flex justify-center items-center px-6 lg:px-13 lg:pr-20 min-h-12 lg:py-5 text-sm lg:text-lg text-white rounded-2xl font-medium">
              {AppTranslator.getLocaleText({
                locale,
                translations: { en: "Book a Move", nl: "Start je verhuizing" },
                defaultText: buttonText,
              })}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}