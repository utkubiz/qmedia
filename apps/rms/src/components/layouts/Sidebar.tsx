import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
	const { t } = useTranslation();

	return (
		<div className="grid grid-cols-1 gap-2 p-4 w-60">
			<NavLink
				to="/"
				className={({ isActive }) =>
					`btn btn-lg h-16 flex items-center justify-start px-4 ${isActive ? "btn-primary" : "btn-ghost"}`
				}
			>
				{t("sidebar.dashboard")}
			</NavLink>

			<NavLink
				to="/order"
				className={({ isActive }) =>
					`btn btn-lg h-16 flex items-center justify-start px-4 ${isActive ? "btn-primary" : "btn-ghost"}`
				}
			>
				{t("sidebar.order")}
			</NavLink>

			<NavLink
				to="/order-management"
				className={({ isActive }) =>
					`btn btn-lg h-16 flex items-center justify-start px-4 ${isActive ? "btn-primary" : "btn-ghost"}`
				}
			>
				{t("sidebar.orderManagement")}
			</NavLink>

			<NavLink
				to="/menu-management"
				className={({ isActive }) =>
					`btn btn-lg h-16 flex items-center justify-start px-4 ${isActive ? "btn-primary" : "btn-ghost"}`
				}
			>
				{t("sidebar.menus")}
			</NavLink>

			<NavLink
				to="/kitchen"
				className={({ isActive }) =>
					`btn btn-lg h-16 flex items-center justify-start px-4 ${isActive ? "btn-primary" : "btn-ghost"}`
				}
			>
				{t("sidebar.kitchen")}
			</NavLink>
		</div>
	);
}
