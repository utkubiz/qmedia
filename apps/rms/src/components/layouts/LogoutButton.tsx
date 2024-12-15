import { useLogoutMutation } from "@/features/auth/authApiSlice";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
	const navigate = useNavigate();
	const { t } = useTranslation();

	const [logout, { isLoading }] = useLogoutMutation();

	return (
		<button
			type="button"
			disabled={isLoading}
			onClick={async () => {
				try {
					await logout().unwrap();
					navigate("/auth/login");
				} catch (error) {
					console.error(error);
					navigate("/auth/login");
				}
			}}
			className="btn btn-ghost btn-sm h-12 min-w-[120px] touch-manipulation text-error"
			style={{
				WebkitTapHighlightColor: "transparent",
				touchAction: "manipulation",
				userSelect: "none",
			}}
			aria-label={t("common.logout")}
		>
			{isLoading && <span className="loading loading-spinner loading-xs" />}
			{t("common.logout")}
		</button>
	);
}
