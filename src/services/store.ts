import type { StoreGiftCardRequest, StoreGiftCardResponse, StoreResponse, StoreServiceInterface } from "../types/store.interfaces";

class StoreService implements StoreServiceInterface {
  get_store_products(): StoreResponse {
    throw new Error("Method not implemented.");
  }
  get_store_gift_card(): StoreGiftCardResponse {
    throw new Error("Method not implemented.");
  }
  buy_store_gift_card(data: StoreGiftCardRequest, uuid: string): StoreGiftCardResponse {
    throw new Error("Method not implemented.");
  }
  get_store_phone_package(): string {
    throw new Error("Method not implemented.");
  }
  buy_phone_package(): string {
    throw new Error("Method not implemented.");
  }
}
