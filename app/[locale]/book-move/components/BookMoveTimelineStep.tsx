"use client";

import { TickIcon } from "@/app/icons";
import { AppTranslator, Locale } from "@/app/utils";
import { useParams } from "next/navigation";
import { useMemo, type ReactNode } from "react";
import { CalendarDays, CheckCheck, Copy, Package, Truck } from "lucide-react";
import type { BookMoveBookingDetails, RecommendedMover } from "@/types/movers";
import MapComponent from "@/app/components/MapComponent";

function TimelineStepButton({
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
        <div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#C0C0C0] bg-white text-[#C0C0C0] lg:h-12 lg:w-12">
            <div className="h-2.5 w-2.5 rounded-full bg-[#C0C0C0] lg:h-4 lg:w-4"></div>
          </div>
        </div>
        <div className="text-grey">
          <p className="text-sm font-medium lg:text-lg">{title}</p>
          <p className="text-xs text-[#C0C0C0] lg:text-sm">{description}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex relative items-center gap-x-4">
      <div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-secondary bg-secondary/10 lg:h-12 lg:w-12">
          {completed ? (
            <TickIcon />
          ) : (
            <div className="h-2.5 w-2.5 rounded-full bg-secondary lg:h-4 lg:w-4" />
          )}
        </div>
      </div>
      <div className="text-dark">
        <p className="text-sm font-medium lg:text-lg">{title}</p>
        <p className="text-xs text-grey lg:text-sm">{description}</p>
      </div>
    </div>
  );
}

function TimelineStepDivider({ isComplete }: { isComplete: boolean }) {
  if (isComplete) {
    return (
      <div className="ml-5 h-12 w-0.5 bg-linear-to-b from-secondary to-[#D3E3CD] lg:ml-6" />
    );
  }

  return <div className="ml-2 h-14 w-0.5 -mb-2 bg-[#E5E5E5] lg:ml-6" />;
}

export function BookMoveTimelineStep({
  currentStep = 1,
}: {
  currentStep?: number;
}) {
  const steps = [
    {
      title: {
        en: "Recommended Movers",
        nl: "Aangeraden verhuizers",
      },
      description: {
        en: "List of moving companies & quotes",
        nl: "Overzicht van verhuisbedrijven en offertes.",
      },
    },
    {
      title: {
        en: "Make Payment",
        nl: "Betalen",
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
        en: "Start tracking your move",
        nl: "Volg je verhuizing stap voor stap.",
      },
    },
  ];

  const { locale } = useParams<{ locale: Locale }>();

  return (
    <div className="rounded-2xl border border-[#E5E5E5] bg-white p-6">
      {steps.map((step, index) => (
        <div
          key={AppTranslator.getLocaleText({
            locale,
            translations: step.title,
          })}
        >
          <TimelineStepButton
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
            <TimelineStepDivider isComplete={currentStep > index + 1} />
          )}
        </div>
      ))}
    </div>
  );
}

