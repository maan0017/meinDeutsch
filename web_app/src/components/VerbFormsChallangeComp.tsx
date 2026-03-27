"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import Link from "next/link";
import MemoryGameControls from "@/components/MemoryGameControls";
import verbsDataRaw from "@/data/verbs.json";
import { VerbWord } from "@/models/verb";

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

type HistoryItem = { verb: VerbWord; status: "success" | "failed" };

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

export default function VerbFormsChallangeComp() {
  // SSR-safe: start with empty array so server and client initial render match.
  // The mount effect below populates it with a shuffled list on the client only.
  const [activeVerbs, setActiveVerbs] = useState<VerbWord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [guessedSlots, setGuessedSlots] = useState<Set<string>>(new Set());
  const [input, setInput] = useState("");
  const [shake, setShake] = useState(false);
  const [flashSlot, setFlashSlot] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [mounted, setMounted] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const giveUpScheduled = useRef(false);
  const { playSound } = useSoundEffects();

  const currentVerb = activeVerbs[currentIndex] ?? null;

  const currentTargets = useMemo<TargetForm[]>(
    () => (currentVerb ? buildTargets(currentVerb) : []),
    [currentVerb]
  );

  // ── Mount: shuffle and start (client-only, avoids hydration mismatch) ─────
  useEffect(() => {
    setMounted(true);
    setActiveVerbs(shuffleArray(VERBS));
    inputRef.current?.focus();
  }, []);

  // ── Navigation ────────────────────────────────────────────────────────────

  const resetRound = useCallback(() => {
    setGuessedSlots(new Set());
    setShowAll(false);
    setFlashSlot(null);
    setInput("");
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  const startNewGame = useCallback(() => {
    setActiveVerbs(shuffleArray(VERBS));
    setCurrentIndex(0);
    setHistory([]);
    setGuessedSlots(new Set());
    setInput("");
    setFlashSlot(null);
    setShake(false);
    setShowAll(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

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

    const outerTimer = setTimeout(() => {
      playSound("wrong");
      setHistory((prev) => [{ verb, status: "failed" }, ...prev]);

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
        setHistory((prev) => [{ verb, status: "success" }, ...prev]);
        setTimeout(() => advanceToNext(verbs, idx), 1200);
      }
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      playSound("wrong");
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
      className="flex flex-col items-center justify-center w-full px-2 py-1.5 rounded-lg mb-1.5 min-h-11 bg-slate-100 border-2 border-slate-300 dark:bg-[#1a1a24] dark:border-[#3a3a4a] text-center shadow-sm"
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
        <p className="text-[0.65rem] text-slate-600 z-10 dark:text-[#555560] tracking-[0.12em] uppercase mb-2 text-center">
          Verb Forms Challenge Game
        </p>

        <MemoryGameControls
          input={input}
          setInput={setInput}
          handleGuess={handleGuess}
          resetFunction={() => {
            setInput("");
            inputRef.current?.focus();
          }}
          showAll={showAll}
          toggleShow={() => {
            if (!showAll) setShowAll(true);
          }}
          shake={shake}
          inputRef={inputRef}
          placeholder="Type a verb form..."
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
          <h3 className="font-extrabold text-slate-700 dark:text-zinc-300 text-[10px] tracking-widest uppercase">
            Verb History ({history.length}/{activeVerbs.length})
          </h3>
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

                <div
                  className={`mt-0.5 sm:mt-0 text-sm font-bold flex flex-wrap items-center gap-x-2 leading-tight ${
                    item.status === "success"
                      ? "text-green-600 dark:text-[#7ec87e]"
                      : "text-red-600 dark:text-[#ff7e7e]"
                  }`}
                >
                  <span>{item.verb.germanWord}</span>
                  <span className="opacity-70 text-[11px] ">
                    {"->"}
                  </span>
                  <span>{item.verb.simplePast}</span>
                  <span className="opacity-70 text-[11px] ">
                    {"->"}
                  </span>
                  <span>{item.verb.pastParticiple}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
