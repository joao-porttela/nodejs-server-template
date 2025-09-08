// Repositories
import { IUserRepository } from "../app/repositories/user.repository";

// Services
import { IAuthenticationService } from "../app/services/auth.service";
import { ITransactionManagerService } from "../app/services/transaction-manager.service";

// Use Cases

// |_ Auth
import { ISignInUseCase } from "../app/use-cases/auth/sign-in.use-case";
import { ISignUpUseCase } from "../app/use-cases/auth/sign-up.use-case";
import { IValidateTokenUseCase } from "../app/use-cases/auth/validate-token.use-case";

// |_ User
import { IGetUserByIdUseCase } from "../app/use-cases/user/get-user-by-id.use-case";
import { IGetUserByEmailUseCase } from "../app/use-cases/user/get-user-by-email.use-case";
import { IGetUserByUsernameUseCase } from "../app/use-cases/user/get-user-by-username.use-case";
import { IUpdateUserUseCase } from "../app/use-cases/user/update-user.use-case";
import { IUpdatePasswordUseCase } from "../app/use-cases/user/update-password.use-case";
import { IDeleteUserUseCase } from "../app/use-cases/user/delete-user.use-case";

// Controllers
import { IAuthController } from "../interface-adapters/controllers/auth/auth.controller";
import { IUserController } from "../interface-adapters/controllers/user/user.controller";


export const DI_SYMBOLS = {
    // Repositories
    IUserRepository: Symbol.for("IUserRepository"),

    // Services
    IAuthenticationService: Symbol.for("IAuthenticationService"),
    ITransactionManagerService: Symbol.for("ITransactionManagerService"),

    // Use Cases

    // Auth
    ISignInUseCase: Symbol.for("ISignInUseCase"),
    ISignUpUseCase: Symbol.for("ISignUpUseCase"),
    IValidateTokenUseCase: Symbol.for("IValidateTokenUseCase"),

    // User
    IGetUserByIdUseCase: Symbol.for("IGetUserByIdUseCase"),
    IGetUserByEmailUseCase: Symbol.for("IGetUserByEmailUseCase"),
    IGetUserByUsernameUseCase: Symbol.for("IGetUserByUsernameUseCase"),
    IUpdateUserUseCase: Symbol.for("IUpdateUserUseCase"),
    IUpdatePasswordUseCase: Symbol.for("IUpdatePasswordUseCase"),
    IDeleteUserUseCase: Symbol.for("IDeleteUserUseCase"),

    // Controllers
    IAuthController: Symbol.for("IAuthController"),
    IUserController: Symbol.for("IUserController"),
}

export interface DI_RETURN_TYPES {
    // Repositories
    IUserRepository: IUserRepository;

    // Services
    IAuthenticationService: IAuthenticationService;
    ITransactionManagerService: ITransactionManagerService;

    // Use Cases

    // Auth
    ISignInUseCase: ISignInUseCase;
    ISignUpUseCase: ISignUpUseCase;
    IValidateTokenUseCasse: IValidateTokenUseCase;

    // User
    IGetUserByIdUseCase: IGetUserByIdUseCase;
    IGetUserByEmailUseCase: IGetUserByEmailUseCase;
    IGetUserByUsernameUseCase: IGetUserByUsernameUseCase;
    IUpdateUserUseCase: IUpdateUserUseCase;
    IUpdatePasswordUseCase: IUpdatePasswordUseCase;
    IDeleteUserUseCase: IDeleteUserUseCase;

    // Controllers
    IAuthController: IAuthController;
    IUserController: IUserController;
}