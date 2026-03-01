/* eslint-disable @next/next/no-img-element */
"use client";
import { Navbar } from "@/components";
import {
  ArrowDropDownIcon,
  CheckBoxIcon,
  GeoLocationIcon,
  HexagonIcon,
  LocationIcon,
} from "../icons";
import { StatsSwiper } from "./StatsSwiper";
import { PackageMovingIcon } from "../icons/package";
import { LocationAutocomplete, tabs } from "../book-move/components";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  value?: string;
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

export function MovingSizeDropdown({ value, onChange, tabs }: Props) {
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
      <p className="text-dark">Moving Size</p>

      {/* Trigger */}
      <div className="bg-[#F3F3F4] border-black/10 border flex items-center gap-x-2.5 rounded-xl p-2.5 lg:p-5">
        <PackageMovingIcon />

        {selectedLabel ? (
          <p className="text-dark text-xs lg:text-sm">{selectedLabel}</p>
        ) : (
          <p className="text-grey text-xs lg:text-sm">Moving Size</p>
        )}

        <button
          type="button"
          onClick={() => setOpen((p) => !p)}
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
                  {tab.name}
                </button>
              ) : (
                <button
                  key={tab.value}
                  onClick={() => setCurrentTab(tab.value)}
                  className="flex-1 px-4 py-2 text-grey"
                >
                  {tab.name}
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
                {option.label}

                {option.size && (
                  <span className="px-1 text-grey">({option.size})</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function Hero() {

  const router = useRouter()
  const [moveSize,setMoveSize] = useState("")
  const [moveFrom,setMoveFrom] = useState("")
  const [moveTo,setMoveTo] = useState("")

  const handleSubmit = ()=>{
    if(moveFrom && moveTo && moveSize){
      router.push(`/book-move?moveSize=${moveSize}&moveTo=${moveTo}&moveFrom=${moveFrom}`)
    }
  }

  return (
    <section className={``}>
      <div className="relative pb-15 lg:pb-30">
        <img
          src={"/hero-bg.png"}
          alt="hero-bg"
          className="absolute lg:rounded-t-4xl top-0 left-0 w-full h-full object-center object-cover"
        />
        <div className="relative max-w-310 2xl:max-w-350 mx-auto p-4 lg:py-10">
          <Navbar />
          <div className="pt-22 lg:pt-36.25 lg:flex space-y-8 gap-x-8 items-center">
            <div className="space-y-4 flex-2">
              <div className="text-center lg:text-left">
                <span className="bg-[#CACACA1A]/10 px-4 text-xs lg:text-sm py-1.5 lg:py-2.5 rounded-[100px] text-secondary inline-flex items-center gap-x-1.5 border border-[#B6DDA8]">
                  <HexagonIcon />
                  Best & Trusted Place
                </span>
              </div>
              <p className="font-bold text-dark text-center lg:text-left text-3xl lg:text-5xl leading-[120%]">
                Move coordination starts with a 
                <span className="text-secondary">Clear Inventory.</span>
              </p>
              <p className="text-center text-sm lg:text-left lg:text-base text-grey">
                Zinter helps you plan and coordinate your move by creating a
                clear inventory first. Upload photos using AI or build a manual
                list whichever works best for you.
              </p>

              <div className="my-4 lg:my-1 space-y-2 text-sm lg:text-base">
                <div className="flex items-center gap-x-3">
                  <CheckBoxIcon />
                  <p className="text-grey">
                    Create inventory your way AI or manual
                  </p>
                </div>
                <div className="flex items-center gap-x-3">
                  <CheckBoxIcon />
                  <p className="text-grey">Coordinate with confidence</p>
                </div>
                <div className="flex items-center gap-x-3">
                  <CheckBoxIcon />
                  <p className="text-grey">
                    Get clear pricing without surprises
                  </p>
                </div>
              </div>
            </div>
            <div className="flex-2">
              <div className="bg-white shadow-xl rounded-[20px]">
                <header className="p-4 lg:p-8 border-b border-black/10">
                  <p className="text-dark text-lg lg:text-2xl font-medium">
                    Get started in seconds
                  </p>
                  <p className="text-grey text-xs lg:text-sm">
                    Create a clear inventory first, then coordinate the move
                    details.
                  </p>
                </header>
                <div className="p-4 lg:p-8 space-y-4">
                  <LocationAutocomplete
                    label={"Moving From"}
                    theme="grey"
                    onSelectPlace={(place)=>{
                      setMoveFrom(place.formattedAddress)
                    }}
                    placeholder={"Moving From"}
                    icon={<LocationIcon />}
                  />

                  <LocationAutocomplete
                    label={"Moving To"}
                    theme="grey"
                    onSelectPlace={(place)=>{
                      setMoveTo(place.formattedAddress)
                    }}
                    placeholder={"Moving To"}
                    icon={<GeoLocationIcon />}
                  />

                  <MovingSizeDropdown
                    onChange={setMoveSize}
                    value={moveSize}
                    tabs={tabs}
                  />
                  <button
                  onClick={handleSubmit}
                  className="text-white bg-theme w-full h-12 lg:h-17.5 mt-8 rounded-lg lg:rounded-2xl lg:text-lg font-medium">
                    Continue
                  </button>
                </div>
                <div className="text-center py-4">
                  <p className="text-grey text-xs lg:text-base">
                    No calls. No spam. Just clear next steps.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <StatsSwiper />
      </div>
    </section>
  );
}
