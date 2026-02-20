import { HexagonIcon } from "@/app/icons";

export function AppTag({title}:{title:string}) {
  return (
    <span className="bg-[#CACACA1A]/10 px-4 text-xs lg:text-sm py-1.5 lg:py-2.5 rounded-[100px] text-secondary inline-flex items-center gap-x-1.5 border border-[#B6DDA8]">
      <HexagonIcon />
      {title}
    </span>
  );
}
