/* eslint-disable @next/next/no-img-element */
"use client";
import { AppTag } from "@/components";
import { Locale, AppTranslator } from "@/app/utils";

export function JoinUs({ locale = "nl" }: { locale?: Locale }) {
  return (
    <section className="py-18.5 lg:py-37.5 relative">
      <img
        src="/hero-bg.png"
        alt="hero-bg"
        className="absolute lg:rounded-t-4xl top-0 left-0 w-full h-full object-center object-cover"
      />
      <div className="max-w-310 2xl:max-w-350 relative px-4 mx-auto">
        <header className="text-center max-w-153.75 mx-auto">
          <AppTag title={AppTranslator.getLocaleText({ locale, translations: { en: "CTA", nl: "CTA" } })} />
          <div className="mt-6 space-y-4">
            <p className="font-bold text-2xl lg:text-5xl">
              {AppTranslator.getLocaleText({
                locale,
                translations: {
                  en: "Join us on our journey to redefine logistics!",
                  nl: "Bouw met ons mee aan de toekomst van logistiek!",
                },
              })}
            </p>
            <p className="text-grey text-center text-sm lg:text-lg">
              {AppTranslator.getLocaleText({
                locale,
                translations: {
                  en: "For inquiries, partnerships, or service bookings, reach out to us",
                  nl: "Voor vragen, samenwerkingen of boekingen kun je contact met ons opnemen.",
                },
              })}
            </p>
          </div>
          <button className="bg-theme mt-8 lg:mt-12 lg:flex-1 text-white text-xs lg:text-lg rounded-xl lg:rounded-2xl px-5 lg:px-10 py-2.5 w-auto lg:py-5 font-medium">
            {AppTranslator.getLocaleText({
              locale,
              translations: { en: "Contact Us", nl: "Neem contact op" },
            })}
          </button>
        </header>
      </div>
    </section>
  );
}