import type { Order } from "@/features/orders/types/OrderTypes";
import { OrderStatus } from "@/features/orders/types/OrderTypes";
import { Bike, BikeIcon, CheckCircleIcon, CoffeeIcon, GraduationCap, Timer } from "lucide-react";
import { useTranslation } from "react-i18next";
import StatusTimer from "./StatusTimer";

interface OrderCardProps {
	order: Order;
	onStatusUpdate: (orderId: string, status: OrderStatus) => void;
}

export default function OrderCard({ order, onStatusUpdate }: OrderCardProps) {
	const { t } = useTranslation();

	const getStatusColor = () => {
		switch (order.status) {
			case OrderStatus.CONFIRMED:
				return "bg-base-300 text-base-content";
			case OrderStatus.PREPARING:
				return "bg-warning text-warning-content";
			case OrderStatus.READY:
				return "bg-success text-white";
			default:
				return "bg-base-200 text-base-content";
		}
	};

	const getQuickActions = () => {
		return (
			<div className="flex gap-3 mt-4">
				<button
					type="button"
					onClick={() => {
						if (order.status === OrderStatus.CONFIRMED) {
							onStatusUpdate(order._id, OrderStatus.PREPARING);
						} else if (order.status === OrderStatus.PREPARING) {
							onStatusUpdate(order._id, OrderStatus.READY);
						} else if (order.status === OrderStatus.READY) {
							onStatusUpdate(order._id, OrderStatus.ON_THE_WAY);
						}
					}}
					className="w-full text-lg text-white btn btn-success btn-md h-14"
					title={t("kitchen.actions.updateOrder")}
				>
					{order.status === OrderStatus.CONFIRMED && <CoffeeIcon size={24} />}
					{order.status === OrderStatus.PREPARING && <CheckCircleIcon size={24} />}
					{order.status === OrderStatus.READY && <BikeIcon size={24} />}
					<span className="ml-2">
						{order.status === OrderStatus.CONFIRMED && t("kitchen.actions.startPreparing")}
						{order.status === OrderStatus.PREPARING && t("kitchen.actions.markReady")}
						{order.status === OrderStatus.READY && t("kitchen.actions.markOnTheWay")}
					</span>
				</button>
			</div>
		);
	};

	return (
		<div
			className="flex flex-col justify-between w-full overflow-auto border rounded-lg shadow-md w-hidden"
			data-theme="light"
		>
			{/* Header */}
			<div className={`p-4 rounded-t-lg ${getStatusColor()}`}>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Bike className="w-8 h-8 p-1 rounded-full bg-amber-400" />
						<GraduationCap className="w-8 h-8 p-1 bg-white rounded-full" />
					</div>
					<div className="font-mono text-2xl">#{order._id.slice(-6)}</div>
					<div className="flex items-center gap-2">
						<Timer size={20} />
						<StatusTimer statusUpdatedAt={order.updatedAt} />
					</div>
				</div>
			</div>

			{/* Content */}
			<div className="flex-grow p-4">
				<div className="space-y-3">
					{order.items.map((item) => (
						<div key={item._id} className="text-lg">
							<span className="font-bold">{item.quantity}x</span> {item.name}
						</div>
					))}
				</div>

				{/* Notes */}
				{order.notes && <div className="mt-4 text-sm text-gray-600">{order.notes}</div>}
			</div>

			{/* Action Button */}
			<div className="p-2">{getQuickActions()}</div>
		</div>
	);
}
