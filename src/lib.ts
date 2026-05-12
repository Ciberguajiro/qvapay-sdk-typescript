import { QvaPayValidationError } from "./errors";
import { AppService } from "./services/app.service";
import { AuthService } from "./services/auth.service";
import { CoinsService } from "./services/coins.service";
import { InvoicesService } from "./services/invoices.service";
import { MeService } from "./services/me.service";
import { P2PService } from "./services/p2p.service";
import { StocksService } from "./services/stocks.service";
import { StoreService } from "./services/store.service";
import { TransactionsService } from "./services/transactions.service";
import type { QvaPayConfig } from "./types";
import {
  createHttpClient,
  createPlainHttpClient,
  createUserHttpClient,
} from "./utils";

/**
 * El punto de entrada principal para el SDK de QvaPay.
 *
 * Proporciona acceso a todos los servicios de la API de QvaPay de forma organizada.
 */
export class QvaPaySDK {
  private _token: string | null;

  /**
   * Servicio para operaciones de autenticación.
   * Permite el login, registro y gestión de sesiones de usuario.
   */
  readonly auth: AuthService;

  /**
   * Servicio para operaciones del comercio/aplicación (Merchant).
   * Permite obtener información de la app, balance y crear facturas v2.
   */
  readonly app: AppService;

  /**
   * Servicio para gestionar transacciones.
   * Permite listar y obtener detalles de transacciones del comercio.
   */
  readonly transactions: TransactionsService;

  /**
   * Servicio para gestionar facturas (v1).
   * Permite crear y gestionar facturas tradicionales.
   */
  readonly invoices: InvoicesService;

  /**
   * Servicio para gestionar el perfil del usuario autenticado.
   * Requiere que el usuario haya iniciado sesión.
   */
  readonly me: MeService;

  /**
   * Servicio para obtener información de monedas.
   * Lista las criptomonedas y monedas soportadas por QvaPay.
   */
  readonly coins: CoinsService;

  /**
   * Servicio para el mercado P2P.
   * Permite interactuar con ofertas de compra y venta entre usuarios.
   */
  readonly p2p: P2PService;

  /**
   * Servicio para la compra/venta de acciones (Stocks).
   * Permite gestionar inversiones dentro de la plataforma.
   */
  readonly stocks: StocksService;

  /**
   * Servicio para la tienda y servicios adicionales.
   * Permite la compra de tarjetas de regalo, paquetes de telefonía, etc.
   */
  readonly store: StoreService;

  /**
   * Crea una nueva instancia del SDK de QvaPay.
   *
   * @param config - Configuración necesaria para inicializar el SDK.
   * @throws {QvaPayValidationError} Si falta el appId o appSecret.
   */
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
    this.me = new MeService(appHttp);
    this.coins = new CoinsService(appHttp);
    this.p2p = new P2PService(appHttp);
    this.stocks = new StocksService(appHttp);
    this.store = new StoreService(appHttp);
  }

  /**
   * Retorna el token Bearer actual del usuario, o null si no está autenticado.
   */
  get token(): string | null {
    return this._token;
  }
}
