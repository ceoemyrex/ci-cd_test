/* eslint-disable @next/next/no-img-element */
import { HexagonIcon } from "@/app/icons";
import Link from "next/link";
import { AppTranslator, Locale } from "@/app/utils";

export function StillHaveQuestions({locale="nl"}:{locale?:Locale}) {


  // Example translations object (replace with your real translation source)
  const translations = {
    ctaText: {
      en: "FAQ",
      nl: "FAQ",
    },
    title: {
      en: "Still have questions?",
      nl: "Nog meer vragen?",
    },
    description: {
      en: "Our team is here to help you with any questions about your move.",
      nl: "Ons team is hier om al jouw verhuisvragen te beantwoorden.",
    },
    buttonText: {
      en: "Contact Us",
      nl: "Neem contact op",
    },
  };

  return (
    <section className="max-w-310 2xl:max-w-350 mx-auto px-4">
      <div className="relative rounded-4xl overflow-clip lg:min-h-140">
        <img
          src="/images/questions.png"
          className="absolute object-cover top-0 left-0 h-full w-full rounded-4xl"
          alt={AppTranslator.getLocaleText({ translations: translations.title, locale })}
        />
        <div className="bg-secondary/54 absolute top-0 left-0 w-full h-full" />

        <div className="relative py-10 bg-secondary/80 lg:bg-transparent lg:min-h-140 flex items-center p-4 lg:px-30">
          <div className="flex-1 text-center">
            <span className="border gap-x-2 items-center border-[#B6DDA8] bg-[#CACACA1A]/10 backdrop-blur-xs inline-flex rounded-[100px] text-white px-3 lg:px-6 py-2 text-xs lg:text-sm lg:py-3">
              <HexagonIcon fill="#ffffff" />
              <span>
                {AppTranslator.getLocaleText({ translations: translations.ctaText, locale })}
              </span>
            </span>

            <div className="mt-6 max-w-200 mx-auto mb-12 space-y-4 text-white">
              <p className="text-white text-2xl lg:text-6xl text-center font-bold">
                {AppTranslator.getLocaleText({ translations: translations.title, locale })}
              </p>
              <p className="text-sm lg:text-base text-center">
                {AppTranslator.getLocaleText({ translations: translations.description, locale })}
              </p>
            </div>

            <Link
              href="/contact"
              className="bg-theme inline-flex justify-center items-center px-6 lg:px-13 min-h-12 lg:py-5 text-sm lg:text-lg text-white rounded-2xl font-medium"
            >
              {AppTranslator.getLocaleText({ translations: translations.buttonText, locale })}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}