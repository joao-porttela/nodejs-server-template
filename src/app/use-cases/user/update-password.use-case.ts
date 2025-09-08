// App
import { AuthenticationError } from "../../../core/errors/auth.error";
import { IUserRepository } from "../../repositories/user.repository"
import { IAuthenticationService } from "../../services/auth.service";

export type IUpdatePasswordUseCase = ReturnType<typeof updatePasswordUseCase>;

export async function updatePasswordUseCase(UserRepository: IUserRepository, AuthenticationService: IAuthenticationService) {
    return async function updatePasswordUseCase({ _id, password, newPassword, confirmNewPassword }: { _id: string; password: string; newPassword: string; confirmNewPassword: string; }) {
        try {
            const userResponse = await UserRepository.getUser(_id);

            if (!userResponse || !userResponse.data) throw new Error("User not found");

            const { data: valid } = await AuthenticationService.validatePasswords(password, userResponse.data.data.password);

            if (!valid) throw new AuthenticationError("Incorrect Password");

            if (newPassword !== confirmNewPassword) throw new Error("Passwords don't match");

            const response = await UserRepository.updatePassword(_id, newPassword);

            return response;
        } catch (err: any) {
            console.log(`UPDATE_PASSWORD_USE_CASE: ${err.message}`);

            return {
                data: null,
                message: err.message,
                error: true, 
            }
        }
    }
}