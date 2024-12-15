import { UserRoles } from "@/features/user/user.type";
import { routeHandler } from "@/shared/helpers/RouteHelper";
import { UserAuth } from "@/shared/middlewares/UserAuth";
import express from "express";
import { StoreController } from "./store.controller";

export const StoreRouter = express.Router();

StoreRouter.get("/", UserAuth(), routeHandler(StoreController.findById));
StoreRouter.post("/", UserAuth([UserRoles.SUPER_ADMIN]), routeHandler(StoreController.create));
