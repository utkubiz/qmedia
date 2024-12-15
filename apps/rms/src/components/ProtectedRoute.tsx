import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useRefreshMutation } from "@/features/auth/authApiSlice";
import { setTokens } from "@/features/auth/authSlice";
import { useAppDispatch } from "@/state/store";
import { isAuthenticated } from "@/utils/isAuthenticated";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
	const dispatch = useAppDispatch();
	const [refresh] = useRefreshMutation();
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		const refreshToken = async () => {
			try {
				// If already authenticated, no need to refresh
				if (isAuthenticated()) {
					setIsLoading(false);
					return;
				}

				const result = await refresh().unwrap();
				dispatch(setTokens(result));
				setIsLoading(false);
			} catch (error) {
				console.error("Token refresh failed:", error);
				setIsError(true);
				setIsLoading(false);
			}
		};

		refreshToken();
	}, [dispatch, refresh]);

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (isError || !isAuthenticated()) {
		return <Navigate to="/auth/login" replace />;
	}

	return <Outlet />;
};

export default ProtectedRoute;
