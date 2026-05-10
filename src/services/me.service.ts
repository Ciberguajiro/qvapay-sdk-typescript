import type { AxiosInstance } from "axios";
import { QvaPayValidationError } from "../errors.ts";
import type { RawUser, TransferParams, TransferResult, User } from "../types.ts";

/**
 * Mapper para convertir el usuario crudo de la API al modelo User.
 */
function mapUser(raw: RawUser): User {
  return {
    uuid: raw.uuid,
    name: raw.name,
    username: raw.username,
    email: raw.email,
    photo: raw.photo,
    balance: raw.balance,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
  };
}

/**
 * Servicio para gestionar la información del usuario autenticado.
 */
export class MeService {
  constructor(private readonly http: AxiosInstance) {}

  /**
   * Obtiene el perfil del usuario autenticado.
   */
  async getProfile(): Promise<User> {
    const { data } = await this.http.get<RawUser>("/me");
    return mapUser(data);
  }

  /**
   * Realiza una transferencia de saldo a otro usuario.
   */
  async transfer(params: TransferParams): Promise<TransferResult> {
    if (params.amount <= 0) {
      throw new QvaPayValidationError("El monto debe ser mayor a 0", "amount");
    }
    if (!params.to?.trim()) {
      throw new QvaPayValidationError("El destinatario es requerido", "to");
    }
    if (!params.pin?.trim()) {
      throw new QvaPayValidationError("El PIN es requerido", "pin");
    }
    const { data } = await this.http.post<TransferResult>("/transfer", {
      amount: params.amount.toFixed(2),
      to: params.to,
      pin: params.pin,
      ...(params.description !== undefined && { description: params.description }),
    });
    return data;
  }
}
