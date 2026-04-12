"use client";

type RoutePriceFields = {
  fromLabel: string;
  fromAddress: string;
  toLabel: string;
  toAddress: string;
  distance: string;
  price: string;
  meta: string;
};

export function MoverRoutePriceCard(props: RoutePriceFields) {
  const {
    fromLabel,
    fromAddress,
    toLabel,
    toAddress,
    distance,
    price,
    meta,
  } = props;

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-secondary/40 bg-[#F4FBF2] p-4 lg:flex-row lg:items-stretch lg:gap-6 lg:p-5">
      <div className="flex flex-1 items-stretch gap-3">
        <div className="flex w-8 shrink-0 flex-col items-center">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary/15">
            <div className="h-2 w-2 rounded-full bg-secondary" />
          </div>
          <div className="min-h-4 w-0.5 flex-1 bg-[#D3E3CD]" />
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary/15">
            <div className="h-2 w-2 rounded-full bg-secondary" />
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 py-0.5">
          <p className="text-xs text-grey">
            {fromLabel} – <span className="text-dark">{fromAddress}</span>
          </p>
          <p className="text-xs text-grey">
            {toLabel} – <span className="text-dark">{toAddress}</span>
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-start lg:justify-end">
        <div className="text-left lg:text-right">
          <p className="text-[11px] text-grey">{distance}</p>
          <p className="mt-1 text-2xl font-medium text-secondary lg:text-3xl">
            {price}
          </p>
          <p className="mt-1 text-[11px] text-grey">{meta}</p>
        </div>
      </div>
    </div>
  );
}
