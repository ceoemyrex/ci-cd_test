import axios from "axios";
import { PlaceResponse } from "./types";

export class MapProvider {
  private static readonly url = `https://places.googleapis.com/v1/places:searchText`;

  static async getPlacesFromText(textQuery: string) {
    try {
      const res = await axios.post<PlaceResponse>(
        this.url,
        { textQuery },
        {
          headers: {
            "X-Goog-Api-Key": process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
            "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.priceLevel,places.adrFormatAddress,places.id,places.formattedAddress,places.shortFormattedAddress,places.location"
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
}
