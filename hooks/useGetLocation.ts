"use client";

import { MapProvider, Place, PlacePredictionObject } from "@/services";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export function useGetLocation(
  currentPlace?:Place | null,
  setCurrentPlace?:(place:Place)=>void,
  locationText?:string,
) {
  /* ---------------------------------- STATE --------------------------------- */

  const sessionRef = useRef(0)
  const [queryString, setQueryText] = useState("");
  const [places, setPlaces] = useState<PlacePredictionObject[]>([]);
  const [selectedPlace, setSelectedPlace] =
    useState<PlacePredictionObject | null>(null);
  const [placeDetails, setPlaceDetails] = useState<Place | null>(null);

  const isProgrammaticUpdate = useRef(false);

  const [loading, setLoading] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  const [activeIndex, setActiveIndex] = useState(-1);
  const [isSelecting, setIsSelecting] = useState(false);

  /* ---------------------------------- REFS ---------------------------------- */

  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const detailsCache = useRef<Record<string, Place>>({});
  const containerRef = useRef<HTMLDivElement | null>(null);

 useEffect(() => {
  if (!currentPlace) return;
  setPlaceDetails(currentPlace);
  setQueryText(currentPlace.formattedAddress);
}, [currentPlace]);

 useEffect(() => {
  if(sessionRef.current > 0) return;
  if (!locationText) return;

 const resolveLocation = async () => {
  try {
    setLoading(true);

    const res =
      await MapProvider.getPlacePrediction(locationText);

    const firstSuggestion = res?.suggestions?.[0];
    if (!firstSuggestion) return;

    // ✅ mark as programmatic
    isProgrammaticUpdate.current = true;

    setSelectedPlace(firstSuggestion);
    setPlaces(res.suggestions);
    setQueryText(firstSuggestion.placePrediction.text.text);

    setPopupOpen(false);
    setPlaces([]);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
    sessionRef.current = 1;
  }
};

  resolveLocation();
}, [locationText]);

  /* ---------------------------- SELECT PLACE ---------------------------- */

  const selectPlace = useCallback((place: PlacePredictionObject) => {
    isProgrammaticUpdate.current = true;
    setIsSelecting(true);
    setSelectedPlace(place);
    setQueryText(place.placePrediction.text.text);
    setPopupOpen(false);
    setPlaces([]);
    setActiveIndex(-1);
  }, []);

  /* --------------------------- FETCH DETAILS ---------------------------- */

  const getPlaceDetails = useCallback(async () => {
    if (!selectedPlace) return;

    const placeId = selectedPlace.placePrediction.placeId;

    // ✅ cache hit
    if (detailsCache.current[placeId]) {
      setPlaceDetails(detailsCache.current[placeId]);
      setCurrentPlace?.(detailsCache.current[placeId])
      return;
    }

    try {
      const res = await MapProvider.getPlaceDetails(placeId);

      if (res) {
        detailsCache.current[placeId] = res;
        setPlaceDetails(res);
        setCurrentPlace?.(res)
      }
    } catch (error) {
      console.error(error);
    }
  }, [selectedPlace,setCurrentPlace]);

  useEffect(() => {
    getPlaceDetails();
  }, [getPlaceDetails]);

  /* --------------------------- AUTOCOMPLETE ---------------------------- */

  useEffect(() => {

    // ✅ ignore system-driven updates
  if (isProgrammaticUpdate.current) {
    isProgrammaticUpdate.current = false;
    return;
  }

    if (isSelecting) {
      setIsSelecting(false);
      return;
    }

    if (!queryString.trim()) {
      setPlaces([]);
      setPopupOpen(false);
      return;
    }
    if(currentPlace?.formattedAddress == queryString){
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        setLoading(true);

        const res =
          await MapProvider.getPlacePrediction(queryString);

        const suggestions = res?.suggestions ?? [];

        setPlaces(suggestions);
        setPopupOpen(suggestions.length > 0);
        setActiveIndex(-1);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 350);

    return () => {
      if (debounceRef.current)
        clearTimeout(debounceRef.current);
    };
  }, [queryString, isSelecting,currentPlace]);

  /* ------------------------ KEYBOARD NAVIGATION ------------------------ */

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!popupOpen || places.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) =>
          prev < places.length - 1 ? prev + 1 : prev
        );
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : 0));
      }

      if (e.key === "Enter" && activeIndex >= 0) {
        e.preventDefault();
        selectPlace(places[activeIndex]);
      }

      if (e.key === "Escape") {
        setPopupOpen(false);
      }
    },
    [places, activeIndex, popupOpen, selectPlace]
  );

  /* -------------------------- CLICK OUTSIDE -------------------------- */

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setPopupOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () =>
      document.removeEventListener("mousedown", handler);
  }, []);

  /* -------------------------------- RETURN -------------------------------- */

  return {
    queryString,
    setQueryText,

    places,
    loading,

    selectedPlace,
    placeDetails,
    selectPlace,

    popupOpen,
    setPopupOpen,

    activeIndex,
    handleKeyDown,

    containerRef,
  };
}