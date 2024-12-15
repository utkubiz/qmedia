import type { MenuItem } from "@/features/menu/types/Menu";
import type { OrderStatus } from "@qmedia/types";
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
