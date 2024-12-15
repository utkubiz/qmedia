import { config } from "@/config";
import { asTokenUser } from "@/features/token/token.helper";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import exceptions from "../../exceptions/exceptions";

export const extractBearer = (token: string) => {
	return token.split(" ")[1];
};

export function jwtSign({
	payload,
	expiresIn,
}: {
	payload: object;
	expiresIn: string;
}) {
	return jwt.sign(payload, config.JWT_SECRET_KEY, {
		expiresIn,
	});
}

export function jwtVerify(token: string) {
	try {
		const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
		return asTokenUser(decoded);
	} catch (e) {
		if (e instanceof TokenExpiredError) {
			throw exceptions.expiredToken;
		}
		if (e instanceof JsonWebTokenError) {
			throw exceptions.invalidToken;
		}
		throw exceptions.unauthorized;
	}
}
