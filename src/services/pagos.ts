import type { CreateInvoiceRequest, InvoiceResponse, PagosServiceInterface } from "../types/pagos.intefaces";

class PagosService implements PagosServiceInterface {
  create_invoice(props: CreateInvoiceRequest): InvoiceResponse {
    throw new Error("Method not implemented.");
  }
}
