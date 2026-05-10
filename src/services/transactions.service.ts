import type { AxiosInstance } from "axios";
import { QvaPayValidationError } from "../errors.ts";
import type {
  PaginatedResponse,
  RawPaginatedResponse,
  RawTransaction,
  Transaction,
  TransferParams,
  TransferResult,
} from "../types.ts";
import { mapPaginated } from "../utils.ts";
import { mapAppInfo } from "./app.service.ts";

export class TransactionsService {
  constructor(private readonly http: AxiosInstance) {}

  async list(page = 1): Promise<PaginatedResponse<Transaction>> {
    if (page < 1) {
      throw new QvaPayValidationError("page must be >= 1", "page");
    }
    const { data } = await this.http.get<RawPaginatedResponse<RawTransaction>>(
      "/transactions",
      { params: { page } },
    );
    return mapPaginated(data, mapTransaction);
  }

  async get(uuid: string): Promise<Transaction> {
    if (!uuid?.trim()) {
      throw new QvaPayValidationError("uuid is required", "uuid");
    }
    const { data } = await this.http.get<RawTransaction>(
      `/transaction/${uuid}`,
    );
    return mapTransaction(data);
  }

  async transfer(props: TransferParams): Promise<TransferResult> {
    const { data } = await this.http.post<TransferResult>(
      `/transaction/transfer`,
      props,
    );
    return data;
  }

  async pay(id: string): Promise<TransferResult> {
    const { data } = await this.http.post<TransferResult>(`/transaction/${id}/pay`,);
    return data;
  }
}

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
