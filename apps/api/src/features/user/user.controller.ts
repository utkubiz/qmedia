import exceptions from "@/exceptions/exceptions";
import { RefreshTokenCookieHelper } from "@/features/user/user.helper";
import { UserService } from "@/features/user/user.service";
import type { CustomRequest } from "@/shared/errors/CustomRequest";

export const UserController = {
	register: async (req: CustomRequest) => {
		const { email, password, tenantId } = req.body;
		if (!email || !password || !tenantId) return exceptions.invalidBody;

		const response = await UserService.register({ email, password, tenantId });

		return { status: 201, response, cookie: RefreshTokenCookieHelper(response.refreshToken) };
	},
	login: async (req: CustomRequest) => {
		const { email, password, tenantId } = req.body;

		if (!email || !password || !tenantId) return exceptions.invalidBody;

		const response = await UserService.login({ email, password, tenantId });

		return {
			status: 200,
			response,
			cookie: RefreshTokenCookieHelper(response.refreshToken),
		};
	},
	logout: async (req: CustomRequest) => {
		return {
			status: 200,
			response: { message: "Logged out successfully" },
			cookie: {
				name: "refreshToken",
				value: "",
				options: {
					maxAge: 0,
					httpOnly: true,
					secure: process.env.NODE_ENV === "production",
					sameSite: "strict",
				},
			},
		};
	},
	refresh: async (req: CustomRequest) => {
		const refreshToken = req.cookies.refreshToken;

		if (!refreshToken) return exceptions.invalidBody;

		const response = await UserService.refresh({ refreshToken });

		return {
			status: 202,
			response,
			cookie: RefreshTokenCookieHelper(response.refreshToken),
		};
	},
};
