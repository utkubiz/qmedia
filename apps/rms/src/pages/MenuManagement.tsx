import ErrorAlert from "@/components/common/ErrorAlert";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import AddMenuItemModal from "@/features/menu/components/AddMenuItemModal";
import EmptyMenuState from "@/features/menu/components/EmptyMenuState";
import MenuFormModal from "@/features/menu/components/MenuFormModal";
import MenuHeader from "@/features/menu/components/MenuHeader";
import MenuList from "@/features/menu/components/MenuList";
import { useGetMenusQuery } from "@/features/menu/menuApiSlice";
import type { Menu } from "@/features/menu/types/Menu";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function MenuManagement() {
	const { t } = useTranslation();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isItemModalOpen, setIsItemModalOpen] = useState(false);
	const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
	const [selectedMenuForItem, setSelectedMenuForItem] = useState<string | null>(null);

	const { data: menus, isLoading, error } = useGetMenusQuery();

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (error) {
		return <ErrorAlert message={t("errors.failedToLoadMenus")} />;
	}

	const hasMenu = !!menus?.length;

	const handleAddMenu = () => {
		setSelectedMenu(null);
		setIsModalOpen(true);
	};

	const handleEditMenu = (menu: Menu) => {
		setSelectedMenu(menu);
		setIsModalOpen(true);
	};

	const handleAddMenuItem = (menuId: string) => {
		setSelectedMenuForItem(menuId);
		setIsItemModalOpen(true);
	};

	return (
		<>
			<div className="space-y-4">
				<MenuHeader hasMenu={hasMenu} onAddMenu={handleAddMenu} />
				<div className="space-y-4">
					{hasMenu ? (
						<MenuList menus={menus} onEditMenu={handleEditMenu} onAddMenuItem={handleAddMenuItem} />
					) : (
						<EmptyMenuState />
					)}
				</div>
			</div>

			{isModalOpen && (
				<MenuFormModal
					isOpen={isModalOpen}
					onClose={() => {
						setIsModalOpen(false);
						setSelectedMenu(null);
					}}
					selectedMenu={selectedMenu}
				/>
			)}

			{isItemModalOpen && selectedMenuForItem && (
				<AddMenuItemModal
					menuId={selectedMenuForItem}
					isOpen={isItemModalOpen}
					onClose={() => {
						setIsItemModalOpen(false);
						setSelectedMenuForItem(null);
					}}
				/>
			)}
		</>
	);
}
