import type { AxiosInstance } from "axios";
import type {
  AppInfo,
  InvoiceParamsV2,
  InvoiceResultV2,
  RawAppInfo,
} from "../types";

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
 *
 * Permite interactuar con los datos propios de la aplicación y crear facturas v2.
 */
export class AppService {
  constructor(private readonly http: AxiosInstance) {}

  /**
   * Obtiene la información de la aplicación actual.
   *
   * @returns Un objeto {@link AppInfo} con los detalles de la aplicación.
   */
  async getInfo(): Promise<AppInfo> {
    const { data } = await this.http.post<RawAppInfo>("/v2/info");
    return mapAppInfo(data);
  }

  /**
   * Obtiene el balance disponible de la aplicación.
   *
   * @returns El balance como un número de punto flotante.
   */
  async getBalance(): Promise<number> {
    const { data } = await this.http.post<string>("/v2/balance");
    return parseFloat(data);
  }

  /**
   * Crea una factura utilizando la versión 2 de la API.
   *
   * @param params - Los parámetros de la factura a crear.
   * @returns El resultado de la creación de la factura {@link InvoiceResultV2}.
   */
  async createInvoice(params: InvoiceParamsV2): Promise<InvoiceResultV2> {
    const { data } = await this.http.post<InvoiceResultV2>(
      "/v2/create_invoice",
      params,
    );
    return data;
  }
}
