// Dependecies
import z from "zod";

// Core
import { InputParseError } from "../../../core/errors/common.error";

// App
// |_ Use Cases
import { IGetUserByIdUseCase } from "../../../app/use-cases/user/get-user-by-id.use-case";
import { IGetUserByEmailUseCase } from "../../../app/use-cases/user/get-user-by-email.use-case";
import { IGetUserByUsernameUseCase } from "../../../app/use-cases/user/get-user-by-username.use-case";
import { IUpdateUserUseCase } from "../../../app/use-cases/user/update-user.use-case";
import { IUpdatePasswordUseCase } from "../../../app/use-cases/user/update-password.use-case";
import { IDeleteUserUseCase } from "../../../app/use-cases/user/delete-user.use-case";

// DTO
import { deleteUserDTO, getUserByEmailDTO, getUserByIdDTO, getUserByUsernameDTO, updatePasswordDTO, updateUserDTO } from "./DTO/user.dto";

export type IUserController = UserController;

export class UserController {
    constructor(
        private readonly _getUserByIdUseCase: IGetUserByIdUseCase,
        private readonly _getUserByEmailUseCase: IGetUserByEmailUseCase,
        private readonly _getUserByUsernameUseCase: IGetUserByUsernameUseCase,
        private readonly _updateUserUseCase: IUpdateUserUseCase,
        private readonly _updatePasswordUseCase: IUpdatePasswordUseCase,
        private readonly _deleteUserUseCase: IDeleteUserUseCase,
    ) { }

    async getUserById(input: z.infer<typeof getUserByIdDTO>) {
        try {
            const { data, error: inputParseError } = getUserByIdDTO.safeParse(input);

            if (inputParseError) throw new InputParseError(`Invalid data`);

            const getUserById = await this._getUserByIdUseCase
            const response = await getUserById(data._id);
            return response;
        } catch (err: any) {
            console.log(`❌ USER_CONTROLLER - GET_USER_BY_ID: ${err.message}`);

            return {
                data: null,
                message: err.message,
                error: true,
            }
        }
    }

    async getUserByEmail(input: z.infer<typeof getUserByEmailDTO>) {
        try {
            const { data, error: inputParseError } = getUserByEmailDTO.safeParse(input);

            if (inputParseError) throw new InputParseError(`Invalid data`);

            const getUserByEmail = await this._getUserByEmailUseCase;
            const response = await getUserByEmail(data.email);
            return response;
        } catch (err: any) {
            console.log(`❌ USER_CONTROLLER - GET_USER_BY_EMAIL: ${err.message}`);

            return {
                data: null,
                message: err.message,
                error: true,
            }
        }
    }

    async getUserByUsername(input: z.infer<typeof getUserByUsernameDTO>) {
        try {
            const { data, error: inputParseError } = getUserByUsernameDTO.safeParse(input);

            if (inputParseError) throw new InputParseError(`Invalid data`);

            const getUserByUsername = await this._getUserByUsernameUseCase
            const response = await getUserByUsername(data.username);
            return response;
        } catch (err: any) {
            console.log(`❌ USER_CONTROLLER - GET_USER_BY_USERNAME: ${err.message}`);

            return {
                data: null,
                message: err.message,
                error: true,
            }
        }
    }

    async updateUser(input: z.infer<typeof updateUserDTO>) {
        try {
            const { data, error: inputParseError } = updateUserDTO.safeParse(input);

            if (inputParseError) throw new InputParseError(`Invalid data`);

            const updateUser = await this._updateUserUseCase;
            const response = await updateUser(data._id, data.data);
            return response;
        } catch (err: any) {
            console.log(`❌ USER_CONTROLLER - UPDATE_USER: ${err.message}`);

            return {
                data: null,
                message: err.message,
                error: true,
            }
        }
    }

    async updatePassword(input: z.infer<typeof updatePasswordDTO>) {
        try {
            const { data, error: inputParseError } = updatePasswordDTO.safeParse(input);

            if (inputParseError) throw new Error(`Invalid data`);

            const updatePassword = await this._updatePasswordUseCase;
            const response = await updatePassword(data);
            return response;
        } catch (err: any) {
            console.log(`❌ USER_CONTROLLER - UPDATE_PASSWORD: ${err.message}`);

            return {
                data: null,
                message: err.message,
                error: true,
            }
        }
    }

    async deleteUser(input: z.infer<typeof deleteUserDTO>) {
        try {
            const { data, error: inputParseError } = updateUserDTO.safeParse(input);

            if (inputParseError) throw new InputParseError(`Invalid data`);

            const deleteUser = await this._deleteUserUseCase;
            const response = await deleteUser(data._id);
            return response;
        } catch (err: any) {
            console.log(`❌ USER_CONTROLLER - DELETE_USER: ${err.message}`);

            return {
                data: null,
                message: err.message,
                error: true,
            }
        }
    }
}