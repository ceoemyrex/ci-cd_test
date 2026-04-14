import { MovingSummary } from "./MovingSummary";
import { CreateMoveRequest, MoveItem } from "@/services/MoveRequest";
import { Place } from "@/services";
import { BookFormContainer } from "./BookFormContainer";
import { AppTranslator, Locale } from "@/app/utils";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { QuoteRequestSuccessModal } from "./QuoteRequestSuccessModal";

export function MovingFormSummary({
 onPrev,
 formData,
 moveItems,
 moveFrom,
 moveSize,
 loading,
 moveTo,
 handleSubmit,
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
 quoteRequestCompleted?: boolean;
}) {
 const { locale } = useParams<{ locale: Locale }>();
 const router = useRouter();
 const submitted = quoteRequestCompleted;
 const [openSuccessModal, setOpenSuccessModal] = useState(submitted);
 const requesterName = formData.fullName.trim();
 const titleText = AppTranslator.getLocaleText({
  locale,
  translations: {
   en: requesterName
    ? `Thank you for requesting a quote ${requesterName}`
    : "Thank you for requesting a quote",
   nl: requesterName
    ? `Bedankt voor je offerteaanvraag ${requesterName}`
    : "Bedankt voor je offerteaanvraag",
  },
 });

 useEffect(() => {
  if (submitted) {
   setOpenSuccessModal(true);
  }
 }, [submitted]);

 const handleContinue = () => {
  setOpenSuccessModal(false);
  router.push(`/${locale}`);
 };

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
   <QuoteRequestSuccessModal
    open={openSuccessModal}
    onOpenChange={(nextOpen) => {
     if (!nextOpen && submitted) {
      handleContinue();
      return;
     }
     setOpenSuccessModal(nextOpen);
    }}
    onContinue={handleContinue}
    title={titleText}
    description={AppTranslator.getLocaleText({
     locale,
     translations: {
      en: "Your quotes are on the way to your email.",
      nl: "Je offertes zijn onderweg naar je e-mail.",
     },
    })}
    primaryButtonLabel={AppTranslator.getLocaleText({
     locale,
     translations: {
      en: "Ok Got It",
      nl: "Ok Begrepen",
     },
    })}
   />
  </BookFormContainer>
 );
}
