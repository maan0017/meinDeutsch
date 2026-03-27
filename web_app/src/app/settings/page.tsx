"use client";

import { GetGermanWordsLenght } from "@/helper/RandomGermanWordSelector";
import { MoveLeft, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { useSettingsStore } from "@/store/settings";
import type { FontFamily } from "@/store/settings";
import { useGoBack } from "@/hooks/useGoBack";
import { useRouter } from "next/navigation";
import { useSoundEffects } from "@/hooks/useSoundEffects";

// ---------------------------------------------------------------------------
// Font option groups shown in the <select>
// ---------------------------------------------------------------------------

const FONT_OPTIONS: {
  group: string;
  options: { value: FontFamily; label: string }[];
}[] = [
  {
    group: "Professional & Modern (Google Fonts)",
    options: [
      { value: "Inter", label: "Inter (Clean UI)" },
      { value: "Outfit", label: "Outfit (Geometric)" },
      { value: "Fredoka", label: "Fredoka (Friendly & Rounded)" },
      { value: "Lora", label: "Lora (Elegant Serif)" },
      { value: "Playfair_Display", label: "Playfair Display (Premium Serif)" },
      { value: "Literata", label: "Literata (Default)" },
      { value: "IM_Fell_English", label: "IM Fell English (Vintage)" },
      { value: "Courier_Prime", label: "Courier Prime (Typewriter)" },
      { value: "Roboto", label: "Roboto" },
    ],
  },
  {
    group: "System Generic",
    options: [
      { value: "system-sans", label: "Sans-serif (system)" },
      { value: "system-serif", label: "Serif (system)" },
      { value: "system-mono", label: "Monospace (system)" },
    ],
  },
  {
    group: "Named System Fonts",
    options: [
      { value: "Georgia", label: "Georgia" },
      { value: "Times_New_Roman", label: "Times New Roman" },
      { value: "Arial", label: "Arial" },
      { value: "Trebuchet_MS", label: "Trebuchet MS" },
      { value: "Verdana", label: "Verdana" },
    ],
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Settings() {
  const {
    soundEffects,
    groupSize,
    fontFamily,
    toggleSoundEffects,
    changeGroupSize,
    changeFontFamily,
    resetSettings,
  } = useSettingsStore();

  const router = useRouter();
  const { playSound, playRollSound } = useSoundEffects();

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

          <button
            onClick={() => {
              playSound("correct");
              resetSettings();
            }}
            className="ml-auto group flex items-center z-10 bg-white dark:bg-[#121212] gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-[#333] hover:bg-slate-100 dark:hover:bg-[#1a1a1a] hover:border-slate-300 dark:hover:border-[#444] transition-all duration-200"
            title="Reset to default settings"
          >
            <RotateCcw className="w-4 h-4 text-slate-500 dark:text-[#888888] group-hover:text-slate-700 dark:group-hover:text-[#E0E0E0] transition-colors" />
            <span className="text-sm font-medium text-slate-600 dark:text-[#B0B0B0] group-hover:text-slate-900 dark:group-hover:text-[#E0E0E0] transition-colors">
              Reset to Default
            </span>
          </button>
        </div>

        <div className="space-y-4">
          {/* Sound Effects Setting */}
          <div className="relative z-10 p-6 rounded-lg shadow-sm bg-white dark:bg-[#121212] border border-slate-200 dark:border-[#444444] transition-colors">
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

          {/* Group Size Setting */}
          <div className="relative z-10 p-6 rounded-lg shadow-sm bg-white dark:bg-[#121212] border border-slate-200 dark:border-[#444444] transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-[#E0E0E0]">
                  Group Size
                </h2>
                <p className="text-sm text-slate-600 dark:text-[#B0B0B0]">
                  Number of words per group
                </p>
              </div>

              <div className="flex items-center gap-3 bg-slate-50 dark:bg-[#1a1a1a] px-3 py-1.5 rounded-md border border-slate-200 dark:border-[#333]">
                <input
                  type="number"
                  min={1}
                  max={GetGermanWordsLenght()}
                  value={groupSize}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val)) {
                      changeGroupSize(val);
                    }
                    playRollSound();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === "Escape") {
                      e.currentTarget.blur();
                    }
                  }}
                  className="w-16 text-right bg-transparent text-slate-900 dark:text-[#E0E0E0] font-semibold focus:outline-none"
                />
                <span className="text-slate-400 dark:text-[#666666] text-sm select-none">
                  / {GetGermanWordsLenght()}
                </span>
              </div>
            </div>
          </div>

          {/* Font Selection Setting */}
          <div className="relative z-10 p-6 rounded-lg shadow-sm bg-white dark:bg-[#121212] border border-slate-200 dark:border-[#444444] transition-colors">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-[#E0E0E0]">
                  App Font
                </h2>
                <p className="text-sm text-slate-600 dark:text-[#B0B0B0]">
                  Choose your preferred globally applied font
                </p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <select
                  value={fontFamily}
                  onChange={(e) => {
                    changeFontFamily(e.target.value as FontFamily);
                    playRollSound();
                  }}
                  className="bg-slate-50 dark:bg-[#1a1a1a] px-3 py-1.5 rounded-md border border-slate-200 dark:border-[#333] text-slate-900 dark:text-[#E0E0E0] outline-none focus:ring-2 focus:ring-green-500 font-semibold cursor-pointer"
                >
                  {FONT_OPTIONS.map(({ group, options }) => (
                    <optgroup key={group} label={group}>
                      {options.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>

                {/* Live preview of selected font */}
                <p
                  className="text-sm text-slate-400 dark:text-[#666] select-none"
                  style={{ fontFamily: "inherit" }}
                >
                  The quick brown fox jumps over the lazy dog
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
