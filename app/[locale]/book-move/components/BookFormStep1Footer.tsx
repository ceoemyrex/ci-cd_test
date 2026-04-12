"use client";

import { ArrowRight } from "@/app/icons/arrow";
import { AppTranslator, Locale } from "@/app/utils";
import { useBookMoveStep1 } from "./BookMoveStep1Context";

export function BookMoveStep1MobileBackButton({
  onPrev,
}: {
  onPrev?: () => void;
}) {
  const { subView, goToGrid, goBackFromPayment } = useBookMoveStep1();

  const handleClick = () => {
    if (subView === "payment") goBackFromPayment();
    else if (subView === "detail") goToGrid();
    else onPrev?.();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex h-8 w-8 shrink-0 items-center justify-center gap-x-1 rounded-full border border-[#E5E5E5] bg-white lg:hidden"
    >
      <ArrowRight width={20} height={20} fill="currentColor" />
    </button>
  );
}

export function BookFormStep1Footer({
  onPrev,
  locale,
}: {
  onPrev?: () => void;
  locale: Locale;
}) {
  const { subView, goToGrid, goBackFromPayment, goToPayment } =
    useBookMoveStep1();

  if (subView === "grid") {
    return null;
  }

  const handleGoBack = () => {
    if (subView === "payment") goBackFromPayment();
    else if (subView === "detail") goToGrid();
    else onPrev?.();
  };

  const makePaymentLabel = AppTranslator.getLocaleText({
    locale,
    translations: {
      en: "Make Payment",
      nl: "Betalen",
    },
  });

  return (
    <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <button
        type="button"
        onClick={handleGoBack}
        className="inline-flex w-full items-center justify-center gap-x-1 rounded-lg border border-[#E5E5E5] bg-white px-4 py-3 text-xs sm:w-auto sm:py-4 lg:inline-flex lg:px-10 lg:text-base"
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
      {subView === "detail" ? (
        <button
          type="button"
          onClick={() => goToPayment()}
          className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-theme px-4 text-sm text-white sm:ml-auto sm:w-auto lg:px-10 lg:text-base"
        >
          {makePaymentLabel}
        </button>
      ) : null}
    </div>
  );
}
