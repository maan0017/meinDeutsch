"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import Link from "next/link";
import MemoryGameControls from "@/components/MemoryGameControls";

type KonnectorItem = {
  word: string;
  en: string;
  hi: string;
  type: string;
  example?: string;
  isExtra?: boolean;
};

// ── Verb am Ende (Nebensatz) ──
const NEBENSATZ_KONNEKTORS: KonnectorItem[] = [
  { word: "dass", en: "that", hi: "कि", type: "Nebensatz", example: "Ich weiß, dass du kommst." },
  { word: "weil", en: "because", hi: "क्योंकि", type: "Nebensatz", example: "Ich esse, weil ich hungrig bin." },
  { word: "da", en: "since / because", hi: "चूंकि", type: "Nebensatz", example: "Da es regnet, bleibe ich hier." },
  { word: "wenn", en: "if / when", hi: "अगर / जब", type: "Nebensatz", example: "Wenn ich Zeit habe, lese ich." },
  { word: "obwohl", en: "although", hi: "हालांकि", type: "Nebensatz", example: "Er kam, obwohl er krank war." },
  { word: "als", en: "when (past)", hi: "जब (अतीत)", type: "Nebensatz", example: "Als ich Kind war, spielte ich oft." },
  { word: "seit", en: "since", hi: "जब से", type: "Nebensatz", example: "Seit er hier ist, geht es besser." },
  { word: "ob", en: "whether / if", hi: "क्या / यदि", type: "Nebensatz", example: "Ich weiß nicht, ob er kommt." },
  { word: "damit", en: "so that", hi: "ताकि", type: "Nebensatz", example: "Ich lerne, damit ich bestehe." },
];

// ── Verb auf Position 2 (Hauptsatz / Adverb) ──
const HAUPTSATZ_KONNEKTORS: KonnectorItem[] = [
  { word: "dann", en: "then", hi: "फिर", type: "Hauptsatz", example: "Erst essen wir, dann gehen wir." },
  { word: "deswegen", en: "therefore / that's why", hi: "इसलिए", type: "Hauptsatz", example: "Es regnet, deswegen bleibe ich hier." },
  { word: "deshalb", en: "therefore / that's why", hi: "इसलिए", type: "Hauptsatz", example: "Er ist krank, deshalb kommt er nicht." },
  { word: "daher", en: "therefore / hence", hi: "इसलिए", type: "Hauptsatz", example: "Ich habe kein Geld, daher bleibe ich zu Hause." },
  { word: "darum", en: "therefore / for that reason", hi: "इसलिए", type: "Hauptsatz", example: "Sie war müde, darum ging sie schlafen." },
  { word: "draußen", en: "outside", hi: "बाहर", type: "Hauptsatz", example: "Es ist kalt, draußen schneit es." },
  { word: "trotzdem", en: "nevertheless / still", hi: "फिर भी", type: "Hauptsatz", example: "Es regnet, trotzdem gehe ich spazieren." },
  { word: "sonst", en: "otherwise", hi: "वरना", type: "Hauptsatz", example: "Beeil dich, sonst verpassen wir den Zug." },
];

type CategoryKey = "nebensatz" | "hauptsatz";

const CATEGORIES: {
  key: CategoryKey;
  label: string;
  sublabel: string;
  items: KonnectorItem[];
  color: string;
  darkColor: string;
  borderColor: string;
  darkBorderColor: string;
  textColor: string;
  darkTextColor: string;
}[] = [
  {
    key: "nebensatz",
    label: "Verb am Ende",
    sublabel: "Subordinating (Nebensatz)",
    items: NEBENSATZ_KONNEKTORS,
    color: "bg-rose-50",
    darkColor: "dark:bg-[#2a1a1a]",
    borderColor: "border-rose-400",
    darkBorderColor: "dark:border-[#6b3d3d]",
    textColor: "text-rose-700",
    darkTextColor: "dark:text-[#e87e7e]",
  },
  {
    key: "hauptsatz",
    label: "Verb Position 2",
    sublabel: "Adverbial (Hauptsatz)",
    items: HAUPTSATZ_KONNEKTORS,
    color: "bg-sky-50",
    darkColor: "dark:bg-[#1a1a2a]",
    borderColor: "border-sky-400",
    darkBorderColor: "dark:border-[#3d3d6b]",
    textColor: "text-sky-700",
    darkTextColor: "dark:text-[#7e9ee8]",
  },
];

const SORTED_CATEGORIES = CATEGORIES.map((cat) => ({
  ...cat,
  items: [...cat.items],
}));

const STORAGE_KEY = "konnectors-memory-game-categories";

const normalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");

