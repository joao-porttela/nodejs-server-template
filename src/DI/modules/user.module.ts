import { createModule } from "@evyweb/ioctopus";

import { DI_SYMBOLS } from "../types.js";

// App
// |_ Repositories
import { UserRepository } from "../../infrastructure/repositories/user.repository.js";

// |_ Use Cases
import { updatePasswordUseCase } from "../../app/use-cases/user/update-password.use-case.js";

// Controllers
import { UserController } from "../../controllers/user/user.controller.js";

// Infrastructure
import { User } from "../../infrastructure/models/user.model.js";

export function createUserModule() {
    const userModule = createModule();

    // Repository
    userModule.
        bind(DI_SYMBOLS.IUserRepository).
        toClass(UserRepository, [
            DI_SYMBOLS.IUserModel
        ]);

    // Use Cases
    userModule.
        bind(DI_SYMBOLS.IUpdatePasswordUseCase).
        toHigherOrderFunction(updatePasswordUseCase, [
            DI_SYMBOLS.IUserRepository,
            DI_SYMBOLS.IAuthenticationService
        ]);

    // Controller
    userModule.
        bind(DI_SYMBOLS.IUserController).
        toClass(UserController, [
            DI_SYMBOLS.IUserRepository,
        ]);

    // Infrastructure
    userModule.
        bind(DI_SYMBOLS.IUserModel).
        toValue(User)

    return userModule;
}