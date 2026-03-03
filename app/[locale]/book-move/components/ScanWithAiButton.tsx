/* eslint-disable @next/next/no-img-element */
"use client";
import {
  CancelCircleIcon,
  CheckedDocument,
  ImageIcon2,
  TickIcon,
} from "@/app/icons";
import { Portal } from "@/components";
import { inventories } from "@/hooks";
import { MoveItem, MoveRequestProvider } from "@/services/MoveRequest";
import { Info, LoaderCircle, Search, X } from "lucide-react";
import { ChangeEventHandler, useEffect, useMemo, useState } from "react";
import { InventoryItem } from "./InventoryItem";
import { AppTranslator, Locale } from "@/app/utils";
import { useParams } from "next/navigation";

function RoomInventoryCard({
  roomName,
  setDraftItems,
  draftItems,
}: {
  roomName: string;
  draftItems: MoveItem[];
  setDraftItems: (items: MoveItem[]) => void;
}) {
  const [inventoryQuery, setInventoryQuery] = useState("");
  const filteredInventoryItems = useMemo(() => {
    return inventories.filter((item) =>
      item.name.toLowerCase().includes(inventoryQuery.trim().toLowerCase()),
    );
  }, [inventoryQuery]);

  return (
    <>
      <header className="space-y-2 lg:space-y-0 lg:flex p-4 lg:p-8 items-center">
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
              <p className="text-theme font-bold text-2xl">
                No Inventory Found
              </p>
              <p>Please clear your search and try again</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function RoomUploadCard({
  roomName,
  roomFile,
  setRoomFile,
  error,
  clearError,
  loading = false,
  items = [],
}: {
  roomName: string;
  roomFile: File | null;
  setRoomFile: (file: File) => void;
  error?: string;
  clearError?: () => void;
  loading?: boolean;
  items: MoveItem[];
}) {
  const [errorMessage, setErrorMessage] = useState("");

  const handleClearError = () => {
    setErrorMessage("");
    clearError?.();
  };

  const SelectedBadge = (
    <div className="px-4 py-2 rounded-full inline-block text-sm bg-theme/10 text-theme">
      {items.length} Items Selected
    </div>
  );

  const Dot = <span className="inline-block h-1 w-1 bg-grey rounded-full" />;

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

  const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "webp"];

  const handleUploadRoomFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // ---- Extension check ----
    const extension = file.name.split(".").pop()?.toLowerCase();

    if (!extension || !ALLOWED_EXTENSIONS.includes(extension)) {
      setErrorMessage("Only JPG, JPEG, PNG, and WEBP images are allowed.");
      e.target.value = "";
      return;
    }

    // ---- MIME type check ----
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Invalid image file.");
      e.target.value = "";
      return;
    }

    // ---- File size check ----
    if (file.size > MAX_FILE_SIZE) {
      setErrorMessage("Image must be 2MB or smaller.");
      e.target.value = "";
      return;
    }

    // ✅ Passed validation
    setRoomFile(file);
    setErrorMessage("");
  };

  const preview = useMemo(() => {
    if (!roomFile) return;
    const url = URL.createObjectURL(roomFile);
    return url;
  }, [roomFile]);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className="p-4 lg:p-8 bg-[#F7F9F7] rounded-xl border border-[#E5E5E5]">
      {(error || errorMessage) && (
        <div className="flex mb-4 max-w-125 items-center my-1 gap-x-4 p-2 py-4 text-red-400 text-xs lg:text-sm bg-red-100 rounded-lg">
          <Info size={16} />
          <p>{errorMessage || error}</p>
          <button onClick={handleClearError} className="ml-auto">
            <X size={16} />
          </button>
        </div>
      )}
      <header className="flex items-center justify-between">
        <p className="text-sm lg:text-base">{roomName}</p>
        {loading && (
          <LoaderCircle className="animate-spin text-theme" strokeWidth={1} />
        )}
      </header>
      <label
        htmlFor={`${roomName.replace(/\s+/g, "_")}image`}
        className="bg-white group text-theme relative cursor-pointer mt-4 border border-dashed border-[#E5E5E5] space-y-4 rounded-xl h-50 flex items-center justify-center p-2"
      >
        <div className="flex-1 max-w-[80%] lg:max-w-[60%] text-center">
          <p className="text-sm lg:text-lg text-grey">Drop a File</p>
          <div className="flex items-center gap-x-2 justify-center">
            <div className="flex-1 w-full h-px bg-grey" />
            <p className="text-xs lg:text-sm text-dark">or</p>
            <div className="flex-1 w-full h-px bg-grey" />
          </div>
          <span className="w-full text-sm lg:text-base inline-flex items-center justify-center mt-6 bg-[#FEFEFE] border h-10 lg:h-12 px-4 rounded-lg border-[#E5E5E5] text-dark">
            Browse Files
          </span>
        </div>
        {preview && (
          <>
            <img
              className="w-full rounded-xl object-cover object-center h-full absolute top-0 left-0"
              src={preview}
              alt={roomName}
            />
            <div className="bg-black/50 transition-all duration-500 ease-in-out opacity-0 -z-1 group-hover:opacity-100 group-hover:z-auto w-full h-full rounded-xl absolute top-0 flex items-center justify-center p-4 left-0">
              <button className="bg-theme text-white rounded-xl px-3 text-sm lg:text-base lg:px-4 py-2">
                Change
              </button>
            </div>
          </>
        )}
      </label>
      <input
        accept="image/png,image/jpeg,image/jpg,image/webp"
        onChange={handleUploadRoomFile}
        type="file"
        className="max-w-0 opacity-0"
        id={`${roomName.replace(/\s+/g, "_")}image`}
      />
      {items.length > 0 && (
        <div className="text-center space-y-2">
          {SelectedBadge}
          <div className="flex flex-wrap gap-3 justify-center items-center">
            {items.map((item, index) => (
              <div
                key={`${roomName}-${item.itemName}-${index}`}
                className="flex items-center gap-x-1 text-grey text-sm font-medium"
              >
                <p>{item.itemName}</p>
                {index < items.length - 1 && Dot}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface RoomSetup {
  roomName: string;
  roomFile: File | null;
  error?: string;
  loading: boolean;
}

export function ScanWithAiButton({
  rooms,
  handleUpdateMoveItems,
  moveItems,
  tab = "image",
}: {
  rooms: string[];
  moveItems: MoveItem[];
  handleUpdateMoveItems: (items: MoveItem[]) => void;
  tab?: string;
}) {
  const {locale} = useParams<{locale:Locale}>()
  const [draftItems, setDraftItems] = useState<MoveItem[]>([]);
  const [draftItemsFromInventory, setDraftItemsFromInventory] = useState<
    MoveItem[]
  >([]);
  const [roomsSetup, setRoomSetup] = useState<RoomSetup[]>(() =>
    rooms.map(
      (item) =>
        ({
          roomName: item,
          roomFile: null,
          loading: false,
        }) as RoomSetup,
    ),
  );
  const [open, setOpen] = useState(false);
  const [uploadSuccessOpen, setSuccessUploadOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState(tab);

  const setRoomFile = (roomName: string, roomFile: File) => {
    setRoomSetup((prev) =>
      prev.map((item) => {
        if (item.roomName == roomName) {
          return {
            ...item,
            roomFile,
          };
        }
        return item;
      }),
    );
  };

  const updateRoomSetup = (roomName: string, setup: Partial<RoomSetup>) => {
    setRoomSetup((prev) =>
      prev.map((item) => {
        if (item.roomName == roomName) {
          return {
            ...item,
            ...setup,
          };
        }
        return item;
      }),
    );
  };

  const handleGenerateItems = async () => {

    let successCount = 0;

    const tasks = roomsSetup
    .filter(room=>room.roomFile)
    .map(async (room) => {
      if (!room.roomFile) return;

      updateRoomSetup(room.roomName, {
        loading: true,
        error: undefined,
      });

      try {
        const formData = new FormData();
        formData.append("images", room.roomFile);

        const res = await MoveRequestProvider.getItemsByImage(
          formData,
          room.roomName,
        );

        if (!res.result?.length) {
          throw new Error("No item could be generated from your image");
        }

        setDraftItems((prev) => [
          ...prev.filter((i) => i.room !== room.roomName),
          ...res.result,
        ]);

        updateRoomSetup(room.roomName, {
          roomFile: null,
          error: undefined,
        });
        successCount++
      } catch (error) {
        updateRoomSetup(room.roomName, {
          error:
            (error as Error)?.message ??
            "An error occurred, could not generate items",
        });
      } finally {
        updateRoomSetup(room.roomName, {
          loading: false,
        });
      }
    });

    await Promise.all(tasks);
    if(tasks.length == successCount){
        setSuccessUploadOpen(true)
    }
  };

  const handleSubmit = () => {
    handleUpdateMoveItems(draftItemsFromInventory);
    setOpen(false);
  };
  const handleSubmitUploads = () => {
    handleUpdateMoveItems([...moveItems, ...draftItems]);
    setOpen(false);
  };

  useEffect(() => {
    setDraftItemsFromInventory(moveItems);
  }, [moveItems]);

  const isLoading = useMemo(
    () => roomsSetup.some((item) => item.loading),
    [roomsSetup],
  );

  useEffect(() => {
    if (!open) {
      setCurrentTab("image");
    }
  }, [open]);

  const SelectedBadge = (
    <div className="px-3 lg:px-4 py-2 rounded-full inline-block text-xs lg:text-sm bg-theme/10 text-theme">
      {draftItems.length} Items Selected
    </div>
  );

  const Dot = <span className="inline-block h-1 w-1 bg-grey rounded-full" />;

  return (
    <>
      {open && (
        <Portal>
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-white/20 overflow-auto backdrop-blur z-100000"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white max-w-280 mx-auto lg:mt-[10%] shadow rounded-lg"
            >
              {/* Header */}
              <header className="flex items-center bg-white sticky z-20 lg:static top-0 border-b p-4 lg:p-8 border-black/10">
                {currentTab == "inventory" ? (
                  <p className="font-medium text-base lg:text-2xl">Add Items</p>
                ) : (
                  <p className="font-medium text-base lg:text-2xl">
                    Upload Image{" "}
                    <span className="text-grey">For Image Recognition</span>
                  </p>
                )}
                <button className="ml-auto" onClick={() => setOpen(false)}>
                  <CancelCircleIcon className="lg:inline-block hidden" />
                  <CancelCircleIcon className="lg:hidden" height={24} width={24}/>
                </button>
              </header>
              <header className="border-b border-black/10 flex items-center px-4 lg:px-8">
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
                  className={`${currentTab == "image" ? "text-theme border-b border-theme" : "text-grey"} p-2.5 lg:p-4 flex text-xs lg:text-base items-center justify-center gap-x-1`}
                >
                  <ImageIcon2 width={24} height={24} />
                  <span>Upload Image</span>
                </button>
              </header>
              {currentTab == "inventory" ? (
                <>
                  {rooms.map((item) => {
                    return (
                      <RoomInventoryCard
                        draftItems={draftItemsFromInventory}
                        setDraftItems={setDraftItemsFromInventory}
                        key={item}
                        roomName={item}
                      />
                    );
                  })}
                  <footer className="border-t bg-white sticky bottom-0 lg:static border-black/10 flex items-center p-4 lg:p-8">
                    <div className="px-3 lg:px-6 py-2 text-xs lg:text-base lg:py-3 rounded-full bg-theme/10 text-theme">
                      {draftItemsFromInventory.length} Items Selected
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
                  <div className="p-4 space-y-4 lg:space-y-0 lg:p-8 lg:grid grid-cols-3 gap-8">
                    {roomsSetup.map((room) => {
                      return (
                        <RoomUploadCard
                          roomFile={room.roomFile}
                          error={room.error}
                          key={room.roomName}
                          loading={room.loading}
                          roomName={room.roomName}
                          items={draftItems.filter(
                            (item) => item.room == room.roomName,
                          )}
                          setRoomFile={(file) =>
                            setRoomFile(room.roomName, file)
                          }
                        />
                      );
                    })}
                  </div>
                  <footer className="border-t sticky bottom-0 bg-white lg:static border-black/10 flex items-center p-4 lg:p-8">
                    <div className="px-3 lg:px-6 py-2 text-xs lg:text-base lg:py-3 rounded-full bg-theme/10 text-theme">
                      {draftItems.length} Items Selected
                    </div>

                    <button
                      onClick={handleGenerateItems}
                      disabled={isLoading}
                      className="ml-auto disabled:opacity-70 text-xs lg:text-sm bg-theme flex items-center gap-x-3 rounded-xl text-white px-4 lg:px-8 py-2 lg:py-4"
                    >
                      {isLoading && <LoaderCircle className="animate-spin" />}
                      Upload Image
                    </button>
                  </footer>
                </>
              )}
            </div>
          </div>
          {uploadSuccessOpen &&(
            <div className="bg-white/10 p-4 backdrop-blur  overflow-auto h-full w-full fixed left-0 z-1000000 top-0">
            <div className="bg-white flex-1 max-w-130 mx-auto mt-[7%] rounded-2xl  border border-black/10">
              <div className="p-4 lg:p-8 text-center">
                <div className="bg-secondary/10 flex items-center justify-center mx-auto  h-12 w-12 rounded-full">
                  <TickIcon />
                </div>
                <p className="font-bold lg:text-2xl">
                  Image Recognition Successful
                </p>
                <p className="text-grey text-sm lg:text-xs">
                  Inventory list successfully generated
                </p>
                <div className="border my-4 border-black/10 rounded-lg p-4">
                  {draftItems.length > 0 && (
                    <div className="text-center space-y-4">
                      {SelectedBadge}
                      <div className="flex flex-wrap gap-3 justify-center items-center">
                        {draftItems.map((item, index) => (
                          <div
                            key={`${item.room}-${item.itemName}-${index}`}
                            className="flex items-center gap-x-1 text-grey text-xs lg:text-sm font-medium"
                          >
                            <p>{item.itemName}</p>
                            {index < draftItems.length - 1 && Dot}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <footer className="border-t border-black/10 flex items-center p-4">
                <button
                  onClick={() => {
                    setSuccessUploadOpen(false)
                  }}
                  className="py-3 rounded-lg bg-white px-4 lg:px-8 text-xs lg:text-sm gap-x-1 border border-[#E5E5E5] flex items-center"
                >
                  <span>Go Back</span>
                </button>
                <button
                  onClick={handleSubmitUploads}
                  className="bg-theme flex gap-x-2 items-center ml-auto text-xs lg:text-sm px-4 lg:px-8 py-3 lg:py-4 rounded-lg text-white"
                >
                  Continue
                </button>
              </footer>
            </div>
          </div>
          )}
        </Portal>
      )}
      <button
        onClick={() => setOpen(true)}
        className="bg-theme py-2.5 text-xs lg:text-sm lg:py-4 px-6 lg:px-8 font-medium rounded-2xl text-white"
      >
        {AppTranslator.getLocaleText({
          locale,
          translations:{
            nl:"Gebruik AI-herkenning",
            en:"Scan with AI"
          }
        })}
      </button>
    </>
  );
}
