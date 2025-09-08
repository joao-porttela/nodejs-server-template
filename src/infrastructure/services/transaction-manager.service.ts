import mongoose from "mongoose";

// Core
import { ITransaction } from "../../core/interfaces/transaction.interface";

// App
import { ITransactionManagerService } from "../../app/services/transaction-manager.service";

export class TransactionManagerService implements ITransactionManagerService {
  /**
   * Initiates a database transaction, executing the provided callback within the transaction context.
   *
   * @param clb - A callback function that receives a transaction object and returns a promise.
   * @param parent - An optional existing transaction to be used as the parent transaction.
   * @returns A promise that resolves with the result of the callback function executed within the transaction.
   */

  public async startTransaction<T>(
    clb: (tx: ITransaction) => Promise<T>,
    parent?: ITransaction
  ): Promise<T> {
    if (parent) {
      // If a parent transaction is provided, reuse its session
      return clb(parent);
    } else {
      // Otherwise, start a new session/transaction
      const session = await mongoose.startSession();
        let result: T;
        session.startTransaction();
        try {
            result = await clb(session as unknown as ITransaction);
            await session.commitTransaction();
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
        return await result;
    }
  }
}