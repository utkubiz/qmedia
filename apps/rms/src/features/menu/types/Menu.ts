export interface MenuItem {
	_id: string;
	menuId: string;
	tenantId: string;
	name: string;
	description?: string;
	price: number;
	category: string;
	currency: string;
	isAvailable: boolean;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface Menu {
	_id: string;
	name: string;
	isActive: boolean;
	items: MenuItem[];
}
