import { z } from "@/i18n-zod";

export const menuSchema = z.object({
	name: z.string().min(1, "validations.nameRequired"),
});

export type MenuFormData = z.infer<typeof menuSchema>;
