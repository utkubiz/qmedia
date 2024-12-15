import type { IOrder, OrderStatus } from "./orders.model";
import { Order } from "./orders.model";

export const OrdersRepository = {
	create: async (orderData: Pick<IOrder, "userId" | "tenantId" | "items" | "totalAmount" | "notes" | "status">) => {
		return Order.create(orderData);
	},

	findById: async ({ id, tenantId }: { id: string; tenantId: string }) => {
		return Order.findOne({ _id: id, tenantId });
	},

	findByUserId: async ({ userId, tenantId }: { userId: string; tenantId: string }) => {
		return Order.find({ userId, tenantId }).sort({ createdAt: -1 });
	},

	findByTenantId: async ({ tenantId }: { tenantId: string }) => {
		return Order.find({ tenantId }).sort({ createdAt: -1 });
	},

	findByStatuses: async ({
		tenantId,
		status,
	}: {
		tenantId: string;
		status: { $in: OrderStatus[] };
	}) => {
		return await Order.find({
			tenantId,
			status,
		}).sort({ createdAt: -1 });
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
		return Order.findOneAndUpdate({ _id: id, tenantId }, { status }, { new: true });
	},

	findByStatus: async ({
		tenantId,
		status,
	}: {
		tenantId: string;
		status: OrderStatus;
	}) => {
		return Order.find({ tenantId, status }).sort({ createdAt: -1 });
	},

	findAll: async ({
		query,
		page,
		limit,
	}: {
		query: any;
		page: number;
		limit: number;
	}) => {
		return Order.find(query)
			.sort({ createdAt: -1 })
			.skip((page - 1) * limit)
			.limit(limit);
	},

	countDocuments: async (query: any) => {
		return Order.countDocuments(query);
	},
};
