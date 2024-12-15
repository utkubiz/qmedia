import { z } from "@/i18n-zod";

export const menuItemSchema = z.object({
	name: z.string().min(1),
	description: z.string().optional(),
	price: z.number().min(0),
	category: z.string().min(1),
});

export type MenuItemFormData = z.infer<typeof menuItemSchema>;
