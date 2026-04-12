"use client";

import { useState, useRef, useEffect } from "react";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import Link from "next/link";
import MemoryGameControls from "@/components/MemoryGameControls";

type PronounItem = {
  word: string;
  en: string;
  hi: string;
  type: string;
  isPlaceholder?: boolean;
};

const HEADINGS: PronounItem[] = [
  { word: "Nominativ", en: "Nominative (Subject)", hi: "कर्ता", type: "Case" },
  {
    word: "Akkusativ",
    en: "Accusative (Direct Object)",
    hi: "कर्म",
    type: "Case",
  },
  {
    word: "Dativ",
    en: "Dative (Indirect Object)",
    hi: "सम्प्रदान",
    type: "Case",
  },
  { word: "Possessiv", en: "Possessive", hi: "संबंध", type: "Case" },
];

const PRONOUNS: PronounItem[][] = [
  [
    { word: "ich", en: "I", hi: "मैं", type: "Pronoun" },
    { word: "mich", en: "me", hi: "मुझे", type: "Pronoun" },
    { word: "mir", en: "me (to me)", hi: "मेरे लिए / मुझे", type: "Pronoun" },
    { word: "mein", en: "my", hi: "मेरा", type: "Pronoun" },
  ],
  [
    { word: "du", en: "you (informal)", hi: "तुम", type: "Pronoun" },
    { word: "dich", en: "you", hi: "तुम्हें", type: "Pronoun" },
    {
      word: "dir",
      en: "you (to you)",
      hi: "तुम्हारे लिए / तुम्हें",
      type: "Pronoun",
    },
    { word: "dein", en: "your", hi: "तुम्हारा", type: "Pronoun" },
  ],
  [
    { word: "er", en: "he", hi: "वह (पुल्लिंग)", type: "Pronoun" },
    { word: "ihn", en: "him", hi: "उसे", type: "Pronoun" },
    { word: "ihm", en: "him (to him)", hi: "उसके लिए / उसे", type: "Pronoun" },
    { word: "sein", en: "his", hi: "उसका", type: "Pronoun" },
  ],
  [
    { word: "sie", en: "she", hi: "वह (स्त्रीलिंग)", type: "Pronoun" },
    { word: "sie", en: "her", hi: "उसे", type: "Pronoun" },
    { word: "ihr", en: "her (to her)", hi: "उसके लिए", type: "Pronoun" },
    { word: "ihr", en: "her (possessive)", hi: "उसकी", type: "Pronoun" },
  ],
  [
    { word: "es", en: "it", hi: "यह / वह", type: "Pronoun" },
    { word: "es", en: "it", hi: "इसे / उसे", type: "Pronoun" },
    { word: "ihm", en: "it (to it)", hi: "इसके लिए / इसे", type: "Pronoun" },
    { word: "sein", en: "its", hi: "इसका", type: "Pronoun" },
  ],
  [
    { word: "wir", en: "we", hi: "हम", type: "Pronoun" },
    { word: "uns", en: "us", hi: "हमें", type: "Pronoun" },
    { word: "uns", en: "us (to us)", hi: "हमारे लिए / हमें", type: "Pronoun" },
    { word: "unser", en: "our", hi: "हमारा", type: "Pronoun" },
  ],
  [
    { word: "ihr", en: "you all", hi: "तुम सब", type: "Pronoun" },
    { word: "euch", en: "you all", hi: "तुम सबको", type: "Pronoun" },
    {
      word: "euch",
      en: "you all (to you all)",
      hi: "तुम सबके लिए / तुम्हें",
      type: "Pronoun",
    },
    { word: "euer", en: "your (plural)", hi: "तुम सबका", type: "Pronoun" },
  ],
  [
    { word: "sie", en: "they", hi: "वे", type: "Pronoun" },
    { word: "sie", en: "them", hi: "उन्हें", type: "Pronoun" },
    { word: "ihnen", en: "them (to them)", hi: "उनके लिए", type: "Pronoun" },
    { word: "ihr", en: "their", hi: "उनका", type: "Pronoun" },
  ],
  [
    { word: "Sie", en: "You (formal)", hi: "आप", type: "Pronoun" },
    { word: "Sie", en: "You (formal)", hi: "आपको", type: "Pronoun" },
    {
      word: "Ihnen",
      en: "You (to you formal)",
      hi: "आपके लिए / आपको",
      type: "Pronoun",
    },
    { word: "Ihr", en: "Your (formal)", hi: "आपका", type: "Pronoun" },
  ],
];

const normalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");

// Add an ID to each pronoun so we can track them individually, allowing duplicate words
const ALL_PRONOUNS = PRONOUNS.flat().map((p, i) => ({
  ...p,
  id: i.toString(),
}));

