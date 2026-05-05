import type { AxiosInstance } from "axios";
import type { Coin, RawCoin } from "../types.ts";

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

export class CoinsService {
  constructor(private readonly http: AxiosInstance) {}

  async list(): Promise<Coin[]> {
    const { data } = await this.http.get<RawCoin[]>("/coins");
    return data.map(mapCoin);
  }
}
