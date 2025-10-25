import { createModule } from "@evyweb/ioctopus";
import { TransactionService } from "../../infrastructure/services/transaction.service.js";

export function createTransactionServiceModule() {
    const transactionManagerModule = createModule();

    // Services
    transactionManagerModule
        .bind(Symbol("ITransactionService"))
        .toClass(TransactionService);

    return transactionManagerModule;
};