import { MovingSummary } from "./MovingSummary";
import { CreateMoveRequest, MoveItem } from "@/services/MoveRequest";
import { Place } from "@/services";
import { BookFormContainer } from "./BookFormContainer";

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
  return (
    <BookFormContainer
      canContinue
      currentStep={4}
      onPrev={onPrev}
      onNext={handleSubmit}
      loading={loading}
      buttonTitle="Get Quotes"
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
