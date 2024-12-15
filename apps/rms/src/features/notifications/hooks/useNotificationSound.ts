import { useCallback, useEffect, useRef, useState } from "react";

export type NotificationSoundType = "new-order" | "status-change" | "alert" | "success";

interface NotificationSounds {
	"new-order": string;
	"status-change": string;
	alert: string;
	success: string;
}

const SOUNDS: NotificationSounds = {
	"new-order": "/sounds/new-order.mp3",
	"status-change": "/sounds/status-change.mp3",
	alert: "/sounds/alert.mp3",
	success: "/sounds/success.mp3",
};

export function useNotificationSound() {
	const audioRefs = useRef<Record<NotificationSoundType, HTMLAudioElement | null>>({
		"new-order": null,
		"status-change": null,
		alert: null,
		success: null,
	});
	const [isInitialized, setIsInitialized] = useState(false);

	useEffect(() => {
		// Initialize audio elements
		for (const [key, path] of Object.entries(SOUNDS)) {
			const audio = new Audio(path);
			audio.preload = "auto";
			audioRefs.current[key as NotificationSoundType] = audio;
		}

		// Add click listener to initialize audio after user interaction
		const initializeAudio = () => {
			if (!isInitialized) {
				for (const audio of Object.values(audioRefs.current)) {
					if (audio) {
						// Try to play and immediately pause to initialize
						audio
							.play()
							.then(() => {
								audio.pause();
								audio.currentTime = 0;
							})
							.catch(() => {
								// Ignore errors during initialization
							});
					}
				}
				setIsInitialized(true);
			}
		};

		document.addEventListener("click", initializeAudio);

		return () => {
			document.removeEventListener("click", initializeAudio);
			for (const audio of Object.values(audioRefs.current)) {
				if (audio) {
					audio.pause();
					audio.src = "";
				}
			}
		};
	}, [isInitialized]);

	const playSound = useCallback(
		(type: NotificationSoundType) => {
			const audio = audioRefs.current[type];
			if (audio && isInitialized) {
				audio.currentTime = 0;
				audio.play().catch((error) => {
					console.error("Error playing sound:", error);
				});
			}
		},
		[isInitialized],
	);

	return { playSound, isInitialized };
}
