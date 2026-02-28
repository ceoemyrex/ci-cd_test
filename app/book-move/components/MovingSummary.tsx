/* eslint-disable react-hooks/purity */
"use client";
import { LocationIcon, Star } from "@/app/icons";
import { LocationAutocomplete } from "./LocationDetailsForm";
import { useCallback, useMemo } from "react";
import { CreateMoveRequest, MoveItem } from "@/services/MoveRequest";
import { Place } from "@/services";

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
  moveSize:string,
  moveItems:MoveItem[]
}) {

  const getMoveItemCountByRoom = useCallback((room:string)=>{
    return moveItems.map(item=>item.room == room).length;
  },[moveItems])

  return (
    <>
      <section>
        <p className="text-2xl font-medium">Location Details</p>
        <div className="mt-8">
          <div className="flex items-center gap-x-8">
            <div className="mt-8">
              <div className="border border-secondary rounded-full h-12 w-12 bg-secondary/10 flex items-center justify-center">
                <div className="bg-secondary h-4 w-4 rounded-full"></div>
              </div>
            </div>
            <div className="flex-1">
              <LocationAutocomplete
                label={"Moving From"}
                selectedPlace={moveFrom}
                placeholder={""}
                readOnly
                icon={<LocationIcon />}
              />
            </div>
          </div>
          <div className="h-20 -mt-2.75 -mb-10.75 -z-1 w-px bg-secondary ml-6"></div>
          <div className="flex items-center gap-x-8">
            <div className="mt-8">
              <div className="border border-secondary rounded-full h-12 w-12 bg-secondary/10 flex items-center justify-center">
                <div className="bg-secondary h-4 w-4 rounded-full"></div>
              </div>
            </div>
            <div className="flex-1">
              <LocationAutocomplete
                label={"Moving to"}
                selectedPlace={moveTo}
                readOnly
                placeholder={""}
                icon={<LocationIcon />}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 mt-12 gap-x-8 gap-y-6">
            <div className="space-y-3 max-w-130">
              <p className="text-dark text-sm lg:text-base">Move Size</p>
              <div className="bg-white border border-black/10 gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center">
                <input
                  readOnly
                  value={moveSize}
                  className="text-grey placeholder:text-grey text-xs outline-0  lg:text-sm"
                  placeholder="Remarks for the location "
                />
              </div>
            </div>
            <div className="space-y-3 max-w-130">
              <p className="text-dark text-sm lg:text-base">Living Room</p>
              <div className="bg-white border border-black/10 gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center">
                <input
                  readOnly
                  value={"O Items Selected"}
                  className="text-grey placeholder:text-grey text-xs outline-0  lg:text-sm"
                  placeholder="Remarks for the location "
                />
              </div>
            </div>
            <div className="space-y-3 max-w-130">
              <p className="text-dark text-sm lg:text-base">Toilet and Bath</p>
              <div className="bg-white border border-black/10 gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center">
                <input
                  readOnly
                  value={`${getMoveItemCountByRoom("Toilet")} Items Selected`}
                  className="text-grey placeholder:text-grey text-xs outline-0  lg:text-sm"
                  placeholder="Remarks for the location "
                />
              </div>
            </div>
            <div className="space-y-3 max-w-130">
              <p className="text-dark text-sm lg:text-base">Kitchen </p>
              <div className="bg-white border border-black/10 gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center">
                <input
                  readOnly
                 value={`${getMoveItemCountByRoom("Kitchen")} Items Selected`}
                  className="text-grey placeholder:text-grey text-xs outline-0  lg:text-sm"
                  placeholder="Remarks for the location "
                />
              </div>
            </div>
            <div className="space-y-3 max-w-130">
              <p className="text-dark text-sm lg:text-base">Dining Room</p>
              <div className="bg-white border border-black/10 gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center">
                <input
                  readOnly
                  value={`${getMoveItemCountByRoom("Dining Room")} Items Selected`}
                  className="text-grey placeholder:text-grey text-xs outline-0  lg:text-sm"
                  placeholder="Remarks for the location "
                />
              </div>
            </div>
            <div className="space-y-3 max-w-130">
              <p className="text-dark text-sm lg:text-base">Bed Room</p>
              <div className="bg-white border border-black/10 gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center">
                <input
                  readOnly
                  value={`${getMoveItemCountByRoom("Bedroom")} Items Selected`}
                  className="text-grey placeholder:text-grey text-xs outline-0  lg:text-sm"
                  placeholder="Remarks for the location "
                />
              </div>
            </div>
            <div className="space-y-3 max-w-130">
              <p className="text-dark text-sm lg:text-base">Move Date</p>
              <div className="bg-white border border-black/10 gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center">
                <input
                  readOnly
                  value={formData.moveDate}
                  className="text-grey placeholder:text-grey text-xs outline-0  lg:text-sm"
                  placeholder="Remarks for the location "
                />
              </div>
            </div>
            <div className="space-y-3 max-w-130">
              <p className="text-dark text-sm lg:text-base">Day</p>
              <div className="bg-white border border-black/10 gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center">
                <input
                  readOnly
                  value={formData.moveDate}
                  className="text-grey placeholder:text-grey text-xs outline-0  lg:text-sm"
                  placeholder="Remarks for the location "
                />
              </div>
            </div>
            <div className="space-y-3 max-w-130">
              <p className="text-dark text-sm lg:text-base">Movers Phone</p>
              <div className="bg-white border border-black/10 gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center">
                <input
                  readOnly
                  value={formData.phoneNumber}
                  className="text-grey placeholder:text-grey text-xs outline-0  lg:text-sm"
                  placeholder="Remarks for the location "
                />
              </div>
            </div>
            <div className="space-y-3 max-w-130">
              <p className="text-dark text-sm lg:text-base">Movers Email</p>
              <div className="bg-white border border-black/10 gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center">
                <input
                  readOnly
                  value={formData.email}
                  className="text-grey placeholder:text-grey text-xs outline-0  lg:text-sm"
                  placeholder="Remarks for the location "
                />
              </div>
            </div>
            <div className="space-y-3 col-span-2">
              <p className="text-dark text-sm lg:text-base">Address</p>
              <div className="bg-white border border-black/10 gap-x-2.5 rounded-xl p-2.5 lg:p-5 flex items-center">
                <input
                  readOnly
                  value={moveFrom?.formattedAddress}
                  className="text-grey placeholder:text-grey text-xs outline-0  lg:text-sm"
                  placeholder="Remarks for the location "
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
