// Modules
import { ClientSession } from "mongoose";
import createLogger from "logging";

// Core
import { IUser } from "../../core/entities/user.interface.js";
import { IResponse } from "../../core/interfaces/response.interface.js";

// App
import { IUserRepository } from "../../app/repositories/user.repository.js";

// Infrastructure
// |__ Models
import { IUserModel } from "../types/models.type.js";

const logger = createLogger('USER REPOSITORY');

export class UserRepository implements IUserRepository {
    constructor(
        private readonly _user: IUserModel,
    ) { }

    async createUser(input: IUser): Promise<IResponse<{ user: IUser } | null>> {
        try {
            const user = await this._user.create({
                email: input.email,
                username: input.username,
                password: input.password,
                role: input.role,
            });

            return {
                data: {
                    user
                },
                message: 'User created successfully',
                error: false,
            }
        } catch (err: any) {
            logger.error(`CREATE USER: ${err.message}`);

            return {
                data: null,
                message: err.message || 'Oops! Something went wrong',
                error: true,
            }
        }
    }

    async getUser(_id: string, select = true): Promise<IResponse<{ user: IUser } | null>> {
        try {
            const user = await this._user.findById(_id).select(select ? "-password" : "");

            if (!user) throw new Error('User not found');

            return {
                data: {
                    user
                },
                message: 'User found',
                error: false,
            }
        } catch (err: any) {
            logger.error(`GET USER: ${err.message}`);

            return {
                data: null,
                message: err.message || 'Oops! Something went wrong',
                error: true,
            }
        }
    }

    async getUserByEmail(email: string, select = true): Promise<IResponse<{ user: IUser } | null>> {
        try {
            const user = await this._user.findOne({ email }).select(select ? "-password" : "");

            if (!user) throw new Error('User not found');

            return {
                data: {
                    user
                },
                message: 'User found',
                error: false,
            }
        } catch (err: any) {
            logger.error(`GET USER BY EMAIL: ${err.message}`);

            return {
                data: null,
                message: err.message || 'Oops! Something went wrong',
                error: true,
            }
        }
    }

    async getUserByUsername(username: string, select = true): Promise<IResponse<{ user: IUser } | null>> {
        try {
            const user = await this._user.findOne({ username: username }).select(select ? "-password" : "");

            if (!user) throw new Error('User not found');

            return {
                data: {
                    user
                },
                message: 'User found',
                error: false,
            }
        } catch (err: any) {
            logger.error(`GET USER BY USERNAME: ${err.message}`);

            return {
                data: null,
                message: err.message || 'Oops! Something went wrong',
                error: true,
            }
        }
    }

    async updateUser(_id: string, input: { email?: string; username?: string; customerId?: string }, session?: ClientSession): Promise<IResponse<{ user: IUser } | null>> {
        try {
            const user: IUser | null = await this._user.findByIdAndUpdate(
                _id,
                { ...input },
                {
                    new: true,
                    session
                }
            );

            if (!user) throw new Error('User not found');

            return {
                data: {
                    user: user
                },
                message: 'User updated successfully',
                error: false,
            }
        } catch (err: any) {
            logger.error(`UPDATE USER: ${err.message}`);

            return {
                data: null,
                message: err.message || 'Oops! Something went wrong',
                error: true,
            }
        }
    }

    async updatePassword(_id: string, password: string): Promise<IResponse<IUser | null>> {
        try {
            const user = await this._user.findOneAndUpdate({ _id }, {
                password,
            })

            return {
                data: user,
                message: 'Password updated successfully',
                error: false,
            }
        } catch (err: any) {
            logger.error(`UPDATE PASSWORD: ${err.message}`);

            return {
                data: null,
                message: err.message || 'Oops! Something went wrong',
                error: true,
            }
        }
    }

    async deleteUser(_id: string): Promise<IResponse<null>> {
        try {
            await this._user.deleteOne({ _id });

            return {
                data: null,
                message: 'User deleted successfully',
                error: false,
            }
        } catch (err: any) {
            logger.error(`DELETE USER: ${err.message}`);

            return {
                data: null,
                message: err.message || 'Oops! Something went wrong',
                error: true,
            }
        }
    }
}