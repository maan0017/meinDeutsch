"use client";

import { useState, useRef, useCallback } from "react";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import Link from "next/link";
import MemoryGameControls from "@/components/MemoryGameControls";

type DativItem = {
  word: string;
  en: string;
  hi: string;
  type: string;
};

const DATIV_WORDS: DativItem[] = [
  { word: "ähneln", en: "to resemble", hi: "के समान होना", type: "Verb" },
  { word: "antworten", en: "to answer", hi: "जवाब देना", type: "Verb" },
  {
    word: "aus",
    en: "from (origin/material)",
    hi: "से (मूल/स्रोत)",
    type: "Preposition",
  },
  { word: "außer", en: "except for", hi: "के अलावा", type: "Preposition" },
  { word: "befehlen", en: "to command/order", hi: "आदेश देना", type: "Verb" },
  {
    word: "begegnen",
    en: "to meet/encounter",
    hi: "मिलना/सामना होना",
    type: "Verb",
  },
  { word: "bei", en: "at/with", hi: "के पास/साथ", type: "Preposition" },
  { word: "danken", en: "to thank", hi: "धन्यवाद देना", type: "Verb" },
  { word: "drohen", en: "to threaten", hi: "धमकाना", type: "Verb" },
  {
    word: "entgegen",
    en: "against/towards",
    hi: "के खिलाफ/की ओर",
    type: "Preposition",
  },
  { word: "erwidern", en: "to reply", hi: "उत्तर देना", type: "Verb" },
  {
    word: "es geht",
    en: "it goes / how are you",
    hi: "यह चलता है / कैसा चल रहा है",
    type: "Phrase",
  },
  {
    word: "fehlen",
    en: "to be missing/lacking",
    hi: "कमी होना/गायब होना",
    type: "Verb",
  },
  {
    word: "folgen",
    en: "to follow",
    hi: "अनुसरण करना/पीछा करना",
    type: "Verb",
  },
  { word: "gefallen", en: "to please/like", hi: "पसंद आना", type: "Verb" },
  { word: "gegenüber", en: "opposite", hi: "के सामने", type: "Preposition" },
  { word: "gehören", en: "to belong", hi: "का होना (अधिकार)", type: "Verb" },
  { word: "gehorchen", en: "to obey", hi: "आज्ञा मानना", type: "Verb" },
  { word: "gelingen", en: "to succeed", hi: "सफल होना", type: "Verb" },
  { word: "glauben", en: "to believe", hi: "विश्वास करना", type: "Verb" },
  { word: "gleichen", en: "to equal/resemble", hi: "समान होना", type: "Verb" },
  { word: "gratulieren", en: "to congratulate", hi: "बधाई देना", type: "Verb" },
  { word: "helfen", en: "to help", hi: "मदद करना", type: "Verb" },
  { word: "mit", en: "with", hi: "के साथ", type: "Preposition" },
  { word: "nach", en: "to/after", hi: "की ओर/के बाद", type: "Preposition" },
  { word: "nützen", en: "to be of use", hi: "उपयोगी होना", type: "Verb" },
  {
    word: "passen",
    en: "to fit/suit",
    hi: "सही बैठना/अनुकूल होना",
    type: "Verb",
  },
  { word: "passieren", en: "to happen", hi: "घटित होना", type: "Verb" },
  {
    word: "raten",
    en: "to advise/guess",
    hi: "सलाह देना/अनुमान लगाना",
    type: "Verb",
  },
  {
    word: "schaden",
    en: "to damage/harm",
    hi: "नुकसान पहुँचाना",
    type: "Verb",
  },
  { word: "schenken", en: "to gift", hi: "उपहार देना", type: "Verb" },
  { word: "schicken", en: "to send", hi: "भेजना", type: "Verb" },
  { word: "schmecken", en: "to taste", hi: "स्वाद आना", type: "Verb" },
  { word: "seit", en: "since/for", hi: "से (समय)", type: "Preposition" },
  { word: "senden", en: "to send", hi: "भेजना", type: "Verb" },
  { word: "telefonieren", en: "to telephone", hi: "फोन करना", type: "Verb" },
  { word: "trauen", en: "to trust/dare", hi: "भरोसा करना", type: "Verb" },
  { word: "vertrauen", en: "to trust", hi: "विश्वास करना", type: "Verb" },
  { word: "verzeihen", en: "to forgive", hi: "माफ करना", type: "Verb" },
  { word: "von", en: "from/by", hi: "से/द्वारा", type: "Preposition" },
  { word: "wehtun", en: "to hurt", hi: "दर्द होना", type: "Verb" },
  { word: "wünschen", en: "to wish", hi: "कामना करना", type: "Verb" },
  { word: "zu", en: "to", hi: "को/की ओर", type: "Preposition" },
  { word: "zuhören", en: "to listen to", hi: "ध्यान से सुनना", type: "Verb" },
  { word: "zustimmen", en: "to agree", hi: "सहमत होना", type: "Verb" },
];

const normalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");

