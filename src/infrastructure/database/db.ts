// Modules
import mongoose, { Mongoose } from "mongoose";
import createLogger from "logging";

// Config
import { URI, DB_NAME } from "../../config.js";

const logger = createLogger('DATABASE');

const config = {
    uri: URI,
    dbName: DB_NAME
}

declare global {
    var DBClient: Mongoose | null;
}

export async function connectDb(): Promise<void> {
    try {
        if (!config.uri) throw new Error("No URI provided");

        if (!config.dbName) throw new Error("No database name provided");

        global.DBClient = await mongoose.connect(config.uri, {
            dbName: config.dbName
        });

        logger.info(`Database connection successful`);
    } catch (err: any) {
        logger.error(`Database Connection error: ${err.message}`);
    }
}

export const DBClient = global.DBClient;