import type {
  MoveDetailsResponseModel,
  QuoteSummaryResponseModel,
} from "@/services/Quote";
import type { RecommendedMover } from "@/types/movers";

const DEFAULT_MOVER_IMAGE =
  "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=900&q=70";

const ALLOWED_IMAGE_HOSTS = new Set([
  "images.unsplash.com",
  "images.ctfassets.net",
  "involved-birgit-zinter-cb767b47.koyeb.app",
]);

function safeQuoteImageUrl(url: string | null | undefined): string {
  if (!url?.trim()) return DEFAULT_MOVER_IMAGE;
  try {
    const host = new URL(url).hostname;
    if (ALLOWED_IMAGE_HOSTS.has(host)) return url;
  } catch {
    return DEFAULT_MOVER_IMAGE;
  }
  return DEFAULT_MOVER_IMAGE;
}

function formatPrice(amount: number) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function roomCount(details: MoveDetailsResponseModel | null | undefined, needle: string) {
  const list = details?.moveItemsDetails;
  if (!list?.length) return "—";
  const row = list.find(
    (r) =>
      r.roomName?.toLowerCase().includes(needle.toLowerCase()) ?? false,
  );
  return row ? String(row.count) : "—";
}

export function mapQuotesToRecommendedMovers(
  quotes: QuoteSummaryResponseModel[],
): RecommendedMover[] {
  return quotes.map((quote) => {
    const md = quote.moveDetails;
    const from = md?.from ?? "—";
    const to = md?.to ?? "—";
    const moveDate = md?.moveDate
      ? new Date(md.moveDate).toLocaleDateString("nl-NL", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "—";
    return {
      id: String(quote.quoteId),
      name: quote.companyName ?? "—",
      rating: 0,
      price: formatPrice(quote.amount),
      priceAmount: Math.max(1, Math.round(Number(quote.amount) || 0)),
      meta:
        quote.additionalInformation?.trim() ||
        "Pickup & delivery included",
      distance: md?.status?.trim() || "Quoted for your move",
      status: "Available",
      image: safeQuoteImageUrl(quote.image),
      fromLabel: "From",
      fromAddress: from,
      toLabel: "To",
      toAddress: to,
      details: {
        moveSizeLabel: "Move size",
        moveSizeValue: md?.houseSize ?? "—",
        livingRoomLabel: "Living room",
        livingRoomValue: roomCount(md, "living"),
        bedroom1Label: "Bedroom 1",
        bedroom1Value: roomCount(md, "bedroom"),
        bedroom2Label: "Bedroom 2",
        bedroom2Value: roomCount(md, "bedroom 2"),
        diningRoomLabel: "Dining room",
        diningRoomValue: roomCount(md, "dining"),
        kitchenLabel: "Kitchen",
        kitchenValue: roomCount(md, "kitchen"),
        moveDateLabel: "Move date",
        moveDateValue: moveDate,
        dayLabel: "Day",
        dayValue: md?.moveDay ?? "—",
        moveTimeLabel: "Move time",
        moveTimeValue: md?.moveTime ?? "—",
        moversPhoneLabel: "Your phone",
        moversPhoneValue: md?.phoneNumber ?? "—",
        moversEmailLabel: "Movers email",
        moversEmailValue: quote.companyEmail ?? "—",
        addressLabel: "Pickup",
        addressValue: from,
      },
    };
  });
}

export function recommendedMoverFromMoveDetails(
  md: MoveDetailsResponseModel,
  title = "Your move",
  companyEmail: string | null = null,
): RecommendedMover {
  const amt = md.amount ?? 0;
  const from = md.from ?? "—";
  const to = md.to ?? "—";
  const moveDate = md.moveDate
    ? new Date(md.moveDate).toLocaleDateString("nl-NL", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "—";
  return {
    id: "move-booking",
    name: title,
    rating: 0,
    price: formatPrice(amt),
    priceAmount: Math.max(1, Math.round(Number(amt) || 0)),
    meta: md.status?.trim() || "Pickup & delivery included",
    distance: "Booked move",
    status: "Booked",
    image: DEFAULT_MOVER_IMAGE,
    fromLabel: "From",
    fromAddress: from,
    toLabel: "To",
    toAddress: to,
    details: {
      moveSizeLabel: "Move size",
      moveSizeValue: md.houseSize ?? "—",
      livingRoomLabel: "Living room",
      livingRoomValue: roomCount(md, "living"),
      bedroom1Label: "Bedroom 1",
      bedroom1Value: roomCount(md, "bedroom"),
      bedroom2Label: "Bedroom 2",
      bedroom2Value: roomCount(md, "bedroom 2"),
      diningRoomLabel: "Dining room",
      diningRoomValue: roomCount(md, "dining"),
      kitchenLabel: "Kitchen",
      kitchenValue: roomCount(md, "kitchen"),
      moveDateLabel: "Move date",
      moveDateValue: moveDate,
      dayLabel: "Day",
      dayValue: md.moveDay ?? "—",
      moveTimeLabel: "Move time",
      moveTimeValue: md.moveTime ?? "—",
      moversPhoneLabel: "Your phone",
      moversPhoneValue: md.phoneNumber ?? "—",
      moversEmailLabel: "Contact email",
      moversEmailValue: companyEmail ?? md.email ?? "—",
      addressLabel: "Pickup",
      addressValue: from,
    },
  };
}
