// Modules
import "dotenv/config";
import { Server, IncomingMessage, ServerResponse } from "http";

// App
import { App } from "../../app.js";

// Config
import { PORT } from "../../config.js";

const port = PORT;

declare global {
    var app: Server<typeof IncomingMessage, typeof ServerResponse> 
}

const app = global.app || new App().server.listen(port, () => console.log(`Running server on port: ${port}`));

if (process.env.NODE_ENV !== "production") global.app = app;