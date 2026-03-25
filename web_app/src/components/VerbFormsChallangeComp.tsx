"use client";

import { useState, useRef, useEffect } from "react";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import Link from "next/link";
import MemoryGameControls from "@/components/MemoryGameControls";
import verbsDataRaw from "@/data/verbs.json";
import { VerbWord } from "@/models/verb";

// Only pick verbs that have the required 4 fields
const VERBS: VerbWord[] = (verbsDataRaw as any[]).filter(
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
  original: string;
  normalized: string;
  type: string;
};

type HistoryItem = {
  verb: VerbWord;
  status: "success" | "failed";
};

const normalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");

function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export default function VerbFormsChallangeComp() {
  const [activeVerbs, setActiveVerbs] = useState<VerbWord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const [guessed, setGuessed] = useState<Set<string>>(new Set());
  const [input, setInput] = useState("");
  const [shake, setShake] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Overall game progress (guessed forms total across the game)
  const [totalGuessedForms, setTotalGuessedForms] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const { playSound } = useSoundEffects();

  const startNewGame = () => {
    // Play with ALL verbs in a random order
    const shuffled = shuffleArray(VERBS);
    setActiveVerbs(shuffled);
    setCurrentIndex(0);
    setHistory([]);
    setGuessed(new Set());
    setTotalGuessedForms(0);
    setInput("");
    setFlash(null);
    setShake(false);
    setShowAll(false);
    inputRef.current?.focus();
  };

  useEffect(() => {
    setIsClient(true);
    startNewGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!shake) {
      inputRef.current?.focus();
    }
  }, [shake, guessed]);

  const currentVerb = activeVerbs[currentIndex];
  // Game never ends now, so it loops automatically.
  const isGameOver = false;

  // Derive targets for the current verb ONLY
  let currentTargets: TargetForm[] = [];
  if (currentVerb) {
    currentTargets = [
      {
        original: currentVerb.germanWord,
        normalized: normalize(currentVerb.germanWord),
        type: "Inf.",
      },
      {
        original: currentVerb.simplePast || "",
        normalized: normalize(currentVerb.simplePast || ""),
        type: "Prät.",
      },
      {
        original: currentVerb.pastParticiple || "",
        normalized: normalize(currentVerb.pastParticiple || ""),
        type: "Perf.",
      },
    ];
  }

  // Handle advancing logic via effect when showAll goes true (simulating "Give Up")
  useEffect(() => {
    if (showAll && currentVerb) {
      playSound("wrong");
      // Add red history item
      setHistory((prev) => [{ verb: currentVerb, status: "failed" }, ...prev]);

      const timer = setTimeout(() => {
        advanceToNext();
      }, 2000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAll]);

  const advanceToNext = () => {
    let shouldRestart = false;
    setCurrentIndex((prev) => {
      if (prev + 1 >= activeVerbs.length) {
        shouldRestart = true;
        return prev;
      }
      return prev + 1;
    });

    if (shouldRestart) {
      startNewGame();
    } else {
      setGuessed(new Set());
      setShowAll(false);
      setFlash(null);
      setInput("");
    }
  };

  const handleGuess = () => {
    const val = normalize(input);
    if (!val || showAll || isGameOver) return;

    // Check against CURRENT verb targets
    const matches = currentTargets.filter((t) => t.normalized === val);

    if (matches.length > 0) {
      let madeNewGuess = false;
      const newGuessedSet = new Set(guessed);

      matches.forEach((match) => {
        if (!newGuessedSet.has(match.normalized)) {
          madeNewGuess = true;
          newGuessedSet.add(match.normalized);
          setFlash(match.normalized);
        }
      });

      if (madeNewGuess) {
        setGuessed(newGuessedSet);
        playSound("correct");
        setInput("");
        setTotalGuessedForms((prev) => prev + 1);

        // Success condition for current verb
        const requiredCount = new Set(currentTargets.map((t) => t.normalized))
          .size;
        if (newGuessedSet.size === requiredCount) {
          setHistory((prev) => [
            { verb: currentVerb, status: "success" },
            ...prev,
          ]);
          setTimeout(() => {
            advanceToNext();
          }, 1200);
        } else {
          setTimeout(() => setFlash(null), 800);
        }
      } else {
        // Already guessed
        setShake(true);
        setTimeout(() => setShake(false), 500);
        playSound("wrong");
      }
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      playSound("wrong");
    }
  };

  const resetFunction = () => {
    // We repurpose "reset" on MemoryGameControls to simply clear the text box
    setInput("");
    inputRef.current?.focus();
  };

  const toggleShow = () => {
    if (isGameOver || showAll) return;
    setShowAll(true);
  };

  if (!isClient) return null;

  const totalPossibleForms = activeVerbs.length * 4;
  const progress =
    totalPossibleForms > 0
      ? Math.round((totalGuessedForms / totalPossibleForms) * 100)
      : 0;

  const renderHeading = (text: string) => {
    return (
      <div
        key={text}
        className="w-full px-2 py-1.5 text-sm font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-300 dark:border-gray-700 mb-1"
      >
        {text}
      </div>
    );
  };

  const renderMeaningCell = (v: VerbWord) => {
    return (
      <div
        key={"meaning-" + v.germanWord}
        className="flex flex-col items-center justify-center w-full px-2 py-1.5 rounded-lg mb-1.5 min-h-[44px] bg-slate-100 border-2 border-slate-300 dark:bg-[#1a1a24] dark:border-[#3a3a4a] text-center shadow-sm"
      >
        <span className="font-sans font-bold text-slate-800 dark:text-[#e8e2d6] text-[0.8rem] leading-tight">
          {v.englishMeaning[0]}
        </span>
        <span className="font-sans text-slate-600 dark:text-[#a0a0aa] text-[0.7rem] leading-tight mt-0.5">
          {v.hindiMeaning[0]}
        </span>
      </div>
    );
  };

  const renderGuessableCell = (original: string, titleType: string) => {
    const norm = normalize(original);
    const isRevealed = guessed.has(norm);
    const isVisible = isRevealed || showAll;
    const isFlashing = flash === norm;

    let cellClasses =
      "font-courier group inline-flex items-center justify-center w-full px-2 rounded-lg text-[0.85rem] tracking-[0.04em] transition-all duration-[400ms] ease-in-out relative cursor-default border min-h-[44px] mb-1.5 ";

    if (isVisible) {
      if (isRevealed) {
        cellClasses +=
          "bg-green-50 z-10 border-green-400 text-green-700 shadow-[0_0_12px_rgba(34,197,94,0.3)] dark:bg-[#1a2a1a] dark:border-[#3d6b3d] dark:text-[#7ec87e] dark:shadow-[0_0_12px_rgba(126,200,126,0.15)] ";
      } else {
        cellClasses +=
          "bg-slate-50 z-10 border-slate-300 text-slate-600 dark:bg-[#15151c] dark:border-[#3a3a4a] dark:text-[#9a9aa0] ";
      }
    } else {
      cellClasses +=
        "text-transparent z-10 border-slate-200 dark:border-[#2a2a35] bg-white dark:bg-[#0e0e12] after:content-[''] after:absolute after:inset-y-[8px] after:inset-x-3 after:rounded-md after:bg-slate-200 dark:after:bg-[#2a2a35] ";
    }

    if (isFlashing) {
      cellClasses += " animate-popIn dark:bg-[#2a4a2a] bg-green-200 z-20 ";
    }

    return (
      <div key={titleType + "-" + original} className={cellClasses}>
        {original}
      </div>
    );
  };

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

      <div className="flex-none flex flex-col items-center w-full max-w-[1000px]">
        <h1 className="font-fell text-[1.4rem] tracking-[0.06em] z-10 text-slate-800 dark:text-[#c8c0b0] mb-0 text-center">
          Verbformen
        </h1>
        <p className="font-courier text-[0.65rem] text-slate-600 z-10 dark:text-[#555560] tracking-[0.12em] uppercase mb-2 text-center">
          Verb Forms Challenge Game
        </p>

        <MemoryGameControls
          input={input}
          setInput={setInput}
          handleGuess={handleGuess}
          resetFunction={resetFunction}
          showAll={showAll}
          toggleShow={toggleShow}
          shake={shake}
          inputRef={inputRef}
          placeholder="Type a verb form..."
        />
      </div>

      <div className="flex-none w-full max-w-[1000px] flex flex-col items-center relative">
        {/* ONE VERB AT A TIME DISPLAY */}
        {currentVerb && (
          <div className="flex flex-col z-10 w-full transition-opacity duration-300 animate-fadeIn mb-4">
            {/* Header Row */}
            <div className="grid grid-cols-4 gap-x-3 mb-[2px]">
              {HEADINGS.map((h) => renderHeading(h))}
            </div>

            {/* Current Verb Row */}
            <div className="grid grid-cols-4 gap-x-3">
              {renderMeaningCell(currentVerb)}
              {renderGuessableCell(currentVerb.germanWord, "inf")}
              {renderGuessableCell(currentVerb.simplePast!, "past")}
              {renderGuessableCell(currentVerb.pastParticiple!, "perf")}
            </div>
          </div>
        )}
      </div>

      {/* DYNAMIC HISTORY PANEL BELOW VERBS */}
      <div className="flex-1 min-h-0 w-full max-w-[1000px] flex flex-col border-t z-10 border-slate-300 dark:border-[#2a2a35] overflow-hidden mt-2 bg-slate-100 dark:bg-[#15151c] rounded-b-xl shadow-inner">
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
                  <div className="text-[10px] font-bold font-sans uppercase truncate text-slate-500 dark:text-slate-400 shrink min-w-0">
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

                {/* inf -> past -> perf format with green and red */}
                <div
                  className={`mt-0.5 sm:mt-0 font-courier text-sm font-bold flex flex-wrap items-center gap-x-2 leading-tight ${
                    item.status === "success"
                      ? "text-green-600 dark:text-[#7ec87e]"
                      : "text-red-600 dark:text-[#ff7e7e]"
                  }`}
                >
                  <span>{item.verb.germanWord}</span>
                  <span className="opacity-70 text-[11px] font-sans">
                    {"->"}
                  </span>
                  <span>{item.verb.simplePast}</span>
                  <span className="opacity-70 text-[11px] font-sans">
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
