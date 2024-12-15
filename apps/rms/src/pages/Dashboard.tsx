import ErrorAlert from "@/components/common/ErrorAlert";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import DashboardStats from "@/features/dashboard/components/DashboardStats";
import { useGetOrderStatsQuery } from "@/features/orders/orderApiSlice";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
	const { t } = useTranslation();
	const { data: stats, isLoading, error } = useGetOrderStatsQuery();

	if (isLoading) return <LoadingSpinner />;
	if (error) return <ErrorAlert message={t("errors.default")} />;
	if (!stats) return null;

	return (
		<div className="container p-4 mx-auto">
			<h1 className="mb-6 text-2xl font-bold">{t("sidebar.dashboard")}</h1>
			<DashboardStats stats={stats} />
		</div>
	);
}
