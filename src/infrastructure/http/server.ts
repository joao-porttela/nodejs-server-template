// Modules
import { Server, IncomingMessage, ServerResponse } from "http";
import createLogger from "logging";
import "dotenv/config";

// App
import { App } from "../../app.js";

// Config
import { PORT } from "../../config.js";

const logger = createLogger('SERVER');

const port = PORT;

declare global {
    var app: Server<typeof IncomingMessage, typeof ServerResponse>
}

const app = global.app || new App().server.listen(port, () => logger.info(`Running server on port: ${port}`));

if (process.env.NODE_ENV !== "production") global.app = app;