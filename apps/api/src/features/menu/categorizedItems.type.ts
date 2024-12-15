import type { IMenuItem } from "./menuItem.model";

export interface ICategorizedItems {
	categoryName: string;
	menuItems: IMenuItem[];
}

export const asCategorizedItems = (items: IMenuItem[]): ICategorizedItems[] => {
	const categories = [...new Set(items.map((item) => item.category))];

	return categories.map((category) => ({
		categoryName: category,
		menuItems: items.filter((item) => item.category === category),
	}));
};
