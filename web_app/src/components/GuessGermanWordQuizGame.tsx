"use client";

import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";
import { GermanWord } from "@/models/germanWord";
import {
  GetGermanWordsGroupLength,
  RandomGermanWordSelector,
  RandomGermanWordSelectorWithinRange,
} from "@/helper/RandomGermanWordSelector";
import { QuizGameInput } from "./QuizGameInput";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { germanWords } from "@/data/germanWords";

const WORDS_GROUP_SIZE = 50;

export default function GuessGermanWordQuizGame() {
  const { playSound } = useSoundEffects();
  const [word, setWord] = useState<GermanWord | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  // group system
  const [currentGroup, setCurrentGroup] = useState<number>(0);
  const totalGroups = GetGermanWordsGroupLength(WORDS_GROUP_SIZE);

  // game mode
  const [allIn, setAllIn] = useState<boolean>(false);
  const [strictMode, setStrictMode] = useState<boolean>(false);

  const handleNextWord = useCallback(() => {
    let newWord: GermanWord;
    if (allIn) newWord = RandomGermanWordSelector();
    else
      newWord = RandomGermanWordSelectorWithinRange(
        currentGroup * WORDS_GROUP_SIZE,
        (currentGroup + 1) * WORDS_GROUP_SIZE,
      );
    setWord(newWord);
    setUserAnswer("");
    setStatus("idle");
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [allIn, currentGroup]);

  // Initialize word on mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    handleNextWord();
  }, [handleNextWord]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!word || status !== "idle") return;

    const normalize = (s: string) => s.trim().toLowerCase();

    let userAttempt, baseAnswer;

    if (strictMode) {
      userAttempt = userAnswer;
      baseAnswer = word.article
        ? `${word.article} ${word.germanWord}`
        : word.germanWord;
    } else {
      userAttempt = normalize(userAnswer);
      baseAnswer = normalize(word.germanWord);
    }

    const articleAnswer = word.article
      ? normalize(`${word.article} ${word.germanWord}`)
      : null;

    const isCorrect = strictMode
      ? userAttempt === baseAnswer
      : userAttempt === baseAnswer ||
        (articleAnswer !== null && userAttempt === articleAnswer);

    setStatus(isCorrect ? "correct" : "wrong");
    playSound(isCorrect ? "correct" : "wrong");

    setTimeout(handleNextWord, 3000);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (status !== "idle") return;

      const target = e.target as HTMLInputElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;

      if (e.key == "ArrowLeft" && !allIn) {
        setCurrentGroup((prev) => Math.max(0, prev - 1));
      }

      if (e.key == "ArrowRight" && !allIn) {
        setCurrentGroup((prev) => Math.min(totalGroups - 1, prev + 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [status]);

  const displayMeaning = (text: string | string[]) => {
    return Array.isArray(text) ? text.join(", ") : text;
  };

  if (!word) return null;

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
              Practice German Words
            </h1>
            <p className="text-xs md:text-sm text-gray-500 dark:text-[#B0B0B0] font-medium mt-0.5 md:mt-1">
              Translate the word below into German
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
                {/* Group Controls */}
                <div
                  className={`
                                flex items-center justify-center gap-4 
                                bg-gray-50 dark:bg-[#1a1a1a] 
                                rounded-full px-4 py-1.5 
                                border border-gray-100 dark:border-[#333]
                                transition-all duration-300
                                ${
                                  allIn
                                    ? "opacity-30 grayscale pointer-events-none select-none"
                                    : "opacity-100"
                                }
                              `}
                >
                  <button
                    disabled={currentGroup === 0 || allIn}
                    onClick={() => {
                      setCurrentGroup(currentGroup - 1);
                      handleNextWord();
                    }}
                    className="
                                  p-1 rounded-full 
                                  text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 
                                  disabled:opacity-30 disabled:cursor-not-allowed
                                  transition-colors
                                "
                    title="Previous Group (Left Arrow)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
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

                  <span
                    title="Splits German words in groups of 50 so that words can learned easily."
                    className="text-xs font-semibold text-gray-500 dark:text-gray-400 font-mono"
                  >
                    Group {currentGroup + 1} / {totalGroups}
                  </span>

                  <button
                    onClick={() => {
                      setCurrentGroup(currentGroup + 1);
                      handleNextWord();
                    }}
                    disabled={currentGroup === totalGroups - 1 || allIn}
                    className="
                                  p-1 rounded-full 
                                  text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 
                                  disabled:opacity-30 disabled:cursor-not-allowed
                                  transition-colors
                                "
                    title="Next Group (Right Arrow)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
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

                {/* Tag and "All In" Toggle Container */}
                <div className="mt-2 flex items-center justify-center gap-3 w-full">
                  {/* All In Toggle */}
                  <label
                    htmlFor="allIn"
                    title="Play all words at once, Disables Group system"
                    className={`
                                    flex items-center gap-1.5 cursor-pointer select-none 
                                    text-xs font-medium 
                                    transition-colors duration-200
                                    px-2 py-0.5 rounded-md border
                                    ${
                                      allIn
                                        ? "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800"
                                        : "text-gray-400 border-transparent hover:text-gray-600 dark:hover:text-gray-300"
                                    }
                                  `}
                  >
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        id="allIn"
                        checked={allIn}
                        onChange={(e) => {
                          const newValue = e.target.checked;
                          setAllIn(newValue);
                          handleNextWord();
                        }}
                        className="sr-only"
                      />
                      <div
                        className={`
                                        w-3 h-3 rounded-full border mr-1.5 transition-colors
                                        ${
                                          allIn
                                            ? "bg-blue-500 border-blue-500"
                                            : "border-gray-300 dark:border-gray-600 bg-transparent"
                                        }
                                     `}
                      >
                        {allIn && (
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
                    All in
                  </label>

                  {/* Strict Mode */}
                  <label
                    htmlFor="strictMode"
                    title="Articles are compulsory if present and correct Captilized words."
                    className={`
                                    flex items-center gap-1.5 cursor-pointer select-none 
                                    text-xs font-medium 
                                    transition-colors duration-200
                                    px-2 py-0.5 rounded-md border
                                    ${
                                      allIn
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
                          handleNextWord();
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

            {/* Feedback Message */}
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
                          (w) => w.germanWord === word.germanWord,
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
                          (w) => w.germanWord === word.germanWord,
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
            />
          </div>
        </article>
      </div>
    </main>
  );
}

function convertArticleInHindiPronuncation(article: "der" | "die" | "das") {
  if (article === "der") return "डेर ";
  if (article === "die") return "डी ";
  if (article === "das") return "डास ";
}
