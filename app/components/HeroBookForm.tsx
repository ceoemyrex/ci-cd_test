/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { LocationAutocomplete, tabs } from "../[locale]/book-move/components";
import { ArrowDropDownIcon, LocationIcon, GeoLocationIcon } from "../icons";
import { PackageMovingIcon } from "../icons/package";
import { AppTranslator, Locale } from "../utils";
import { moveTranslations } from "@/translations";

/* ---------------- TRANSLATIONS ---------------- */

const heroBookFormText = {
  title: {
    en: "Get started in seconds",
    nl: "                               Offerte aanvragen",
  },
  subtitle: {
    en: "Create a clear inventory first, then coordinate the move details.",
    nl: "                                                             Vind dé verhuizer voor je project.",
  },
  movingFrom: {
    en: "Moving From",
    nl: "Verhuizen vanaf",
  },
  movingTo: {
    en: "Moving To",
    nl: "Verhuizen naar",
  },
  movingSize: {
    en: "Moving Size",
    nl: "Verhuisinformatie:",
  },
  continue: {
    en: "Continue",
    nl: "Ga verder ",
  },
  footer: {
    en: "No calls. No spam. Just clear next steps.",
    nl: "Geen ongewenste telefoontjes. Geen spam. Gewoon duidelijke vervolgstappen.",
  },
};

type Props = {
  value?: string;
  locale?: Locale;
  onChange: (value: string) => void;
  tabs: {
    name: string;
    value: string;
    icon?: React.ReactNode;
    options: {
      label: string;
      size?: string;
    }[];
  }[];
};

