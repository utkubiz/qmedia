import exceptions from "@/exceptions/exceptions";
import { MenuService } from "../menu/menu.service";
import { UserRoles } from "../user/user.type";
import type { IOrderItem } from "./orders.model";
import { OrderStatus } from "./orders.model";
import { OrdersRepository } from "./orders.repository";

export const OrdersService = {
	create: async ({
		userId,
		tenantId,
		items,
		notes,
		userRole,
	}: {
		userId: string;
		tenantId: string;
		items: { menuItemId: string; quantity: number }[];
		notes?: string;
		userRole: UserRoles;
	}) => {
		// Validate and get menu items
		const orderItems: IOrderItem[] = [];
		let totalAmount = 0;

		for (const item of items) {
			const menuItem = await MenuService.findItemById({
				itemId: item.menuItemId,
				tenantId,
			});

			if (!menuItem) throw exceptions.menuItemNotFound;
			if (!menuItem.isAvailable) throw exceptions.menuItemNotAvailable;

			orderItems.push({
				menuItemId: item.menuItemId,
				name: menuItem.name,
				price: menuItem.price,
				quantity: item.quantity,
			});

			totalAmount += menuItem.price * item.quantity;
		}

		// Set initial status based on user role
		const initialStatus =
			userRole === UserRoles.STORE_OWNER ||
			userRole === UserRoles.STORE_EMPLOYEE ||
			userRole === UserRoles.SUPER_ADMIN
				? OrderStatus.CONFIRMED
				: OrderStatus.NEW;

		return OrdersRepository.create({
			userId,
			tenantId,
			items: orderItems,
			totalAmount,
			notes: notes || undefined,
			status: initialStatus,
		});
	},

	findById: async ({ id, tenantId }: { id: string; tenantId: string }) => {
		const order = await OrdersRepository.findById({ id, tenantId });
		if (!order) throw exceptions.orderNotFound;
		return order;
	},

	findByUserId: async ({ userId, tenantId }: { userId: string; tenantId: string }) => {
		return OrdersRepository.findByUserId({ userId, tenantId });
	},

	findByTenantId: async ({ tenantId }: { tenantId: string }) => {
		return OrdersRepository.findByTenantId({ tenantId });
	},

	updateStatus: async ({
		id,
		tenantId,
		status,
	}: {
		id: string;
		tenantId: string;
		status: OrderStatus;
	}) => {
		if (!Object.values(OrderStatus).includes(status)) {
			throw exceptions.invalidOrderStatus;
		}

		const order = await OrdersRepository.findById({ id, tenantId });
		if (!order) throw exceptions.orderNotFound;

		return OrdersRepository.updateStatus({ id, tenantId, status });
	},

	findByStatus: async ({
		tenantId,
		status,
	}: {
		tenantId: string;
		status: OrderStatus;
	}) => {
		return OrdersRepository.findByStatus({ tenantId, status });
	},

	findAllOrders: async ({ tenantId }: { tenantId: string }) => {
		return OrdersRepository.findByTenantId({ tenantId });
	},

	getOrderStats: async ({ tenantId }: { tenantId: string }) => {
		const orders = await OrdersRepository.findByTenantId({ tenantId });

		return {
			total: orders.length,
			statusCounts: orders.reduce(
				(acc, order) => {
					acc[order.status] = (acc[order.status] || 0) + 1;
					return acc;
				},
				{} as Record<OrderStatus, number>,
			),
			totalRevenue: orders.reduce((sum, order) => sum + order.totalAmount, 0),
		};
	},

	findAll: async ({
		tenantId,
		page,
		limit,
		startDate,
		endDate,
	}: {
		tenantId: string;
		page: number;
		limit: number;
		startDate?: Date;
		endDate?: Date;
	}) => {
		const query: any = { tenantId };

		// Add date range filter if provided
		if (startDate || endDate) {
			query.createdAt = {};
			if (startDate) query.createdAt.$gte = startDate;
			if (endDate) query.createdAt.$lte = endDate;
		}

		const [orders, total] = await Promise.all([
			OrdersRepository.findAll({
				query,
				page,
				limit,
			}),
			OrdersRepository.countDocuments(query),
		]);

		return {
			orders,
			pagination: {
				total,
				page,
				limit,
				totalPages: Math.ceil(total / limit),
				hasMore: page * limit < total,
			},
		};
	},

	findByStatuses: async ({
		tenantId,
		statuses,
	}: {
		tenantId: string;
		statuses: OrderStatus[];
	}) => {
		if (!statuses.length) {
			throw exceptions.invalidParams;
		}

		// Validate that all provided statuses are valid OrderStatus enum values
		const validStatuses = Object.values(OrderStatus);
		const areStatusesValid = statuses.every((status) => validStatuses.includes(status as OrderStatus));

		if (!areStatusesValid) {
			throw exceptions.invalidOrderStatus;
		}

		return await OrdersRepository.findByStatuses({
			tenantId,
			status: { $in: statuses },
		});
	},
};
