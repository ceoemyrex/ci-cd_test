import { TickIcon } from "@/app/icons";
import { AppTranslator, Locale } from "@/app/utils";
import { useParams } from "next/navigation";
import { Fragment } from "react/jsx-runtime";

function StepButton({
  active = false,
  completed = false,
  title,
  description,
}: {
  active?: boolean;
  completed?: boolean;
  title: string;
  description: string;
}) {
  if (!active) {
    return (
      <div className="flex relative items-center gap-x-4">
        <div className="border-2 border-[#D3E3CD] rounded-full h-8 w-8 lg:h-12 lg:w-12 bg-white flex items-center justify-center">
          <div className="bg-[#D3E3CD] h-2.5 lg:h-4 w-2.5 lg:w-4 rounded-full"></div>
        </div>
        <div className="text-dark hidden lg:block">
          <p className="text-lg font-medium">{title}</p>
          <p className="text-grey text-sm">{description}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex relative items-center gap-x-4">
      <div className="border border-secondary rounded-full h-8 w-8 lg:h-12 lg:w-12 bg-secondary/10 flex items-center justify-center">
        {completed ? (
          <TickIcon />
        ) : (
          <div className="bg-secondary h-2.5 w-2.5 lg:h-4 lg:w-4 rounded-full" />
        )}
      </div>
      <div className="text-secondary hidden lg:block">
        <p className="text-lg font-medium">{title}</p>
        <p className="text-secondary/80 text-sm">{description}</p>
      </div>
    </div>
  );
}

function StepDivider({ isComplete }: { isComplete: boolean }) {
  if (isComplete) {
    return (
      <div className="h-12 bg-linear-to-b from-secondary to-[#D3E3CD] ml-6 w-0.5" />
    );
  }

  return <div className="h-14 bg-[#D3E3CD] ml-6 -mb-2 w-0.5" />;
}
function StepDividerMobile({ isComplete }: { isComplete: boolean }) {
  if (isComplete) {
    return (
      <div className="w-full bg-linear-to-b from-secondary to-[#D3E3CD] h-px" />
    );
  }

  return <div className="w-full h-px bg-[#D3E3CD]" />;
}

export function StepBar({
  currentStep = 1,
}: {
  currentStep?: number;
  onPrev?: () => void;
}) {
  const steps = [
    {
      title: {
        en: "Location Details",
        nl: "Locatiegegevens",
      },
      description: {
        en: "Details of you are moving from",
        nl: "Vanaf welk adres verhuis je?",
      },
    },
    {
      title: {
        en: "Setup Inventory List",
        nl: "Inventarislijst maken ",
      },
      description: {
        en: "Detailed list of items to be move",
        nl: "Overzicht van alle spullen die je gaat verhuizen.",
      },
    },
    {
      title: {
        en: "Moving Information",
        nl: "Verhuisgegevens",
      },
      description: {
        en: "Date, contacts, restrictions, etc...",
        nl: "Datum, contract en bijzonderheden.",
      },
    },
    {
      title: {
        en: "View Summary",
        nl: "Overzicht bekijken",
      },
      description: {
        en: "Full Summary Of Your Move",
        nl: "Volledig overzicht van je verhuizing.",
      },
    },
  ];

  const selectedStep =
    steps.find((_, index) => index + 1 == currentStep) ?? steps[steps.length - 1];

  const { locale } = useParams<{ locale: Locale }>();

  return (
    <>
      <div className=" bg-white p-4 rounded-lg space-y-4 lg:hidden">
        <div className="flex items-center">
          {steps.map((step, index) => (
            <Fragment
              key={AppTranslator.getLocaleText({
                locale,
                translations: step.title,
              })}
            >
              <div>
                <StepButton
                  title={AppTranslator.getLocaleText({
                    locale,
                    translations: step.title,
                  })}
                  description={AppTranslator.getLocaleText({
                    locale,
                    translations: step.description,
                  })}
                  active={currentStep > index}
                  completed={currentStep > index + 1}
                />
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1">
                  <StepDividerMobile isComplete={currentStep > index + 1} />
                </div>
              )}
            </Fragment>
          ))}
        </div>

        <div className="flex gap-x-2">
          {selectedStep && (
            <div className="text-dark">
              <p className="text-sm lg:text-lg font-medium">
                {AppTranslator.getLocaleText({
                  locale,
                  translations: selectedStep.title,
                })}
              </p>
              <p className="text-grey text-xs lg:text-sm">
                {AppTranslator.getLocaleText({
                  locale,
                  translations: selectedStep.description,
                })}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="bg-white rounded-2xl hidden lg:block relative p-6 border border-[#E5E5E5]">
        {steps.map((step, index) => (
          <div
            key={AppTranslator.getLocaleText({
              locale,
              translations: step.title,
            })}
          >
            <StepButton
              title={AppTranslator.getLocaleText({
                locale,
                translations: step.title,
              })}
              description={AppTranslator.getLocaleText({
                locale,
                translations: step.description,
              })}
              active={currentStep > index}
              completed={currentStep > index + 1}
            />

            {index < steps.length - 1 && (
              <StepDivider isComplete={currentStep > index + 1} />
            )}
          </div>
        ))}
      </div>
    </>
  );
}
