import { Request, Response } from "express";

import { getInjection } from "../DI/container.js";

export function protect(req: Request, res: Response, next: Function) {
	const authHeader = req.headers['authorization'];

	if (!authHeader) return res.status(401).json({ data: null, message: "You are not authenticated", error: true });

	const token = authHeader.split(" ")[1];

	if (!token) return res.status(401).json({ data: null, message: "Malformed token", error: true });

	const authService = getInjection("IAuthenticationService");
	const validationResponse = authService.validateToken(token);

	if (validationResponse.error || !validationResponse.data?.valid) {
		return res.status(401).json({ data: null, message: "Invalid or expired token", error: true });
	}

	next();
}
