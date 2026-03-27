"use client";

import { useState, useRef, ChangeEvent, KeyboardEvent, useEffect } from "react";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import Link from "next/link";
import MemoryGameControls from "@/components/MemoryGameControls";

type CalendarItem = {
  word: string;
  en: string;
  hi: string;
  type: string;
};

const HEADINGS: CalendarItem[] = [
  { word: "Jahreszeit", en: "Season", hi: "मौसम", type: "Noun" },
  { word: "Monat", en: "Month", hi: "महीना", type: "Noun" },
  { word: "Woche", en: "Week", hi: "सप्ताह", type: "Noun" },
];

const SEASONS: CalendarItem[] = [
  { word: "Frühling", en: "Spring", hi: "वसंत", type: "Noun" },
  { word: "Sommer", en: "Summer", hi: "गर्मी", type: "Noun" },
  { word: "Herbst", en: "Autumn", hi: "पतझड़", type: "Noun" },
  { word: "Winter", en: "Winter", hi: "सर्दी", type: "Noun" },
];

const MONTHS: CalendarItem[] = [
  { word: "Januar", en: "January", hi: "जनवरी", type: "Noun" },
  { word: "Februar", en: "February", hi: "फरवरी", type: "Noun" },
  { word: "März", en: "March", hi: "मार्च", type: "Noun" },
  { word: "April", en: "April", hi: "अप्रैल", type: "Noun" },
  { word: "Mai", en: "May", hi: "मई", type: "Noun" },
  { word: "Juni", en: "June", hi: "जून", type: "Noun" },
  { word: "Juli", en: "July", hi: "जुलाई", type: "Noun" },
  { word: "August", en: "August", hi: "अगस्त", type: "Noun" },
  { word: "September", en: "September", hi: "सितंबर", type: "Noun" },
  { word: "Oktober", en: "October", hi: "अक्टूबर", type: "Noun" },
  { word: "November", en: "November", hi: "नवंबर", type: "Noun" },
  { word: "Dezember", en: "December", hi: "दिसंबर", type: "Noun" },
];

const WEEKS: CalendarItem[] = [
  { word: "Montag", en: "Monday", hi: "सोमवार", type: "Noun" },
  { word: "Dienstag", en: "Tuesday", hi: "मंगलवार", type: "Noun" },
  { word: "Mittwoch", en: "Wednesday", hi: "बुधवार", type: "Noun" },
  { word: "Donnerstag", en: "Thursday", hi: "गुरुवार", type: "Noun" },
  { word: "Freitag", en: "Friday", hi: "शुक्रवार", type: "Noun" },
  { word: "Samstag", en: "Saturday", hi: "शनिवार", type: "Noun" },
  { word: "Sonntag", en: "Sunday", hi: "रविवार", type: "Noun" },
];

const ALL_WORDS = [...HEADINGS, ...SEASONS, ...MONTHS, ...WEEKS];

const normalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");

