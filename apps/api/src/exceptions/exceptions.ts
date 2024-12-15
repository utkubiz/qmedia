import { CustomError } from "@/shared/helpers/ErrorHelper";

export default {
	//400
	invalidBody: new CustomError({
		message: "Invalid body",
		code: 400,
		statusCode: 40001,
	}),
	emailPasswordDoesNotMatch: new CustomError({
		message: "Email and password does not match",
		code: 400,
		statusCode: 40002,
	}),
	invalidParams: new CustomError({
		message: "Invalid params",
		code: 400,
		statusCode: 40003,
	}),
	missingTenantId: new CustomError({
		message: "Missing tenant id",
		code: 400,
		statusCode: 40004,
	}),
	invalidOrderStatus: new CustomError({
		message: "Invalid order status",
		code: 400,
		statusCode: 40005,
	}),
	//401
	expiredToken: new CustomError({
		message: "User Token expired",
		code: 401,
		statusCode: 40100,
	}),
	invalidTokenType: new CustomError({
		message: "Invalid token type",
		code: 401,
		statusCode: 40101,
	}),
	unauthorized: new CustomError({
		message: "You need to login",
		code: 401,
		statusCode: 40102,
	}),
	missingApiKey: new CustomError({
		message: "Access Denied. No api key provided",
		code: 401,
		statusCode: 40103,
	}),
	missingToken: new CustomError({
		message: "Access Denied. No token provided",
		code: 401,
		statusCode: 40104,
	}),
	invalidToken: new CustomError({
		message: "Invalid token",
		code: 401,
		statusCode: 40105,
	}),
	//403
	forbidden: new CustomError({
		message: "You are not allowed to access this resource",
		code: 403,
		statusCode: 40300,
	}),
	//404
	userNotFound: new CustomError({
		message: "User not found. Please check token",
		code: 404,
		statusCode: 40400,
	}),
	storeNotFound: new CustomError({
		message: "Store not found",
		code: 404,
		statusCode: 40401,
	}),
	menuNotFound: new CustomError({
		message: "Menu not found",
		code: 404,
		statusCode: 40402,
	}),
	menuItemNotFound: new CustomError({
		message: "Menu item not found",
		code: 404,
		statusCode: 40403,
	}),
	orderNotFound: new CustomError({
		message: "Order not found",
		code: 404,
		statusCode: 40404,
	}),
	//409
	userAlreadyExists: new CustomError({
		message: "User already exists",
		code: 409,
		statusCode: 40900,
	}),
	menuAlreadyExists: new CustomError({
		message: "Menu already exists for this tenant",
		code: 409,
		statusCode: 40901,
	}),
	invalidStatusTransition: new CustomError({
		message: "Invalid order status transition",
		code: 400,
		statusCode: 40011,
	}),
	menuItemNotAvailable: new CustomError({
		message: "Menu item is not available",
		code: 400,
		statusCode: 40012,
	}),
};
