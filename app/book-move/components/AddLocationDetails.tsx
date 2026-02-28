import { ArrowRight } from "@/app/icons/arrow";
import { StepBar } from "./StepsBar";
import { LocationDetailsForm } from "./LocationDetailsForm";
import { Place } from "@/services";
import { message } from "antd";

export function AddLocationDetails({onNext,onPrev,moveFrom,moveSize,moveTo,setMoveFrom,setMoveTo,setMoveSize}:{
  onNext?:()=>void,
  onPrev?:()=>void,
  moveFrom:Place | null,
  moveTo:Place | null,
  setMoveFrom:(value:Place)=>void,
  setMoveTo:(value:Place)=>void,
  moveSize:string,
  setMoveSize:(value:string)=>void
}) {


  const handleSubmit = ()=>{
    if(!moveFrom){
      message.error("Please select move from location")
      return;
    } 
    if(!moveTo){
      message.error("Please select move from location")
      return;
    }
    onNext?.()
  }

  console.log({moveFrom,moveTo,moveSize})

  return (
    <div className="bg-white/40 p-10 backdrop-blur-2xl border border-black/10 min-h-screen rounded-3xl">
      <p className="text-4xl font-medium text-dark">Get a quote for a move</p>
      <div className="mt-12 lg:flex gap-x-8">
        <div className="flex-1">
          <StepBar/>
        </div>
        <div className="flex-2">
            <LocationDetailsForm
            moveFrom={moveFrom}
            moveSize={moveSize}
            moveTo={moveTo}
            setMoveFrom={setMoveFrom}
            setMoveTo={setMoveTo}
            setMoveSize={setMoveSize}
            />
        </div>
      </div>
      <div className="flex items-center mt-6">
        <button
        onClick={onPrev}
        className="py-4 rounded-lg bg-white px-10 gap-x-1 border border-[#E5E5E5] flex items-center">
          <ArrowRight fill="#121212"/>
          <span>Go Back</span>
        </button>
        {moveFrom && moveTo && moveSize && (
           <button
         onClick={handleSubmit}
         className="bg-theme flex gap-x-2 items-center ml-auto px-10 py-4 rounded-lg text-white">
          Continue
          <span className="-rotate-180">
          <ArrowRight/>
          </span>
        </button>
        )}
      </div>
    </div>
  );
}
