"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { useSettingsStore } from "@/store/settings";
import Link from "next/link";
import MemoryGameControls from "@/components/MemoryGameControls";
import verbsDataRaw from "@/data/verbs.json";
import { VerbWord } from "@/models/verb";
import { useBookmark } from "@/hooks/useBookmark";
import { Trash2 } from "lucide-react";

const VERBS: VerbWord[] = (verbsDataRaw as unknown as VerbWord[]).filter(
  (v) =>
    v.germanWord && v.thirdPersonSingular && v.simplePast && v.pastParticiple
);

const HEADINGS = [
  "Bedeutung (Meaning)",
  "Infinitiv",
  "Präteritum",
  "Partizip II",
];

type TargetForm = {
  display: string;
  variants: string[];
  slot: string;
};

type HistoryItem = {
  verb: VerbWord;
  status: "success" | "failed";
  wrongTries: number;
  strictMode: boolean;
  guessedSlots: Set<string>;
};

const normalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");

const parseVariants = (raw: string): string[] =>
  raw.includes("/")
    ? raw
        .split("/")
        .map((p) => normalize(p))
        .filter(Boolean)
    : [normalize(raw)];

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildTargets(verb: VerbWord): TargetForm[] {
  return [
    {
      display: verb.germanWord.trim(),
      variants: parseVariants(verb.germanWord),
      slot: "inf",
    },
    {
      display: verb.simplePast!.trim(),
      variants: parseVariants(verb.simplePast!),
      slot: "past",
    },
    {
      display: verb.pastParticiple!.trim(),
      variants: parseVariants(verb.pastParticiple!),
      slot: "perf",
    },
  ];
}

const BOOKMARK_NAME = "VERB_FORMS_CHALLANGE_GAME_BOOKMARKED_VERBS";
const CURRENT_GROUP_SAVED_STATE = "CURRENT_GROUP_SAVED_STATE";
const ALL_IN_SAVED_STATE = "ALL_IN_SAVED_STATE";
const PLAY_BOOKMARKED_ONLY_SAVED_STATE = "PLAY_BOOKMARKED_ONLY_SAVED_STATE";
const STRICT_MODE_SAVED_STATE = "STRICT_MODE_SAVED_STATE";

