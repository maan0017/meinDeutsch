import React from "react";
import { BookmarkComp } from "../BookmarkComp";
import { germanWords } from "@/data/germanWords";

interface QuizGroupControlsProps {
  currentGroup: number;
  totalGroups: number;
  groupSize: number;
  allIn: boolean;
  setAllIn: (value: boolean) => void;
  strictMode: boolean;
  setStrictMode: (value: boolean) => void;
  moveToNextGroup: () => void;
  moveToPrevGroup: () => void;
  setCurrentGroup: (value: number) => void;
  remainingWords: number;
  wordGerman: string;
}

export const QuizGroupControls = ({
  currentGroup,
  totalGroups,
  groupSize,
  allIn,
  setAllIn,
  strictMode,
  setStrictMode,
  moveToNextGroup,
  moveToPrevGroup,
  setCurrentGroup,
  remainingWords,
  wordGerman,
}: QuizGroupControlsProps) => {
  return (
    <div className="flex flex-col items-center justify-start gap-1 md:gap-2 relative">
      {/* Group Controls Row */}
      <div className="flex w-full items-center justify-between gap-4">
        {/* Left — Words Remaining */}
        <span
          className="flex items-center justify-center w-10 h-10
               text-sm font-semibold rounded-full
               bg-gray-50 dark:bg-gray-700
               text-gray-800 dark:text-gray-100"
          title="Words remaining in this group"
        >
          {remainingWords}
        </span>

        {/* Center — Group Navigator */}
        <div className="flex flex-1 items-center justify-center min-w-0">
          <div
            className={`
              flex items-center justify-between
              h-9 md:h-10 w-full max-w-[260px]
              bg-white dark:bg-zinc-900
              border border-gray-200 dark:border-zinc-800
              rounded-full
              transition-opacity duration-200
              mx-auto
              ${
                allIn
                  ? "opacity-50 pointer-events-none select-none grayscale"
                  : "opacity-100"
              }
            `}
          >
            {/* Prev */}
            <button
              disabled={currentGroup === 0 || allIn}
              onClick={moveToPrevGroup}
              title="Previous Group"
              className="
                flex items-center justify-center
                h-full w-9 md:w-10 rounded-l-full
                text-gray-400 hover:text-gray-600 dark:text-zinc-500 dark:hover:text-zinc-300
                hover:bg-gray-50 dark:hover:bg-white/5
                disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent
                transition-colors
              "
            >
              <svg
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

            {/* Dropdown Selector */}
            <div className="relative flex-1 h-full min-w-0 border-x border-gray-100 dark:border-zinc-800">
              <select
                disabled={allIn}
                value={currentGroup}
                onChange={(e) => setCurrentGroup(Number(e.target.value))}
                className="
                  appearance-none w-full h-full pl-2 pr-7 bg-transparent
                  text-[11px] md:text-xs font-bold uppercase tracking-wider text-center
                  text-gray-600 dark:text-gray-300 truncate
                  focus:outline-none cursor-pointer"
                title="Select Group"
              >
                {Array.from({ length: totalGroups }).map((_, idx) => {
                  const start = idx * groupSize + 1;
                  const end = Math.min(
                    (idx + 1) * groupSize,
                    germanWords.length
                  );
                  return (
                    <option
                      key={idx}
                      value={idx}
                      className="text-gray-900 bg-white dark:bg-zinc-900 dark:text-gray-200"
                    >
                      Group {idx + 1} ({start}-{end}) /{" "}
                      {Math.ceil(germanWords.length / groupSize)}
                    </option>
                  );
                })}
              </select>

              {/* Custom Arrow Icon */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-400 dark:text-zinc-600">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>

            {/* Next */}
            <button
              disabled={currentGroup === totalGroups - 1 || allIn}
              onClick={moveToNextGroup}
              title="Next Group"
              className="
                flex items-center justify-center
                h-full w-9 md:w-10 rounded-r-full
                text-gray-400 hover:text-gray-600 dark:text-zinc-500 dark:hover:text-zinc-300
                hover:bg-gray-50 dark:hover:bg-white/5
                disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent
                transition-colors
              "
            >
              <svg
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
        </div>

        {/* Right — Bookmark */}
        <div className="justify-self-end">
          <BookmarkComp word={wordGerman} />
        </div>
      </div>

      {/* Settings Toggles */}
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
              onChange={(e) => setAllIn(e.target.checked)}
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
                strictMode
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
              onChange={(e) => setStrictMode(e.target.checked)}
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
  );
};
