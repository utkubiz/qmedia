import type { Document } from "mongoose";
import mongoose, { Schema } from "mongoose";

export interface IMenu extends Document {
	tenantId: string;
	name: string;
	description?: string;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
}

const MenuSchema = new Schema<IMenu>(
	{
		tenantId: { type: String, required: true, index: true },
		name: { type: String, required: true },
		description: { type: String },
		isActive: { type: Boolean, default: false },
	},
	{ timestamps: true },
);

MenuSchema.index(
	{ tenantId: 1, isActive: 1 },
	{
		unique: true,
		partialFilterExpression: { isActive: true },
	},
);

export const Menu = mongoose.model<IMenu>("Menu", MenuSchema);
