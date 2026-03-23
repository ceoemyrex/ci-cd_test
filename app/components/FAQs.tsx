"use client";

import Link from "next/link";
import { CancelIcon, HexagonIcon } from "../icons";
import { PlusIcon } from "../icons/add";
import { useState } from "react";
import { AppTranslator, Locale } from "../utils";
import Image from "next/image";

/* ============================= */
/*        FAQ DATA               */
/* ============================= */

export const faqs = [
  {
    translations: {
      question: {
        en: "Do I have to use AI?",
        nl: "Moet ik AI gebruiken?",
      },
      answer: {
        en: "No. AI is completely optional. You can manually manage your inventory and bookings if you prefer full control.",
        nl: "De prijs hangt af van hoeveel en wat je verhuist. Meer spullen betekent meer ruimte in de verhuiswagen en meer tijd om alles te verhuizen. Door precies te weten wat je meeneemt, kan een verhuisbedrijf een eerlijke en nauwkeurige prijs berekenen en voorkom je extra kosten achteraf.",
      },
    },
  },
  {
    translations: {
      question: {
        en: "How does pricing work?",
        nl: "Hoe werkt de prijsberekening?",
      },
      answer: {
        en: "Pricing is calculated based on distance, inventory size, and service type. You receive transparent estimates before confirming your booking.",
        nl: "Prijzen worden berekend op basis van afstand, inventarisgrootte en type service. Je ontvangt transparante schattingen voordat je je boeking bevestigt.",
      },
    },
  },
  {
    translations: {
      question: {
        en: "Can I edit my inventory later?",
        nl: "Kan ik mijn inventaris later bewerken?",
      },
      answer: {
        en: "Yes. You can update your inventory at any time before your move date to ensure accurate pricing and avoid surprises.",
        nl: "Ja. Je kunt je inventaris op elk moment vóór je verhuisdatum bijwerken om nauwkeurige prijzen te garanderen en verrassingen te voorkomen.",
      },
    },
  },
  {
    translations: {
      question: {
        en: "Is my data secure?",
        nl: "Zijn mijn gegevens veilig?",
      },
      answer: {
        en: "Absolutely. We use industry-standard encryption and secure servers to protect your personal and payment information.",
        nl: "Absoluut. We gebruiken encryptie volgens industrienormen en beveiligde servers om je persoonlijke gegevens en betalingsinformatie te beschermen.",
      },
    },
  },
  {
    translations: {
      question: {
        en: "How do I contact support?",
        nl: "Hoe neem ik contact op met support?",
      },
      answer: {
        en: "You can reach our support team via the Contact page or through live chat inside your dashboard.",
        nl: "Je kunt ons ondersteuningsteam bereiken via de contactpagina of via de livechat in je dashboard.",
      },
    },
  },
];

/* ============================= */
/*        FAQ TRANSLATIONS       */
/* ============================= */

const faqText = {
  badge: {
    en: "Faq",
    nl: "Faq",
  },
  title: {
    en: "Frequently Asked Questions!",
    nl: "Veelgestelde vragen!",
  },
  stillHaveQuestions: {
    en: "Still Have Questions?",
    nl: "Heb je nog vragen?",
  },
  contactUs: {
    en: "Contact Us,",
    nl: "Neem contact op,",
  },
  contactUs2: {
    en: "We are happy to help you",
    nl: "We helpen je graag.",
  },
};

/* ============================= */
/*        FAQ CARD               */
/* ============================= */

type FAQCardProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
};

