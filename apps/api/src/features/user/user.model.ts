import type { Document } from "mongoose";
import mongoose, { Schema } from "mongoose";
import { UserRoles } from "./user.type";

export interface IUser extends Document {
	tenantId: string;
	email: string;
	password: string;
	role: UserRoles;
	createdAt: Date;
	updatedAt: Date;
}

const UserSchema: Schema = new Schema<IUser>(
	{
		tenantId: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		role: { type: String, enum: Object.values(UserRoles), required: true, default: UserRoles.STORE_CUSTOMER },
	},
	{ timestamps: true },
);

export const User = mongoose.model<IUser>("User", UserSchema);
