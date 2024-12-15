import type { IUser } from "@/features/user/user.model";
import type { Request } from "express";

export interface CustomRequest extends Request {
	user?: IUser;
}
