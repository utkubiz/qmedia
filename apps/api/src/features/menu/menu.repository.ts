import exceptions from "@/exceptions/exceptions";
import type { IMenu } from "./menu.model";
import { Menu } from "./menu.model";
import type { IMenuItem } from "./menuItem.model";
import { MenuItem } from "./menuItem.model";

export const MenuRepository = {
	createMenu: async ({ name, description, tenantId }: Pick<IMenu, "name" | "description" | "tenantId">) => {
		const existingMenus = await Menu.countDocuments({ tenantId });
		const isActive = existingMenus === 0;

		if (existingMenus > 0) throw exceptions.menuAlreadyExists;
		return Menu.create({ name, description, tenantId, isActive });
	},

	findMenuById: async ({ id, tenantId }: { id: string; tenantId: string }) => {
		return Menu.findOne({
			_id: id,
			tenantId,
		});
	},

	findMenuByTenantId: async ({ tenantId }: { tenantId: string }) => {
		return Menu.findOne({
			tenantId,
		});
	},

	updateMenu: async ({
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
		const updateData: Partial<IMenu> = {};
		if (name) updateData.name = name;
		if (description !== undefined) updateData.description = description;

		return Menu.findOneAndUpdate({ _id: id, tenantId }, updateData, { new: true });
	},

	deleteMenu: async ({ id, tenantId }: { id: string; tenantId: string }) => {
		await Menu.findOneAndDelete({ _id: id, tenantId });
		await MenuItem.deleteMany({ menuId: id });
	},

	createMenuItem: async (item: Omit<IMenuItem, "_id">) => {
		return MenuItem.create(item);
	},

	findMenuItems: async ({
		menuId,
		tenantId,
		category,
	}: {
		menuId: string;
		tenantId: string;
		category?: string;
	}) => {
		const query = {
			menuId,
			tenantId,
			...(category && { category }),
		};
		return MenuItem.find(query).sort({ createdAt: -1 });
	},

	findMenuItemById: async ({ id, tenantId }: { id: string; tenantId: string }) => {
		return MenuItem.findOne({
			_id: id,
			tenantId,
		});
	},

	updateMenuItem: async ({
		id,
		tenantId,
		updateData,
	}: {
		id: string;
		tenantId: string;
		updateData: Partial<IMenuItem>;
	}) => {
		return MenuItem.findOneAndUpdate({ _id: id, tenantId }, updateData, { new: true });
	},

	deleteMenuItem: async ({ id, tenantId }: { id: string; tenantId: string }) => {
		return MenuItem.findOneAndDelete({ _id: id, tenantId });
	},

	getCategories: async ({ menuId, tenantId }: { menuId: string; tenantId: string }) => {
		return MenuItem.distinct("category", {
			menuId,
			tenantId,
		});
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
		return MenuItem.find({
			menuId,
			category,
			tenantId,
		}).sort({ name: 1 });
	},

	findMenuItemsQuery: ({ menuId, tenantId }: { menuId: string; tenantId: string }) => {
		return MenuItem.find({ menuId, tenantId });
	},

	findMenusByTenantId: async ({ tenantId }: { tenantId: string }) => {
		return Menu.find({
			tenantId,
		});
	},

	activateMenu: async ({ id, tenantId }: { id: string; tenantId: string }) => {
		// First deactivate all other menus for this tenant
		await Menu.updateMany(
			{
				tenantId,
				isActive: true,
				_id: { $ne: id }, // Exclude the menu we're activating
			},
			{ isActive: false },
		);

		// Then activate the requested menu
		const activatedMenu = await Menu.findOneAndUpdate({ _id: id, tenantId }, { isActive: true }, { new: true });

		return activatedMenu;
	},

	deactivateMenu: async ({ id, tenantId }: { id: string; tenantId: string }) => {
		return Menu.findOneAndUpdate({ _id: id, tenantId }, { isActive: false }, { new: true });
	},

	findActiveMenu: async ({ tenantId }: { tenantId: string }) => {
		return Menu.findOne({
			tenantId,
			isActive: true,
		});
	},
};