export default function GrammarCasesMemoryGameComp() {
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

  useEffect(() => {
    if (!shake) {
      inputRef.current?.focus();
    }
  }, [shake, guessed]);

  const handleGuess = () => {
    const val = normalize(input);
    if (!val) return;

    if (guessed.size >= ALL_PRONOUNS.length) return;

    // The sequence requires guessing the exact next expected pronoun
    const expectedIndex = guessed.size;
    const expectedPronoun = ALL_PRONOUNS[expectedIndex];

    if (normalize(expectedPronoun.word) === val) {
      setGuessed((prev) => new Set([...prev, expectedPronoun.id]));
      setFlash(expectedPronoun.id);
      setTimeout(() => setFlash(null), 2500);
      playSound("correct");
      setInput("");
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      playSound("wrong");
    }
  };

  const progress = Math.round((guessed.size / ALL_PRONOUNS.length) * 100);

  const renderHeading = (heading: PronounItem) => (
    <div
      key={heading.word}
      className="w-full px-2 py-1 text-sm font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-300 dark:border-gray-700 mb-2 flex flex-col items-center justify-center text-center leading-tight"
    >
      <span>{heading.word}</span>
      <span className="text-[9px] sm:text-[10px] md:text-[11px] font-medium text-slate-400 dark:text-slate-500 mt-0.5">
        {heading.en}
      </span>
    </div>
  );

  const renderCell = (
    item: PronounItem & { id?: string },
    colIndex = 0,
    rowIndex = 0
  ) => {
    if (!item) return null;

    if (item.isPlaceholder) {
      return (
        <div
          key={`${rowIndex}-${colIndex}-placeholder`}
          className="h-[32px] w-full flex items-center justify-center opacity-30 cursor-default text-slate-400 dark:text-slate-600"
        >
          -
        </div>
      );
    }

    const id = item.id!;
    const isRevealed = guessed.has(id);
    const isVisible = isRevealed || showAll;
    const isFlashing = flash === id;
    const isExpected = id === ALL_PRONOUNS[guessed.size]?.id && !showAll;

    let cellClasses = `group inline-flex items-center justify-center w-full px-2.5 rounded text-[0.85rem] tracking-[0.04em] transition-all duration-[400ms] ease-in-out relative cursor-default border h-[32px] `;

    if (isVisible) {
      if (isRevealed) {
        cellClasses +=
          "bg-green-50 z-10 border-green-400 text-green-700 shadow-[0_0_12px_rgba(34,197,94,0.3)] dark:bg-[#1a2a1a] dark:border-[#3d6b3d] dark:text-[#7ec87e] dark:shadow-[0_0_12px_rgba(126,200,126,0.15)] ";
      } else {
        cellClasses +=
          "bg-slate-50 z-10 border-slate-300 text-slate-600 dark:bg-[#15151c] dark:border-[#3a3a4a] dark:text-[#9a9aa0] ";
      }
    } else {
      if (isExpected) {
        cellClasses +=
          "text-transparent z-10 border-blue-400 dark:border-[#4a7ac8] bg-blue-50 dark:bg-[#121c2b] after:content-[''] after:absolute after:inset-y-[4px] after:inset-x-2.5 after:rounded-sm after:bg-blue-300 dark:after:bg-[#325a96] shadow-[0_0_10px_rgba(59,130,246,0.3)] animate-pulse ";
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
        key={`${rowIndex}-${colIndex}-${item.word}`}
        className={`relative w-full ${isFlashing ? "z-50" : "z-10 hover:z-50"}`}
      >
        <div className={cellClasses}>
          {item.word}

          {isVisible && (
            <div
              className={`absolute left-1/2 -translate-x-1/2 ${
                rowIndex === 1
                  ? "top-full mt-2 before:bottom-full before:border-b-slate-800 dark:before:border-b-[#2a2a35]"
                  : "bottom-full mb-2 before:top-full before:border-t-slate-800 dark:before:border-t-[#2a2a35]"
              } ${isFlashing && !showAll ? "flex" : "hidden group-hover:flex"} flex-col bg-white dark:bg-[#2a2a35] text-black dark:text-[#e8e2d6] text-xs rounded-md shadow-xl py-2 px-3 z-60 w-max min-w-[120px] pointer-events-none before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 before:border-4 before:border-transparent`}
            >
              <span className="font-bold text-green-600 dark:text-[#7ec87e] mb-1 tracking-wide uppercase text-[0.65rem] border-b border-slate-200 dark:border-[#4a4a5a] pb-1">
                {item.type}
              </span>
              <span className="mt-0.5" style={{ fontFamily: "sans-serif" }}>
                {item.en}
              </span>
              <span className="mt-0.5" style={{ fontFamily: "sans-serif" }}>
                {item.hi}
              </span>
            </div>
          )}
        </div>
        {colIndex < 3 && (
          <div className="absolute top-1/2 -right-[1.15rem] -translate-y-1/2 text-slate-300 dark:text-slate-600 font-bold pointer-events-none text-sm z-0">
            →
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
        <h1 className="text-[1.4rem] tracking-[0.06em] z-10 text-slate-800 dark:text-[#c8c0b0] mb-0 text-center">
          Grammatik-Fälle
        </h1>
        <p className="text-[0.65rem] text-slate-600 z-10 dark:text-[#555560] tracking-[0.12em] uppercase mb-2 text-center">
          German Grammar Cases Memory Game
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
          / {ALL_PRONOUNS.length} guessed
        </p>

        <div className="h-1 bg-slate-200 dark:bg-[#2a2a35] rounded-sm w-full overflow-hidden my-0 mb-4 inline-block">
          <div
            className="h-full bg-linear-to-r from-green-500 to-green-400 dark:from-[#3d6b3d] dark:to-[#7ec87e] rounded-sm transition-all duration-400 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex-1 w-full max-w-[800px] flex flex-col items-center relative overflow-hidden pb-1">
        {guessed.size === ALL_PRONOUNS.length && (
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

        <div
          className={`flex flex-col z-10 w-full px-4 transition-opacity duration-700 ${guessed.size === ALL_PRONOUNS.length ? "opacity-30" : "opacity-100"}`}
        >
          <div className="grid grid-cols-4 gap-x-8 mb-[6px]">
            {HEADINGS.map(renderHeading)}
          </div>

          <div className="grid grid-cols-4 gap-x-8 gap-y-[6px]">
            {ALL_PRONOUNS.map((v, i) =>
              renderCell(v, i % 4, Math.floor(i / 4) + 1)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
