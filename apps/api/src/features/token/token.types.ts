export enum TokenType {
	access = "access",
	refresh = "refresh",
}

export interface TokenUser {
	id: number;
	email: string;
	tokenType: TokenType;
	tenantId: string;
}
