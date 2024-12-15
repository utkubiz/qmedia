import api from "@/state/api";
import type { OrderStatus } from "@qmedia/types";
import type { CategoryGroup, Order, OrderRequest, OrdersResponse } from "./types/OrderTypes";
const apiWithTag = api.enhanceEndpoints({ addTagTypes: ["Order"] });

export const orderApiSlice = apiWithTag.injectEndpoints({
	endpoints: (builder) => ({
		getCategorizedMenuItems: builder.query<CategoryGroup[], void>({
			query: () => ({
				url: "/menu/items/categorized",
				method: "GET",
			}),
			providesTags: ["Order"],
		}),
		createOrder: builder.mutation<Order, OrderRequest>({
			query: (body) => ({
				url: "/orders",
				method: "POST",
				body,
			}),
			invalidatesTags: ["Order"],
		}),
		getMyOrders: builder.query<Order[], void>({
			query: () => "/orders/my-orders",
			providesTags: ["Order"],
		}),
		getOrderById: builder.query<Order, string>({
			query: (id) => `/orders/${id}`,
			providesTags: (_result, _error, id) => [{ type: "Order", id }],
		}),
		getAllOrders: builder.query<OrdersResponse, { page?: number; limit?: number }>({
			query: ({ page = 1, limit = 10 } = {}) => ({
				url: "/orders",
				params: { page, limit },
			}),
			providesTags: ["Order"],
		}),
		getOrdersByStatuses: builder.query<Order[], OrderStatus[]>({
			query: (statuses) => `/orders/by/statuses?statuses=${statuses.join(",")}`,
			providesTags: ["Order"],
		}),
		updateOrderStatus: builder.mutation<Order, { id: string; status: OrderStatus }>({
			query: ({ id, status }) => ({
				url: `/orders/${id}/status`,
				method: "PUT",
				body: { status },
			}),
			invalidatesTags: ["Order"],
		}),
		getOrderStats: builder.query<
			{
				total: number;
				statusCounts: { [key in OrderStatus]: number };
				totalRevenue: number;
			},
			void
		>({
			query: () => "/orders/stats/overview",
			providesTags: ["Order"],
		}),
	}),
});

export const {
	useGetCategorizedMenuItemsQuery,
	useCreateOrderMutation,
	useGetMyOrdersQuery,
	useGetOrderByIdQuery,
	useGetAllOrdersQuery,
	useGetOrdersByStatusesQuery,
	useUpdateOrderStatusMutation,
	useGetOrderStatsQuery,
} = orderApiSlice;
