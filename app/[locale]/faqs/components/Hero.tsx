"use client";
import { FAQCard, faqs } from "@/app/components";
import { AppTag, Navbar } from "@/components";
import { useState } from "react";

/* eslint-disable @next/next/no-img-element */
export function FAQHero() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={``}>
      <div className=" relative pb-15 lg:pb-30 lg:rounded-t-4xl">
        <img
          src={"/hero-bg.png"}
          alt="hero-bg"
          className="absolute lg:rounded-t-4xl top-0 left-0 w-full h-full object-center object-cover"
        />
        <div className="relative max-w-310 2xl:max-w-350 mx-auto p-4">
          <Navbar />
          <div className="pt-22 max-w-140 mx-auto lg:pt-36.25">
            <div className="space-y-4  text-center">
              <div className="text-center">
                <AppTag title="Faq" />
              </div>
              <p className="font-bold text-dark text-center text-3xl lg:text-5xl leading-[120%]">
                Frequently asked questions
              </p>
              <p className="text-center text-sm lg:text-lg text-grey">
                Find answers to common questions about inventory options,
                booking, pricing, and privacy.
              </p>
            </div>
          </div>
          <div className="space-y-4 mt-20 max-w-200 mx-auto lg:mt-40">
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
      </div>
    </section>
  );
}
