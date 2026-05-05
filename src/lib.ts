import { QvaPayValidationError } from "./errors.ts";
import { AppService } from "./services/app.service.ts";
import { AuthService } from "./services/auth.service.ts";
import { CoinsService } from "./services/coins.service.ts";
import { InvoicesService } from "./services/invoices.service.ts";
import { MeService } from "./services/me.service.ts";
import { P2PService } from "./services/p2p.service.ts";
import { StocksService } from "./services/stocks.service.ts";
import { StoreService } from "./services/store.service.ts";
import { TransactionsService } from "./services/transactions.service.ts";
import type { QvaPayConfig } from "./types.ts";
import {
  createHttpClient,
  createPlainHttpClient,
  createUserHttpClient,
} from "./utils.ts";

export class QvaPaySDK {
  private _token: string | null;

  readonly auth: AuthService;
  readonly app: AppService;
  readonly transactions: TransactionsService;
  readonly invoices: InvoicesService;
  readonly me: MeService;
  readonly coins: CoinsService;
  readonly p2p: P2PService;
  readonly stocks: StocksService;
  readonly store: StoreService;

  constructor(config: QvaPayConfig) {
    if (!config.appId) {
      throw new QvaPayValidationError("appId is required", "appId");
    }
    if (!config.appSecret) {
      throw new QvaPayValidationError("appSecret is required", "appSecret");
    }

    this._token = config.token ?? null;

    const appHttp = createHttpClient(config);
    const plainHttp = createPlainHttpClient(config);
    const userHttp = createUserHttpClient(config, () => this._token);

    this.auth = new AuthService(plainHttp, userHttp, (token) => {
      this._token = token;
    });
    this.app = new AppService(appHttp);
    this.transactions = new TransactionsService(appHttp);
    this.invoices = new InvoicesService(appHttp);
    this.me = new MeService(userHttp);
    this.coins = new CoinsService(appHttp);
    this.p2p = new P2PService(userHttp);
    this.stocks = new StocksService(userHttp);
    this.store = new StoreService(userHttp);
  }

  /** Returns the current Bearer token, or null if not authenticated. */
  get token(): string | null {
    return this._token;
  }
}
