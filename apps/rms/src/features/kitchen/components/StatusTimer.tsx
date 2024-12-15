import { useEffect, useState } from "react";

interface StatusTimerProps {
	statusUpdatedAt: string;
}

export default function StatusTimer({ statusUpdatedAt }: StatusTimerProps) {
	const [time, setTime] = useState<string>("00:00:00");

	useEffect(() => {
		const calculateTime = () => {
			const now = new Date().getTime();
			const start = new Date(statusUpdatedAt).getTime();
			const diff = now - start;

			const hours = Math.floor(diff / (1000 * 60 * 60));
			const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((diff % (1000 * 60)) / 1000);

			return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
		};

		// Initial calculation
		setTime(calculateTime());

		// Update every second
		const interval = setInterval(() => {
			setTime(calculateTime());
		}, 1000);

		return () => clearInterval(interval);
	}, [statusUpdatedAt]);

	return <span className="font-mono text-xl">{time}</span>;
}
