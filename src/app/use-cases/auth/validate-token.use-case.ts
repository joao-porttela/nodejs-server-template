import { IResponse } from "../../../core/interfaces/response.interface.js";

import { IAuthenticationService } from "../../services/auth.service.js";

interface validateTokenUseCaseProps {
    token: string
}

export type IValidateTokenUseCase = ReturnType<typeof validateTokenUseCase>;

export function validateTokenUseCase(AuthenticationService: IAuthenticationService) {
    return async function validateTokenUseCase({ token }: validateTokenUseCaseProps): Promise<IResponse<{ valid: boolean }>> {
        const response = AuthenticationService.validateToken(token);

        return response;
    }
}