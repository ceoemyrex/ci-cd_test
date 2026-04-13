import { MovingSummary } from "./MovingSummary";
import { CreateMoveRequest, MoveItem } from "@/services/MoveRequest";
import { Place } from "@/services";
import { BookFormContainer } from "./BookFormContainer";
import { BookMoveTimelineStep } from "./BookMoveTimelineStep";
import { AppTranslator, Locale } from "@/app/utils";
import { useParams } from "next/navigation";
import Link from "next/link";

export function MovingFormSummary({
  onPrev,
  formData,
  moveItems,
  moveFrom,
  moveSize,
  loading,
  moveTo,
  handleSubmit,
  quoteTrackingCode,
  quoteRequestCompleted = false,
}: {
  onNext?: () => void;
  onPrev?: () => void;
  formData: CreateMoveRequest;
  loading: boolean;
  moveFrom?: Place | null;
  moveTo?: Place | null;
  moveSize: string;
  moveItems: MoveItem[];
  handleSubmit: () => void;
  quoteTrackingCode?: string | null;
  quoteRequestCompleted?: boolean;
}) {
  const { locale } = useParams<{ locale: Locale }>();
  const code = quoteTrackingCode?.trim() ?? "";
  const submitted = quoteRequestCompleted;
  const trackHref =
    code ? `/${locale}/track-move/${encodeURIComponent(code)}` : "";

  return (
    <BookFormContainer
      canContinue={!submitted}
      currentStep={submitted ? 5 : 4}
      onPrev={onPrev}
      onNext={handleSubmit}
      loading={loading}
      buttonTitle={AppTranslator.getLocaleText({
        locale,
        translations: {
          nl: "Offerte aanvragen",
          en: "Get Quotes",
        },
      })}
    >
      <MovingSummary
        formData={formData}
        moveSize={moveSize}
        moveItems={moveItems}
        moveFrom={moveFrom}
        moveTo={moveTo}
      />
      {submitted && code ? (
        <div className="mt-8 space-y-6">
          <div className="space-y-4 rounded-2xl border border-secondary/30 bg-[#FBFEFA] p-6">
            <p className="text-lg font-medium text-dark">
              {AppTranslator.getLocaleText({
                locale,
                translations: {
                  en: "Quote request sent",
                  nl: "Offerteaanvraag verstuurd",
                },
              })}
            </p>
            <p className="text-sm text-grey">
              {AppTranslator.getLocaleText({
                locale,
                translations: {
                  en: "Check your email for your reference. You can continue here to see recommended movers, quotes, and pay once they are ready.",
                  nl: "Controleer je e-mail voor je referentie. Je kunt hier verder om aangeraden verhuizers en offertes te zien en te betalen zodra ze klaar zijn.",
                },
              })}
            </p>
            <Link
              href={trackHref}
              className="flex w-full items-center justify-center rounded-xl bg-theme px-5 py-3 text-center text-base font-semibold text-white sm:w-auto sm:min-w-56"
            >
              {AppTranslator.getLocaleText({
                locale,
                translations: {
                  en: "Make payment",
                  nl: "Betalen",
                },
              })}
            </Link>
            <p className="text-xs text-grey">
              {AppTranslator.getLocaleText({
                locale,
                translations: {
                  en: "Opens your move page with quotes and secure checkout.",
                  nl: "Opent je verhuispagina met offertes en beveiligde betaling.",
                },
              })}
            </p>
          </div>
          <BookMoveTimelineStep currentStep={1} />
        </div>
      ) : null}
      {submitted && !code ? (
        <div className="mt-8 space-y-2 rounded-2xl border border-secondary/30 bg-[#FBFEFA] p-6 text-sm text-grey">
          <p className="text-lg font-medium text-dark">
            {AppTranslator.getLocaleText({
              locale,
              translations: {
                en: "Request received",
                nl: "Aanvraag ontvangen",
              },
            })}
          </p>
          <p>
            {AppTranslator.getLocaleText({
              locale,
              translations: {
                en: "Your quote request was submitted. Check your email for a tracking code to follow up and pay when quotes arrive.",
                nl: "Je aanvraag is ontvangen. Controleer je e-mail voor een trackingcode om verder te gaan zodra er offertes zijn.",
              },
            })}
          </p>
        </div>
      ) : null}
    </BookFormContainer>
  );
}
