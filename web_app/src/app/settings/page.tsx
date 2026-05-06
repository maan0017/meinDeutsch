"use client";

import { GetGermanWordsLenght } from "@/helper/RandomGermanWordSelector";
import {
  MoveLeft,
  RotateCcw,
  Volume2,
  VolumeX,
  Check,
  Settings,
  Type,
  Layers,
  ChevronRight,
} from "lucide-react";
import { useSettingsStore } from "@/store/settings";
import type { FontFamily } from "@/store/settings";
import { useGoBack } from "@/hooks/useGoBack";
import { useRouter } from "next/navigation";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { FONT_MAP } from "@/components/FontProvider";
import WordExplainComp from "@/components/WordExplainComp";
import { useState } from "react";

// ---------------------------------------------------------------------------
// Font option groups
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
// Section Header Component
// ---------------------------------------------------------------------------

const SectionHeader = ({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
}) => (
  <div className="flex items-center gap-3 mb-5">
    <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-[#1e1e1e] border border-slate-200 dark:border-[#333] flex items-center justify-center shrink-0">
      <Icon className="w-4.5 h-4.5 text-slate-500 dark:text-slate-400" />
    </div>
    <div>
      <h2 className="text-sm font-semibold text-slate-900 dark:text-[#E0E0E0] tracking-tight">
        {title}
      </h2>
      <p className="text-xs text-slate-500 dark:text-[#888]">{subtitle}</p>
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function SettingsPage() {
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
  const [fontSectionExpanded, setFontSectionExpanded] = useState(false);

  useGoBack();

  const maxWords = GetGermanWordsLenght();
  const groupPercentage = Math.round((groupSize / maxWords) * 100);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0e0e0e] transition-colors duration-300">
      {/* ─── Sticky top bar ──────────────────────────────────────────── */}
      <header className="z-50 bg-white/80 dark:bg-[#141414]/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-[#222]">
        <div className="max-w-2xl mx-auto flex items-center justify-between px-5 py-3">
          {/* Back */}
          <button
            type="button"
            onClick={() => router.push("/")}
            aria-label="Go back"
            className="flex items-center gap-2 text-slate-500 dark:text-[#999] hover:text-slate-900 dark:hover:text-white transition-colors group"
          >
            <MoveLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-sm font-medium hidden sm:inline">
              <WordExplainComp
                word="Zurück"
                meaning="Back"
                position="BOTTOM_RIGHT_BOTTOM"
                alwaysShow
              />
            </span>
          </button>

          {/* Title */}
          <div className="flex items-center gap-2.5">
            <Settings className="w-4.5 h-4.5 text-slate-400 dark:text-[#666]" />
            <h1 className="text-base font-bold text-slate-900 dark:text-[#E0E0E0] tracking-tight">
              <WordExplainComp
                word="Einstellungen"
                meaning="Settings"
                position="BOTTOM_LEFT_BOTTOM"
                alwaysShow
              />
            </h1>
          </div>

          {/* Reset */}
          <button
            onClick={() => {
              playSound("correct");
              resetSettings();
            }}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-[#888] hover:text-rose-600 dark:hover:text-rose-400 transition-colors group"
            title="Reset to default settings"
          >
            <RotateCcw className="w-3.5 h-3.5 group-hover:-rotate-90 transition-transform duration-300" />
            <span className="hidden sm:inline">
              <WordExplainComp
                word="zurücksetzen"
                meaning="Reset"
                position="BOTTOM_LEFT_BOTTOM"
                alwaysShow
              />
            </span>
          </button>
        </div>
      </header>

      {/* ─── Content ─────────────────────────────────────────────────── */}
      <div className="max-w-2xl mx-auto px-5 py-8 space-y-6">
        {/* ── GENERAL section ──────────────────────────────────────── */}
        <section>
          <SectionHeader
            icon={Layers}
            title="General"
            subtitle="Core app preferences"
          />

          <div className="bg-white dark:bg-[#161616] rounded-2xl border border-slate-200 dark:border-[#282828] shadow-xs divide-y divide-slate-100 dark:divide-[#252525]">
            {/* Sound Effects Row */}
            <div className="flex items-center justify-between px-5 py-4 group/row hover:bg-slate-50/50 dark:hover:bg-[#1a1a1a] transition-colors">
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    soundEffects === "ON"
                      ? "bg-emerald-50 dark:bg-emerald-900/20"
                      : "bg-slate-100 dark:bg-[#222]"
                  }`}
                >
                  {soundEffects === "ON" ? (
                    <Volume2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <VolumeX className="w-4 h-4 text-slate-400 dark:text-[#666]" />
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-900 dark:text-[#E0E0E0]">
                    <WordExplainComp
                      word="Soundeffekte"
                      meaning="Sound Effects"
                      alwaysShow={false}
                      position="TOP_RIGHT_TOP"
                      theme="slate"
                    />
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-[#777] mt-0.5">
                    <WordExplainComp
                      word="Aktivieren"
                      meaning="Enable"
                      alwaysShow={false}
                      position="TOP_RIGHT_TOP"
                      theme="slate"
                    />{" "}
                    oder{" "}
                    <WordExplainComp
                      word="deaktivieren"
                      meaning="disable"
                      alwaysShow={false}
                      position="TOP_RIGHT_TOP"
                      theme="slate"
                    />{" "}
                    Sie{" "}
                    <WordExplainComp
                      word="Soundeffekte"
                      meaning="Sound effects"
                      alwaysShow={false}
                      position="TOP_RIGHT_TOP"
                      theme="slate"
                    />
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={toggleSoundEffects}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#161616] ${
                  soundEffects === "ON"
                    ? "bg-emerald-500"
                    : "bg-slate-300 dark:bg-[#444]"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
                    soundEffects === "ON" ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Group Size Row */}
            <div className="flex items-center justify-between px-5 py-4 group/row hover:bg-slate-50/50 dark:hover:bg-[#1a1a1a] transition-colors">
              <div className="flex items-center gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    #
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-900 dark:text-[#E0E0E0]">
                    <WordExplainComp
                      word="Gruppengröße"
                      meaning="Group Size"
                      alwaysShow={false}
                      position="TOP_RIGHT_TOP"
                      theme="slate"
                    />
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-[#777] mt-0.5">
                    <WordExplainComp
                      word="Wörter"
                      meaning="Words"
                      alwaysShow={false}
                      position="TOP_RIGHT_TOP"
                      theme="slate"
                    />{" "}
                    pro{" "}
                    <WordExplainComp
                      word="Gruppe"
                      meaning="Group"
                      alwaysShow={false}
                      position="TOP_RIGHT_TOP"
                      theme="slate"
                    />{" "}
                    · {groupPercentage}% von {maxWords}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    changeGroupSize(groupSize - 5);
                    playRollSound();
                  }}
                  disabled={groupSize <= 1}
                  className="w-7 h-7 rounded-md border border-slate-200 dark:border-[#333] flex items-center justify-center text-slate-500 dark:text-[#999] hover:bg-slate-100 dark:hover:bg-[#252525] disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-xs font-bold"
                >
                  −
                </button>
                <input
                  type="number"
                  min={1}
                  max={maxWords}
                  value={groupSize}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val)) changeGroupSize(val);
                    playRollSound();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === "Escape")
                      e.currentTarget.blur();
                  }}
                  className="w-14 text-center bg-slate-50 dark:bg-[#1e1e1e] border border-slate-200 dark:border-[#333] rounded-lg text-sm font-semibold text-slate-900 dark:text-[#E0E0E0] py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
                <button
                  onClick={() => {
                    changeGroupSize(groupSize + 5);
                    playRollSound();
                  }}
                  disabled={groupSize >= maxWords}
                  className="w-7 h-7 rounded-md border border-slate-200 dark:border-[#333] flex items-center justify-center text-slate-500 dark:text-[#999] hover:bg-slate-100 dark:hover:bg-[#252525] disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-xs font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── APPEARANCE section ────────────────────────────────────── */}
        <section>
          <SectionHeader
            icon={Type}
            title="Appearance"
            subtitle="Typography and visual customization"
          />

          <div className="bg-white dark:bg-[#161616] rounded-2xl border border-slate-200 dark:border-[#282828] shadow-xs">
            {/* Font selector header (collapsible) */}
            <button
              onClick={() => setFontSectionExpanded(!fontSectionExpanded)}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-50/50 dark:hover:bg-[#1a1a1a] transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-violet-50 dark:bg-violet-900/20 flex items-center justify-center">
                  <Type className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                </div>
                <div className="text-left">
                  <h3 className="text-sm font-medium text-slate-900 dark:text-[#E0E0E0]">
                    <WordExplainComp
                      word="Schriftart"
                      meaning="Font"
                      alwaysShow={false}
                      position="TOP_RIGHT_TOP"
                      theme="slate"
                    />
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-[#777] mt-0.5">
                    {FONT_OPTIONS.flatMap((g) => g.options).find(
                      (o) => o.value === fontFamily
                    )?.label ?? fontFamily}
                  </p>
                </div>
              </div>
              <ChevronRight
                className={`w-4 h-4 text-slate-400 dark:text-[#666] transition-transform duration-200 ${
                  fontSectionExpanded ? "rotate-90" : ""
                }`}
              />
            </button>

            {/* Expandable font list */}
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                fontSectionExpanded ? "max-h-[600px]" : "max-h-0"
              }`}
            >
              <div className="px-5 pb-5 space-y-5 max-h-[560px] overflow-y-auto scrollbar-thin">
                {FONT_OPTIONS.map(({ group, options }) => (
                  <div key={group}>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-[#666] mb-2.5 px-0.5">
                      {group}
                    </h4>
                    <div className="space-y-1.5">
                      {options.map(({ value, label }) => {
                        const isSelected = fontFamily === value;
                        return (
                          <button
                            key={value}
                            onClick={() => {
                              changeFontFamily(value);
                              playRollSound();
                            }}
                            className={`group w-full flex items-center gap-3 px-3.5 py-3 rounded-xl border transition-all duration-200 active:scale-[0.98] ${
                              isSelected
                                ? "border-emerald-400/50 bg-emerald-50/50 dark:border-emerald-500/30 dark:bg-emerald-500/5 shadow-sm"
                                : "border-transparent hover:bg-slate-50 dark:hover:bg-[#1e1e1e]"
                            }`}
                          >
                            {/* Selection indicator */}
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                                isSelected
                                  ? "border-emerald-500 bg-emerald-500"
                                  : "border-slate-300 dark:border-[#444]"
                              }`}
                            >
                              {isSelected && (
                                <Check className="w-3 h-3 text-white" />
                              )}
                            </div>

                            {/* Font info */}
                            <div className="flex-1 min-w-0 text-left">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`text-xs font-medium transition-colors ${
                                    isSelected
                                      ? "text-emerald-700 dark:text-emerald-400"
                                      : "text-slate-600 dark:text-[#aaa] group-hover:text-slate-900 dark:group-hover:text-[#ddd]"
                                  }`}
                                >
                                  {label}
                                </span>
                                {value === "Inter" && (
                                  <span className="text-[9px] uppercase font-bold px-1.5 py-px rounded-full bg-slate-100 text-slate-500 border border-slate-200 dark:bg-[#222] dark:text-[#666] dark:border-[#333]">
                                    Default
                                  </span>
                                )}
                              </div>
                              <span
                                className={`text-base mt-1 block truncate transition-colors ${
                                  isSelected
                                    ? "text-slate-900 dark:text-white"
                                    : "text-slate-700 dark:text-[#ccc]"
                                } ${FONT_MAP[value]}`}
                              >
                                The quick brown fox jumps over the lazy dog
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer info ──────────────────────────────────────────── */}
        <footer className="pt-4 pb-8 text-center">
          <p className="text-[11px] text-slate-400 dark:text-[#555]">
            <WordExplainComp
              word="Einstellungen"
              meaning="Settings"
              alwaysShow={false}
              position="TOP_RIGHT_TOP"
              theme="slate"
            />{" "}
            werden{" "}
            <WordExplainComp
              word="automatisch"
              meaning="automatically"
              alwaysShow={false}
              position="TOP_RIGHT_TOP"
              theme="slate"
            />{" "}
            <WordExplainComp
              word="gespeichert"
              meaning="saved"
              alwaysShow={false}
              position="TOP_RIGHT_TOP"
              theme="slate"
            />
          </p>
        </footer>
      </div>
    </div>
  );
}
