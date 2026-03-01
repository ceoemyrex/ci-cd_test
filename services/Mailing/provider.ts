import axios, { AxiosError, AxiosInstance } from "axios";
import { BASE_URL } from "../config";
import { BaseApiResponse } from "../types";

export class MailingProvider {
  private static endpoint = `${BASE_URL}/Mailing`;

  private static instance: AxiosInstance = axios.create({
    baseURL: MailingProvider.endpoint,
  });

  // ✅ Attach token automatically before every request
  private static initialize() {
    this.instance.interceptors.request.use((config) => {
      return config;
    });
  }

  static async addMailingList(email:string) {
    this.initialize();
    try {
      const res = await this.instance.get<BaseApiResponse>(
        `Add?email=${email}`,
      );

      return res.data as BaseApiResponse;
    } catch (e) {
      if (e instanceof AxiosError) {
        return {
          responseStatus: false,
          responseMessage: "An error occurred could not add to mailing list",
          ...e.response?.data,
        } as BaseApiResponse;
      }
      return {
        responseStatus: false,
        responseMessage: "An error occurred could not add to mailing list",
      } as BaseApiResponse;
    }
  }
}
