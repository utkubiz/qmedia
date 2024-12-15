import type { OrderStatus } from "@/features/orders/types/OrderTypes";

export type KitchenOrderStatus =
	| OrderStatus.CONFIRMED
	| OrderStatus.PREPARING
	| OrderStatus.READY
	| OrderStatus.ON_THE_WAY;
export type OrderStatusWithAll = KitchenOrderStatus | "ALL";
