import { SetupInventoryListForm } from "./SetupInventoryList";
import { MoveItem } from "@/services/MoveRequest";
import { BookFormContainer } from "./BookFormContainer";

export function AddInventoryList({
  onNext,
  onPrev,
  moveItems,
  moveSize,
  handleUpdateMoveItems,
}: {
  onNext?: () => void;
  onPrev?: () => void;
  moveItems: MoveItem[];
  handleUpdateMoveItems: (moveItems: MoveItem[]) => void;
  moveSize: string;
}) {
  return (
    <BookFormContainer
      canContinue
      currentStep={2}
      onPrev={onPrev}
      onNext={onNext}
    >
      <SetupInventoryListForm
        moveItems={moveItems}
        handleUpdateMoveItems={handleUpdateMoveItems}
        moveSize={moveSize}
      />
    </BookFormContainer>
  );
}
