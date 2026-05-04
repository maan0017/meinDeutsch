"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import Link from "next/link";

type AlphabetInfo = {
  german: string;
  englishSounds: string[];
  hindiSound: string;
  example: string;
};

const GERMAN_ALPHABETS: AlphabetInfo[] = [
  {
    german: "A a",
    englishSounds: ["ah", "aah"],
    hindiSound: "आ",
    example: "Apfel",
  },
  {
    german: "B b",
    englishSounds: ["bay", "bey"],
    hindiSound: "बे",
    example: "Buch",
  },
  {
    german: "C c",
    englishSounds: ["tsay", "tsey"],
    hindiSound: "त्से",
    example: "Computer",
  },
  {
    german: "D d",
    englishSounds: ["day", "dey"],
    hindiSound: "डे",
    example: "Danke",
  },
  { german: "E e", englishSounds: ["ay"], hindiSound: "ए", example: "Elefant" },
  {
    german: "F f",
    englishSounds: ["eff"],
    hindiSound: "ऍफ़",
    example: "Fisch",
  },
  {
    german: "G g",
    englishSounds: ["gay", "gey"],
    hindiSound: "गे",
    example: "Geld",
  },
  {
    german: "H h",
    englishSounds: ["hah", "haah"],
    hindiSound: "हा",
    example: "Haus",
  },
  { german: "I i", englishSounds: ["ee"], hindiSound: "ई", example: "Igel" },
  {
    german: "J j",
    englishSounds: ["yot"],
    hindiSound: "यॉट",
    example: "Jacke",
  },
  { german: "K k", englishSounds: ["kah"], hindiSound: "का", example: "Katze" },
  { german: "L l", englishSounds: ["ell"], hindiSound: "ऍल", example: "Lampe" },
  {
    german: "M m",
    englishSounds: ["em", "emm"],
    hindiSound: "ऍम",
    example: "Maus",
  },
  {
    german: "N n",
    englishSounds: ["en", "enn"],
    hindiSound: "ऍन",
    example: "Nase",
  },
  { german: "O o", englishSounds: ["oh"], hindiSound: "ओ", example: "Oma" },
  {
    german: "P p",
    englishSounds: ["pay", "pey"],
    hindiSound: "पे",
    example: "Papagei",
  },
  {
    german: "Q q",
    englishSounds: ["koo", "qu"],
    hindiSound: "कू",
    example: "Qualle",
  },
  {
    german: "R r",
    englishSounds: ["err", "air"],
    hindiSound: "ऍर",
    example: "Rot",
  },
  { german: "S s", englishSounds: ["ess"], hindiSound: "ऍस", example: "Sonne" },
  {
    german: "T t",
    englishSounds: ["tay", "tey"],
    hindiSound: "टे",
    example: "Tisch",
  },
  {
    german: "U u",
    englishSounds: ["oo", "ooh"],
    hindiSound: "ऊ",
    example: "Uhr",
  },
  {
    german: "V v",
    englishSounds: ["fow"],
    hindiSound: "फ़ाउ",
    example: "Vogel",
  },
  {
    german: "W w",
    englishSounds: ["vay"],
    hindiSound: "वे",
    example: "Wasser",
  },
  {
    german: "X x",
    englishSounds: ["ix", "iks"],
    hindiSound: "इक्स",
    example: "Xylofon",
  },
  {
    german: "Y y",
    englishSounds: ["ypsilon", "upsilon"],
    hindiSound: "इप्सिलॉन",
    example: "Yoga",
  },
  {
    german: "Z z",
    englishSounds: ["tset"],
    hindiSound: "त्सेट",
    example: "Zug",
  },
  { german: "Ä ä", englishSounds: ["eh"], hindiSound: "ऐ", example: "Äpfel" },
  {
    german: "Ö ö",
    englishSounds: ["er", "eu", "oe", "so"],
    hindiSound: "ओय / एर",
    example: "Öl",
  },
  {
    german: "Ü ü",
    englishSounds: ["ue", "ew", "euh"],
    hindiSound: "यू / ऊ",
    example: "Übung",
  },
  {
    german: "ß",
    englishSounds: ["eszett", "ess-tset", "ess tset", "sz", "es-tset"],
    hindiSound: "ऍस-त्सेट",
    example: "Groß",
  },
];

const normalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");

export default function PracticeGermanAlphabetsComponent() {
  const [currentWord, setCurrentWord] = useState<AlphabetInfo | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [seen, setSeen] = useState<Set<number>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null);
  const seenRef = useRef<Set<number>>(new Set());
  const { playSound, playKeyboardSound } = useSoundEffects();

  const pickNext = useCallback((forceReset = false) => {
    const seenSet = forceReset ? new Set<number>() : seenRef.current;
    let available: number[] = [];
    for (let i = 0; i < GERMAN_ALPHABETS.length; i++) {
      if (!seenSet.has(i)) available.push(i);
    }
    if (available.length === 0) {
      available = GERMAN_ALPHABETS.map((_, i) => i);
      seenRef.current = new Set();
    }
    const idx = available[Math.floor(Math.random() * available.length)];
    if (forceReset) {
      seenRef.current = new Set([idx]);
    } else {
      seenRef.current.add(idx);
    }
    setSeen(new Set(seenRef.current));
    setCurrentWord(GERMAN_ALPHABETS[idx]);
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
    const isCorrect = currentWord.englishSounds.some(
      (sound) => normalize(userAnswer) === normalize(sound)
    );
    setStatus(isCorrect ? "correct" : "wrong");
    playSound(isCorrect ? "correct" : "wrong");
    const isMobile = window.innerWidth < 768;
    setTimeout(() => pickNext(), isMobile ? 1500 : 3000);
  };

  const completed = Math.max(0, seen.size - 1 + (status !== "idle" ? 1 : 0));
  const progress = Math.round((completed / GERMAN_ALPHABETS.length) * 100);

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
              Der Buchstabe
            </h1>
            <p className="text-xs md:text-sm text-gray-500 dark:text-[#B0B0B0] font-medium mt-0.5 md:mt-1 flex items-center justify-center gap-2">
              <span>The Letter</span>
              <span>•</span>
              <span className="font-hindi text-base -mt-0.5">अक्षर</span>
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
              {/* German Letter */}
              <section className="text-center">
                <span className="inline-block rounded border border-gray-200 bg-gray-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:border-white/8 dark:bg-white/4 dark:text-white/35">
                  German Letter
                </span>
                <p className="mt-4 mb-2 text-6xl md:text-7xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
                  {currentWord.german}
                </p>
                <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 font-medium italic mt-2">
                  e.g. {currentWord.example}
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
                  Pronunciation
                </span>
                <div className="h-px flex-1 bg-linear-to-r from-transparent via-gray-200 to-transparent dark:via-white/10" />
              </div>

              <span className="flex flex-col items-center gap-0.5 md:gap-1 text-base md:text-xl font-bold">
                <span className="text-base md:text-xl leading-tight flex items-center gap-2">
                  <span>
                    &ldquo;{currentWord.englishSounds.join(" / ")}&rdquo;
                  </span>
                  <span className="text-gray-400 font-normal">/</span>
                  <span className="font-hindi text-gray-600 dark:text-gray-300 font-medium">
                    {currentWord.hindiSound}
                  </span>
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
                    placeholder="Type English sound (e.g. ah, bay)..."
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
                    aria-label="English sound input"
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
            {Math.max(0, GERMAN_ALPHABETS.length - completed)} letter
            {GERMAN_ALPHABETS.length - completed !== 1 ? "s" : ""} remaining
          </p>
          <p className="text-[10px] font-medium tracking-wide text-gray-400 dark:text-white/20">
            {progress}% completed
          </p>
        </div>
      </div>
    </main>
  );
}
