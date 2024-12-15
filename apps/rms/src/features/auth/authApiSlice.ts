import type { LoginRequest } from "@/features/auth/types/LoginRequest.ts";
import api from "@/state/api.ts";
import { setTokens } from "./authSlice";
import type { AuthResponse } from "./types/AuthResponse";

const authApiSlice = api.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation<AuthResponse, LoginRequest>({
			query: (body) => ({
				url: "/user/login",
				method: "POST",
				body,
			}),
		}),
		logout: builder.mutation<void, void>({
			query: () => ({
				url: "/user/logout",
				method: "POST",
			}),
			async onQueryStarted(_, { dispatch }) {
				dispatch(setTokens(null));
			},
		}),
		refresh: builder.mutation<AuthResponse, void>({
			query: () => ({
				url: "/user/refresh",
				method: "POST",
			}),
		}),
	}),
});

export const { useLoginMutation, useRefreshMutation, useLogoutMutation } = authApiSlice;
