import { createContainer } from "@evyweb/ioctopus";

import { DI_SYMBOLS, DI_RETURN_TYPES } from "./types";

import { createAuthenticationModule } from "./modules/authentication.module";
import { createTransactionServiceModule } from "./modules/transaction.module";
import { createUserModule } from "./modules/user.module";

const ApplicationContainer = createContainer();

ApplicationContainer.load(Symbol("AuthenticationModule"), createAuthenticationModule());
ApplicationContainer.load(Symbol("TransactionModule"), createTransactionServiceModule());
ApplicationContainer.load(Symbol("UserModule"), createUserModule());

/**
 * Retrieves an instance from the dependency injection container based on the provided symbol.
 *
 * @template K - The type of the symbol, which must be a key of the `DI_SYMBOLS` object.
 * @param symbol - The symbol representing the dependency to be retrieved.
 * @returns The retrieved instance from the dependency injection container.
 */

export function getInjection<K extends keyof typeof DI_SYMBOLS & keyof DI_RETURN_TYPES>(
  symbol: K
): DI_RETURN_TYPES[K] {
  return ApplicationContainer.get(DI_SYMBOLS[symbol]) as DI_RETURN_TYPES[K]
}