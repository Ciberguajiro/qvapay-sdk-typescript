import type { AxiosInstance } from "axios";
import type {
  AppInfo,
  InvoiceParamsV2,
  InvoiceResultV2,
  RawAppInfo,
} from "../types.ts";

/**
 * Mapper para convertir la información cruda de la API al modelo AppInfo.
 */
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

/**
 * Servicio para gestionar la aplicación (Merchant).
 */
export class AppService {
  constructor(private readonly http: AxiosInstance) {}

  /**
   * Obtiene la información de la aplicación actual.
   */
  async getInfo(): Promise<AppInfo> {
    const { data } = await this.http.post<RawAppInfo>("/v2/info");
    return mapAppInfo(data);
  }

  /**
   * Obtiene el balance disponible de la aplicación.
   */
  async getBalance(): Promise<number> {
    const { data } = await this.http.post<{ balance: string }>("/v2/balance");
    return parseFloat(data.balance);
  }

  /**
   * Crea una factura utilizando la versión 2 de la API.
   */
  async createInvoice(params: InvoiceParamsV2): Promise<InvoiceResultV2> {
    const { data } = await this.http.post<InvoiceResultV2>(
      "/v2/create_invoice",
      params,
    );
    return data;
  }
}
