import { Router, Request, Response } from "express";
import createLogger from "logging";

import { getInjection } from "../../DI/container.js";

const authRouter: Router = Router();

const authController = getInjection("IAuthController");

const logger = createLogger('AUTH ROUTER');

authRouter.post('/sign-up', async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, username, password, confirmPassword } = req.body;

        if (!email || !username || !password || !confirmPassword) {
            return res.status(400).json({
                data: null,
                message: "Missing required fields",
                error: true
            });
        }

        const response = await authController.signUp({ email, username, password, confirmPassword });

        if (response.error) return res.status(400).json(response);

        return res.status(200).json(response);
    } catch (err: any) {
        logger.error(`SIGN UP: ${err.message}`);

        return res.status(500).json({
            data: null,
            message: "Internal server error",
            error: true
        });
    }
});

authRouter.post('/login', async (req: Request, res: Response): Promise<any> => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                data: null,
                message: "Missing required fields",
                error: true
            });
        }

        const response = await authController.signIn({
            username,
            password,
        });


        if (response.error) return res.status(401).json(response);

        return res.status(200).json(response);
    } catch (err: any) {
        logger.error(`LOGIN: ${err.message}`);

        return res.status(500).json({
            data: null,
            message: "Internal server error",
            error: true
        });
    }
});

authRouter.use('/verify-token', async (req: Request, res: Response): Promise<any> => {
    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader) return res.status(401).json({ message: "No token provided" });

        const token = authHeader.split(" ")[1];

        if (!token) return res.status(401).json({ message: "Malformed token" });

        const response = await authController.validateToken({ token });

        if (response.error) return res.status(401).json(response);

        return res.status(200).json(response);
    } catch (err: any) {
        logger.error(`VERIFY TOKEN: ${err.message}`);

        return res.status(500).json({
            data: null,
            message: "Internal server error",
            error: true
        });
    }
})

export { authRouter };