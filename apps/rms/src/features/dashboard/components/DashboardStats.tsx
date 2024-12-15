import { CircleDollarSign, Package, Timer } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function DashboardStats({
	stats: { total, statusCounts, totalRevenue },
}: {
	stats: {
		total: number;
		statusCounts: {
			PENDING: number;
			PREPARING: number;
		};
		totalRevenue: number;
	};
}) {
	const { t } = useTranslation();

	return (
		<div className="grid gap-4 md:grid-cols-3">
			<div className="p-6 rounded-lg shadow-md bg-base-100">
				<div className="flex items-center gap-4">
					<div className="p-3 rounded-full bg-primary/10">
						<Package className="w-6 h-6 text-primary" />
					</div>
					<div>
						<h3 className="text-sm font-medium text-gray-500">{t("dashboard.totalOrders")}</h3>
						<p className="text-2xl font-semibold">{total}</p>
					</div>
				</div>
			</div>

			<div className="p-6 rounded-lg shadow-md bg-base-100">
				<div className="flex items-center gap-4">
					<div className="p-3 rounded-full bg-warning/10">
						<Timer className="w-6 h-6 text-warning" />
					</div>
					<div>
						<h3 className="text-sm font-medium text-gray-500">{t("dashboard.pendingOrders")}</h3>
						<div className="flex items-baseline gap-2">
							<p className="text-2xl font-semibold">{statusCounts.PENDING + statusCounts.PREPARING}</p>
							<span className="text-sm text-gray-500">
								({statusCounts.PENDING} {t("dashboard.waiting")}, {statusCounts.PREPARING}{" "}
								{t("dashboard.inProgress")})
							</span>
						</div>
					</div>
				</div>
			</div>

			<div className="p-6 rounded-lg shadow-md bg-base-100">
				<div className="flex items-center gap-4">
					<div className="p-3 rounded-full bg-success/10">
						<CircleDollarSign className="w-6 h-6 text-success" />
					</div>
					<div>
						<h3 className="text-sm font-medium text-gray-500">{t("dashboard.totalRevenue")}</h3>
						<p className="text-2xl font-semibold">{(totalRevenue / 100).toFixed(2)} ₺</p>
					</div>
				</div>
			</div>
		</div>
	);
}
