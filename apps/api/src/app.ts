import { config } from "@/config";
import { db } from "@/db";
import { MenuRouter } from "@/features/menu/menu.route";
import { OrdersRouter } from "@/features/orders/orders.route";
import { StoreRouter } from "@/features/store/store.route";
import { UserRouter } from "@/features/user/user.route";
import { logger } from "@/shared/helpers/LogHelper";
import cookieParser from "cookie-parser";
import cors from "cors";
import type { NextFunction, Request, Response } from "express";
import express from "express";

const app = express();

const port = config.PORT;

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [config.WEB_BASE_URL];

app.use(
	cors({
		origin: (origin, callback) => {
			if ((origin && allowedOrigins.indexOf(origin) !== -1) || !origin) {
				callback(null, true);
			} else {
				callback(new Error("Not allowed by CORS"));
			}
		},
		credentials: true,
	}),
);

app.use((req: Request, res: Response, next: NextFunction) => {
	if (db.readyState !== 1) {
		logger.error("Mongo Service Unavailable");
		res.status(503).send("Service Unavailable");
		return;
	}
	next();
});

app.listen(port, () => {
	logger.success(`🚀 App running at http://localhost:${port}`);
});

app.get("/", async (req: Request, res: Response) => {
	res.send("App is live");
});

app.use("/api/v1/user", UserRouter);
app.use("/api/v1/store", StoreRouter);
app.use("/api/v1/menu", MenuRouter);
app.use("/api/v1/orders", OrdersRouter);
