import type { TokenUser } from "@/features/token/token.types";

export function asTokenUser(data: any): TokenUser {
	return {
		id: data.id,
		email: data.email,
		tokenType: data.tokenType,
		tenantId: data.tenantId,
	};
}
