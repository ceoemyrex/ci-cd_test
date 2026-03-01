import { CheckCircle, CheckListIcon, SettingIcon } from "@/app/icons";
import { ReactNode } from "react";

interface CurrentStepProps {
  step: number;
  title: string;
  description: string;
  icon: ReactNode;
  stepIcon: ReactNode;
}

function CurrentStep({
  step,
  title,
  description,
  stepIcon,
  icon,
}: CurrentStepProps) {
  const isReversed = step % 2 == 0;

  return (
    <div
      className={`lg:flex space-y-8 ${isReversed ? "flex-row-reverse" : ""} items-center gap-x-36`}
    >
      <div className="flex-1">
        <div className="h-12 w-12 lg:h-16 lg:w-16 rounded-2xl bg-secondary flex items-center justify-center">
          {icon}
        </div>
        <div className="mt-4 lg:mt-8 space-y-2">
          <p className="text-dark lg:text-2xl font-medium">{title}</p>
          <p className="text-grey text-sm lg:text-base">{description}</p>
        </div>
      </div>
      <div className="flex-1">
        <div className="bg-[#F3F5F7] rounded-xl h-50 lg:h-110 flex items-center justify-center">
          <div className="flex items-center gap-x-1 text-grey font-medium text-sm lg:text-xl">
            {stepIcon}
            <p>Step {step}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Steps() {
  const steps: CurrentStepProps[] = [
    {
      title: "Create your inventory",
      description:
        "You can upload photos for AI-based item recognition or manually list your items. Both options are available from the start.",
      icon: <CheckListIcon />,
      stepIcon: <CheckListIcon fill="#7C7C8E" />,
      step: 1,
    },
    {
      title: "Plan and coordinate",
      description:
        "Your inventory helps structure the move, allowing better planning and coordination without confusion or guesswork.",
      icon: <SettingIcon />,
      stepIcon: <SettingIcon fill="#7C7C8E" />,
      step: 2,
    },
    {
      title: "Finalize and move",
      description:
        "Confirm details, review your inventory, and complete the move with full visibility.",
      icon: <CheckCircle />,
      stepIcon: <CheckCircle fill="#7C7C8E" />,
      step: 3,
    },
  ];

  return (
    <div className="max-w-310 2xl:max-w-350 bg-white mx-auto px-4">
      <div className="py-18.75 lg:py-37.5 space-y-15">
        {steps.map((step) => {
          return <CurrentStep key={`how-it-works-step-${step.step}`} {...step} />;
        })}
      </div>
    </div>
  );
}
