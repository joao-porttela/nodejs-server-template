// Modules
import { Router } from "express";

// Routers
import { authRouter } from "../auth/auth.router";
import { userRouter } from "../user/user.router";

const apiRouter: Router = Router();

apiRouter.use('/auth', authRouter)

apiRouter.use('/user', userRouter);

export { apiRouter };