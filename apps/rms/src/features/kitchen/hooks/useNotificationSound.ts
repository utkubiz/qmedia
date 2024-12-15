import { useCallback, useEffect, useRef } from "react";

type SoundType = "new-order" | "status-change";

interface NotificationSounds {
	"new-order": string;
	"status-change": string;
}

const SOUNDS: NotificationSounds = {
	"new-order": "/sounds/new-order.mp3",
	"status-change": "/sounds/status-change.mp3",
};

export function useNotificationSound() {
	const audioRefs = useRef<Record<SoundType, HTMLAudioElement | null>>({
		"new-order": null,
		"status-change": null,
	});

	useEffect(() => {
		// Initialize audio elements
		for (const [key, path] of Object.entries(SOUNDS)) {
			const audio = new Audio(path);
			audio.preload = "auto";
			audioRefs.current[key as SoundType] = audio;
		}

		// Cleanup
		return () => {
			for (const audio of Object.values(audioRefs.current)) {
				if (audio) {
					audio.pause();
					audio.src = "";
				}
			}
		};
	}, []);

	const playSound = useCallback((type: SoundType) => {
		const audio = audioRefs.current[type];
		if (audio) {
			audio.currentTime = 0;
			audio.play().catch((error) => {
				console.error("Error playing sound:", error);
			});
		}
	}, []);

	return { playSound };
}
