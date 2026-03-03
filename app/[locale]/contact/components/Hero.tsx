/* eslint-disable @next/next/no-img-element */
"use client";
import { MessageIcon, SendIcon } from "@/app/icons";
import { MailIcon } from "@/app/icons/mail";
import { AppTag, Navbar } from "@/components";
import { Locale, AppTranslator } from "@/app/utils";

export function ContactHero({ locale = "nl" }: { locale?: Locale }) {
  return (
    <section>
      <div className="relative pb-15 lg:pb-30 lg:rounded-t-4xl">
        <img
          src={"/hero-bg.png"}
          alt="hero-bg"
          className="absolute lg:rounded-t-4xl top-0 left-0 w-full h-full object-center object-cover"
        />
        <div className="relative max-w-310 2xl:max-w-350 mx-auto p-4">
          <Navbar />
          <div className="pt-12 max-w-150 mx-auto lg:pt-26.25">
            <div className="space-y-4 text-center">
              <AppTag title={AppTranslator.getLocaleText({ 
                locale, 
                translations: { en: "Contact", nl: "Contact" } 
              })} />
              
              <p className="font-bold text-dark text-3xl lg:text-6xl leading-[120%]">
                {AppTranslator.getLocaleText({
                  locale,
                  translations: { en: "Contact Us", nl: "Neem Contact Op" },
                })}
              </p>
              <p className="text-sm lg:text-lg text-grey">
                {AppTranslator.getLocaleText({
                  locale,
                  translations: {
                    en: "Questions about your move or inventory options? Send a message and we'll help you move forward with clarity.",
                    nl: "Vragen over je verhuizing of spullen? Wij helpen je graag verder.",
                  },
                })}
              </p>
            </div>

            <form className="bg-white shadow rounded-2xl mt-13 lg:mt-26">
              <div className="p-4 lg:p-10 border-b space-y-5 border-black/10">
                <div className="space-y-3">
                  <p className="text-dark lg:text-lg">
                    {AppTranslator.getLocaleText({ locale, translations: { en: "Name", nl: "Naam" } })}
                  </p>
                  <input
                    placeholder={AppTranslator.getLocaleText({ locale, translations: { en: "Your name", nl: "Je naam:" } })}
                    type="text"
                    className="w-full outline-theme/30 bg-[#F3F3F4] rounded-lg p-3 lg:p-5 placeholder:text-grey"
                  />
                </div>
                <div>
                  <p className="text-dark lg:text-lg">
                    {AppTranslator.getLocaleText({ locale, translations: { en: "Email", nl: "E-mailadres" } })}
                  </p>
                  <input
                    placeholder="johndoe@example.com"
                    type="email"
                    className="w-full outline-theme/30 bg-[#F3F3F4] rounded-lg p-3 lg:p-5 placeholder:text-grey"
                  />
                </div>
                <div>
                  <p className="text-dark lg:text-lg">
                    {AppTranslator.getLocaleText({ locale, translations: { en: "Message", nl: "Je vraag" } })}
                  </p>
                  <textarea
                    placeholder={AppTranslator.getLocaleText({ locale, translations: { en: "How can we help?", nl: "Waarmee kunnen wij je helpen?" } })}
                    className="w-full resize-none h-50 outline-theme/30 bg-[#F3F3F4] rounded-lg p-3 lg:p-5 placeholder:text-grey"
                  />
                </div>
              </div>

              <footer className="p-4 lg:p-10">
                <button className="w-full bg-theme lg:text-lg font-medium p-3 lg:p-5 text-white rounded-xl flex items-center justify-center gap-x-2">
                  <SendIcon />
                  <span>
                    {AppTranslator.getLocaleText({ locale, translations: { en: "Send Message", nl: "Versturen" } })}
                  </span>
                </button>
              </footer>
            </form>

            <div className="space-y-4 lg:space-y-0 lg:grid grid-cols-2 gap-x-8 mt-10 lg:mt-16">
              <div className="border rounded-lg lg:rounded-2xl gap-x-4 shadow border-[#B6DDA84D]/30 p-4 lg:p-6 flex bg-white">
                <div className="lg:h-12 w-10 h-10 lg:w-12 bg-[#EFEFEF] rounded-lg flex items-center justify-center">
                  <MailIcon />
                </div>
                <div>
                  <p className="text-dark text-sm lg:text-base">{AppTranslator.getLocaleText({ locale, translations: { en: "Email", nl: "E-mailadres" } })}</p>
                  <p className="text-grey text-xs lg:text-sm">support@zinter.com</p>
                </div>
              </div>

              <div className="border rounded-lg lg:rounded-2xl gap-x-4 shadow border-[#B6DDA84D]/30 p-4 lg:p-6 flex bg-white">
                <div className="h-10 lg:h-12 w-10 lg:w-12 bg-[#EFEFEF] flex items-center justify-center rounded-lg">
                  <MessageIcon />
                </div>
                <div>
                  <p className="text-dark text-sm lg:text-base">{AppTranslator.getLocaleText({ locale, translations: { en: "Response Time", nl: "Reactietijd" } })}</p>
                  <p className="text-grey text-xs lg:text-sm">{AppTranslator.getLocaleText({ locale, translations: { en: "Usually within 24 hours", nl: "wij reageren meestal binnen 24 uur." } })}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}