import { customAlphabet } from "nanoid";

export function generateTenantId(): string {
	const nanoId = customAlphabet("ABCDEFGHJKLMNPRSTUVYZ", 10);
	return nanoId().toUpperCase();
}
