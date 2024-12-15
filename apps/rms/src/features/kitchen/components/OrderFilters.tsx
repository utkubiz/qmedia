import { OrderStatus } from "@qmedia/types";
import { useTranslation } from "react-i18next";
import type { OrderStatusWithAll } from "../types/KitchenTypes";

type OrderCounts = Record<OrderStatusWithAll, number>;

interface OrderFiltersProps {
	selectedStatus: OrderStatusWithAll;
	onStatusChange: (status: OrderStatusWithAll) => void;
	orderCounts: OrderCounts;
}

export default function OrderFilters({ selectedStatus, onStatusChange, orderCounts }: OrderFiltersProps) {
	const { t } = useTranslation();
	const statuses: OrderStatusWithAll[] = ["ALL", OrderStatus.CONFIRMED, OrderStatus.PREPARING, OrderStatus.READY];

	return (
		<div className="flex gap-2 mb-4 overflow-x-auto">
			{statuses.map((status) => (
				<button
					key={status}
					type="button"
					onClick={() => onStatusChange(status)}
					className={`btn ${selectedStatus === status ? "btn-primary" : "btn-ghost"}`}
				>
					{t(`orderStatus.${status}`)}
					<span className="ml-2 badge badge-sm">{orderCounts[status]}</span>
				</button>
			))}
		</div>
	);
}
