"use client";

import { useState, useRef, ChangeEvent, KeyboardEvent, useEffect } from "react";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import Link from "next/link";

type VerbItem = {
  word: string;
  en: string;
  hi: string;
  type: string;
  isPlaceholder?: boolean;
};

const HEADINGS: VerbItem[] = [
  { word: "Infinitiv", en: "Infinitive", hi: "मूल क्रिया", type: "Noun" },
  {
    word: "Präsens",
    en: "Present (ich/er/sie/es)",
    hi: "वर्तमान",
    type: "Noun",
  },
  {
    word: "Präteritum",
    en: "Past (ich/er/sie/es)",
    hi: "भूतकाल",
    type: "Noun",
  },
  { word: "Partizip II", en: "Past Participle", hi: "भूत कृदंत", type: "Noun" },
];

const MODAL_VERBS: VerbItem[][] = [
  // können
  [
    { word: "können", en: "can, to be able to", hi: "सकना", type: "Verb" },
    { word: "kann", en: "can (I/he/she/it)", hi: "सकता है", type: "Verb" },
    { word: "konnte", en: "could (I/he/she/it)", hi: "सकता था", type: "Verb" },
    { word: "gekonnt", en: "been able to", hi: "सका", type: "Verb" },
  ],
  // müssen
  [
    { word: "müssen", en: "must, to have to", hi: "पड़ना", type: "Verb" },
    { word: "muss", en: "must (I/he/she/it)", hi: "पड़ता है", type: "Verb" },
    {
      word: "musste",
      en: "had to (I/he/she/it)",
      hi: "पड़ता था",
      type: "Verb",
    },
    { word: "gemusst", en: "had to", hi: "पड़ा", type: "Verb" },
  ],
  // dürfen
  [
    {
      word: "dürfen",
      en: "may, to be allowed to",
      hi: "अनुमति होना",
      type: "Verb",
    },
    { word: "darf", en: "may (I/he/she/it)", hi: "अनुमति है", type: "Verb" },
    {
      word: "durfte",
      en: "was allowed to (I/he/she/it)",
      hi: "अनुमति थी",
      type: "Verb",
    },
    { word: "gedurft", en: "been allowed to", hi: "अनुमति मिली", type: "Verb" },
  ],
  // sollen
  [
    {
      word: "sollen",
      en: "should, to be supposed to",
      hi: "चाहिए",
      type: "Verb",
    },
    { word: "soll", en: "should (I/he/she/it)", hi: "चाहिए", type: "Verb" },
    {
      word: "sollte",
      en: "should have (I/he/she/it)",
      hi: "चाहिए था",
      type: "Verb",
    },
    { word: "gesollt", en: "been supposed to", hi: "चाहिए था", type: "Verb" },
  ],
  // wollen
  [
    { word: "wollen", en: "want, to want to", hi: "चाहना", type: "Verb" },
    { word: "will", en: "wants (I/he/she/it)", hi: "चाहता है", type: "Verb" },
    {
      word: "wollte",
      en: "wanted to (I/he/she/it)",
      hi: "चाहता था",
      type: "Verb",
    },
    { word: "gewollt", en: "wanted", hi: "चाहा", type: "Verb" },
  ],
  // mögen
  [
    { word: "mögen", en: "like, to like", hi: "पसंद करना", type: "Verb" },
    { word: "mag", en: "likes (I/he/she/it)", hi: "पसंद है", type: "Verb" },
    { word: "mochte", en: "liked (I/he/she/it)", hi: "पसंद था", type: "Verb" },
    { word: "gemocht", en: "liked", hi: "पसंद किया", type: "Verb" },
  ],
  // möchten
  [
    { word: "möchten", en: "would like to", hi: "चाहेंगे", type: "Verb" },
    {
      word: "möchte",
      en: "would like (I/he/she/it)",
      hi: "चाहता है",
      type: "Verb",
    },
    {
      word: "-",
      en: "No past tense (uses wollte)",
      hi: "-",
      type: "Placeholder",
      isPlaceholder: true,
    },
    {
      word: "- ",
      en: "No partizip form",
      hi: "-",
      type: "Placeholder",
      isPlaceholder: true,
    },
  ],
];

const ALL_WORDS = [
  ...HEADINGS,
  ...MODAL_VERBS.flat().filter((v) => !v.isPlaceholder),
];

const normalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");

