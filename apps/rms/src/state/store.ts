import authReducer from "@/features/auth/authSlice.ts";
import cartReducer from "@/features/cart/cartSlice";
import notificationReducer from "@/features/notifications/notificationSlice";
import api from "@/state/api.ts";
import { configureStore } from "@reduxjs/toolkit";
import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const loadState = () => {
	try {
		const serializedState = localStorage.getItem("cart");
		if (serializedState === null) {
			return undefined;
		}
		return JSON.parse(serializedState);
	} catch (err) {
		return undefined;
	}
};

const saveState = (state: any) => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem("cart", serializedState);
	} catch {
		// Ignore write errors
	}
};

export const store = configureStore({
	reducer: {
		auth: authReducer,
		[api.reducerPath]: api.reducer,
		cart: cartReducer,
		notifications: notificationReducer,
	},
	preloadedState: {
		cart: loadState(),
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

store.subscribe(() => {
	saveState(store.getState().cart);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
