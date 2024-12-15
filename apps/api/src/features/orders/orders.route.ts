import { UserRoles } from "@/features/user/user.type";
import { routeHandler } from "@/shared/helpers/RouteHelper";
import { UserAuth } from "@/shared/middlewares/UserAuth";
import express from "express";
import { OrdersController } from "./orders.controller";

export const OrdersRouter = express.Router();

// Customer routes
OrdersRouter.post("/", UserAuth(), routeHandler(OrdersController.create));
OrdersRouter.get("/my-orders", UserAuth(), routeHandler(OrdersController.findMyOrders));
OrdersRouter.get("/:id", UserAuth(), routeHandler(OrdersController.findById));

// Store owner/employee routes
OrdersRouter.get(
	"/",
	UserAuth([UserRoles.STORE_OWNER, UserRoles.STORE_EMPLOYEE]),
	routeHandler(OrdersController.findAll),
);

OrdersRouter.put(
	"/:id/status",
	UserAuth([UserRoles.STORE_OWNER, UserRoles.STORE_EMPLOYEE]),
	routeHandler(OrdersController.updateStatus),
);

OrdersRouter.get(
	"/status/:status",
	UserAuth([UserRoles.STORE_OWNER, UserRoles.STORE_EMPLOYEE]),
	routeHandler(OrdersController.findByStatus),
);

OrdersRouter.get(
	"/by/statuses",
	UserAuth([UserRoles.STORE_OWNER, UserRoles.STORE_EMPLOYEE]),
	routeHandler(OrdersController.getByStatuses),
);

OrdersRouter.get(
	"/stats/overview",
	UserAuth([UserRoles.STORE_OWNER, UserRoles.STORE_EMPLOYEE]),
	routeHandler(OrdersController.getOrderStats),
);
