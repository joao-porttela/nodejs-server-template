import { IUser } from "../../core/entities/user.interface.js";
import { IResponse } from "../../core/interfaces/response.interface.js";

export interface IUserRepository {
    createUser(input: IUser): Promise<IResponse<{ user: IUser } | null>>;
    getUser(_id: string, select?: boolean): Promise<IResponse<{ user: IUser } | null>>;
    getUserByEmail(email: string, select?: boolean): Promise<IResponse<{ user: IUser } | null>>;
    getUserByUsername(username: string, select?: boolean): Promise<IResponse<{ user: IUser } | null>>;
    updateUser(_id: string, data: { email?: string; username?: string; customerId?: string }, session?: unknown): Promise<IResponse<{ user: IUser } | null>>;
    updatePassword(_id: string, password: string): Promise<IResponse<IUser | null>>;
    deleteUser(_id: string): Promise<IResponse<null>>;
}