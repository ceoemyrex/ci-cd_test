"use client";

import Image from "next/image";
import type { RecommendedMover } from "@/types/movers";
import { MoverImageOverlayBar } from "./MoverImageOverlayBar";
import { MoverRoutePriceCard } from "./MoverRoutePriceCard";

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 py-1 text-left">
      <p className="text-xs text-grey">{label}</p>
      <p className="mt-1 text-sm font-medium text-dark">{value}</p>
    </div>
  );
}

function InventorySectionDivider() {
  return <div className="my-6 w-full border-t border-black/10" />;
}

function SummaryCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-black/10 p-5 shadow-sm lg:p-6 ${className}`}
    >
      {children}
    </div>
  );
}

export function MoverDetailsPanel({ mover }: { mover: RecommendedMover }) {
  const d = mover.details;

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
        <div className="relative aspect-16/6 min-h-[180px] bg-[#EEEDED]">
          <Image
            src={mover.image}
            alt={mover.name}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 60vw, 100vw"
          />
          <div className="absolute inset-0 bg-black/10" />
          <MoverImageOverlayBar
            variant="hero"
            name={mover.name}
            rating={mover.rating}
            status={mover.status}
          />
        </div>

        <div className="p-4 lg:p-6">
          <MoverRoutePriceCard
            fromLabel={mover.fromLabel}
            fromAddress={mover.fromAddress}
            toLabel={mover.toLabel}
            toAddress={mover.toAddress}
            distance={mover.distance}
            price={mover.price}
            meta={mover.meta}
          />

          <div className="mt-6 space-y-4">
            <SummaryCard className="bg-[#F5F6F8]">
              <div className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-3">
                <DetailField label={d.moveSizeLabel} value={d.moveSizeValue} />
                <DetailField
                  label={d.livingRoomLabel}
                  value={d.livingRoomValue}
                />
                <DetailField label={d.bedroom1Label} value={d.bedroom1Value} />
              </div>
              <InventorySectionDivider />
              <div className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-3">
                <DetailField label={d.bedroom2Label} value={d.bedroom2Value} />
                <DetailField
                  label={d.diningRoomLabel}
                  value={d.diningRoomValue}
                />
                <DetailField label={d.kitchenLabel} value={d.kitchenValue} />
              </div>
            </SummaryCard>

            <SummaryCard className="bg-white">
              <div className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-3">
                <DetailField label={d.moveDateLabel} value={d.moveDateValue} />
                <DetailField label={d.dayLabel} value={d.dayValue} />
                <DetailField label={d.moveTimeLabel} value={d.moveTimeValue} />
              </div>
            </SummaryCard>

            <SummaryCard className="bg-white">
              <div className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-3">
                <DetailField
                  label={d.moversPhoneLabel}
                  value={d.moversPhoneValue}
                />
                <DetailField
                  label={d.moversEmailLabel}
                  value={d.moversEmailValue}
                />
                <DetailField label={d.addressLabel} value={d.addressValue} />
              </div>
            </SummaryCard>
          </div>
        </div>
      </div>
    </div>
  );
}
