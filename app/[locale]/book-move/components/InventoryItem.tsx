/* eslint-disable @next/next/no-img-element */
import { AppTranslator, Locale } from "@/app/utils";
import { MoveItem } from "@/services/MoveRequest";
import { inventoryTranslations } from "@/translations";
import { useParams } from "next/navigation";

/* -------------------- InventoryItem -------------------- */
export function InventoryItem({
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
  const {locale} = useParams<{locale:Locale}>()
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
      <div className="h-35 lg:h-50 flex items-center justify-center rounded-t-xl">
        {imgUrl && (
          <img src={imgUrl} alt={name} className="h-20 lg:h-30 w-20 lg:w-30 object-contain" />
        )}
      </div>

      <div className="bg-white p-4 rounded-b-xl flex items-center">
        <p className="text-xs lg:text-sm">{AppTranslator.getLocaleText({locale,translations:inventoryTranslations[name]})}</p>

        <div className="flex items-center ml-auto gap-x-4 text-sm">
          <button
            onClick={removeItem}
            className="h-8 w-8 rounded-lg flex items-center justify-center bg-[#F1F9EF] border border-[#E5E5E5]"
          >
            -
          </button>

          <p className="text-xs lg:text-sm">{quantity}</p>

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