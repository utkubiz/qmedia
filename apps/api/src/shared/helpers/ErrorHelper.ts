import type { CustomErrorType } from "../errors/CustomError";

export class CustomError extends Error {
	message: string;
	code: number;
	statusCode: number;

	constructor({ message, code, statusCode }: CustomErrorType) {
		super();
		this.message = message;
		this.code = code;
		this.statusCode = statusCode;

		Object.setPrototypeOf(this, CustomError.prototype);
	}
}
