export interface QvaPayLib {
  initialiceUser(key_user: string): QvaPayLib;
  initialiceMerchant(key_merchant: string): QvaPayLib;
  request_post():string;
  request_get():string;
}
