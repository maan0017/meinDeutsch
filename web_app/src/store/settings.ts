"use client";

import { GetGermanWordsLenght } from "@/helper/RandomGermanWordSelector";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type FontFamily =
  | "Literata"
  | "IM_Fell_English"
  | "Courier_Prime"
  | "Roboto"
  | "Inter"
  | "Outfit"
  | "Lora"
  | "Playfair_Display"
  | "Fredoka"
  | "system-sans"
  | "system-serif"
  | "system-mono"
  | "Georgia"
  | "Times_New_Roman"
  | "Arial"
  | "Trebuchet_MS"
  | "Verdana";

export type SoundEffects = "ON" | "OFF";

interface SettingsState {
  soundEffects: SoundEffects;
  groupSize: number;
  fontFamily: FontFamily;
  toggleSoundEffects: () => void;
  changeGroupSize: (size: number) => void;
  changeFontFamily: (font: FontFamily) => void;
  resetSettings: () => void;
}

// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------

const DEFAULT_SETTINGS = {
  soundEffects: "ON" as SoundEffects,
  groupSize: 20,
  fontFamily: "Literata" as FontFamily,
};

// ---------------------------------------------------------------------------
// Store
//
// Using zustand/middleware `persist` instead of manual localStorage calls.
// `persist` automatically:
//   1. Reads from localStorage after hydration (fixes the refresh bug)
//   2. Writes on every state change
//   3. Handles SSR safely — the store starts with DEFAULT_SETTINGS on the
//      server, then rehydrates from localStorage on the client after mount.
// ---------------------------------------------------------------------------

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      ...DEFAULT_SETTINGS,

      toggleSoundEffects: () => {
        const next: SoundEffects = get().soundEffects === "ON" ? "OFF" : "ON";

        if (next === "ON") {
          try {
            const audio = new Audio("/sounds/correct.opus");
            audio.currentTime = 0;
            audio.play().catch(() => {});
          } catch {
            // Silently ignore – audio is non-critical
          }
        }

        set({ soundEffects: next });
      },

      changeGroupSize: (size: number) => {
        const max = GetGermanWordsLenght();
        const clamped = Math.min(Math.max(size, 1), max);
        set({ groupSize: clamped });
      },

      changeFontFamily: (font: FontFamily) => {
        set({ fontFamily: font });
      },

      resetSettings: () => {
        set(DEFAULT_SETTINGS);
      },
    }),
    {
      name: "settings", // localStorage key — same as before, no data loss
      storage: createJSONStorage(() => localStorage),
      // Only persist these three fields, not the action functions
      partialize: (state) => ({
        soundEffects: state.soundEffects,
        groupSize: state.groupSize,
        fontFamily: state.fontFamily,
      }),
    }
  )
);
