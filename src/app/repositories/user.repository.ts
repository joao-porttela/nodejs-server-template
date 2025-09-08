import { IUser } from "../../core/entities/user.interface";
import { IResponse } from "../../core/interfaces/response.interface";

export interface IUserRepository {
    createUser(input: IUser['data']):               Promise<IResponse<{ user: IUser } | null>>;
    getUser(_id: string):                           Promise<IResponse<{ user: IUser } | null>>;
    getUserByEmail(email: string):                  Promise<IResponse<{ user: IUser } | null>>;
    getUserByUsername(username: string):            Promise<IResponse<{ user: IUser } | null>>;
    updateUser(_id: string, data: { email: string; username: string; }):  Promise<IResponse<IUser | null>>;
    updatePassword(_id: string, password: string):  Promise<IResponse<IUser | null>>;
    deleteUser(_id: string):                        Promise<IResponse<null>>;
}