import { config } from "@/config";
import { setTokens } from "@/features/auth/authSlice.ts";
import type { RootState } from "@/state/store.ts";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
	baseUrl: config.API_BASE_URL,
	prepareHeaders: (headers, { getState }) => {
		const token = (getState() as RootState).auth.tokens?.accessToken;
		if (token) {
			headers.set("authorization", `Bearer ${token}`);
		}
		return headers;
	},
	credentials: "include",
});

const baseQueryWithReauth: typeof baseQuery = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions);

	if (result?.error?.status === 401) {
		const refreshResult = await baseQuery(
			{
				url: "/user/refresh",
				method: "POST",
			},
			api,
			extraOptions,
		);

		if (refreshResult?.data) {
			api.dispatch(setTokens(refreshResult.data));
			result = await baseQuery(args, api, extraOptions);
		} else {
			api.dispatch(setTokens(null));
		}
	}
	return result;
};

const api = createApi({
	reducerPath: "api",
	baseQuery: baseQueryWithReauth,
	endpoints: () => ({}),
});

export default api;
