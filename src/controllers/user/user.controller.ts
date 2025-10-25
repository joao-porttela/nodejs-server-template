// Dependecies
import z from "zod";
import createLogger from "logging";

// Core
import { InputParseError } from "../../core/errors/common.error.js";

// App
// |__ Repositories
import { IUserRepository } from "../../app/repositories/user.repository.js";

// |__ Use Cases
import { IUpdatePasswordUseCase } from "../../app/use-cases/user/update-password.use-case.js";

// DTO
import { getUserByEmailDTO, getUserByIdDTO, getUserByUsernameDTO, updatePasswordDTO, updateUserDTO, deleteUserDTO } from "../DTOs/user.dto.js";

const logger = createLogger('USER CONTROLLER');

export class UserController {
    constructor(
        // Repository
        private readonly _userRepository: IUserRepository,

        // Use Cases
        private readonly _updatePasswordUseCase: IUpdatePasswordUseCase,
    ) { }

    async getUserById(input: z.infer<typeof getUserByIdDTO>) {
        try {
            const { data, error: inputParseError } = getUserByIdDTO.safeParse(input);

            if (inputParseError) throw new InputParseError(`Invalid data`);

            const response = await this._userRepository.getUser(data._id);

            return response;
        } catch (err: any) {
            logger.error(`GET USER BY ID: ${err.message}`);

            return {
                data: null,
                message: err.message || 'Oops! Something went wrong',
                error: true,
            }
        }
    }

    async getUserByEmail(input: z.infer<typeof getUserByEmailDTO>) {
        try {
            const { data, error: inputParseError } = getUserByEmailDTO.safeParse(input);

            if (inputParseError) throw new InputParseError(`Invalid data`);

            const response = await this._userRepository.getUserByEmail(data.email);

            return response;;
        } catch (err: any) {
            logger.error(`GET USER BY EMAIL: ${err.message}`);

            return {
                data: null,
                message: err.message || 'Oops! Something went wrong',
                error: true,
            }
        }
    }

    async getUserByUsername(input: z.infer<typeof getUserByUsernameDTO>) {
        try {
            const { data, error: inputParseError } = getUserByUsernameDTO.safeParse(input);

            if (inputParseError) throw new InputParseError(`Invalid data`);

            const response = await this._userRepository.getUserByUsername(data.username);

            return response;
        } catch (err: any) {
            logger.error(`GET USER BY USERNAME: ${err.message}`);

            return {
                data: null,
                message: err.message || 'Oops! Something went wrong',
                error: true,
            }
        }
    }

    async updateUser(input: z.infer<typeof updateUserDTO>) {
        try {
            const { data, error: inputParseError } = updateUserDTO.safeParse(input);

            if (inputParseError) throw new InputParseError(`Invalid data`);

            const response = await this._userRepository.updateUser(data._id, data.data);

            return response;
        } catch (err: any) {
            logger.error(`UPDATE USER: ${err.message}`);

            return {
                data: null,
                message: err.message || 'Oops! Something went wrong',
                error: true,
            }
        }
    }

    async updatePassword(input: z.infer<typeof updatePasswordDTO>) {
        try {
            const { data, error: inputParseError } = updatePasswordDTO.safeParse(input);

            if (inputParseError) throw new Error(`Invalid data`);

            const response = await this._updatePasswordUseCase(data);
            return response;
        } catch (err: any) {
            logger.error(`UPDATE PASSWORD: ${err.message}`);

            return {
                data: null,
                message: err.message || 'Oops! Something went wrong',
                error: true,
            }
        }
    }

    async deleteUser(input: z.infer<typeof deleteUserDTO>) {
        try {
            const { data, error: inputParseError } = updateUserDTO.safeParse(input);

            if (inputParseError) throw new InputParseError(`Invalid data`);

            const response = await this._userRepository.deleteUser(data._id);

            return response;
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