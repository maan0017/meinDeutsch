"use client";

import { create } from "zustand";

interface SettingsState {
  soundEffects: "ON" | "OFF";
  toggleSoundEffects: () => void;
}

const DefaultSettings = {
  soundEffects: "ON" as "ON" | "OFF",
};

const loadSavedSettings = (): { soundEffects: "ON" | "OFF" } => {
  if (typeof window === "undefined") return DefaultSettings;

  try {
    const saved = localStorage.getItem("settings");
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...DefaultSettings, ...parsed };
    }
  } catch (error) {
    console.error("Failed to load settings:", error);
  }

  return DefaultSettings;
};

const saveSettings = (settings: { soundEffects: "ON" | "OFF" }) => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem("settings", JSON.stringify(settings));
  } catch (error) {
    console.error("Failed to save settings:", error);
  }
};

export const useSettingsStore = create<SettingsState>((set, get) => {
  // Load saved settings on initialization
  const initialSettings = loadSavedSettings();

  return {
    soundEffects: initialSettings.soundEffects,

    toggleSoundEffects: () => {
      const newValue = get().soundEffects === "ON" ? "OFF" : "ON";
      set({ soundEffects: newValue });
      saveSettings({ soundEffects: newValue });
    },
  };
});
