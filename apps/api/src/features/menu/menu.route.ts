import { UserRoles } from "@/features/user/user.type";
import { routeHandler } from "@/shared/helpers/RouteHelper";
import { UserAuth } from "@/shared/middlewares/UserAuth";
import express from "express";
import { MenuController } from "./menu.controller";

export const MenuRouter = express.Router();

// Public menu routes
// Menu operations
MenuRouter.get("/", UserAuth(), routeHandler(MenuController.findAllByTenantId));
MenuRouter.get("/:id", UserAuth(), routeHandler(MenuController.findById));

// Menu items operations
MenuRouter.get("/:menuId/items", UserAuth(), routeHandler(MenuController.findItems));
MenuRouter.get("/:menuId/items/:itemId", UserAuth(), routeHandler(MenuController.findItemById));

// Categories operations
MenuRouter.get("/:menuId/categories", UserAuth(), routeHandler(MenuController.getCategories));
MenuRouter.get("/:menuId/categories/:category", UserAuth(), routeHandler(MenuController.findItemsByCategory));

// Categorized menu items
MenuRouter.get("/items/categorized", UserAuth(), routeHandler(MenuController.getCategorizedItems));

// Store owner menu routes
// Menu CRUD operations
MenuRouter.post("/", UserAuth([UserRoles.STORE_OWNER]), routeHandler(MenuController.create));
MenuRouter.put("/:id", UserAuth([UserRoles.STORE_OWNER]), routeHandler(MenuController.update));
MenuRouter.delete("/:id", UserAuth([UserRoles.STORE_OWNER]), routeHandler(MenuController.delete));

// Menu items CRUD operations
MenuRouter.post("/:menuId/items", UserAuth([UserRoles.STORE_OWNER]), routeHandler(MenuController.addItem));
MenuRouter.put("/:menuId/items/:itemId", UserAuth([UserRoles.STORE_OWNER]), routeHandler(MenuController.updateItem));
MenuRouter.delete("/:menuId/items/:itemId", UserAuth([UserRoles.STORE_OWNER]), routeHandler(MenuController.deleteItem));

// Menu status operations
MenuRouter.put("/:id/activate", UserAuth([UserRoles.STORE_OWNER]), routeHandler(MenuController.activateMenu));
MenuRouter.put("/:id/deactivate", UserAuth([UserRoles.STORE_OWNER]), routeHandler(MenuController.deactivateMenu));
