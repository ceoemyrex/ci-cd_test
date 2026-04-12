import { MovingSummary } from "./MovingSummary";
import { CreateMoveRequest, MoveItem } from "@/services/MoveRequest";
import { Place } from "@/services";
import { BookFormContainer } from "./BookFormContainer";
import { AppTranslator, Locale } from "@/app/utils";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Copy } from "lucide-react";

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
        <div className="mt-8 space-y-4 rounded-2xl border border-secondary/30 bg-[#FBFEFA] p-6">
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
                en: "Save your tracking code. When movers send quotes, open the track page to compare offers and pay.",
                nl: "Bewaar je trackingcode. Zodra verhuizers offertes sturen, kun je op de trackpagina vergelijken en betalen.",
              },
            })}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <span className="rounded-lg bg-white px-4 py-2 font-mono text-base font-semibold text-dark ring-1 ring-black/10">
              {code}
            </span>
            <button
              type="button"
              onClick={() => navigator.clipboard?.writeText(code)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D0D5DD] bg-white px-4 py-2 text-sm font-medium text-dark"
            >
              <Copy className="h-4 w-4" />
              {AppTranslator.getLocaleText({
                locale,
                translations: { en: "Copy code", nl: "Code kopiëren" },
              })}
            </button>
            <Link
              href={`/${locale}/track-move/${encodeURIComponent(code)}`}
              className="inline-flex items-center justify-center rounded-xl bg-theme px-5 py-2 text-sm font-medium text-white"
            >
              {AppTranslator.getLocaleText({
                locale,
                translations: {
                  en: "Track your move",
                  nl: "Volg je verhuizing",
                },
              })}
            </Link>
          </div>
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
