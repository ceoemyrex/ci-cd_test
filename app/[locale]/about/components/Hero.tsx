/* eslint-disable @next/next/no-img-element */
"use client";
import { Navbar, AppTag } from "@/components";
import { Locale, AppTranslator } from "@/app/utils";

export function AboutHero({ locale = "nl" }: { locale?: Locale }) {
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
          <div className="pt-22 lg:pt-36.25">
            <div className="space-y-4 max-w-150 mx-auto text-center">
              <div className="text-center">
                <AppTag
                  title={AppTranslator.getLocaleText({
                    locale,
                    translations: { en: "About", nl: "Over" },
                  })}
                />
              </div>
              <p className="font-bold text-dark text-center text-3xl lg:text-6xl leading-[120%]">
                {AppTranslator.getLocaleText({
                  locale,
                  translations: { en: "About", nl: "Over" },
                })}
                <span className="text-secondary"> Zinter</span>
              </p>
              <p className="text-center text-sm lg:text-lg text-grey">
                {AppTranslator.getLocaleText({
                  locale,
                  translations: {
                    en: "Our mission is to revolutionize the logistics industry.",
                    nl: "Onze missie is om de logistieke sector te transformeren.",
                  },
                })}
              </p>
            </div>

            <div className="border border-white mt-10 lg:mt-20 rounded-4xl p-3 lg:p-6">
              <div className="min-h-70 lg:min-h-140.5 w-full relative bg-white rounded-4xl overflow-clip border border-secondary">
                <img
                  src="/images/about-2.jpg"
                  className="absolute top-0 left-0 h-full w-full object-center object-cover"
                  alt="about"
                />
                <div className="relative p-4 lg:p-8 lg:flex items-center justify-center">
                  <div className="border border-white gap-x-3 bg-white/25 lg:flex items-center p-4 rounded-xl">
                    <div className="flex items-center">
                      <div className="bg-[#DFDFDF] relative h-6 overflow-clip lg:h-8 w-6 lg:w-8 rounded-full">
                        <img
                          src="/images/profile-1.png"
                          className="absolute top-0 left-0 w-full h-full object-cover"
                          alt="Profile"
                        />
                      </div>
                      <div className="bg-[#FFFFFF] relative -mx-3.5 h-6 overflow-clip lg:h-8 w-6 lg:w-8 rounded-full">
                        <img
                          src="/images/profile-2.png"
                          className="absolute top-0 left-0 w-full h-full object-cover"
                          alt="Profile"
                        />
                      </div>
                      <div className="bg-[#CDCCCC] overflow-clip relative h-6 lg:h-8 w-6 lg:w-8 rounded-full">
                        <img
                          src="/images/profile-3.png"
                          className="absolute top-0 left-0 w-full h-full object-cover"
                          alt="Profile"
                        />
                      </div>
                    </div>
                    <p className="text-dark text-xs lg:text-base">
                      {AppTranslator.getLocaleText({
                        locale,
                        translations: {
                          en: "A strong team of highly skilled and disciplined people",
                          nl: "Een sterk team van zeer bekwame en gedisciplineerde mensen",
                        },
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:grid grid-cols-2 mt-6 space-y-8 lg:mt-12 gap-x-30">
              <div>
                <p className="text-secondary text-xs lg:text-sm">
                  {AppTranslator.getLocaleText({
                    locale,
                    translations: { en: "Hassle Free Move", nl: "Zorgeloze Verhuizing" },
                  })}
                </p>
                <p className="text-dark text-lg lg:text-[28px] lg:leading-[120%] font-bold">
                  {AppTranslator.getLocaleText({
                    locale,
                    translations: {
                      en: "Our mission is to ",
                      nl: "Onze missie is om ",
                    },
                  })}
                  <span className="text-grey">
                    {AppTranslator.getLocaleText({
                      locale,
                      translations: {
                        en: "revolutionize the logistics industry",
                        nl: "de logistieke sector te transformeren",
                      },
                    })}
                  </span>{" "}
                  {AppTranslator.getLocaleText({
                    locale,
                    translations: {
                      en: "by offering seamless, tech-driven solutions",
                      nl: "door naadloze, op technologie gebaseerde oplossingen te bieden",
                    },
                  })}
                </p>
              </div>
              <div>
                <header className="flex gap-x-16">
                  <div>
                    <p className="lg:text-xl text-black">2024</p>
                    <p className="text-grey text-sm lg:text-base">
                      {AppTranslator.getLocaleText({
                        locale,
                        translations: { en: "Founded", nl: "Opgericht" },
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="lg:text-xl text-black">Netherlands</p>
                    <p className="text-grey text-sm lg:text-base">
                      {AppTranslator.getLocaleText({
                        locale,
                        translations: { en: "Location", nl: "Locatie" },
                      })}
                    </p>
                  </div>
                </header>
                <p className="text-grey mt-6 text-sm lg:text-base">
                  {AppTranslator.getLocaleText({
                    locale,
                    translations: {
                      en: "That simplify and optimize the moving experience for individuals and businesses alike. Zinter BV is committed to innovation, efficiency, and customer satisfaction.",
                      nl: "Die de verhuiservaring voor zowel individuen als bedrijven vereenvoudigen en optimaliseren. Zinter BV zet zich in voor innovatie, efficiëntie en klanttevredenheid.",
                    },
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}