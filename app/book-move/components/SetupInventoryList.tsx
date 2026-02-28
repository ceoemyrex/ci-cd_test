/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
"use client";

import { ArrowDropDownIcon, PlusIcon } from "@/app/icons";
import { Portal } from "@/components";
import { MoveItem } from "@/services/MoveRequest";
import { useEffect, useState } from "react";

/* -------------------- InventoryItem -------------------- */
function InventoryItem({
  name,
  imgUrl = "",
  moveItems,
  roomName,
  handleUpdateMoveItems,
}: {
  name: string;
  roomName: string;
  imgUrl?: string;
  moveItems: MoveItem[];
  handleUpdateMoveItems: (items: MoveItem[]) => void;
}) {
  const quantity = moveItems.filter((item) => item.itemName === name).length;

  const addItem = () => {
    handleUpdateMoveItems([
      ...moveItems,
      {
        itemName: name,
        room: roomName,
        numberOfItems: 1,
      },
    ]);
  };

  const removeItem = () => {
    const index = moveItems.findLastIndex((item) => item.itemName === name);
    if (index === -1) return;

    const updated = moveItems.filter((_, i) => i !== index);
    handleUpdateMoveItems(updated);
  };

  return (
    <div className="rounded-xl bg-[#F7F9F7] border border-[#E5E5E5]">
      <div className="h-50 flex items-center justify-center rounded-t-xl">
        {imgUrl && (
          <img src={imgUrl} alt={name} className="h-30 w-30 object-contain" />
        )}
      </div>

      <div className="bg-white p-4 rounded-b-xl flex items-center">
        <p className="text-sm">{name}</p>

        <div className="flex items-center ml-auto gap-x-4 text-sm">
          <button
            onClick={removeItem}
            className="h-8 w-8 rounded-lg flex items-center justify-center bg-[#F1F9EF] border border-[#E5E5E5]"
          >
            -
          </button>

          <p>{quantity}</p>

          <button
            onClick={addItem}
            className="h-8 w-8 rounded-lg flex items-center justify-center bg-[#F1F9EF] border border-[#E5E5E5]"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

// Define inventories once at the top
const inventories = [
  { name: "Glass Lounge Table", image: "/inventories/glass-table.png" },
  { name: "Arm Chair", image: "/inventories/arm-chair.png" },
  { name: "Picture / Painting", image: "/inventories/painting.jpg" },
  { name: "Mirror", image: "/inventories/mirror.png" },
  { name: "Book Case", image: "/inventories/book-case.png" },
  { name: "Center Table", image: "/inventories/center-table.png" },
  { name: "Elegant Floor Lamp", image: "/inventories/lamp.png" },
  { name: "Sectional Sofa", image: "/inventories/sofa.png" },
  { name: "TV Stand", image: "/inventories/tv-stand.png" },
  { name: "TV", image: "/inventories/tv.png" },
];

/* -------------------- RoomItem -------------------- */
function RoomItem({
  roomName,
  moveItems,
  handleUpdateMoveItems,
}: {
  roomName: string;
  moveItems: MoveItem[];
  handleUpdateMoveItems: (items: MoveItem[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const [draftItems, setDraftItems] = useState<MoveItem[]>([]);

  // Sync items when modal opens
  useEffect(() => {
    if (!open) return;
    const itemsInRoom = moveItems.filter((item) => item.room === roomName);
    setDraftItems(itemsInRoom);
  }, [open, moveItems, roomName]);

  const handleSubmit = () => {
    const otherRooms = moveItems.filter((item) => item.room !== roomName);
    handleUpdateMoveItems([...otherRooms, ...draftItems]);
    setOpen(false);
  };

  const selectedCount = moveItems.filter(
    (item) => item.room === roomName,
  ).length;

  return (
    <>
      {open && (
        <Portal>
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-white/20 overflow-auto backdrop-blur z-1000000"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white max-w-280 mx-auto mt-[10%] shadow rounded-lg"
            >
              {/* Header */}
              <header className="flex items-center border-b p-8 border-black/10">
                <p className="font-medium text-2xl">Add Items</p>
              </header>

              {/* Inventory Grid */}
              <div className="p-8 grid grid-cols-3 gap-8">
                {inventories.map((item) => (
                  <InventoryItem
                    key={item.name}
                    name={item.name}
                    imgUrl={item.image}
                    roomName={roomName}
                    moveItems={draftItems}
                    handleUpdateMoveItems={setDraftItems}
                  />
                ))}
              </div>

              {/* Footer */}
              <footer className="border-t border-black/10 flex items-center p-8">
                <div className="px-6 py-3 rounded-full bg-theme/10 text-theme">
                  {draftItems.length} Items Selected
                </div>

                <button
                  onClick={handleSubmit}
                  className="ml-auto bg-theme rounded-xl text-white px-8 py-4"
                >
                  Add Items
                </button>
              </footer>
            </div>
          </div>
        </Portal>
      )}

      {/* Room List Item */}
      <li className="bg-white border border-black/10 p-4 rounded-lg flex items-center">
        <p className="text-lg">{roomName}</p>

        <div className="ml-4 px-4 py-2 rounded-full bg-theme/10 text-theme">
          {selectedCount} Items Selected
        </div>

        <button
          onClick={() => setOpen(true)}
          className="ml-auto border border-black/10 rounded-full px-4 py-2 flex items-center gap-x-2"
        >
          <PlusIcon />
          Add Items
        </button>

        <ArrowDropDownIcon />
      </li>
    </>
  );
}

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
  return (
    <div>
      {/* Header */}
      <header className="flex items-center justify-between">
        <p className="text-2xl font-medium">
          Add items to your (<span className="text-grey">{moveSize}</span>)
        </p>
        <button className="bg-white border flex items-center rounded-xl px-10 py-4 border-[#E5E5E5]">
          <PlusIcon />
          <span>Additional Room</span>
        </button>
      </header>

      {/* Image Recognition Section */}
      <div className="mt-12 rounded-2xl bg-white relative p-16 min-h-75 overflow-clip">
        <img
          src="/images/stats-image-3.jpg"
          className="absolute left-0 top-0 w-full h-full object-cover"
          alt=""
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>
        <div className="max-w-140 p-10 mx-auto rounded-2xl bg-white/66 backdrop-blur">
          <div className="h-12 w-12 rounded-full bg-[#F1F9EF] mx-auto"></div>
          <div className="text-center mt-3 space-y-2">
            <p className="text-2xl font-medium">Image Recognition</p>
            <p className="text-base">
              Take photos of each room and let the AI create a personalized
              checklist for your move or relocation
            </p>
          </div>
          <div className="mt-8 text-center">
            <button className="bg-theme py-4 px-8 font-medium text-sm rounded-2xl text-white">
              Scan With AI
            </button>
          </div>
        </div>
        <p className="p-4 text-lg font-medium text-center">
          Secure & Confidential
        </p>
      </div>

      {/* Room List */}
      <ul className="mt-6 space-y-6">
        <RoomItem
          moveItems={moveItems}
          handleUpdateMoveItems={handleUpdateMoveItems}
          roomName={moveSize}
        />
        <RoomItem
          moveItems={moveItems}
          handleUpdateMoveItems={handleUpdateMoveItems}
          roomName={"Living Room"}
        />
        <RoomItem
          moveItems={moveItems}
          handleUpdateMoveItems={handleUpdateMoveItems}
          roomName={"Dinning Room"}
        />
        <RoomItem
          moveItems={moveItems}
          handleUpdateMoveItems={handleUpdateMoveItems}
          roomName={"Kitchen"}
        />
      </ul>
    </div>
  );
}
