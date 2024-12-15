import { config } from "@/config";

export const RefreshTokenCookieHelper = (refreshToken: string) => {
	return {
		name: "refreshToken",
		value: refreshToken,
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "Strict",
		maxAge: config.REFRESH_TOKEN_EXPIRATION_TIME_MS,
	};
};
