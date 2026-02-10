"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { BookmarkComp } from "./BookmarkComp";
import { GermanWord } from "@/models/germanWord";
import { getBookmarks } from "@/hooks/useBookmark";
import { germanWords } from "@/data/germanWords";
import { QuizGameInput } from "./QuizGameInput";

export const BookmarkedWordsGuessGame = () => {
  const { playSound } = useSoundEffects();
  const [word, setWord] = useState<GermanWord | null>(null);
  const [bookmarkedWords, setBookmarkedWords] = useState<GermanWord[]>([]);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  const [strictMode, setStrictMode] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // logic to track unseen words - storing indices of bookmarkedWords array
  const [seenIndices, setSeenIndices] = useState<Set<number>>(new Set());

  // Consolidated Next Word Logic
  const handleNextWord = useCallback(
    (forceReset = false) => {
      // If no bookmarks, do nothing (will be handled by render)
      if (bookmarkedWords.length === 0) return;

      const totalWords = bookmarkedWords.length;
      let availableIndices: number[] = [];

      // Determine which indices haven't been seen
      const start = 0;
      const end = totalWords;
      const indicesToCheck = forceReset ? new Set<number>() : seenIndices;

      for (let i = start; i < end; i++) {
        if (!indicesToCheck.has(i)) {
          availableIndices.push(i);
        }
      }

      // If all words seen, reset (infinite loop behavior)
      if (availableIndices.length === 0) {
        availableIndices = Array.from({ length: totalWords }, (_, i) => i);
        if (!forceReset) {
          setSeenIndices(new Set());
        }
      }

      // Pick random from available
      const randomIndex = Math.floor(Math.random() * availableIndices.length);
      const selectedIndex = availableIndices[randomIndex];

      // Update seen indices
      setSeenIndices((prev) => {
        const newSet = forceReset ? new Set<number>() : new Set(prev);
        newSet.add(selectedIndex);
        return newSet;
      });

      setWord(bookmarkedWords[selectedIndex]);
      setUserAnswer("");
      setStatus("idle");
      setTimeout(() => inputRef.current?.focus(), 50);
    },
    [bookmarkedWords, seenIndices]
  );

  // Initial Load
  useEffect(() => {
    const words = getBookmarks();
    setBookmarkedWords(words);
    setIsInitialized(true);
  }, []);

  // Trigger first word after initialization if bookmarks exist
  useEffect(() => {
    if (isInitialized && !word && bookmarkedWords.length > 0) {
      handleNextWord(true); // Treat as a reset to start fresh
    }
  }, [isInitialized, bookmarkedWords, handleNextWord, word]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!word || status !== "idle") return;

    const normalize = (s: string) => s.trim().toLowerCase();

    let userAttempt, baseAnswer;

    if (strictMode && word.article) {
      userAttempt = userAnswer;
      baseAnswer = `${word.article} ${word.germanWord}`;
    } else {
      userAttempt = normalize(userAnswer);
      baseAnswer = normalize(word.germanWord);
    }

    const isCorrect =
      strictMode && word.article
        ? userAttempt.split(" ")[0].toLowerCase() ===
            word.article.toLowerCase() &&
          userAttempt.split(" ")[1] === word.germanWord
        : userAttempt.toLowerCase() === baseAnswer.toLowerCase() ||
          userAttempt.toLowerCase() ===
            `${word?.article?.toLowerCase()} ${word.germanWord.toLowerCase()}`;

    setStatus(isCorrect ? "correct" : "wrong");
    playSound(isCorrect ? "correct" : "wrong");

    const isMobile = window.innerWidth < 768;
    setTimeout(handleNextWord, isMobile ? 1500 : 3000);
  };

  const displayMeaning = (text: string | string[]) => {
    return Array.isArray(text) ? text.join(", ") : text;
  };

  // 1. Loading State
  if (!isInitialized) {
    return (
      <main className="flex min-h-[50vh] w-full flex-col items-center justify-center p-4">
        <p className="text-gray-500 animate-pulse">Loading bookmarks...</p>
      </main>
    );
  }

  // 2. Empty State
  if (bookmarkedWords.length === 0) {
    return (
      <main className="flex min-h-[50vh] w-full flex-col items-center justify-center p-4 bg-gray-50 dark:bg-[#121212]">
        <div className="w-full max-w-lg text-center space-y-6">
          <div className="p-8 bg-white dark:bg-[#1E1E1E] rounded-xl shadow-lg border border-gray-200 dark:border-[#333]">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No Bookmarked Words
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              You haven't bookmarked any words yet. Go to the practice/search
              pages and click the bookmark icon to save words here for focused
              practice.
            </p>
            <div className="flex justify-center gap-3">
              <Link
                href="/juwel/practice-german-word"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Go to Practice
              </Link>
              <Link
                href="/juwelen"
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Back to Menu
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // 3. Game State (only render if word exists, otherwise show loading/transition)
  if (!word) {
    return null; // Should ideally show a spinner or skeleton here too if waiting for next word takes time
  }

  // Styles reused from GuessGermanWordQuizGame for consistency
  const cardBorder =
    status === "correct"
      ? "border-green-500 ring-1 ring-green-500"
      : status === "wrong"
        ? "border-red-500 ring-1 ring-red-500"
        : "border-gray-200 dark:border-[#444444]";

  const inputStyles =
    status === "correct"
      ? "border-green-500 text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20 focus:border-green-500 focus:ring-green-200 dark:focus:ring-green-800"
      : status === "wrong"
        ? "border-red-500 text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-800"
        : "border-gray-300 dark:border-[#444444] focus:border-blue-500 focus:ring-blue-200 dark:focus:ring-blue-800 hover:border-gray-400 dark:hover:border-[#888888]";

  return (
    <main className="flex min-h-[50vh] w-full flex-col items-center justify-center p-2 md:p-4 bg-gray-50 dark:bg-[#121212] transition-colors relative">
      <div className="w-full max-w-lg space-y-2 md:space-y-4 text-center">
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
              Bookmarked Words
            </h1>
            <p className="text-xs md:text-sm text-gray-500 dark:text-[#B0B0B0] font-medium mt-0.5 md:mt-1">
              Reviewing {bookmarkedWords.length} saved{" "}
              {bookmarkedWords.length === 1 ? "word" : "words"}
            </p>
          </div>
        </header>

        {/* Card */}
        <article className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div
            className={`
              relative overflow-hidden rounded-xl bg-white dark:bg-[#121212] 
              px-4 py-4 md:px-6 md:py-8 shadow-lg border transition-all duration-300 
              ${cardBorder}
            `}
          >
            {/* Clues */}
            <div className="space-y-3 md:space-y-5 mb-3 md:mb-5">
              <div className="flex flex-col items-center justify-center gap-2 relative">
                {/* Group Controls (Simplified for bookmarks - just simplified header or nothing) */}
                <div className="grid grid-cols-3 items-center w-full">
                  {/* Left spacer */}
                  <div />

                  {/* Center - maybe progress? */}
                  <div className="flex items-center justify-center">
                    {/* Optional: Add progress indicator here if desired */}
                  </div>

                  {/* Right - Bookmark Section */}
                  <div className="justify-self-end">
                    <BookmarkComp
                      word={word.germanWord}
                      // When a bookmark is toggled here (removed), we might want to refresh the list?
                      // The current getBookmarks() hook likely syncs with local storage, but this component
                      // holds local state `bookmarkedWords`. Real-time removal might be tricky without a callback
                      // or context. For now, we'll leave it as visual toggle, but user might need to reload to see it gone from rotation.
                    />
                  </div>
                </div>

                {/* Strict Mode Toggle */}
                <div className="mt-2 flex items-center justify-center gap-3 w-full">
                  <label
                    htmlFor="strictMode"
                    title="Articles are compulsory if present and correct Capitalized words."
                    className={`
                                    flex items-center gap-1.5 cursor-pointer select-none 
                                    text-xs font-medium 
                                    transition-colors duration-200
                                    px-2 py-0.5 rounded-md border
                                    ${
                                      strictMode
                                        ? "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800"
                                        : "text-gray-400 border-transparent hover:text-gray-600 dark:hover:text-gray-300"
                                    }
                                  `}
                  >
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        id="strictMode"
                        checked={strictMode}
                        onChange={(e) => {
                          const newValue = e.target.checked;
                          setStrictMode(newValue);
                        }}
                        className="sr-only"
                      />
                      <div
                        className={`
                                        w-3 h-3 rounded-full border mr-1.5 transition-colors
                                        ${
                                          strictMode
                                            ? "bg-blue-500 border-blue-500"
                                            : "border-gray-300 dark:border-gray-600 bg-transparent"
                                        }
                                     `}
                      >
                        {strictMode && (
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
                    Strict Mode
                  </label>
                </div>
              </div>

              <section>
                <div className="mt-4 flex items-center justify-center space-x-2 mb-1">
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-400 bg-gray-100 dark:bg-[#121212] dark:border dark:border-[#444444] px-2 py-0.5 md:py-1 rounded">
                    English
                  </span>
                </div>
                <p className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-[#E0E0E0]">
                  {displayMeaning(word.englishMeaning)}
                </p>
              </section>

              <section>
                <p className="text-xs md:text-sm text-gray-500 dark:text-[#B0B0B0] font-medium mb-0.5 md:mb-1">
                  Hindi Hint
                </p>
                <p className="text-lg md:text-xl text-gray-700 dark:text-[#E0E0E0] font-hindi">
                  {displayMeaning(word.hindiMeaning)}
                </p>
              </section>
            </div>

            {/* Feedback Message - Consistently styled */}
            <div
              className={`
                  mb-4 text-sm font-semibold 
                  transition-all duration-300 transform
                  ${
                    status !== "idle"
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-2 h-0 overflow-hidden"
                  } 
                  ${
                    status === "correct"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-500 dark:text-red-400"
                  }
                `}
              role="alert"
            >
              {status === "correct" ? (
                <span className="flex flex-col items-center justify-center font-bold gap-1 text-xl">
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-400 bg-gray-100 dark:bg-[#1a1a1a] dark:text-gray-500 border border-gray-100 dark:border-[#333] px-2 py-0.5 rounded-md">
                    German Word
                    {word && (
                      <span className="ml-1 text-gray-400 dark:text-gray-500">
                        #
                        {germanWords.findIndex(
                          (w) => w.germanWord === word.germanWord
                        ) + 1}
                      </span>
                    )}
                  </span>
                  <span>
                    “
                    {word.article
                      ? `${word.article} ${word.germanWord}`
                      : word.germanWord}
                    ”
                  </span>
                  <span className="text-base text-slate-500">
                    (
                    {word.article
                      ? `${convertArticleInHindiPronuncation(word.article)} ${
                          word.hindiPronunciation
                        }`
                      : word.hindiPronunciation}
                    )
                  </span>
                  <span className="text-blue-600 text-lg font-medium">
                    ✓ Correct attempt
                  </span>
                </span>
              ) : (
                <span className="flex flex-col items-center text-xl font-bold text-center">
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-400 bg-gray-100 dark:bg-[#1a1a1a] dark:text-gray-500 border border-gray-100 dark:border-[#333] px-2 py-0.5 rounded-md">
                    German Word
                    {word && (
                      <span className="ml-1 text-gray-400 dark:text-gray-500">
                        #
                        {germanWords.findIndex(
                          (w) => w.germanWord === word.germanWord
                        ) + 1}
                      </span>
                    )}
                  </span>
                  <span>
                    “
                    {word.article
                      ? `${word.article} ${word.germanWord}`
                      : word.germanWord}
                    ”
                  </span>
                  <span className="text-base text-slate-500">
                    (
                    {word.article
                      ? `${convertArticleInHindiPronuncation(word.article)} ${
                          word.hindiPronunciation
                        }`
                      : word.hindiPronunciation}
                    )
                  </span>
                </span>
              )}
            </div>

            {/* Input */}
            <QuizGameInput
              handleSubmit={handleSubmit}
              inputRef={inputRef}
              status={status}
              inputStyles={inputStyles}
              userAnswer={userAnswer}
              setUserAnswer={setUserAnswer}
              useMicrophone={true}
            />
          </div>
        </article>
      </div>
    </main>
  );
};

function convertArticleInHindiPronuncation(article: "der" | "die" | "das") {
  if (article === "der") return "डेर ";
  if (article === "die") return "डी ";
  if (article === "das") return "डास ";
}
