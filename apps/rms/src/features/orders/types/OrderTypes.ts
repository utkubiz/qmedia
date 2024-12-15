import type { MenuItem } from "@/features/menu/types/Menu";

export interface CategoryGroup {
	categoryName: string;
	menuItems: CategorizedMenuItem[];
}

export interface CategorizedMenuItem extends MenuItem {
	menuId: string;
}

export interface OrderItem {
	menuItemId: string;
	name: string;
	price: number;
	quantity: number;
	_id: string;
}

export interface OrderRequestItem {
	menuItemId: string;
	quantity: number;
}

export interface OrderRequest {
	items: OrderRequestItem[];
	notes?: string;
}

export interface Order {
	_id: string;
	tenantId: string;
	userId: string;
	items: OrderItem[];
	status: OrderStatus;
	totalAmount: number;
	notes?: string;
	createdAt: string;
	updatedAt: string;
}

export interface OrdersResponse {
	orders: Order[];
	pagination: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
		hasMore: boolean;
	};
}

export enum OrderStatus {
	NEW = "NEW",
	PENDING = "PENDING",
	CONFIRMED = "CONFIRMED",
	PREPARING = "PREPARING",
	READY = "READY",
	ON_THE_WAY = "ON_THE_WAY",
	DELIVERED = "DELIVERED",
	CANCELLED = "CANCELLED",
}
