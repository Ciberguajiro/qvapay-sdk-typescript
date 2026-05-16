import type { AxiosInstance } from "axios";
import { QvaPayValidationError } from "../errors";
import type {
  CreateP2PParams,
  P2PCoin,
  P2POffer,
  P2PUser,
  RawP2PCoin,
  RawP2POffer,
  RawP2PUser,
} from "../types";

/**
 * Mapper para el usuario en una oferta P2P.
 */
function mapP2PUser(raw: RawP2PUser): P2PUser {
  return {
    uuid: raw.uuid,
    username: raw.username,
    name: raw.name,
    image: raw.image,
    kyc: raw.kyc,
    vip: raw.vip,
    goldenCheck: raw.golden_check,
  };
}

/**
 * Mapper para la moneda en una oferta P2P.
 */
function mapP2PCoin(raw: RawP2PCoin): P2PCoin {
  return { tick: raw.tick, name: raw.name, logo: raw.logo };
}

/**
 * Mapper para una oferta P2P completa.
 */
function mapP2POffer(raw: RawP2POffer): P2POffer {
  return {
    uuid: raw.uuid,
    type: raw.type_1,
    coin: raw.coin,
    amount: raw.amount,
    receive: raw.receive,
    status: raw.status,
    onlyKyc: raw.only_kyc,
    onlyVip: raw.only_vip,
    isPrivate: raw.private,
    message: raw.message,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
    user: mapP2PUser(raw.User),
    coinInfo: mapP2PCoin(raw.Coin),
  };
}

/**
 * Servicio para gestionar ofertas P2P (Compra/Venta).
 */
export class P2PService {
  constructor(private readonly http: AxiosInstance) {}

  /**
   * Lista las ofertas P2P actuales.
   */
  async list() {
    const { data } = await this.http.get<{current_page: number;per_page: number;total: number;data: RawP2POffer[];}>("/p2p");
    return data;
  }

  /**
   * Crea una nueva oferta P2P.
   */
  async create(params: CreateP2PParams): Promise<P2POffer> {
    if (params.amount <= 0) {
      throw new QvaPayValidationError("El monto debe ser mayor a 0", "amount");
    }
    if (params.receive <= 0) {
      throw new QvaPayValidationError(
        "El monto a recibir debe ser mayor a 0",
        "receive",
      );
    }
    if (!params.coin?.trim()) {
      throw new QvaPayValidationError("La moneda es requerida", "coin");
    }
    if (params.message && params.message.length > 79) {
      throw new QvaPayValidationError(
        "El mensaje debe tener 79 caracteres o menos",
        "message",
      );
    }
    const { data } = await this.http.post<{ msg: string; p2p: RawP2POffer }>(
      "/p2p",
      {
        type_1: params.type,
        coin: params.coin,
        amount: params.amount,
        receive: params.receive,
        details: params.details,
        only_kyc: params.onlyKyc ? 1 : 0,
        only_vip: params.onlyVip ? 1 : 0,
        private: params.isPrivate ? 1 : 0,
        ...(params.message !== undefined && { message: params.message }),
        ...(params.webhook !== undefined && { webhook: params.webhook }),
        ...(params.tags !== undefined && { tags: params.tags }),
      },
    );
    return mapP2POffer(data.p2p);
  }

  /**
   * Aplica a una oferta P2P existente.
   */
  async apply(uuid: string): Promise<P2POffer> {
    if (!uuid?.trim()) {
      throw new QvaPayValidationError("El UUID es requerido", "uuid");
    }
    const { data } = await this.http.post<RawP2POffer>(`/p2p/${uuid}/apply`);
    return mapP2POffer(data);
  }
}
