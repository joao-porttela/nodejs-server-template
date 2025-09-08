// Core
import { USER_ROLE } from "../../../core/entities/user.interface";
import { InputParseError } from "../../../core/errors/common.error";
import { IResponse } from "../../../core/interfaces/response.interface";

// App
import { IUserRepository } from "../../repositories/user.repository";
import { IAuthenticationService } from "../../services/auth.service";

export type ISignUpUseCase = ReturnType<typeof signUpUseCase>;

export async function signUpUseCase(UserRepository: IUserRepository, AuthenticationService: IAuthenticationService) {
    return async function signUpUseCase({ email, username, password, confirmPassword }: { email: string; username: string; password: string; confirmPassword: string }): Promise<IResponse<{ token: string } | null>> {
        try {
            const isMatch = password === confirmPassword;

            if (!isMatch) throw new InputParseError("Passwords don't match");

            const fn = async (err: Error | undefined, hash: string) => {
                try {
                    if (err) throw new Error(err.message);

                    const input = {
                        email,
                        username,
                        password: hash,
                        role: USER_ROLE.USER
                    }

                    await UserRepository.createUser(input);
                } catch (err: any) {
                    console.log(`❌ SIGN_UP_USE_CASE - HASH_PASSWORD: ${err.message}`);

                    throw new Error('Opps! Something went wrong');
                }
            }

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

            const tokenResponse = await AuthenticationService.createToken(username);

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
        } catch (err: any) {
            console.log(`❌ SIGN_UP_USE_CASE: ${err.message}`);

            return { data: null, message: err.message, error: true }
        }
    }
}