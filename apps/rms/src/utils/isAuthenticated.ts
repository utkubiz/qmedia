import { store } from "@/state/store";

export const isAuthenticated = () => {
	const state = store.getState();
	const tokens = state.auth.tokens;

	// If we're in the middle of refreshing, consider the user authenticated
	if (state.api.queries.refresh?.status === "pending") {
		return true;
	}

	return !!tokens?.accessToken;
};
