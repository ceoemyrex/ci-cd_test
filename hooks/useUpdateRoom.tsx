import { MoveItem, MoveRequestProvider } from "@/services/MoveRequest";
import { useState, ChangeEventHandler, useMemo, useEffect } from "react";

export const inventories = [
  {
    name: "Glass Lounge Table",
    image: "/inventories/glass-table.png",
    categories: [
      "Living Room",
      "Few items",
      "Studio",
      "1 Bedroom",
      "2 Bedroom",
    ],
  },
  {
    name: "Arm Chair",
    image: "/inventories/arm-chair.png",
    categories: [
      "Living Room",
      "Dining Room",
      "Few items",
      "Studio",
      "1 Bedroom",
      "2 Bedroom",
      "3 Bedroom",
    ],
  },
  {
    name: "Picture / Painting",
    image: "/inventories/painting.jpg",
    categories: [
      "Living Room",
      "Dining Room",
      "Bedroom",
      "Few items",
      "Studio",
      "1 Bedroom",
      "2 Bedroom",
      "3 Bedroom",
      "4 Bedroom",
    ],
  },
  {
    name: "Mirror",
    image: "/inventories/mirror.png",
    categories: [
      "Living Room",
      "Bedroom",
      "Studio",
      "1 Bedroom",
      "2 Bedroom",
      "3 Bedroom",
    ],
  },
  {
    name: "Book Case",
    image: "/inventories/book-case.png",
    categories: [
      "Living Room",
      "Bedroom",
      "1 Bedroom",
      "2 Bedroom",
      "3 Bedroom",
    ],
  },
  {
    name: "Elegant Floor Lamp",
    image: "/inventories/lamp.png",
    categories: [
      "Living Room",
      "Studio",
      "1 Bedroom",
      "2 Bedroom",
      "3 Bedroom",
    ],
  },
  {
    name: "Sectional Sofa",
    image: "/inventories/sofa.png",
    categories: [
      "Living Room",
      "Studio",
      "1 Bedroom",
      "2 Bedroom",
      "3 Bedroom",
      "4 Bedroom",
      "5 Bedroom",
      "6 Bedroom",
    ],
  },
  {
    name: "TV Stand",
    image: "/inventories/tv-stand.png",
    categories: [
      "Living Room",
      "Studio",
      "1 Bedroom",
      "2 Bedroom",
      "3 Bedroom",
    ],
  },
  {
    name: "TV",
    image: "/inventories/tv.png",
    categories: [
      "Living Room",
      "Bedroom",
      "Few items",
      "Studio",
      "1 Bedroom",
      "2 Bedroom",
      "3 Bedroom",
      "4 Bedroom",
      "5 Bedroom",
      "6 Bedroom",
    ],
  },
  {
    name: "Bed(all parts included)",
    image: "/inventories/full-bed.png",
    categories: [
      "Bedroom",
      "1 Bedroom",
      "2 Bedroom",
      "3 Bedroom",
      "4 Bedroom",
      "5 Bedroom",
      "6 Bedroom",
    ],
  },
  {
    name: "Mattress",
    image: "/inventories/mattress.png",
    categories: [
      "Bedroom",
      "Studio",
      "1 Bedroom",
      "2 Bedroom",
      "3 Bedroom",
      "4 Bedroom",
    ],
  },
  {
    name: "Night Stand",
    image: "/inventories/nightstand.png",
    categories: [
      "Bedroom",
      "1 Bedroom",
      "2 Bedroom",
      "3 Bedroom",
    ],
  },
  {
    name: "Dresser",
    image: "/inventories/dresser.png",
    categories: [
      "Bedroom",
      "1 Bedroom",
      "2 Bedroom",
      "3 Bedroom",
      "4 Bedroom",
    ],
  },
  {
    name: "Dining Table",
    image: "/inventories/dining-table.png",
    categories: [
      "Dining Room",
      "2 Bedroom",
      "3 Bedroom",
      "4 Bedroom",
      "5 Bedroom",
      "6 Bedroom",
    ],
  },
  {
    name: "Dining Chairs",
    image: "/inventories/dining-chairs.png",
    categories: [
      "Dining Room",
      "2 Bedroom",
      "3 Bedroom",
      "4 Bedroom",
      "5 Bedroom",
      "6 Bedroom",
    ],
  },
  {
    name: "China Cabinet",
    image: "/inventories/china-cabinet.png",
    categories: [
      "Dining Room",
      "3 Bedroom",
      "4 Bedroom",
      "5 Bedroom",
      "6 Bedroom",
    ],
  },
  {
    name: "Refrigerator",
    image: "/inventories/fridge.png",
    categories: [
      "Kitchen",
      "Studio",
      "1 Bedroom",
      "2 Bedroom",
      "3 Bedroom",
      "4 Bedroom",
    ],
  },
  {
    name: "Microwave Oven",
    image: "/inventories/microwave-oven.png",
    categories: [
      "Kitchen",
      "Few items",
      "Studio",
      "1 Bedroom",
      "2 Bedroom",
    ],
  },
  {
    name: "Toaster",
    image: "/inventories/toaster.png",
    categories: ["Kitchen", "Few items", "Studio", "1 Bedroom"],
  },
  {
    name: "Blender",
    image: "/inventories/blender.png",
    categories: ["Kitchen", "Few items", "Studio", "1 Bedroom"],
  },
  {
    name: "Washer",
    image: "/inventories/washer.png",
    categories: [
      "Kitchen",
      "2 Bedroom",
      "3 Bedroom",
      "4 Bedroom",
      "5 Bedroom",
    ],
  },
  {
    name: "Electric Broom",
    image: "/inventories/electric-broom.png",
    categories: ["Kitchen", "Few items", "Studio"],
  },
];

export function useUpdateRoom({
  roomName,
  moveItems,
  handleUpdateMoveItems,
}: {
  roomName: string;
  moveItems: MoveItem[];
  handleUpdateMoveItems: (items: MoveItem[]) => void;
}) {
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

  return {
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
  };
}
