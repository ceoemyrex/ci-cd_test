import { MovingInfoForm } from "./MovingInfoForm";
import { StepBar } from "./StepsBar";
import { CreateMoveRequest } from "@/services/MoveRequest";
import { Place } from "@/services";
import { ArrowRight } from "@/app/icons/arrow";

export function AddMovingInfoForm({onNext,onPrev,formData,handleUpdate,moveFrom,moveTo,setMoveFrom,setMoveTo}:{
  onNext?:()=>void,
  onPrev?:()=>void,
  formData:CreateMoveRequest,
  handleUpdate:(value:Partial<CreateMoveRequest>)=>void
  moveTo:Place | null,
  moveFrom:Place | null,
  setMoveFrom:(place:Place)=>void,
  setMoveTo:(place:Place)=>void,
}){
    return(
        <div className="bg-white/40 p-10 backdrop-blur-2xl border border-black/10 min-h-screen rounded-3xl">
          <p className="text-4xl font-medium text-dark">Get a quote for a move</p>
          <div className="mt-12 lg:flex gap-x-8">
            <div className="flex-1">
              <StepBar currentStep={3}/>
            </div>
            <div className="flex-2">
                <MovingInfoForm
                formData={formData}
                moveFrom={moveFrom}
                moveTo={moveTo}
                handleUpdate={handleUpdate}
                setMoveFrom={setMoveFrom}
                setMoveTo={setMoveTo}
                />
            </div>
          </div>
          <div className="flex items-center mt-6">
            <button onClick={onPrev} className="py-4 rounded-lg bg-white px-10 gap-x-1 border border-[#E5E5E5] flex items-center">
              <ArrowRight fill="#121212"/>
              <span>Go Back</span>
            </button>
             <button
             onClick={onNext}
             className="bg-theme flex gap-x-2 items-center ml-auto px-10 py-4 rounded-lg text-white">
              Continue
              <span className="-rotate-180">
              <ArrowRight/>
              </span>
            </button>
          </div>
        </div>
    )
}