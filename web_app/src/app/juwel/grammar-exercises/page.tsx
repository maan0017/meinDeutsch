"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { grammarExercises } from "@/data/grammarExercises";
import { Check, X, ArrowRight, RotateCcw } from "lucide-react";
import { useGoBack } from "@/hooks/useGoBack";
import { QuizGameInput } from "@/components/QuizGameInput";

export default function GrammarExercisesPage() {
  const [shuffledIndices, setShuffledIndices] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  useGoBack();

  // Initialize random order on mount
  useEffect(() => {
    const indices = Array.from(
      { length: grammarExercises.length },
      (_, i) => i
    );
    const shuffled = indices.sort(() => Math.random() - 0.5);
    setShuffledIndices(shuffled);
  }, []);

  const currentExerciseIndex = shuffledIndices[currentIndex];
  // Guard against initial render before shuffle
  const currentExercise =
    currentExerciseIndex !== undefined
      ? grammarExercises[currentExerciseIndex]
      : grammarExercises[0];

  const isLastQuestion = currentIndex === grammarExercises.length - 1;

  const handleAdvance = useCallback(() => {
    if (isLastQuestion) {
      setShowResult(true);
    } else {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setStatus("idle");
        setUserAnswer("");
        setIsAnimating(false);
      }, 300); // Wait for fade out animation
    }
  }, [isLastQuestion]);

  const handleCheck = () => {
    if (!userAnswer.trim()) return;

    const isCorrect =
      userAnswer.trim().toLowerCase() === currentExercise.answer.toLowerCase();

    if (isCorrect) {
      setStatus("correct");
      setScore((prev) => prev + 1);
    } else {
      setStatus("wrong");
    }

    // Auto advance after 3 seconds
    setTimeout(() => {
      handleAdvance();
    }, 3000);
  };

  const handleOptionClick = (option: string) => {
    if (status !== "idle") return;

    setUserAnswer(option);
    const isCorrect =
      option.toLowerCase() === currentExercise.answer.toLowerCase();

    if (isCorrect) {
      setStatus("correct");
      setScore((prev) => prev + 1);
    } else {
      setStatus("wrong");
    }

    // Auto advance after 3 seconds
    setTimeout(() => {
      handleAdvance();
    }, 3000);
  };

  const handleRestart = () => {
    // Re-shuffle on restart
    const indices = Array.from(
      { length: grammarExercises.length },
      (_, i) => i
    );
    const shuffled = indices.sort(() => Math.random() - 0.5);
    setShuffledIndices(shuffled);

    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
    setStatus("idle");
    setUserAnswer("");
  };

  if (!currentExercise) return null;

  if (showResult) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-[#121212]">
        <div className="w-full max-w-md bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-xl p-8 text-center space-y-6 border border-slate-100 dark:border-[#333]">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            Quiz Complete!
          </h2>
          <div className="text-6xl font-black text-blue-600 dark:text-blue-400">
            {score} / {grammarExercises.length}
          </div>
          <p className="text-slate-500 dark:text-[#B0B0B0]">
            Grammar Exercises Completed
          </p>

          <div className="flex flex-col gap-3 pt-4">
            <button
              onClick={handleRestart}
              className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              Restart Quiz
            </button>
            <Link
              href="/juwelen"
              className="flex items-center justify-center gap-2 w-full py-3 bg-slate-100 hover:bg-slate-200 dark:bg-[#2A2A2A] dark:hover:bg-[#333] text-slate-700 dark:text-slate-200 rounded-xl font-semibold transition-colors"
            >
              Back to Menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen w-full flex flex-col items-center p-4 md:p-8 bg-slate-50 dark:bg-[#121212] transition-colors">
      <div className="w-full max-w-lg space-y-4">
        {/* Header */}
        <header className="flex items-center justify-between w-full mb-4 relative">
          <div className="shrink-0">
            <Link
              href="/juwelen"
              className="p-1.5 md:p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#444444] text-gray-500 dark:text-[#B0B0B0] transition-colors inline-flex items-center justify-center"
              title="Back to Quiz Menu"
            >
              <ArrowRight className="w-6 h-6 rotate-180" />
            </Link>
          </div>
          <div className="flex-1 text-center px-4">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-[#E0E0E0]">
              Grammar Exercises
            </h1>
            <p className="text-xs md:text-sm text-gray-500 dark:text-[#B0B0B0] font-medium mt-1">
              {currentExercise.type} • {currentExercise.category}
            </p>
          </div>
          <div className="text-sm font-semibold text-slate-400 dark:text-[#666] w-8 text-right">
            {currentIndex + 1}/{grammarExercises.length}
          </div>
        </header>

        {/* Question Card */}
        <div
          className={`relative overflow-hidden rounded-xl bg-white dark:bg-[#1E1E1E] px-4 py-4 md:px-6 md:py-8 shadow-lg border transition-all duration-300 ${cardBorder} ${
            isAnimating
              ? "opacity-0 translate-x-10"
              : "opacity-100 translate-x-0"
          }`}
        >
          <div className="space-y-8">
            {/* Question Text */}
            <div className="text-center space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-[#E0E0E0] leading-relaxed">
                {currentExercise.question
                  .split("______")
                  .map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span className="inline-block border-b-2 border-slate-300 dark:border-[#555] min-w-[3ch] mx-1 text-blue-600 dark:text-blue-400">
                          {status !== "idle" ? currentExercise.answer : "?"}
                        </span>
                      )}
                    </span>
                  ))}
              </h2>
              {currentExercise.hint && (
                <p className="text-sm text-slate-400 dark:text-[#666] font-medium italic">
                  Hint: {currentExercise.hint}
                </p>
              )}
            </div>

            {/* Feedback Message */}
            <div
              className={`
                  text-sm font-semibold 
                  transition-all duration-300 transform
                  ${
                    status !== "idle"
                      ? "opacity-100 translate-y-0 h-auto mb-4"
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
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    status === "correct"
                      ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                  }`}
                >
                  {status === "correct" ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <X className="w-5 h-5" />
                  )}
                </div>
                <span className="text-lg font-bold">
                  {status === "correct" ? "Excellent!" : "Not quite right..."}
                </span>
                <p className="text-slate-600 dark:text-slate-300 text-center font-normal">
                  {currentExercise.explanation}
                </p>
                {status === "wrong" && (
                  <p className="text-sm font-semibold mt-1 text-slate-900 dark:text-white">
                    Correct answer:{" "}
                    <span className="underline">{currentExercise.answer}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Input Area */}
            <div className="flex flex-col gap-4 max-w-md mx-auto">
              {currentExercise.options ? (
                // Multiple Choice
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentExercise.options.map((option, idx) => {
                    let btnStyle =
                      "border-slate-200 dark:border-[#444] hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-[#333]";

                    if (status !== "idle") {
                      if (
                        option.toLowerCase() ===
                        currentExercise.answer.toLowerCase()
                      ) {
                        btnStyle =
                          "bg-green-100 border-green-500 text-green-700 dark:bg-green-900/30 dark:border-green-500 dark:text-green-400";
                      } else if (option === userAnswer) {
                        btnStyle =
                          "bg-red-100 border-red-500 text-red-700 dark:bg-red-900/30 dark:border-red-500 dark:text-red-400";
                      } else {
                        btnStyle = "opacity-50 pointer-events-none";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleOptionClick(option)}
                        disabled={status !== "idle"}
                        className={`p-4 rounded-xl border-2 text-lg font-medium transition-all ${btnStyle} text-slate-700 dark:text-slate-200`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              ) : (
                // Text Input
                <QuizGameInput
                  status={status}
                  userAnswer={userAnswer}
                  setUserAnswer={setUserAnswer}
                  placeholder="Type answer..."
                  handleSubmit={(e) => {
                    e.preventDefault();
                    handleCheck();
                  }}
                  inputRef={inputRef}
                  inputStyles={inputStyles}
                  useMicrophone={false}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