export default function CalendarMemoryGameComp() {
  const [guessed, setGuessed] = useState<Set<string>>(new Set());
  const [input, setInput] = useState("");
  const [shake, setShake] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { playSound } = useSoundEffects();

  const resetFunction = () => {
    setGuessed(new Set());
    setInput("");
    setFlash(null);
    setShake(false);
    setShowAll(false);
    inputRef.current?.focus();
  };

  const toggleShow = () => setShowAll(!showAll);

  // Optionally focus back gracefully to maintain game flow
  useEffect(() => {
    if (!shake) {
      inputRef.current?.focus();
    }
  }, [shake, guessed]);

  const handleGuess = () => {
    const val = normalize(input);
    if (!val) return;
    const match = ALL_WORDS.find((item) => normalize(item.word) === val);
    if (match && !guessed.has(match.word)) {
      setGuessed((prev) => new Set([...prev, match.word]));
      setFlash(match.word);
      setTimeout(() => setFlash(null), 800);
      playSound("correct");
      setInput("");
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      playSound("wrong");
    }
  };

  const progress = Math.round((guessed.size / ALL_WORDS.length) * 100);

  const renderCell = (
    item: CalendarItem,
    isHeading = false,
    stretch = false
  ) => {
    if (!item) return null;

    // Auto complete "Winter" hack natively if they guessed it
    const isRevealed = guessed.has(item.word);
    const isVisible = isRevealed || showAll;
    const isFlashing = flash === item.word;

    let cellClasses = `group inline-flex items-center justify-center min-w-[140px] px-2.5 rounded text-[0.85rem] tracking-[0.04em] transition-all duration-[400ms] ease-in-out relative cursor-default border `;

    if (stretch) {
      cellClasses += "h-full w-full py-1 ";
    } else if (isHeading) {
      cellClasses +=
        "h-9 text-[0.85rem] font-bold border-2 shadow-sm rounded-lg uppercase tracking-wider mb-1 ";
    } else {
      cellClasses += "h-[32px] ";
    }

    if (isVisible) {
      if (isRevealed) {
        if (isHeading) {
          cellClasses +=
            "bg-blue-100 z-10 border-blue-500 text-blue-900 shadow-[0_0_12px_rgba(59,130,246,0.6)] dark:bg-[#1a2b44] dark:border-[#4d7db8] dark:text-[#9bc2f5] dark:shadow-[0_0_12px_rgba(77,125,184,0.4)] ";
        } else {
          cellClasses +=
            "bg-green-50 z-10 border-green-400 text-green-700 shadow-[0_0_12px_rgba(34,197,94,0.3)] dark:bg-[#1a2a1a] dark:border-[#3d6b3d] dark:text-[#7ec87e] dark:shadow-[0_0_12px_rgba(126,200,126,0.15)] ";
        }
      } else {
        if (isHeading) {
          cellClasses +=
            "bg-slate-200 z-10 border-slate-600 text-slate-800 dark:bg-[#20202d] dark:border-[#6a6a7a] dark:text-[#f8f2e6] ";
        } else {
          cellClasses +=
            "bg-slate-50 z-10 border-slate-300 text-slate-600 dark:bg-[#15151c] dark:border-[#3a3a4a] dark:text-[#9a9aa0] ";
        }
      }
    } else {
      if (isHeading) {
        cellClasses +=
          "text-transparent z-10 border-slate-500 dark:border-[#4a4a5a] bg-slate-100 dark:bg-[#1a1a24] after:content-[''] after:absolute after:inset-y-[6px] after:inset-x-3 after:rounded-sm after:bg-slate-500 dark:after:bg-[#4a4a5a] shadow-sm ";
      } else {
        cellClasses +=
          "text-transparent z-10 border-slate-200 dark:border-[#2a2a35] bg-white dark:bg-[#0e0e12] after:content-[''] after:absolute after:inset-y-[4px] after:inset-x-2.5 after:rounded-sm after:bg-slate-200 dark:after:bg-[#2a2a35] ";
      }
    }

    if (isFlashing) {
      cellClasses += " animate-popIn dark:bg-[#2a4a2a] bg-green-200 z-20 ";
    }

    return (
      <div
        key={item.word + (stretch ? "-stretch" : "")}
        className={cellClasses}
      >
        {item.word}

        {isVisible && (
          <div
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
          hidden group-hover:flex flex-col bg-white dark:bg-[#2a2a35] 
          text-black dark:text-[#e8e2d6] text-xs rounded-md shadow-xl py-2 px-3 
          z-50 w-max min-w-[120px] pointer-events-none before:content-[''] 
          before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 
          before:border-4 before:border-transparent before:border-t-slate-800 
          dark:before:border-t-[#2a2a35]"
          >
            <span className="font-bold text-green-600 dark:text-[#7ec87e] mb-1 tracking-wide uppercase text-[0.65rem] border-b border-slate-200 dark:border-[#4a4a5a] pb-1">
              {item.type}
            </span>
            <span
              className="mt-0.5"
              style={{ fontFamily: "sans-serif" }}
            >
              {item.en}
            </span>
            <span
              className="mt-0.5"
              style={{ fontFamily: "sans-serif" }}
            >
              {item.hi}
            </span>
          </div>
        )}
      </div>
    );
  };

  const getSeason = (word: string) => SEASONS.find((s) => s.word === word)!;

  return (
    <div className="h-dvh w-full overflow-hidden flex flex-col items-center bg-slate-50 dark:bg-[#0e0e12] text-slate-900 dark:text-[#e8e2d6] pt-2 pb-1 px-4 relative">
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
      <div className="flex-none flex flex-col items-center w-full max-w-[800px]">
        <h1 className="text-[1.4rem] tracking-[0.06em] z-10 text-slate-800 dark:text-[#c8c0b0] mb-0 text-center">
          Kalender Wörter
        </h1>
        <p className="text-[0.65rem] text-slate-600 z-10 dark:text-[#555560] tracking-[0.12em] uppercase mb-2 text-center">
          German Calendar Word Memory Game
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
          placeholder="Type a word…"
        />

        <p className="text-[0.75rem] text-slate-600 dark:text-[#555560] mb-1">
          <span className="text-green-600 dark:text-[#7ec87e]">
            {guessed.size}
          </span>{" "}
          / {ALL_WORDS.length} guessed
        </p>

        <div className="h-1 bg-slate-200 dark:bg-[#2a2a35] rounded-sm w-full overflow-hidden my-0 mb-3">
          <div
            className="h-full bg-linear-to-r from-green-500 to-green-400 dark:from-[#3d6b3d] dark:to-[#7ec87e] rounded-sm transition-all duration-400 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex-1 w-full max-w-[1000px] flex flex-row justify-center gap-12 relative overflow-hidden pb-1">
        {guessed.size === ALL_WORDS.length && (
          <div className="absolute top-10 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
            <div className="bg-white/95 dark:bg-[#15151c]/95 p-6 rounded-xl shadow-2xl backdrop-blur-md animate-popIn border border-green-200 dark:border-green-800">
              <div className="text-[1.8rem] text-green-600 dark:text-[#7ec87e] tracking-[0.05em] text-center mb-1">
                ✦ Ausgezeichnet! ✦
              </div>
              <div className="text-slate-600 dark:text-[#9a9aa0] text-center tracking-widest text-[0.9rem]">
                All words found.
              </div>
            </div>
          </div>
        )}

        {/* Group 1: Seasons and Months */}
        <div
          className={`flex flex-col z-10 transition-opacity duration-700 ${guessed.size === ALL_WORDS.length ? "opacity-30" : "opacity-100"}`}
        >
          <div className="grid grid-cols-[140px_140px] gap-x-4">
            {renderCell(HEADINGS[0], true)}
            {renderCell(HEADINGS[1], true)}
          </div>
          <div className="grid grid-cols-[140px_140px] gap-x-4 gap-y-[4px] auto-rows-min">
            {/* Seasons spanning rows according to the months they cover! */}
            {/* Winter starts technically in December and spans Jan, Feb. */}
            <div className="col-start-1 row-start-1 row-end-3 py-[2px]">
              {renderCell(getSeason("Winter"), false, true)}
            </div>
            {/* Frühling covers March (3), April (4), May (5) */}
            <div className="col-start-1 row-start-3 row-end-6 py-[2px]">
              {renderCell(getSeason("Frühling"), false, true)}
            </div>
            {/* Sommer covers June (6), July (7), August (8) */}
            <div className="col-start-1 row-start-6 row-end-9 py-[2px]">
              {renderCell(getSeason("Sommer"), false, true)}
            </div>
            {/* Herbst covers Sept (9), Oct (10), Nov (11) */}
            <div className="col-start-1 row-start-9 row-end-12 py-[2px]">
              {renderCell(getSeason("Herbst"), false, true)}
            </div>
            {/* December is technically Winter again. We can render a connection block or just leave blank */}
            <div className="col-start-1 row-start-12 row-end-13 flex justify-center items-center opacity-60">
              {/* Visual echo of winter for Dec */}
              {renderCell(getSeason("Winter"), false, false)}
            </div>

            {/* Months (1 to 12) */}
            {MONTHS.map((m, i) => (
              <div
                key={m.word}
                className="col-start-2"
                style={{ gridRowStart: i + 1 }}
              >
                {renderCell(m, false, false)}
              </div>
            ))}
          </div>
        </div>

        {/* Group 2: Weeks */}
        <div
          className={`flex flex-col z-10 transition-opacity duration-700 ${guessed.size === ALL_WORDS.length ? "opacity-30" : "opacity-100"}`}
        >
          <div className="grid grid-cols-[140px] gap-x-4">
            {renderCell(HEADINGS[2], true)}
          </div>
          <div className="grid grid-cols-[140px] gap-y-[6px]">
            {WEEKS.map((w, i) => (
              <div key={w.word} style={{ gridRowStart: i + 1 }}>
                {renderCell(w, false, false)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
