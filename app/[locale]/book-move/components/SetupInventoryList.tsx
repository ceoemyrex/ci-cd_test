/* eslint-disable @next/next/no-img-element */
"use client";

import {
  DiningTableIcon,
  ImageIcon,
  KitchenUtensilsIcon,
  PlusIcon,
} from "@/app/icons";
import { MoveItem } from "@/services/MoveRequest";
import { BedDoubleIcon, Sofa } from "lucide-react";
import { RoomItem } from "./RoomItem";
import { ScanWithAiButton } from "./ScanWithAiButton";
import { AppTranslator, Locale } from "@/app/utils";
import { useParams } from "next/navigation";

/* -------------------- SetupInventoryListForm -------------------- */
export function SetupInventoryListForm({
  moveItems,
  handleUpdateMoveItems,
  moveSize,
}: {
  moveItems: MoveItem[];
  handleUpdateMoveItems: (items: MoveItem[]) => void;
  moveSize: string;
}) {

  const {locale} = useParams<{locale:Locale}>()
  return (
    <div className="mt-4 lg:mt-0">
      {/* Header */}
      <header className="lg:flex items-center justify-between">
        <p className="lg:text-2xl font-medium">
          {AppTranslator.getLocaleText({
            locale,
            translations:{
              en:"Add items to your",
              nl:"Spullen toevoegen"
            }
          })} (<span className="text-grey">{moveSize}</span>)
        </p>
        <button className="bg-white border text-sm lg:text-base flex items-center rounded-xl px-5 lg:py-4 lg:px-10 py-2 border-[#E5E5E5]">
          <PlusIcon />
          <span>{AppTranslator.getLocaleText({
            locale,
            translations:{
              en:"Additonal Room",
              nl:"Kamer toevoegen"
            }
          })} </span>
        </button>
      </header>

      {/* Image Recognition Section */}
      <div className="rounded-2xl bg-white">
        <div className="mt-8 lg:mt-12 rounded-t-2xl bg-white relative p-4 lg:p-16 min-h-75 overflow-clip">
          <img
            src="/images/stats-image-3.jpg"
            className="absolute left-0 top-0 w-full h-full object-cover"
            alt=""
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>
          <div className="max-w-140 p-4 lg:p-10 mx-auto rounded-2xl bg-white/66 backdrop-blur">
            <div className="h-12 w-12 flex items-center justify-center rounded-full bg-[#F1F9EF] mx-auto">
              <ImageIcon />
            </div>
            <div className="text-center mt-3 space-y-2">
              <p className="text-lg lg:text-2xl font-medium">{
                AppTranslator.getLocaleText({
                  locale,
                  translations:{
                    en:"Image Recognition",
                    nl:"AI-herkenning"
                  }
                })
                }</p>
              <p className="text-xs lg:text-base">
                 {AppTranslator.getLocaleText({
                  locale,
                  translations:{
                    en:"Take photos of each room and let the AI create a personalized checklist for your move or relocation",
                    nl:"Maak foto’s van beide kamers en onze AI-herkenning doet de rest."
                  }
                })
                }
                
              </p>
            </div>
            <div className="mt-4 lg:mt-8 text-center">
              <ScanWithAiButton
                rooms={[
                  moveSize,
                  "Living Room",
                  "Dining Room",
                  "Kitchen",
                ]}
                moveItems={moveItems}
                handleUpdateMoveItems={handleUpdateMoveItems}
              />
            </div>
          </div>
        </div>
        <p className="p-4 text-sm lg:text-lg font-medium text-center">
          {AppTranslator.getLocaleText({
            locale,
            translations:{
              nl:"Veilig en vetrouwd",
              en:"Secure & Confidential"
            }
          })}
        </p>
      </div>

      {/* Room List */}
      <ul className="mt-6 space-y-6">
        <RoomItem
          icon={<BedDoubleIcon strokeWidth={1} />}
          moveItems={moveItems}
          handleUpdateMoveItems={handleUpdateMoveItems}
          roomName={moveSize}
        />
        <RoomItem
          icon={<Sofa strokeWidth={1} />}
          moveItems={moveItems}
          handleUpdateMoveItems={handleUpdateMoveItems}
          roomName={"Living Room"}
        />
        <RoomItem
          icon={<DiningTableIcon />}
          moveItems={moveItems}
          handleUpdateMoveItems={handleUpdateMoveItems}
          roomName={"Dining Room"}
        />
        <RoomItem
          icon={<KitchenUtensilsIcon />}
          moveItems={moveItems}
          handleUpdateMoveItems={handleUpdateMoveItems}
          roomName={"Kitchen"}
        />
      </ul>
    </div>
  );
}