export function DativVerbsMemoryGameComp() {
  const [guessed, setGuessed] = useState<Set<string>>(new Set());
  const [input, setInput] = useState("");
  const [shake, setShake] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { playSound } = useSoundEffects();

  const rows: DativItem[][] = [];
  for (let i = 0; i < DATIV_WORDS.length; i += 10)
    rows.push(DATIV_WORDS.slice(i, i + 10));

  const handleGuess = () => {
    const val = normalize(input);
    if (!val) return;
    const match = DATIV_WORDS.find((item) => normalize(item.word) === val);
    if (match && !guessed.has(match.word)) {
      setGuessed((prev) => new Set([...prev, match.word]));
      setFlash(match.word);
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

  const progress = Math.round((guessed.size / DATIV_WORDS.length) * 100);

  const toggleShow = useCallback(
    () => setShowAll(!showAll),
    [showAll, setShowAll]
  );

  const resetFunction = useCallback(() => {
    setGuessed(new Set());
    setInput("");
    setFlash(null);
    setShake(false);
    setShowAll(false);
    inputRef.current?.focus();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0e0e12] text-slate-900 dark:text-[#e8e2d6] py-8 px-4 flex flex-col items-center relative">
      <Link
        href="/juwelen"
        className="absolute top-4 left-4 p-1.5 md:p-2 rounded-full hover:bg-gray-200 dark:hover:bg-[#2a2a35] 
        text-slate-500 dark:text-[#B0B0B0] transition-colors inline-flex items-center justify-center z-50"
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
      <h1
        className={`text-[2rem] tracking-[0.06em] z-10 text-slate-800 dark:text-[#c8c0b0] mb-1 text-center`}
      >
        Dativ Wörter
      </h1>
      <p
        className={`text-[0.75rem] text-slate-600 z-10 dark:text-[#555560] tracking-[0.12em] uppercase mb-6 text-center`}
      >
        German Dative Word Memory Game
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
        placeholder="Type a dativ word…"
        containerClassName="mb-6"
      />

      <p className={`text-[0.8rem] text-slate-600 dark:text-[#555560] mb-1.5`}>
        <span className="text-green-600 dark:text-[#7ec87e]">
          {guessed.size}
        </span>{" "}
        / {DATIV_WORDS.length} guessed
      </p>

      <div className="h-1 bg-slate-200 dark:bg-[#2a2a35] rounded-sm w-full max-w-175 overflow-hidden my-2 mb-8">
        <div
          className="h-full bg-linear-to-r from-green-500 to-green-400 dark:from-[#3d6b3d] dark:to-[#7ec87e] rounded-sm transition-all duration-400 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="max-w-200 w-full pb-8 relative">
        {guessed.size === DATIV_WORDS.length && (
          <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className="bg-white/90 dark:bg-[#15151c]/90 p-8 rounded-2xl shadow-2xl backdrop-blur-sm animate-popIn border border-green-200 dark:border-green-800">
              <div className="text-[2rem] text-green-600 dark:text-[#7ec87e] tracking-[0.05em] text-center mb-2">
                ✦ Ausgezeichnet! ✦
              </div>
              <div className="text-slate-600 dark:text-[#9a9aa0] text-center tracking-widest">
                All words found.
              </div>
            </div>
          </div>
        )}

        {rows.map((row, ri) => (
          <div
            key={ri}
            className={`flex gap-2 flex-wrap justify-center mb-2 z-10 transition-opacity duration-700 ${guessed.size === DATIV_WORDS.length ? "opacity-30" : "opacity-100"}`}
          >
            {row.map((item) => {
              const isRevealed = guessed.has(item.word);
              const isVisible = isRevealed || showAll;
              const isFlashing = flash === item.word;

              let cellClasses = `group inline-flex items-center justify-center min-w-[100px] h-9 border rounded text-[0.85rem] tracking-[0.04em] transition-all duration-[400ms] ease-in-out px-2.5 relative cursor-default `;

              if (isVisible) {
                if (isRevealed) {
                  cellClasses +=
                    "bg-green-50 z-10 border-green-400 text-green-700 shadow-[0_0_12px_rgba(34,197,94,0.3)] dark:bg-[#1a2a1a] dark:border-[#3d6b3d] dark:text-[#7ec87e] dark:shadow-[0_0_12px_rgba(126,200,126,0.15)] ";
                } else {
                  // Shown via "Show All" but not guessed
                  cellClasses +=
                    "bg-slate-50 z-10 border-slate-400 text-slate-600 dark:bg-[#1a1a24] dark:border-[#4a4a5a] dark:text-[#9a9aa0] ";
                }
              } else {
                cellClasses +=
                  "text-transparent z-10 border-slate-300 dark:border-[#2a2a35] bg-white dark:bg-[#15151c] after:content-[''] after:absolute after:inset-y-[6px] after:inset-x-2.5 after:rounded-sm after:bg-slate-300 dark:after:bg-[#2a2a35]";
              }

              if (isFlashing) {
                cellClasses +=
                  " animate-popIn dark:bg-[#2a4a2a] bg-green-200 z-10 ";
              }

              return (
                <div key={item.word} className={cellClasses}>
                  {item.word}

                  {isVisible && (
                    <div
                      className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                    ${isFlashing && !showAll ? "flex" : "hidden group-hover:flex"} flex-col bg-white dark:bg-[#2a2a35] 
                    text-black dark:text-[#e8e2d6] text-xs rounded-md shadow-lg py-2 px-3 
                    z-60 w-max min-w-30 pointer-events-none before:content-[''] 
                    before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 
                    before:border-4 before:border-transparent before:border-t-slate-800 
                    dark:before:border-t-[#2a2a35]`}
                    >
                      <span className="font-bold text-green-300 dark:text-[#7ec87e] mb-1 tracking-wide uppercase text-[0.65rem] border-b border-slate-600 dark:border-[#3a3a4a] pb-1">
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
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
