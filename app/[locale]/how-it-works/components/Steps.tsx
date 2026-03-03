"use client";
import { CheckCircle, CheckListIcon, SettingIcon } from "@/app/icons";
import { ReactNode } from "react";
import { Locale, AppTranslator } from "@/app/utils";

interface CurrentStepProps {
  step: number;
  title: { en: string; nl: string };
  description: { en: string; nl: string };
  icon: ReactNode;
  stepIcon: ReactNode;
}

function CurrentStep({
  step,
  title,
  description,
  stepIcon,
  icon,
  locale,
}: CurrentStepProps & { locale: Locale }) {
  const isReversed = step % 2 === 0;

  return (
    <div
      className={`lg:flex space-y-8 ${isReversed ? "flex-row-reverse" : ""} items-center gap-x-36`}
    >
      <div className="flex-1">
        <div className="h-12 w-12 lg:h-16 lg:w-16 rounded-2xl bg-secondary flex items-center justify-center">
          {icon}
        </div>
        <div className="mt-4 lg:mt-8 space-y-2">
          <p className="text-dark lg:text-2xl font-medium">
            {AppTranslator.getLocaleText({ locale, translations: title })}
          </p>
          <p className="text-grey text-sm lg:text-base">
            {AppTranslator.getLocaleText({ locale, translations: description })}
          </p>
        </div>
      </div>
      <div className="flex-1">
        <div className="bg-[#F3F5F7] rounded-xl h-50 lg:h-110 flex items-center justify-center">
          <div className="flex items-center gap-x-1 text-grey font-medium text-sm lg:text-xl">
            {stepIcon}
            <p>
              {locale === "en" ? "Step" : "Stap"} {step}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Steps({ locale = "nl" }: { locale?: Locale }) {
  const steps: CurrentStepProps[] = [
    {
      title: {
        en: "Create your inventory",
        nl: "Stel je inboedel samen",
      },
      description: {
        en: "You can upload photos for AI-based item recognition or manually list your items. Both options are available from the start.",
        nl: "Maak foto’s van je inboedel of maak zelf een lijst. Je kunt meteen beginnen.",
      },
      icon: <CheckListIcon />,
      stepIcon: <CheckListIcon fill="#7C7C8E" />,
      step: 1,
    },
    {
      title: {
        en: "Plan and coordinate",
        nl: "Plan en regel je verhuizing",
      },
      description: {
        en: "Your inventory helps structure the move, allowing better planning and coordination without confusion or guesswork.",
        nl: "Met je inboedellijst houd je je verhuizing overzichtelijk en duidelijk gepland.",
      },
      icon: <SettingIcon />,
      stepIcon: <SettingIcon fill="#7C7C8E" />,
      step: 2,
    },
    {
      title: {
        en: "Finalize and move",
        nl: "Rond je verhuizing af",
      },
      description: {
        en: "Confirm details, review your inventory, and complete the move with full visibility.",
        nl: "Klaar? Loop alles rustig na en rond je verhuizing met een gerust gevoel af.",
      },
      icon: <CheckCircle />,
      stepIcon: <CheckCircle fill="#7C7C8E" />,
      step: 3,
    },
  ];

  return (
    <div className="max-w-310 2xl:max-w-350 bg-white mx-auto px-4">
      <div className="py-18.75 lg:py-37.5 space-y-15">
        {steps.map((step) => (
          <CurrentStep key={`how-it-works-step-${step.step}`} {...step} locale={locale} />
        ))}
      </div>
    </div>
  );
}