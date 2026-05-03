export interface MerchantServiceInterface {
  get_balance(): BalanceMerchant;
  get_info(): InfoMerchant;
}

/// Information about the merchant application.
export type InfoMerchant = {
  uuid: String;
  name: String;
  url: String;
  desc: String;
  callback: String;
  success_url: String;
  cancel_url: String;
  logo: String;
  active: boolean;
  enabled: boolean;
  card: boolean;
  app_photo_url: String;
};

/// Merchant balance information.
export type BalanceMerchant = {
  balance: number;
};
