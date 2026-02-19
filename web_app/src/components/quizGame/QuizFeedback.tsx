import React from "react";
import { GermanWord } from "@/models/germanWord";
import { convertArticleInHindiPronuncation } from "@/utils/utils";
import { germanWords } from "@/data/germanWords";

interface QuizFeedbackProps {
  status: "idle" | "correct" | "wrong";
  word: GermanWord | null;
}

export const QuizFeedback = ({ status, word }: QuizFeedbackProps) => {
  if (!word) return null;

  return (
    <div
      className={`my-4 text-xs md:text-sm font-semibold transition-all duration-300 transform 
        flex flex-col items-center gap-4
        ${
          status !== "idle"
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 h-0 overflow-hidden"
        }
        ${
          status === "correct"
            ? "text-green-600 dark:text-green-400"
            : "text-red-500 dark:text-red-400"
        }`}
      role="alert"
    >
      {/* Current Word Indicator */}
      <div className="w-full flex items-center gap-3 dark:border-white/7 overflow-hidden mt-2">
        <div className="h-px flex-1 bg-linear-to-r from-transparent via-gray-200 to-transparent dark:via-white/10" />
        <span className="inline-block rounded border border-gray-200 bg-gray-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:border-white/8 dark:bg-white/4 dark:text-white/35">
          German Word
          {word.germanWord && (
            <span
              className="text-[10px] font-mono font-semibold
          text-gray-400 dark:text-gray-500 leading-none
          px-1.5 py-0.5 rounded"
            >
              #
              {germanWords.findIndex((w) => w.germanWord === word.germanWord) +
                1}
            </span>
          )}
        </span>
        <div className="h-px flex-1 bg-linear-to-r from-transparent via-gray-200 to-transparent dark:via-white/10" />
      </div>

      {status === "correct" ? (
        <span className="flex flex-col items-center justify-start font-bold gap-0.5 md:gap-1 text-base md:text-xl">
          {/* Word */}
          <span className="text-base md:text-xl leading-tight">
            “
            {word.article
              ? `${word.article} ${word.germanWord}`
              : word.germanWord}
            ”
          </span>

          {/* Pronunciation */}
          <span className="text-xs md:text-base text-slate-500 leading-tight">
            (
            {word.article
              ? `${convertArticleInHindiPronuncation(word.article)} ${
                  word.hindiPronunciation
                }`
              : word.hindiPronunciation}
            )
          </span>

          {/* Success Text */}
          <span className="text-sm md:text-lg text-blue-600 font-medium">
            ✓ Correct
          </span>
        </span>
      ) : (
        <span className="flex flex-col items-center text-base md:text-xl font-bold text-center gap-0.5 md:gap-1">
          {/* Word */}
          <span className="text-base md:text-xl leading-tight">
            “
            {word.article
              ? `${word.article} ${word.germanWord}`
              : word.germanWord}
            ”
          </span>

          {/* Pronunciation */}
          <span className="text-xs md:text-base text-slate-500 leading-tight">
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
  );
};
