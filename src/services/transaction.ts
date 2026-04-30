import type { TransferInterface } from "../types/transaction.interfaces";

class TransactionService implements TransferInterface {
  transfer_balance(): string {
    throw new Error("Method not implemented.");
  }
}
