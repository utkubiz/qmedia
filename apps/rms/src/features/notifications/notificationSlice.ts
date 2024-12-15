import type { RootState } from "@/state/store";
import { createSlice } from "@reduxjs/toolkit";

interface NotificationState {
	soundEnabled: boolean;
}

const initialState: NotificationState = {
	soundEnabled: JSON.parse(localStorage.getItem("notification-sound-enabled") || "true"),
};

export const notificationSlice = createSlice({
	name: "notifications",
	initialState,
	reducers: {
		toggleSound: (state) => {
			state.soundEnabled = !state.soundEnabled;
			localStorage.setItem("notification-sound-enabled", JSON.stringify(state.soundEnabled));
		},
	},
});

export const { toggleSound } = notificationSlice.actions;

export const selectSoundEnabled = (state: RootState) => state.notifications.soundEnabled;

export default notificationSlice.reducer;
