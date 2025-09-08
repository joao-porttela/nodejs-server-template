import { createModule } from "@evyweb/ioctopus";
import { TransactionManagerService } from "../../infrastructure/services/transaction-manager.service";

export function createTransactionManagerService() {
    const transactionManagerModule = createModule();

    // Services
    transactionManagerModule
        .bind(Symbol("ITransactionManagerService"))
        .toClass(TransactionManagerService);

    return transactionManagerModule;
};