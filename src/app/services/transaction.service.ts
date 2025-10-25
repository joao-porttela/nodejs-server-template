import { ITransaction } from "../../core/interfaces/transaction.interface.js";

export interface ITransactionService {
  startTransaction<T>(
    clb: (tx: ITransaction) => Promise<T>,
    parent?: ITransaction
  ): Promise<T>;
}