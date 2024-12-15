import ErrorAlert from "@/components/common/ErrorAlert";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import OrdersGrid from "@/features/kitchen/components/OrdersGrid";
import { useOrdersPolling } from "@/features/kitchen/hooks/useOrdersPolling";
import SoundToggle from "@/features/notifications/components/SoundToggle";
import { useNotificationSound } from "@/features/notifications/hooks/useNotificationSound";
import { selectSoundEnabled } from "@/features/notifications/notificationSlice";
import { useUpdateOrderStatusMutation } from "@/features/orders/orderApiSlice";
import type { Order } from "@/features/orders/types/OrderTypes";
import { useAppSelector } from "@/state/store";
import { handleApiError } from "@/utils/handleApiError";
import type { OrderStatus } from "@qmedia/types";
import { useCallback, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

export default function Kitchen() {
	const { t } = useTranslation();
	const { data: orders = [], isLoading, error } = useOrdersPolling();
	const [updateStatus] = useUpdateOrderStatusMutation();
	const { playSound } = useNotificationSound();
	const soundEnabled = useAppSelector(selectSoundEnabled);
	const previousOrdersRef = useRef<Order[]>([]);

	// Check for new orders and play sound
	useEffect(() => {
		if (soundEnabled && previousOrdersRef.current.length < orders.length) {
			playSound("new-order");
		}
		previousOrdersRef.current = orders;
	}, [orders, playSound, soundEnabled]);

	const handleStatusUpdate = useCallback(
		async (orderId: string, newStatus: OrderStatus) => {
			try {
				await updateStatus({ id: orderId, status: newStatus }).unwrap();
				if (soundEnabled) {
					playSound("status-change");
				}
				toast.success(t("messages.orderStatusUpdated"));
			} catch (error) {
				handleApiError(error);
			}
		},
		[updateStatus, t, playSound, soundEnabled],
	);

	if (isLoading) return <LoadingSpinner />;
	if (error) return <ErrorAlert message={t("errors.failedToLoadOrders")} />;
	if (!orders.length) {
		return (
			<div className="flex items-center justify-center h-screen">
				<p className="text-gray-500">{t("kitchen.noOrders")}</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col h-screen p-4">
			<div className="flex items-center justify-end mb-4">
				<SoundToggle />
			</div>
			<OrdersGrid orders={orders} onStatusUpdate={handleStatusUpdate} />
		</div>
	);
}
