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

/**
 * El punto de entrada principal para el SDK de QvaPay.
 */
export class QvaPaySDK {
  private _token: string | null;

  /** Servicio para operaciones de autenticación. */
  readonly auth: AuthService;
  /** Servicio para operaciones del comercio/aplicación (Merchant). */
  readonly app: AppService;
  /** Servicio para gestionar transacciones. */
  readonly transactions: TransactionsService;
  /** Servicio para gestionar facturas (v1). */
  readonly invoices: InvoicesService;
  /** Servicio para gestionar el perfil del usuario autenticado. */
  readonly me: MeService;
  /** Servicio para obtener información de monedas. */
  readonly coins: CoinsService;
  /** Servicio para el mercado P2P. */
  readonly p2p: P2PService;
  /** Servicio para la compra/venta de acciones (Stocks). */
  readonly stocks: StocksService;
  /** Servicio para la tienda y servicios adicionales. */
  readonly store: StoreService;

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
    this.transactions = new TransactionsService(appHttp);
    this.invoices = new InvoicesService(appHttp);
    this.me = new MeService(userHttp);
    this.coins = new CoinsService(appHttp);
    this.p2p = new P2PService(userHttp);
    this.stocks = new StocksService(userHttp);
    this.store = new StoreService(userHttp);
  }

  /** Retorna el token Bearer actual, o null si no está autenticado. */
  get token(): string | null {
    return this._token;
  }
}
