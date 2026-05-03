export interface StockServiceInterface {
  get_stocks(): StockType[];
  buy_stock(symbol: string, amount: number): TradeResponse;
  sell_stock(symbol: string, quantity: number): TradeResponse;
}

export type StockType = {
  symbol: string;
  name: string;
  icon: string;
  icon_style: string;
  image: string;
  price: string;
  change: string;
  change_dollar: string;
  volume: string;
  timestamp: string;
};

export type BuyStockType = {
  amount: number;
};

export type TradeResponse = {
  trade_uuid: string;
  transaction_uuid: string;
  symbol: string;
  quantity: string;
  effective_price: string;
  market_price: string;
  spread_percent: string;
  fee: string;
  extra: string;
};

export type SellStockType = {
  quantity: number;
};
