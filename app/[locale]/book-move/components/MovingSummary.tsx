/* eslint-disable react-hooks/purity */
"use client";
import { LocationIcon, Star } from "@/app/icons";
import { LocationAutocomplete } from "./LocationDetailsForm";
import { useCallback, useMemo } from "react";
import { CreateMoveRequest, MoveItem } from "@/services/MoveRequest";
import { Place } from "@/services";
import { DateTime } from "luxon";
import { AppTranslator, Locale } from "@/app/utils";
import { useParams } from "next/navigation";

export default function StarrySpace() {
  const stars = useMemo(() => {
    return Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 14 + 6,
      rotate: Math.random() * 360,
      opacity: Math.random() * 0.6 + 0.3,
    }));
  }, []);

  return (
    <div className="bg-secondary text-white h-30 rounded-t-2xl relative overflow-hidden">
      {stars.map((star) => (
        <span
          key={star.id}
          className="absolute cursor-pointer flex items-center justify-center"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            transform: `rotate(${star.rotate}deg)`,
          }}
          onClick={() => console.log("Star clicked:", star.id)}
        >
          <Star fill="currentColor" className="w-full h-full" />
        </span>
      ))}
    </div>
  );
}

export function MovingSummary({
  formData,
  moveFrom,
  moveTo,
  moveSize,
  moveItems,
}: {
  formData: CreateMoveRequest;
  moveFrom?: Place | null;
  moveTo?: Place | null;
  moveSize: string;
  moveItems: MoveItem[];
}) {
  const getMoveItemCountByRoom = useCallback(
    (room: string) => {
      return moveItems.filter((item) => item.room == room).length;
    },
    [moveItems],
  );

  const { locale } = useParams<{ locale: Locale }>();

  return (
    <>
      <section>
        <p className="text-lg lg:text-2xl font-medium">
          {AppTranslator.getLocaleText({
            locale,
            translations: {
              en: "Move Summary ",
              nl: "Overzicht bekijken",
            },
          })}
        </p>
        <div className="mt-8">
          <div className="flex items-center gap-x-4 lg:gap-x-8">
            <div className="mt-8">
              <div className="border border-secondary rounded-full h-8 lg:h-12 w-8 lg:w-12 bg-secondary/10 flex items-center justify-center">
                <div className="bg-secondary h-2.5 w-2.5 lg:h-4 lg:w-4 rounded-full"></div>
              </div>
            </div>
            <div className="flex-1">
              <LocationAutocomplete
                label={AppTranslator.getLocaleText({
                  locale,
                  translations: {
                    en: "Moving From",
                    nl: "Verhuizen vanaf",
                  },
                })}
                selectedPlace={moveFrom}
                placeholder={""}
                readOnly
                icon={<LocationIcon />}
              />
            </div>
          </div>
          <div className="h-18 lg:h-20 -mt-2 lg:-mt-2.75 -mb-9.5 lg:-mb-10.75 -z-1 w-px bg-secondary ml-4 lg:ml-6"></div>
          <div className="flex items-center gap-x-4 lg:gap-x-8">
            <div className="mt-8">
              <div className="border border-secondary rounded-full h-8 lg:h-12 w-8 lg:w-12 bg-secondary/10 flex items-center justify-center">
                <div className="bg-secondary h-2.5 w-2.5 lg:h-4 lg:w-4 rounded-full"></div>
              </div>
            </div>
            <div className="flex-1">
              <LocationAutocomplete
                label={AppTranslator.getLocaleText({
                  locale,
                  translations: {
                    en: "Moving To",
                    nl: "Verhuizen naar",
                  },
                })}
                selectedPlace={moveTo}
                readOnly
                placeholder={""}
                icon={<LocationIcon />}
              />
            </div>
          </div>

          <div className="space-y-4 lg;space-y-0 lg:grid grid-cols-2 mt-12 gap-x-8 gap-y-6">
            <div className="space-y-3 max-w-130">
              <p className="text-dark text-sm lg:text-base">
                {AppTranslator.getLocaleText({
                  locale,
                  translations: {
                    en: "Moving Size",
                    nl: "Verhuisinformatie:",
                  },
                })}
              </p>
              <div className="bg-white border border-black/10 gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center">
                <input
                  readOnly
                  value={moveSize}
                  className="text-grey w-full placeholder:text-grey text-xs outline-0  lg:text-sm"
                />
              </div>
            </div>
            <div className="space-y-3 max-w-130">
              <p className="text-dark text-sm lg:text-base">Living Room</p>
              <div className="bg-white border border-black/10 gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center">
                <input
                  readOnly
                  value={`${getMoveItemCountByRoom("Living Room")} Items Selected`}
                  className="text-grey w-full placeholder:text-grey text-xs outline-0  lg:text-sm"
                />
              </div>
            </div>
            <div className="space-y-3 max-w-130">
              <p className="text-dark text-sm lg:text-base">Kitchen </p>
              <div className="bg-white border border-black/10 gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center">
                <input
                  readOnly
                  value={`${getMoveItemCountByRoom("Kitchen")} Items Selected`}
                  className="text-grey w-full placeholder:text-grey text-xs outline-0  lg:text-sm"
                />
              </div>
            </div>
            <div className="space-y-3 max-w-130">
              <p className="text-dark text-sm lg:text-base">Dining Room</p>
              <div className="bg-white border border-black/10 gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center">
                <input
                  readOnly
                  value={`${getMoveItemCountByRoom("Dining Room")} Items Selected`}
                  className="text-grey w-full placeholder:text-grey text-xs outline-0  lg:text-sm"
                />
              </div>
            </div>
            <div className="space-y-3 max-w-130">
              <p className="text-dark text-sm lg:text-base">{moveSize}</p>
              <div className="bg-white border border-black/10 gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center">
                <input
                  readOnly
                  value={`${getMoveItemCountByRoom(moveSize)} Items Selected`}
                  className="text-grey w-full placeholder:text-grey text-xs outline-0  lg:text-sm"
                />
              </div>
            </div>
            <div className="space-y-3 max-w-130">
              <p className="text-dark text-sm lg:text-base">
                {AppTranslator.getLocaleText({
                  locale,
                  translations: {
                    en: "Move Date",
                    nl: "Verhuisdatum:",
                  },
                })}
              </p>
              <div className="bg-white border border-black/10 gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center">
                <input
                  readOnly
                  value={DateTime.fromJSDate(new Date(formData.moveDate))
                    .setLocale(locale)
                    .toFormat("LLLL dd, yyyy")}
                  className="text-grey w-full placeholder:text-grey text-xs outline-0  lg:text-sm"
                />
              </div>
            </div>
            <div className="space-y-3 max-w-130">
              <p className="text-dark text-sm lg:text-base">
                {AppTranslator.getLocaleText({
                  locale,
                  translations: {
                    en: "Movers Phone",
                    nl: "Telefoonnummer:",
                  },
                })}
              </p>
              <div className="bg-white border border-black/10 gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center">
                <input
                  readOnly
                  value={formData.phoneNumber}
                  className="text-grey w-full placeholder:text-grey text-xs outline-0  lg:text-sm"
                />
              </div>
            </div>
            <div className="space-y-3 max-w-130">
              <p className="text-dark text-sm lg:text-base">  {AppTranslator.getLocaleText({
                  locale,
                  translations: {
                    en: "Movers Email",
                    nl: "E-mailadres:",
                  },
                })}</p>
              <div className="bg-white border border-black/10 gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center">
                <input
                  readOnly
                  value={formData.email}
                  className="text-grey w-full placeholder:text-grey text-xs outline-0  lg:text-sm"
                />
              </div>
            </div>
            <div className="space-y-3 max-w-130">
              <p className="text-dark text-sm lg:text-base">  {AppTranslator.getLocaleText({
                  locale,
                  translations: {
                    en: "Province Id",
                    nl: "Provinciecode",
                  },
                })}</p>
              <div className="bg-white border border-black/10 gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center">
                <input
                  readOnly
                  value={formData.provinceId}
                  className="text-grey w-full placeholder:text-grey text-xs outline-0  lg:text-sm"
                />
              </div>
            </div>
            <div className="space-y-3 col-span-2">
              <p className="text-dark text-sm lg:text-base">{
                AppTranslator.getLocaleText({
                  locale,
                  translations:{
                    en:"Address",
                    nl:"Adres"
                  }
                })}</p>
              <div className="bg-white border border-black/10 gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center">
                <input
                  readOnly
                  value={moveFrom?.formattedAddress}
                  className="text-grey w-full placeholder:text-grey text-xs outline-0  lg:text-sm"
                  placeholder="Address "
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
