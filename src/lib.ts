import { QvaPayValidationError } from "./errors";
import { AppService } from "./services/app.service";
import { AppsService } from "./services/apps.service";
import { AuthService } from "./services/auth.service";
import { CoinsService } from "./services/coins.service";
import { InvoicesService } from "./services/invoices.service";
import { MeService } from "./services/me.service";
import { P2PService } from "./services/p2p.service";
import { PaymentLinksService } from "./services/payment-links.service";
import { StocksService } from "./services/stocks.service";
import { StoreService } from "./services/store.service";
import { TransactionsService } from "./services/transactions.service";
import { UserService } from "./services/user.service";
import { WithdrawService } from "./services/withdraw.service";
import type { QvaPayConfig } from "./types";
import {
  createHttpClient,
  createPlainHttpClient,
  createUserHttpClient,
} from "./utils";

export class QvaPaySDK {
  private _token: string | null;

  readonly auth: AuthService;
  readonly app: AppService;
  readonly apps: AppsService;
  readonly transactions: TransactionsService;
  readonly invoices: InvoicesService;
  readonly me: MeService;
  readonly coins: CoinsService;
  readonly p2p: P2PService;
  readonly stocks: StocksService;
  readonly store: StoreService;
  readonly user: UserService;
  readonly withdraw: WithdrawService;
  readonly paymentLinks: PaymentLinksService;

  constructor(config: QvaPayConfig) {
    if (!config.appId) {
      throw new QvaPayValidationError("El appId es requerido", "appId");
    }
    if (!config.appSecret) {
      throw new QvaPayValidationError("El appSecret es requerido", "appSecret");
    }

    this._token = config.token ?? null;

    const appHttp = createHttpClient(config);
    const plainHttp = createPlainHttpClient(config);
    const userHttp = createUserHttpClient(config, () => this._token);

    this.auth = new AuthService(plainHttp, userHttp, (token) => {
      this._token = token;
    });
    this.app = new AppService(appHttp);
    this.apps = new AppsService(userHttp);
    this.transactions = new TransactionsService(appHttp);
    this.invoices = new InvoicesService(appHttp);
    this.me = new MeService(appHttp);
    this.coins = new CoinsService(plainHttp);
    this.p2p = new P2PService(appHttp);
    this.stocks = new StocksService(plainHttp);
    this.store = new StoreService(plainHttp);
    this.user = new UserService(userHttp);
    this.withdraw = new WithdrawService(userHttp);
    this.paymentLinks = new PaymentLinksService(userHttp);
  }

  get token(): string | null {
    return this._token;
  }
}
