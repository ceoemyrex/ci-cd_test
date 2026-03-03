import { MovingSummary } from "./MovingSummary";
import { CreateMoveRequest, MoveItem } from "@/services/MoveRequest";
import { Place } from "@/services";
import { BookFormContainer } from "./BookFormContainer";
import { AppTranslator, Locale } from "@/app/utils";
import { useParams } from "next/navigation";

export function MovingFormSummary({
  onPrev,
  formData,
  moveItems,
  moveFrom,
  moveSize,
  loading,
  moveTo,
  handleSubmit,
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
}) {

  const {locale} = useParams<{locale:Locale}>()

  return (
    <BookFormContainer
      canContinue
      currentStep={4}
      onPrev={onPrev}
      onNext={handleSubmit}
      loading={loading}
      buttonTitle={AppTranslator.getLocaleText({locale,translations:{
        nl:"Offerte aanvragen",
        en:"Get Quotes"
      }})}
    >
      <MovingSummary
        formData={formData}
        moveSize={moveSize}
        moveItems={moveItems}
        moveFrom={moveFrom}
        moveTo={moveTo}
      />
    </BookFormContainer>
  );
}