export function MoveStage({
  active,
  icon,
  title,
  description,
  showConnector,
}: {
  active: boolean;
  icon: ReactNode;
  title: string;
  description: string;
  showConnector: boolean;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex w-12 shrink-0 flex-col items-center self-stretch">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 ${
            active
              ? "border-secondary bg-secondary/10 text-secondary"
              : "border-[#D0D5DD] bg-white text-[#C0C0C0]"
          }`}
        >
          {icon}
        </div>
        {showConnector ? (
          <div className="mt-3 w-0.5 flex-1 min-h-8 bg-[#D3E3CD]" />
        ) : null}
      </div>
      <div className="min-w-0 pb-8 pt-1">
        <p
          className={`text-lg font-medium ${
            active ? "text-dark" : "text-[#98A2B3]"
          }`}
        >
          {title}
        </p>
        <p className="mt-1 max-w-md text-pretty text-sm leading-relaxed text-grey">
          {description}
        </p>
      </div>
    </div>
  );
}

export function TrackMoveStatus({
  mover,
  booking,
  trackingCode,
  moveProgress,
}: {
  mover: RecommendedMover;
  booking: BookMoveBookingDetails;
  trackingCode: string;
  moveProgress?: {
    hasArrived: boolean;
    inTransit: boolean;
    isCompleted: boolean;
  };
}) {
  const { locale } = useParams<{ locale: Locale }>();
  const tm = moveProgress ?? {
    hasArrived: false,
    inTransit: false,
    isCompleted: false,
  };
  const trackMoveData = useMemo(
    () => ({
      fromLatitude: booking.fromLatitude,
      fromLongitude: booking.fromLongitude,
      toLatitude: booking.toLatitude,
      toLongitude: booking.toLongitude,
      hasArrived: tm.hasArrived,
      inTransit: tm.inTransit,
      isCompleted: tm.isCompleted,
    }),
    [booking, tm.hasArrived, tm.inTransit, tm.isCompleted],
  );
  const stage1 = true;
  const stage2 = tm.hasArrived || tm.inTransit || tm.isCompleted;
  const stage3 = tm.inTransit || tm.isCompleted;
  const stage4 = tm.isCompleted;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-2xl font-medium text-dark lg:text-4xl">
          {AppTranslator.getLocaleText({
            locale,
            translations: {
              en: "Track Move",
              nl: "Verhuizing volgen",
            },
          })}
        </p>
        <p className="mt-2 text-sm text-grey lg:text-base">
          {AppTranslator.getLocaleText({
            locale,
            translations: {
              en: "Payment confirmed. Your move tracking is now active.",
              nl: "Betaling bevestigd. Het volgen van je verhuizing is nu actief.",
            },
          })}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-sm ring-1 ring-black/5">
        <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-secondary">
          {AppTranslator.getLocaleText({
            locale,
            translations: {
              en: "Tracking Code",
              nl: "Trackingcode",
            },
          })}
        </span>
        <span className="text-lg font-semibold text-dark">{trackingCode}</span>
        <button
          type="button"
          onClick={() => navigator.clipboard?.writeText(trackingCode)}
          className="inline-flex items-center gap-2 rounded-full border border-[#D0D5DD] px-3 py-1.5 text-sm text-dark"
        >
          <Copy className="h-4 w-4" />
          {AppTranslator.getLocaleText({
            locale,
            translations: {
              en: "Copy",
              nl: "Kopieer",
            },
          })}
        </button>
      </div>

      <div className="rounded-2xl bg-[#DCEAFE] px-4 py-4 text-sm text-[#175CA3]">
        {AppTranslator.getLocaleText({
          locale,
          translations: {
            en: "Make sure you get in touch with moving company to confirm any needed information",
            nl: "Neem contact op met het verhuisbedrijf om eventuele extra informatie te bevestigen.",
          },
        })}
      </div>

      <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1.15fr)_360px]">
        <div className="min-w-0 rounded-[28px] border border-white/80 bg-white p-4 shadow-sm lg:p-6">
          <div className="overflow-hidden rounded-3xl bg-[#F2F4F7]">
            <MapComponent {...trackMoveData} />
          </div>
          <div className="mt-5 rounded-3xl border border-[#D9F0D2] bg-[#FBFEFA] p-5">
            <div className="grid min-w-0 gap-4 sm:grid-cols-2">
              <div className="min-w-0 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-black/4">
                <p className="text-xs uppercase tracking-[0.2em] text-grey">
                  {mover.fromLabel}
                </p>
                <p className="mt-1 text-pretty wrap-break-word text-sm font-medium text-dark lg:text-base">
                  {mover.fromAddress}
                </p>
              </div>
              <div className="min-w-0 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-black/4">
                <p className="text-xs uppercase tracking-[0.2em] text-grey">
                  {mover.toLabel}
                </p>
                <p className="mt-1 text-pretty wrap-break-word text-sm font-medium text-dark lg:text-base">
                  {mover.toAddress}
                </p>
              </div>
            </div>
            <div className="mt-5 border-t border-[#C9E8BF] pt-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <p className="shrink-0 text-sm text-grey">{mover.distance}</p>
                <p className="text-3xl font-semibold tracking-tight text-secondary sm:text-4xl">
                  {mover.price}
                </p>
              </div>
              <p className="mt-3 text-pretty text-sm font-medium text-dark sm:text-base">
                {mover.meta}
              </p>
            </div>
          </div>
        </div>

        <div className="min-w-0 rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-black/5 lg:p-8">
          <p className="text-3xl font-medium text-grey">Move Timeline</p>
          <div className="mt-8">
            <MoveStage
              active={stage1}
              showConnector
              icon={<CheckCheck className="h-5 w-5" />}
              title="Payment Made"
              description="Payment confirmed and tracking code generated"
            />
            <MoveStage
              active={stage2}
              showConnector
              icon={<CalendarDays className="h-5 w-5" />}
              title="Pickup & Move Start"
              description="Mover navigates to pickup location on schedule"
            />
            <MoveStage
              active={stage3}
              showConnector
              icon={<Truck className="h-5 w-5" />}
              title="Mover In Transit"
              description="Belongings securely loaded transit begins immediately"
            />
            <MoveStage
              active={stage4}
              showConnector={false}
              icon={<Package className="h-5 w-5" />}
              title="Unloading Move"
              description="Final unloading updates will appear here"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
