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

export async function signInUseCase(UserRepository: IUserRepository, AuthenticationService: IAuthenticationService) {
  return async function signInUseCase({ username, password }: signInUseCaseProps): Promise<IResponse<{ token: string } | null>> {
    try {
      const response = await UserRepository.getUserByUsername(username);

      if (response.error || !response.data) throw new AuthenticationError(response.message);

      const user: IUser['data'] = response.data.user.data;

      const validPassword = await AuthenticationService.validatePasswords(
        password,
        user.password
      );

      if (!validPassword) throw new AuthenticationError("Incorrect credentials");
      
      return await AuthenticationService.createToken(user.username);
    } catch (err: any) {
      console.log(`❌ SIGN_IN_USE_CASE: ${err.message}`);

      return {
        data: null,
        message: err.message,
        error: true,
      }
    }
  }
}