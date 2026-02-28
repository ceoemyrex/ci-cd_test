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


  export function StepBar({currentStep = 1}:{currentStep?:number}){
    return(
        <div className="bg-white rounded-2xl space-y-15 p-6 border border-[#E5E5E5]">
            <StepButton
              title={"Location Details"}
              active={currentStep >= 1}
              description={"Details of you are moving from"}
            /> 
            <StepButton
              title={"Setup Inventory List "}
              active={currentStep >= 2}
              description={"Detailed list of items to be move"}
            /> 
            <StepButton
              title={"Moving Information"}
              active={currentStep >= 3}
              description={"Date, contacts, restrictions, etc..."}
            /> 
            <StepButton
              title={"View Summary"}
              active={currentStep >= 4}
              description={"Full Summary Of Your Move"}
            />
          </div>
    )
  }