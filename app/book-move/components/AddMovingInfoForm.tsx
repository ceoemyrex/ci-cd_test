import { MovingInfoForm } from "./MovingInfoForm";
import { CreateMoveRequest } from "@/services/MoveRequest";
import { Place } from "@/services";
import { BookFormContainer } from "./BookFormContainer";
import { useState } from "react";

export function AddMovingInfoForm({
  onNext,
  onPrev,
  formData,
  handleUpdate,
  moveFrom,
  moveTo,
  setMoveFrom,
  setMoveTo,
}: {
  onNext?: () => void;
  onPrev?: () => void;
  formData: CreateMoveRequest;
  handleUpdate: (value: Partial<CreateMoveRequest>) => void;
  moveTo: Place | null;
  moveFrom: Place | null;
  setMoveFrom: (place: Place) => void;
  setMoveTo: (place: Place) => void;
}) {

  const [termsAccepted,setTermsAccepted] = useState(false)

  return (
    <BookFormContainer
      canContinue
      isNextDisabled={!termsAccepted}
      currentStep={3}
      onPrev={onPrev}
      onNext={onNext}
    >
      <MovingInfoForm
        formData={formData}
        moveFrom={moveFrom}
        moveTo={moveTo}
        handleUpdate={handleUpdate}
        setMoveFrom={setMoveFrom}
        setMoveTo={setMoveTo}
        termsAccepted={termsAccepted}
        setTermsAccepted={setTermsAccepted}
      />
    </BookFormContainer>
  );
}
