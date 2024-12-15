import { UserService } from "@/features/user/user.service";
import { UserRoles } from "@/features/user/user.type";
import { CustomError } from "@/shared/helpers/ErrorHelper";
import { logger } from "@/shared/helpers/LogHelper";
import { extractBearer } from "@/shared/helpers/TokenHelper";
import type { NextFunction, Response } from "express";
import exceptions from "../../exceptions/exceptions";
import type { CustomRequest } from "../errors/CustomRequest";

export const UserAuth = (allowedRoles: UserRoles[] = []) => {
	return async (req: CustomRequest, res: Response, next: NextFunction) => {
		try {
			const bearerToken = req.headers.authorization as string;
			const token = extractBearer(bearerToken);

			if (!token) {
				logger.error({
					...exceptions.missingToken,
					method: req.method,
					originalUrl: req.originalUrl,
					headers: req.headers,
					body: req.body,
					query: req.query,
					httpCode: exceptions.missingToken.code,
					isHandledError: exceptions.missingToken.code < 500,
				});
				res.status(exceptions.missingToken.code).json({ error: exceptions.missingToken });
				return;
			}

			const user = await UserService.getUserByToken(token);
			if (!user) {
				res.status(exceptions.userNotFound.code).json({ error: exceptions.userNotFound });
				return;
			}

			if (
				user.role !== UserRoles.SUPER_ADMIN &&
				allowedRoles.length > 0 &&
				!allowedRoles.includes(user.role as UserRoles)
			) {
				res.status(exceptions.forbidden.code).json({ error: exceptions.forbidden });
				return;
			}
			req.user = user;

			return next();
		} catch (e) {
			logger.error(e);
			if (e instanceof CustomError) {
				res.status(e.code).json({ error: e });
				return;
			}
			res.status(exceptions.unauthorized.code).json({ error: exceptions.unauthorized });
			return;
		}
	};
};
