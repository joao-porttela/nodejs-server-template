// App
import { IUserRepository } from "../../repositories/user.repository"

export type IUpdateUserUseCase = ReturnType<typeof updateUserUseCase>;

export async function updateUserUseCase(UserRepository: IUserRepository) {
    return async function updateUserUseCase(_id: string, data: { email: string; username: string; }) {
        const response = await UserRepository.updateUser(_id, data);

        return response;
    }
}