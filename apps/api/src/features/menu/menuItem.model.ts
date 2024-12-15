import type { Document } from "mongoose";
import mongoose, { Schema } from "mongoose";

export enum Currency {
	TRY = "TRY",
	USD = "USD",
	EUR = "EUR",
}

export interface IMenuItem extends Document {
	menuId: string;
	tenantId: string;
	name: string;
	description?: string;
	price: number;
	currency: Currency;
	category: string;
	subCategory?: string;
	isAvailable: boolean;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
}

const MenuItemSchema = new Schema<IMenuItem>(
	{
		menuId: { type: String, required: true, index: true },
		tenantId: { type: String, required: true, index: true },
		name: { type: String, required: true },
		description: { type: String },
		price: { type: Number, required: true },
		currency: { type: String, enum: Object.values(Currency), default: Currency.TRY },
		category: { type: String, required: true },
		subCategory: { type: String },
		isAvailable: { type: Boolean, default: true },
		isActive: { type: Boolean, default: true },
	},
	{ timestamps: true },
);

// Compound indexes for better query performance
MenuItemSchema.index({ menuId: 1, category: 1 });
MenuItemSchema.index({ menuId: 1, isActive: 1 });

export const MenuItem = mongoose.model<IMenuItem>("MenuItem", MenuItemSchema);
