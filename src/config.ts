export const PORT = process.env.PORT || 8080;

export const SERVICE_URL = process.env.SERVICE_URL || null;

// CORS
export const WHITELIST = [
	process.env.CLIENT_URL!,
]

// Database
export const URI = process.env.URI || null;

export const DB_NAME = process.env.DB_NAME || null;

// Auth
export const PRIVATE_KEY = process.env.PRIVATE_KEY || null;

export const PUBLIC_KEY = process.env.PUBLIC_KEY || null;
