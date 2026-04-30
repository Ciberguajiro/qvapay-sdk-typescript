import type { MerchantServiceInterface } from "../types/merchant.interfaces";

class MerchantService implements MerchantServiceInterface {
  get_balance(): string {
    throw new Error("Method not implemented.");
  }
  get_info(): string {
    throw new Error("Method not implemented.");
  }
}
