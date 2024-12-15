export interface MenuItem {
	id: string;
	name: string;
	description: string;
	price: number;
	category: string;
	imageUrl?: string;
	isAvailable: boolean;
}

export interface MenuCategory {
	id: string;
	name: string;
	description?: string;
	items: MenuItem[];
}
