/* eslint-disable @next/next/no-img-element */
"use client";
import { ArrowDropDownIcon } from "@/app/icons";
import { Navbar } from "@/components";
import { TrackingCodeInput } from "./TrackingCodeInput";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { MoveRequestProvider } from "@/services/MoveRequest";
import { Locale, AppTranslator } from "@/app/utils";
import { useRouter } from "next/navigation";

/* ---------------- TRANSLATIONS ---------------- */

const trackMoveText = {
  breadcrumb: {
    en: "Home",
    nl: "Home",
  },
  title: {
    en: "Track your move progress",
    nl: "Verhuizing volgen",
  },
  enterCodeText: {
    en: "Enter code to tracking move",
    nl: "Voer je code in",
  },
  buttonText: {
    en: "Start Tracking Move",
    nl: "Verhuizing volgen",
  },
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

export function TrackMoveHero({ locale = "nl" }: { locale: Locale }) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [trackingCode, setTrackingCode] = useState("");
  const router = useRouter()

  const handleSubmit = async () => {
    if (!trackingCode) {
      setErrorMessage(
        AppTranslator.getLocaleText({
          locale,
          translations: trackMoveText.errorMessage.empty,
        })
      );
      return;
    }
    setLoading(true);
    try {
      const res = await MoveRequestProvider.getTrackMove(trackingCode);
      if (!res.responseStatus) {
        throw new Error(
          res.responseMessage ??
            AppTranslator.getLocaleText({
              locale,
              translations: trackMoveText.errorMessage.default,
            })
        );
      }
      router.push(`/track-move/${trackingCode}`)

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
  };

  return (
    <section>
      <div className="relative pb-15 lg:pb-30 lg:rounded-t-4xl">
        <img
          src={"/hero-bg.png"}
          alt="hero-bg"
          className="absolute lg:rounded-t-4xl top-0 left-0 w-full h-full object-center object-cover"
        />
        <div className="relative max-w-310 2xl:max-w-350 mx-auto p-4">
          <Navbar />
          <div className="pb-12.5 lg:pb-37.5 pt-20 lg:pt-30">
            <header className="flex items-center gap-x-4">
              <div className="text-grey flex items-center text-sm lg:text-xl">
                <p>
                  {AppTranslator.getLocaleText({
                    locale,
                    translations: trackMoveText.breadcrumb,
                  })}
                </p>
                <span className="-rotate-90 pt-1">
                  <ArrowDropDownIcon />
                </span>
              </div>
              <p className="lg:text-2xl font-medium">
                {AppTranslator.getLocaleText({
                  locale,
                  translations: trackMoveText.title,
                })}
              </p>
            </header>

            <div className="mt-8 lg:mt-20 bg-white/50 p-4 space-y-8 rounded-2xl border border-white max-w-175.5 mx-auto">
              {errorMessage && (
                <div className="bg-red-100 p-2 lg:p-4 rounded-lg border border-red-200 text-red-400">
                  {errorMessage}
                </div>
              )}

              <div className="h-40 lg:h-60 relative">
                <img
                  src="/images/map.png"
                  className="w-full h-full rounded-2xl object-cover"
                  alt="Map Image"
                />
              </div>

              <p className="text-dark font-medium lg:text-2xl text-center">
                {AppTranslator.getLocaleText({
                  locale,
                  translations: trackMoveText.enterCodeText,
                })}
              </p>

              <div className="mt-4">
                <TrackingCodeInput
                  onComplete={(code) => setTrackingCode(code)}
                />
              </div>

              <div className="mt-10 flex items-center justify-center lg:mt-28.5 pb-4 lg:pb-8 text-center">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-9 py-4 disabled:opacity-75 w-full flex items-center justify-center lg:w-auto lg:py-5 text-sm lg:text-lg font-medium bg-theme text-white rounded-xl"
                >
                  {loading && <LoaderCircle className="animate-spin" />}
                  <span>
                    {AppTranslator.getLocaleText({
                      locale,
                      translations: trackMoveText.buttonText,
                    })}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}