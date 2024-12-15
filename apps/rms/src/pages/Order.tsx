import ErrorAlert from "@/components/common/ErrorAlert";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import Cart from "@/features/cart/components/Cart";
import CategorySelector from "@/features/orders/components/CategorySelector";
import MenuItemGrid from "@/features/orders/components/MenuItemGrid";
import { useGetCategorizedMenuItemsQuery } from "@/features/orders/orderApiSlice";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Order() {
	const { t } = useTranslation();
	const { data: categorizedItems, isLoading, error } = useGetCategorizedMenuItemsQuery();
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

	useEffect(() => {
		if (categorizedItems && categorizedItems.length > 0) {
			setSelectedCategory(categorizedItems[0]?.categoryName || null);
		}
	}, [categorizedItems]);

	if (isLoading) return <LoadingSpinner />;
	if (error) return <ErrorAlert message={t("errors.failedToLoadMenus")} />;

	const categories = categorizedItems?.map((group) => group.categoryName) || [];
	const selectedItems = categorizedItems?.find((group) => group.categoryName === selectedCategory)?.menuItems || [];

	return (
		<div className="flex h-[calc(100vh-4rem)]">
			<div className="flex-1 p-4 space-y-6 overflow-auto">
				<CategorySelector
					categories={categories}
					selectedCategory={selectedCategory}
					onSelectCategory={setSelectedCategory}
				/>
				<MenuItemGrid items={selectedItems} />
			</div>
			<div className="border-l w-96 bg-base-100">
				<Cart />
			</div>
		</div>
	);
}
