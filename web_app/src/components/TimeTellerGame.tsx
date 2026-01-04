"use client";

import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";
import { QuizGameInput } from "./QuizGameInput";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { GermanTime } from "@/models/germanTime";
import { RandomGermanTimeSelector } from "@/helper/RandomGermanTimeSelector";

const SAVED_STATE_GAME_MODE = "gem_time_teller_game_mode";
const SAVED_STATE_IS_REVERSED = "gem_time_teller_is_reversed";

export default function TimeTellerGame() {
  const { playSound } = useSoundEffects();
  const [germanTime, setGermanTime] = useState<GermanTime | null>(null);
  const [isFormal, setIsFormal] = useState<boolean>(true);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  const [isGameReversed, setIsGameReversed] = useState<boolean>(false);

  // game mode
  const [gameMode, setGameMode] = useState<"formal" | "informal" | "random">(
    "random"
  );
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Load state from local storage on mount
  useEffect(() => {
    const savedMode = localStorage.getItem(SAVED_STATE_GAME_MODE);
    if (savedMode) {
      setGameMode(savedMode as "formal" | "informal" | "random");
    }

    const savedReversed = localStorage.getItem(SAVED_STATE_IS_REVERSED);
    if (savedReversed) {
      setIsGameReversed(savedReversed === "true");
    }

    setIsInitialized(true);
  }, []);

  // Save state to local storage when changed
  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem(SAVED_STATE_GAME_MODE, gameMode);
    localStorage.setItem(SAVED_STATE_IS_REVERSED, String(isGameReversed));
  }, [gameMode, isGameReversed, isInitialized]);

  const handleNextTime = useCallback(() => {
    let nextIsFormal = true;
    if (gameMode === "random") {
      nextIsFormal = Math.random() < 0.5;
    } else if (gameMode === "formal") {
      nextIsFormal = true;
    } else {
      nextIsFormal = false;
    }

    setIsFormal(nextIsFormal);
    setGermanTime(RandomGermanTimeSelector());
    setUserAnswer("");
    setStatus("idle");
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [gameMode]);

  // Handle game mode change or helper initialization
  useEffect(() => {
    if (isInitialized) {
      handleNextTime();
    }
  }, [handleNextTime, isInitialized]); // Re-run when gameMode changes (because handleNextTime depends on it)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!germanTime || status !== "idle") return;

    const userAttempt = userAnswer.trim();
    const baseAnswer = isGameReversed
      ? germanTime.time.toString()
      : isFormal
      ? germanTime.formalTime.trim()
      : germanTime.informalTime.trim();

    // Improve matching logic to be slightly more lenient but correct
    // For time matching (reverse game), exact match usually best for digits like 13:45
    // For text matching, case insensitive
    const isCorrect = userAttempt.toLowerCase() === baseAnswer.toLowerCase();

    setStatus(isCorrect ? "correct" : "wrong");
    playSound(isCorrect ? "correct" : "wrong");

    const isMobile = window.innerWidth < 768;
    setTimeout(handleNextTime, isMobile ? 1500 : 3000);
  };

  if (!germanTime) return null;

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
    <main className="flex min-h-[60vh] w-full flex-col items-center justify-center p-2 md:p-4 bg-transparent transition-colors relative">
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
              Practice German Time
            </h1>
            <p className="text-xs md:text-sm text-gray-500 dark:text-[#B0B0B0] font-medium mt-0.5 md:mt-1">
              {isGameReversed
                ? "Enter the digital time (e.g. 13:30)"
                : "Write the time in German words"}
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
                {/* Game Mode Controls */}
                <div className="flex items-center justify-center gap-2 w-full flex-wrap">
                  {(["random", "formal", "informal"] as const).map((mode) => (
                    <label
                      key={mode}
                      className={`
                                    flex items-center gap-1.5 cursor-pointer select-none 
                                    text-xs font-medium 
                                    transition-colors duration-200
                                    px-2 py-0.5 rounded-md border
                                    ${
                                      mode === gameMode
                                        ? "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800"
                                        : "text-gray-400 border-transparent hover:text-gray-600 dark:hover:text-gray-300"
                                    }
                                  `}
                    >
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          checked={mode === gameMode}
                          onChange={() => setGameMode(mode)}
                          className="sr-only"
                        />
                        <div
                          className={`
                                        w-3 h-3 rounded-full border mr-1.5 transition-colors
                                        ${
                                          mode === gameMode
                                            ? "bg-blue-500 border-blue-500"
                                            : "border-gray-300 dark:border-gray-600 bg-transparent"
                                        }
                                     `}
                        >
                          {mode === gameMode && (
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
                      {mode}
                    </label>
                  ))}
                </div>

                <div className="mt-2 flex flex-col items-center gap-2">
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-400 bg-gray-100 dark:bg-[#121212] dark:border dark:border-[#444444] px-2 py-0.5 md:py-1 rounded">
                    {isGameReversed ? "German Description" : "Time"}
                  </span>
                  <span className="text-[10px] md:text-xs font-medium text-gray-500 dark:text-gray-400">
                    ({isFormal ? "Formal" : "Informal"})
                  </span>
                </div>

                <p className="w-full text-center wrap-break-word text-3xl md:text-4xl font-semibold text-gray-900 dark:text-[#E0E0E0] mt-2">
                  {isGameReversed
                    ? isFormal
                      ? germanTime.formalTime
                      : germanTime.informalTime
                    : germanTime.time}
                </p>
              </div>
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
                    Correct Answer
                  </span>
                  <span>
                    “
                    {isGameReversed
                      ? germanTime.time
                      : isFormal
                      ? germanTime.formalTime
                      : germanTime.informalTime}
                    ”
                  </span>
                  <span className="text-blue-600 text-lg font-medium">
                    ✓ Correct attempt
                  </span>
                </span>
              ) : (
                <span className="flex flex-col items-center text-xl font-bold text-center">
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-400 bg-gray-100 dark:bg-[#1a1a1a] dark:text-gray-500 border border-gray-100 dark:border-[#333] px-2 py-0.5 rounded-md">
                    Correct Answer
                  </span>
                  <span>
                    “
                    {isGameReversed
                      ? germanTime.time
                      : isFormal
                      ? germanTime.formalTime
                      : germanTime.informalTime}
                    ”
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
              placeholder={
                isGameReversed
                  ? "Write time (e.g. 13:30)..."
                  : "Write time in german words..."
              }
              useMicrophone={false}
            />

            <section className="mt-4 flex justify-center">
              <label
                htmlFor="isGameReversed"
                className="flex items-center gap-2 cursor-pointer select-none text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200 w-fit group"
              >
                <div className="relative flex items-center">
                  <input
                    id="isGameReversed"
                    name="isGameReversed"
                    type="checkbox"
                    checked={isGameReversed}
                    onChange={() => {
                      setIsGameReversed(!isGameReversed);
                    }}
                    className="sr-only"
                  />
                  {/* Custom Toggle Switch UI */}
                  <div
                    className={`
                    w-9 h-5 rounded-full transition-colors duration-200 ease-in-out
                    ${
                      isGameReversed
                        ? "bg-blue-600"
                        : "bg-gray-300 dark:bg-gray-600"
                    }
                  `}
                  >
                    <div
                      className={`
                        w-3 h-3 bg-white rounded-full shadow-sm transform transition-transform duration-200 ease-in-out mt-1 ml-1
                        ${isGameReversed ? "translate-x-4" : "translate-x-0"}
                    `}
                    />
                  </div>
                </div>
                <span className="font-medium group-hover:translate-x-0.5 transition-transform duration-200">
                  Reverse Game (Read German, Write Digits)
                </span>
              </label>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}
