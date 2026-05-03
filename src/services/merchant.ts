import type { BalanceMerchant, InfoMerchant, MerchantServiceInterface } from "../types/merchant.interfaces";

class MerchantService implements MerchantServiceInterface {
  get_balance(): BalanceMerchant {
    throw new Error("Method not implemented.");
  }
  get_info(): InfoMerchant {
    throw new Error("Method not implemented.");
  }
}
