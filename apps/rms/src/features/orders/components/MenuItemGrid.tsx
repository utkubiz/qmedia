import { addItem } from "@/features/cart/cartSlice";
import { useAppDispatch } from "@/state/store";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import type { CategorizedMenuItem } from "../types/OrderTypes";

export default function MenuItemGrid({ items }: { items: CategorizedMenuItem[] }) {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();

	const handleAddToCart = (item: CategorizedMenuItem) => {
		if (!item.isAvailable || !item.isActive) return;

		dispatch(addItem(item));
		toast.success(t("messages.itemAddedToCart"));
	};

	return (
		<div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
			{items.map((item) => (
				<button
					type="button"
					key={item._id}
					onClick={() => handleAddToCart(item)}
					className={`card bg-base-100 shadow-md hover:shadow-lg transition-all
                        ${
							!item.isAvailable || !item.isActive
								? "opacity-50 cursor-not-allowed"
								: "hover:scale-[1.02] active:scale-[0.98]"
						}`}
					disabled={!item.isAvailable || !item.isActive}
					title={
						!item.isAvailable
							? t("labels.unavailable")
							: !item.isActive
								? t("labels.inactive")
								: t("tooltips.addToCart")
					}
				>
					<div className="card-body">
						<div className="flex items-start justify-between">
							<h3 className="text-lg card-title">{item.name}</h3>
						</div>
						{item.description && <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>}
						<div className="flex items-center justify-between mt-auto">
							<span className="text-lg font-semibold text-primary">
								{item.price.toFixed(2)} {item.currency}
							</span>
							<div className="flex gap-1">
								{!item.isAvailable && (
									<span className="badge badge-error">{t("labels.unavailable")}</span>
								)}
								{!item.isActive && <span className="badge badge-error">{t("labels.inactive")}</span>}
							</div>
						</div>
					</div>
				</button>
			))}
		</div>
	);
}
