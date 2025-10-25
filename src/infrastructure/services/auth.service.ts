// Modules
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

// Core
import { IResponse } from "../../core/interfaces/response.interface.js";

// Interfaces
import { IAuthenticationService } from "../../app/services/auth.service.js";

// Config
import { PRIVATE_KEY, PUBLIC_KEY } from "../../config.js";

export class AuthenticationService implements IAuthenticationService {
    private readonly _privateKey = PRIVATE_KEY;
    private readonly _publickKey = PUBLIC_KEY;

    constructor() { }

    async createToken(username: string): Promise<IResponse<{ token: string } | null>> {
        try {
            const token: string = jwt.sign(username, this._privateKey, { algorithm: 'RS256' });

            const response: IResponse<{ token: string }> = {
                data: {
                    token
                },
                message: 'Token created successfully',
                error: false
            }

            return response;
        } catch (err: any) {
            console.log(`❌ AUTH.SERVICE - CREATE_TOKEN: ${err.message}`);

            return {
                data: null,
                message: 'Opps! Something went wrong',
                error: true,
            }
        }
    }

    validateToken(token: string): IResponse<{ valid: boolean }> {
        try {
            jwt.verify(token, this._publickKey, { algorithms: ["RS256"] }, (err, decoded) => {
                if (err) throw new Error(err.message);
            });

            const response = {
                data: {
                    valid: true,
                },
                message: 'Token is valid',
                error: false,
            }

            return response
        } catch (err: any) {
            console.log(`❌ AUTH.SERVICE - VALIDATE_TOKEN: ${err.message}`);

            return {
                data: { valid: false },
                message: 'Opps! Something went wrong',
                error: true,
            }
        }
    }

    async hashPassword(password: string): Promise<IResponse<{ hash: string } | null>> {
        try {
            const salt = await bcrypt.genSalt(8);
            const hash = await bcrypt.hash(password, salt);

            return {
                data: { hash },
                message: "Password hashed successfully",
                error: false,
            }
        } catch (err: any) {
            console.log(`❌ AUTH.SERVICE - HASH_PASSWORD: ${err.message}`);

            return {
                data: null,
                message: 'Opps! Something went wrong',
                error: true,
            }
        }
    }

    async validatePasswords(inputPassword: string, usersHashedPassword: string): Promise<IResponse<{ valid: boolean }>> {
        try {
            const valid = await bcrypt.compare(inputPassword, usersHashedPassword);

            const response: IResponse<{ valid: boolean }> = {
                data: {
                    valid,
                },
                message: 'Passwords match',
                error: false
            }

            return response;
        } catch (err: any) {
            console.log(`❌ AUTH.SERVICE - VALIDATE_PASSWORDS: ${err.message}`);

            return {
                data: {
                    valid: false,
                },
                message: 'Passwords do not match',
                error: true,
            }
        }
    }
}