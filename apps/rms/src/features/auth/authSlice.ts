import { createSlice } from "@reduxjs/toolkit";
import type { Tokens } from "./types/Tokens";

interface AuthState {
	tokens: Tokens | null;
}

const initialState: AuthState = {
	tokens: null,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setTokens: (state, action) => {
			state.tokens = action.payload;
		},
	},
});

export const { setTokens } = authSlice.actions;
export default authSlice.reducer;
