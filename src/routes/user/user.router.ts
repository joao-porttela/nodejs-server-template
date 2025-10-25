import { Router, Request, Response } from "express";
import createLogger from "logging";

import { protect } from "../../middlewares/protect.js";

import { getInjection } from "../../DI/container.js";

const logger = createLogger('USER ROUTER');

const userRouter: Router = Router();

const userController = getInjection("IUserController");

userRouter.use('/', protect);

userRouter.get('/get-user-by-email/:email', async (req: Request, res: Response): Promise<any> => {
    try {
        const { email } = req.params;

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
        console.log(`GET USER BY EMAIL: ${err.message}`);

        return res.status(500).json({
            data: null,
            message: "Internal server error",
            error: true
        });
    }
});

userRouter.get('/get-user-by-username/:username', async (req: Request, res: Response): Promise<any> => {
    try {
        const { username } = req.params;

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
        console.log(`GET_USER_BY_USERNAME: ${err.message}`);

        return res.status(500).json({
            data: null,
            message: "Internal server error",
            error: true
        });
    }
});

userRouter.patch('/update-user', async (req: Request, res: Response): Promise<any> => {
    try {
        const { _id, data: { email, username } } = req.body;

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
        console.log(`UPDATE USER: ${err.message}`);

        return res.status(500).json({
            data: null,
            message: "Internal server error",
            error: true
        });
    }
});

userRouter.patch('/update-password', async (req: Request, res: Response): Promise<any> => {
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
        console.log(`UPDATE PASSWORD: ${err.message}`);

        return res.status(500).json({
            data: null,
            message: "Internal server error",
            error: true
        });
    }
});

userRouter.delete('/delete-user', async (req: Request, res: Response): Promise<any> => {
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
        console.log(`DELETE USER: ${err.message}`);

        return res.status(500).json({
            data: null,
            message: "Internal server error",
            error: true
        });
    }
});

export { userRouter };