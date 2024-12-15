import { UserController } from "@/features/user/user.controller";
import { routeHandler } from "@/shared/helpers/RouteHelper";
import express from "express";

export const UserRouter = express.Router();

UserRouter.post("/register", routeHandler(UserController.register));
UserRouter.post("/login", routeHandler(UserController.login));
UserRouter.post("/refresh", routeHandler(UserController.refresh));
UserRouter.post("/logout", routeHandler(UserController.logout));
