"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";
import { useGoBack } from "@/hooks/useGoBack";
import {
  GrammarQuestion,
  getRandomGrammarQuestion,
  getTotalQuestionsCount,
} from "@/helper/GrammarQuestionGenerator";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { HelpCircle } from "lucide-react";
import GrammarCheatSheet from "@/components/GrammarCheatSheet";
import { QuizGameInput } from "@/components/QuizGameInput";

export default function PracticeGrammarPage() {
  const [question, setQuestion] = useState<GrammarQuestion | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [showCheatSheet, setShowCheatSheet] = useState(false);

  // Progress tracking
  const [questionCount, setQuestionCount] = useState(1);
  const totalQuestions = useRef(0); // Store total once

  const inputRef = useRef<HTMLInputElement>(null);
  const { playSound } = useSoundEffects();

  useGoBack();

  useEffect(() => {
    // Initialize total count
    totalQuestions.current = getTotalQuestionsCount();
    loadNewQuestion();
  }, []);

  const loadNewQuestion = () => {
    setQuestion(getRandomGrammarQuestion());
    setUserAnswer("");
    setStatus("idle");
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleNext = () => {
    setQuestionCount((prev) => prev + 1);
    loadNewQuestion();
  };

  const handleSubmit = () => {
    if (!question || !userAnswer.trim() || status !== "idle") return;

    const isCorrect =
      userAnswer.trim().toLowerCase() === question.answer.toLowerCase();

    setStatus(isCorrect ? "correct" : "wrong");
    playSound(isCorrect ? "correct" : "wrong");

    // Auto-advance logic for both correct and wrong (after delay)
    // User requested: "after giving answer it should auto matically appears next que. after 3 secs"
    setTimeout(handleNext, 3000); // 3 seconds delay
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (status === "idle") {
        handleSubmit();
      }
      // If status is not idle (already answered), let the timeout handle it,
      // or we could allow skipping the wait.
      // User asked for auto-appear after 3 secs.
      // Let's allow manual skip too if user is impatient.
      else {
        // Clear existing timeout if we could track it, but simpler to just strictly wait?
        // Usually UI feels better if Enter skips wait.
        // But for now let's stick to simple strict 3s to match request precisely unless user specified otherwise.
      }
    }
  };

  if (!question) return null;

  const inputStyles =
    status === "correct"
      ? "border-green-500 text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20 focus:border-green-500 focus:ring-green-200 dark:focus:ring-green-800"
      : status === "wrong"
      ? "border-red-500 text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-800"
      : "border-gray-300 dark:border-[#444444] focus:border-blue-500 focus:ring-blue-200 dark:focus:ring-blue-800 hover:border-gray-400 dark:hover:border-[#888888]";

  const cardBorder =
    status === "correct"
      ? "border-green-500 ring-1 ring-green-500"
      : status === "wrong"
      ? "border-red-500 ring-1 ring-red-500"
      : "border-gray-200 dark:border-[#444444]";

  return (
    <div className="min-h-screen w-full flex flex-col items-center p-4 md:p-6 bg-slate-50 dark:bg-[#121212] transition-colors">
      <div className="w-full max-w-lg space-y-4 md:space-y-6">
        {/* Header */}
        <header className="flex items-center justify-between w-full">
          <Link
            href="/juwelen"
            className="group p-2 -ml-2 rounded-full hover:bg-slate-200 dark:hover:bg-[#1a1a1a] transition-all duration-300 text-slate-500 hover:text-slate-900 dark:text-[#B0B0B0] dark:hover:text-white"
            aria-label="Back to Menu"
          >
            <ArrowRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" />
          </Link>

          <div className="text-center">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Grammar Practice
            </h1>
            <div className="text-xs font-mono font-medium text-slate-400 dark:text-slate-500 mt-0.5">
              Question {questionCount} /{" "}
              {totalQuestions.current > 0 ? totalQuestions.current : "∞"}
            </div>
          </div>

          <button
            onClick={() => setShowCheatSheet(true)}
            className="p-2 -mr-2 text-slate-400 hover:text-blue-600 dark:text-[#888] dark:hover:text-blue-400 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-[#1a1a1a]"
            title="Grammar Cheat Sheet"
          >
            <HelpCircle className="w-6 h-6" />
          </button>
        </header>

        {showCheatSheet && (
          <GrammarCheatSheet onClose={() => setShowCheatSheet(false)} />
        )}

        {/* Card */}
        <div
          className={`
             bg-white dark:bg-[#1E1E1E] 
             rounded-2xl shadow-xl 
             border ${cardBorder}
             overflow-hidden 
             p-6 md:p-8 
             text-center space-y-6 
             transition-all duration-300
             animate-in fade-in slide-in-from-bottom-4
        `}
        >
          {/* Metadata */}
          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
              {question.category}
            </span>
            <p className="text-xs text-slate-400 dark:text-[#666] font-medium uppercase tracking-wide">
              {question.subCategory}
            </p>
          </div>

          {/* Question Text */}
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-[#E0E0E0] leading-tight mx-auto max-w-sm">
            {question.question}
          </h2>

          {/* Feedback Message */}
          <div
            className={`
                  h-14 flex items-center justify-center
                  transition-all duration-300
                  ${
                    status !== "idle"
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }
                `}
          >
            {status === "correct" && (
              <div className="flex flex-col items-center animate-in zoom-in duration-300">
                <span className="text-blue-600 text-lg font-medium">
                  ✓ Correct attempt
                </span>
              </div>
            )}

            {status === "wrong" && (
              <div className="flex flex-col items-center animate-in shake duration-300">
                <span className="text-sm font-bold text-red-500 dark:text-red-400 mb-1 uppercase tracking-wide">
                  Incorrect
                </span>
                <p className="text-slate-600 dark:text-slate-300 font-medium">
                  Answer:{" "}
                  <span className="text-slate-900 dark:text-white font-bold underline decoration-red-500/50 decoration-2 underline-offset-2">
                    {question.answer}
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="relative max-w-xs mx-auto w-full">
            <QuizGameInput
              handleSubmit={handleSubmit}
              inputRef={inputRef}
              userAnswer={userAnswer}
              setUserAnswer={setUserAnswer}
              status={status}
              placeholder="Type answer..."
              inputStyles={inputStyles}
              handleKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
