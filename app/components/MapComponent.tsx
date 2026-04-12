import React, { useCallback, useMemo } from "react";
import {
 GoogleMap,
 Marker,
 Polyline,
 useJsApiLoader,
} from "@react-google-maps/api";
import { TrackMove } from "@/services";
import { LoaderCircle } from "lucide-react";

const containerStyle = {
 width: "100%",
 height: "450px",
 borderRadius: "16px",
};

const MapComponent = (data: TrackMove) => {
 const { isLoaded } = useJsApiLoader({
  id: "google-map-script",
  googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
 });

 // Parse coordinates
 const pickUp = useMemo(() => {
  return {
   lat: parseFloat(data.fromLatitude),
   lng: parseFloat(data.fromLongitude),
  };
 }, [data]);

 const dropOff = useMemo(
  () => ({
   lat: parseFloat(data.toLatitude),
   lng: parseFloat(data.toLongitude),
  }),
  [data],
 );

 const path = [pickUp, dropOff];

 const polylineOptions = {
  strokeColor: "#3B82F6",
  strokeOpacity: 0.8,
  strokeWeight: 4,
 };

 // This function ensures the map zooms to fit all markers
 const onLoad = useCallback(
  (map: google.maps.Map) => {
   const bounds = new window.google.maps.LatLngBounds();
   bounds.extend(pickUp);
   bounds.extend(dropOff);
   map.fitBounds(bounds);
  },
  [pickUp, dropOff],
 );

 return isLoaded ? (
  <GoogleMap
   mapContainerStyle={containerStyle}
   onLoad={onLoad} // Automatically fits the map to your path
   options={{
    streetViewControl: false,
    mapTypeControl: false,
   }}
  >
   <Marker position={pickUp} label="Start" />
   <Marker position={dropOff} label="End" />

   {/* The Connector */}
   <Polyline path={path} options={polylineOptions} />
  </GoogleMap>
 ) : (
  <div
   style={{
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
   }}
  >
   <div className="bg-white shadow-2xl rounded-full h-12 w-12 flex items-center justify-center">
    <LoaderCircle size={24} className="text-xl text-theme animate-spin" />
   </div>
  </div>
 );
};

export default MapComponent;
