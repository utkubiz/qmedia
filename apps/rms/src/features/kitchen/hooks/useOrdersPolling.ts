import { useGetOrdersByStatusesQuery } from "@/features/orders/orderApiSlice";
import { OrderStatus } from "@/features/orders/types/OrderTypes";

export function useOrdersPolling(pollingInterval = 10000) {
	return useGetOrdersByStatusesQuery([OrderStatus.CONFIRMED, OrderStatus.PREPARING, OrderStatus.READY], {
		pollingInterval,
		refetchOnMountOrArgChange: true,
	});
}
