import type { CoinsResponse, CoinsServiceInterface } from "../types/coins.interfaces";

class CoinsService implements CoinsServiceInterface {
  get_coins(): CoinsResponse {
    throw new Error("Method not implemented.");
  }
}
