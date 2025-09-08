import { Router, Request, Response } from "express";

import { getInjection } from "../../DI/container";

const userRouter: Router = Router();

const userController = getInjection("IUserController");

userRouter.use('/get-user-by-id', async (req: Request, res: Response): Promise<any> => {
    try {
        const { _id } = req.body;

        if (!_id) {
            return res.status(400).json({
                data: null,
                message: "Missing required fields",
                error: true
            });
        }

        const response = await userController.getUserById({ _id });

        if (response.error) return res.status(404).json(response);

        return res.status(200).json(response);
    } catch (err: any) {
        console.log(`❌ USER_ROUTER - GET_USER_BY_ID: ${err.message}`);

        return res.status(500).json({
            data: null,
            message: "Internal server error",
            error: true
        });
    }
});

userRouter.use('/get-user-by-email', async (req: Request, res: Response): Promise<any> => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                data: null,
                message: "Missing required fields",
                error: true
            });
        }

        const response = await userController.getUserByEmail({ email });

        if (response.error) return res.status(404).json(response);

        return res.status(200).json(response);
    } catch (err: any) {
        console.log(`❌ USER_ROUTER - GET_USER_BY_EMAIL: ${err.message}`);

        return res.status(500).json({
            data: null,
            message: "Internal server error",
            error: true
        });
    }
});

userRouter.use('/get-user-by-username', async (req: Request, res: Response): Promise<any> => {
    try {
        const { username } = req.body;

        if (!username) {
            return res.status(400).json({
                data: null,
                message: "Missing required fields",
                error: true
            });
        }

        const response = await userController.getUserByUsername({ username });

        if (response.error) return res.status(404).json(response);

        return res.status(200).json(response);
    } catch (err: any) {
        console.log(`❌ USER_ROUTER - GET_USER_BY_USERNAME: ${err.message}`);

        return res.status(500).json({
            data: null,
            message: "Internal server error",
            error: true
        });
    }
});

userRouter.use('/update-user', async (req: Request, res: Response): Promise<any> => {
    try {
        const { _id, data: { email, username} } = req.body;

        if (!_id || (!email && !username)) {
            return res.status(400).json({
                data: null,
                message: "Missing required fields",
                error: true
            });
        }

        const response = await userController.updateUser({ _id, data: { email, username } });

        if (response.error) return res.status(400).json(response);

        return res.status(200).json(response);
    } catch (err: any) {
        console.log(`❌ USER_ROUTER - UPDATE_USER: ${err.message}`);

        return res.status(500).json({
            data: null,
            message: "Internal server error",
            error: true
        });
    }
});

userRouter.use('/update-password', async (req: Request, res: Response): Promise<any> => {
    try {
        const { _id, password, newPassword, confirmNewPassword } = req.body;

        if (!_id || !password || !newPassword || !confirmNewPassword) {
            return res.status(400).json({
                data: null,
                message: "Missing required fields",
                error: true
            });
        }

        const response = await userController.updatePassword({ _id, password, newPassword, confirmNewPassword });

        if (response.error) return res.status(400).json(response);

        return res.status(200).json(response);
    } catch (err: any) {
        console.log(`❌ USER_ROUTER - UPDATE_PASSWORD: ${err.message}`);

        return res.status(500).json({
            data: null,
            message: "Internal server error",
            error: true
        });
    }
});

userRouter.use('/delete-user', async (req: Request, res: Response): Promise<any> => {
    try {
        const { _id } = req.body;

        if (!_id) {
            return res.status(400).json({
                data: null,
                message: "Missing required fields",
                error: true
            });
        }

        const response = await userController.deleteUser({ _id });

        if (response.error) return res.status(400).json(response);
        
        return res.status(200).json(response);
    } catch (err: any) {
        console.log(`❌ USER_ROUTER - DELETE_USER: ${err.message}`);

        return res.status(500).json({
            data: null,
            message: "Internal server error",
            error: true
        });
    }
});

export { userRouter };