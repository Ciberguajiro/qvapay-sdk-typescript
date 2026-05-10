import type { AxiosInstance } from "axios";
import type { Coin, RawCoin } from "../types.ts";

/**
 * Mapper para convertir la información cruda de la moneda al modelo Coin.
 */
function mapCoin(raw: RawCoin): Coin {
  return {
    id: raw.id,
    name: raw.name,
    tick: raw.tick,
    logo: raw.logo,
    price: raw.price,
    change24h: raw.change_24h,
  };
}

/**
 * Servicio para obtener información sobre criptomonedas y tasas de cambio.
 */
export class CoinsService {
  constructor(private readonly http: AxiosInstance) {}

  /**
   * Lista todas las monedas disponibles y sus precios actuales.
   */
  async list(): Promise<Coin[]> {
    const { data } = await this.http.get<RawCoin[]>("/coins");
    return data.map(mapCoin);
  }

  /**
   * Obtiene detalles de una moneda específica.
   */
  async details(id: string): Promise<Coin[]> {
    const { data } = await this.http.get<RawCoin[]>(`/coins/${id}`);
    return data.map(mapCoin);
  }
}
