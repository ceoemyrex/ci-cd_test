"use client";
import {
  CalendarDays,
  CheckCheck,
  CircleAlert,
  LoaderCircle,
  Package,
  RefreshCwIcon,
  Truck,
} from "lucide-react";
import { Info, TickIcon } from "@/app/icons";
import { AppTranslator, Locale } from "@/app/utils";
import { useParams } from "next/navigation";
import {
  MoveRequestProvider,
  QuoteProvider,
  TrackMove,
  type MoveDetailsResponseModel,
  type QuoteSummaryResponseModel,
} from "@/services";
import { useCallback, useEffect, useMemo, useState } from "react";
import MapComponent from "@/app/components/MapComponent";
import {
  mapQuotesToRecommendedMovers,
  recommendedMoverFromMoveDetails,
} from "@/hooks/mapQuotesToRecommendedMovers";
import {
  bookingFromTrackAndMoveDetails,
  isTrackPaymentComplete,
} from "@/hooks/trackMovePayment";
import {
  BookMoveStep1Provider,
  useBookMoveStep1,
} from "../../book-move/components/BookMoveStep1Context";
import { BookFormStep1Footer } from "../../book-move/components/BookFormStep1Footer";
import { RecommendedMoversPanel } from "../../book-move/components/RecommendedMoversPanel";
import {
  MoveStage,
  TrackMoveStatus,
} from "../../book-move/components/BookMoveTimelineStep";
import type { BookMoveBookingDetails } from "@/types/movers";

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
function moveTimelineStepReached(index: number, tm: TrackMove) {
  if (index === 0) return true;
  if (index === 1) return tm.hasArrived || tm.inTransit || tm.isCompleted;
  if (index === 2) return tm.inTransit || tm.isCompleted;
  if (index === 3) return tm.isCompleted;
  return false;
}

export function MoveTimelineStepBar({ trackMove }: { trackMove: TrackMove }) {
  const steps = [
    {
      title: {
        en: "Payment Made",
        nl: "Betaling ontvangen",
      },
      description: {
        en: "Payment confirmed and tracking code generated",
        nl: "Betaling bevestigd en trackingcode gegenereerd.",
      },
      icon: <CheckCheck className="h-5 w-5" />,
    },
    {
      title: {
        en: "Pickup & Move Start",
        nl: "Ophalen & start verhuizing",
      },
      description: {
        en: "Mover navigates to pickup location on schedule",
        nl: "De verhuizer rijdt volgens planning naar de ophaallocatie.",
      },
      icon: <CalendarDays className="h-5 w-5" />,
    },
    {
      title: {
        en: "Mover In Transit",
        nl: "Verhuizer onderweg",
      },
      description: {
        en: "Belongings securely loaded transit begins immediately",
        nl: "Inboedel is veilig geladen; transport is gestart.",
      },
      icon: <Truck className="h-5 w-5" />,
    },
    {
      title: {
        en: "Unloading Move",
        nl: "Lossen",
      },
      description: {
        en: "Final unloading updates will appear here",
        nl: "Updates over het lossen verschijnen hier.",
      },
      icon: <Package className="h-5 w-5" />,
    },
  ];

  const { locale } = useParams<{ locale: Locale }>();

  return (
    <div className="relative rounded-2xl pt-12">
      <p className="text-xl font-medium text-grey lg:text-3xl">
        {AppTranslator.getLocaleText({
          locale,
          translations: {
            en: "Move Timeline",
            nl: "Verhuistijdlijn",
          },
        })}
      </p>
      <div className="mt-8">
        {steps.map((step, index) => (
          <MoveStage
            key={AppTranslator.getLocaleText({
              locale,
              translations: step.title,
            })}
            active={moveTimelineStepReached(index, trackMove)}
            showConnector={index < steps.length - 1}
            icon={step.icon}
            title={AppTranslator.getLocaleText({
              locale,
              translations: step.title,
            })}
            description={AppTranslator.getLocaleText({
              locale,
              translations: step.description,
            })}
          />
        ))}
      </div>
    </div>
  );
}

