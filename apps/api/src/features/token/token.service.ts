import { config } from "@/config";
import { TokenType } from "@/features/token/token.types";
import type { IUser } from "@/features/user/user.model";
import { jwtSign } from "@/shared/helpers/TokenHelper";

export const TokenService = {
	createTokens: async (user: IUser): Promise<{ accessToken: string; refreshToken: string }> => {
		const accessToken = jwtSign({
			payload: {
				id: user.id,
				email: user.email,
				tokenType: TokenType.access,
				tenantId: user.tenantId,
			},
			expiresIn: config.ACCESS_TOKEN_EXPIRATION_TIME,
		});

		const refreshToken = jwtSign({
			payload: {
				id: user.id,
				email: user.email,
				tokenType: TokenType.refresh,
				tenantId: user.tenantId,
			},
			expiresIn: config.REFRESH_TOKEN_EXPIRATION_TIME,
		});

		return { accessToken, refreshToken };
	},
};
