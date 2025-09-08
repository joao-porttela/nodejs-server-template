import { IUserRepository } from "../../repositories/user.repository";

export type IDeleteUserUseCase = ReturnType<typeof deleteUserUseCase>;

export async function deleteUserUseCase(UserRepository: IUserRepository) {
    return async function deleteUserUseCase(_id: string) {
        const response = await UserRepository.deleteUser(_id);

        return response;
    }
}