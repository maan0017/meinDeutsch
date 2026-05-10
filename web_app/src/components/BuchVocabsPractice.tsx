"use client";

import { useState, useEffect, useRef, useCallback, FormEvent } from "react";
import Link from "next/link";
import { buchVocabs, BuchVocabWord } from "@/data/buchVocabs";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { useGoBack } from "@/hooks/useGoBack";

// ── Types ──
interface HistoryEntry {
  word: BuchVocabWord;
  userAnswer: string;
  isCorrect: boolean;
  timestamp: number;
}

interface SessionHistory {
  level: string;
  chapter: number;
  entries: HistoryEntry[];
}

// ── LocalStorage keys ──
const LS_LEVEL = "buch_vocabs_level";
const LS_CHAPTER = "buch_vocabs_chapter";
const LS_HISTORY = "buch_vocabs_history";

export default function BuchVocabsPractice() {
  useGoBack();
  const { playSound } = useSoundEffects();
  const inputRef = useRef<HTMLInputElement>(null);

  // ── Selection state (persisted) ──
  const [selectedLevel, setSelectedLevel] = useState("A1");
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [initialized, setInitialized] = useState(false);

  // ── Quiz state ──
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [seenIndices, setSeenIndices] = useState<Set<number>>(new Set());

  // ── History state ──
  const [history, setHistory] = useState<SessionHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // ── Derived data ──
  const levelData = buchVocabs.find((l) => l.level === selectedLevel);
  const availableChapters = levelData?.chapters ?? [];
  const chapterData = levelData?.chapters.find(
    (c) => c.chapter === selectedChapter
  );
  const words = chapterData?.words ?? [];
  const currentWord = words[currentWordIdx] ?? null;

  // ── Load saved state ──
  useEffect(() => {
    const sl = localStorage.getItem(LS_LEVEL);
    const sc = localStorage.getItem(LS_CHAPTER);
    const sh = localStorage.getItem(LS_HISTORY);
    if (sl) setSelectedLevel(sl);
    if (sc) setSelectedChapter(Number(sc));
    if (sh) {
      try {
        setHistory(JSON.parse(sh));
      } catch {
        /* ignore */
      }
    }
    setInitialized(true);
  }, []);

  // ── Persist ──
  useEffect(() => {
    if (!initialized) return;
    localStorage.setItem(LS_LEVEL, selectedLevel);
  }, [selectedLevel, initialized]);

  useEffect(() => {
    if (!initialized) return;
    localStorage.setItem(LS_CHAPTER, String(selectedChapter));
  }, [selectedChapter, initialized]);

  useEffect(() => {
    if (!initialized) return;
    localStorage.setItem(LS_HISTORY, JSON.stringify(history));
  }, [history, initialized]);

  // ── Pick next unseen word ──
  const pickNextWord = useCallback(
    (seen: Set<number>) => {
      if (words.length === 0) return;
      const available = words
        .map((_, i) => i)
        .filter((i) => !seen.has(i));
      if (available.length === 0) {
        setSeenIndices(new Set());
        setCurrentWordIdx(Math.floor(Math.random() * words.length));
        return;
      }
      setCurrentWordIdx(
        available[Math.floor(Math.random() * available.length)]
      );
    },
    [words]
  );

  // ── Reset when level/chapter changes ──
  useEffect(() => {
    if (!initialized) return;
    if (
      availableChapters.length > 0 &&
      !availableChapters.find((c) => c.chapter === selectedChapter)
    ) {
      setSelectedChapter(availableChapters[0].chapter);
      return;
    }
    setSeenIndices(new Set());
    setUserAnswer("");
    setStatus("idle");
    pickNextWord(new Set());
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [selectedLevel, selectedChapter, initialized]);

  // ── Submit answer ──
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!currentWord || status !== "idle" || !userAnswer.trim()) return;

    const answer = userAnswer.trim().toLowerCase();
    const correct = currentWord.german.toLowerCase();
    const isCorrect = answer === correct;

    setStatus(isCorrect ? "correct" : "wrong");
    playSound(isCorrect ? "correct" : "wrong");

    const entry: HistoryEntry = {
      word: currentWord,
      userAnswer: userAnswer.trim(),
      isCorrect,
      timestamp: Date.now(),
    };

    setHistory((prev) => {
      const existing = prev.find(
        (h) => h.level === selectedLevel && h.chapter === selectedChapter
      );
      if (existing) {
        return prev.map((h) =>
          h.level === selectedLevel && h.chapter === selectedChapter
            ? { ...h, entries: [entry, ...h.entries] }
            : h
        );
      }
      return [
        ...prev,
        { level: selectedLevel, chapter: selectedChapter, entries: [entry] },
      ];
    });

    setTimeout(() => {
      const newSeen = new Set(seenIndices);
      newSeen.add(currentWordIdx);
      setSeenIndices(newSeen);
      pickNextWord(newSeen);
      setUserAnswer("");
      setStatus("idle");
      setTimeout(() => inputRef.current?.focus(), 50);
    }, 1500);
  };

  // ── History stats ──
  const currentHistory = history.find(
    (h) => h.level === selectedLevel && h.chapter === selectedChapter
  );
  const totalAttempts = currentHistory?.entries.length ?? 0;
  const correctCount =
    currentHistory?.entries.filter((e) => e.isCorrect).length ?? 0;

  // ── Status config (matches existing quiz games) ──
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

  const remainingWords = Math.max(0, words.length - seenIndices.size);
  const progressPercent =
    words.length > 0
      ? Math.round((seenIndices.size / words.length) * 100)
      : 0;

  if (!initialized) return null;

  return (
    <main className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden px-4 bg-gray-50 dark:bg-[#121212]">
      <div className="relative flex w-full max-w-xl flex-col gap-3 z-10">
        {/* Header */}
        <header className="relative text-center space-y-1">
          <div className="absolute left-0 top-1/2 -translate-y-1/2">
            <Link
              href="/juwelen"
              className="p-1.5 md:p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#444444] text-gray-500 dark:text-[#B0B0B0] transition-colors inline-flex items-center justify-center"
              title="Back to Quiz Menu"
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
              <span className="hidden md:inline text-sm font-semibold">
                Back to menu
              </span>
            </Link>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-[#E0E0E0]">
            Buchwortschatz
          </h1>
          <p className="text-xs md:text-sm text-gray-500 dark:text-[#B0B0B0] font-medium">
            Type the German translation
          </p>
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
            {/* Level + Chapter Controls */}
            <div className="flex flex-col items-center gap-3">
              {/* Level selector */}
              <div className="flex items-center gap-1.5">
                {buchVocabs.map((l) => (
                  <button
                    key={l.level}
                    onClick={() => setSelectedLevel(l.level)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all duration-150 ${
                      selectedLevel === l.level
                        ? "bg-sky-500 text-white shadow-sm"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-white/5 dark:text-white/40 dark:hover:bg-white/10"
                    }`}
                  >
                    {l.level}
                  </button>
                ))}
              </div>

              {/* Chapter selector */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    const idx = availableChapters.findIndex(
                      (c) => c.chapter === selectedChapter
                    );
                    if (idx > 0)
                      setSelectedChapter(availableChapters[idx - 1].chapter);
                  }}
                  disabled={
                    availableChapters.findIndex(
                      (c) => c.chapter === selectedChapter
                    ) <= 0
                  }
                  className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 dark:text-white/30 disabled:opacity-30 transition-colors"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>
                <span className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-white/5 text-xs font-bold text-gray-600 dark:text-white/50 min-w-[100px] text-center">
                  Kapitel {selectedChapter}
                  {chapterData?.title && (
                    <span className="font-normal text-gray-400 dark:text-white/25 ml-1">
                      · {chapterData.title}
                    </span>
                  )}
                </span>
                <button
                  onClick={() => {
                    const idx = availableChapters.findIndex(
                      (c) => c.chapter === selectedChapter
                    );
                    if (idx < availableChapters.length - 1)
                      setSelectedChapter(availableChapters[idx + 1].chapter);
                  }}
                  disabled={
                    availableChapters.findIndex(
                      (c) => c.chapter === selectedChapter
                    ) >=
                    availableChapters.length - 1
                  }
                  className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 dark:text-white/30 disabled:opacity-30 transition-colors"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </div>

              {/* Stats row */}
              <div className="flex items-center gap-3 text-[10px] font-medium text-gray-400 dark:text-white/25">
                <span className="font-mono">
                  <span className="text-emerald-500">{correctCount}✓</span>
                  <span className="mx-1">/</span>
                  <span className="text-red-400">
                    {totalAttempts - correctCount}✗
                  </span>
                </span>
                <span className="w-px h-3 bg-gray-200 dark:bg-white/10" />
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className={`uppercase tracking-widest transition-colors ${
                    showHistory
                      ? "text-sky-500"
                      : "hover:text-gray-600 dark:hover:text-white/50"
                  }`}
                >
                  History
                </button>
              </div>
            </div>

            {/* Clues */}
            {currentWord && (
              <div className="mt-4 grid gap-4">
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
                  <p className="mt-2 text-xl font-medium leading-snug text-gray-600 dark:text-white/65 md:text-2xl">
                    {currentWord.hindi}
                  </p>
                </section>
              </div>
            )}

            {/* Feedback */}
            {currentWord && (
              <div
                className={`my-4 text-center transition-all duration-300 transform ${
                  status !== "idle"
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2 h-0 overflow-hidden"
                }`}
              >
                <div className="w-full flex items-center gap-3 mb-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-white/10" />
                  <span className="inline-block rounded border border-gray-200 bg-gray-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:border-white/8 dark:bg-white/4 dark:text-white/35">
                    German Word
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-white/10" />
                </div>
                <p
                  className={`text-base md:text-xl font-bold ${
                    status === "correct"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-red-500 dark:text-red-400"
                  }`}
                >
                  {status === "correct" ? "✓ Richtig!" : "✗ Falsch"}
                </p>
                <p className="text-base md:text-xl font-bold text-gray-800 dark:text-white mt-1">
                  &ldquo;
                  {currentWord.article ? `${currentWord.article} ` : ""}
                  {currentWord.german}&rdquo;
                </p>
                <p className="text-xs text-gray-400 dark:text-white/35 mt-0.5">
                  ({currentWord.pronunciation})
                </p>
              </div>
            )}

            {/* Input */}
            <div className="mt-3">
              <form onSubmit={handleSubmit} className="relative w-full space-y-2 md:space-y-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Type German word..."
                  disabled={status !== "idle"}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  className={`w-full px-3 py-2 md:px-4 md:py-3 rounded-lg md:rounded-xl border-2 shadow-sm text-center text-sm md:text-lg font-medium placeholder:text-gray-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 ${cs.input}`}
                  aria-label="German word input"
                />
                <button
                  type="submit"
                  disabled={!userAnswer.trim() || status !== "idle"}
                  className={`w-full px-4 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl font-semibold text-sm md:text-lg transition-all duration-200 flex items-center justify-center gap-1 md:gap-2 ${
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
            {remainingWords} word{remainingWords !== 1 ? "s" : ""} remaining
          </p>
          <p className="text-[10px] font-medium tracking-wide text-gray-400 dark:text-white/20">
            {progressPercent}% completed
          </p>
        </div>

        {/* History panel (collapsible below card) */}
        {showHistory && (
          <div className="rounded-2xl border border-gray-200 dark:border-white/[0.07] bg-white dark:bg-[#121212] shadow-lg overflow-hidden">
            <div className="p-4 space-y-3 max-h-60 overflow-y-auto">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-white/35">
                  Verlauf — {selectedLevel} Kap. {selectedChapter}
                </h3>
                {currentHistory && currentHistory.entries.length > 0 && (
                  <button
                    onClick={() =>
                      setHistory((prev) =>
                        prev.map((h) =>
                          h.level === selectedLevel &&
                          h.chapter === selectedChapter
                            ? { ...h, entries: [] }
                            : h
                        )
                      )
                    }
                    className="text-[10px] font-bold uppercase tracking-wider text-red-400 hover:text-red-600 transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>

              {!currentHistory || currentHistory.entries.length === 0 ? (
                <p className="text-xs text-gray-400 dark:text-white/25 text-center py-4">
                  No attempts yet — start typing!
                </p>
              ) : (
                <div className="space-y-1.5">
                  {currentHistory.entries.map((entry, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-2 px-2.5 py-1.5 rounded-lg text-xs ${
                        entry.isCorrect
                          ? "bg-emerald-50/50 dark:bg-emerald-950/15"
                          : "bg-red-50/50 dark:bg-red-950/15"
                      }`}
                    >
                      <span className="mt-0.5 text-sm leading-none">
                        {entry.isCorrect ? "✅" : "❌"}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-bold text-gray-800 dark:text-white/80">
                            {entry.word.article
                              ? `${entry.word.article} `
                              : ""}
                            {entry.word.german}
                          </span>
                          <span className="text-gray-300 dark:text-white/15">
                            →
                          </span>
                          <span className="text-gray-500 dark:text-white/45">
                            {entry.word.english}
                          </span>
                        </div>
                        {!entry.isCorrect && (
                          <p className="text-red-500 dark:text-red-400 mt-0.5">
                            You typed: &quot;{entry.userAnswer}&quot;
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
