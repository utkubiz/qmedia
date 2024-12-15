import exceptions from "@/exceptions/exceptions";
import type { ObjectId } from "mongoose";
import { type ICategorizedItems, asCategorizedItems } from "./categorizedItems.type";
import type { IMenu } from "./menu.model";
import { MenuRepository } from "./menu.repository";
import type { IMenuItem } from "./menuItem.model";
import { Currency } from "./menuItem.model";

export const MenuService = {
	create: async ({ name, description, tenantId }: Pick<IMenu, "name" | "description" | "tenantId">) => {
		const existingMenu = await MenuRepository.findMenuByTenantId({ tenantId });
		if (existingMenu) throw exceptions.menuAlreadyExists;

		return MenuRepository.createMenu({ name, description, tenantId });
	},

	findById: async ({ id, tenantId }: { id: string; tenantId: string }) => {
		const menu = await MenuRepository.findMenuById({ id, tenantId });
		if (!menu) throw exceptions.menuNotFound;

		return menu;
	},

	update: async ({
		id,
		name,
		description,
		tenantId,
	}: {
		id: string;
		name?: string;
		description?: string;
		tenantId: string;
	}) => {
		const menu = await MenuRepository.updateMenu({ id, name, description, tenantId });
		if (!menu) throw exceptions.menuNotFound;

		return menu;
	},

	delete: async ({ id, tenantId }: { id: string; tenantId: string }) => {
		return MenuRepository.deleteMenu({ id, tenantId });
	},

	// MenuItem operations
	addItem: async ({
		menuId,
		tenantId,
		name,
		description,
		price,
		currency,
		category,
		subCategory,
	}: {
		menuId: string;
		tenantId: string;
		name: string;
		description?: string;
		price: number;
		currency?: Currency;
		category: string;
		subCategory?: string;
	}) => {
		const menu = await MenuRepository.findMenuById({ id: menuId, tenantId });
		if (!menu) throw exceptions.menuNotFound;

		return MenuRepository.createMenuItem({
			menuId,
			name,
			description,
			price,
			currency: currency || Currency.TRY,
			category,
			subCategory,
			tenantId,
			isAvailable: true,
			isActive: true,
		} as Omit<IMenuItem, "_id">);
	},

	findItems: async ({ menuId, tenantId }: { menuId: string; tenantId: string }) => {
		const menu = await MenuRepository.findMenuById({ id: menuId, tenantId });
		if (!menu) throw exceptions.menuNotFound;

		return MenuRepository.findMenuItems({ menuId, tenantId });
	},

	findItemById: async ({
		itemId,
		tenantId,
	}: {
		itemId: string;
		tenantId: string;
	}) => {
		const item = await MenuRepository.findMenuItemById({ id: itemId, tenantId });
		if (!item) throw exceptions.menuItemNotFound;

		return item;
	},

	updateItem: async ({
		menuId,
		itemId,
		tenantId,
		updateData,
	}: {
		menuId: string;
		itemId: string;
		tenantId: string;
		updateData: Partial<IMenuItem>;
	}) => {
		const menu = await MenuRepository.findMenuById({ id: menuId, tenantId });
		if (!menu) throw exceptions.menuNotFound;

		// Create new object with allowed fields only
		const safeUpdateData = Object.fromEntries(
			Object.entries(updateData).filter(([key]) => !["_id", "menuId", "tenantId"].includes(key)),
		);

		const item = await MenuRepository.updateMenuItem({
			id: itemId,
			tenantId,
			updateData: safeUpdateData,
		});
		if (!item) throw exceptions.menuItemNotFound;

		return item;
	},

	deleteItem: async ({
		menuId,
		itemId,
		tenantId,
	}: {
		menuId: string;
		itemId: string;
		tenantId: string;
	}) => {
		const menu = await MenuRepository.findMenuById({ id: menuId, tenantId });
		if (!menu) throw exceptions.menuNotFound;

		const item = await MenuRepository.deleteMenuItem({ id: itemId, tenantId });
		if (!item) throw exceptions.menuItemNotFound;

		return item;
	},

	getCategories: async ({ menuId, tenantId }: { menuId: string; tenantId: string }) => {
		const menu = await MenuRepository.findMenuById({ id: menuId, tenantId });
		if (!menu) throw exceptions.menuNotFound;

		const categories = await MenuRepository.findMenuItemsQuery({ menuId, tenantId }).distinct("category");
		return categories;
	},

	findItemsByCategory: async ({
		menuId,
		category,
		tenantId,
	}: {
		menuId: string;
		category: string;
		tenantId: string;
	}) => {
		const menu = await MenuRepository.findMenuById({ id: menuId, tenantId });
		if (!menu) throw exceptions.menuNotFound;
		return MenuRepository.findMenuItems({ menuId, tenantId, category });
	},

	getCategorizedItems: async ({ tenantId }: { tenantId: string }): Promise<ICategorizedItems[]> => {
		const activeMenu = await MenuRepository.findActiveMenu({ tenantId });
		if (!activeMenu) throw exceptions.menuNotFound;

		const items = await MenuRepository.findMenuItems({ menuId: (activeMenu._id as ObjectId).toString(), tenantId });
		return asCategorizedItems(items);
	},

	findAllByTenantId: async ({ tenantId }: { tenantId: string }) => {
		const menus = await MenuRepository.findMenusByTenantId({ tenantId });
		if (!menus.length) return [];

		return menus;
	},

	activateMenu: async ({ id, tenantId }: { id: string; tenantId: string }) => {
		const menu = await MenuRepository.findMenuById({ id, tenantId });
		if (!menu) throw exceptions.menuNotFound;

		// If menu is already active, no need to proceed
		if (menu.isActive) {
			return menu;
		}

		const activatedMenu = await MenuRepository.activateMenu({ id, tenantId });
		if (!activatedMenu) throw exceptions.menuNotFound;

		return activatedMenu;
	},

	deactivateMenu: async ({ id, tenantId }: { id: string; tenantId: string }) => {
		const menu = await MenuRepository.deactivateMenu({ id, tenantId });
		if (!menu) throw exceptions.menuNotFound;

		return menu;
	},
};
