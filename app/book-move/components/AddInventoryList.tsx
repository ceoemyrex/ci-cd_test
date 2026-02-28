import { ArrowRight } from "@/app/icons/arrow";
import { SetupInventoryListForm } from "./SetupInventoryList";
import { StepBar } from "./StepsBar";
import { MoveItem } from "@/services/MoveRequest";

export function AddInventoryList({
  onNext,
  onPrev,
  moveItems,
  moveSize,
  handleUpdateMoveItems,
}: {
  onNext?: () => void;
  onPrev?: () => void;
  moveItems: MoveItem[],
  handleUpdateMoveItems:(moveItems:MoveItem[])=>void,
  moveSize: string;
}) {
  return (
    <div className="bg-white/40 p-10 backdrop-blur-2xl border border-black/10 min-h-screen rounded-3xl">
      <p className="text-4xl font-medium text-dark">Get a quote for a move</p>
      <div className="mt-12 lg:flex gap-x-8">
        <div className="flex-1">
          <StepBar currentStep={2} />
        </div>
        <div className="flex-2">
          <SetupInventoryListForm
            moveItems={moveItems}
            handleUpdateMoveItems={handleUpdateMoveItems}
            moveSize={moveSize}
          />
        </div>
      </div>
      <div className="flex items-center mt-6">
        <button
          onClick={onPrev}
          className="py-4 rounded-lg bg-white px-10 gap-x-1 border border-[#E5E5E5] flex items-center"
        >
          <ArrowRight fill="#121212" />
          <span>Go Back</span>
        </button>
        <button
          onClick={onNext}
          className="bg-theme flex gap-x-2 items-center ml-auto px-10 py-4 rounded-lg text-white"
        >
          Continue
          <span className="-rotate-180">
            <ArrowRight />
          </span>
        </button>
      </div>
    </div>
  );
}
