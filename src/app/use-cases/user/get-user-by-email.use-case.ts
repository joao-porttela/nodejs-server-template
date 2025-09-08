import { IUserRepository } from "../../repositories/user.repository";

export type IGetUserByEmailUseCase = ReturnType<typeof getUserByEmailUseCase>;

export async function getUserByEmailUseCase(UserRepository: IUserRepository) {
    return async function getUserByEmailUseCase(email: string) {
        const response = await UserRepository.getUserByEmail(email);

        return response;
    }
}