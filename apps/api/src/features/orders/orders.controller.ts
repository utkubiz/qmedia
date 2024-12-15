import exceptions from "@/exceptions/exceptions";
import type { CustomRequest } from "@/shared/errors/CustomRequest";
import { OrderStatus } from "@qmedia/types";
import type { UserRoles } from "../user/user.type";
import { OrdersService } from "./orders.service";
export const OrdersController = {
	create: async (req: CustomRequest) => {
		const { items, notes } = req.body;
		if (!items || !Array.isArray(items) || items.length === 0) {
			return exceptions.invalidBody;
		}

		if (!req?.user?.tenantId) return exceptions.missingTenantId;
		if (!req?.user?._id) return exceptions.unauthorized;
		if (!req?.user?.role) return exceptions.unauthorized;

		const response = await OrdersService.create({
			userId: req.user._id as string,
			tenantId: req.user.tenantId,
			items,
			notes,
			userRole: req.user.role as UserRoles,
		});

		return { status: 201, response };
	},

	findById: async (req: CustomRequest) => {
		const { id } = req.params;
		if (!id) return exceptions.invalidParams;

		if (!req?.user?.tenantId) return exceptions.missingTenantId;

		const response = await OrdersService.findById({
			id,
			tenantId: req.user.tenantId,
		});

		return { status: 200, response };
	},

	findMyOrders: async (req: CustomRequest) => {
		if (!req?.user?.tenantId) return exceptions.missingTenantId;
		if (!req?.user?._id) return exceptions.unauthorized;

		const response = await OrdersService.findByUserId({
			userId: req.user._id as string,
			tenantId: req.user.tenantId,
		});

		return { status: 200, response };
	},

	updateStatus: async (req: CustomRequest) => {
		const { id } = req.params;
		const { status } = req.body;

		if (!id || !status || !Object.values(OrderStatus).includes(status)) {
			return exceptions.invalidBody;
		}

		if (!req?.user?.tenantId) return exceptions.missingTenantId;

		const response = await OrdersService.updateStatus({
			id,
			tenantId: req.user.tenantId,
			status,
		});

		return { status: 200, response };
	},

	findByStatus: async (req: CustomRequest) => {
		const { status } = req.params;

		if (!status || !Object.values(OrderStatus).includes(status as OrderStatus)) {
			return exceptions.invalidOrderStatus;
		}

		if (!req?.user?.tenantId) return exceptions.missingTenantId;

		const response = await OrdersService.findByStatus({
			tenantId: req.user.tenantId,
			status: status as OrderStatus,
		});

		return { status: 200, response };
	},

	getOrderStats: async (req: CustomRequest) => {
		if (!req?.user?.tenantId) return exceptions.missingTenantId;

		const response = await OrdersService.getOrderStats({
			tenantId: req.user.tenantId,
		});

		return { status: 200, response };
	},

	findAll: async (req: CustomRequest) => {
		if (!req?.user?.tenantId) return exceptions.missingTenantId;

		const { page = 1, limit = 10, startDate, endDate } = req.query;

		const response = await OrdersService.findAll({
			tenantId: req.user.tenantId,
			page: Number(page),
			limit: Number(limit),
			startDate: startDate ? new Date(startDate as string) : undefined,
			endDate: endDate ? new Date(endDate as string) : undefined,
		});

		return { status: 200, response };
	},

	getByStatuses: async (req: CustomRequest) => {
		if (!req?.user?.tenantId) throw exceptions.missingTenantId;

		const { statuses } = req.query;
		if (!statuses) throw exceptions.invalidParams;

		// Split the comma-separated string into an array and trim whitespace
		const statusArray = (statuses as string)
			.split(",")
			.map((status) => status.trim().toUpperCase()) as OrderStatus[];

		const response = await OrdersService.findByStatuses({
			tenantId: req.user.tenantId,
			statuses: statusArray,
		});

		return { status: 200, response };
	},
};
