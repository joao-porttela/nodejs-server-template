import mongoose, { Mongoose } from "mongoose";

import { URI, DB_NAME } from "../../config";

const config = {
    uri: URI,
    dbName: DB_NAME
}

declare global {
    var DBClient: Mongoose | null;
}

export async function connectDb(): Promise<void> {
    try {
        global.DBClient = await mongoose.connect(config.uri, {
            dbName: config.dbName
        });
        
        console.log(`✅ Database connection successful`);
    } catch (err: any) {
        console.log(`❌ Database Connection error: ${err.message}`);
    }
}

export const DBClient = global.DBClient;