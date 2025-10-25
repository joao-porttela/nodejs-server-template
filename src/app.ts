// Modules
import express from "express";
import logger from 'morgan';
import cors from "cors";

// Router
import { router } from "./routes/router.js";

// Database
import { connectDb } from "./infrastructure/database/db.js";

// Config
import { WHITELIST } from "./config.js";

export class App {
  public server: express.Application;

  constructor() {
    this.server = express();
    this._middleware();
    this._router();
  }

  private async _middleware() {
    this.server.use(logger("dev"));
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
    this.server.use(cors({ origin: WHITELIST }));

    await connectDb();
  }

  private _router() {
    this.server.use(router);
  }
}