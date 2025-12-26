"use client";
import { FC, KeyboardEvent } from "react";
import { ArrowRight } from "lucide-react";

import { useSoundEffects } from "@/hooks/useSoundEffects";

interface QuizGameInputProps {
  handleSubmit: (e: React.FormEvent) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  userAnswer: string;
  placeholder?: string;
  setUserAnswer: (answer: string) => void;
  status: "idle" | "correct" | "wrong";
  inputStyles: string;
  handleKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export const QuizGameInput: FC<QuizGameInputProps> = ({
  handleSubmit,
  inputRef,
  userAnswer,
  setUserAnswer,
  status,
  placeholder = "Type German word...",
  inputStyles,
  handleKeyDown = undefined,
}) => {
  const { playKeyboardSound } = useSoundEffects();

  const baseBg = status === "idle" ? "bg-white dark:bg-zinc-950" : "";

  return (
    <form onSubmit={handleSubmit} className="relative w-full mx-auto space-y-3">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={userAnswer}
          onKeyDown={(e) => {
            if (handleKeyDown) {
              handleKeyDown(e);
            }
            playKeyboardSound(e.key);
          }}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder={placeholder}
          disabled={status !== "idle"}
          className={`
        w-full px-4 py-3 md:px-5 md:py-4
        ${baseBg}
        rounded-xl border-2 shadow-sm
        text-center text-base md:text-lg font-medium
        placeholder:text-gray-400 dark:placeholder:text-zinc-500
        focus:outline-none focus:ring-4 focus:ring-opacity-20
        disabled:opacity-60 disabled:cursor-not-allowed
        transition-all duration-200
        ${inputStyles}
      `}
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          aria-label="German word input"
        />

        {/* Status indicator (if needed) */}
        {status !== "idle" && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {/* Your status icon here */}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={!userAnswer.trim() || status !== "idle"}
        className={`
      w-full px-6 py-3 md:py-4
      rounded-xl font-semibold text-base md:text-lg
      transition-all duration-200
      flex items-center justify-center gap-2
      ${
        !userAnswer.trim() || status !== "idle"
          ? "bg-gray-200 dark:bg-zinc-800 text-gray-400 dark:text-zinc-600 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-95"
      }
    `}
      >
        <span>Submit Answer</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </form>
  );
};
