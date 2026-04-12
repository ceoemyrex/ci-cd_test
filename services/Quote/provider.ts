import axios, { AxiosError, AxiosInstance } from "axios";
import { BASE_URL } from "../config";
import type { BaseApiResponse } from "../types";
import type { QuoteSummaryResponseModel } from "./types";

export class QuoteProvider {
  private static endpoint = `${BASE_URL}/Quote`;

  private static instance: AxiosInstance = axios.create({
    baseURL: QuoteProvider.endpoint,
  });

  private static initialize() {
    this.instance.interceptors.request.use((config) => config);
  }

  static async getAllQuotesByTrackingCode(code: string) {
    this.initialize();
    try {
      const res = await this.instance.get<
        BaseApiResponse<QuoteSummaryResponseModel[]>
      >(`GetAllQuotes`, { params: { code } });
      return res.data as BaseApiResponse<QuoteSummaryResponseModel[]>;
    } catch (e) {
      if (e instanceof AxiosError) {
        return {
          responseStatus: false,
          responseMessage: "Unable to load quotes",
          result: [],
          ...e.response?.data,
        } as BaseApiResponse<QuoteSummaryResponseModel[]>;
      }
      return {
        responseStatus: false,
        responseMessage: "Unable to load quotes",
        result: [],
      } as BaseApiResponse<QuoteSummaryResponseModel[]>;
    }
  }
}