export default function KonnectorsMemoryGameComp() {
  const [guessed, setGuessed] = useState<Set<string>>(new Set());
  const [input, setInput] = useState("");
  const [shake, setShake] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [enabledCategories, setEnabledCategories] = useState<Set<CategoryKey>>(
    () => {
      if (typeof window === "undefined")
        return new Set(CATEGORIES.map((c) => c.key));
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved) as CategoryKey[];
          if (parsed.length > 0) return new Set(parsed);
        }
      } catch {}
      return new Set(CATEGORIES.map((c) => c.key));
    }
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const { playSound } = useSoundEffects();

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...enabledCategories]));
    } catch {}
  }, [enabledCategories]);

  const activeCats = SORTED_CATEGORIES.filter((c) =>
    enabledCategories.has(c.key)
  );
  const activeWords = activeCats.flatMap((cat) =>
    cat.items.map((item) => ({ ...item, uid: `${cat.key}-${item.word}` }))
  );

  const toggleCategory = (key: CategoryKey) => {
    setEnabledCategories((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        if (next.size <= 1) return prev;
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
    setGuessed(new Set());
    setInput("");
    setFlash(null);
    setShake(false);
    setShowAll(false);
    inputRef.current?.focus();
  };

  const handleGuess = () => {
    const val = normalize(input);
    if (!val || guessed.size >= activeWords.length) return;
    const expectedWord = activeWords[guessed.size];
    if (normalize(expectedWord.word) === val) {
      setGuessed((prev) => new Set([...prev, expectedWord.uid]));
      setFlash(expectedWord.uid);
      setTimeout(() => setFlash(null), 2500);
      playSound("correct");
      setInput("");
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      playSound("wrong");
    }
    inputRef.current?.focus();
  };

  const progress =
    activeWords.length > 0
      ? Math.round((guessed.size / activeWords.length) * 100)
      : 0;
  const toggleShow = useCallback(() => setShowAll(!showAll), [showAll]);
  const resetFunction = useCallback(() => {
    setGuessed(new Set());
    setInput("");
    setFlash(null);
    setShake(false);
    setShowAll(false);
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!shake) inputRef.current?.focus();
  }, [shake, guessed]);

  const allDone = activeWords.length > 0 && guessed.size === activeWords.length;

  let runningIdx = 0;
  const categoryOffsets = activeCats.map((cat) => {
    const start = runningIdx;
    runningIdx += cat.items.length;
    return { ...cat, startIdx: start };
  });

  const renderItem = (
    item: KonnectorItem,
    itemIdx: number,
    cat: (typeof categoryOffsets)[0]
  ) => {
    const uid = `${cat.key}-${item.word}`;
    const seqIdx = cat.startIdx + itemIdx;
    const isRevealed = guessed.has(uid);
    const isVisible = isRevealed || showAll;
    const isFlashing = flash === uid;
    const isExpected = seqIdx === guessed.size && !showAll;

    let c = `group inline-flex items-center justify-center min-w-[90px] h-[30px] border rounded text-[0.8rem] tracking-[0.04em] transition-all duration-[400ms] ease-in-out px-2 relative cursor-default `;
    if (isVisible) {
      c += isRevealed
        ? "bg-green-50 z-10 border-green-400 text-green-700 shadow-[0_0_12px_rgba(34,197,94,0.3)] dark:bg-[#1a2a1a] dark:border-[#3d6b3d] dark:text-[#7ec87e] dark:shadow-[0_0_12px_rgba(126,200,126,0.15)] "
        : "bg-slate-50 z-10 border-slate-300 text-slate-600 dark:bg-[#15151c] dark:border-[#3a3a4a] dark:text-[#9a9aa0] ";
    } else {
      c += isExpected
        ? "text-blue-500 font-bold z-10 border-blue-400 dark:border-[#4a7ac8] bg-blue-50 dark:bg-[#121c2b] shadow-[0_0_10px_rgba(59,130,246,0.3)] animate-pulse "
        : "text-slate-400 font-bold z-10 border-slate-200 dark:border-[#2a2a35] bg-white dark:bg-[#0e0e12] ";
    }
    if (isFlashing) c += " animate-popIn dark:bg-[#2a4a2a] bg-green-200 z-20 ";

    return (
      <div
        key={uid}
        className={`relative ${isFlashing ? "z-50" : "z-10 hover:z-50"}`}
      >
        <div className={c}>
          {isVisible
            ? item.word
            : `${item.word.charAt(0)}${" _".repeat(item.word.length - 1)}`}
          {isVisible && (
            <div
              className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 ${isFlashing && !showAll ? "flex" : "hidden group-hover:flex"} flex-col bg-white dark:bg-[#2a2a35] text-black dark:text-[#e8e2d6] text-xs rounded-md shadow-lg py-2 px-3 z-60 w-max min-w-30 max-w-60 pointer-events-none before:content-[''] before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-slate-800 dark:before:border-t-[#2a2a35]`}
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
              {item.example && (
                <span className="mt-1.5 pt-1 border-t border-slate-200 dark:border-[#4a4a5a] text-[0.65rem] italic text-slate-500 dark:text-[#777780]">
                  {item.example}
                </span>
              )}
            </div>
          )}
        </div>
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

      <div className="flex-none flex flex-col items-center w-full max-w-[1100px]">
        <h1 className="text-[1.4rem] tracking-[0.06em] z-10 text-slate-800 dark:text-[#c8c0b0] mb-0 text-center">
          Konnektoren
        </h1>
        <p className="text-[0.65rem] text-slate-600 z-10 dark:text-[#555560] tracking-[0.12em] uppercase mb-1.5 text-center">
          German Connectors Memory Game
        </p>

        {/* Category toggles */}
        <div className="flex gap-2 mb-2 flex-wrap justify-center z-10">
          {SORTED_CATEGORIES.map((cat) => {
            const isOn = enabledCategories.has(cat.key);
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => toggleCategory(cat.key)}
                className={`px-2.5 py-1 rounded-md text-[0.75rem] font-medium transition-all duration-200 border cursor-pointer ${
                  isOn
                    ? `${cat.color} ${cat.darkColor} ${cat.borderColor} ${cat.darkBorderColor} ${cat.textColor} ${cat.darkTextColor}`
                    : "bg-white border-slate-300 text-slate-500 hover:bg-slate-50 dark:bg-[#15151c] dark:border-[#3a3a4a] dark:text-[#8a8a90] dark:hover:bg-[#1e1e28]"
                }`}
              >
                {cat.label} ({cat.items.length})
              </button>
            );
          })}
        </div>

        <MemoryGameControls
          input={input}
          setInput={setInput}
          handleGuess={handleGuess}
          resetFunction={resetFunction}
          showAll={showAll}
          toggleShow={toggleShow}
          shake={shake}
          inputRef={inputRef}
          placeholder="Type the next konnektor…"
        />

        <p className="text-[0.75rem] text-slate-600 dark:text-[#555560] mb-1">
          <span className="text-green-600 dark:text-[#7ec87e]">
            {guessed.size}
          </span>{" "}
          / {activeWords.length} guessed
        </p>
        <div className="h-1 bg-slate-200 dark:bg-[#2a2a35] rounded-sm w-full overflow-hidden my-0 mb-3 inline-block">
          <div
            className="h-full bg-linear-to-r from-green-500 to-green-400 dark:from-[#3d6b3d] dark:to-[#7ec87e] rounded-sm transition-all duration-400 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex-1 w-full max-w-[1100px] flex flex-col items-center relative pb-1">
        {allDone && (
          <div className="absolute top-10 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
            <div className="bg-white/95 dark:bg-[#15151c]/95 p-6 rounded-xl shadow-2xl backdrop-blur-md animate-popIn border border-green-200 dark:border-green-800">
              <div className="text-[1.8rem] text-green-600 dark:text-[#7ec87e] tracking-wider text-center mb-1">
                ✦ Ausgezeichnet! ✦
              </div>
              <div className="text-slate-600 dark:text-[#9a9aa0] text-center tracking-widest text-[0.9rem]">
                All konnektors found.
              </div>
            </div>
          </div>
        )}

        <div
          className={`flex flex-col z-10 w-full gap-4 transition-opacity duration-700 ${allDone ? "opacity-30" : "opacity-100"}`}
        >
          {categoryOffsets.map((cat) => (
            <div key={cat.key}>
              <div className="flex items-center gap-2 mb-1.5 px-1">
                <div
                  className={`w-2.5 h-2.5 rounded-full ${cat.color} ${cat.darkColor} border ${cat.borderColor} ${cat.darkBorderColor}`}
                />
                <span
                  className={`text-[0.8rem] font-semibold tracking-wide ${cat.textColor} ${cat.darkTextColor}`}
                >
                  {cat.label}
                </span>
                <span className="text-[0.65rem] text-slate-400 dark:text-[#555560] tracking-wider uppercase">
                  — {cat.sublabel}
                </span>
              </div>
              <div className="flex flex-col gap-2 w-full items-center">
                <div className="flex gap-1.5 flex-wrap justify-center w-full">
                  {cat.items.map((item, itemIdx) => {
                    if (item.isExtra) return null;
                    return renderItem(item, itemIdx, cat);
                  })}
                </div>
                {cat.items.some((item) => item.isExtra) && (
                  <div className="flex gap-1.5 flex-wrap justify-center w-full">
                    {cat.items.map((item, itemIdx) => {
                      if (!item.isExtra) return null;
                      return renderItem(item, itemIdx, cat);
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
