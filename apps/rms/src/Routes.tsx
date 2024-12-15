import { Navigate, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthLayout from "./components/layouts/AuthLayout";
import KitchenLayout from "./components/layouts/KitchenLayout";
import RootLayout from "./components/layouts/RootLayout";
import Dashboard from "./pages/Dashboard";
import Kitchen from "./pages/Kitchen";
import Login from "./pages/Login";
import MenuManagement from "./pages/MenuManagement";
import NotFound from "./pages/NotFound";
import Order from "./pages/Order";
import OrderManagement from "./pages/OrderManagement";

export const routes = createBrowserRouter([
	{
		path: "/",
		element: (
			<RootLayout>
				<ProtectedRoute />
			</RootLayout>
		),
		children: [
			{
				index: true,
				element: <Dashboard />,
			},
			{
				path: "menu-management",
				element: <MenuManagement />,
			},
			{
				path: "order",
				element: <Order />,
			},
			{
				path: "order-management",
				element: <OrderManagement />,
			},
		],
	},
	{
		path: "/kitchen",
		element: (
			<KitchenLayout>
				<ProtectedRoute />
			</KitchenLayout>
		),
		children: [
			{
				index: true,
				element: <Kitchen />,
			},
		],
	},
	{
		path: "/auth",
		element: <AuthLayout />,
		children: [
			{
				index: true,
				element: <Navigate to="/auth/login" replace />,
			},
			{
				path: "login",
				element: <Login />,
			},
		],
	},
	{
		path: "*",
		element: <NotFound />,
	},
]);
