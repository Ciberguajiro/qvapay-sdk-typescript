import { QvaPayValidationError } from "./errors.ts";
import { AppService } from "./services/app.service.ts";
import { AuthService } from "./services/auth.service.ts";
import { InvoicesService } from "./services/invoices.service.ts";
import { MeService } from "./services/me.service.ts";
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
  }

  /** Returns the current Bearer token, or null if not authenticated. */
  get token(): string | null {
    return this._token;
  }
}
