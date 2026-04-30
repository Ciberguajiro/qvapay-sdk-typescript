import type { StoreServiceInterface } from "../types/store.interfaces";

class StoreService implements StoreServiceInterface {
  get_store_products(): string {
    throw new Error("Method not implemented.");
  }
  get_store_gift_card(): string {
    throw new Error("Method not implemented.");
  }
  buy_store_gift_card(): string {
    throw new Error("Method not implemented.");
  }
  get_store_phone_package(): string {
    throw new Error("Method not implemented.");
  }
  buy_phone_package(): string {
    throw new Error("Method not implemented.");
  }
}
