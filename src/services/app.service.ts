import type { AxiosInstance } from "axios";
import type {
  AppInfo,
  InvoiceParams,
  InvoiceResult,
  RawAppInfo,
} from "../types.ts";

export function mapAppInfo(raw: RawAppInfo): AppInfo {
  return {
    uuid: raw.uuid,
    name: raw.name,
    url: raw.url,
    desc: raw.desc,
    logo: raw.logo,
    active: raw.active,
    userId: raw.user_id,
  };
}

export class AppService {
  constructor(private readonly http: AxiosInstance) {}

  async getInfo(): Promise<AppInfo> {
    const { data } = await this.http.post<RawAppInfo>("/v2/info");
    return mapAppInfo(data);
  }

  async getBalance(): Promise<number> {
    const { data } = await this.http.post<{ balance: string }>("/v2/balance");
    return parseFloat(data.balance);
  }

  async create_invoice(params: InvoiceParams): Promise<InvoiceResult> {
    const { data } = await this.http.post<InvoiceResult>(
      "/v2/create_invoice",
      params,
    );
    return data;
  }
}
