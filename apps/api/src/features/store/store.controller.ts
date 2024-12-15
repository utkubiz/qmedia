import exceptions from "@/exceptions/exceptions";
import type { CustomRequest } from "@/shared/errors/CustomRequest";
import { StoreService } from "./store.service";

export const StoreController = {
	create: async (req: CustomRequest) => {
		const { name } = req.body;
		if (!name) return exceptions.invalidBody;

		const response = await StoreService.create({ name });

		return { status: 201, response };
	},
	findById: async (req: CustomRequest) => {
		if (!req?.user?.tenantId) return exceptions.missingTenantId;

		const response = await StoreService.findById({ id: req?.user?.tenantId });
		if (!response) return exceptions.storeNotFound;

		return { status: 200, response };
	},
};
