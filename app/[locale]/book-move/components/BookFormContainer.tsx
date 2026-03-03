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

  return (
    <div className="bg-white/40 p-4 py-10 lg:p-10 backdrop-blur-2xl space-y-4 border border-black/10 min-h-screen rounded-3xl">
      <p className="text-xl text-center lg:text-left lg:text-4xl font-medium text-dark">
        {AppTranslator.getLocaleText({
          locale,
          translations: {
            en: "Get a quote for a move",
            nl: "Offerte aanvragen",
          },
        })}
      </p>
      <div className="mt-6 lg:mt-12 space-y-8 lg:flex gap-x-8">
        <div className="flex-1 mb-6 lg:mb-0">
          <StepBar currentStep={currentStep} />
        </div>
        <div className="flex-2">
          <button
            onClick={onPrev}
            className="gap-x-1 justify-center bg-white lg:w-auto border border-[#E5E5E5] h-8 w-8 rounded-full flex lg:hidden items-center"
          >
            <ArrowRight width={20} height={20} fill="currentColor" />
          </button>
          {children}
        </div>
      </div>
      <div className="lg:flex space-y-4 items-center mt-6">
        <button
          onClick={onPrev}
          className="py-2 hidden lg:inline-flex lg:py-4 text-xs lg:text-base rounded-lg bg-white px-4 lg:px-10 gap-x-1 justify-center w-full lg:w-auto border border-[#E5E5E5] items-center"
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
            className="bg-theme disabled:opacity-60 flex gap-x-2 text-xs lg:text-base justify-center items-center ml-auto px-4 lg:px-10 py-2 w-full lg:w-auto lg:py-4 rounded-lg text-white"
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
}
