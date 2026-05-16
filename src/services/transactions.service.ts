import type { AxiosInstance } from "axios";
import { QvaPayValidationError } from "../errors";
import type {
  PaginatedResponse,
  RawPaginatedResponse,
  RawTransaction,
  Transaction,
  TransferParams,
  TransferResult,
} from "../types";
import { mapPaginated } from "../utils";
import { mapAppInfo } from "./app.service";

/**
 * Servicio para gestionar transacciones y transferencias.
 */
export class TransactionsService {
  constructor(private readonly http: AxiosInstance) {}

  /**
   * Lista las transacciones de la aplicación de forma paginada.
   */
  async list(page = 1): Promise<PaginatedResponse<Transaction>> {
    if (page < 1) {
      throw new QvaPayValidationError("La página debe ser mayor o igual a 1", "page");
    }
    const { data } = await this.http.get<RawPaginatedResponse<RawTransaction>>(
      "/transactions",
      { params: { page } },
    );
    return mapPaginated(data, mapTransaction);
  }

  /**
   * Obtiene los detalles de una transacción específica por su UUID.
   */
  async get(uuid: string): Promise<Transaction> {
    if (!uuid?.trim()) {
      throw new QvaPayValidationError("El UUID es requerido", "uuid");
    }
    const { data } = await this.http.get<RawTransaction>(
      `/transaction/${uuid}`,
    );
    return mapTransaction(data);
  }

  /**
   * Realiza una transferencia de saldo.
   */
  async transfer(props: TransferParams): Promise<TransferResult> {
    if (props.amount <= 0) {
      throw new QvaPayValidationError("El monto debe ser mayor a 0", "amount");
    }
    if (!props.to?.trim()) {
      throw new QvaPayValidationError("El destinatario es requerido", "to");
    }
    if (!props.pin?.trim()) {
      throw new QvaPayValidationError("El PIN es requerido", "pin");
    }
    const { data } = await this.http.post<TransferResult>(
      `/transaction/transfer`,
      {
        amount: props.amount.toFixed(2),
        to: props.to,
        pin: props.pin,
        ...(props.description !== undefined && { description: props.description }),
      },
    );
    return data;
  }

  /**
   * Paga una transacción pendiente.
   */
  async pay(id: string): Promise<TransferResult> {
    const { data } = await this.http.post<TransferResult>(`/transaction/${id}/pay`);
    return data;
  }
}

/**
 * Mapper para convertir una transacción cruda de la API al modelo Transaction.
 */
function mapTransaction(raw: RawTransaction): Transaction {
  return {
    uuid: raw.uuid,
    amount: raw.amount,
    currency: raw.currency,
    status: raw.status,
    description: raw.description,
    remoteId: raw.remote_id,
    paidAt: raw.paid_at,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
    app: mapAppInfo(raw.app),
  };
}
