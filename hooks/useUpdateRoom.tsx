import { MoveItem, MoveRequestProvider } from "@/services/MoveRequest";
import { useState, ChangeEventHandler, useMemo, useEffect } from "react";

// Define inventories once at the top
export const inventories = [
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


export function useUpdateRoom({roomName,moveItems,handleUpdateMoveItems}:{
  roomName: string;
  moveItems: MoveItem[];
  handleUpdateMoveItems: (items: MoveItem[]) => void;
}){
  const [open, setOpen] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("inventory");
  const [draftItems, setDraftItems] = useState<MoveItem[]>([]);
  const [inventoryQuery, setInventoryQuery] = useState("");
  const [roomFile, setRoomFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
    if (roomFile) return URL.createObjectURL(roomFile);
  }, [roomFile]);

  const itemsInRoom = useMemo(() => {
    return moveItems.filter((item) => item.room === roomName);
  }, [moveItems, roomName]);

  // Sync items when modal opens
  useEffect(() => {
    if (!open) return;
    setDraftItems(itemsInRoom);
  }, [open, itemsInRoom]);

  const handleSubmit = () => {
    const otherRooms = moveItems.filter((item) => item.room !== roomName);
    handleUpdateMoveItems([...otherRooms, ...draftItems]);
    setOpen(false);
  };

  const selectedCount = moveItems.filter(
    (item) => item.room === roomName,
  ).length;

  const filteredInventoryItems = useMemo(() => {
    return inventories.filter((item) =>
      item.name.toLowerCase().includes(inventoryQuery.trim().toLowerCase()),
    );
  }, [inventoryQuery]);

  const handleUploadImage = async () => {
    setLoading(true);
    try {
      if (!roomFile) {
        throw new Error("Please select an image");
      }

      const formData = new FormData();

      formData.append("images", new Blob([roomFile]));

      const res = await MoveRequestProvider.getItemsByImage(formData, roomName);
      if (!res.result.length) {
        throw new Error(
          "An error occurred could not generate any items from images, Please check your image quality or try again later",
        );
      }
      handleUpdateMoveItems(res.result);
      setOpen(false);
    } catch (error) {
      const errMessage =
        (error as Error)?.message ??
        "An error occurred could not generate items";
      setErrorMessage(errMessage);
    } finally {
      setLoading(false);
    }
  };

  return{
    open,
    handleUploadImage,
    selectedCount,
    filteredInventoryItems,
    inventoryQuery,
    setInventoryQuery,
    handleSubmit,
    preview,
    handleUploadRoomFile,
    errorMessage,
    setErrorMessage,
    listOpen,
    setListOpen,
    loading,
    currentTab,
    setOpen,
    draftItems,
    setDraftItems,
    itemsInRoom,
    setCurrentTab,
  }
}