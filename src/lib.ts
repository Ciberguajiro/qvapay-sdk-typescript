import type { QvaPayLib } from "./types";

class SDK_QVAPay implements QvaPayLib {
  private key_user: string;
  private key_merchant: string;
  private base_url: string = "https://api.qvapay.com";

  /**
   * Libreria para usar la api de qvapay
   */
  constructor() {
    this.key_user = "";
    this.key_merchant = "";
  }

  public set setKey_User(v: string) {
    this.key_merchant = v;
  }

  public set setKey_Merchant(v: string) {
    this.key_merchant = v;
  }

  public initialiceUser(key_user: string): QvaPayLib {
    this.setKey_User = key_user;
    return this;
  }

  public initialiceMerchant(key_merchant: string): QvaPayLib {
    this.setKey_Merchant = key_merchant;
    return this;
  }

  public request_post(): string {
    return this.request();
  }

  public request_get(): string {
    return this.request();
  }

  private request() {
    return "132";
  }
}

const qvapay = new SDK_QVAPay();
export default qvapay;
