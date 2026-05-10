import type { AxiosInstance } from "axios";
import { QvaPayValidationError } from "../errors.ts";
import type { RawStock, RawStockTrade, Stock, StockTrade } from "../types.ts";


export class StocksService {
  constructor(private readonly http: AxiosInstance) {}

  async list(): Promise<Stock[]> {
    const { data } = await this.http.get<RawStock[]>("/stocks");
    return data.map(mapStock);
  }

  async buy(symbol: string, amount: number): Promise<StockTrade> {
    if (!symbol?.trim()) {
      throw new QvaPayValidationError("symbol is required", "symbol");
    }
    if (amount <= 0) {
      throw new QvaPayValidationError("amount must be greater than 0", "amount");
    }
    const { data } = await this.http.post<RawStockTrade>(`/stocks/${symbol}/buy`, { amount });
    return mapStockTrade(data);
  }

  async sell(symbol: string, quantity: number): Promise<StockTrade> {
    if (!symbol?.trim()) {
      throw new QvaPayValidationError("symbol is required", "symbol");
    }
    if (quantity <= 0) {
      throw new QvaPayValidationError("quantity must be greater than 0", "quantity");
    }
    const { data } = await this.http.post<RawStockTrade>(`/stocks/${symbol}/sell`, { quantity });
    return mapStockTrade(data);
  }
}


function mapStock(raw: RawStock): Stock {
  return {
    symbol: raw.symbol,
    name: raw.name,
    icon: raw.icon,
    iconStyle: raw.icon_style,
    image: raw.image,
    price: raw.price,
    change: raw.change,
    changeDollar: raw.change_dollar,
    volume: raw.volume,
    timestamp: raw.timestamp,
  };
}

function mapStockTrade(raw: RawStockTrade): StockTrade {
  return {
    tradeUuid: raw.trade_uuid,
    transactionUuid: raw.transaction_uuid,
    symbol: raw.symbol,
    quantity: raw.quantity,
    effectivePrice: raw.effective_price,
    marketPrice: raw.market_price,
    spreadPercent: raw.spread_percent,
    fee: raw.fee,
    extra: raw.extra,
  };
}
