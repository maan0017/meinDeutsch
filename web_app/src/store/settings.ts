"use client";

import { GetGermanWordsLenght } from "@/helper/RandomGermanWordSelector";

import { create } from "zustand";

interface SettingsState {
  soundEffects: "ON" | "OFF";
  groupSize: number;
  toggleSoundEffects: () => void;
  changeGroupSize: (size: number) => void;
  resetSettings: () => void;
}

const DefaultSettings = {
  soundEffects: "ON" as "ON" | "OFF",
  groupSize: 10,
};

const loadSavedSettings = (): {
  soundEffects: "ON" | "OFF";
  groupSize: number;
} => {
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

const saveSettings = (settings: {
  soundEffects: "ON" | "OFF";
  groupSize: number;
}) => {
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
    groupSize: initialSettings.groupSize,
    toggleSoundEffects: () => {
      const newValue = get().soundEffects === "ON" ? "OFF" : "ON";
      if (newValue === "ON") {
        try {
          const audio = new Audio("/sounds/correct.opus");
          audio.currentTime = 0;
          audio.play().catch(() => {});
        } catch {}
      }
      set({ soundEffects: newValue });
      saveSettings({ soundEffects: newValue, groupSize: get().groupSize });
    },
    changeGroupSize: (size: number) => {
      let newValue = size;
      const maxLen = GetGermanWordsLenght();

      // Enforce bounds
      if (newValue < 1) newValue = 1;
      if (newValue > maxLen) newValue = maxLen;

      set({ groupSize: newValue });
      saveSettings({ soundEffects: get().soundEffects, groupSize: newValue });
    },
    resetSettings: () => {
      set(DefaultSettings);
      saveSettings(DefaultSettings);
    },
  };
});
