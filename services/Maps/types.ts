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
  postalAddress?: {
    revision: number;
    regionCode: string;
    languageCode: string;
    postalCode: string;
    sortingCode: string;
    administrativeArea: string;
    locality: string;
    sublocality: string;
    addressLines: string[];
    recipients: string[];
    organization: string;
  };
  addressComponents?: {
    longText: string;
    shortText: string;
    types: string[];
    languageCode: string;
  }[];
}

export interface PlaceResponse {
  places: Place[];
}
export interface PlacePredictionResponse {
  suggestions: PlacePredictionObject[];
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
