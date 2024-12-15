import exceptions from "@/exceptions/exceptions";
import { TokenService } from "@/features/token/token.service";
import { TokenType } from "@/features/token/token.types";
import { UserRepository } from "@/features/user/user.repository";
import { jwtVerify } from "@/shared/helpers/TokenHelper";
import bcrypt from "bcryptjs";
import { StoreRepository } from "../store/store.repository";

export const UserService = {
	register: async ({ email, password, tenantId }: { email: string; password: string; tenantId: string }) => {
		const store = await StoreRepository.findById({ id: tenantId });
		if (!store) throw exceptions.storeNotFound;

		const userOpt = await UserRepository.findByEmail({ email, tenantId });
		if (userOpt) throw exceptions.userAlreadyExists;

		const hashedPassword = await bcrypt.hash(password, 10);

		const dbUser = await UserRepository.create({
			email,
			password: hashedPassword,
			tenantId,
		});

		return TokenService.createTokens(dbUser);
	},
	login: async ({ email, password, tenantId }: { email: string; password: string; tenantId: string }) => {
		const user = await UserRepository.findByEmail({ email, tenantId });
		if (!user) throw exceptions.userNotFound;

		const isPasswordCorrect = await bcrypt.compare(password, user.password);
		if (!isPasswordCorrect) throw exceptions.emailPasswordDoesNotMatch;

		const { accessToken, refreshToken } = await TokenService.createTokens(user);

		return { accessToken, refreshToken };
	},
	refresh: async ({ refreshToken }: { refreshToken: string }) => {
		const payload = jwtVerify(refreshToken);
		if (payload.tokenType !== TokenType.refresh) throw exceptions.invalidTokenType;

		const user = await UserRepository.findById({ id: payload.id, tenantId: payload.tenantId });
		if (!user) throw exceptions.userNotFound;

		return TokenService.createTokens(user);
	},
	getUserByToken: async (token: string) => {
		const userOpt = jwtVerify(token);
		if (userOpt.tokenType !== TokenType.access) throw exceptions.invalidToken;

		const user = await UserRepository.findById({ id: userOpt.id, tenantId: userOpt.tenantId });

		if (!user) throw exceptions.userNotFound;

		return user;
	},
};
