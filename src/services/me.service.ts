import type { AxiosInstance } from "axios";
import { QvaPayValidationError } from "../errors.ts";
import type { RawUser, TransferParams, TransferResult, User } from "../types.ts";

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

export class MeService {
  constructor(private readonly http: AxiosInstance) {}

  async getProfile(): Promise<User> {
    const { data } = await this.http.get<RawUser>("/me");
    return mapUser(data);
  }

  async transfer(params: TransferParams): Promise<TransferResult> {
    if (params.amount <= 0) {
      throw new QvaPayValidationError("amount must be greater than 0", "amount");
    }
    if (!params.to?.trim()) {
      throw new QvaPayValidationError("to is required", "to");
    }
    if (!params.pin?.trim()) {
      throw new QvaPayValidationError("pin is required", "pin");
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
