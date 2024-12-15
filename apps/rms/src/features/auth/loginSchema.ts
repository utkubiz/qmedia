import { z } from "@/i18n-zod";

export const loginSchema = z.object({
	tenantId: z.string().min(1),
	email: z.string().email().min(3),
	password: z.string().min(6),
});