function bookingFromTrackAndQuotes(
  track: TrackMove,
  firstQuote: QuoteSummaryResponseModel | undefined,
): BookMoveBookingDetails {
  const md = firstQuote?.moveDetails;
  let moveDateLabel = "";
  if (md?.moveDate) {
    const d = new Date(md.moveDate);
    if (!Number.isNaN(d.getTime())) {
      moveDateLabel = d.toLocaleDateString("nl-NL", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
  }
  return {
    fromAddress: md?.from ?? "",
    toAddress: md?.to ?? "",
    moveSizeLabel: md?.houseSize ?? "",
    moveDateLabel,
    moveDayLabel: md?.moveDay ?? "",
    moveTimeLabel: md?.moveTime ?? "",
    fromLatitude: md?.pickUpLatitude ?? track.fromLatitude,
    fromLongitude: md?.pickUpLongitude ?? track.fromLongitude,
    toLatitude: md?.dropOffLatitude ?? track.toLatitude,
    toLongitude: md?.dropOffLongitude ?? track.toLongitude,
  };
}

function TrackMoveLoadedView({
  trackMove,
  trackingCode,
}: {
  trackMove: TrackMove;
  trackingCode: string;
}) {
  const { locale } = useParams<{ locale: Locale }>();
  const [quotes, setQuotes] = useState<QuoteSummaryResponseModel[]>([]);
  const [moveDetails, setMoveDetails] =
    useState<MoveDetailsResponseModel | null>(null);

  useEffect(() => {
    let cancelled = false;
    QuoteProvider.getAllQuotesByTrackingCode(trackingCode).then((res) => {
      if (cancelled) return;
      if (res.responseStatus && Array.isArray(res.result)) {
        setQuotes(res.result);
      }
    });
    MoveRequestProvider.getMoveDetails(trackingCode).then((res) => {
      if (cancelled) return;
      if (res.responseStatus && res.result) {
        setMoveDetails(res.result);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [trackingCode]);

  const movers = useMemo(
    () => mapQuotesToRecommendedMovers(quotes),
    [quotes],
  );
  const { subView, selectedMover, paymentResult } = useBookMoveStep1();

  const paymentCompleteOnServer = isTrackPaymentComplete(
    trackMove,
    moveDetails?.status,
  );
  const clientPaidSession = Boolean(
    subView === "track" && selectedMover && paymentResult,
  );
  const showFullTrackView = clientPaidSession || paymentCompleteOnServer;

  const offerTimelineStep =
    clientPaidSession || paymentCompleteOnServer
      ? 3
      : subView === "payment"
        ? 2
        : 1;

  const resolvedMover = useMemo(() => {
    if (clientPaidSession && selectedMover) {
      return selectedMover;
    }
    if (!showFullTrackView) {
      return null;
    }
    if (movers.length > 0) {
      return movers[0];
    }
    if (moveDetails) {
      return recommendedMoverFromMoveDetails(
        moveDetails,
        moveDetails.fullName?.trim() || "Your move",
        moveDetails.email,
      );
    }
    return null;
  }, [
    clientPaidSession,
    selectedMover,
    showFullTrackView,
    movers,
    moveDetails,
  ]);

  const resolvedBooking = useMemo(() => {
    if (quotes[0]) {
      return bookingFromTrackAndQuotes(trackMove, quotes[0]);
    }
    if (moveDetails) {
      return bookingFromTrackAndMoveDetails(trackMove, moveDetails);
    }
    return bookingFromTrackAndQuotes(trackMove, undefined);
  }, [trackMove, quotes, moveDetails]);

  return (
    <div className="min-h-screen space-y-4 rounded-3xl border border-black/10 bg-white/40 p-4 py-10 backdrop-blur-2xl lg:p-10">
      <div className="mt-6 space-y-8 lg:mt-12 lg:flex lg:gap-x-8">
        <div className="mb-6 flex-1 space-y-10 lg:mb-0">
          <StepBar currentStep={5} />
          <div className="hidden lg:block">
            <TimelineStep currentStep={offerTimelineStep} />
          </div>
        </div>
        <div className="flex-2">
          {showFullTrackView && resolvedMover ? (
            <TrackMoveStatus
              mover={resolvedMover}
              booking={resolvedBooking}
              trackingCode={trackingCode}
              moveProgress={{
                hasArrived: trackMove.hasArrived,
                inTransit: trackMove.inTransit,
                isCompleted: trackMove.isCompleted,
              }}
            />
          ) : showFullTrackView && !resolvedMover ? (
            <>
              <p className="text-xl font-medium lg:text-3xl">
                {AppTranslator.getLocaleText({
                  locale,
                  translations: {
                    en: "Track Move",
                    nl: "Verhuizing volgen",
                  },
                })}
              </p>
              <div className="mt-10 lg:flex lg:gap-x-4">
                <div className="flex-3 rounded-2xl border border-[#C0C0C0] bg-white p-4 lg:p-8">
                  <MapComponent {...trackMove} />
                </div>
                <div className="flex-2 pt-8 lg:pt-20">
                  <MoveTimelineStepBar trackMove={trackMove} />
                </div>
              </div>
            </>
          ) : (
            <>
              <p className="text-xl font-medium lg:text-3xl">
                {AppTranslator.getLocaleText({
                  locale,
                  translations: {
                    en: "Choose a mover & pay",
                    nl: "Kies een verhuizer & betaal",
                  },
                })}
              </p>
              <div className="mt-8 flex items-center gap-x-3 rounded-xl bg-theme/10 p-4 text-xs text-theme lg:text-base">
                <Info />
                <p className="flex-1">
                  {AppTranslator.getLocaleText({
                    locale,
                    translations: {
                      en: "Review quotes from moving companies below. After payment you will see the live map and full move timeline.",
                      nl: "Bekijk hieronder de offertes van verhuizers. Na betaling zie je de live kaart en de volledige verhuistijdlijn.",
                    },
                  })}
                </p>
              </div>
              <RecommendedMoversPanel
                movers={movers}
                trackingCodeOverride={trackingCode}
              />
              <BookFormStep1Footer locale={locale} />
            </>
          )}
        </div>
      </div>
    </div>
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
  const { locale, tracking_code: trackingCodeParam } = useParams<{
    locale: Locale;
    tracking_code: string;
  }>();
  const trackingCode = decodeURIComponent(trackingCodeParam ?? "");
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
      <BookMoveStep1Provider>
        <TrackMoveLoadedView
          trackMove={trackMoveDetails}
          trackingCode={trackingCode}
        />
      </BookMoveStep1Provider>
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
