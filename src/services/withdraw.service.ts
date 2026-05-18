import type { AxiosInstance } from "axios";
import { QvaPayValidationError } from "../errors";
import type {
  CreateWithdrawParams,
  CreateWithdrawResult,
  RawCreateWithdrawResult,
  RawWithdraw,
  RawWithdrawListResult,
  Withdraw,
  WithdrawListResult,
} from "../types";

function mapWithdraw(raw: RawWithdraw): Withdraw {
  return {
    withdrawId: raw.withdraw_id,
    transactionId: raw.transaction_id,
    receiveAmount: raw.receive_amount,
    receiveAmountCoin: raw.receive_amount_coin,
    feeToApply: raw.fee_to_apply,
    amount: raw.amount,
    coin: raw.coin,
    status: raw.status,
    paymentMethod: raw.payment_method,
    txId: raw.tx_id,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
  };
}

function mapCreateWithdrawResult(raw: RawCreateWithdrawResult): CreateWithdrawResult {
  return {
    withdrawId: raw.withdraw_id,
    transactionId: raw.transaction_id,
    receiveAmount: raw.receive_amount,
    receiveAmountCoin: raw.receive_amount_coin,
    feeToApply: raw.fee_to_apply,
    amount: raw.amount,
    coin: raw.coin,
  };
}

export class WithdrawService {
  constructor(private readonly http: AxiosInstance) {}

  async list(): Promise<WithdrawListResult> {
    const { data } = await this.http.get<RawWithdrawListResult>("/withdraw");
    return {
      result: data.result,
      data: data.data.map(mapWithdraw),
    };
  }

  async create(params: CreateWithdrawParams): Promise<CreateWithdrawResult> {
    if (params.amount < 1) {
      throw new QvaPayValidationError("El monto mínimo es 1 USD", "amount");
    }
    if (params.amount > 100_000) {
      throw new QvaPayValidationError(
        "El monto no puede exceder 100,000 USD",
        "amount",
      );
    }
    if (!params.payMethod?.trim()) {
      throw new QvaPayValidationError(
        "El método de pago es requerido",
        "payMethod",
      );
    }
    if (!params.details || Object.keys(params.details).length === 0) {
      throw new QvaPayValidationError("Los detalles son requeridos", "details");
    }
    const { data } = await this.http.post<RawCreateWithdrawResult>(
      "/withdraw",
      {
        amount: params.amount,
        pay_method: params.payMethod,
        details: params.details,
        ...(params.pin && { pin: params.pin }),
        ...(params.note && { note: params.note }),
        ...(params.webhook && { webhook: params.webhook }),
      },
    );
    return mapCreateWithdrawResult(data);
  }
}
