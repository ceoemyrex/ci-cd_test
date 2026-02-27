import { LocationDetailsForm } from "./LocationDetailsForm";

function StepButton({
  active = false,
  title,
  description,
}: {
  active?: boolean;
  title: string;
  description: string;
}) {
  if (!active) {
    return (
      <div className="flex items-center gap-x-4">
        <div className="border-2 border-[#D3E3CD] rounded-full h-12 w-12 bg-white flex items-center justify-center">
          <div className="bg-[#D3E3CD] h-4 w-4 rounded-full"></div>
        </div>
        <div className="text-dark">
          <p className="text-lg font-medium">{title}</p>
          <p className="text-grey text-sm">{description}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-x-4">
      <div className="border border-secondary rounded-full h-12 w-12 bg-secondary/10 flex items-center justify-center">
        <div className="bg-secondary h-4 w-4 rounded-full"></div>
      </div>
      <div className="text-secondary">
        <p className="text-lg font-medium">{title}</p>
        <p className="text-secondary/80 text-sm">{description}</p>
      </div>
    </div>
  );
}

export function BookMoveForm() {
  return (
    <div className="bg-white/40 p-10 backdrop-blur-2xl border border-black/10 min-h-screen rounded-3xl">
      <p className="text-4xl font-medium text-dark">Get a quote for a move</p>
      <div className="mt-12 flex gap-x-8">
        <div className="flex-1">
          <div className="bg-white rounded-2xl space-y-15 p-6 border border-[#E5E5E5]">
            <StepButton
              title={"Location Details"}
              active
              description={"Details of you are moving from"}
            /> 
            <StepButton
              title={"Setup Inventory List "}
              description={"Detailed list of items to be move"}
            /> 
            <StepButton
              title={"Moving Information"}
              description={"Date, contacts, restrictions, etc..."}
            /> 
            <StepButton
              title={"View Summary"}
              description={"Full Summary Of Your Move"}
            />
          </div>
        </div>
        <div className="flex-2">
            <LocationDetailsForm/>
        </div>
      </div>
    </div>
  );
}
