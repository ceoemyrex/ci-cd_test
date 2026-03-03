import axios, { AxiosError, AxiosInstance } from "axios";
import { BASE_URL } from "../config";
import { BaseApiResponse } from "../types";
import { ProvinceItem } from "./types";

export class ProvinceProvider {
  private static endpoint = `${BASE_URL}/Province`;

  private static instance: AxiosInstance = axios.create({
    baseURL: ProvinceProvider.endpoint,
  });

  // ✅ Attach token automatically before every request
  private static initialize() {
    this.instance.interceptors.request.use((config) => {
      return config;
    });
  }
  static async getProvinces() {
    this.initialize();
    try {
      const res = await this.instance.get<BaseApiResponse>(
        `GetProvinces`,
      );

      return res.data as BaseApiResponse<ProvinceItem[]>;
    } catch (e) {
      if (e instanceof AxiosError) {
        return {
          responseStatus: false,
          responseMessage: "An error occurred could not get province id",
          ...e.response?.data,
        } as BaseApiResponse<ProvinceItem[]>;
      }
      return {
        responseStatus: false,
        responseMessage: "An error occurred could not get province id",
      } as BaseApiResponse<ProvinceItem[]>;
    }
  }

}
