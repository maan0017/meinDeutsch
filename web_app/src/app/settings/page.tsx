"use client";

import { MoveLeft, Volume2, VolumeX } from "lucide-react";
import { ThemeToggleButton } from "@/components/ToggleThemeButton";
import { useSettingsStore } from "@/store/settings";
import { useGoBack } from "@/hooks/useGoBack";
import { useRouter } from "next/navigation";

export default function Settings() {
  const { soundEffects, toggleSoundEffects } = useSettingsStore();
  const router = useRouter();

  // use
  useGoBack();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#121212] transition-colors duration-300">
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-8">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Go back"
            className="flex items-center justify-center rounded-md p-2 hover:bg-slate-200 dark:hover:bg-[#333333] transition"
          >
            <MoveLeft className="h-5 w-5 text-slate-900 dark:text-[#E0E0E0]" />
          </button>

          <h1 className="text-3xl font-bold text-slate-900 dark:text-[#E0E0E0]">
            Settings
          </h1>
        </div>

        <div className="space-y-4">
          {/* Dark Mode Setting */}
          <div className="p-6 rounded-lg shadow-sm bg-white dark:bg-[#121212] border border-slate-200 dark:border-[#444444] transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-[#E0E0E0]">
                    Dark Mode
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-[#B0B0B0]">
                    Switch between light and dark theme
                  </p>
                </div>
              </div>

              <ThemeToggleButton />
            </div>
          </div>

          {/* Sound Effects Setting */}
          <div className="p-6 rounded-lg shadow-sm bg-white dark:bg-[#121212] border border-slate-200 dark:border-[#444444] transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {soundEffects === "ON" ? (
                  <Volume2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                ) : (
                  <VolumeX className="w-6 h-6 text-slate-400 dark:text-[#888888]" />
                )}
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-[#E0E0E0]">
                    Sound Effects
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-[#B0B0B0]">
                    Enable or disable sound effects
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={toggleSoundEffects}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-[#121212] ${
                  soundEffects === "ON"
                    ? "bg-green-600"
                    : "bg-slate-300 dark:bg-[#444444]"
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    soundEffects === "ON" ? "translate-x-7" : "translate-x-1"
                  }`}
                />
                {""}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