export default function ModalVerbMemoryGameComp() {
  const [guessed, setGuessed] = useState<Set<string>>(new Set());
  const [input, setInput] = useState("");
  const [shake, setShake] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { playKeyboardSound, playSound } = useSoundEffects();

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

  const renderCell = (item: VerbItem, isHeading = false) => {
    if (!item) return null;

    if (item.isPlaceholder) {
      return (
        <div
          key={item.word + Math.random()}
          className="h-[32px] w-full flex items-center justify-center opacity-30 cursor-default text-slate-400 dark:text-slate-600"
        >
          -
        </div>
      );
    }

    const isRevealed = guessed.has(item.word);
    const isVisible = isRevealed || showAll;
    const isFlashing = flash === item.word;

    let cellClasses = `font-courier group inline-flex items-center justify-center w-full px-2.5 rounded text-[0.85rem] tracking-[0.04em] transition-all duration-[400ms] ease-in-out relative cursor-default border `;

    if (isHeading) {
      cellClasses +=
        "h-9 text-[0.85rem] font-bold border-2 shadow-sm rounded-lg uppercase tracking-wider mb-2 ";
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
      <div key={item.word} className={cellClasses}>
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
            <span className="font-bold text-green-600 dark:text-[#7ec87e] mb-1 font-sans tracking-wide uppercase text-[0.65rem] border-b border-slate-200 dark:border-[#4a4a5a] pb-1">
              {item.type}
            </span>
            <span
              className="font-sans mt-0.5"
              style={{ fontFamily: "sans-serif" }}
            >
              {item.en}
            </span>
            <span
              className="font-sans mt-0.5"
              style={{ fontFamily: "sans-serif" }}
            >
              {item.hi}
            </span>
          </div>
        )}
      </div>
    );
  };

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
        <h1 className="font-fell text-[1.4rem] tracking-[0.06em] z-10 text-slate-800 dark:text-[#c8c0b0] mb-0 text-center">
          Modalverben
        </h1>
        <p className="font-courier text-[0.65rem] text-slate-600 z-10 dark:text-[#555560] tracking-[0.12em] uppercase mb-2 text-center">
          German Modal Verbs Memory Game
        </p>

        <div
          className={`flex gap-2.5 mb-3 items-center flex-wrap justify-center ${shake ? "animate-shake" : ""}`}
        >
          <input
            ref={inputRef}
            className={`font-courier bg-white dark:bg-[#15151c] border border-slate-300 
              dark:border-[#3a3a4a] rounded-md text-slate-900 dark:text-[#e8e2d6] z-10 
              text-[0.95rem] py-2 px-4 w-[240px] outline-none transition-colors duration-200 
              focus:border-green-500 dark:focus:border-[#7ec87e]`}
            value={input}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInput(e.target.value)
            }
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
              playKeyboardSound(e.key);
              e.key === "Enter" && handleGuess();
            }}
            placeholder="Type a word…"
            autoFocus
          />
          <button
            className="font-courier bg-green-100 dark:bg-[#1e3a1e] border z-10 
            border-green-500 dark:border-[#3d6b3d] rounded-md text-green-700 
            dark:text-[#7ec87e] text-[0.9rem] py-2 px-[1.2rem] cursor-pointer 
            transition-colors duration-200 hover:bg-green-200 dark:hover:bg-[#2a4a2a]"
            onClick={handleGuess}
          >
            Enter
          </button>
          <button
            className="font-courier bg-slate-100 dark:bg-[#2a2a35] border z-10  
            border-slate-300 dark:border-[#3a3a4a] rounded-md text-slate-700 
            dark:text-[#c8c0b0] text-[0.9rem] py-2 px-[1.2rem] cursor-pointer 
            transition-colors duration-200 hover:bg-slate-200 dark:hover:bg-[#3a3a4a]"
            onClick={() => {
              setGuessed(new Set());
              setInput("");
              setFlash(null);
              setShake(false);
              setShowAll(false);
              inputRef.current?.focus();
            }}
          >
            Reset
          </button>
          <button
            className="font-courier bg-blue-50 dark:bg-[#1c2738] border z-10 
            border-blue-400 dark:border-[#3d5b8b] rounded-md text-blue-700 
            dark:text-[#7ba9e8] text-[0.9rem] py-2 px-[1.2rem] cursor-pointer 
            transition-colors duration-200 hover:bg-blue-100 dark:hover:bg-[#26354b] ml-1"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Hide All" : "Show All"}
          </button>
        </div>

        <p className="font-courier text-[0.75rem] text-slate-600 dark:text-[#555560] mb-1">
          <span className="text-green-600 dark:text-[#7ec87e]">
            {guessed.size}
          </span>{" "}
          / {ALL_WORDS.length} guessed
        </p>

        <div className="h-1 bg-slate-200 dark:bg-[#2a2a35] rounded-sm w-full overflow-hidden my-0 mb-4 inline-block">
          <div
            className="h-full bg-linear-to-r from-green-500 to-green-400 dark:from-[#3d6b3d] dark:to-[#7ec87e] rounded-sm transition-all duration-400 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex-1 w-full max-w-[800px] flex flex-col items-center relative overflow-hidden pb-1">
        {guessed.size === ALL_WORDS.length && (
          <div className="absolute top-10 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
            <div className="bg-white/95 dark:bg-[#15151c]/95 p-6 rounded-xl shadow-2xl backdrop-blur-md animate-popIn border border-green-200 dark:border-green-800">
              <div className="font-fell text-[1.8rem] text-green-600 dark:text-[#7ec87e] tracking-[0.05em] text-center mb-1">
                ✦ Ausgezeichnet! ✦
              </div>
              <div className="font-courier text-slate-600 dark:text-[#9a9aa0] text-center tracking-widest text-[0.9rem]">
                All words found.
              </div>
            </div>
          </div>
        )}

        <div
          className={`flex flex-col z-10 w-full px-4 transition-opacity duration-700 ${guessed.size === ALL_WORDS.length ? "opacity-30" : "opacity-100"}`}
        >
          <div className="grid grid-cols-4 gap-x-4 mb-[6px]">
            {HEADINGS.map((h) => renderCell(h, true))}
          </div>

          <div className="grid grid-cols-4 gap-x-4 gap-y-[6px]">
            {MODAL_VERBS.map((verbRow, rowIndex) =>
              verbRow.map((v) => renderCell(v, false))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