export function MovingSizeDropdown({ value, onChange, tabs, locale }: Props) {
  const [open, setOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState(tabs[0]?.value);

  /* ---------------- Active Options ---------------- */
  const options = useMemo(() => {
    return tabs.find((t) => t.value === currentTab)?.options ?? [];
  }, [tabs, currentTab]);

  /* ---------------- Selected Label ---------------- */
  const selectedLabel = useMemo(() => {
    for (const tab of tabs) {
      const found = tab.options.find((o) => o.label === value);
      if (found) return found.label;
    }
    return null;
  }, [tabs, value]);

  return (
    <div className="space-y-3 relative">
      <p className="text-dark">
        {" "}
        {AppTranslator.getLocaleText({
          locale,
          translations: heroBookFormText.movingSize,
          defaultText: "Moving Size",
        })}
      </p>

      {/* Trigger */}
      <div 
      onClick={() => setOpen((p) => !p)}
      className="bg-[#F3F3F4] border-black/10 border cursor-pointer flex items-center gap-x-2.5 rounded-xl p-2.5 lg:p-5">
        <PackageMovingIcon />

        {selectedLabel ? (
          <p className="text-dark text-xs lg:text-sm">{AppTranslator.getLocaleText({locale,translations:moveTranslations[selectedLabel as any]})}</p>
        ) : (
          <p className="text-grey text-base">
            {" "}
            {AppTranslator.getLocaleText({
              locale,
              translations: heroBookFormText.movingSize,
              defaultText: "Moving Size",
            })}
          </p>
        )}

        <button
          type="button"
          className={`ml-auto transition ${open ? "rotate-180" : ""}`}
        >
          <ArrowDropDownIcon />
        </button>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-[#E5E5E5] rounded-xl shadow-lg overflow-hidden">
          {/* Tabs */}
          <header className="flex items-center border-b border-[#E5E5E5]">
            {tabs.map((tab) =>
              tab.value === currentTab ? (
                <button
                  key={tab.value}
                  className="flex-1 text-theme -mb-px mx-1 font-medium border-b border-theme p-4"
                >
                  {AppTranslator.getLocaleText({locale,translations:moveTranslations[tab.name]})}
                </button>
              ) : (
                <button
                  key={tab.value}
                  onClick={() => setCurrentTab(tab.value)}
                  className="flex-1 px-4 py-2 text-grey"
                >
                  {AppTranslator.getLocaleText({locale,translations:moveTranslations[tab.name]})}
                </button>
              ),
            )}
          </header>

          {/* Options */}
          <div className="max-h-72 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.label}
                type="button"
                onClick={() => {
                  onChange(option.label);
                  setOpen(false);
                }}
                className="p-4 border-b text-dark border-[#E5E5E5] w-full text-left last:border-0 hover:bg-gray-50"
              >
                {AppTranslator.getLocaleText({
                  locale,
                  translations:moveTranslations[option.label]
                })}

                {option.size && (
                  <span className="px-1 text-grey">({AppTranslator.getLocaleText({locale,translations:moveTranslations[option.size]})})</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function HeroBookForm() {
  const { locale } = useParams<{ locale: Locale }>();

  const router = useRouter();
  const [moveSize, setMoveSize] = useState("");
  const [moveFrom, setMoveFrom] = useState("");
  const [moveTo, setMoveTo] = useState("");

  const handleSubmit = () => {
    if (moveFrom && moveTo && moveSize) {
      router.push(
        `${locale}/book-move?moveSize=${moveSize}&moveTo=${moveTo}&moveFrom=${moveFrom}`,
      );
      return;
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-[20px]">
      <header className="p-4 lg:p-8 border-b border-black/10">
        <p className="text-dark text-lg lg:text-2xl font-medium">
          {AppTranslator.getLocaleText({
            locale,
            translations: heroBookFormText.title,
            defaultText: "Get started in seconds",
          })}
        </p>
        <p className="text-grey text-xs lg:text-sm">
          {AppTranslator.getLocaleText({
            locale,
            translations: heroBookFormText.subtitle,
          })}
        </p>
      </header>
      <div className="p-4 lg:p-8 space-y-4">
        <LocationAutocomplete
          label={AppTranslator.getLocaleText({
            locale,
            translations: heroBookFormText.movingFrom,
          })}
          theme="grey"
          onSelectPlace={(place) => {
            setMoveFrom(place.formattedAddress);
          }}
          placeholder={AppTranslator.getLocaleText({
            locale,
            translations: heroBookFormText.movingFrom,
          })}
          icon={<LocationIcon />}
        />

        <LocationAutocomplete
          theme="grey"
          onSelectPlace={(place) => {
            setMoveTo(place.formattedAddress);
          }}
          label={
            AppTranslator.getLocaleText({
              locale,
              translations: heroBookFormText.movingTo,
            }) ?? ""
          }
          placeholder={
            AppTranslator.getLocaleText({
              locale,
              translations: heroBookFormText.movingTo,
            }) ?? ""
          }
          icon={<GeoLocationIcon />}
        />

        <MovingSizeDropdown
          onChange={setMoveSize}
          value={moveSize}
          locale={locale}
          tabs={tabs}
        />
        <button
          onClick={handleSubmit}
          className="text-white bg-theme w-full h-12 lg:h-17.5 mt-8 rounded-lg lg:rounded-2xl lg:text-lg font-medium"
        >
          {AppTranslator.getLocaleText({
            locale,
            translations: heroBookFormText.continue,
          })}
        </button>
      </div>
      <div className="text-center py-4">
        <p className="text-grey text-xs lg:text-base">
          {AppTranslator.getLocaleText({
            locale,
            translations: heroBookFormText.footer,
          })}
        </p>
      </div>
    </div>
  );
}
export function HeroBookFormLg() {
  const { locale } = useParams<{ locale: Locale }>();

  const router = useRouter();
  const [moveSize, setMoveSize] = useState("");
  const [moveFrom, setMoveFrom] = useState("");
  const [moveTo, setMoveTo] = useState("");

  const handleSubmit = () => {
    if (moveFrom && moveTo && moveSize) {
      router.push(
        `${locale}/book-move?moveSize=${moveSize}&moveTo=${moveTo}&moveFrom=${moveFrom}`,
      );
      return;
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-[20px]">
      <div className="p-4 grid grid-cols-3 gap-x-4 lg:p-8 space-y-4">
        <LocationAutocomplete
          label={AppTranslator.getLocaleText({
            locale,
            translations: heroBookFormText.movingFrom,
          })}
          theme="grey"
          onSelectPlace={(place) => {
            setMoveFrom(place.formattedAddress);
          }}
          placeholder={AppTranslator.getLocaleText({
            locale,
            translations: heroBookFormText.movingFrom,
          })}
          icon={<LocationIcon />}
        />

        <LocationAutocomplete
          theme="grey"
          onSelectPlace={(place) => {
            setMoveTo(place.formattedAddress);
          }}
          label={
            AppTranslator.getLocaleText({
              locale,
              translations: heroBookFormText.movingTo,
            }) ?? ""
          }
          placeholder={
            AppTranslator.getLocaleText({
              locale,
              translations: heroBookFormText.movingTo,
            }) ?? ""
          }
          icon={<GeoLocationIcon />}
        />

        <MovingSizeDropdown
          onChange={setMoveSize}
          value={moveSize}
          locale={locale}
          tabs={tabs}
        />
       <div className="col-span-3">
          <button
          onClick={handleSubmit}
          className="text-white bg-theme w-full h-12 lg:h-17.5 mt-8 rounded-lg lg:rounded-2xl lg:text-lg font-medium"
        >
          {AppTranslator.getLocaleText({
            locale,
            translations: heroBookFormText.continue,
          })}
        </button>
       </div>
      </div>
      <div className="text-center py-4">
        <p className="text-grey text-xs lg:text-base">
          {AppTranslator.getLocaleText({
            locale,
            translations: heroBookFormText.footer,
          })}
        </p>
      </div>
    </div>
  );
}
