"use client";

import { useState, useEffect, useRef, useCallback, FormEvent } from "react";
import Link from "next/link";
import { buchVocabs, BuchVocabWord } from "@/data/buchVocabs";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { useGoBack } from "@/hooks/useGoBack";
import { useGermanSpeechToText } from "@/hooks/useGermanSpeechToText";
import { useBookmark } from "@/hooks/useBookmark";
import { BookmarkComp } from "./BookmarkComp";
import { QuizGameInput } from "./QuizGameInput";
import { QuizFeedback } from "./quizGame/QuizFeedback";

// ── LocalStorage keys ──
const LS_LEVEL = "buch_vocabs_level";
const LS_CHAPTER = "buch_vocabs_chapter";
const SAVED_STATE_BOOKMARKED_ONLY = "buch_vocabs_bookmarked_only";

export default function BuchVocabsPractice() {
  useGoBack();
  const { playSound } = useSoundEffects();
  const inputRef = useRef<HTMLInputElement>(null);

  // ── Selection state (persisted) ──
  const [selectedLevel, setSelectedLevel] = useState("A1");
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [playBookmarkedOnly, setPlayBookmarkedOnly] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // ── Quiz state ──
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [seenIndices, setSeenIndices] = useState<Set<number>>(new Set());

  // ── Bookmarks state ──
  const [bookmarkedWords, setBookmarkedWords] = useState<string[]>([]);
  const BOOKMARK_NAME = `buch_bookmarks_${selectedLevel}_${selectedChapter}`;
  const { getBookmarkStrings } = useBookmark(BOOKMARK_NAME);

  // Poll bookmarks periodically (similar to GuessGermanWords)
  useEffect(() => {
    const updateBookmarks = () => {
      setBookmarkedWords((prev) => {
        const next = getBookmarkStrings();
        if (prev.length !== next.length || prev.some((v, i) => v !== next[i])) {
          return next;
        }
        return prev;
      });
    };
    updateBookmarks();
    const interval = setInterval(updateBookmarks, 1000);
    return () => clearInterval(interval);
  }, [getBookmarkStrings]);

  // ── Speech to Text ──
  const {
    transcript,
    listening,
    stop: stopListening,
    resetTranscript,
  } = useGermanSpeechToText();

  // ── Derived data ──
  const levelData =
    buchVocabs.find((l) => l.level === selectedLevel) || buchVocabs[0];
  const availableChapters = levelData?.chapters ?? [];
  const chapterData =
    levelData?.chapters.find((c) => c.chapter === selectedChapter) ||
    availableChapters[0];

  const allWords = chapterData?.words ?? [];
  const words = playBookmarkedOnly
    ? allWords.filter((w) => bookmarkedWords.includes(w.german))
    : allWords;

  const safeWordIdx = currentWordIdx >= words.length ? 0 : currentWordIdx;
  const currentWord = words[safeWordIdx] ?? null;

  // ── Load saved state ──
  useEffect(() => {
    const sl = localStorage.getItem(LS_LEVEL);
    const sc = localStorage.getItem(LS_CHAPTER);
    const savedBookmarksOnly = localStorage.getItem(
      SAVED_STATE_BOOKMARKED_ONLY
    );
    if (sl) setSelectedLevel(sl);
    if (sc) setSelectedChapter(Number(sc));
    if (savedBookmarksOnly !== null) {
      setPlayBookmarkedOnly(savedBookmarksOnly === "true");
    }
    setInitialized(true);
  }, []);

  // ── Persist config ──
  useEffect(() => {
    if (!initialized) return;
    localStorage.setItem(LS_LEVEL, selectedLevel);
    localStorage.setItem(LS_CHAPTER, String(selectedChapter));
    localStorage.setItem(
      SAVED_STATE_BOOKMARKED_ONLY,
      String(playBookmarkedOnly)
    );
  }, [selectedLevel, selectedChapter, playBookmarkedOnly, initialized]);

  // ── Keyboard Shortcuts ──
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.altKey &&
        e.key.toLowerCase() === "b" &&
        bookmarkedWords.length > 0
      ) {
        e.preventDefault();
        setPlayBookmarkedOnly(!playBookmarkedOnly);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playBookmarkedOnly, bookmarkedWords.length]);

  // ── Speech Transcript Sync ──
  useEffect(() => {
    if (transcript) {
      setUserAnswer(transcript);
    }
  }, [transcript]);

  // ── Pick next unseen word ──
  const pickNextWord = useCallback(
    (seen: Set<number>, currentPool: BuchVocabWord[]) => {
      if (currentPool.length === 0) {
        setCurrentWordIdx(0);
        return;
      }
      const available = currentPool
        .map((_, i) => i)
        .filter((i) => !seen.has(i));

      if (available.length === 0) {
        setSeenIndices(new Set());
        setCurrentWordIdx(Math.floor(Math.random() * currentPool.length));
        return;
      }
      setCurrentWordIdx(
        available[Math.floor(Math.random() * available.length)]
      );
    },
    []
  );

  // ── Reset when mode changes ──
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
    resetTranscript();
    pickNextWord(new Set(), words);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLevel, selectedChapter, playBookmarkedOnly, initialized]);

  // Adjust if words shrink below index
  useEffect(() => {
    if (
      playBookmarkedOnly &&
      currentWordIdx >= words.length &&
      words.length > 0
    ) {
      setCurrentWordIdx(0);
    }
  }, [words.length, playBookmarkedOnly, currentWordIdx]);

  // Disable Bookmarks mode if list becomes empty
  useEffect(() => {
    if (playBookmarkedOnly && bookmarkedWords.length === 0 && initialized) {
      setPlayBookmarkedOnly(false);
    }
  }, [playBookmarkedOnly, bookmarkedWords.length, initialized]);

  // ── Handlers ──
  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    if (!currentWord || status !== "idle" || !userAnswer.trim()) return;

    if (listening) {
      stopListening();
    }

    const answer = userAnswer.trim().toLowerCase();
    const correct = currentWord.german.toLowerCase();
    const isCorrect = answer === correct;

    setStatus(isCorrect ? "correct" : "wrong");
    playSound(isCorrect ? "correct" : "wrong");

    setTimeout(() => {
      const newSeen = new Set(seenIndices);
      newSeen.add(safeWordIdx);
      setSeenIndices(newSeen);
      pickNextWord(newSeen, words);
      setUserAnswer("");
      setStatus("idle");
      resetTranscript();
      setTimeout(() => inputRef.current?.focus(), 50);
    }, 1500);
  };

  const handleInputKeyDowns = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  // ── Status config (matches GuessGermanWords) ──
  const statusConfig = {
    correct: {
      card: "border-emerald-500/50 shadow-emerald-500/10 shadow-xl",
      accent: "bg-emerald-500",
      input: [
        "border-emerald-500 focus:border-emerald-500",
        "text-emerald-700 bg-emerald-50 focus:ring-emerald-100",
        "dark:text-emerald-300 dark:bg-emerald-950/30 dark:focus:ring-emerald-900",
      ].join(" "),
    },
    wrong: {
      card: "border-red-500/50 shadow-red-500/10 shadow-xl",
      accent: "bg-red-500",
      input: [
        "border-red-500 focus:border-red-500",
        "text-red-700 bg-red-50 focus:ring-red-100",
        "dark:text-red-300 dark:bg-red-950/30 dark:focus:ring-red-900",
      ].join(" "),
    },
    idle: {
      card: [
        "shadow-xl",
        "border-gray-200 shadow-gray-100/80",
        "dark:border-white/[0.07] dark:shadow-black/50",
      ].join(" "),
      accent: "bg-sky-500",
      input: [
        "focus:border-sky-500",
        "border-gray-300 text-gray-800 bg-white hover:border-gray-400 focus:ring-sky-100",
        "dark:border-white/10 dark:text-white dark:bg-white/5 dark:hover:border-white/20 dark:focus:ring-sky-950",
      ].join(" "),
    },
  } as const;

  const currentStatus =
    status === "correct"
      ? statusConfig.correct
      : status === "wrong"
        ? statusConfig.wrong
        : statusConfig.idle;

  const remainingWords = Math.max(0, words.length - seenIndices.size);
  const progressPercent = words.length
    ? Math.round((seenIndices.size * 100) / words.length)
    : 0;

  if (!initialized) return null;

  return (
    <main className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden px-4 bg-gray-50 dark:bg-[#121212]">
      <div className="relative flex w-full max-w-xl flex-col gap-3 z-10">
        {/* Header (Matching QuizHeader) */}
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
              Buchwortschatz
            </h1>
            <p className="text-xs md:text-sm text-gray-500 dark:text-[#B0B0B0] font-medium mt-0.5 md:mt-1">
              Type the German translation
            </p>
          </div>
        </header>

        {/* Main card */}
        <article
          className={[
            "relative overflow-hidden rounded-2xl border transition-all duration-300 ease-out",
            "bg-white dark:bg-[#121212]",
            currentStatus.card,
          ].join(" ")}
        >
          <div className="p-4 md:p-6">
            {/* Inline Controls (Matching QuizGroupControls) */}
            <div className="flex flex-col items-center justify-start gap-1 md:gap-2 relative">
              {/* Group Controls Row */}
              <div className="flex w-full items-center justify-between gap-2 md:gap-4">
                {/* Left — Level Selector */}
                <div className="flex-1 max-w-[100px] md:max-w-[120px] min-w-0">
                  <div
                    className={`
                      relative flex items-center justify-between
                      h-9 md:h-10 w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-full transition-opacity duration-200 mx-auto
                    `}
                  >
                    <select
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                      className="appearance-none w-full h-full pl-3 pr-7 bg-transparent text-[11px] md:text-xs font-bold uppercase tracking-wider text-center text-gray-600 dark:text-gray-300 truncate focus:outline-none cursor-pointer"
                    >
                      {buchVocabs.map((l) => (
                        <option
                          key={l.level}
                          value={l.level}
                          className="text-gray-900 bg-white dark:bg-zinc-900 dark:text-gray-200"
                        >
                          {l.level}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-400 dark:text-zinc-600">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Center — Chapter Navigator */}
                <div className="flex flex-[2] items-center justify-center min-w-0">
                  <div className="flex items-center justify-between h-9 md:h-10 w-full max-w-65 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-full transition-opacity duration-200 mx-auto">
                    {/* Prev Chapter */}
                    <button
                      type="button"
                      disabled={
                        availableChapters.findIndex(
                          (c) => c.chapter === selectedChapter
                        ) <= 0
                      }
                      onClick={() => {
                        const idx = availableChapters.findIndex(
                          (c) => c.chapter === selectedChapter
                        );
                        if (idx > 0)
                          setSelectedChapter(
                            availableChapters[idx - 1].chapter
                          );
                      }}
                      title="Previous Chapter"
                      className="flex items-center justify-center h-full w-9 md:w-10 rounded-l-full text-gray-400 hover:text-gray-600 dark:text-zinc-500 dark:hover:text-zinc-300 hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors"
                    >
                      <svg
                        width="16"
                        height="16"
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

                    {/* Dropdown Selector */}
                    <div className="relative flex-1 h-full min-w-0 border-x border-gray-100 dark:border-zinc-800">
                      <select
                        value={selectedChapter}
                        onChange={(e) =>
                          setSelectedChapter(Number(e.target.value))
                        }
                        className="appearance-none w-full h-full pl-2 pr-7 bg-transparent text-[11px] md:text-xs font-bold uppercase tracking-wider text-center text-gray-600 dark:text-gray-300 truncate focus:outline-none cursor-pointer"
                        title="Select Chapter"
                      >
                        {availableChapters.map((c) => (
                          <option
                            key={c.chapter}
                            value={c.chapter}
                            className="text-gray-900 bg-white dark:bg-zinc-900 dark:text-gray-200"
                          >
                            Kapitel {c.chapter} {c.title ? `— ${c.title}` : ""}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-400 dark:text-zinc-600">
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </div>
                    </div>

                    {/* Next Chapter */}
                    <button
                      type="button"
                      disabled={
                        availableChapters.findIndex(
                          (c) => c.chapter === selectedChapter
                        ) >=
                        availableChapters.length - 1
                      }
                      onClick={() => {
                        const idx = availableChapters.findIndex(
                          (c) => c.chapter === selectedChapter
                        );
                        if (idx < availableChapters.length - 1)
                          setSelectedChapter(
                            availableChapters[idx + 1].chapter
                          );
                      }}
                      title="Next Chapter"
                      className="flex items-center justify-center h-full w-9 md:w-10 rounded-r-full text-gray-400 hover:text-gray-600 dark:text-zinc-500 dark:hover:text-zinc-300 hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors"
                    >
                      <svg
                        width="16"
                        height="16"
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
                </div>

                {/* Right — Bookmark */}
                <div className="justify-self-end">
                  {currentWord ? (
                    <BookmarkComp
                      word={currentWord.german}
                      BOOKMARK_NAME={BOOKMARK_NAME}
                    />
                  ) : (
                    <div className="w-10 h-10" />
                  )}
                </div>
              </div>

              {/* Settings Toggles (Bookmarks Only) */}
              <div className="mt-2 flex items-center justify-center gap-3 w-full">
                <label
                  htmlFor="playBookmarkedOnly"
                  title={
                    bookmarkedWords.length === 0
                      ? "Bookmark some words to play them"
                      : playBookmarkedOnly
                        ? "Disable Bookmarks Mode (Alt+B)"
                        : "Enable Bookmarks Mode (Alt+B)"
                  }
                  className={`
                    flex items-center gap-1.5 cursor-pointer select-none 
                    text-xs font-medium 
                    transition-colors duration-200
                    px-2 py-0.5 rounded-md border
                    ${
                      bookmarkedWords.length === 0
                        ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400 border-gray-200 dark:bg-zinc-800 dark:text-gray-500 dark:border-zinc-700"
                        : playBookmarkedOnly
                          ? "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800"
                          : "text-gray-400 border-transparent hover:text-gray-600 dark:hover:text-gray-300"
                    }
                  `}
                >
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      id="playBookmarkedOnly"
                      disabled={bookmarkedWords.length === 0}
                      checked={playBookmarkedOnly}
                      onChange={(e) => setPlayBookmarkedOnly(e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      className={`
                        w-3 h-3 rounded-full border mr-1.5 transition-colors
                        ${
                          playBookmarkedOnly
                            ? "bg-blue-500 border-blue-500"
                            : "border-gray-300 dark:border-gray-600 bg-transparent"
                        }
                      `}
                    >
                      {playBookmarkedOnly && (
                        <svg
                          className="w-full h-full text-white p-0.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                  </div>
                  Bookmarks Only
                </label>
              </div>
            </div>

            {/* Clues */}
            <div className="mt-4 grid gap-4">
              {/* English */}
              <section className="text-center">
                <span className="inline-block rounded border border-gray-200 bg-gray-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:border-white/8 dark:bg-white/4 dark:text-white/35">
                  English
                </span>
                <p className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-white md:text-4xl">
                  {currentWord?.english || "No words available"}
                </p>
              </section>

              {/* Hindi */}
              {currentWord && (
                <section className="text-center">
                  <span className="inline-block rounded border border-gray-200 bg-gray-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:border-white/8 dark:bg-white/4 dark:text-white/35">
                    Hindi
                  </span>
                  <p className="mt-2 text-xl font-medium leading-snug text-gray-600 font-hindi dark:text-white/65 md:text-2xl">
                    {currentWord.hindi}
                  </p>
                </section>
              )}
            </div>

            {/* Feedback */}
            <div className="mt-3">
              {currentWord ? (
                <QuizFeedback
                  status={status}
                  word={{
                    germanWord: currentWord.german,
                    englishMeaning: [currentWord.english],
                    hindiMeaning: [currentWord.hindi],
                    article: currentWord.article as "der" | "die" | "das",
                    hindiPronunciation: currentWord.pronunciation,
                    type: "noun",
                  }}
                />
              ) : (
                <div className="h-[76px]" /> // Placeholder height for feedback space
              )}
            </div>

            {/* Input */}
            <div className="mt-3">
              <QuizGameInput
                handleSubmit={handleSubmit}
                inputRef={inputRef}
                status={status}
                inputStyles={currentStatus.input}
                userAnswer={userAnswer}
                setUserAnswer={setUserAnswer}
                useMicrophone={true}
                handleKeyDown={handleInputKeyDowns}
              />
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
      </div>
    </main>
  );
}
