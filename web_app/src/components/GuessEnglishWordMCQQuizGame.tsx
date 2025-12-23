"use client";

import Link from "next/link";
import { useEffect, useState, useCallback, useRef } from "react";
import { GermanWord } from "@/models/germanWord";
import {
  RandomGermanWordSelector,
  GetGermanWordsGroupLength,
  GetGermanWordsLenght,
  RandomGermanWordSelectorWithinRange,
} from "@/helper/RandomGermanWordSelector";
import { germanWords } from "@/data/germanWords";
import { useGoBack } from "@/hooks/useGoBack";
import { useSoundEffects } from "@/hooks/useSoundEffects";

const WORDS_GROUP_SIZE = 50;

export default function GuessEnglishWordMCQQuizGame() {
  const [currentWord, setCurrentWord] = useState<GermanWord | null>(null);
  const [options, setOptions] = useState<GermanWord[]>([]);
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    null,
  );

  // group system
  const [currentGroup, setCurrentGroup] = useState<number>(0);
  const totalGroups = GetGermanWordsGroupLength(WORDS_GROUP_SIZE);
  const [allIn, setAllIn] = useState<boolean>(false);

  const { playSound } = useSoundEffects();

  // adds shortcut to go back using backspace key
  useGoBack();

  // refrences of the options
  const option1Ref = useRef<HTMLButtonElement | null>(null);
  const option2Ref = useRef<HTMLButtonElement | null>(null);
  const option3Ref = useRef<HTMLButtonElement | null>(null);
  const option4Ref = useRef<HTMLButtonElement | null>(null);

  const generateOptions = (correct: GermanWord) => {
    // Get 3 random unique distractors
    const distractors: GermanWord[] = [];
    while (distractors.length < 3) {
      const randomWord = RandomGermanWordSelector();
      if (
        randomWord.germanWord !== correct.germanWord &&
        !distractors.find((w) => w.germanWord === randomWord.germanWord)
      ) {
        distractors.push(randomWord);
      }
    }
    // Shuffle options
    return [correct, ...distractors].sort(() => Math.random() - 0.5);
  };

  const handleNextWord = useCallback(() => {
    let newWord: GermanWord;
    if (allIn) newWord = RandomGermanWordSelector();
    else
      newWord = RandomGermanWordSelectorWithinRange(
        currentGroup * WORDS_GROUP_SIZE,
        (currentGroup + 1) * WORDS_GROUP_SIZE,
      );

    setCurrentWord(newWord);
    setOptions(generateOptions(newWord));
    setStatus("idle");
    setSelectedOptionIndex(null);
  }, [allIn, currentGroup]);

  // Initialize on mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    handleNextWord();
  }, [handleNextWord]);

  const handleOptionClick = useCallback(
    (word: GermanWord, index: number) => {
      if (status !== "idle" || !currentWord) return;

      setSelectedOptionIndex(index);

      if (word.germanWord === currentWord.germanWord) {
        setStatus("correct");
        playSound("correct");
      } else {
        setStatus("wrong");
        playSound("wrong");
      }

      setTimeout(() => {
        handleNextWord();
      }, 1500); // Faster transition for smooth gameplay
    },
    [status, currentWord, handleNextWord, playSound],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (status !== "idle") return;

      const keyMap: { [key: string]: number } = {
        "1": 0,
        "2": 1,
        "3": 2,
        "4": 3,
      };

      if (Object.prototype.hasOwnProperty.call(keyMap, e.key)) {
        const index = keyMap[e.key];
        if (options[index]) {
          const refs = [option1Ref, option2Ref, option3Ref, option4Ref];
          refs[index]?.current?.focus();
          // handleOptionClick(options[index], index);
        }
      }

      if (e.key == "ArrowLeft") {
        setCurrentGroup((prev) => Math.max(0, prev - 1));
      }

      if (e.key == "ArrowRight") {
        setCurrentGroup((prev) => Math.min(totalGroups - 1, prev + 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [status, options, handleOptionClick]);

  const displayMeaning = (text: string | string[]) => {
    return Array.isArray(text) ? text.join(", ") : text;
  };

  if (!currentWord) return null;

  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center p-4 md:p-6 bg-gray-50 dark:bg-[#121212]">
      <div className="w-full max-w-md lg:max-w-6xl space-y-4 md:space-y-8">
        {/* Header */}
        <header className="relative text-center space-y-1 md:space-y-2">
          <div className="absolute left-0 top-9">
            <Link
              href="/juwelen"
              className="p-1.5 md:p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#444444] text-gray-500 dark:text-[#B0B0B0] transition-colors inline-flex items-center justify-center"
              title="Back to Quiz Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              <span className="hidden md:inline text-sm font-semibold">
                Back to menu
              </span>
            </Link>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-[#E0E0E0]">
            Meaning Quiz (MCQ)
          </h1>
          <p className="text-xs md:text-sm text-gray-500 dark:text-[#B0B0B0] font-medium">
            Select the correct English meaning
          </p>
        </header>

        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-12 gap-4 items-center">
          {/* Left Side: Question Card */}
          <div className="w-full h-full bg-white dark:bg-[#121212] rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-[#444444]">
            <div className="p-5 md:p-8 text-center space-y-6">
              {/* Top Bar with Group Controls & Badge */}
              <div className="flex flex-col items-center justify-center gap-4 relative">
                {/* Group Controls */}
                <div
                  className={`
                  flex items-center justify-center gap-4 
                  bg-gray-50 dark:bg-[#1a1a1a] 
                  rounded-full px-4 py-1.5 
                  border border-gray-100 dark:border-[#333]
                  transition-all duration-300
                  ${
                    allIn
                      ? "opacity-30 grayscale pointer-events-none select-none"
                      : "opacity-100"
                  }
                `}
                >
                  <button
                    disabled={currentGroup === 0 || allIn}
                    onClick={() => {
                      setCurrentGroup(currentGroup - 1);
                      handleNextWord();
                    }}
                    className="
                    p-1 rounded-full 
                    text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 
                    disabled:opacity-30 disabled:cursor-not-allowed
                    transition-colors
                  "
                    title="Previous Group (Left Arrow)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
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

                  <span
                    title="Splits German words in groups of 50 so that words can learned easily."
                    className="text-xs font-semibold text-gray-500 dark:text-gray-400 font-mono"
                  >
                    Group {currentGroup + 1} / {totalGroups}
                  </span>

                  <button
                    onClick={() => {
                      setCurrentGroup(currentGroup + 1);
                      handleNextWord();
                    }}
                    disabled={currentGroup === totalGroups - 1 || allIn}
                    className="
                    p-1 rounded-full 
                    text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 
                    disabled:opacity-30 disabled:cursor-not-allowed
                    transition-colors
                  "
                    title="Next Group (Right Arrow)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
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

                {/* Tag and "All In" Toggle Container */}
                <div className="flex items-center justify-center gap-3 w-full">
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-400 bg-gray-100 dark:bg-[#1a1a1a] dark:text-gray-500 border border-gray-100 dark:border-[#333] px-2 py-0.5 rounded-md">
                    German Word
                    {currentWord && (
                      <span className="ml-1 text-gray-400 dark:text-gray-500">
                        #
                        {germanWords.findIndex(
                          (w) => w.germanWord === currentWord.germanWord,
                        ) + 1}
                      </span>
                    )}
                  </span>

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
                        onChange={(e) => {
                          const newValue = e.target.checked;
                          setAllIn(newValue);
                          handleNextWord();
                        }}
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
                </div>
              </div>

              {/* Main Content */}
              <div className="space-y-2">
                <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-[#E0E0E0] tracking-tight">
                  {currentWord?.article && (
                    <span className="text-gray-400 dark:text-gray-600 font-normal mr-2 text-2xl md:text-3xl align-middle">
                      {currentWord.article}
                    </span>
                  )}
                  {currentWord?.germanWord}
                </h2>

                <p className="text-sm md:text-base text-gray-400 dark:text-gray-500 font-medium">
                  (
                  {currentWord?.article
                    ? `${convertArticleInHindiPronuncation(
                        currentWord.article,
                      )} ${currentWord.hindiPronunciation}`
                    : currentWord?.hindiPronunciation}
                  )
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Options Column */}
          <div className="flex flex-col gap-3 w-full">
            {options.map((option, index) => {
              const isIdle = status === "idle";
              const isCorrect =
                status !== "idle" &&
                option.germanWord === currentWord.germanWord;

              const isWrong =
                status === "wrong" && index === selectedOptionIndex;

              const baseStyle =
                "w-full p-3 md:p-4 text-left rounded-xl border-2 transition-all duration-200 text-base md:text-lg font-medium flex items-center justify-between";

              const idleStyle =
                "bg-white dark:bg-[#121212] border-gray-200 dark:border-[#444444] hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-[#444444] cursor-pointer text-gray-700 dark:text-[#E0E0E0]";

              const correctStyle =
                "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300";

              const wrongStyle =
                "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300";

              const dimStyle =
                "opacity-50 border-gray-200 dark:border-[#444444] text-gray-500 dark:text-[#888888]";

              const buttonStyle = isIdle
                ? idleStyle
                : isCorrect
                ? correctStyle
                : isWrong
                ? wrongStyle
                : dimStyle;

              return (
                <button
                  key={index}
                  ref={
                    index === 0
                      ? option1Ref
                      : index === 1
                      ? option2Ref
                      : index === 2
                      ? option3Ref
                      : option4Ref
                  }
                  onClick={() => handleOptionClick(option, index)}
                  disabled={!isIdle}
                  className={`${baseStyle} ${buttonStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="hidden md:flex items-center justify-center w-6 h-6 border-2 border-inherit rounded-md text-sm font-bold opacity-60">
                      {index + 1}
                    </span>
                    <span>{displayMeaning(option.englishMeaning)}</span>
                  </div>

                  {/* Arrow only when clickable */}
                  {isIdle && (
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function convertArticleInHindiPronuncation(article: "der" | "die" | "das") {
  if (article === "der") return "डेर ";
  if (article === "die") return "डी ";
  if (article === "das") return "डास ";
}
