import exceptions from "@/exceptions/exceptions";
import type { CustomRequest } from "@/shared/errors/CustomRequest";
import { MenuService } from "./menu.service";

export const MenuController = {
	create: async (req: CustomRequest) => {
		const { name, description } = req.body;
		if (!name) return exceptions.invalidBody;

		if (!req?.user?.tenantId) return exceptions.missingTenantId;

		const response = await MenuService.create({
			name,
			description,
			tenantId: req.user.tenantId,
		});

		return { status: 201, response };
	},

	findById: async (req: CustomRequest) => {
		const { id } = req.params;
		if (!id) return exceptions.invalidParams;

		if (!req?.user?.tenantId) return exceptions.missingTenantId;

		const response = await MenuService.findById({
			id,
			tenantId: req.user.tenantId,
		});

		return { status: 200, response };
	},

	update: async (req: CustomRequest) => {
		const { id } = req.params;
		const { name, description } = req.body;
		if (!id || (!name && description === undefined)) return exceptions.invalidBody;

		if (!req?.user?.tenantId) return exceptions.missingTenantId;

		const response = await MenuService.update({
			id,
			name,
			description,
			tenantId: req.user.tenantId,
		});

		return { status: 200, response };
	},

	delete: async (req: CustomRequest) => {
		const { id } = req.params;
		if (!id) return exceptions.invalidParams;

		if (!req?.user?.tenantId) return exceptions.missingTenantId;

		const response = await MenuService.delete({
			id,
			tenantId: req.user.tenantId,
		});

		return { status: 200, response };
	},

	addItem: async (req: CustomRequest) => {
		const { menuId } = req.params;
		const { name, description, price, category, subCategory } = req.body;

		if (!menuId || !name || !price || !category) {
			return exceptions.invalidBody;
		}

		if (!req?.user?.tenantId) return exceptions.missingTenantId;

		const response = await MenuService.addItem({
			menuId,
			name,
			description,
			price,
			category,
			subCategory,
			tenantId: req.user.tenantId,
		});

		return { status: 201, response };
	},

	findItems: async (req: CustomRequest) => {
		const { menuId } = req.params;
		if (!menuId) return exceptions.invalidParams;

		if (!req?.user?.tenantId) return exceptions.missingTenantId;

		const response = await MenuService.findItems({
			menuId,
			tenantId: req.user.tenantId,
		});

		return { status: 200, response };
	},

	findItemById: async (req: CustomRequest) => {
		const { menuId, itemId } = req.params;
		if (!menuId || !itemId) return exceptions.invalidParams;

		if (!req?.user?.tenantId) return exceptions.missingTenantId;

		const response = await MenuService.findItemById({
			itemId,
			tenantId: req.user.tenantId,
		});

		return { status: 200, response };
	},

	updateItem: async (req: CustomRequest) => {
		const { menuId, itemId } = req.params;
		const updateData = req.body;

		if (!menuId || !itemId || Object.keys(updateData).length === 0) {
			return exceptions.invalidBody;
		}

		if (!req?.user?.tenantId) return exceptions.missingTenantId;

		const response = await MenuService.updateItem({
			menuId,
			itemId,
			updateData,
			tenantId: req.user.tenantId,
		});

		return { status: 200, response };
	},

	deleteItem: async (req: CustomRequest) => {
		const { menuId, itemId } = req.params;
		if (!menuId || !itemId) return exceptions.invalidParams;

		if (!req?.user?.tenantId) return exceptions.missingTenantId;

		const response = await MenuService.deleteItem({
			menuId,
			itemId,
			tenantId: req.user.tenantId,
		});

		return { status: 200, response };
	},

	getCategories: async (req: CustomRequest) => {
		const { menuId } = req.params;
		if (!menuId) return exceptions.invalidParams;

		if (!req?.user?.tenantId) return exceptions.missingTenantId;

		const response = await MenuService.getCategories({
			menuId,
			tenantId: req.user.tenantId,
		});

		return { status: 200, response };
	},

	findItemsByCategory: async (req: CustomRequest) => {
		const { menuId, category } = req.params;
		if (!menuId || !category) return exceptions.invalidParams;

		if (!req?.user?.tenantId) return exceptions.missingTenantId;

		const response = await MenuService.findItemsByCategory({
			menuId,
			category,
			tenantId: req.user.tenantId,
		});

		return { status: 200, response };
	},

	findAllByTenantId: async (req: CustomRequest) => {
		if (!req?.user?.tenantId) return exceptions.missingTenantId;

		const response = await MenuService.findAllByTenantId({
			tenantId: req.user.tenantId,
		});

		return { status: 200, response };
	},

	activateMenu: async (req: CustomRequest) => {
		const { id } = req.params;
		if (!id) return exceptions.invalidParams;

		if (!req?.user?.tenantId) return exceptions.missingTenantId;

		const response = await MenuService.activateMenu({
			id,
			tenantId: req.user.tenantId,
		});

		return { status: 200, response };
	},

	deactivateMenu: async (req: CustomRequest) => {
		const { id } = req.params;
		if (!id) return exceptions.invalidParams;

		if (!req?.user?.tenantId) return exceptions.missingTenantId;

		const response = await MenuService.deactivateMenu({
			id,
			tenantId: req.user.tenantId,
		});

		return { status: 200, response };
	},

	getCategorizedItems: async (req: CustomRequest) => {
		if (!req?.user?.tenantId) return exceptions.missingTenantId;

		const response = await MenuService.getCategorizedItems({
			tenantId: req.user.tenantId,
		});

		return { status: 200, response };
	},
};
