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
export interface PlacePredictionResponse{
    suggestions:PlacePredictionObject[]
}
export interface PlacePredictionObject {
  placePrediction: PlacePrediction;
}

export interface PlacePrediction {
  place: string;
  placeId: string;
  text: {
    text: string;
    matches: TextMatch[];
  };
  structuredFormat: {
    mainText: {
      text: string;
      matches: TextMatch[];
    };
    secondaryText: {
      text: string;
    };
  };
  types: string[];
}

export interface TextMatch {
  startOffset: number;
  endOffset: number;
}