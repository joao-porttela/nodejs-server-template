import { IResponse } from "../../core/interfaces/response.interface";

export interface IAuthenticationService {
    createToken(username: string): Promise<IResponse<{ token: string } | null>>;
    validateToken(token: string): IResponse<{ valid: boolean }>;
    hashPassword(password: string): Promise<IResponse<{ hash: string } | null>>;
    validatePasswords(inputPassword: string, usersHashedPassword: string): Promise<IResponse<{ valid: boolean }>>;
}