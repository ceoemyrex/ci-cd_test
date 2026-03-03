"use client";

import { HexagonIcon, CheckListIcon, SettingIcon, CheckCircle } from "../icons";
import { AppTranslator, Locale } from "../utils";

/* ---------------- HOW IT WORKS TRANSLATIONS ---------------- */

const howItWorksText = {
  badge: {
    en: "Clear Moving",
    nl: "Duidelijke Verhuizing",
  },
  title: {
    en: "How Zinter works",
    nl: "Zo werkt Zinter",
  },
  description: {
    en: "Start with inventory first. Then coordinate what you need..",
    nl: "Met je inboedel als basis stemmen we de juiste diensten en plannen af.",
  },
  steps: [
    {
      title: {
        en: "Create Inventory",
        nl: "Stel je spullen samen",
      },
      description: {
        en: "Choose AI photo upload or manual list from the start",
        nl: "Kies voor onze AI-herkenning of stel handmatig een lijst samen.",
      },
      icon: <CheckListIcon />,
    },
    {
      title: {
        en: "Coordinate details",
        nl: "Regel je details",
      },
      description: {
        en: "Use inventory to plan services, timing, and requirements.",
        nl: "Gebruik je spullen om diensten en planning af te stemmen..",
      },
      icon: <SettingIcon />,
    },
    {
      title: {
        en: "Finalize with confidence",
        nl: "Rond af met zekerheid",
      },
      description: {
        en: "Review, confirm, and complete with full visibility.",
        nl: "Bevestig en rond je verhuizing af met volledig inzicht.",
      },
      icon: <CheckCircle />,
    },
  ],
};

/* ---------------- COMPONENT ---------------- */

export function HowItWorks({ locale = "nl" }: { locale?: Locale }) {
  return (
    <section className="py-18.5 lg:py-37.5">
      <div className="max-w-310 2xl:max-w-350 px-4 mx-auto">
        <header className="text-center max-w-153.75 mx-auto">
          <span className="bg-[#CACACA1A]/10 px-4 text-xs lg:text-sm py-1.5 lg:py-2.5 rounded-[100px] text-secondary inline-flex items-center gap-x-1.5 border border-[#B6DDA8]">
            <HexagonIcon />
            {AppTranslator.getLocaleText({
              locale,
              translations: howItWorksText.badge,
            })}
          </span>
          <div className="mt-6 space-y-4">
            <p className="font-bold text-2xl lg:text-5xl">
              {AppTranslator.getLocaleText({
                locale,
                translations: howItWorksText.title,
              })}
            </p>
            <p className="text-grey text-center text-sm lg:text-lg">
              {AppTranslator.getLocaleText({
                locale,
                translations: howItWorksText.description,
              })}
            </p>
          </div>
        </header>

        <div className="relative mt-10 lg:mt-20">
          {/* Horizontal Line */}
          <div className="absolute hidden lg:block top-8 left-1/6 right-1/6 h-0.5 bg-secondary/20 z-0"></div>

          <div className="lg:grid grid-cols-3 gap-x-16 relative z-10 space-y-4">
            {howItWorksText.steps.map((step, index) => (
              <div key={index} className="space-y-4 lg:space-y-8 text-center">
                <div className="h-16 w-16 rounded-full bg-secondary mx-auto flex items-center justify-center">
                  {step.icon}
                </div>
                <div className="space-y-1">
                  <p className="text-dark text-lg lg:text-2xl font-medium">
                    {AppTranslator.getLocaleText({
                      locale,
                      translations: step.title,
                    })}
                  </p>
                  <p className="text-grey text-xs lg:text-sm">
                    {AppTranslator.getLocaleText({
                      locale,
                      translations: step.description,
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}