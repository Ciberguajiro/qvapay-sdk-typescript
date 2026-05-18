import type { AxiosInstance } from "axios";
import { QvaPayValidationError } from "../errors";
import type {
  Coin,
  CoinCategory,
  CoinDetail,
  CoinPriceHistoryPoint,
  RawCoin,
  RawCoinDetail,
} from "../types";

export class CoinsService {
  constructor(private readonly http: AxiosInstance) {}

  async list(): Promise<Coin[]> {
    const { data } = await this.http.get<RawCoin[]>("/coins");
    return data.map(mapCoin);
  }

  async listCategorized(): Promise<CoinCategory[]> {
    const { data } = await this.http.get<CoinCategory[]>("/coins");
    return data;
  }

  async detail(id: string): Promise<CoinDetail> {
    if (!id?.trim()) {
      throw new QvaPayValidationError("El ID de la moneda es requerido", "id");
    }
    const { data } = await this.http.get<RawCoinDetail>(`/coins/${id}`);
    return mapCoinDetail(data);
  }

  async priceHistory(
    tick: string,
    timeframe: "1H" | "24H" | "1W" | "1M" | "1Y" | "ALL" = "24H",
  ): Promise<CoinPriceHistoryPoint[]> {
    if (!tick?.trim()) {
      throw new QvaPayValidationError("El ticker de la moneda es requerido", "tick");
    }
    const { data } = await this.http.get<CoinPriceHistoryPoint[]>(
      `/coins/price-history/${tick}`,
      { params: { timeframe } },
    );
    return data;
  }
}

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

function mapCoinDetail(raw: RawCoinDetail): CoinDetail {
  return {
    id: raw.id,
    name: raw.name,
    tick: raw.tick,
    logo: raw.logo,
    price: raw.price,
    change24h: raw.change_24h,
  };
}
