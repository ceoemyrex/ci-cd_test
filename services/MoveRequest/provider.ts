import axios, { AxiosError, AxiosInstance } from "axios";
import { BASE_URL } from "../config";
import { CreateMoveRequest } from "./types";
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
}
