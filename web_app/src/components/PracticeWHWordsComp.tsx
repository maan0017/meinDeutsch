"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import Link from "next/link";

type WHWord = {
  english: string;
  hindi: string;
  german: string;
  example: string;
};

const WH_WORDS: WHWord[] = [
  { english: "What", hindi: "क्या", german: "Was", example: "Was machst du?" },
  { english: "Who", hindi: "कौन", german: "Wer", example: "Wer ist das?" },
  {
    english: "Whom (Akk.)",
    hindi: "किसे / किसको",
    german: "Wen",
    example: "Wen siehst du?",
  },
  {
    english: "Whom (Dat.)",
    hindi: "किसको / किसके लिए",
    german: "Wem",
    example: "Wem gibst du das Buch?",
  },
  {
    english: "Whose",
    hindi: "किसका",
    german: "Wessen",
    example: "Wessen Buch ist das?",
  },
  {
    english: "Which (der)",
    hindi: "कौन सा (der)",
    german: "Welcher",
    example: "Welcher Film gefällt dir?",
  },
  {
    english: "Which (die)",
    hindi: "कौन सी (die)",
    german: "Welche",
    example: "Welche Farbe magst du?",
  },
  {
    english: "Which (das)",
    hindi: "कौन सा (das)",
    german: "Welches",
    example: "Welches Buch liest du?",
  },
  { english: "When", hindi: "कब", german: "Wann", example: "Wann kommst du?" },
  { english: "Where", hindi: "कहाँ", german: "Wo", example: "Wo wohnst du?" },
  {
    english: "Where to",
    hindi: "कहाँ (दिशा)",
    german: "Wohin",
    example: "Wohin gehst du?",
  },
  {
    english: "Where from",
    hindi: "कहाँ से",
    german: "Woher",
    example: "Woher kommst du?",
  },
  {
    english: "Why",
    hindi: "क्यों",
    german: "Warum",
    example: "Warum lernst du Deutsch?",
  },
  {
    english: "How",
    hindi: "कैसे / कैसा",
    german: "Wie",
    example: "Wie geht es dir?",
  },
  {
    english: "How many",
    hindi: "कितने",
    german: "Wie viele",
    example: "Wie viele Geschwister hast du?",
  },
  {
    english: "How much",
    hindi: "कितना",
    german: "Wie viel",
    example: "Wie viel kostet das?",
  },
  {
    english: "How long (duration)",
    hindi: "कब से / कितने समय से",
    german: "Wie lange",
    example: "Wie lange bleibst du hier?",
  },
  {
    english: "How long (length)",
    hindi: "कितना लंबा",
    german: "Wie lang",
    example: "Wie lang ist die Brücke?",
  },
  {
    english: "How often",
    hindi: "कितनी बार",
    german: "Wie oft",
    example: "Wie oft gehst du ins Kino?",
  },
  {
    english: "How far",
    hindi: "कितनी दूर",
    german: "Wie weit",
    example: "Wie weit ist der Bahnhof?",
  },
  {
    english: "How old",
    hindi: "कितने साल का",
    german: "Wie alt",
    example: "Wie alt bist du?",
  },
  {
    english: "What time",
    hindi: "कितने बजे",
    german: "Um wie viel Uhr",
    example: "Um wie viel Uhr fängt der Film an?",
  },
  {
    english: "What kind of",
    hindi: "किस तरह का",
    german: "Was für ein",
    example: "Was für ein Auto hast du?",
  },
  {
    english: "Since when",
    hindi: "कब से",
    german: "Seit wann",
    example: "Seit wann lernst du Deutsch?",
  },
  {
    english: "Until when",
    hindi: "कब तक",
    german: "Bis wann",
    example: "Bis wann bist du hier?",
  },
  {
    english: "For what reason",
    hindi: "किसलिए",
    german: "Wofür",
    example: "Wofür brauchst du das?",
  },
  {
    english: "About what",
    hindi: "किसके बारे में",
    german: "Worüber",
    example: "Worüber sprecht ihr?",
  },
  {
    english: "For what / On what",
    hindi: "किस पर",
    german: "Worauf",
    example: "Worauf wartest du?",
  },
  {
    english: "With what",
    hindi: "किससे / किसके साथ",
    german: "Womit",
    example: "Womit fährst du zur Arbeit?",
  },
  {
    english: "From what",
    hindi: "किससे (चीज़)",
    german: "Wovon",
    example: "Wovon träumst du?",
  },
];

const normalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");

export default function PracticeWHWordsComponent() {
  const [currentWord, setCurrentWord] = useState<WHWord | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [seen, setSeen] = useState<Set<number>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null);
  const seenRef = useRef<Set<number>>(new Set());
  const { playSound, playKeyboardSound } = useSoundEffects();

  const pickNext = useCallback((forceReset = false) => {
    const seenSet = forceReset ? new Set<number>() : seenRef.current;
    let available: number[] = [];
    for (let i = 0; i < WH_WORDS.length; i++) {
      if (!seenSet.has(i)) available.push(i);
    }
    if (available.length === 0) {
      available = WH_WORDS.map((_, i) => i);
      seenRef.current = new Set();
    }
    const idx = available[Math.floor(Math.random() * available.length)];
    if (forceReset) {
      seenRef.current = new Set([idx]);
    } else {
      seenRef.current.add(idx);
    }
    setSeen(new Set(seenRef.current));
    setCurrentWord(WH_WORDS[idx]);
    setUserAnswer("");
    setStatus("idle");
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  useEffect(() => {
    pickNext(true);
  }, [pickNext]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentWord || status !== "idle") return;
    const isCorrect = normalize(userAnswer) === normalize(currentWord.german);
    setStatus(isCorrect ? "correct" : "wrong");
    playSound(isCorrect ? "correct" : "wrong");
    const isMobile = window.innerWidth < 768;
    setTimeout(() => pickNext(), isMobile ? 1500 : 3000);
  };

  const completed = Math.max(0, seen.size - 1 + (status !== "idle" ? 1 : 0));
  const progress = Math.round((completed / WH_WORDS.length) * 100);

  const statusConfig = {
    correct: {
      card: "border-emerald-500/50 shadow-emerald-500/10 shadow-xl",
      input:
        "border-emerald-500 focus:border-emerald-500 text-emerald-700 bg-emerald-50 focus:ring-emerald-100 dark:text-emerald-300 dark:bg-emerald-950/30 dark:focus:ring-emerald-900",
    },
    wrong: {
      card: "border-red-500/50 shadow-red-500/10 shadow-xl",
      input:
        "border-red-500 focus:border-red-500 text-red-700 bg-red-50 focus:ring-red-100 dark:text-red-300 dark:bg-red-950/30 dark:focus:ring-red-900",
    },
    idle: {
      card: "shadow-xl border-gray-200 shadow-gray-100/80 dark:border-white/[0.07] dark:shadow-black/50",
      input:
        "focus:border-sky-500 border-gray-300 text-gray-800 bg-white hover:border-gray-400 focus:ring-sky-100 dark:border-white/10 dark:text-white dark:bg-white/5 dark:hover:border-white/20 dark:focus:ring-sky-950",
    },
  } as const;

  const cs = statusConfig[status];
  if (!currentWord) return null;

  return (
    <main className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden px-4 bg-gray-50 dark:bg-[#121212]">
      <div className="relative flex w-full max-w-xl flex-col gap-3 z-10">
        {/* Header */}
        <header className="flex items-center justify-between w-full mb-2 md:mb-4 relative">
          <div className="shrink-0">
            <Link
              href="/juwelen"
              className="p-1.5 md:p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#444444] text-gray-500 dark:text-[#B0B0B0] transition-colors inline-flex items-center justify-center"
              title="Back to Quiz Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </Link>
          </div>
          <div className="flex-1 text-center px-2 md:px-4">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-[#E0E0E0]">
              W-Fragen
            </h1>
            <p className="text-xs md:text-sm text-gray-500 dark:text-[#B0B0B0] font-medium mt-0.5 md:mt-1">
              Translate the question word into German
            </p>
          </div>
        </header>

        {/* Main card */}
        <article
          className={[
            "relative overflow-hidden rounded-2xl border transition-all duration-300 ease-out",
            "bg-white dark:bg-[#121212]",
            cs.card,
          ].join(" ")}
        >
          <div className="p-4 md:p-6">
            {/* Clues */}
            <div className="grid gap-4">
              {/* English */}
              <section className="text-center">
                <span className="inline-block rounded border border-gray-200 bg-gray-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:border-white/8 dark:bg-white/4 dark:text-white/35">
                  English
                </span>
                <p className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-white md:text-4xl">
                  {currentWord.english}
                </p>
              </section>

              {/* Hindi */}
              <section className="text-center">
                <span className="inline-block rounded border border-gray-200 bg-gray-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:border-white/8 dark:bg-white/4 dark:text-white/35">
                  Hindi
                </span>
                <p className="mt-2 text-xl font-medium leading-snug text-gray-600 font-hindi dark:text-white/65 md:text-2xl">
                  {currentWord.hindi}
                </p>
              </section>
            </div>

            {/* Feedback */}
            <div
              className={`my-4 text-xs md:text-sm font-semibold transition-all duration-300 transform flex flex-col items-center gap-2
              ${status !== "idle" ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 h-0 overflow-hidden"}
              ${status === "correct" ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}
            >
              <div className="w-full flex items-center gap-3 mt-2">
                <div className="h-px flex-1 bg-linear-to-r from-transparent via-gray-200 to-transparent dark:via-white/10" />
                <span className="inline-block rounded border border-gray-200 bg-gray-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:border-white/8 dark:bg-white/4 dark:text-white/35">
                  German
                </span>
                <div className="h-px flex-1 bg-linear-to-r from-transparent via-gray-200 to-transparent dark:via-white/10" />
              </div>

              <span className="flex flex-col items-center gap-0.5 md:gap-1 text-base md:text-xl font-bold">
                <span className="text-base md:text-xl leading-tight">
                  &ldquo;{currentWord.german}&rdquo;
                </span>

                {status === "correct" && (
                  <span className="text-sm md:text-lg text-blue-600 font-medium">
                    ✓ Correct
                  </span>
                )}
              </span>
            </div>

            {/* Input */}
            <div className="mt-3">
              <form
                onSubmit={handleSubmit}
                className="relative w-full mx-auto space-y-2 md:space-y-3"
              >
                <div className="relative flex items-center">
                  <input
                    ref={inputRef}
                    type="text"
                    value={userAnswer}
                    onKeyDown={(e) => playKeyboardSound(e.key)}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Type German W-word..."
                    disabled={status !== "idle"}
                    className={`w-full px-3 py-2 pr-10 md:px-4 md:py-3 ${status === "idle" ? "bg-white dark:bg-zinc-950" : ""}
                      rounded-lg md:rounded-xl border-2 shadow-sm text-center text-sm md:text-lg font-medium
                      placeholder:text-gray-400 dark:placeholder:text-zinc-500
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                      disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200
                      ${cs.input}`}
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    aria-label="German word input"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!userAnswer.trim() || status !== "idle"}
                  className={`w-full px-4 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl font-semibold text-sm md:text-lg
                    transition-all duration-200 flex items-center justify-center gap-1 md:gap-2
                    ${
                      !userAnswer.trim() || status !== "idle"
                        ? "bg-gray-200 dark:bg-zinc-800 text-gray-400 dark:text-zinc-600 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white shadow-md hover:shadow-lg"
                    }`}
                >
                  <span>Submit Answer</span>
                  <span className="hidden md:inline-flex items-center px-2 py-0.5 text-xs bg-transparent text-gray-700 border border-gray-300 dark:text-gray-300 dark:border-gray-600 rounded">
                    ENTER
                  </span>
                </button>
              </form>
            </div>
          </div>
        </article>

        {/* Footer stats */}
        <div className="flex items-center justify-between px-0.5">
          <p className="text-[10px] font-medium tracking-wide text-gray-400 dark:text-white/20">
            {Math.max(0, WH_WORDS.length - completed)} word
            {WH_WORDS.length - completed !== 1 ? "s" : ""} remaining
          </p>
          <p className="text-[10px] font-medium tracking-wide text-gray-400 dark:text-white/20">
            {progress}% completed
          </p>
        </div>
      </div>
    </main>
  );
}