export default function VerbFormsChallangeComp() {
  // SSR-safe: start with empty array so server and client initial render match.
  // The mount effect below populates it with a shuffled list on the client only.
  const [activeVerbs, setActiveVerbs] = useState<VerbWord[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [guessedSlots, setGuessedSlots] = useState<Set<string>>(new Set());
  const [input, setInput] = useState<string>("");
  const [shake, setShake] = useState<boolean>(false);
  const [flashSlot, setFlashSlot] = useState<string | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  const { groupSize } = useSettingsStore();
  const { getBookmarkStrings, toggleBookmark } = useBookmark(BOOKMARK_NAME);
  const [bookmarkedVerbs, setBookmarkedVerbs] = useState<string[]>([]);

  const [playBookmarkedOnly, setPlayBookmarkedOnly] = useState<boolean>(false);
  const [allIn, setAllIn] = useState<boolean>(false);
  const [strictMode, setStrictMode] = useState<boolean>(false);
  const [currentGroup, setCurrentGroup] = useState<number>(0);
  const [wrongTries, setWrongTries] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const giveUpScheduled = useRef<boolean>(false);
  const { playSound } = useSoundEffects();

  const currentVerb = activeVerbs[currentIndex] ?? null;

  const currentTargets = useMemo<TargetForm[]>(
    () => (currentVerb ? buildTargets(currentVerb) : []),
    [currentVerb]
  );

  // ── Derived Group Math ────────────────────────────────────────────────────
  const baseVerbs = useMemo(() => {
    const targetVerbs = playBookmarkedOnly
      ? VERBS.filter((v) => bookmarkedVerbs.includes(v.germanWord))
      : VERBS;
    // Fallback safely if user maliciously unbookmarked EVERYTHING mid-cycle
    return targetVerbs.length > 0 ? targetVerbs : VERBS;
  }, [playBookmarkedOnly, bookmarkedVerbs]);

  const totalGroups = Math.ceil(baseVerbs.length / groupSize);

  useEffect(() => {
    if (currentGroup >= totalGroups)
      setCurrentGroup(Math.max(0, totalGroups - 1));
  }, [totalGroups, currentGroup]);

  // ── Mount & Mode Resets (client-only, avoids hydration mismatch) ────────
  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      if (typeof window !== "undefined") {
        setBookmarkedVerbs(getBookmarkStrings());

        const savedCurrentGroup = localStorage.getItem(
          CURRENT_GROUP_SAVED_STATE
        );
        if (savedCurrentGroup) setCurrentGroup(Number(savedCurrentGroup));

        const savedAllIn = localStorage.getItem(ALL_IN_SAVED_STATE);
        if (savedAllIn) setAllIn(savedAllIn === "true");

        const savedPlayBookmarkedOnly = localStorage.getItem(
          PLAY_BOOKMARKED_ONLY_SAVED_STATE
        );
        if (savedPlayBookmarkedOnly)
          setPlayBookmarkedOnly(savedPlayBookmarkedOnly === "true");

        const savedStrictMode = localStorage.getItem(STRICT_MODE_SAVED_STATE);
        if (savedStrictMode) setStrictMode(savedStrictMode === "true");
      }
      return;
    }
    startNewGame();
    // Intentionally omit startNewGame so random bookmarking doesn't reset the live loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, playBookmarkedOnly, currentGroup, allIn, groupSize]);

  // ── Save State to LocalStorage (client-only) ──────────────────────────────
  useEffect(() => {
    if (mounted && typeof window !== "undefined") {
      localStorage.setItem(CURRENT_GROUP_SAVED_STATE, currentGroup.toString());
      localStorage.setItem(ALL_IN_SAVED_STATE, allIn.toString());
      localStorage.setItem(
        PLAY_BOOKMARKED_ONLY_SAVED_STATE,
        playBookmarkedOnly.toString()
      );
      localStorage.setItem(STRICT_MODE_SAVED_STATE, strictMode.toString());
    }
  }, [currentGroup, allIn, playBookmarkedOnly, strictMode, mounted]);

  // ── Keyboard Group Navigation Shortcuts ───────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // const target = e.target as HTMLElement;
      // Skip if user is actively typing in an input/textarea
      // if (
      //   ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) ||
      //   target.isContentEditable
      // ) {
      //   return;
      // }

      if (
        e.key === "ArrowRight" &&
        !allIn &&
        !playBookmarkedOnly &&
        e.altKey &&
        !e.shiftKey &&
        !e.ctrlKey
      ) {
        e.preventDefault();
        setCurrentGroup((p) => Math.min(p + 1, totalGroups - 1));
      }
      if (
        e.key === "ArrowLeft" &&
        !allIn &&
        !playBookmarkedOnly &&
        e.altKey &&
        !e.shiftKey &&
        !e.ctrlKey
      ) {
        e.preventDefault();
        setCurrentGroup((p) => Math.max(p - 1, 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [allIn, totalGroups]);

  // ── Navigation ────────────────────────────────────────────────────────────

  const resetRound = useCallback(() => {
    setGuessedSlots(new Set());
    setShowAll(false);
    setFlashSlot(null);
    setInput("");
    setWrongTries(0);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  const startNewGame = useCallback(() => {
    let sliceToPlay = baseVerbs;
    if (!allIn && !playBookmarkedOnly) {
      const g = Math.min(currentGroup, Math.max(0, totalGroups - 1));
      const start = g * groupSize;
      const end = start + groupSize;
      sliceToPlay = baseVerbs.slice(start, end);
    }

    setActiveVerbs(shuffleArray(sliceToPlay));
    setCurrentIndex(0);
    setGuessedSlots(new Set());
    setInput("");
    setFlashSlot(null);
    setShake(false);
    setShowAll(false);
    setWrongTries(0);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [baseVerbs, allIn, currentGroup, groupSize, totalGroups]);

  const advanceToNext = useCallback(
    (verbs: VerbWord[], idx: number) => {
      if (idx + 1 >= verbs.length) {
        startNewGame();
      } else {
        setCurrentIndex(idx + 1);
        resetRound();
      }
    },
    [startNewGame, resetRound]
  );

  // ── Give-up effect (all setState inside setTimeout — never synchronous) ───
  useEffect(() => {
    if (!showAll || giveUpScheduled.current || !currentVerb) return;
    giveUpScheduled.current = true;

    const verb = currentVerb;
    const verbs = activeVerbs;
    const idx = currentIndex;
    const currentWrongTries = wrongTries;
    const currentStrictMode = strictMode;
    const currentGuessedSlots = guessedSlots;

    const outerTimer = setTimeout(() => {
      playSound("wrong");
      setHistory((prev) => [
        {
          verb,
          status: "failed",
          wrongTries: currentWrongTries,
          strictMode: currentStrictMode,
          guessedSlots: currentGuessedSlots,
        },
        ...prev,
      ]);

      const innerTimer = setTimeout(() => {
        advanceToNext(verbs, idx);
        giveUpScheduled.current = false;
      }, 2000);

      return () => clearTimeout(innerTimer);
    }, 0);

    return () => clearTimeout(outerTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAll]);

  // Reset give-up guard on verb change
  useEffect(() => {
    giveUpScheduled.current = false;
  }, [currentIndex]);

  // ── Guess handler ─────────────────────────────────────────────────────────

  const handleGuess = useCallback(() => {
    const val = normalize(input);
    if (!val || showAll || !currentVerb) return;

    const newSlots = new Set(guessedSlots);
    let madeNewGuess = false;
    let newFlashSlot: string | null = null;

    for (const target of currentTargets) {
      if (!newSlots.has(target.slot) && target.variants.includes(val)) {
        newSlots.add(target.slot);
        madeNewGuess = true;
        newFlashSlot = target.slot;
        break;
      }
    }

    if (madeNewGuess) {
      const verb = currentVerb;
      const verbs = activeVerbs;
      const idx = currentIndex;
      const totalSlots = currentTargets.length;

      setGuessedSlots(newSlots);
      playSound("correct");
      setInput("");
      setFlashSlot(newFlashSlot);
      setTimeout(() => setFlashSlot(null), 800);

      if (newSlots.size === totalSlots) {
        setHistory((prev) => [
          {
            verb,
            status: "success",
            wrongTries,
            strictMode,
            guessedSlots: newSlots,
          },
          ...prev,
        ]);
        setTimeout(() => advanceToNext(verbs, idx), 1200);
      }
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      playSound("wrong");

      // 3-Strikes Strict Mode Rule
      if (strictMode) {
        setWrongTries((prev) => {
          const newTries = prev + 1;
          if (newTries >= 3) {
            if (!giveUpScheduled.current) {
              giveUpScheduled.current = true;

              const verb = currentVerb;
              const vs = activeVerbs;
              const idx = currentIndex;

              setShowAll(true);
              setHistory((hist) => [
                {
                  verb,
                  status: "failed",
                  wrongTries: newTries,
                  strictMode: true,
                  guessedSlots: new Set(guessedSlots),
                },
                ...hist,
              ]);

              setTimeout(() => {
                advanceToNext(vs, idx);
                giveUpScheduled.current = false;
              }, 2000);
            }
          }
          return newTries;
        });
      }
    }
  }, [
    input,
    showAll,
    currentVerb,
    currentTargets,
    guessedSlots,
    playSound,
    advanceToNext,
    activeVerbs,
    currentIndex,
    strictMode,
    wrongTries,
  ]);

  // ── Render helpers ────────────────────────────────────────────────────────

  const renderHeading = (text: string) => (
    <div
      key={text}
      className="w-full px-2 py-1.5 text-sm font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-300 dark:border-gray-700 mb-1"
    >
      {text}
    </div>
  );

  const renderMeaningCell = (v: VerbWord) => (
    <div
      key={"meaning-" + v.germanWord}
      className="flex flex-col items-center justify-center w-full px-2 py-1.5 rounded-lg mb-1.5 min-h-11 bg-slate-100 border-2 border-slate-300 dark:bg-[#1a1a24] dark:border-[#3a3a4a] text-center shadow-sm relative group"
    >
      <span className="font-bold text-slate-800 dark:text-[#e8e2d6] text-[0.8rem] leading-tight">
        {v.englishMeaning[0]}
      </span>
      <span className="text-slate-600 dark:text-[#a0a0aa] text-[0.7rem] leading-tight mt-0.5">
        {v.hindiMeaning[0]}
      </span>
    </div>
  );

  const renderGuessableCell = (target: TargetForm) => {
    const isRevealed = guessedSlots.has(target.slot);
    const isVisible = isRevealed || showAll;
    const isFlashing = flashSlot === target.slot;

    let cellClasses =
      "inline-flex items-center justify-center w-full px-2 rounded-lg text-[0.85rem] tracking-[0.04em] transition-all duration-[400ms] ease-in-out relative cursor-default border min-h-[44px] mb-1.5 ";

    if (isVisible) {
      cellClasses += isRevealed
        ? "bg-green-50 z-10 border-green-400 text-green-700 shadow-[0_0_12px_rgba(34,197,94,0.3)] dark:bg-[#1a2a1a] dark:border-[#3d6b3d] dark:text-[#7ec87e] dark:shadow-[0_0_12px_rgba(126,200,126,0.15)] "
        : "bg-slate-50 z-10 border-slate-300 text-slate-600 dark:bg-[#15151c] dark:border-[#3a3a4a] dark:text-[#9a9aa0] ";
    } else {
      cellClasses +=
        "text-transparent z-10 border-slate-200 dark:border-[#2a2a35] bg-white dark:bg-[#0e0e12] after:content-[''] after:absolute after:inset-y-[8px] after:inset-x-3 after:rounded-md after:bg-slate-200 dark:after:bg-[#2a2a35] ";
    }

    if (isFlashing)
      cellClasses += " animate-popIn dark:bg-[#2a4a2a] bg-green-200 z-20 ";

    return (
      <div key={target.slot} className={cellClasses}>
        {target.display}
      </div>
    );
  };

  // Render a skeleton grid while waiting for client mount to avoid layout shift
  const renderSkeleton = () => (
    <div className="flex flex-col z-10 w-full mb-4">
      <div className="grid grid-cols-4 gap-x-3 mb-0.5">
        {HEADINGS.map(renderHeading)}
      </div>
      <div className="grid grid-cols-4 gap-x-3">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-full rounded-lg mb-1.5 min-h-11 bg-slate-200 dark:bg-[#1a1a24] animate-pulse"
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="h-dvh w-full overflow-hidden flex flex-col items-center bg-slate-50 dark:bg-[#0e0e12] text-slate-900 dark:text-[#e8e2d6] pt-2 pb-6 px-4 relative">
      <Link
        href="/juwelen"
        className="absolute top-4 left-4 p-1.5 md:p-2 rounded-full hover:bg-gray-200 dark:hover:bg-[#2a2a35] text-slate-500 dark:text-[#B0B0B0] transition-colors inline-flex items-center justify-center z-50"
        title="Back to Menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        <span className="hidden md:inline text-sm font-semibold ml-1">
          Back
        </span>
      </Link>

      <div className="flex-none flex flex-col items-center w-full max-w-250">
        <h1 className="text-[1.4rem] tracking-[0.06em] z-10 text-slate-800 dark:text-[#c8c0b0] mb-0 text-center">
          Verbformen
        </h1>
        <p className="text-[0.65rem] text-slate-600 z-10 dark:text-[#555560] tracking-[0.12em] uppercase mb-1 text-center">
          Verb Forms Challenge Game
        </p>

        <div className="flex flex-col items-center justify-start gap-1 md:gap-2 relative w-full mb-3 mt-1 z-40">
          {/* Group Controls Row */}
          <div className="flex w-full items-center justify-between gap-4">
            {/* Left — Words Remaining Bubble */}
            <span
              className="flex shrink-0 items-center justify-center w-8 h-8 md:w-10 md:h-10 text-xs md:text-sm font-semibold rounded-full bg-slate-100 dark:bg-[#1a1a24] text-slate-800 dark:text-[#e8e2d6] border border-slate-300 dark:border-[#3a3a4a] shadow-sm"
              title="Remaining verbs in this chunk"
            >
              {Math.max(0, activeVerbs.length - currentIndex)}
            </span>

            {/* Center — Group Navigator */}
            <div className="flex flex-1 items-center justify-center min-w-0 z-50">
              <div
                className={`flex items-center justify-between h-8 md:h-10 w-full max-w-85 bg-white dark:bg-[#15151c] border border-slate-300 dark:border-[#3a3a4a] rounded-full transition-opacity duration-200 mx-auto shadow-sm ${
                  allIn || playBookmarkedOnly
                    ? "opacity-50 pointer-events-none select-none grayscale"
                    : "opacity-100"
                }`}
              >
                {/* Prev Group */}
                <button
                  type="button"
                  disabled={currentGroup === 0 || allIn || playBookmarkedOnly}
                  onClick={() => setCurrentGroup((p) => p - 1)}
                  className="flex items-center justify-center h-full w-9 md:w-10 rounded-l-full text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-[#a0a0aa] hover:bg-slate-50 dark:hover:bg-[#2a2a35] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                  {""}
                </button>

                {/* Dropdown Selector */}
                <div className="relative flex-1 h-full min-w-0 border-x border-slate-100 dark:border-[#2a2a35]">
                  <select
                    name="GroupDropdown"
                    aria-label="select verb group"
                    disabled={allIn || playBookmarkedOnly}
                    value={currentGroup}
                    onChange={(e) => setCurrentGroup(Number(e.target.value))}
                    className="appearance-none w-full h-full pl-2 pr-7 bg-transparent text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-center text-slate-600 dark:text-[#c8c0b0] truncate focus:outline-none cursor-pointer"
                  >
                    {Array.from({ length: totalGroups }).map((_, idx) => {
                      const start = idx * groupSize + 1;
                      const end = Math.min(
                        (idx + 1) * groupSize,
                        baseVerbs.length
                      );
                      return (
                        <option
                          key={idx}
                          value={idx}
                          className="text-slate-900 bg-white dark:bg-[#15151c] dark:text-slate-200"
                        >
                          Group {idx + 1} ({start}-{end})
                        </option>
                      );
                    })}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-slate-400 dark:text-slate-600">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6-6-6" />
                    </svg>
                  </div>
                </div>

                {/* Next Group */}
                <button
                  type="button"
                  disabled={
                    currentGroup === totalGroups - 1 ||
                    allIn ||
                    playBookmarkedOnly
                  }
                  onClick={() => setCurrentGroup((p) => p + 1)}
                  className="flex items-center justify-center h-full w-9 md:w-10 rounded-r-full text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-[#a0a0aa] hover:bg-slate-50 dark:hover:bg-[#2a2a35] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                  {""}
                </button>
              </div>
            </div>

            {/* Right Spacer (Keeps navigator perfectly centered) */}
            <div className="w-8 md:w-10 shrink-0"></div>
          </div>

          {/* Settings Toggles Row */}
          <div className="flex flex-wrap items-center justify-center gap-2 w-full mt-1">
            {/* All In Toggle */}
            <label
              className={`flex items-center gap-1.5 select-none text-[10px] font-bold uppercase tracking-wider transition-colors duration-200 px-2 md:px-3 py-1 md:py-1.5 rounded-full border ${
                playBookmarkedOnly
                  ? "opacity-50 cursor-not-allowed bg-slate-100 text-slate-500 border-slate-300 dark:bg-[#1a1a24] dark:text-slate-500 dark:border-[#3a3a4a]"
                  : allIn
                    ? "cursor-pointer bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/40 dark:text-blue-400 dark:border-blue-800"
                    : "cursor-pointer bg-slate-100 text-slate-500 border-slate-300 hover:bg-slate-200 dark:bg-[#1a1a24] dark:text-slate-400 dark:border-[#3a3a4a] dark:hover:bg-[#2a2a35]"
              }`}
            >
              <input
                type="checkbox"
                checked={allIn}
                onChange={(e) => setAllIn(e.target.checked)}
                disabled={playBookmarkedOnly}
                className="sr-only"
              />
              <div
                className={`w-3 h-3 rounded border flex items-center justify-center transition-colors ${
                  playBookmarkedOnly
                    ? "border-slate-300 dark:border-slate-500 bg-transparent"
                    : allIn
                      ? "bg-blue-500 border-blue-500"
                      : "border-slate-400 dark:border-slate-500 bg-transparent"
                }`}
              >
                {!playBookmarkedOnly && allIn && (
                  <svg
                    className="w-2.5 h-2.5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              All In
            </label>

            {/* Strict Mode Toggle */}
            <label
              className={`flex items-center gap-1.5 cursor-pointer select-none text-[10px] font-bold uppercase tracking-wider transition-colors duration-200 px-2 md:px-3 py-1 md:py-1.5 rounded-full border ${strictMode ? "bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-900/40 dark:text-rose-400 dark:border-rose-800" : "bg-slate-100 text-slate-500 border-slate-300 hover:bg-slate-200 dark:bg-[#1a1a24] dark:text-slate-400 dark:border-[#3a3a4a] dark:hover:bg-[#2a2a35]"}`}
              title="3 incorrect actions directly fails the test on this word."
            >
              <input
                type="checkbox"
                checked={strictMode}
                onChange={(e) => setStrictMode(e.target.checked)}
                className="sr-only"
              />
              <div
                className={`w-3 h-3 rounded border flex items-center justify-center transition-colors ${strictMode ? "bg-rose-500 border-rose-500" : "border-slate-400 dark:border-slate-500 bg-transparent"}`}
              >
                {strictMode && (
                  <svg
                    className="w-2.5 h-2.5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              Strict Mode
            </label>

            {/* Bookmarks Toggle */}
            <label
              className={`flex items-center gap-1.5 select-none text-[10px] font-bold uppercase tracking-wider transition-colors duration-200 px-2 md:px-3 py-1 md:py-1.5 rounded-full border ${
                bookmarkedVerbs.length === 0
                  ? "opacity-50 cursor-not-allowed bg-slate-100 text-slate-500 border-slate-300 dark:bg-[#1a1a24] dark:text-slate-500 dark:border-[#3a3a4a]"
                  : playBookmarkedOnly
                    ? "cursor-pointer bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-900/40 dark:text-amber-400 dark:border-amber-700/50"
                    : "cursor-pointer bg-slate-100 text-slate-500 border-slate-300 hover:bg-slate-200 dark:bg-[#1a1a24] dark:text-slate-400 dark:border-[#3a3a4a] dark:hover:bg-[#2a2a35]"
              }`}
            >
              <input
                type="checkbox"
                checked={playBookmarkedOnly}
                disabled={bookmarkedVerbs.length === 0}
                onChange={(e) => {
                  if (!e.target.checked) setPlayBookmarkedOnly(false);
                  else setPlayBookmarkedOnly(true);
                }}
                className="sr-only"
              />
              <div
                className={`w-3 h-3 rounded border flex items-center justify-center transition-colors ${playBookmarkedOnly ? "bg-amber-500 border-amber-500" : "border-slate-400 dark:border-slate-500 bg-transparent"}`}
              >
                {playBookmarkedOnly && (
                  <svg
                    className="w-2.5 h-2.5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              Bookmarks ({bookmarkedVerbs.length})
            </label>
          </div>
        </div>

        {strictMode && wrongTries > 0 && (
          <div className="h-6 mt-1 mb-1 flex items-center justify-center animate-fadeIn">
            <span
              className={`text-[11px] font-bold tracking-wide px-2.5 py-0.5 rounded-md transition-colors ${wrongTries >= 2 ? "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400" : "bg-rose-50 text-rose-500 dark:bg-rose-900/20 dark:text-rose-400"}`}
            >
              {wrongTries} Wrong Attempt{wrongTries > 1 ? "s" : ""} •{" "}
              {3 - wrongTries} Left
            </span>
          </div>
        )}

        <MemoryGameControls
          input={input}
          setInput={setInput}
          handleGuess={handleGuess}
          resetFunction={() => {
            setInput("");
            inputRef.current?.focus();
            setHistory([]);
          }}
          showAll={showAll}
          toggleShow={() => {
            if (!showAll) setShowAll(true);
          }}
          shake={shake}
          inputRef={inputRef}
          placeholder="Type a verb form..."
          isBookmarked={
            currentVerb
              ? bookmarkedVerbs.includes(currentVerb.germanWord)
              : false
          }
          onBookmarkToggle={() => {
            if (currentVerb) {
              toggleBookmark(currentVerb.germanWord);
              setBookmarkedVerbs(getBookmarkStrings());
            }
          }}
        />
      </div>

      <div className="flex-none w-full max-w-250 flex flex-col items-center relative">
        {!mounted
          ? renderSkeleton()
          : currentVerb && (
              <div className="flex flex-col z-10 w-full transition-opacity duration-300 animate-fadeIn mb-4">
                <div className="grid grid-cols-4 gap-x-3 mb-0.5">
                  {HEADINGS.map(renderHeading)}
                </div>
                <div className="grid grid-cols-4 gap-x-3">
                  {renderMeaningCell(currentVerb)}
                  {currentTargets.map(renderGuessableCell)}
                </div>
              </div>
            )}
      </div>

      {/* History Panel */}
      <div className="flex-1 min-h-0 w-full max-w-250 flex flex-col border-t z-10 border-slate-300 dark:border-[#2a2a35] overflow-hidden mt-2 bg-slate-100 dark:bg-[#15151c] rounded-b-xl shadow-inner">
        <div className="px-4 py-2 border-b border-slate-300 dark:border-zinc-800 flex justify-between items-center shrink-0 bg-slate-200 dark:bg-[#1a1a24]">
          <div className="flex items-center gap-2">
            <h3 className="font-extrabold text-slate-700 dark:text-zinc-300 text-[10px] tracking-widest uppercase">
              Verb History
            </h3>

            <Trash2
              onClick={() => setHistory([])}
              className="h-4 w-4 text-slate-400 dark:text-zinc-500 cursor-pointer transition-all duration-200 ease-out 
              hover:text-red-500 hover:scale-110 active:scale-90"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto flex flex-col w-full">
          {history.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-xs font-semibold text-slate-400 dark:text-zinc-600 italic py-4">
              Guesses will appear here
            </div>
          ) : (
            history.map((item, idx) => (
              <div
                key={idx}
                className="w-full shrink-0 py-3 px-4 border-y border-black dark:border-zinc-800 -mt-px first:mt-0 flex flex-col sm:flex-row sm:items-center justify-between bg-white dark:bg-[#0e0e12]"
              >
                <div className="flex items-center gap-2 sm:w-1/3 overflow-hidden pb-1 sm:pb-0 pr-2">
                  <div className="text-[10px] font-bold uppercase truncate text-slate-500 dark:text-slate-400 shrink min-w-0">
                    {item.verb.englishMeaning[0]}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {item.verb.requiresCase?.includes("dativ") && (
                      <span className="px-1.5 py-px text-[8px] font-bold rounded bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border border-orange-200 dark:border-orange-800/50 tracking-wider uppercase">
                        +Dativ
                      </span>
                    )}
                    {item.verb.requiresCase?.includes("genitiv") && (
                      <span className="px-1.5 py-px text-[8px] font-bold rounded bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 border border-rose-200 dark:border-rose-800/50 tracking-wider uppercase">
                        +Genitiv
                      </span>
                    )}
                    {item.verb.isReflexive && (
                      <span className="px-1.5 py-px text-[8px] font-bold rounded bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border border-purple-200 dark:border-purple-800/50 tracking-wider uppercase">
                        +sich{" "}
                        {item.verb.reflexiveCase === "dativ" ? "(Dat)" : ""}
                      </span>
                    )}
                    {item.verb.separable && (
                      <span className="px-1.5 py-px text-[8px] font-bold rounded bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400 border border-teal-200 dark:border-teal-800/50 tracking-wider uppercase">
                        Trennbar
                      </span>
                    )}
                    {item.verb.auxiliary === "sein" && (
                      <span className="px-1.5 py-px text-[8px] font-bold rounded bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400 border border-sky-200 dark:border-sky-800/50 tracking-wider uppercase">
                        ist
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-0.5 sm:mt-0 text-sm font-bold flex flex-wrap items-center gap-x-2 leading-tight">
                  <span
                    className={
                      item.guessedSlots.has("inf")
                        ? "text-green-600 dark:text-[#7ec87e]"
                        : "text-red-600 dark:text-[#ff7e7e]"
                    }
                  >
                    {item.verb.germanWord}
                  </span>
                  <span className="opacity-70 text-[11px] text-slate-500">
                    {"->"}
                  </span>
                  <span
                    className={
                      item.guessedSlots.has("past")
                        ? "text-green-600 dark:text-[#7ec87e]"
                        : "text-red-600 dark:text-[#ff7e7e]"
                    }
                  >
                    {item.verb.simplePast}
                  </span>
                  <span className="opacity-70 text-[11px] text-slate-500">
                    {"->"}
                  </span>
                  <span
                    className={
                      item.guessedSlots.has("perf")
                        ? "text-green-600 dark:text-[#7ec87e]"
                        : "text-red-600 dark:text-[#ff7e7e]"
                    }
                  >
                    {item.verb.pastParticiple}
                  </span>

                  {/* {item.wrongTries > 0 && (
                    <span className="ml-1 text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 opacity-80 shrink-0">
                      {item.strictMode
                        ? `${3 - item.wrongTries} left`
                        : `${item.wrongTries} fail${item.wrongTries !== 1 ? "s" : ""}`}
                    </span>
                  )} */}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
