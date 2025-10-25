// Core
import { IUser } from "../../../core/entities/user.interface";
import { IResponse } from "../../../core/interfaces/response.interface";
import { AuthenticationError } from "../../../core/errors/auth.error";

// App
import { IUserRepository } from "../../repositories/user.repository";
import { IAuthenticationService } from "../../services/auth.service";

interface signInUseCaseProps {
  username: string;
  password: string;
}

export type ISignInUseCase = ReturnType<typeof signInUseCase>;

export function signInUseCase(UserRepository: IUserRepository, AuthenticationService: IAuthenticationService) {
  return async function ({ username, password }: signInUseCaseProps): Promise<IResponse<{ token: string } | null>> {
    const response = await UserRepository.getUserByUsername(username, false);

    if (response.error || !response.data) throw new AuthenticationError(response.message);

    const user: IUser = response.data.user;

    const validPassword = await AuthenticationService.validatePasswords(
      password,
      user.password
    );

    if (!validPassword || !validPassword.data.valid) throw new AuthenticationError("Incorrect credentials");

    return await AuthenticationService.createToken(user.username, user.role!);
  }
}