import ErrorAlert from "@/components/common/ErrorAlert";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useGetAllOrdersQuery, useUpdateOrderStatusMutation } from "@/features/orders/orderApiSlice";
import type { OrderStatus } from "@/features/orders/types/OrderTypes";
import { formatDate } from "@/utils/formatDate";
import { handleApiError } from "@/utils/handleApiError";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

export default function OrderManagement() {
	const { t } = useTranslation();
	const [page, setPage] = useState(1);
	const { data, isLoading, error } = useGetAllOrdersQuery({ page });
	const [updateStatus] = useUpdateOrderStatusMutation();

	const handleStatusUpdate = async (orderId: string, newStatus: OrderStatus) => {
		try {
			await updateStatus({ id: orderId, status: newStatus }).unwrap();
			toast.success(t("messages.orderStatusUpdated"));
		} catch (error) {
			handleApiError(error);
		}
	};

	if (isLoading) return <LoadingSpinner />;
	if (error) return <ErrorAlert message={t("errors.failedToLoadOrders")} />;

	return (
		<div className="container p-4 mx-auto space-y-4">
			<h1 className="text-2xl font-bold">{t("titles.orderManagement")}</h1>

			<div className="overflow-x-auto rounded-lg shadow bg-base-100">
				<table className="table w-full">
					<thead>
						<tr>
							<th>{t("labels.orderId")}</th>
							<th>{t("labels.items")}</th>
							<th>{t("labels.notes")}</th>
							<th>{t("labels.total")}</th>
							<th>{t("labels.status")}</th>
							<th>{t("labels.orderDate")}</th>
						</tr>
					</thead>
					<tbody>
						{data?.orders.map((order) => (
							<tr key={order._id}>
								<td className="font-mono">{order._id}</td>
								<td>
									<div className="overflow-auto max-h-20">
										{order.items.map((item) => (
											<div key={item._id} className="text-sm">
												{item.quantity}x {item.name} ({item.price.toFixed(2)})
											</div>
										))}
									</div>
								</td>
								<td>{order.notes || "-"}</td>
								<td>{order.totalAmount.toFixed(2)}</td>
								<td>
									<select
										className="w-full max-w-xs select select-bordered select-sm"
										value={order.status}
										onChange={(e) => handleStatusUpdate(order._id, e.target.value as OrderStatus)}
									>
										<option value="PENDING">{t("orderStatus.PENDING")}</option>
										<option value="CONFIRMED">{t("orderStatus.CONFIRMED")}</option>
										<option value="PREPARING">{t("orderStatus.PREPARING")}</option>
										<option value="READY">{t("orderStatus.READY")}</option>
										<option value="DELIVERED">{t("orderStatus.DELIVERED")}</option>
										<option value="CANCELLED">{t("orderStatus.CANCELLED")}</option>
									</select>
								</td>
								<td>{formatDate(order.createdAt)}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Pagination */}
			{data && (
				<div className="flex justify-center gap-2">
					<button
						type="button"
						className="btn btn-sm"
						disabled={page === 1}
						onClick={() => setPage((p) => p - 1)}
					>
						{t("buttons.previous")}
					</button>
					<span className="flex items-center px-4">
						{t("labels.page")} {page} / {data.pagination.totalPages}
					</span>
					<button
						type="button"
						className="btn btn-sm"
						disabled={!data.pagination.hasMore}
						onClick={() => setPage((p) => p + 1)}
					>
						{t("buttons.next")}
					</button>
				</div>
			)}
		</div>
	);
}
