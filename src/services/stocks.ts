import type { StockServiceInterface, StockType, TradeResponse } from "../types/stock.interfaces";

class StockService implements StockServiceInterface {
  get_stocks(): StockType[] {
    throw new Error("Method not implemented.");
  }
  buy_stock(symbol: string, amount: number): TradeResponse {
    throw new Error("Method not implemented.");
  }
  sell_stock(symbol: string, quantity: number): TradeResponse {
    throw new Error("Method not implemented.");
  }
}
