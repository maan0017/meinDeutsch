"use client";
import { FC, KeyboardEvent } from "react";

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
    <form onSubmit={handleSubmit} className="relative w-full mx-auto">
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
                  w-full px-4 py-2 md:px-5 md:py-3 
                  ${baseBg}
                  rounded-lg border shadow-sm 
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
    </form>
  );
};
