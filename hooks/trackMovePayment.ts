import type { TrackMove } from "@/services/MoveRequest/types";
import type { MoveDetailsResponseModel } from "@/services/Quote/types";
import type { BookMoveBookingDetails } from "@/types/movers";

export function isTrackPaymentComplete(
  track: TrackMove,
  moveRequestStatus: string | null | undefined,
): boolean {
  const extended = track as TrackMove & { IsPaymentComplete?: boolean };
  if (extended.isPaymentComplete === true || extended.IsPaymentComplete === true) {
    return true;
  }

  const s = (moveRequestStatus ?? "").trim().toLowerCase();
  if (s) {
    if (
      /\bunpaid\b|pending payment|awaiting payment|payment pending|awaiting quote|quote pending|unconfirmed|\bnewrequest\b/.test(
        s,
      )
    ) {
      return false;
    }
    if (/\bpaid\b/.test(s)) {
      return true;
    }
    if (
      /\bapproved\b/.test(s) ||
      s.includes("payment complete") ||
      s.includes("fully booked") ||
      /\bbooked\b/.test(s) ||
      s.includes("move confirmed") ||
      s.includes("accepted quote") ||
      s.includes("quote accepted")
    ) {
      return true;
    }
  }

  if (track.hasArrived || track.inTransit || track.isCompleted) {
    return true;
  }

  return false;
}

export function bookingFromTrackAndMoveDetails(
  track: TrackMove,
  md: MoveDetailsResponseModel,
): BookMoveBookingDetails {
  let moveDateLabel = "";
  if (md.moveDate) {
    const d = new Date(md.moveDate);
    if (!Number.isNaN(d.getTime())) {
      moveDateLabel = d.toLocaleDateString("nl-NL", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
  }
  return {
    fromAddress: md.from ?? "",
    toAddress: md.to ?? "",
    moveSizeLabel: md.houseSize ?? "",
    moveDateLabel,
    moveDayLabel: md.moveDay ?? "",
    moveTimeLabel: md.moveTime ?? "",
    fromLatitude: md.pickUpLatitude ?? track.fromLatitude,
    fromLongitude: md.pickUpLongitude ?? track.fromLongitude,
    toLatitude: md.dropOffLatitude ?? track.toLatitude,
    toLongitude: md.dropOffLongitude ?? track.toLongitude,
  };
}
