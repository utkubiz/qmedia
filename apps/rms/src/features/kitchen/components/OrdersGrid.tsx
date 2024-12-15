import type { Order } from "@/features/orders/types/OrderTypes";
import type { OrderStatus } from "@qmedia/types";
import OrderCard from "./OrderCard";

export default function OrdersGrid({
	orders,
	onStatusUpdate,
}: {
	orders: Order[];
	onStatusUpdate: (orderId: string, status: OrderStatus) => void;
}) {
	return (
		<div className="flex-grow overflow-x-auto">
			<div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-7 ">
				{orders.map((order) => (
					<div key={order._id} className="flex">
						<OrderCard order={order} onStatusUpdate={onStatusUpdate} />
					</div>
				))}
			</div>
		</div>
	);
}
