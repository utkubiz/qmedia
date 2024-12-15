export interface Tokens {
	accessToken: string;
	refreshToken: string;
}

export interface TokenPayload {
	userId: string;
	role: string;
	iat: number;
	exp: number;
}
