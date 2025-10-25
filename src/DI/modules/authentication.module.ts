import { createModule } from "@evyweb/ioctopus";

import { DI_SYMBOLS } from "../types.js";

// Use Cases
import { signInUseCase } from "../../app/use-cases/auth/sign-in.use-case.js";
import { signUpUseCase } from "../../app/use-cases/auth/sign-up.use-case.js";
import { validateTokenUseCase } from "../../app/use-cases/auth/validate-token.use-case.js";

// Services
import { AuthenticationService } from "../../infrastructure/services/auth.service.js";

// Controllers
import { AuthController } from "../../controllers/auth/auth.controller.js";

export function createAuthenticationModule() {
    const authenticationModule = createModule();

    // Use Cases
    authenticationModule
        .bind(DI_SYMBOLS.ISignInUseCase)
        .toHigherOrderFunction(signInUseCase, [
            DI_SYMBOLS.IUserRepository,
            DI_SYMBOLS.IAuthenticationService,
        ]);

    authenticationModule.
        bind(DI_SYMBOLS.ISignUpUseCase).
        toHigherOrderFunction(signUpUseCase, [
            DI_SYMBOLS.IUserRepository,
            DI_SYMBOLS.IAuthenticationService,
        ])

    authenticationModule
        .bind(DI_SYMBOLS.IValidateTokenUseCase)
        .toHigherOrderFunction(validateTokenUseCase, [
            DI_SYMBOLS.IAuthenticationService
        ])

    // Services
    authenticationModule
        .bind(DI_SYMBOLS.IAuthenticationService)
        .toClass(AuthenticationService);

    // Controllers
    authenticationModule.
        bind(DI_SYMBOLS.IAuthController).
        toClass(AuthController, [
            DI_SYMBOLS.ISignInUseCase,
            DI_SYMBOLS.ISignUpUseCase,
            DI_SYMBOLS.IValidateTokenUseCase,
        ])

    return authenticationModule;
}