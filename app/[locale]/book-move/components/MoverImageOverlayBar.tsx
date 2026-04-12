"use client";

export function MoverImageOverlayBar({
  name,
  rating,
  status,
  variant = "card",
}: {
  name: string;
  rating: number;
  status: string;
  variant?: "card" | "hero";
}) {
  const isHero = variant === "hero";

  return (
    <div
      className={`absolute top-3 left-3 z-10 inline-flex max-w-[min(calc(100%-1.5rem),22rem)] items-center gap-2 rounded-xl border border-white/20 bg-black/45 backdrop-blur-md ${
        isHero ? "px-3 py-2" : "px-2 py-1.5"
      }`}
    >
      <div
        className={`flex shrink-0 items-center gap-0.5 rounded-md bg-white/18 ${
          isHero ? "px-2 py-1" : "px-1.5 py-0.5"
        }`}
      >
        <span
          className={isHero ? "text-[#FCB92E] text-sm" : "text-[#FCB92E] text-xs"}
        >
          ★
        </span>
        <span
          className={`font-semibold text-white ${
            isHero ? "text-sm" : "text-xs"
          }`}
        >
          {rating.toFixed(1)}
        </span>
      </div>
      <p
        className={`max-w-28 min-w-0 shrink truncate font-medium text-white sm:max-w-44 ${
          isHero ? "text-sm" : "text-xs"
        }`}
      >
        {name}
      </p>
      <div
        className={`shrink-0 rounded-md bg-secondary/30 ${
          isHero ? "px-2 py-1" : "px-1.5 py-0.5"
        }`}
      >
        <span
          className={`whitespace-nowrap font-medium text-secondary ${
            isHero ? "text-xs" : "text-[10px]"
          }`}
        >
          {status}
        </span>
      </div>
    </div>
  );
}
