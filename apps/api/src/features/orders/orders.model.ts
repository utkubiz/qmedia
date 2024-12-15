import { OrderStatus } from "@qmedia/types";
import type { Document } from "mongoose";
import mongoose, { Schema } from "mongoose";

export interface IOrderItem {
	menuItemId: string;
	name: string;
	price: number;
	quantity: number;
}

export interface IOrder extends Document {
	tenantId: string;
	userId: string;
	items: IOrderItem[];
	status: OrderStatus;
	totalAmount: number;
	notes?: string;
	createdAt: Date;
	updatedAt: Date;
}

const OrdersSchema = new Schema<IOrder>(
	{
		tenantId: { type: String, required: true, index: true },
		userId: { type: String, required: true, index: true },
		items: [
			{
				menuItemId: { type: String, required: true },
				name: { type: String, required: true },
				price: { type: Number, required: true },
				quantity: { type: Number, required: true, min: 1 },
			},
		],
		status: {
			type: String,
			enum: Object.values(OrderStatus),
			default: OrderStatus.NEW,
			required: true,
		},
		totalAmount: { type: Number, required: true },
		notes: { type: String },
	},
	{ timestamps: true },
);

export const Order = mongoose.model<IOrder>("Order", OrdersSchema);
