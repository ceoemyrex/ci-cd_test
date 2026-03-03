/* eslint-disable @next/next/no-img-element */
"use client";
import { LockIcon, PrivacyIcon, Shield, UserCheckIcon } from "@/app/icons";
import { Navbar, AppTag } from "@/components";
import { ReactNode } from "react";
import { AppTranslator, Locale } from "@/app/utils";

function TrustCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <div className="bg-white p-4 lg:p-8 border border-black/10 rounded-2xl">
      <div className="h-10 lg:h-16 w-10 lg:w-16 rounded-xl flex items-center justify-center bg-[#EBF5EF]">
        {icon}
      </div>
      <div className="mt-6 lg:mt-17 space-y-2">
        <p className="text-base lg:text-2xl font-medium text-dark">{title}</p>
        <p className="text-sm lg:text-base text-grey">{description}</p>
      </div>
    </div>
  );
}

export function TrustAndSafetyHero({ locale }: { locale: Locale }) {
  return (
    <section>
      <div className="relative pb-15 lg:pb-30 lg:rounded-t-4xl">
        <img
          src="/hero-bg.png"
          alt="hero-bg"
          className="absolute lg:rounded-t-4xl top-0 left-0 w-full h-full object-center object-cover"
        />

        <div className="relative max-w-310 2xl:max-w-350 mx-auto p-4 lg:py-10 lg:p-10">
          <Navbar />

          <div className="pt-22 max-w-150 mx-auto lg:pt-36.25">
            <div className="space-y-4 text-center">
              <AppTag
                title={AppTranslator.getLocaleText({
                  locale,
                  translations: {
                    en: "Trust and Safety",
                    nl: "Vertrouwen en veiliheid",
                  },
                })}
              />

              <p className="font-bold text-dark text-3xl lg:text-5xl leading-[120%]">
                {AppTranslator.getLocaleText({
                  locale,
                  translations: {
                    en: "How inventory reduces ",
                    nl: "Zo voorkom je onverwachte kosten met een duidelijke lijst van je inboedel ",
                  },
                })}
                <span className="text-secondary">
                  {AppTranslator.getLocaleText({
                    locale,
                    translations: {
                      en: "Surprise Costs",
                      nl: "",
                    },
                  })}
                </span>
              </p>

              <p className="text-sm lg:text-lg text-grey">
                {AppTranslator.getLocaleText({
                  locale,
                  translations: {
                    en: "One of the most common complaints about moving is unexpected costs. Here's how creating a clear inventory helps avoid pricing surprises.",
                    nl: "Onverwachte kosten zijn een van de grootste frustraties bij een verhuizing. Met een duidelijke inboedellijst voorkom je verrassingen in de prijs.",
                  },
                })}
              </p>
            </div>
          </div>

          <div className="space-y-4 lg:space-y-0 lg:grid grid-cols-2 gap-8 mt-20 lg:mt-60">
            <TrustCard
              icon={<LockIcon />}
              title={AppTranslator.getLocaleText({
                locale,
                translations: {
                  en: "Data Protection",
                  nl: "Bescherming van je gegevens",
                },
              })}
              description={AppTranslator.getLocaleText({
                locale,
                translations: {
                  en: "Inventory data and images are handled securely and responsibly. We use industry-standard encryption to protect your information.",
                  nl: "Gegevens en foto’s worden veilig verwerkt. wij gebruiken moderne versleutelingen om al jouw informatie te beschermen.",
                },
              })}
            />

            <TrustCard
              icon={<PrivacyIcon />}
              title={AppTranslator.getLocaleText({
                locale,
                translations: {
                  en: "Privacy First",
                  nl: "Privacy staat voorop",
                },
              })}
              description={AppTranslator.getLocaleText({
                locale,
                translations: {
                  en: "AI is optional. We never force you to use features you're not comfortable with. Your choices are always respected.",
                  nl: "Zinter dwingt je nooit iets te gebruiken. Je bepaalt altijd zelf welke functies je gebruikt. AI is altijd optioneel.",
                },
              })}
            />

            <TrustCard
              icon={<Shield />}
              title={AppTranslator.getLocaleText({
                locale,
                translations: {
                  en: "Transparency",
                  nl: "Transparantie",
                },
              })}
              description={AppTranslator.getLocaleText({
                locale,
                translations: {
                  en: "No hidden fees, no surprise charges. Clear inventory leads to clear pricing and honest communication.",
                  nl: "Geen verborgen kosten en geen verrassingen. Een duidelijke lijst van je spullen zorgt voor heldere prijzen en eerlijke communicatie.",
                },
              })}
            />

            <TrustCard
              icon={<UserCheckIcon />}
              title={AppTranslator.getLocaleText({
                locale,
                translations: {
                  en: "Verified Partners",
                  nl: "Geverifieerde partners",
                },
              })}
              description={AppTranslator.getLocaleText({
                locale,
                translations: {
                  en: "We work with trusted moving partners who meet our quality and reliability standards.",
                  nl: "Zinter werkt samen met betrouwbare verhuisbedrijven die voldoen aan onze kwaliteits- en betrouwbaarheidseisen.",
                },
              })}
            />
          </div>
        </div>
      </div>
    </section>
  );
}