export interface PagosServiceInterface {
  create_invoice(): string;
}

export type CreateInvoiceRequest = {
  amount: string;
  description: string;
  remote_id: string;
  webhook: string;
  products: string;
  expire_at: string;
};
