import api from "@/state/api";
import type { MenuItemFormData } from "./menuItemSchema";
import type { MenuFormData } from "./menuSchema";
import type { Menu, MenuItem } from "./types/Menu";

const apiWithTag = api.enhanceEndpoints({ addTagTypes: ["Menu"] });

const menuApiSlice = apiWithTag.injectEndpoints({
	endpoints: (builder) => ({
		getMenus: builder.query<Menu[], void>({
			query: () => "/menu",
			providesTags: ["Menu"],
		}),
		getMenuItems: builder.query<MenuItem[], string>({
			query: (menuId) => `/menu/${menuId}/items`,
			providesTags: (_result, _error, menuId) => [{ type: "Menu", id: menuId }],
		}),
		createMenu: builder.mutation<Menu, MenuFormData>({
			query: (body) => ({
				url: "/menu",
				method: "POST",
				body,
			}),
			invalidatesTags: ["Menu"],
		}),
		updateMenu: builder.mutation<Menu, { id: string; body: MenuFormData }>({
			query: ({ id, body }) => ({
				url: `/menu/${id}`,
				method: "PUT",
				body,
			}),
			invalidatesTags: ["Menu"],
		}),
		deleteMenu: builder.mutation<void, string>({
			query: (id) => ({
				url: `/menu/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Menu"],
		}),
		activateMenu: builder.mutation<void, string>({
			query: (id) => ({
				url: `/menu/${id}/activate`,
				method: "POST",
			}),
			invalidatesTags: ["Menu"],
		}),
		deactivateMenu: builder.mutation<void, string>({
			query: (id) => ({
				url: `/menu/${id}/deactivate`,
				method: "POST",
			}),
			invalidatesTags: ["Menu"],
		}),
		createMenuItem: builder.mutation<void, { menuId: string; body: MenuItemFormData }>({
			query: ({ menuId, body }) => ({
				url: `/menu/${menuId}/items`,
				method: "POST",
				body,
			}),
			invalidatesTags: (_result, _error, { menuId }) => [{ type: "Menu", id: menuId }],
		}),
		updateMenuItem: builder.mutation<
			void,
			{ menuId: string; itemId: string; body: MenuItemFormData & { isActive: boolean; isAvailable: boolean } }
		>({
			query: ({ menuId, itemId, body }) => ({
				url: `/menu/${menuId}/items/${itemId}`,
				method: "PUT",
				body,
			}),
			invalidatesTags: (_result, _error, { menuId }) => [{ type: "Menu", id: menuId }],
		}),
		deleteMenuItem: builder.mutation<void, { menuId: string; itemId: string }>({
			query: ({ menuId, itemId }) => ({
				url: `/menu/${menuId}/items/${itemId}`,
				method: "DELETE",
			}),
			invalidatesTags: (_result, _error, { menuId }) => [{ type: "Menu", id: menuId }],
		}),
		getMenuCategories: builder.query<string[], string>({
			query: (menuId) => `/menu/${menuId}/categories`,
			providesTags: (_result, _error, menuId) => [{ type: "Menu", id: menuId }],
		}),
	}),
});

export const {
	useGetMenusQuery,
	useGetMenuItemsQuery,
	useCreateMenuMutation,
	useUpdateMenuMutation,
	useDeleteMenuMutation,
	useActivateMenuMutation,
	useDeactivateMenuMutation,
	useCreateMenuItemMutation,
	useUpdateMenuItemMutation,
	useDeleteMenuItemMutation,
	useGetMenuCategoriesQuery,
} = menuApiSlice;
