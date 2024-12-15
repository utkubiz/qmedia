import { Timer } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface OrderTimerProps {
	createdAt: string;
	className?: string;
}

export default function OrderTimer({ createdAt, className = "" }: OrderTimerProps) {
	const { t } = useTranslation();
	const [duration, setDuration] = useState<string>("");

	useEffect(() => {
		const calculateDuration = () => {
			const now = new Date();
			const orderTime = new Date(createdAt);
			const diffInMinutes = Math.floor((now.getTime() - orderTime.getTime()) / 60000);

			if (diffInMinutes < 1) {
				return t("kitchen.timer.justNow");
			}
			if (diffInMinutes < 60) {
				return t("kitchen.timer.minutes", { minutes: diffInMinutes });
			}
			const hours = Math.floor(diffInMinutes / 60);
			const minutes = diffInMinutes % 60;
			return t("kitchen.timer.hoursAndMinutes", { hours, minutes });
		};

		// Initial calculation
		setDuration(calculateDuration());

		// Update every minute
		const interval = setInterval(() => {
			setDuration(calculateDuration());
		}, 60000); // Update every minute

		return () => clearInterval(interval);
	}, [createdAt, t]);

	const getTimerColor = () => {
		const diffInMinutes = Math.floor((new Date().getTime() - new Date(createdAt).getTime()) / 60000);

		if (diffInMinutes >= 30) return "text-error";
		if (diffInMinutes >= 15) return "text-warning";
		return "text-success";
	};

	return (
		<div className={`flex items-center gap-2 ${className}`}>
			<span className="text-base-content/60">
				<Timer size={18} className={getTimerColor()} />
			</span>
			<span className={`font-medium ${getTimerColor()}`}>{duration}</span>
		</div>
	);
}