export function FAQCard({ question, answer, isOpen, onToggle }: FAQCardProps) {
  return (
    <div className={`relative w-full ${isOpen ? "z-50" : "z-0"}`}>
      {/* Question */}
      <div
        onClick={onToggle}
        className="bg-white flex border border-black/10 rounded-lg lg:rounded-2xl items-center justify-between p-4 lg:p-8 cursor-pointer transition-all duration-300 hover:shadow-md"
      >
        <p className="text-sm lg:text-xl text-dark">{question}</p>

        <div
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        >
          {isOpen ? null : <PlusIcon />}
        </div>
      </div>

      {/* Floating Answer */}
      <div
        className={`
          absolute z-50 w-full p-4 lg:p-8 top-[105%] bg-white shadow-lg border rounded-2xl border-[#2D2F361A]/10
          transform transition-all duration-300 ease-in-out origin-top
          ${isOpen ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}
        `}
      >
        <header className="flex items-center justify-between">
          <p className="text-sm lg:text-xl text-dark">{question}</p>

          <button className="cursor-pointer" onClick={onToggle}>
            <CancelIcon />
          </button>
        </header>

        <p className="mt-5 lg:mt-10 text-xs lg:text-base text-grey">{answer}</p>
      </div>
    </div>
  );
}

/* ============================= */
/*        FAQ SECTION            */
/* ============================= */

export function FAQs({ locale = "nl" }: { locale?: Locale }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-15.5 lg:py-31.25 bg-linear-to-b from-[#F8FBFF] to-[#FFFFFF]">
      <div className="space-y-6 lg:flex max-w-310 2xl:max-w-350 px-4 mx-auto items-center gap-x-30">
        {/* Left Side */}
        <div className="flex-2">
          <header>
            <span className="bg-[#CACACA1A]/10 px-4 text-xs lg:text-sm py-1.5 lg:py-2.5 rounded-[100px] text-secondary inline-flex items-center gap-x-1.5 border border-[#B6DDA8]">
              <HexagonIcon />
              {AppTranslator.getLocaleText({
                locale,
                translations: faqText.badge,
              })}
            </span>

            <div className="mt-6 space-y-4">
              <p className="font-bold text-2xl lg:text-5xl">
                {AppTranslator.getLocaleText({
                  locale,
                  translations: faqText.title,
                })}
              </p>
            </div>

            <div className="mt-11 lg:mt-22 border text-dark bg-white border-black/10 p-3 lg:p-6 rounded-2xl">
              <p className="text-base lg:text-2xl font-medium">
                {AppTranslator.getLocaleText({
                  locale,
                  translations: faqText.stillHaveQuestions,
                })}
              </p>

              <p className="text-xs lg:text-lg">
                <Link href={"/contact"} className="text-theme">
                  {AppTranslator.getLocaleText({
                    locale,
                    translations: faqText.contactUs,
                  })}
                </Link>{" "}
                {AppTranslator.getLocaleText({
                  locale,
                  translations: faqText.contactUs2,
                })}
              </p>

              <div className="flex items-center mt-4 lg:mt-9.5">
                <div className="h-10 w-10 lg:h-16 lg:w-16 -rotate-15 rounded-xl border border-secondary relative">
                  <Image
                    src="/images/profile-2.png"
                    className="absolute top-0 rounded-xl left-0 w-full h-full object-cover"
                    alt="Profile 1"
                    width={64}
                    height={64}
                  />
                </div>

                <div className="h-10 w-10 lg:h-16 lg:w-16 rounded-xl -mx-4 border border-secondary relative">
                  <Image
                    src="/images/profile-3.png"
                    className="absolute top-0 rounded-xl left-0 w-full h-full object-cover"
                    alt="Profile 2"
                                        width={64}
                    height={64}
                  />
                </div>

                <div className="h-10 w-10 lg:h-16 lg:w-16 -rotate-5 rounded-xl border border-secondary relative">
                  <Image
                    src="/images/profile-1.png"
                    className="absolute top-0 rounded-xl left-0 w-full h-full object-cover"
                    alt="Profile 3"
                                        width={64}
                    height={64}
                  />
                </div>
              </div>
            </div>
          </header>
        </div>

        {/* Right Side FAQs */}
        <div className="flex-3 space-y-3 lg:space-y-6">
          {faqs.map((faq, index) => (
            <FAQCard
              key={index}
              question={
                AppTranslator.getLocaleText({
                  locale,
                  translations: faq.translations.question,
                }) ?? ""
              }
              answer={
                AppTranslator.getLocaleText({
                  locale,
                  translations: faq.translations.answer,
                }) ?? ""
              }
              isOpen={openIndex === index}
              onToggle={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
