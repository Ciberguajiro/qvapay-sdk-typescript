import { Axios, type AxiosInstance } from "axios";
import { AppService } from "./services/app.service";
import type { AuthService } from "./services/auth.service";
import type { CoinsService } from "./services/coins.service";
import type { InvoicesService } from "./services/invoices.service";
import type { MeService } from "./services/me.service";
import type { P2PService } from "./services/p2p.service";
import type { StocksService } from "./services/stocks.service";
import type { StoreService } from "./services/store.service";
import type { TransactionsService } from "./services/transactions.service";

class QvaPaySDK {
  private app_uuid: String = "";
  private app_key: String = "";
  private http: Axios | null = null;

  private app: AppService | null = null;
  private auth: AuthService | null = null;
  private coins: CoinsService | null = null;
  private invoices: InvoicesService | null = null;
  private me: MeService | null = null;
  private p2p: P2PService | null = null;
  private stocks: StocksService | null = null;
  private store: StoreService | null = null;
  private transactions: TransactionsService | null = null;

  /**
   * SDK de Qvapay
   */
  constructor(app_uuid: String, app_key: String) {
    this.setApp_Uuid = app_uuid;
    this.setApp_key = app_key;
    this.http = new Axios({
      baseURL: "https://api.qvapay.com",
    });
  }

  public set setApp_key(v: String) {
    this.app_key = v;
  }

  public set setApp_Uuid(v: String) {
    this.app_uuid = v;
  }

  
  public get AxiosInstance() : Axios {
    return this.http ?? new Axios({
      baseURL: "https://api.qvapay.com",
    })
  }
  

  public get AppService(): AppService {
    return this.app ?? new AppService(this.AxiosInstance);
  }
  public get AuthService(): AuthService {
    return this.auth ?? new AuthService();
  }
  public get CoinsService(): CoinsService {
    return this.coins ?? new CoinsService();
  }
  public get InvoicesService(): InvoicesService {
    return this.invoices ?? new InvoicesService();
  }
  public get MeService(): MeService {
    return this.me ?? new MeService();
  }
  public get P2PService(): P2PService {
    return this.p2p ?? new P2PService();
  }
  public get StocksService(): StocksService {
    return this.stocks ?? new StocksService();
  }
  public get StoreService(): StoreService {
    return this.store ?? new StoreService();
  }
  public get TransactionsService(): TransactionsService {
    return this.transactions ?? new TransactionsService();
  }
}
