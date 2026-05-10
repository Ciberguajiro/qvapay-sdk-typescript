import type { AxiosInstance } from "axios";
import { QvaPayValidationError } from "../errors.ts";
import type { RawStock, RawStockTrade, Stock, StockTrade } from "../types.ts";

/**
 * Servicio para gestionar la compra y venta de acciones (Stocks).
 */
export class StocksService {
  constructor(private readonly http: AxiosInstance) {}

  /**
   * Lista las acciones disponibles para negociar.
   */
  async list(): Promise<Stock[]> {
    const { data } = await this.http.get<RawStock[]>("/stocks");
    return data.map(mapStock);
  }

  /**
   * Compra una cantidad determinada de acciones.
   */
  async buy(symbol: string, amount: number): Promise<StockTrade> {
    if (!symbol?.trim()) {
      throw new QvaPayValidationError("El símbolo es requerido", "symbol");
    }
    if (amount <= 0) {
      throw new QvaPayValidationError("El monto debe ser mayor a 0", "amount");
    }
    const { data } = await this.http.post<RawStockTrade>(`/stocks/${symbol}/buy`, { amount });
    return mapStockTrade(data);
  }

  /**
   * Vende una cantidad determinada de acciones.
   */
  async sell(symbol: string, quantity: number): Promise<StockTrade> {
    if (!symbol?.trim()) {
      throw new QvaPayValidationError("El símbolo es requerido", "symbol");
    }
    if (quantity <= 0) {
      throw new QvaPayValidationError("La cantidad debe ser mayor a 0", "quantity");
    }
    const { data } = await this.http.post<RawStockTrade>(`/stocks/${symbol}/sell`, { quantity });
    return mapStockTrade(data);
  }
}

/**
 * Mapper para la información de una acción.
 */
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

/**
 * Mapper para el resultado de una operación con acciones.
 */
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
