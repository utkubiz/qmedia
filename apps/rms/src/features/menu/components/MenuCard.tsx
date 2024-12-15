import ErrorAlert from "@/components/common/ErrorAlert";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useDeleteMenuItemMutation, useGetMenuItemsQuery } from "@/features/menu/menuApiSlice";
import type { Menu, MenuItem } from "@/features/menu/types/Menu";
import { formatDate } from "@/utils/formatDate";
import { handleApiError } from "@/utils/handleApiError";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import EditMenuItemModal from "./EditMenuItemModal";

export default function MenuCard({
	menu,
	onEdit,
	onAddItem,
}: {
	menu: Menu;
	onEdit: () => void;
	onAddItem: () => void;
}) {
	const { t } = useTranslation();
	const { data: menuItems, isLoading, error } = useGetMenuItemsQuery(menu._id);
	const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
	const [deleteMenuItem] = useDeleteMenuItemMutation();

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (error) {
		return <ErrorAlert message={t("errors.failedToLoadMenus")} />;
	}

	const handleDeleteItem = async (itemId: string) => {
		if (window.confirm(t("messages.confirmDeleteItem"))) {
			try {
				await deleteMenuItem({ menuId: menu._id, itemId }).unwrap();
				toast.success(t("messages.menuItemDeleted"));
			} catch (error) {
				handleApiError(error);
			}
		}
	};

	return (
		<>
			<div className="border shadow card bg-base-100 border-base-300">
				<div className="card-body">
					{/* Menu Header */}
					<div className="flex items-center justify-between">
						<h2 className="card-title">
							{menu.name}
							<div className="ml-2 badge badge-sm">
								{menuItems?.length || 0} {t("labels.items")}
							</div>
						</h2>
						<div className="flex gap-2">
							<button
								type="button"
								className="btn btn-primary btn-sm h-12 min-w-[120px] touch-manipulation"
								onClick={onAddItem}
							>
								{t("buttons.addMenuItem")}
							</button>
							<button
								type="button"
								className="btn btn-ghost btn-sm h-12 min-w-[100px] touch-manipulation"
								onClick={onEdit}
							>
								{t("buttons.edit")}
							</button>
						</div>
					</div>

					{/* Menu Items Table */}
					{menuItems && menuItems.length > 0 ? (
						<div className="overflow-x-auto">
							<table className="table table-zebra">
								<thead>
									<tr>
										<th className="min-w-[120px]">{t("labels.itemName")}</th>
										<th className="min-w-[150px]">{t("labels.itemDescription")}</th>
										<th className="min-w-[120px]">{t("labels.itemCategory")}</th>
										<th className="min-w-[100px]">{t("labels.itemPrice")}</th>
										<th className="min-w-[100px]">{t("labels.stock")}</th>
										<th className="min-w-[100px]">{t("labels.status")}</th>
										<th className="min-w-[120px]">{t("labels.lastUpdated")}</th>
										<th className="min-w-[140px]">{t("labels.actions")}</th>
									</tr>
								</thead>
								<tbody>
									{menuItems.map((item) => (
										<tr key={item._id}>
											<td>{item.name}</td>
											<td>{item.description || "-"}</td>
											<td>{item.category}</td>
											<td>
												{item.price.toFixed(2)} {item.currency}
											</td>
											<td>
												<div
													className={`badge ${item.isAvailable ? "badge-success" : "badge-error"}`}
												>
													{item.isAvailable ? t("labels.available") : t("labels.unavailable")}
												</div>
											</td>
											<td>
												<div
													className={`badge ${item.isActive ? "badge-success" : "badge-error"}`}
												>
													{item.isActive ? t("labels.active") : t("labels.inactive")}
												</div>
											</td>
											<td>
												<span className="text-sm text-gray-500" title={item.updatedAt}>
													{formatDate(item.updatedAt)}
												</span>
											</td>
											<td>
												<div className="flex gap-2">
													<button
														type="button"
														className="btn btn-ghost btn-sm h-10 min-w-[60px] touch-manipulation"
														onClick={() => setSelectedItem(item)}
													>
														{t("buttons.edit")}
													</button>
													<button
														type="button"
														className="btn btn-ghost btn-sm h-10 min-w-[60px] touch-manipulation text-error"
														onClick={() => handleDeleteItem(item._id)}
													>
														{t("buttons.delete")}
													</button>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					) : (
						<div className="py-4 text-center text-gray-500">{t("messages.noItems")}</div>
					)}
				</div>
			</div>

			{selectedItem && (
				<EditMenuItemModal
					menuId={menu._id}
					item={selectedItem}
					isOpen={!!selectedItem}
					onClose={() => setSelectedItem(null)}
				/>
			)}
		</>
	);
}
