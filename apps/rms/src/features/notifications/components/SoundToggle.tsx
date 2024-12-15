import { useAppDispatch, useAppSelector } from "@/state/store";
import { Volume2, VolumeX } from "lucide-react";
import { useTranslation } from "react-i18next";
import { selectSoundEnabled, toggleSound } from "../notificationSlice";

interface SoundToggleProps {
	className?: string;
}

export default function SoundToggle({ className = "" }: SoundToggleProps) {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const soundEnabled = useAppSelector(selectSoundEnabled);

	return (
		<button
			type="button"
			onClick={() => dispatch(toggleSound())}
			className={`btn btn-ghost btn-circle ${className}`}
			title={soundEnabled ? t("notifications.sound.disable") : t("notifications.sound.enable")}
		>
			{soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
		</button>
	);
}
