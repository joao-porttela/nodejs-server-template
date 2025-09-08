import { Router, Request, Response } from "express";

import { getInjection } from "../../DI/container";

const authRouter: Router = Router();

const authController = getInjection("IAuthController");

authRouter.use('/sign-up', async (req: Request, res: Response): Promise<any> => {
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
        console.log(`❌ AUTH_ROUTER - SIGN_UP: ${err.message}`);

        return res.status(500).json({
            data: null,
            message: "Internal server error",
            error: true
        });
    }
});

authRouter.use('/login', async (req: Request, res: Response): Promise<any> => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                data: null,
                message: "Missing required fields",
                error: true
            });
        }

        const response = await authController.signIn({ username, password });

        if (response.error) return res.status(401).json(response);

        return res.status(200).json(response);
    } catch (err: any) {
        console.log(`❌ AUTH_ROUTER - LOGIN: ${err.message}`);

        return res.status(500).json({
            data: null,
            message: "Internal server error",
            error: true
        });
    }
});

authRouter.use('/verify-token', async (req: Request, res: Response): Promise<any> => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({
                data: null,
                message: "Missing required fields",
                error: true
            });
        }

        const response = await authController.validateToken({ token });

        if (response.error) return res.status(401).json(response);

        return res.status(200).json(response);
    } catch (err: any) {
        console.log(`❌ AUTH_ROUTER - VERIFY_TOKEN: ${err.message}`);

        return res.status(500).json({
            data: null,
            message: "Internal server error",
            error: true
        });
    }
})

export { authRouter };