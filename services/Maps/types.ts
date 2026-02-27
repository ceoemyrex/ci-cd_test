export interface Place {
  id: string;
  formattedAddress: string;
  location: {
    latitude: number;
    longitude: number;
  };
  adrFormatAddress: string;
  displayName: {
    text: string;
    languageCode: string;
  };
  shortFormattedAddress: string;
}

export interface PlaceResponse{
    places:Place[]
}