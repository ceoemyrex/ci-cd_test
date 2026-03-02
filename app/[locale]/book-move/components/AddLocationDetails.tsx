import { LocationDetailsForm } from "./LocationDetailsForm";
import { Place } from "@/services";
import { message } from "antd";
import { BookFormContainer } from "./BookFormContainer";

export function AddLocationDetails({
  onNext,
  onPrev,
  moveFrom,
  moveSize,
  moveTo,
  setMoveFrom,
  setMoveTo,
  setMoveSize,
}: {
  onNext?: () => void;
  onPrev?: () => void;
  moveFrom: Place | null;
  moveTo: Place | null;
  setMoveFrom: (value: Place) => void;
  setMoveTo: (value: Place) => void;
  moveSize: string;
  setMoveSize: (value: string) => void;
}) {
  const handleSubmit = () => {
    if (!moveFrom) {
      message.error("Please select move from location");
      return;
    }
    if (!moveTo) {
      message.error("Please select move from location");
      return;
    }
    onNext?.();
  };

  return (
    <BookFormContainer
      canContinue={Boolean(moveFrom && moveTo && moveSize)}
      currentStep={1}
      onPrev={onPrev}
      onNext={handleSubmit}
    >
      <LocationDetailsForm
        moveFrom={moveFrom}
        moveSize={moveSize}
        moveTo={moveTo}
        setMoveFrom={setMoveFrom}
        setMoveTo={setMoveTo}
        setMoveSize={setMoveSize}
      />
    </BookFormContainer>
  );
}
