"use client";

import Link from "next/link";
import { useState, useRef, useCallback } from "react";
import { GermanSentenceModel } from "@/models/germanSentences";
import { QuizGameInput } from "./QuizGameInput";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { germanSentences } from "@/data/germanSentences";
import { RandomGermanSentenceSelector } from "@/helper/RandomGermanSentenceSelector";

const SAVED_STATE_CURRENT_GROUP = "gem_guess_german_sentence_current_group";
const SAVED_STATE_ALL_IN = "gem_guess_german_sentence_all_in";

export const PracticeGermanSentencesExercise = () => {
  const { playSound } = useSoundEffects();
  const [currentSentence, setCurrentSentence] = useState<GermanSentenceModel>(
    RandomGermanSentenceSelector()
  );
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // logic to track unseen sentences
  const [seenIndices, setSeenIndices] = useState<Set<number>>(new Set());

  const handleNextSentence = useCallback(
    (forceReset = false) => {
      let start = 0;
      let end = germanSentences.length;

      // Filter available indices that haven't been seen yet
      let availableIndices = [];
      const indicesToCheck = forceReset ? new Set<number>() : seenIndices;

      for (let i = start; i < end; i++) {
        if (!indicesToCheck.has(i)) {
          availableIndices.push(i);
        }
      }

      // If all sentences seen, reset
      if (availableIndices.length === 0) {
        availableIndices = [];
        for (let i = start; i < end; i++) {
          availableIndices.push(i);
        }
        if (!forceReset) {
          setSeenIndices(new Set());
        }
      }

      // Pick random from available
      const randomIndex = Math.floor(Math.random() * availableIndices.length);
      const selectedOriginalIndex = availableIndices[randomIndex];

      // Update seen indices
      setSeenIndices((prev) => {
        const newSet = forceReset ? new Set<number>() : new Set(prev);
        newSet.add(selectedOriginalIndex);
        return newSet;
      });

      setCurrentSentence(germanSentences[selectedOriginalIndex]);
      setUserAnswer("");
      setStatus("idle");
      setTimeout(() => inputRef.current?.focus(), 50);
    },
    [seenIndices]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentSentence || status !== "idle") return;

    const normalize = (s: string) =>
      s
        .trim()
        .toLowerCase()
        .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
        .replace(/\s{2,}/g, " ");

    const userAttempt = normalize(userAnswer);
    const baseAnswer = normalize(currentSentence.sentence);

    const isCorrect = userAttempt === baseAnswer;

    setStatus(isCorrect ? "correct" : "wrong");
    playSound(isCorrect ? "correct" : "wrong");

    const isMobile = window.innerWidth < 768;
    // Longer delay for sentences to read correction
    setTimeout(handleNextSentence, isMobile ? 3000 : 4000);
  };

  if (!currentSentence) return null;

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
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-2 md:p-4 bg-gray-50 dark:bg-[#121212] transition-colors relative">
      <div className="w-full max-w-2xl space-y-4 md:space-y-6 text-center">
        {/* Header */}
        <header className="flex items-center justify-between w-full mb-2 md:mb-4 relative px-2">
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

          <div className="flex-1 text-center px-2">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-[#E0E0E0]">
              Practice German Sentences
            </h1>
            <p className="text-xs md:text-sm text-gray-500 dark:text-[#B0B0B0] font-medium mt-0.5 md:mt-1">
              Translate the sentence below into German
            </p>
          </div>
        </header>

        {/* Card */}
        <article className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
          <div
            className={`
              relative overflow-hidden rounded-xl bg-white dark:bg-[#121212] 
              px-4 py-6 md:px-8 md:py-10 shadow-lg border transition-all duration-300 
              ${cardBorder}
            `}
          >
            {/* Clues */}
            <div className="space-y-4 md:space-y-6 mb-6 md:mb-8">
              <section>
                <div className="flex items-center justify-center space-x-2 mb-2 md:mb-3">
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-400 bg-gray-100 dark:bg-[#2A2A2A] dark:text-gray-500 border border-gray-200 dark:border-[#333] px-2 py-1 rounded-md">
                    English
                  </span>
                </div>
                <p className="text-xl md:text-3xl font-semibold text-gray-900 dark:text-white leading-relaxed">
                  {currentSentence.translation}
                </p>
              </section>
            </div>

            {/* Feedback Message */}
            <div
              className={`
                  mb-4 md:mb-6 text-sm font-semibold 
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
              <span className="flex flex-col items-center justify-center font-bold gap-2 text-lg md:text-xl">
                <span className="text-center italic text-xl md:text-2xl">
                  “{currentSentence.sentence}”
                </span>
                {status === "correct" && (
                  <span className="text-blue-600 dark:text-blue-400 text-base font-medium flex items-center gap-1">
                    <span>✓</span> Correct attempt
                  </span>
                )}
              </span>
            </div>

            {/* Input */}
            <QuizGameInput
              handleSubmit={handleSubmit}
              // Force cast to RefObject<HTMLInputElement | null> if needed by strict types,
              // but we updated the type in QuizGameInput to accept specific types or Union.
              // However, inputRef here is specifically TextArea.
              inputRef={inputRef as any}
              status={status}
              inputStyles={`${inputStyles} text-left`}
              userAnswer={userAnswer}
              setUserAnswer={setUserAnswer}
              isTextArea={true}
              placeholder="Type German sentence here..."
              useMicrophone={true}
            />
          </div>
        </article>
      </div>
    </main>
  );
};
