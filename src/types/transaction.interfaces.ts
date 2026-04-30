export interface TransferInterface {
  transfer_balance(): string;
}

export type TransactionTransferRequestType = {
  amount: String;
  to: String;
  pin: String;
  description: String;
};

export type TransactionTransferResponseType = {
  success: boolean;
  message: string;
  transaction: string;
};
