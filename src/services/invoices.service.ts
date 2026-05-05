import type { AxiosInstance } from "axios";
import { QvaPayValidationError } from "../errors.ts";
import type { CreateInvoiceParams, Invoice, RawInvoice } from "../types.ts";

function mapInvoice(raw: RawInvoice): Invoice {
  return {
    uuid: raw.uuid,
    amount: raw.amount,
    description: raw.description,
    remoteId: raw.remote_id,
    signedUrl: raw.signed_url,
    url: raw.url,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
  };
}

export class InvoicesService {
  constructor(private readonly http: AxiosInstance) {}

  async create(params: CreateInvoiceParams): Promise<Invoice> {
    if (params.amount <= 0) {
      throw new QvaPayValidationError("amount must be greater than 0", "amount");
    }
    if (!params.description?.trim()) {
      throw new QvaPayValidationError("description is required", "description");
    }
    if (params.description.length > 300) {
      throw new QvaPayValidationError(
        "description must be 300 characters or less",
        "description"
      );
    }
    const { data } = await this.http.get<RawInvoice>("/create_invoice", {
      params: {
        amount: params.amount.toFixed(2),
        description: params.description,
        ...(params.remoteId !== undefined && { remote_id: params.remoteId }),
        signed: params.signed ? 1 : 0,
      },
    });
    return mapInvoice(data);
  }
}
