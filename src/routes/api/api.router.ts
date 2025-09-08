// Modules
import cors from "cors";
import { Router } from "express";

// Routers
import { authRouter } from "../auth/auth.router";

const apiRouter: Router = Router();

const whitelist = [process.env.CLIENT_URL!];

apiRouter.use(
  cors({
    origin: whitelist,
  })
);

apiRouter.use('/auth', authRouter)

export {apiRouter};