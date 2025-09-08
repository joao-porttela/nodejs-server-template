import { IUser } from "../../../core/entities/user.interface";
import { IResponse } from "../../../core/interfaces/response.interface";
import { IUserRepository } from "../../repositories/user.repository";

export type IGetUserByIdUseCase = ReturnType<typeof getUserByIdUseCase>;

export async function getUserByIdUseCase(UserRepository: IUserRepository) {
    return async function getUserByIdUseCase(_id: string): Promise<IResponse<IUser | null>> {
        const response = await UserRepository.getUser(_id);

        return response;
    }
}