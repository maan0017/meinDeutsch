"use client";

import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";
import { QuizGameInput } from "./QuizGameInput";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { GermanNumber } from "@/models/germanNumber";
import { RandomGermanNumberSelector } from "@/helper/RandomGermanNumberSelector";
import { AllowOnlyNumberInput } from "@/helper/AllowOnlyNumberInput";

const SAVED_STATE_IS_REVERSED = "gem_guess_german_number_is_reversed";

export default function GuessGermanNumberGame() {
  const { playSound } = useSoundEffects();
  const [number, setNumber] = useState<GermanNumber | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  const [isGameReversed, setIsGameReversed] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Load state from local storage on mount
  useEffect(() => {
    const savedReversed = localStorage.getItem(SAVED_STATE_IS_REVERSED);
    if (savedReversed) {
      setIsGameReversed(savedReversed === "true");
    }
    setIsInitialized(true);
  }, []);

  // Save state to local storage when changed
  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem(SAVED_STATE_IS_REVERSED, String(isGameReversed));
  }, [isGameReversed, isInitialized]);

  const handleNextNumber = useCallback(() => {
    setNumber(RandomGermanNumberSelector());
    setUserAnswer("");
    setStatus("idle");
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  // Initialize word on mount
  // Initialize word on mount after hydration
  useEffect(() => {
    if (isInitialized) {
      handleNextNumber();
    }
  }, [handleNextNumber, isInitialized]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!number || status !== "idle") return;

    const normalize = (s: string) => s.trim().toLowerCase();

    const userAttempt = normalize(userAnswer);
    const baseAnswer = isGameReversed
      ? normalize(number.number.toString())
      : normalize(number.germanWord);

    const isCorrect = userAttempt === baseAnswer;

    setStatus(isCorrect ? "correct" : "wrong");
    playSound(isCorrect ? "correct" : "wrong");

    const isMobile = window.innerWidth < 768;
    setTimeout(handleNextNumber, isMobile ? 1500 : 3000);
  };

  if (!number) return null;

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
    <main className="flex min-h-[60vh] w-full flex-col items-center justify-center p-4 md:p-6 bg-gray-50 dark:bg-[#121212] transition-colors relative">
      <div className="w-full max-w-lg space-y-5 md:space-y-8 text-center">
        {/* Header */}
        <header className="flex items-center justify-between w-full mb-4 md:mb-8 relative">
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
              Guess the Number
            </h1>
            <p className="text-xs md:text-sm text-gray-500 dark:text-[#B0B0B0] font-medium mt-0.5 md:mt-1">
              Write the number in German
            </p>
          </div>
        </header>

        {/* Card */}
        <article className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div
            className={`
              relative overflow-hidden rounded-xl bg-white dark:bg-[#121212] 
              px-6 py-6 md:px-10 md:py-10 shadow-lg border transition-all duration-300 
              ${cardBorder}
            `}
          >
            {/* Clues */}
            {/* Clues */}
            <div className="space-y-6 md:space-y-8 mb-6 md:mb-10">
              <section className="w-full px-4">
                {" "}
                {/* Added px-4 to prevent touching edges */}
                <div className="w-full flex items-center justify-center space-x-2 mb-2">
                  <span className="w-auto text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-400 bg-gray-100 dark:bg-[#121212] dark:border dark:border-[#444444] px-2 py-0.5 md:py-1 rounded">
                    {isGameReversed ? "Number in German" : "Number"}
                  </span>
                </div>
                <p className="w-full text-center wrap-break-word text-3xl md:text-4xl font-semibold text-gray-900 dark:text-[#E0E0E0]">
                  {isGameReversed ? number.germanWord : number.number}
                </p>
              </section>
            </div>

            {/* Feedback Message */}
            <div
              className={`
                  mb-8 text-sm font-semibold 
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
                  <span className="text-blue-600 text-lg font-medium">
                    ✓ Correct attempt
                  </span>
                </span>
              ) : (
                <span className="flex flex-col items-center text-xl font-bold text-center">
                  <div className="w-full flex items-center justify-center space-x-2 mb-2">
                    <span className="w-auto text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-400 bg-gray-100 dark:bg-[#121212] dark:border dark:border-[#444444] px-2 py-0.5 md:py-1 rounded">
                      {isGameReversed ? "Number in German" : "Number"}
                    </span>
                  </div>
                  <span>
                    {isGameReversed ? number.number : number.germanWord}
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
              handleKeyDown={isGameReversed ? AllowOnlyNumberInput : undefined}
              userAnswer={userAnswer}
              setUserAnswer={setUserAnswer}
              placeholder={
                isGameReversed ? "Type German word..." : "Type number..."
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
