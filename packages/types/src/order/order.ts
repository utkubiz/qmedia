export enum OrderStatus {
	NEW = "NEW",
	ON_THE_WAY = "ON_THE_WAY",
	PENDING = "PENDING",
	CONFIRMED = "CONFIRMED",
	PREPARING = "PREPARING",
	READY = "READY",
	COMPLETED = "COMPLETED",
	CANCELLED = "CANCELLED",
}

export interface Order {
	id: string;
	userId: string;
	items: OrderItem[];
	status: OrderStatus;
	totalAmount: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface OrderItem {
	id: string;
	menuItemId: string;
	quantity: number;
	price: number;
	notes?: string;
}
