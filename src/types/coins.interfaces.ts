export interface CoinsServiceInterface {
  get_coins(): CoinsResponse;
}

export type CoinsResponse = {
  id: string;
  name: string;
  coins: CoinType;
};

export type CoinType = {
  id: string;
  name: string;
  tick: string;
  logo: string;
  price: string;
  change_24h: string;
};
