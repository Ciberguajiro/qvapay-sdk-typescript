import type { CoinsServiceInterface } from "../types/coins.interfaces";

class CoinsService implements CoinsServiceInterface {
  get_coins(): string {
    throw new Error("Method not implemented.");
  }
}
