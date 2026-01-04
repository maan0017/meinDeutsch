"use client";
import { FC, KeyboardEvent, useEffect } from "react";

import { useSoundEffects } from "@/hooks/useSoundEffects";
import GermanSTT from "./GSTT";

interface QuizGameInputProps {
  handleSubmit: (e: React.FormEvent) => void;
  inputRef: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
  userAnswer: string;
  placeholder?: string;
  setUserAnswer: (answer: string) => void;
  status: "idle" | "correct" | "wrong";
  inputStyles: string;
  handleKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  isTextArea?: boolean;
  useMicrophone: boolean;
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
  isTextArea = false,
  useMicrophone = false,
}) => {
  const { playKeyboardSound } = useSoundEffects();

  const baseBg = status === "idle" ? "bg-white dark:bg-zinc-950" : "";

  return (
    <form onSubmit={handleSubmit} className="relative w-full mx-auto space-y-3">
      <div className="relative flex items-center">
        {isTextArea ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={userAnswer}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit({ preventDefault: () => {} } as React.FormEvent);
                return;
              }

              if (handleKeyDown) {
                handleKeyDown(e as unknown as KeyboardEvent<HTMLInputElement>);
              }
              playKeyboardSound(e.key);
            }}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder={placeholder}
            disabled={status !== "idle"}
            rows={1}
            className={`
              w-full px-4 py-3 pr-14
              ${baseBg}
              rounded-xl border-2 shadow-sm
              text-left leading-normal
              text-base md:text-lg font-medium
              placeholder:text-gray-400 dark:placeholder:text-zinc-500
              focus:outline-none focus:ring-2 focus:ring-blue-500
              disabled:opacity-60 disabled:cursor-not-allowed
              transition-all duration-200
              resize-none overflow-hidden
              ${inputStyles}
            `}
            style={{
              minHeight: "48px",
              maxHeight: "200px",
              height: "auto",
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "48px";
              target.style.height = `${Math.min(target.scrollHeight, 200)}px`;
            }}
            autoComplete="off"
            spellCheck="false"
            aria-label="German sentence input"
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
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
              w-full px-4 py-3 pr-14
              ${baseBg}
              rounded-xl border-2 shadow-sm
              text-center text-base md:text-lg font-medium
              placeholder:text-gray-400 dark:placeholder:text-zinc-500
              focus:outline-none focus:ring-2 focus:ring-blue-500
              disabled:opacity-60 disabled:cursor-not-allowed
              transition-all duration-200
              ${inputStyles}
            `}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            aria-label="German word input"
          />
        )}

        <div className="absolute right-2 bottom-2">
          {useMicrophone && (
            <GermanSTT
              onTranscript={setUserAnswer}
              disabled={status !== "idle"}
              className={
                status !== "idle" ? "opacity-50 rounded-xl" : "rounded-xl"
              }
            />
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={!userAnswer.trim() || status !== "idle"}
        className={`
          w-full px-6 py-3
          rounded-xl font-semibold text-base md:text-lg
          transition-all duration-200
          flex items-center justify-center gap-2
          ${
            !userAnswer.trim() || status !== "idle"
              ? "bg-gray-200 dark:bg-zinc-800 text-gray-400 dark:text-zinc-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white shadow-md hover:shadow-lg"
          }
        `}
      >
        <span>Submit Answer</span>
        {!isTextArea && (
          <span className="hidden md:inline-flex items-center px-2 py-0.5 text-xs font-mono bg-white/20 rounded border border-white/30">
            ENTER
          </span>
        )}
      </button>
    </form>
  );
};
