// Modules
import { Router } from "express";

// Routers
import { apiRouter } from "./api/api.router.js";

const router: Router = Router();

router.use("/api/v1", apiRouter);

export {router};