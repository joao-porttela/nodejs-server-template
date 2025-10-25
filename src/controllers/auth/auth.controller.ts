// Modules
import z from "zod";

// Core
import { IResponse } from "../../core/interfaces/response.interface";
import { InputParseError } from "../../core/errors/common.error";

// Use Cases
import { ISignInUseCase } from "../../app/use-cases/auth/sign-in.use-case";
import { ISignUpUseCase } from "../../app/use-cases/auth/sign-up.use-case";
import { IValidateTokenUseCase } from "../../app/use-cases/auth/validate-token.use-case";

// DTOs
import { signInDTO, signUpDTO, validateTokenDTO } from "../DTOs/auth.dto";

export class AuthController {
    constructor(
        private readonly _signInUseCase: ISignInUseCase,
        private readonly _signUpUseCase: ISignUpUseCase,
        private readonly _validateTokenUseCase: IValidateTokenUseCase
    ) { }

    public async signIn(input: z.infer<typeof signInDTO>): Promise<IResponse<{ token: string } | null>> {
        try {
            const { data, error: inputParseError } = signInDTO.safeParse(input);

            if (inputParseError) throw new InputParseError(`Invalid data`);

            const response = await this._signInUseCase(data);

            if (response.error) return response

            return response;
        } catch (err: any) {
            return {
                data: null,
                message: err.message || 'Opps! Something went wrong',
                error: true,
            }
        }
    }

    public async signUp(input: z.infer<typeof signUpDTO>): Promise<IResponse<{ token: string } | null>> {
        try {
            const { data, error: inputParseError } = signUpDTO.safeParse(input);

            if (inputParseError) throw new InputParseError(`Invalid data`);

            const response = await this._signUpUseCase(data);

            if (response.error) throw new Error(response.message);

            return response;
        } catch (err: any) {
            return {
                data: null,
                message: err.message || 'Opps! Something went wrong',
                error: true
            }
        }
    }

    public async validateToken(input: z.infer<typeof validateTokenDTO>): Promise<IResponse<{ valid: boolean }>> {
        try {
            const { data, error: inputParseError } = validateTokenDTO.safeParse(input);

            if (inputParseError) throw new InputParseError(`Invalid data`);

            const response = await this._validateTokenUseCase({ token: data.token });

            if (response.error) throw new Error(response.message);

            return response;
        } catch (err: any) {
            return {
                data: { valid: false },
                message: err.message || 'Opps! Something went wrong',
                error: true
            }
        }
    }
}