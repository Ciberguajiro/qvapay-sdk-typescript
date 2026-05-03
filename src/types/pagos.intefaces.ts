export interface PagosServiceInterface {
  create_invoice(props: CreateInvoiceRequest): InvoiceResponse;
}

/// Request to create a new invoice (payment).
export type CreateInvoiceRequest = {
  /// Amount to be paid.
  amount: number;
  /// Description of the payment.
  description: String;
  /// External identifier from your system.
  remote_id: String;
  /// Optional webhook URL for payment notifications.
  webhook?: String;
  /// Optional list of products.
  products: ProductInvoice[];
  /// Optional expiration date in ISO 8601 format.
  expire_at?: String;
};

/// Product details within an invoice.
export type ProductInvoice = {
  name: String;
  price: number;
  quantity: number;
};

/// Response containing the created invoice details.
export type InvoiceResponse = {
  app_id: String;
  amount: number;
  description: String;
  remote_id: String;
  transaction_uuid: String;
  expire_at?: String;
  url: String;
};
