/* eslint-disable @next/next/no-img-element */
"use client";

import {
  ArrowDropDownIcon,
  CancelCircleIcon,
  CheckedDocument,
  ImageIcon2,
  PlusIcon,
} from "@/app/icons";
import { Portal } from "@/components";
import { MoveItem } from "@/services/MoveRequest";
import { Info, LoaderCircle, Search, X } from "lucide-react";
import { ReactNode } from "react";
import { InventoryItem } from "./InventoryItem";
import { useUpdateRoom } from "@/hooks";

/* -------------------- RoomItem -------------------- */
export function RoomItem({
  roomName,
  moveItems,
  handleUpdateMoveItems,
  icon,
}: {
  roomName: string;
  moveItems: MoveItem[];
  handleUpdateMoveItems: (items: MoveItem[]) => void;
  icon: ReactNode;
}) {
  const {
    open,
    setOpen,
    draftItems,
    setDraftItems,
    handleUploadImage,
    selectedCount,
    filteredInventoryItems,
    inventoryQuery,
    setInventoryQuery,
    handleSubmit,
    preview,
    handleUploadRoomFile,
    errorMessage,
    itemsInRoom,
    setErrorMessage,
    listOpen,
    setListOpen,
    loading,
    currentTab,
    setCurrentTab,
  } = useUpdateRoom({
    roomName,
    moveItems,
    handleUpdateMoveItems,
  });

  const SelectedBadge = (
    <div className="px-3 lg:px-4 py-1.5 lg:py-2 rounded-full inline text-xs lg:text-sm bg-theme/10 text-theme">
      {selectedCount} Items Selected
    </div>
  );

  const Dot = <span className="inline-block h-1 w-1 bg-grey rounded-full" />;

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
              className="bg-white max-w-280 mx-auto lg:mt-[10%] shadow rounded-lg"
            >
              {/* Header */}
              <header className="flex items-center z-100 bg-white sticky top top-0  lg:static border-b p-4 lg:p-8 border-black/10">
                {currentTab == "inventory" ? (
                  <p className="font-medium lg:text-2xl">Add Items</p>
                ) : (
                  <p className="font-medium lg:text-2xl">
                    Upload Image{" "}
                    <span className="text-grey">For Image Recognition</span>
                  </p>
                )}
                <button className="ml-auto" onClick={() => setOpen(false)}>
                  <CancelCircleIcon className="lg:inline-block hidden" />
                  <CancelCircleIcon
                    className="lg:hidden"
                    height={24}
                    width={24}
                  />
                </button>
              </header>
              <header className="border-b border-black/10 flex items-center pt-4 justify-center">
                <button
                  onClick={() => {
                    setCurrentTab("inventory");
                  }}
                  className={`${currentTab == "inventory" ? "text-theme border-b border-theme" : "text-grey"} text-xs lg:text-base p-2.5 lg:p-4 flex items-center gap-x-1`}
                >
                  <CheckedDocument width={24} height={24} />
                  <span>Inventory List</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentTab("image");
                  }}
                  className={`${currentTab == "image" ? "text-theme border-b border-theme" : "text-grey"} text-xs lg:text-base p-2.5 lg:p-4 flex items-center gap-x-1`}
                >
                  <ImageIcon2 width={24} height={24} />
                  <span>Upload Image</span>
                </button>
              </header>
              {currentTab == "inventory" ? (
                <>
                  <header className="lg:flex p-4 space-y-2 lg:space-y-0 lg:p-8 items-center">
                    <p className="flex-1 text-sm lg:text-base">{roomName}</p>
                    <div className="flex-1">
                      <div className="bg-[#F5F6F8] max-w-100 ml-auto text-xs lg:text-base gap-x-2 p-2 px-4 flex items-center rounded-xl justify-center">
                        <Search className="text-grey" />
                        <input
                          value={inventoryQuery}
                          onChange={(e) => setInventoryQuery(e.target.value)}
                          type="text"
                          placeholder="Search items here"
                          className="w-full lg:py-2 outline-0 placeholder:text-grey"
                        />
                      </div>
                    </div>
                  </header>
                  {/* Inventory Grid */}
                  <div className="p-4 space-y-4 lg:space-y-0 lg:p-8 lg:grid grid-cols-3 gap-8">
                    {filteredInventoryItems.length ? (
                      filteredInventoryItems
                      .filter(item=>item.categories.includes(roomName))
                      .map((item) => (
                        <InventoryItem
                          key={item.name}
                          name={item.name}
                          imgUrl={item.image}
                          roomName={roomName}
                          moveItems={draftItems}
                          handleUpdateMoveItems={setDraftItems}
                        />
                      ))
                    ) : (
                      <div className="col-span-3">
                        <div className="text-center max-w-150px mx-auto py-10">
                          <p className="text-theme font-bold lg:text-2xl">
                            No Inventory Found
                          </p>
                          <p>Please clear your search and try again</p>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Footer */}
                  <footer className="border-t sticky lg:static bottom-0 bg-white border-black/10 flex items-center p-4 lg:p-8">
                    <div className="px-3 lg:px-6 py-2 text-xs lg:text-base lg:py-3 rounded-full bg-theme/10 text-theme">
                      {draftItems.length} Items Selected
                    </div>

                    <button
                      onClick={handleSubmit}
                      className="ml-auto disabled:opacity-70 text-xs lg:text-sm bg-theme flex items-center gap-x-3 rounded-xl text-white px-4 lg:px-8 py-2 lg:py-4"
                    >
                      Add Items
                    </button>
                  </footer>
                </>
              ) : (
                <>
                  <div className="p-4 lg:p-8">
                    <div className="flex items-center gap-x-4 p-4 text-theme text-sm bg-theme/10 rounded-lg">
                      <Info />
                      <p className="text-xs lg:text-base">
                        The images should be of a very good quality, file Size
                        should not be more than 2MB.
                      </p>
                    </div>
                  </div>
                  {errorMessage && (
                    <div className="flex mx-4 lg:mx-8 max-w-125 items-center my-1 gap-x-4 p-4 text-red-400 text-xs lg:text-sm bg-red-100 rounded-lg">
                      <Info />
                      <p>{errorMessage}</p>
                      <button
                        onClick={() => setErrorMessage("")}
                        className="ml-auto text-sm lg:text-base"
                      >
                        <X />
                      </button>
                    </div>
                  )}
                  <div className="p-4 lg:p-8 space-y-4 lg:space-y-0 lg:grid grid-cols-3 gap-8">
                    <div className="p-4 lg:p-8 bg-[#F7F9F7] rounded-xl border border-[#E5E5E5]">
                      <p className="text-sm lg:text-base">{roomName}</p>
                      <label
                        htmlFor={`${roomName.replace(/\ \+/g, "_")}image`}
                        className="bg-white cursor-pointer mt-4 relative border border-dashed border-[#E5E5E5] space-y-4 rounded-xl h-50 flex items-center justify-center p-2"
                      >
                        <div className="flex-1 max-w-[80%] lg:max-w-[60%] text-center">
                          <p className="lg:not-[]:text-lg text-grey">
                            Drop a File
                          </p>
                          <div className="flex items-center gap-x-2 justify-center">
                            <div className="flex-1 w-full h-px bg-grey" />
                            <p className="text-xs lg:text-sm text-dark">or</p>
                            <div className="flex-1 w-full h-px bg-grey" />
                          </div>
                          <span className="w-full text-sm lg:text-base inline-flex items-center justify-center mt-6 bg-[#FEFEFE] border h-10 lg:h-12 px-2 lg:px-4 rounded-lg border-[#E5E5E5] text-dark">
                            Browse Files
                          </span>
                        </div>
                        {preview && (
                          <img
                            className="w-full rounded-xl object-cover object-center h-full absolute top-0 left-0"
                            src={preview}
                            alt={roomName}
                          />
                        )}
                      </label>
                      <input
                        onChange={handleUploadRoomFile}
                        type="file"
                        className="max-w-0 opacity-0"
                        id={`${roomName.replace(/\ \+/g, "_")}image`}
                      />
                    </div>
                  </div>
                  {/* Footer */}
                  <footer className="border-t sticky bottom-0 lg:static bg-white border-black/10 flex items-center p-4 lg:p-8">
                    <div className="px-3 lg:px-6 py-2 text-xs lg:text-base lg:py-3 rounded-full bg-theme/10 text-theme">
                      {draftItems.length} Items Selected
                    </div>

                    <button
                      disabled={loading}
                      onClick={handleUploadImage}
                      className="ml-auto disabled:opacity-70 text-xs lg:text-sm bg-theme flex items-center gap-x-3 rounded-xl text-white px-4 lg:px-8 py-2 lg:py-4"
                    >
                      {loading && <LoaderCircle className="animate-spin" />}
                      Upload Image
                    </button>
                  </footer>
                </>
              )}
            </div>
          </div>
        </Portal>
      )}

      <li className="bg-white border border-black/10 rounded-lg overflow-hidden">
        <header className="lg:flex items-center p-3 lg:p-4 gap-x-3 lg:gap-x-5 border-b border-black/10">
          <div className="lg:hidden mb-4 flex items-center justify-between">
            {SelectedBadge}
            <button
              type="button"
              onClick={() => setListOpen((p) => !p)}
              className={`transition-transform duration-200 ${
                listOpen ? "rotate-180" : ""
              } lg:hidden ml-auto`}
            >
              <ArrowDropDownIcon />
            </button>
          </div>
          <div>
            <div className="flex items-center gap-x-3">
              <div className="h-10 w-10 flex items-center justify-center rounded-full text-secondary bg-secondary/10">
                {icon}
              </div>
              <p className="text-sm lg:text-lg">{roomName}</p>
            </div>
          </div>

          <div className="hidden lg:block">{!listOpen && SelectedBadge}</div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="ml-auto  w-full lg:w-auto mt-4 lg:mt-0 justify-center border border-black/10 text-xs lg:text-base rounded-full px-4 py-1 lg:py-2 flex items-center gap-x-2"
          >
            <PlusIcon />
            Add Items
          </button>

          <button
            type="button"
            onClick={() => setListOpen((p) => !p)}
            className={`transition-transform duration-200 ${
              listOpen ? "rotate-180" : ""
            } hidden lg:inline-block`}
          >
            <ArrowDropDownIcon />
          </button>
        </header>

        <div
          className={`transition-all duration-700 ease-in-out ${listOpen ? "max-h-screen overflow-auto" : "max-h-0 overflow-hidden"}`}
        >
          <div className="p-4">
            <div className="flex flex-wrap gap-4 items-center justify-center lg:justify-normal">
              {SelectedBadge}
              {itemsInRoom.length === 0 ? (
                <p className="text-xs lg:text-sm text-grey">
                  No items added yet.
                </p>
              ) : (
                itemsInRoom.map((item, index) => (
                  <div
                    key={`${roomName}-${item.itemName}-${index}`}
                    className="flex items-center gap-x-1 text-grey text-[10px] leading-normal lg:text-sm font-medium"
                  >
                    <p>{item.itemName}</p>
                    {index < itemsInRoom.length - 1 && Dot}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </li>
    </>
  );
}
