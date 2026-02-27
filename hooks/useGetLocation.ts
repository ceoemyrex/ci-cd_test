"use client";

import { MapProvider, Place } from "@/services";
import { useEffect, useState } from "react";

export function useGetLocation() {
  const [queryString, setQueryText] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  /**
   * ✅ Select place handler
   * keeps logic centralized
   */
  const selectPlace = (place: Place) => {
    setSelectedPlace(place);
    setQueryText(place.formattedAddress); // ⭐ integrate selection → input
    setPopupOpen(false);
    setPlaces([]);
  };

  useEffect(() => {
    if (!queryString || queryString.trim().length < 3) {
      setPlaces([]);
      return;
    }

    const controller = new AbortController();

    const timeout = setTimeout(async () => {
      try {
        setLoading(true);

        const res = await MapProvider.getPlacesFromText(queryString);

        if (!controller.signal.aborted) {
          setPlaces(res.places ?? []);
          setPopupOpen(true); // open when results arrive
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          console.error(err);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 400);

    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, [queryString]);

  return {
    queryString,
    setQueryText,

    places,
    loading,

    selectedPlace,
    selectPlace,

    popupOpen,
    setPopupOpen,
  };
}