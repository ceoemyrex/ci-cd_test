import axios from "axios";
import { Place, PlacePredictionResponse, PlaceResponse } from "./types";

export class MapProvider {
  private static readonly url = `https://places.googleapis.com/v1/places`;
  // private static readonly placeDetailsurl = `https://places.googleapis.com/v1/places`;
  // private static readonly autoCompleteUrl = `https://places.googleapis.com/v1/places:autocomplete`;

  static async getPlacesFromText(textQuery: string) {
    try {
      const res = await axios.post<PlaceResponse>(
        `${this.url}:searchText`,
        { textQuery },
        {
          headers: {
            "X-Goog-Api-Key": process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
            "X-Goog-FieldMask": "places.displayName,places.postalAddress,places.formattedAddress,places.priceLevel,places.adrFormatAddress,places.id,places.formattedAddress,places.shortFormattedAddress,places.location,places.addressComponents"
          },
        },
      );

      return res.data as PlaceResponse;
    } catch (error) {
      return {
        places:[],
        error,
      };
    }
  }
  static async getPlaceDetails(placeId: string) {
    try {
      const res = await axios.get<Place>(
        `${this.url}/${placeId}`,
        {
          headers: {
            "X-Goog-Api-Key": process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
            "X-Goog-FieldMask": "displayName,postalAddress,addressComponents,formattedAddress,priceLevel,adrFormatAddress,id,formattedAddress,shortFormattedAddress,location"
          },
        },
      );

      return res.data as Place;
    } catch (error) {
      console.log(error)
      return null;
    }
  }
  static async getPlacePrediction(textQuery: string) {
    try {
      const res = await axios.post<PlacePredictionResponse>(
        `${this.url}:autocomplete`,
        { input:textQuery },
        {
          headers: {
            "X-Goog-Api-Key": process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
            "X-Goog-FieldMask": "*"
          },
        },
      );

      return res.data as PlacePredictionResponse;
    } catch (error) {
      console.log(error)
      return {
        suggestions:[],
      } as PlacePredictionResponse;
    }
  }
}
