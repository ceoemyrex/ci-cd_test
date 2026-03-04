"use client";
import {
  CalendarDays,
  CircleAlert,
  LoaderCircle,
  Package,
  RefreshCwIcon,
  Truck,
} from "lucide-react";
import { DoubleCheck, Info, TickIcon } from "@/app/icons";
import { AppTranslator, Locale } from "@/app/utils";
import { useParams } from "next/navigation";
import { Fragment } from "react/jsx-runtime";
import { MoveRequestProvider, TrackMove } from "@/services";
import { ReactNode, useCallback, useEffect, useState } from "react";
import MapComponent from "@/app/components/MapComponent";

function StepButton({
  active = false,
  completed = false,
  title,
  description,
}: {
  active?: boolean;
  completed?: boolean;
  title: string;
  description?: string;
}) {
  if (!active) {
    return (
      <div className="flex relative items-center gap-x-4">
        <div>
          <div className="border-2 border-[#D3E3CD] rounded-full h-8 w-8 lg:h-12 lg:w-12 bg-white flex items-center justify-center">
            <div className="bg-[#D3E3CD] h-2.5 lg:h-4 w-2.5 lg:w-4 rounded-full"></div>
          </div>
        </div>
        <div className="text-dark">
          <p className="text-sm lg:text-lg font-medium">{title}</p>
          {description && <p className="text-grey text-xs lg:text-sm">{description}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="flex relative items-center gap-x-4">
      <div>
        <div className="border border-secondary rounded-full h-8 w-8 lg:h-12 lg:w-12 bg-secondary/10 flex items-center justify-center">
          {completed ? (
            <TickIcon />
          ) : (
            <div className="bg-secondary h-2.5 w-2.5 lg:h-4 lg:w-4 rounded-full" />
          )}
        </div>
      </div>
      <div className="text-dark">
        <p className="text-sm lg:text-lg font-medium">{title}</p>
        {description && <p className="text-grey text-xs lg:text-sm">{description}</p>}
      </div>
    </div>
  );
}

function MoveStepButton({
  active = false,
  title,
  description,
  icon,
}: {
  active?: boolean;
  title: string;
  description?: string;
  icon: ReactNode;
}) {
  if (!active) {
    return (
      <div className="flex relative gap-x-4">
        <div>
          <div className="border-2 border-[#C0C0C0] text-[#C0C0C0] rounded-full h-8 w-8 lg:h-12 lg:w-12 bg-white flex items-center justify-center">
            {icon}
          </div>
        </div>
        <div className="text-grey">
          <p className="text-sm lg:text-lg font-medium">{title}</p>
          {description && (
            <p className="text-[#C0C0C0] text-xs lg:text-sm">{description}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex relative gap-x-4">
      <div>
        <div className="border-2 border-secondary text-secondary rounded-full h-8 w-8 lg:h-12 lg:w-12 bg-secondary/10 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="text-dark">
        <p className="text-sm lg:text-lg font-medium">{title}</p>
        {description && <p className="text-grey text-xs lg:text-sm">{description}</p>}
      </div>
    </div>
  );
}

function MoveProgressStep({
  index,
  step,
  isActive,
  totalLength,
}: {
  totalLength: number;
  index: number;
  isActive: boolean;
  step: {
    title: {
      en: string;
      nl: string;
    };
    description: {
      en: string;
      nl: string;
    };
    icon: ReactNode;
  };
}) {
  const { locale } = useParams<{ locale: Locale }>();

  return (
    <div className="flex relative gap-x-4">
      {index < totalLength - 1 && (
        <div className="h-full absolute top-3 -left-3.25 bg-[#D3E3CD] ml-6 -mb-2 w-0.5" />
      )}
      {isActive
      ?(
        <div className="mt-3">
        <div className="border-2 relative border-secondary rounded-full flex items-center justify-center h-6 w-6 ">
          <div className="bg-secondary h-4 w-4 rounded-full "></div>
        </div>
      </div>
      ):(<div className="mt-3">
        <div className="border-2 relative border-[#c0c0c0] rounded-full flex items-center justify-center h-6 w-6 ">
          <div className="bg-[#c0c0c0] h-4 w-4 rounded-full "></div>
        </div>
      </div>)}
      <div className="pb-4">
        <MoveStepButton
          icon={step.icon}
          title={AppTranslator.getLocaleText({
            locale,
            translations: step.title,
          })}
          active={isActive}
          description={AppTranslator.getLocaleText({
            locale,
            translations: step.description,
          })}
        />
      </div>
    </div>
  );
}

function StepDivider({ isComplete }: { isComplete: boolean }) {
  if (isComplete) {
    return (
      <div className="h-12 bg-linear-to-b from-secondary to-[#D3E3CD] ml-5 lg:ml-6 w-0.5" />
    );
  }

  return <div className="h-14 bg-[#D3E3CD] ml-2 lg:ml-6 -mb-2 w-0.5" />;
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
    },
    {
      title: {
        en: "Setup Inventory List",
        nl: "Inventarislijst maken ",
      },
    },
    {
      title: {
        en: "Moving Information",
        nl: "Verhuisgegevens",
      },
    },
    {
      title: {
        en: "View Summary",
        nl: "Overzicht bekijken",
      },
    },
  ];

  const { locale } = useParams<{ locale: Locale }>();

  return (
    <>
      <div className="bg-white rounded-2xl relative p-6 border border-[#E5E5E5]">
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

export function TimelineStep({
  currentStep = 1,
}: {
  currentStep?: number;
  onPrev?: () => void;
}) {
  const steps = [
    {
      title: {
        en: "Recommended Movers",
        nl: "Aangeraden verhuizers",
      },
      description: {
        en: "List of moving companies & qu...",
        nl: "Overzicht van verhuisbedrijven en offertes.",
      },
    },
    {
      title: {
        en: "Make Payment",
        nl: "Betalen ",
      },
      description: {
        en: "Make your payment easily",
        nl: "Betaling afronden.",
      },
    },
    {
      title: {
        en: "Track Move",
        nl: "Verhuizing volgen",
      },
      description: {
        en: "Start Tracking your move",
        nl: "Volg je verhuizing stap voor stap.",
      },
    },
  ];

  const { locale } = useParams<{ locale: Locale }>();

  return (
    <>
      <div className="bg-white rounded-2xl relative p-6 border border-[#E5E5E5]">
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
              active={currentStep > index}
              completed={currentStep > index + 1}
              description={AppTranslator.getLocaleText({
                locale,
                translations: step.description,
              })}
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
export function MoveTimelineStepBar({ trackMove }: { trackMove: TrackMove }) {
  const steps = [
    {
      title: {
        en: "Payment Made",
        nl: "Aangeraden verhuizers",
      },
      description: {
        en: "Payment confirmed and tracking code generated",
        nl: "Overzicht van verhuisbedrijven en offertes.",
      },
      icon: <DoubleCheck />,
      key: "hasPaid",
    },
    {
      title: {
        en: "Pickup & Move Start",
        nl: "Betalen ",
      },
      description: {
        en: "Mover navigates to pickup location on schedule",
        nl: "Betaling afronden.",
      },
      icon: <CalendarDays />,
      key: "hasArrived",
    },
    {
      title: {
        en: "Mover In Transit",
        nl: "Verhuizing volgen",
      },
      description: {
        en: "Belongings securely loaded transit begins immediately",
        nl: "Volg je verhuizing stap voor stap.",
      },
      icon: <Truck />,
      key: "inTransit",
    },
    {
      title: {
        en: "Unloading Move",
        nl: "Verhuizing volgen",
      },
      description: {
        en: "TrackMove moverUload",
        nl: "Volg je verhuizing stap voor stap.",
      },
      icon: <Package />,
      key: "isCompleted",
    },
  ];

  const { locale } = useParams<{ locale: Locale }>();

  return (
    <>
      <div className="rounded-2xl pt-12 relative">
        <p className="text-xl text-grey font-medium lg:text-3xl ">
          {AppTranslator.getLocaleText({
            locale,
            translations: {
              en: "Move Timeline",
              nl: "",
            },
          })}
        </p>
        <div className="mt-8 flex space-y-4">
          <div className="flex-1">
            {steps.map((step, index) => (
              <Fragment
                key={AppTranslator.getLocaleText({
                  locale,
                  translations: step.title,
                })}
              >
                <MoveProgressStep
                  totalLength={steps.length}
                  index={index}
                  isActive={
                    index == 0 ? index == 0 : trackMove[step.key as never]
                  }
                  step={step}
                />
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------------- TRANSLATIONS ---------------- */

const trackMoveText = {
  errorMessage: {
    empty: {
      en: "Please provide tracking code",
      nl: "Voer alstublieft een trackingcode in",
    },
    default: {
      en: "An error occurred could not get move request details",
      nl: "Er is een fout opgetreden, de verhuizing kon niet worden opgehaald",
    },
  },
};

export function TrackMoveTimeline() {
  const { locale, tracking_code: trackingCode } = useParams<{
    locale: Locale;
    tracking_code: string;
  }>();
  const [loading, setLoading] = useState(true);
  const [trackMoveDetails, setTrackMoveDetails] = useState<TrackMove | null>(
    null,
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getTrackingCode = useCallback(async () => {
    setLoading(true);
    try {
      const res = await MoveRequestProvider.getTrackMove(trackingCode);
      if (!res.responseStatus || !res.result) {
        throw new Error(
          res.responseMessage ??
            AppTranslator.getLocaleText({
              locale,
              translations: trackMoveText.errorMessage.default,
            }),
        );
      }
      setTrackMoveDetails(res.result);
    } catch (error) {
      const err =
        (error as Error)?.message ??
        AppTranslator.getLocaleText({
          locale,
          translations: trackMoveText.errorMessage.default,
        });
      setErrorMessage(err);
    } finally {
      setLoading(false);
    }
  }, [trackingCode, locale]);

  useEffect(() => {
    getTrackingCode();
  }, [getTrackingCode]);

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-2xl h-[80vh] lg:h-[40vh] flex justify-center p-4 items-center">
        <div className="bg-white shadow-2xl rounded-full h-16 w-16 flex items-center justify-center">
          <LoaderCircle
            size={36}
            className="text-2xl text-theme animate-spin"
          />
        </div>
      </div>
    );
  }

  if (trackMoveDetails) {
    return (
      <div className="bg-white/40 p-4 lg:py-10 lg:p-10 backdrop-blur-2xl space-y-4 border border-black/10 min-h-screen rounded-3xl">
        <div className="mt-6 lg:mt-12 space-y-8 lg:flex gap-x-8">
          <div className="flex-1 mb-6 space-y-10 lg:mb-0">
            <StepBar currentStep={5} />
            <TimelineStep currentStep={3} />
          </div>
          <div className="flex-2">
            <p className="text-xl lg:text-3xl font-medium">
              {AppTranslator.getLocaleText({
                locale,
                translations: {
                  en: "Track Move",
                  nl: "Verhuizing volgen",
                },
              })}
            </p>
            <div className="mt-8 bg-theme/10 text-xs lg:text-base flex items-center gap-x-3 text-theme p-4 rounded-xl">
              <Info />
              <p className="flex-1">
                {AppTranslator.getLocaleText({
                  locale,
                  translations: {
                    en: "Make sure you get in touch with moving company to confirm any needed information",
                    nl: "Neem contact op met je verhuisbedrijf voor extra vragen of informatie.",
                  },
                })}
              </p>
            </div>
            <div className="mt-8 lg:flex gap-x-4">
              <div className="bg-white border border-[#C0C0C0] flex-3 rounded-2xl p-4 lg:p-8">
                <MapComponent {...trackMoveDetails} />
              </div>
              <div className="flex-2 pt-0 lg:pt-20">
                <MoveTimelineStepBar trackMove={trackMoveDetails} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[40vh] flex items-center justify-center">
      <div className="flex-1 max-w-120 p-8 px-6 space-y-2 bg-white rounded-2xl text-center">
        <CircleAlert className="text-center text-red-500 mx-auto" size={60} />
        <p className="font-bold text-3xl">Failed</p>
        <p className="text-grey">
          {errorMessage ||
            "An error occurred could not load move details from tracking code"}
        </p>
        <button
          onClick={getTrackingCode}
          className="bg-red-400 px-10 py-3 text-white font-medium justify-center inline-flex gap-x-2 items-center rounded-lg"
        >
          <RefreshCwIcon />
          <span>Reload</span>
        </button>
      </div>
    </div>
  );
}
