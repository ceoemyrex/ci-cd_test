"use client";

import { ReactNode } from "react";
import { StepBar } from "./StepsBar";
import { ArrowRight } from "@/app/icons/arrow";
import { LoaderCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { AppTranslator, Locale } from "@/app/utils";

export function BookFormContainer({
  currentStep = 1,
  onNext,
  onPrev,
  children,
  canContinue = false,
  loading = false,
  buttonTitle: btnTitle,
  isNextDisabled = false,
}: {
  currentStep?: number;
  children: ReactNode;
  onPrev?: () => void;
  onNext?: () => void;
  canContinue?: boolean;
  isNextDisabled?: boolean;
  loading?: boolean;
  buttonTitle?: string;
}) {
  const { locale } = useParams<{
    locale: Locale;
  }>();

  const buttonTitle = AppTranslator.getLocaleText({
    locale,
    translations: {
      en: "Continue",
      nl: "Ga verder",
    },
  });

  const shell = (
    <div className="min-h-screen space-y-4 rounded-3xl border border-black/10 bg-white/40 p-4 py-10 backdrop-blur-2xl lg:p-10">
      <p className="text-center text-xl font-medium text-dark lg:text-left lg:text-4xl">
        {AppTranslator.getLocaleText({
          locale,
          translations: {
            en: "Get a quote for a move",
            nl: "Offerte aanvragen",
          },
        })}
      </p>
      <div className="mt-6 space-y-8 lg:mt-12 lg:flex lg:gap-x-8">
        <div className="mb-6 flex-1 space-y-6 lg:mb-0">
          <StepBar currentStep={currentStep} />
        </div>
        <div className="flex-2">
          <button
            onClick={onPrev}
            className="flex h-8 w-8 items-center justify-center gap-x-1 rounded-full border border-[#E5E5E5] bg-white lg:hidden lg:w-auto"
          >
            <ArrowRight width={20} height={20} fill="currentColor" />
          </button>
          {children}
        </div>
      </div>
      <div className="mt-6 space-y-4 lg:flex lg:items-center">
        <button
          onClick={onPrev}
          className="hidden w-full items-center justify-center gap-x-1 rounded-lg border border-[#E5E5E5] bg-white px-4 py-2 text-xs lg:inline-flex lg:w-auto lg:py-4 lg:px-10 lg:text-base"
        >
          <ArrowRight fill="#121212" />
          <span>
            {AppTranslator.getLocaleText({
              locale,
              translations: {
                en: "Go Back",
                nl: "Ga terug",
              },
            })}
          </span>
        </button>
        {canContinue && (
          <button
            disabled={loading || isNextDisabled}
            onClick={onNext}
            className="bg-theme flex h-12 w-full items-center justify-center gap-x-2 rounded-lg px-4 py-2 text-sm text-white disabled:opacity-60 lg:ml-auto lg:w-auto lg:py-4 lg:px-10 lg:text-base"
          >
            {loading && <LoaderCircle className="animate-spin" />}
            {btnTitle || buttonTitle}
            {currentStep < 4 && (
              <span className="-rotate-180">
                <ArrowRight />
              </span>
            )}
          </button>
        )}
      </div>
    </div>
  );
  return shell;
}
