import type { AxiosInstance } from "axios";
import type { AppInfo, RawAppInfo } from "../types.ts";

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
    const { data } = await this.http.get<RawAppInfo>("/info");
    return mapAppInfo(data);
  }

  async getBalance(): Promise<number> {
    const { data } = await this.http.get<{ balance: string }>("/balance");
    return parseFloat(data.balance);
  }
}
