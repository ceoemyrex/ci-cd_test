"use client";

import Image from "next/image";
import { AppTranslator, Locale } from "@/app/utils";
import { useParams } from "next/navigation";
import type { BookMoveBookingDetails, RecommendedMover } from "@/types/movers";
import { MoverDetailsPanel } from "./MoverDetailsPanel";
import { MoverPaymentPanel } from "./MoverPaymentPanel";
import { useBookMoveStep1 } from "./BookMoveStep1Context";

const moverCatalog = [
  {
    id: "independent-movers",
    name: "Independent Movers",
    rating: 4.2,
    priceAmount: 921,
    meta: "Pickup & delivery included",
    distance: "22 miles away",
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=900&q=70",
    moversPhoneValue: "09876897689",
    moversEmailValue: "support@independentmovers.nl",
  },
  {
    id: "urban-logistics",
    name: "Urban Logistics",
    rating: 4.2,
    priceAmount: 822,
    meta: "Pickup & delivery included",
    distance: "24 miles away",
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1617854818583-09e7f077a156?auto=format&fit=crop&w=900&q=70",
    moversPhoneValue: "09000000000",
    moversEmailValue: "support@urbanlogistics.nl",
  },
  {
    id: "mature-movers",
    name: "Mature Movers",
    rating: 4.2,
    priceAmount: 711,
    meta: "Pickup & delivery included",
    distance: "18 miles away",
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16?auto=format&fit=crop&w=900&q=70",
    moversPhoneValue: "09111111111",
    moversEmailValue: "support@maturemovers.nl",
  },
  {
    id: "swiftmove-logistics",
    name: "SwiftMove Logistics",
    rating: 4.2,
    priceAmount: 628,
    meta: "Pickup & delivery included",
    distance: "16 miles away",
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1600411019533-9b1b7b0b0c2d?auto=format&fit=crop&w=900&q=70",
    moversPhoneValue: "09222222222",
    moversEmailValue: "support@swiftmove.nl",
  },
  {
    id: "sure-transport",
    name: "Sure Transport",
    rating: 4.2,
    priceAmount: 300,
    meta: "Pickup & delivery included",
    distance: "13 miles away",
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1605733160332-5f0b98f6633b?auto=format&fit=crop&w=900&q=70",
    moversPhoneValue: "09333333333",
    moversEmailValue: "support@suretransport.nl",
  },
  {
    id: "elite-haulers",
    name: "Elite Haulers",
    rating: 4.2,
    priceAmount: 122,
    meta: "Pickup & delivery included",
    distance: "9 miles away",
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=900&q=70",
    moversPhoneValue: "09444444444",
    moversEmailValue: "support@elitehaulers.nl",
  },
];

function formatPrice(amount: number) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function buildMovers(booking: BookMoveBookingDetails): RecommendedMover[] {
  return moverCatalog.map((mover, index) => ({
    id: mover.id,
    name: mover.name,
    rating: mover.rating,
    price: formatPrice(mover.priceAmount),
    priceAmount: mover.priceAmount,
    meta: mover.meta,
    distance: mover.distance,
    status: mover.status,
    image: mover.image,
    fromLabel: "From",
    fromAddress: booking.fromAddress,
    toLabel: "To",
    toAddress: booking.toAddress,
    details: {
      moveSizeLabel: "Move Size",
      moveSizeValue: booking.moveSizeLabel,
      livingRoomLabel: "Living Room",
      livingRoomValue: `${18 - index} Items Selected`,
      bedroom1Label: "Bedroom 1",
      bedroom1Value: `${10 - Math.min(index, 5)} Items Selected`,
      bedroom2Label: "Bedroom 2",
      bedroom2Value: `${6 - Math.min(index, 4)} Items Selected`,
      diningRoomLabel: "Dining Room",
      diningRoomValue: `${Math.max(1, 5 - index)} Items Selected`,
      kitchenLabel: "Kitchen",
      kitchenValue: `${Math.max(3, 14 - index)} Items Selected`,
      moveDateLabel: "Move Date",
      moveDateValue: booking.moveDateLabel,
      dayLabel: "Day",
      dayValue: booking.moveDayLabel,
      moveTimeLabel: "Move Time",
      moveTimeValue: booking.moveTimeLabel,
      moversPhoneLabel: "Movers phone",
      moversPhoneValue: mover.moversPhoneValue,
      moversEmailLabel: "Movers email",
      moversEmailValue: mover.moversEmailValue,
      addressLabel: "Address",
      addressValue: booking.fromAddress,
    },
  }));
}

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
        <RatingPill rating={rating} />
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
  booking,
}: {
  booking: BookMoveBookingDetails;
}) {
  const { locale } = useParams<{ locale: Locale }>();
  const { subView, selectedMover, goToDetail } = useBookMoveStep1();
  const movers = buildMovers(booking);

  if (subView === "payment" && selectedMover) {
    return <MoverPaymentPanel mover={selectedMover} />;
  }

  if (subView === "detail" && selectedMover) {
    return <MoverDetailsPanel mover={selectedMover} />;
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
                en: "Recommended Movers",
                nl: "Aangeraden verhuizers",
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
