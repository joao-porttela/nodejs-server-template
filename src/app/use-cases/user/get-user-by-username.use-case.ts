import { IUserRepository } from "../../repositories/user.repository";

export type IGetUserByUsernameUseCase = ReturnType<typeof getUserByUsernameUseCase>;

export async function getUserByUsernameUseCase(UserRepository: IUserRepository) {
    return async function getUserByUsernameUseCase(username: string) {
        const response = await UserRepository.getUserByUsername(username);

        return response;
    }
}