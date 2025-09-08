// Modules
import express from "express";

// Router
import { router } from "./routes/router.js";

// Database
import { connectDb } from "./infrastructure/database/db.js";

export class App {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.middleware();
    this.router();
  }

  private async middleware() {
    this.server.use(express.json());
    await connectDb();
  }

  private router() {
    this.server.use(router);
  }
}