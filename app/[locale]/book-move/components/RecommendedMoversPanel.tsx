"use client";

import Image from "next/image";
import { AppTranslator, Locale } from "@/app/utils";
import { useParams } from "next/navigation";
import type { RecommendedMover } from "@/types/movers";
import { MoverDetailsPanel } from "./MoverDetailsPanel";
import { MoverPaymentPanel } from "./MoverPaymentPanel";
import { useBookMoveStep1 } from "./BookMoveStep1Context";

function RatingPill({ rating }: { rating: number }) {
  return (
    <div className="absolute top-2 left-2 flex h-7 w-[54px] items-center justify-center rounded-md bg-white/75">
      <div className="flex items-center gap-x-0.5">
        <span className="text-sm leading-none text-[#FCB92E]">★</span>
        <span className="text-sm leading-none font-semibold text-[#1E1E1E]">
          {rating.toFixed(1)}
        </span>
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  return (
    <div className="flex h-5 min-h-5 shrink-0 items-center justify-center rounded-[4px] border border-[rgba(115,192,87,0.1)] bg-[rgba(115,192,87,0.1)] px-1.5">
      <span className="text-xs leading-[1.2] font-normal text-secondary">
        {status}
      </span>
    </div>
  );
}

function DividerLine() {
  return <div className="h-px w-full bg-black/10" />;
}

function TitleRow({ name, status }: { name: string; status: string }) {
  return (
    <div className="flex min-w-0 items-center justify-between gap-x-3">
      <p className="truncate text-[15px] leading-snug font-medium text-dark">
        {name}
      </p>
      <StatusPill status={status} />
    </div>
  );
}

function PriceMetaRow({ price, meta }: { price: string; meta: string }) {
  return (
    <div className="flex min-w-0 items-center gap-x-3">
      <p className="shrink-0 text-xl leading-7 font-medium text-dark">{price}</p>
      <p className="min-w-0 text-xs leading-5 font-normal text-grey">{meta}</p>
    </div>
  );
}

function MoverCard({
  mover,
  onSelect,
}: {
  mover: RecommendedMover;
  onSelect: (m: RecommendedMover) => void;
}) {
  const { name, rating, price, meta, distance, status, image } = mover;

  return (
    <button
      type="button"
      onClick={() => onSelect(mover)}
      className="flex w-full flex-col overflow-hidden rounded-[20px] border border-black/10 bg-white text-left transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative m-3 aspect-319/268 overflow-hidden rounded-[12px] bg-[#EEEDED]">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        {rating > 0 ? <RatingPill rating={rating} /> : null}
      </div>
      <div className="mt-1 px-3">
        <TitleRow name={name} status={status} />
      </div>
      <div className="mt-3">
        <DividerLine />
      </div>
      <div className="px-3 pt-3 pb-3">
        <div className="space-y-2">
          <PriceMetaRow price={price} meta={meta} />
          <p className="text-xs leading-5 font-normal text-grey">{distance}</p>
        </div>
      </div>
    </button>
  );
}

export function RecommendedMoversPanel({
  movers,
  trackingCodeOverride,
}: {
  movers: RecommendedMover[];
  trackingCodeOverride?: string;
}) {
  const { locale } = useParams<{ locale: Locale }>();
  const { subView, selectedMover, goToDetail } = useBookMoveStep1();

  if (subView === "payment" && selectedMover) {
    return (
      <MoverPaymentPanel
        mover={selectedMover}
        trackingCodeOverride={trackingCodeOverride}
      />
    );
  }

  if (subView === "detail" && selectedMover) {
    return <MoverDetailsPanel mover={selectedMover} />;
  }

  if (!movers.length) {
    return (
      <div className="rounded-2xl border border-black/10 bg-white p-6 text-center text-sm text-grey">
        {AppTranslator.getLocaleText({
          locale,
          translations: {
            en: "No mover quotes are available for this tracking code yet.",
            nl: "Er zijn nog geen offertes van verhuizers voor deze trackingcode.",
          },
        })}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-dark sm:text-base">
          {AppTranslator.getLocaleText({
            locale,
            translations: { en: "Showing", nl: "Toont" },
          })}{" "}
          <span className="text-grey">{movers.length}</span>{" "}
          <span className="text-grey">
            {AppTranslator.getLocaleText({
              locale,
              translations: {
                en: "quotes from movers",
                nl: "offertes van verhuizers",
              },
            })}
          </span>
        </p>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {movers.map((mover) => (
          <MoverCard key={mover.id} mover={mover} onSelect={goToDetail} />
        ))}
      </div>
    </div>
  );
}
