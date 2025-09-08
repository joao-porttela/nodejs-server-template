// Modules
import z from "zod";

// Use Cases
import { ISignInUseCase } from "../../../app/use-cases/auth/sign-in.use-case";
import { ISignUpUseCase } from "../../../app/use-cases/auth/sign-up.use-case";
import { IValidateTokenUseCase } from "../../../app/use-cases/auth/validate-token.use-case";

// DTOs
import { signInDTO, signUpDTO, validateTokenDTO } from "./DTO/auth.dto";

export type IAuthController = AuthController;

export class AuthController {
    constructor(
        private readonly _signInUseCase: ISignInUseCase,
        private readonly _signUpUseCase: ISignUpUseCase,
        private readonly _validateTokenUseCase: IValidateTokenUseCase
    ) { }

    public async signIn(input: z.infer<typeof signInDTO>) {
        const signInUseCase = await this._signInUseCase;
        const response = await signInUseCase(input);
        return response;
    }

    public async signUp(input: z.infer<typeof signUpDTO>) {
        const signUpUseCase = await this._signUpUseCase;
        const response = await signUpUseCase(input);
        return response;
    }

    public async validateToken(input: z.infer<typeof validateTokenDTO>) {
        const validateToken = await this._validateTokenUseCase;
        const response = await validateToken({ token: input.token });
        return response;
    }
}