import { ReactNode } from "react";
import { AppTag } from "./AppTag";

interface HeaderProps{
    tag:string,
    title:ReactNode,
    description:ReactNode

}

export function SectionHeader({tag,title,description}:HeaderProps) {
  return (
    <header className="text-center max-w-157.75 mx-auto">
      <AppTag title={tag} />
      <div className="mt-6 space-y-4">
        <div className="font-bold text-2xl lg:text-5xl">
          {title}
        </div>
        <div className="text-grey text-center text-sm lg:text-lg">
          {description}
        </div>
      </div>
    </header>
  );
}
