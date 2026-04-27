"use client";

import { GetGermanWordsLenght } from "@/helper/RandomGermanWordSelector";
import { MoveLeft, RotateCcw, Volume2, VolumeX, Check } from "lucide-react";
import { useSettingsStore } from "@/store/settings";
import type { FontFamily } from "@/store/settings";
import { useGoBack } from "@/hooks/useGoBack";
import { useRouter } from "next/navigation";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { FONT_MAP } from "@/components/FontProvider";

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
      { value: "Poppins", label: "Poppins (Modern Sans)" },
      { value: "Source_Sans_3", label: "Source Sans 3 (Professional)" },
      { value: "Fredoka", label: "Fredoka (Friendly & Rounded)" },
      { value: "Merriweather", label: "Merriweather (Readable Serif)" },
      { value: "Lora", label: "Lora (Elegant Serif)" },
      { value: "Playfair_Display", label: "Playfair Display (Premium Serif)" },
      { value: "Literata", label: "Literata" },
      {
        value: "IM_Fell_English",
        label: "IM Fell English (Vintage)",
      },
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
            onClick={() => router.push("/")}
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
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-[#E0E0E0]">
                  App Font
                </h2>
                <p className="text-sm text-slate-600 dark:text-[#B0B0B0]">
                  Choose your preferred globally applied font
                </p>
              </div>

              <div className="flex flex-col gap-6 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
                {FONT_OPTIONS.map(({ group, options }) => (
                  <div key={group} className="flex flex-col gap-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-[#888] px-1">
                      {group}
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {options.map(({ value, label }) => {
                        const isSelected = fontFamily === value;
                        return (
                          <button
                            key={value}
                            onClick={() => {
                              changeFontFamily(value);
                              playRollSound();
                            }}
                            className={`group relative flex flex-col text-left p-4 rounded-xl border transition-all duration-300 ease-in-out active:scale-[0.98] ${
                              isSelected
                                ? "border-green-500 bg-green-50/60 dark:border-green-500/80 dark:bg-green-500/10 shadow-sm z-10"
                                : "border-slate-200 dark:border-[#333] hover:border-slate-300 dark:hover:border-[#555] hover:bg-slate-50 dark:hover:bg-[#1a1a1a]"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-3 w-full">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`text-xs font-semibold tracking-wide transition-colors ${
                                    isSelected
                                      ? "text-green-700 dark:text-green-400"
                                      : "text-slate-500 dark:text-[#999] group-hover:text-slate-700 dark:group-hover:text-[#ccc]"
                                  }`}
                                >
                                  {label}
                                </span>
                                {value === "Inter" && (
                                  <span
                                    className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded border transition-colors ${
                                      isSelected
                                        ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/40 dark:text-green-400 dark:border-green-800/50"
                                        : "bg-slate-100 text-slate-500 border-slate-200 dark:bg-[#1e1e1e] dark:text-[#777] dark:border-[#333]"
                                    }`}
                                  >
                                    Default
                                  </span>
                                )}
                              </div>
                              {isSelected && (
                                <Check className="w-4 h-4 text-green-600 dark:text-green-400 animate-in zoom-in spin-in-12 duration-300" />
                              )}
                            </div>
                            <span
                              className={`text-xl transition-colors ${
                                isSelected
                                  ? "text-slate-900 dark:text-[#FFF]"
                                  : "text-slate-800 dark:text-[#E0E0E0] group-hover:text-slate-900 dark:group-hover:text-[#FFF]"
                              } truncate w-full ${FONT_MAP[value]}`}
                            >
                              The quick brown fox jumps over the lazy dog
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
