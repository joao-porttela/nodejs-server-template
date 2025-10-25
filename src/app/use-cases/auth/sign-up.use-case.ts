// Core
import { USER_ROLE } from "../../../core/entities/user.interface";
import { InputParseError } from "../../../core/errors/common.error";
import { IResponse } from "../../../core/interfaces/response.interface";

// App
import { IUserRepository } from "../../repositories/user.repository";
import { IAuthenticationService } from "../../services/auth.service";

export type ISignUpUseCase = ReturnType<typeof signUpUseCase>;

export function signUpUseCase(UserRepository: IUserRepository, AuthenticationService: IAuthenticationService) {
    return async function ({ email, username, password, confirmPassword }: { email: string; username: string; password: string; confirmPassword: string }): Promise<IResponse<{ token: string } | null>> {
        const isMatch = password === confirmPassword;

        if (!isMatch) throw new InputParseError("Passwords don't match");

        const hashResponse = await AuthenticationService.hashPassword(password);

        if (hashResponse.error || !hashResponse.data) {
            throw new Error(hashResponse.message);
        }

        const input = {
            email,
            username,
            password: hashResponse.data.hash,
            role: USER_ROLE.USER
        };

        const userResponse = await UserRepository.createUser(input);

        if (userResponse.error) {
            throw new Error(userResponse.message);
        }

        const tokenResponse = await AuthenticationService.createToken(username, input.role);

        if (tokenResponse.error || !tokenResponse.data) {
            throw new Error(tokenResponse.message);
        }

        return {
            data: {
                token: tokenResponse.data.token
            },
            message: 'User signed up successfully',
            error: false
        };

    }
}