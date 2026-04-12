"use client";
import { LocationIcon, GeoLocationIcon, ArrowDropDownIcon } from "@/app/icons";
import { PackageMovingIcon } from "@/app/icons/package";
import { AppTranslator, Locale } from "@/app/utils";
import { useGetLocation, useParamFilter } from "@/hooks";
import {  Place } from "@/services";
import { moveTranslations } from "@/translations";
import { LoaderCircle } from "lucide-react";
import { useParams } from "next/navigation";
import {
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export const tabs = [
  {
    name: "House",
    value: "house",
    icon: <></>,
    options: [
      {
        label: "Few items",
      },
      {
        label: "1 Bedroom",
      },
      {
        label: "2 Bedroom",
      },
      {
        label: "3 Bedroom",
      },
      {
        label: "4 Bedroom",
      },
      {
        label: "5 Bedroom",
      },
      {
        label: "6 Bedroom",
      },
    ],
  },
  {
    name: "Apartment",
    value: "apartment",
    icon: <></>,
    options: [
      {
        label: "Few items",
      },
      {
        label: "Studio",
      },
      {
        label: "1 Bedroom",
      },
      {
        label: "2 Bedroom",
      },
      {
        label: "3 Bedroom",
      },
      {
        label: "4 Bedroom",
      },
      {
        label: "5 Bedroom",
      },
      {
        label: "6 Bedroom",
      },
    ],
  },
  {
    name: "Storage",
    value: "storage",
    icon: <></>,
    options: [
      {
        label: "Small 2 x 4",
      },
      {
        label: "Small 5 x 5",
      },
      {
        label: "Small 5 x 10",
      },
      {
        label: "Small 5 x 15",
      },
      {
        label: "Small 10 x 20",
      },
      {
        label: "Small 10 x 30",
      },
    ],
  },
];

export function LocationDetailsForm({
  moveFrom,
  moveTo,
  setMoveSize,
  setMoveFrom,
  setMoveTo,
  moveSize,
}: {
  moveFrom: Place | null;
  moveTo: Place | null;
  setMoveFrom: (value: Place) => void;
  setMoveTo: (value: Place) => void;
  moveSize: string;
  setMoveSize: (value: string) => void;
}) {
  const [currentTab, setCurrentTab] = useState("house");
  const [sizeOpen, setSizeOpen] = useState(false);
  const [moveFromText] = useParamFilter("moveFrom");
  const [moveToText] = useParamFilter("moveTo");
  const [moveSizeText] = useParamFilter("moveSize");
  const { locale } = useParams<{ locale: Locale }>();

  useEffect(() => {
    if (moveSizeText) {
      setMoveSize(moveSizeText);
    }
  }, [moveSizeText, setMoveSize]);

  const options = useMemo(() => {
    const selectedOption = tabs.find((item) => item.value == currentTab);
    return selectedOption?.options ?? [];
  }, [currentTab]);

  return (
    <div>
      <p className="text-lg lg:text-2xl font-medium">
        {" "}
        {AppTranslator.getLocaleText({
          locale,
          translations: {
            en: "Location Details",
            nl: "Locatiegegevens",
          },
        })}
      </p>

      <div className="space-y-6 mt-8">
        <LocationAutocomplete
          label={AppTranslator.getLocaleText({
            locale,
            translations: {
              en: "Moving From",
              nl: "Verhuizen vanaf",
            },
          })}
          selectedPlace={moveFrom}
          onSelectPlace={setMoveFrom}
          placeholder={AppTranslator.getLocaleText({
            locale,
            translations: {
              en: "Moving From",
              nl: "Verhuizen vanaf",
            },
          })}
          icon={<LocationIcon />}
          locationText={moveFromText}
        />

        <LocationAutocomplete
          label={AppTranslator.getLocaleText({
            locale,
            translations: {
              en: "Moving To",
              nl: "Verhuizen naar",
            },
          })}
          selectedPlace={moveTo}
          onSelectPlace={setMoveTo}
          placeholder={AppTranslator.getLocaleText({
            locale,
            translations: {
              en: "Moving To",
              nl: "Verhuizen naar",
            },
          })}
          locationText={moveToText}
          icon={<GeoLocationIcon />}
        />

        {/* Moving Size */}
        <div className="space-y-3">
          <p className="text-dark">
            {AppTranslator.getLocaleText({
              locale,
              translations: {
                en: "Moving Size",
                nl: "Verhuisinformatie:",
              },
            })}
          </p>

          <div
            onClick={() => setSizeOpen((prev) => !prev)}
            className="bg-white flex items-center gap-x-2.5 rounded-xl p-2.5 lg:p-5"
          >
            <PackageMovingIcon />
            {moveSize ? (
              <p className="text-dark text-base lg:text-sm">
                {AppTranslator.getLocaleText({
                  locale,
                  translations: moveTranslations[moveSize],
                })}
              </p>
            ) : (
              <p className="text-grey text-xs lg:text-sm">
                {" "}
                {AppTranslator.getLocaleText({
                  locale,
                  translations: {
                    en: "Moving Size",
                    nl: "Verhuisinformatie:",
                  },
                })}
              </p>
            )}
            <button className={`ml-auto ${sizeOpen ? "rotate-180" : ""}`}>
              <ArrowDropDownIcon />
            </button>
          </div>
          {sizeOpen && (
            <div className="bg-white border border-[#E5E5E5] max-w-100 mx-auto mt-10 rounded-lg">
              <header className="flex items-center border-b border-[#E5E5E5]">
                {tabs.map((tab) => {
                  if (tab.value == currentTab) {
                    return (
                      <button
                        key={tab.value}
                        className="flex-1 text-theme -mb-px mx-1 font-medium border-b border-theme p-4"
                      >
                        {AppTranslator.getLocaleText({
                          locale,
                          translations: moveTranslations[tab.name],
                        })}
                      </button>
                    );
                  }

                  return (
                    <button
                      onClick={() => setCurrentTab(tab.value)}
                      key={tab.value}
                      className="flex-1 px-4 py-2 text-grey"
                    >
                      {AppTranslator.getLocaleText({
                        locale,
                        translations: moveTranslations[tab.name],
                      })}
                    </button>
                  );
                })}
              </header>
              <div>
                {options.map((option) => {
                  return (
                    <button
                      className="p-4 border text-dark border-[#E5E5E5] w-full text-left last:border-0"
                      key={option.label}
                      onClick={() => {
                        setMoveSize(option.label);
                        setSizeOpen(false);
                      }}
                    >
                      {AppTranslator.getLocaleText({
                        locale,
                        translations: moveTranslations[option.label],
                      })}{" "}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ======================================================
   Internal Component (kept in same file intentionally)
====================================================== */

interface LocationAutocompleteProps {
  label: string;
  placeholder: string;
  icon: ReactNode;
  theme?: "white" | "light" | "grey";
  selectedPlace?: Place | null;
  onSelectPlace?: (place: Place) => void;
  readOnly?: boolean;
  locationText?: string;
}

export function LocationAutocomplete({
  label,
  placeholder,
  icon,
  selectedPlace,
  readOnly,
  onSelectPlace,
  theme = "white",
  locationText,
}: LocationAutocompleteProps) {
  const location = useGetLocation(selectedPlace, onSelectPlace, locationText);
  const containerRef = useRef<HTMLDivElement>(null);
  const { locale } = useParams<{ locale: Locale }>();

  /**
   * ✅ Close dropdown on outside click
   */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        location.setPopupOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [location]);

  return (
    <div className="space-y-3" ref={containerRef}>
      <p className="text-dark text-sm lg:text-base">{label}</p>

      <div className="relative">
        {/* INPUT */}
        <div
          className={`${theme == "white" ? "bg-white" : theme == "grey" ? "bg-[#F3F3F4] border border-black/10" : "bg-[#F9FCF9] border border-black/10"} flex items-center gap-x-2.5 rounded-xl p-2.5 lg:p-5`}
        >
          {icon}

          <input
            readOnly={readOnly}
            value={location.queryString}
            onChange={(e) => location.setQueryText(e.target.value)}
            onKeyDown={location.handleKeyDown}
            placeholder={placeholder}
            className="w-full outline-none capitalize text-base lg:text-sm"
          />

          <button
            type="button"
            className="ml-auto cursor-pointer"
            onClick={() => location.setPopupOpen((p) => !p)}
          >
            {location.loading ? (
              <LoaderCircle strokeWidth={1} className="animate-spin" />
            ) : (
              <ArrowDropDownIcon />
            )}
          </button>
        </div>

        {/* DROPDOWN */}
        {!readOnly && location.popupOpen && (
          <div className="absolute left-0 top-full w-full z-50">
            <div className="mt-3 overflow-hidden rounded-xl border border-grey/20 bg-white shadow-lg">
              {location.places.length > 0 ? (
                <ul className="max-h-60 overflow-y-auto">
                  {location.places.map((place) => (
                    <li
                      key={place.placePrediction.placeId}
                      onClick={() => {
                        location.selectPlace(place);
                      }}
                      className="cursor-pointer border-b border-grey/10 p-4 text-sm capitalize text-grey last:border-0 hover:bg-grey/5"
                    >
                      {place.placePrediction.text.text}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="border-b border-grey/10 px-4 py-3 text-sm text-grey">
                  {AppTranslator.getLocaleText({
                    locale,
                    translations: {
                      en: "Autocomplete is unavailable. You can keep typing and use the address manually.",
                      nl: "Autocomplete is niet beschikbaar. Je kunt het adres handmatig blijven invoeren.",
                    },
                  })}
                </div>
              )}

              {location.queryString.trim() && (
                <button
                  type="button"
                  onClick={location.useTypedAddress}
                  className="w-full bg-[#F9FCF9] px-4 py-3 text-left text-sm font-medium text-theme hover:bg-[#F1FAF1]"
                >
                  {AppTranslator.getLocaleText({
                    locale,
                    translations: {
                      en: `Use "${location.queryString.trim()}" as entered`,
                      nl: `Gebruik "${location.queryString.trim()}" zoals ingevoerd`,
                    },
                  })}
                </button>
              )}
            </div>
          </div>
        )}

        {!readOnly && !location.popupOpen && location.queryString.trim() && (
          <button
            type="button"
            onClick={location.useTypedAddress}
            className="mt-3 text-left text-xs font-medium text-theme underline-offset-2 hover:underline"
          >
            {AppTranslator.getLocaleText({
              locale,
              translations: {
                en: "Use typed address manually instead",
                nl: "Gebruik het ingevoerde adres handmatig",
              },
            })}
          </button>
        )}
      </div>
    </div>
  );
}
