import type { CustomRequest } from "@/shared/errors/CustomRequest";
import type { CookieOptions, NextFunction, Response } from "express";
import { CustomError } from "./ErrorHelper";
import { logger } from "./LogHelper";

const INTERNAL_SERVER_ERROR_MESSAGE_1 = "Internal Server Error [1]";
const INTERNAL_SERVER_ERROR_MESSAGE_2 = "Internal Server Error [2]";

export function routeHandler(func: (req: CustomRequest, res: Response, next: NextFunction) => Promise<any>) {
	return async (req: CustomRequest, res: Response, next: NextFunction) => {
		try {
			const result = await func(req, res, next);

			if (result instanceof CustomError) {
				logCustomError(result, req);
				res.status(result.code).json({ error: result });
				return;
			}

			if (result) {
				if (result.cookie) {
					setResponseCookie(res, result.cookie);
				}
				res.status(result.status).json(result.response);
				return;
			}

			res.status(500).json({ error: INTERNAL_SERVER_ERROR_MESSAGE_1 });
			return;
		} catch (err: any) {
			if (err instanceof CustomError) {
				logCustomError(err, req);
				res.status(err.code).json({ error: err });
				return;
			}

			logInternalError(err, req);
			res.status(500).json({ error: INTERNAL_SERVER_ERROR_MESSAGE_2 });
			return;
		}
	};
}
function logCustomError(error: CustomError, req: CustomRequest) {
	logger.error({
		...error,
		method: req.method,
		originalUrl: req.originalUrl,
		headers: req.headers,
		body: req.body,
		query: req.query,
		httpCode: error.code,
		isHandledError: error.code < 500,
	});
}

function logInternalError(error: any, req: CustomRequest) {
	logger.error({
		message: error.message,
		method: req.method,
		originalUrl: req.originalUrl,
		headers: req.headers,
		body: req.body,
		query: req.query,
		httpCode: 500,
		isHandledError: false,
	});
}

function setResponseCookie(res: Response, cookie: { name: string; value: string; options?: CookieOptions }) {
	const defaultOptions: CookieOptions = {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
	};

	const cookieOptions: CookieOptions = {
		...defaultOptions,
		...cookie.options,
	};

	res.cookie(cookie.name, cookie.value, cookieOptions);
}
