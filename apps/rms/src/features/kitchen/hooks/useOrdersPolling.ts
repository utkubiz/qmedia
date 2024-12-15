import { useGetOrdersByStatusesQuery } from "@/features/orders/orderApiSlice";
import { OrderStatus } from "@qmedia/types";
export function useOrdersPolling(pollingInterval = 10000) {
	return useGetOrdersByStatusesQuery([OrderStatus.CONFIRMED, OrderStatus.PREPARING, OrderStatus.READY], {
		pollingInterval,
		refetchOnMountOrArgChange: true,
	});
}
