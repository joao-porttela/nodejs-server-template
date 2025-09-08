// Core
import { IUser } from "../../core/entities/user.interface";
import { IResponse } from "../../core/interfaces/response.interface";

// App
import { IUserRepository } from "../../app/repositories/user.repository";
import { User } from "../models/user.model";

export class UserRepository implements IUserRepository {
    constructor() { }

    async createUser(input: IUser["data"]): Promise<IResponse<{ user: IUser } | null>> {
        try {
            const user = await User.create({
                data: {
                    email: input.email,
                    username: input.username,
                    password: input.password,
                    role: input.role,
                }
            });

            return {
                data: {
                    user
                },
                message: 'User created successfully',
                error: false,
            }
        } catch (err: any) {
            console.log(`❌ USER_REPOSITORY - CREATE_USER: ${err.message}`);

            return {
                data: null,
                message: err.message,
                error: true,
            }
        }
    }

    async getUser(_id: string): Promise<IResponse<{ user: IUser } | null>> {
        try {
            const user: IUser | null = await User.findById(_id);

            if (!user) throw new Error('User not found');

            return {
                data: {
                    user
                },
                message: 'User found',
                error: false,
            }
        } catch (err: any) {
            console.log(`❌ USER_REPOSITORY - GET_USER: ${err.message}`);

            return {
                data: null,
                message: err.message,
                error: true,
            }
        }
    }

    async getUserByEmail(email: string): Promise<IResponse<{ user: IUser } | null>> {
        try {
            const user: IUser | null = await User.findOne({
                "data.email": email
            });

            if (!user) throw new Error('User not found');

            return {
                data: {
                    user
                },
                message: 'User found',
                error: false,
            }
        } catch (err: any) {
            console.log(`❌ USER_REPOSITORY - GET_USER_BY_EMAIL: ${err.message}`);

            return {
                data: null,
                message: err.message,
                error: true,
            }
        }
    }

    async getUserByUsername(username: string): Promise<IResponse<{ user: IUser } | null>> {
        try {
            const user: IUser | null = await User.findOne({
                "data.username": username,
            });

            if (!user) throw new Error('User not found');

            return {
                data: {
                    user
                },
                message: 'User found',
                error: false,
            }
        } catch (err: any) {
            console.log(`❌ USER_REPOSITORY - GET_USER_BY_USERNAME: ${err.message}`);

            return {
                data: null,
                message: err.message,
                error: true,
            }
        }
    }

    async updateUser(_id: string, input: { email: string; username: string; }): Promise<IResponse<IUser | null>> {
        try {
            const user = await User.findOneAndUpdate({ _id }, {
                ...input
            });

            return {
                data: user,
                message: 'User updated successfully',
                error: false,
            }
        } catch (err: any) {
            console.log(`❌ USER_REPOSITORY - UPDATE_USER: ${err.message}`);

            return {
                data: null,
                message: err.message,
                error: true,
            }
        }
    }

    async updatePassword(_id: string, password: string): Promise<IResponse<IUser | null>> {
        try {
            const user = await User.findOneAndUpdate({ _id }, {
                password,
            })

            return {
                data: user,
                message: 'Password updated successfully',
                error: false,
            }
        } catch (err: any) {
            console.log(`❌ USER_REPOSITORY - UPDATE_PASSWORD: ${err.message}`);

            return {
                data: null,
                message: err.message,
                error: true,
            }
        }
    }

    async deleteUser(_id: string): Promise<IResponse<null>> {
        try {
            await User.deleteOne({ _id });

            return {
                data: null,
                message: 'User deleted successfully',
                error: false,
            }
        } catch (err: any) {
            console.log(`❌ USER_REPOSITORY - DELETE_USER: ${err.message}`);

            return {
                data: null,
                message: err.message,
                error: true,
            }
        }
    }
}