// Repositories
import { IUserRepository } from "../app/repositories/user.repository";

// Services
import { IAuthenticationService } from "../app/services/auth.service";
import { ITransactionService } from "../app/services/transaction.service";

// Use Cases

// |_ Auth
import { ISignInUseCase } from "../app/use-cases/auth/sign-in.use-case";
import { ISignUpUseCase } from "../app/use-cases/auth/sign-up.use-case";
import { IValidateTokenUseCase } from "../app/use-cases/auth/validate-token.use-case";

// |_ User
import { IUpdatePasswordUseCase } from "../app/use-cases/user/update-password.use-case";

// Controllers
import { IAuthController, IUserController } from "../controllers/types/controllers.type";

// |__ Infrastructure
// |____ Models
import { IUserModel } from "../infrastructure/types/models.type";


export const DI_SYMBOLS = {
    // Repositories
    IUserRepository: Symbol.for("IUserRepository"),

    // Services
    IAuthenticationService: Symbol.for("IAuthenticationService"),
    ITransactionService: Symbol.for("ITransactionService"),

    // Use Cases

    // Auth
    ISignInUseCase: Symbol.for("ISignInUseCase"),
    ISignUpUseCase: Symbol.for("ISignUpUseCase"),
    IValidateTokenUseCase: Symbol.for("IValidateTokenUseCase"),

    // User
    IUpdatePasswordUseCase: Symbol.for("IUpdatePasswordUseCase"),

    // Controllers
    IAuthController: Symbol.for("IAuthController"),
    IUserController: Symbol.for("IUserController"),

    // Infrastructure
    // |___ Models
    IUserModel: Symbol.for("IUserModel"),
}

export interface DI_RETURN_TYPES {
    // Repositories
    IUserRepository: IUserRepository;

    // Services
    IAuthenticationService: IAuthenticationService;
    ITransactionService: ITransactionService;

    // Use Cases

    // Auth
    ISignInUseCase: ISignInUseCase;
    ISignUpUseCase: ISignUpUseCase;
    IValidateTokenUseCasse: IValidateTokenUseCase;

    // User
    IUpdatePasswordUseCase: IUpdatePasswordUseCase;

    // Controllers
    IAuthController: IAuthController;
    IUserController: IUserController;

    // Infrastructure
    // |___ Models
    IUserModel: IUserModel;
}