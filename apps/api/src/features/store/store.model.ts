import type { Document } from "mongoose";
import mongoose, { Schema } from "mongoose";

export interface IStore extends Document {
	name: string;
	email?: string;
	website?: string;
	address?: string;
	phone?: string;
	createdAt: Date;
	updatedAt: Date;
}

const StoreSchema: Schema = new Schema<IStore>(
	{
		name: { type: String, required: true },
		email: { type: String, required: false },
		website: { type: String, required: false },
		address: { type: String, required: false },
		phone: { type: String, required: false },
	},
	{ timestamps: true },
);

export const Store = mongoose.model<IStore>("Store", StoreSchema);
