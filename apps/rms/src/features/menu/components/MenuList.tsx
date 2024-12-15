import MenuCard from "@/features/menu/components/MenuCard";
import type { Menu } from "../types/Menu";

export default function MenuList({
	menus,
	onEditMenu,
	onAddMenuItem,
}: {
	menus: Menu[];
	onEditMenu: (menu: Menu) => void;
	onAddMenuItem: (menuId: string) => void;
}) {
	return (
		<div className="space-y-4">
			{menus.map((menu) => (
				<MenuCard
					key={menu._id}
					menu={menu}
					onEdit={() => onEditMenu(menu)}
					onAddItem={() => onAddMenuItem(menu._id)}
				/>
			))}
		</div>
	);
}
