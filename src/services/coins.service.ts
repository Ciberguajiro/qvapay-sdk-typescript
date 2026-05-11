import type { AxiosInstance } from "axios";
import type { Coin, RawCoin } from "../types";

/**
 * Servicio para obtener información de las monedas soportadas en QvaPay.
 */
export class CoinsService {
  constructor(private readonly http: AxiosInstance) {}

  /**
   * Obtiene la lista de monedas y criptomonedas disponibles en la plataforma.
   *
   * @returns Una lista de objetos {@link Coin}.
   */
  async list(): Promise<Coin[]> {
    const { data } = await this.http.get<RawCoin[]>("/coins");
    return data.map(mapCoin);
  }
}

/**
 * Mapper para convertir una moneda cruda de la API al modelo Coin.
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
