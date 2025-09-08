import { createModule } from "@evyweb/ioctopus";

import { DI_SYMBOLS } from "../types";

// App
// |_ Repositories
import { UserRepository } from "../../infrastructure/repositories/user.repository";

// |_ Use Cases
import { getUserByIdUseCase } from "../../app/use-cases/user/get-user-by-id.use-case";
import { getUserByEmailUseCase } from "../../app/use-cases/user/get-user-by-email.use-case";
import { getUserByUsernameUseCase } from "../../app/use-cases/user/get-user-by-username.use-case";
import { updateUserUseCase } from "../../app/use-cases/user/update-user.use-case";
import { updatePasswordUseCase } from "../../app/use-cases/user/update-password.use-case";
import { deleteUserUseCase } from "../../app/use-cases/user/delete-user.use-case";

// Controllers
import { UserController } from "../../interface-adapters/controllers/user/user.controller";

export function createUserModule() {
    const userModule = createModule();

    // Use Cases
    userModule.
        bind(DI_SYMBOLS.IGetUserByIdUseCase).
        toHigherOrderFunction(getUserByIdUseCase, [
            DI_SYMBOLS.IUserRepository,
        ]);

    userModule.
        bind(DI_SYMBOLS.IGetUserByEmailUseCase).
        toHigherOrderFunction(getUserByEmailUseCase, [
            DI_SYMBOLS.IUserRepository,
        ]);

    userModule.
        bind(DI_SYMBOLS.IGetUserByUsernameUseCase).
        toHigherOrderFunction(getUserByUsernameUseCase, [
            DI_SYMBOLS.IUserRepository,
        ]);

    userModule.
        bind(DI_SYMBOLS.IUpdateUserUseCase).
        toHigherOrderFunction(updateUserUseCase, [
            DI_SYMBOLS.IUserRepository,
        ]);

    userModule.
    bind(DI_SYMBOLS.IUpdatePasswordUseCase).
    toHigherOrderFunction(updatePasswordUseCase, [
        DI_SYMBOLS.IUserRepository,
        DI_SYMBOLS.IAuthenticationService
    ]);

    userModule.
        bind(DI_SYMBOLS.IDeleteUserUseCase).
        toHigherOrderFunction(deleteUserUseCase, [
            DI_SYMBOLS.IUserRepository,
        ]);

    // Controller
    userModule.
        bind(DI_SYMBOLS.IUserController).
        toClass(UserController, [
            DI_SYMBOLS.IGetUserByIdUseCase,
            DI_SYMBOLS.IGetUserByEmailUseCase,
            DI_SYMBOLS.IGetUserByUsernameUseCase,
            DI_SYMBOLS.IUpdateUserUseCase,
            DI_SYMBOLS.IUpdatePasswordUseCase,
            DI_SYMBOLS.IDeleteUserUseCase,
        ]);

    // Repository
    userModule.
        bind(DI_SYMBOLS.IUserRepository).
        toClass(UserRepository);

    return userModule;
}