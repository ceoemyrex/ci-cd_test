"use client";
import { FAQCard, faqs } from "@/app/components";
import { AppTranslator, Locale } from "@/app/utils";
import { AppTag, Navbar } from "@/components";
import { useParams } from "next/navigation";
import { useState } from "react";

/* eslint-disable @next/next/no-img-element */
export function FAQHero() {
  const { locale } = useParams<{ locale: Locale }>();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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

          <div className="pt-22 max-w-140 mx-auto lg:pt-36.25 text-center space-y-4">
            <AppTag title={AppTranslator.getLocaleText({
              locale,
              translations: { en: "Faq", nl: "Veelgestelde vragen" }
            })} />

            <p className="font-bold text-dark text-3xl lg:text-5xl leading-[120%]">
              {AppTranslator.getLocaleText({
                locale,
                translations: {
                  en: "Frequently asked questions",
                  nl: "Veelgestelde vragen",
                },
              })}
            </p>

            <p className="text-sm lg:text-lg text-grey">
              {AppTranslator.getLocaleText({
                locale,
                translations: {
                  en: "Find answers to common questions about inventory options, booking, pricing, and privacy.",
                  nl: "Vind antwoorden op veelgestelde vragen over inventarisopties, boeking, prijzen en privacy.",
                },
              })}
            </p>
          </div>

          <div className="space-y-4 mt-20 max-w-200 mx-auto lg:mt-40">
            {faqs.map((faq, index) => (
              <FAQCard
                key={index}
                question={
                  AppTranslator.getLocaleText({
                    translations: faq.translations.question,
                    locale,
                  }) ?? ""
                }
                answer={
                  AppTranslator.getLocaleText({
                    translations: faq.translations.answer,
                    locale,
                  }) ?? ""
                }
                isOpen={openIndex === index}
                onToggle={() => toggleFAQ(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}