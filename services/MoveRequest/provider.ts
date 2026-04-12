import axios, { AxiosError, AxiosInstance } from "axios";
import { BASE_URL } from "../config";
import {
  CreateMoveRequest,
  CreatePaymentIntentResponse,
  MoveItem,
  TrackMove,
} from "./types";
import type { MoveDetailsResponseModel } from "../Quote/types";
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
      const res = await this.instance.post<BaseApiResponse<string>>(
        `GetQuote`,
        formData,
      );

      return res.data as BaseApiResponse<string>;
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
  static async getItemsByImage(formData: FormData, room: string) {
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

  static async getTrackMove(code: string) {
    this.initialize();
    try {
      const res = await this.instance.get<BaseApiResponse>(
        `TrackMove?code=${encodeURIComponent(code)}`,
      );

      return res.data as BaseApiResponse<TrackMove>;
    } catch (e) {
      if (e instanceof AxiosError) {
        return {
          responseStatus: false,
          responseMessage: "An error occurred could not create move request",
          ...e.response?.data,
        } as BaseApiResponse<TrackMove>;
      }
      return {
        responseStatus: false,
        responseMessage: "An error occurred could not create move request",
      } as BaseApiResponse<TrackMove>;
    }
  }

  static async getMoveDetails(code: string) {
    this.initialize();
    try {
      const res = await this.instance.get<BaseApiResponse<MoveDetailsResponseModel>>(
        `GetMoveDetails`,
        { params: { code } },
      );
      return res.data as BaseApiResponse<MoveDetailsResponseModel>;
    } catch (e) {
      if (e instanceof AxiosError) {
        return {
          responseStatus: false,
          responseMessage: "Unable to load move details",
          ...e.response?.data,
        } as BaseApiResponse<MoveDetailsResponseModel>;
      }
      return {
        responseStatus: false,
        responseMessage: "Unable to load move details",
      } as BaseApiResponse<MoveDetailsResponseModel>;
    }
  }

  static async createPaymentIntent(amount: number) {
    this.initialize();
    const res = await this.instance.get<CreatePaymentIntentResponse>(
      `CreatePaymentIntent?amount=${amount}`,
    );

    return res.data;
  }
}
