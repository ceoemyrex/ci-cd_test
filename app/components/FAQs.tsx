/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { CancelIcon, HexagonIcon } from "../icons";
import { PlusIcon } from "../icons/add";
import { useState } from "react";

/* ============================= */
/*        FAQ DATA               */
/* ============================= */

export const faqs = [
  {
    question: "Do I have to use AI?",
    answer:
      "No. AI is completely optional. You can manually manage your inventory and bookings if you prefer full control.",
  },
  {
    question: "How does pricing work?",
    answer:
      "Pricing is calculated based on distance, inventory size, and service type. You receive transparent estimates before confirming your booking.",
  },
  {
    question: "Can I edit my inventory later?",
    answer:
      "Yes. You can update your inventory at any time before your move date to ensure accurate pricing and avoid surprises.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We use industry-standard encryption and secure servers to protect your personal and payment information.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can reach our support team via the Contact page or through live chat inside your dashboard.",
  },
];

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
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          {isOpen ? null : <PlusIcon />}
        </div>
      </div>

      {/* Floating Answer */}
      <div
        className={`
          absolute z-50 w-full p-4 lg:p-8 top-[105%] bg-white shadow-lg border rounded-2xl border-[#2D2F361A]/10
          transform transition-all duration-300 ease-in-out origin-top
          ${
            isOpen
              ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
              : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
          }
        `}
      >
        <header className="flex items-center justify-between">
          <p className="text-sm lg:text-xl text-dark">{question}</p>

          <button className="cursor-pointer" onClick={onToggle}>
            <CancelIcon />
          </button>
        </header>

        <p className="mt-5 lg:mt-10 text-xs lg:text-base text-grey">
          {answer}
        </p>
      </div>
    </div>
  );
}

/* ============================= */
/*        FAQ SECTION            */
/* ============================= */

export function FAQs() {
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
              Faq
            </span>

            <div className="mt-6 space-y-4">
              <p className="font-bold text-2xl lg:text-5xl">
                Frequently Asked Questions!
              </p>
            </div>

            <div className="mt-11 lg:mt-22 border text-dark bg-white border-black/10 p-3 lg:p-6 rounded-2xl">
              <p className="text-base lg:text-2xl font-medium">
                Still Have Questions?
              </p>

              <p className="text-xs lg:text-lg">
                <Link href={"/contact"} className="text-theme">
                  Contact Us,
                </Link>{" "}
                We are happy to help you
              </p>

              <div className="flex items-center mt-4 lg:mt-9.5">
                <div className="h-10 w-10 lg:h-16 lg:w-16 -rotate-15 rounded-xl border border-secondary relative">
                  <img
                    src="/images/profile-2.png"
                    className="absolute top-0 rounded-xl left-0 w-full h-full object-cover"
                    alt="Profile 1"
                  />
                </div>

                <div className="h-10 w-10 lg:h-16 lg:w-16 rounded-xl -mx-4 border border-secondary relative">
                  <img
                    src="/images/profile-3.png"
                    className="absolute top-0 rounded-xl left-0 w-full h-full object-cover"
                    alt="Profile 2"
                  />
                </div>

                <div className="h-10 w-10 lg:h-16 lg:w-16 -rotate-5 rounded-xl border border-secondary relative">
                  <img
                    src="/images/profile-1.png"
                    className="absolute top-0 rounded-xl left-0 w-full h-full object-cover"
                    alt="Profile 3"
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
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
