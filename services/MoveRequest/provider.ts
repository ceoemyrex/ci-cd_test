import axios, { AxiosError, AxiosInstance } from "axios";
import { BASE_URL } from "../config";
import { CreateMoveRequest, MoveItem } from "./types";
import { BaseApiResponse } from "../types";

export class MoveRequestProvider {
  private static endpoint = `${BASE_URL}/MoveRequest`;

  private static instance: AxiosInstance = axios.create({
    baseURL: MoveRequestProvider.endpoint,
  });

  // ✅ Attach token automatically before every request
  private static initialize() {
    this.instance.interceptors.request.use((config) => {
      return config;
    });
  }

  static async getQuote(formData: CreateMoveRequest) {
    this.initialize();
    try {
      const res = await this.instance.post<BaseApiResponse>(
        `GetQuote`,
        formData,
      );

      return res.data as BaseApiResponse;
    } catch (e) {
      if (e instanceof AxiosError) {
        return {
          responseStatus: false,
          responseMessage: "An error occurred could not create move request",
          ...e.response?.data,
        } as BaseApiResponse;
      }
      return {
        responseStatus: false,
        responseMessage: "An error occurred could not create move request",
      } as BaseApiResponse;
    }
  }
  static async getItemsByImage(formData:FormData,room:string) {
    this.initialize();
    try {
      const res = await this.instance.post<BaseApiResponse<MoveItem[]>>(
        `GetItemsByImage?room=${room}`,
        formData,
      );

      return res.data as BaseApiResponse<MoveItem[]>;
    } catch (e) {
      if (e instanceof AxiosError) {
        return {
          responseStatus: false,
          responseMessage: "An error occurred could not create move request",
          ...e.response?.data,
        } as BaseApiResponse<MoveItem[]>;
      }
      return {
        responseStatus: false,
        responseMessage: "An error occurred could not create move request",
      } as BaseApiResponse<MoveItem[]>;
    }
  } 
  static async getTrackMove(code:string) {
    this.initialize();
    try {
      const res = await this.instance.get<BaseApiResponse>(
        `TrackMove?code=${code}`,
      );

      return res.data as BaseApiResponse<MoveItem[]>;
    } catch (e) {
      if (e instanceof AxiosError) {
        return {
          responseStatus: false,
          responseMessage: "An error occurred could not create move request",
          ...e.response?.data,
        } as BaseApiResponse<MoveItem[]>;
      }
      return {
        responseStatus: false,
        responseMessage: "An error occurred could not create move request",
      } as BaseApiResponse<MoveItem[]>;
    }
  }

}
