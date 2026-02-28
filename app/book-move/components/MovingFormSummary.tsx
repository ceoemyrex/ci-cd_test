import { LoaderCircle } from "lucide-react";
import { MovingSummary } from "./MovingSummary";
import { StepBar } from "./StepsBar";
import { CreateMoveRequest, MoveItem } from "@/services/MoveRequest";
import { Place } from "@/services";
import { ArrowRight } from "@/app/icons/arrow";

export function MovingFormSummary({
  onPrev,
  formData,
  moveItems,
  moveFrom,
  moveSize,
  loading,
  moveTo,
  handleSubmit
}: {
  onNext?: () => void;
  onPrev?: () => void;
  formData: CreateMoveRequest;
  loading: boolean;
  moveFrom?: Place | null;
  moveTo?: Place | null;
  moveSize: string;
  moveItems: MoveItem[];
  handleSubmit:()=>void,
}) {
  return (
    <>
      <div className="bg-white/40 p-10 backdrop-blur-2xl border border-black/10 min-h-screen rounded-3xl">
        <p className="text-4xl font-medium text-dark">Get a quote for a move</p>
        <div className="mt-12 lg:flex gap-x-8">
          <div className="flex-1">
            <StepBar currentStep={4}/>
          </div>
          <div className="flex-2">
            <MovingSummary
              formData={formData}
              moveSize={moveSize}
              moveItems={moveItems}
              moveFrom={moveFrom}
              moveTo={moveTo}
            />
          </div>
        </div>
        <div className="flex items-center mt-6">
          <button
            disabled={loading}
            onClick={onPrev}
            className="py-4 rounded-lg disabled:opacity-70 bg-white px-10 gap-x-1 border border-[#E5E5E5] flex items-center"
          >
            <ArrowRight fill="#121212" />
            <span>Go Back</span>
          </button>
          <button
           disabled={loading}
            onClick={handleSubmit}
            className="bg-theme disabled:opacity-70 flex gap-x-2 items-center ml-auto px-10 py-4 rounded-lg text-white"
          >
            {loading && (
              <LoaderCircle className="animate-spin"/>
            )}
            Get Quotes
            <span className="-rotate-180">
              <ArrowRight />
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
