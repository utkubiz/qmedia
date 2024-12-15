import type { CategorizedMenuItem } from "@/features/orders/types/OrderTypes";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CartItem {
	item: CategorizedMenuItem;
	quantity: number;
}

interface CartState {
	items: CartItem[];
	total: number;
}

const initialState: CartState = {
	items: [],
	total: 0,
};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItem: (state, action: PayloadAction<CategorizedMenuItem>) => {
			const existingItem = state.items.find((item) => item.item._id === action.payload._id);

			if (existingItem) {
				existingItem.quantity += 1;
			} else {
				state.items.push({ item: action.payload, quantity: 1 });
			}

			state.total = state.items.reduce((sum, item) => sum + item.item.price * item.quantity, 0);
		},
		removeItem: (state, action: PayloadAction<string>) => {
			state.items = state.items.filter((item) => item.item._id !== action.payload);
			state.total = state.items.reduce((sum, item) => sum + item.item.price * item.quantity, 0);
		},
		updateQuantity: (state, action: PayloadAction<{ itemId: string; quantity: number }>) => {
			const item = state.items.find((item) => item.item._id === action.payload.itemId);
			if (item) {
				item.quantity = action.payload.quantity;
				if (item.quantity <= 0) {
					state.items = state.items.filter((item) => item.item._id !== action.payload.itemId);
				}
			}
			state.total = state.items.reduce((sum, item) => sum + item.item.price * item.quantity, 0);
		},
		clearCart: (state) => {
			state.items = [];
			state.total = 0;
		},
	},
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
