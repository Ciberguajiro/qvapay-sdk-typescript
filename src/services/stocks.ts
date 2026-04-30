import type { StockServiceInterface } from "../types/stock.interfaces";

class StockService implements StockServiceInterface {
  get_stocks(): string {
    throw new Error("Method not implemented.");
  }
  buy_stock(): string {
    throw new Error("Method not implemented.");
  }
  sell_stock(): string {
    throw new Error("Method not implemented.");
  }
}
