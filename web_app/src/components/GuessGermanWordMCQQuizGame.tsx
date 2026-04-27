"use client";

import Link from "next/link";
import { useEffect, useState, useCallback, useRef } from "react";
import { GermanWord } from "@/models/germanWord";
import { RandomGermanWordSelector } from "@/helper/RandomGermanWordSelector";
import { germanWords } from "@/data/germanWords";
import { useGoBack } from "@/hooks/useGoBack";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { convertArticleInHindiPronuncation } from "@/utils/utils";
import { QuizGroupControls } from "./quizGame/QuizGroupControls";
import { useGroupSystem } from "@/hooks/quizGame/useGroupSystem";
import { useBookmark } from "@/hooks/useBookmark";

const SAVED_STATE_CURRENT_GROUP = "gem_guess_german_word_mcq_current_group";
const SAVED_STATE_ALL_IN = "gem_guess_german_word_mcq_all_in";
const SAVED_STATE_STRICT_MODE = "gem_guess_german_word_mcq_strict_mode";
const SAVED_STATE_REVERSE_MODE = "gem_guess_german_word_mcq_reverse_mode";
const SAVED_STATE_BOOKMARKED_ONLY = "gem_guess_german_word_mcq_bookmarked_only";
const BOOKMARK_NAME = "GUESS_GERMAN_WORD_MCQ_QUIZ_GAME_BOOKMARKED_WORDS";

export default function GuessGermanWordMCQQuizGame() {
  const [currentWord, setCurrentWord] = useState<GermanWord | null>(null);
  const [options, setOptions] = useState<GermanWord[]>([]);
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    null
  );
  const [isReverseMode, setIsReverseMode] = useState(false);
  const [playBookmarkedOnly, setPlayBookmarkedOnly] = useState(false);
  const [bookmarkedWords, setBookmarkedWords] = useState<string[]>([]);
  const { getBookmarkStrings } = useBookmark(BOOKMARK_NAME);

  // Poll bookmarks periodically
  useEffect(() => {
    const updateBookmarks = () => {
      setBookmarkedWords((prev) => {
        const next = getBookmarkStrings();
        if (prev.length !== next.length || prev.some((v, i) => v !== next[i])) {
          return next;
        }
        return prev;
      });
    };
    updateBookmarks();
    const interval = setInterval(updateBookmarks, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // logic to track unseen words
  const [seenIndices, setSeenIndices] = useState<Set<number>>(new Set());

  // group system
  const {
    currentGroup,
    setCurrentGroup,
    totalGroups,
    allIn,
    setAllIn,
    isInitialized,
    moveToNextGroup,
    moveToPrevGroup,
    groupSize,
  } = useGroupSystem(
    SAVED_STATE_CURRENT_GROUP,
    SAVED_STATE_ALL_IN,
    SAVED_STATE_STRICT_MODE
  );

  const { playSound } = useSoundEffects();

  // adds shortcut to go back using backspace key
  useGoBack();

  // Save state to local storage when changed (only after initialization)
  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem(SAVED_STATE_CURRENT_GROUP, String(currentGroup));
    localStorage.setItem(SAVED_STATE_ALL_IN, String(allIn));
  }, [currentGroup, allIn, isInitialized]);

  useEffect(() => {
    const saved = localStorage.getItem(SAVED_STATE_REVERSE_MODE);
    if (saved !== null) {
      setIsReverseMode(saved === "true");
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(SAVED_STATE_BOOKMARKED_ONLY);
    if (saved !== null) {
      setPlayBookmarkedOnly(saved === "true");
    }
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem(
      SAVED_STATE_BOOKMARKED_ONLY,
      String(playBookmarkedOnly)
    );
  }, [playBookmarkedOnly, isInitialized]);

  const toggleReverseMode = () => {
    setIsReverseMode((prev) => {
      const next = !prev;
      localStorage.setItem(SAVED_STATE_REVERSE_MODE, String(next));
      return next;
    });
  };

  // Reset seen words when group or mode changes
  useEffect(() => {
    setSeenIndices(new Set());
  }, [currentGroup, allIn]);

  // refrences of the options
  const option1Ref = useRef<HTMLButtonElement | null>(null);
  const option2Ref = useRef<HTMLButtonElement | null>(null);
  const option3Ref = useRef<HTMLButtonElement | null>(null);
  const option4Ref = useRef<HTMLButtonElement | null>(null);

  const generateOptions = useCallback((correct: GermanWord) => {
    // Get 3 random unique distractors
    const distractors: GermanWord[] = [];
    let attempts = 0;
    while (distractors.length < 3 && attempts < 50) {
      attempts++;
      const randomWord = RandomGermanWordSelector();
      if (
        randomWord.germanWord !== correct.germanWord &&
        !distractors.some((w) => w.germanWord === randomWord.germanWord)
      ) {
        distractors.push(randomWord);
      }
    }
    // Shuffle options using Fisher-Yates
    const options = [correct, ...distractors];
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
  }, []);

  const handleNextWord = useCallback(
    (forceReset = false) => {
      let availableIndices: number[] = [];
      const indicesToCheck = forceReset ? new Set<number>() : seenIndices;

      if (playBookmarkedOnly) {
        if (bookmarkedWords.length === 0) {
          setPlayBookmarkedOnly(false);
          return;
        }

        for (let i = 0; i < germanWords.length; i++) {
          if (
            bookmarkedWords.includes(germanWords[i].germanWord) &&
            !indicesToCheck.has(i)
          ) {
            availableIndices.push(i);
          }
        }

        if (availableIndices.length === 0) {
          availableIndices = [];
          for (let i = 0; i < germanWords.length; i++) {
            if (bookmarkedWords.includes(germanWords[i].germanWord)) {
              availableIndices.push(i);
            }
          }
          if (!forceReset) {
            setSeenIndices(new Set());
          }
        }
      } else {
        let start, end;
        let validGroup = currentGroup;
        if (validGroup >= totalGroups) {
          validGroup = 0;
          setCurrentGroup(0);
        }

        if (!allIn) {
          start = validGroup * groupSize;
          end = Math.min((validGroup + 1) * groupSize, germanWords.length);
        } else {
          start = 0;
          end = germanWords.length;
        }

        for (let i = start; i < end; i++) {
          if (!indicesToCheck.has(i)) {
            availableIndices.push(i);
          }
        }

        // If all words seen, reset
        if (availableIndices.length === 0) {
          availableIndices = [];
          for (let i = start; i < end; i++) {
            availableIndices.push(i);
          }
          if (!forceReset) {
            setSeenIndices(new Set());
          }
        }
      }

      if (availableIndices.length === 0) return; // Safeguard

      // Pick random from available
      const randomIndex = Math.floor(Math.random() * availableIndices.length);
      const selectedOriginalIndex = availableIndices[randomIndex];

      // Update seen indices
      setSeenIndices((prev) => {
        const newSet = forceReset ? new Set<number>() : new Set(prev);
        newSet.add(selectedOriginalIndex);
        return newSet;
      });

      const newWord = germanWords[selectedOriginalIndex];
      if (!newWord) return; // safeguard

      setCurrentWord(newWord);
      setOptions(generateOptions(newWord));
      setStatus("idle");
      setSelectedOptionIndex(null);
    },
    [
      allIn,
      currentGroup,
      groupSize,
      seenIndices,
      totalGroups,
      generateOptions,
      playBookmarkedOnly,
      bookmarkedWords,
    ]
  );

  // Sync state changes (Group/AllIn) -> Next Word
  useEffect(() => {
    if (isInitialized) {
      handleNextWord(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentGroup, allIn, isInitialized, playBookmarkedOnly]);

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

      const isMobile = window.innerWidth < 768;
      setTimeout(
        () => {
          handleNextWord();
        },
        isMobile ? 1000 : 1500
      ); // Faster transition for smooth gameplay
    },
    [status, currentWord, handleNextWord, playSound]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

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
          handleOptionClick(options[index], index);
        }
      }

      if (e.key == "ArrowLeft" && !allIn) {
        setCurrentGroup((prev) => Math.max(0, prev - 1));
      }

      if (e.key == "ArrowRight" && !allIn) {
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

  const currentGroupStart = allIn ? 0 : currentGroup * groupSize;
  const currentGroupEnd = allIn
    ? germanWords.length
    : Math.min((currentGroup + 1) * groupSize, germanWords.length);

  const totalWordsInCurrentGroup = playBookmarkedOnly
    ? bookmarkedWords.length
    : currentGroupEnd - currentGroupStart;

  let count = 0;
  for (const i of seenIndices) {
    if (playBookmarkedOnly) {
      if (bookmarkedWords.includes(germanWords[i].germanWord)) count++;
    } else {
      if (i >= currentGroupStart && i < currentGroupEnd) count++;
    }
  }

  const completedWords = Math.max(0, count - 1 + (status !== "idle" ? 1 : 0));
  const remainingWordsInGroup = Math.max(
    0,
    totalWordsInCurrentGroup - completedWords
  );

  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center p-4 md:p-6 bg-gray-50 dark:bg-[#121212]">
      <div className="w-full max-w-md lg:max-w-6xl space-y-4 md:space-y-8 z-10">
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
            Select the correct{" "}
            {isReverseMode ? "German word" : "English meaning"}
          </p>
          <div className="flex justify-center pt-2">
            <button
              onClick={toggleReverseMode}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors flex items-center gap-1.5 ${
                isReverseMode
                  ? "bg-purple-100 border-purple-300 text-purple-700 dark:bg-purple-900/30 dark:border-purple-700 dark:text-purple-300"
                  : "bg-gray-100 border-gray-200 text-gray-600 dark:bg-[#2A2A2A] dark:border-[#444] dark:text-[#B0B0B0]"
              }`}
              title="Toggle Reverse Mode (English/Hindi -> German)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 2v6h-6" />
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 22v-6h6" />
                <path d="M21 12a9 9 0 1 0-9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
              </svg>
              {isReverseMode ? "Reverse Mode: ON" : "Reverse Mode: OFF"}
            </button>
          </div>
        </header>

        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-12 gap-4 items-center">
          {/* Left Side: Question Card */}
          <div className="w-full h-full bg-white dark:bg-[#121212] rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-[#444444]">
            <div className="p-5 md:p-8 text-center space-y-6">
              {/* Top Bar with Group Controls & Badge */}
              <div className="flex flex-col items-center justify-center gap-4 relative">
                <QuizGroupControls
                  allIn={allIn}
                  setAllIn={setAllIn}
                  currentGroup={currentGroup}
                  totalGroups={totalGroups}
                  groupSize={groupSize}
                  setCurrentGroup={setCurrentGroup}
                  moveToNextGroup={moveToNextGroup}
                  moveToPrevGroup={moveToPrevGroup}
                  remainingWords={remainingWordsInGroup}
                  wordGerman={currentWord?.germanWord || ""}
                  BOOKMARK_NAME={BOOKMARK_NAME}
                  playBookmarkedOnly={playBookmarkedOnly}
                  setPlayBookmarkedOnly={setPlayBookmarkedOnly}
                  isBookmarkedListEmpty={bookmarkedWords.length === 0}
                />

                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-400 bg-gray-100 dark:bg-[#1a1a1a] dark:text-gray-500 border border-gray-100 dark:border-[#333] px-2 py-0.5 rounded-md">
                  {isReverseMode ? "Meaning" : "German Word"}
                  {currentWord && (
                    <span className="ml-1 text-gray-400 dark:text-gray-500">
                      #
                      {germanWords.findIndex(
                        (w) => w.germanWord === currentWord.germanWord
                      ) + 1}
                    </span>
                  )}
                </span>
              </div>

              {/* Main Content */}
              <div className="space-y-2">
                <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-[#E0E0E0] tracking-tight">
                  {!isReverseMode ? (
                    <>
                      {currentWord?.article && (
                        <span className="text-gray-400 dark:text-gray-600 font-normal mr-2 text-2xl md:text-3xl align-middle">
                          {currentWord.article}
                        </span>
                      )}
                      {currentWord?.germanWord}
                    </>
                  ) : (
                    <span className="text-2xl md:text-4xl">
                      {currentWord &&
                        displayMeaning(currentWord.englishMeaning)}
                    </span>
                  )}
                </h2>

                <p className="text-sm md:text-base text-gray-400 dark:text-gray-500 font-medium">
                  {!isReverseMode ? (
                    <>
                      (
                      {currentWord?.article
                        ? `${convertArticleInHindiPronuncation(
                            currentWord.article
                          )} ${currentWord.hindiPronunciation}`
                        : currentWord?.hindiPronunciation}
                      )
                    </>
                  ) : (
                    <>
                      {currentWord && displayMeaning(currentWord.hindiMeaning)}
                    </>
                  )}
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
                "w-full p-3 md:p-4 text-left rounded-xl border-2 transition-all duration-200 text-base md:text-lg font-medium flex items-center justify-between z-10 active:scale-[0.98]";

              const idleStyle =
                "bg-white dark:bg-[#121212] border-gray-200 dark:border-[#444444] hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-[#1E293B] cursor-pointer text-gray-700 dark:text-[#E0E0E0]  z-10";

              const correctStyle =
                "border-green-500 bg-green-50 dark:bg-[#14301c] text-green-700 dark:text-green-300  z-10";

              const wrongStyle =
                "border-red-500 bg-red-50 dark:bg-[#381616] text-red-700 dark:text-red-300  z-10";

              const dimStyle =
                "bg-gray-50 dark:bg-[#181818] border-gray-200 dark:border-[#333333] text-gray-400 dark:text-[#666666] z-10";

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
                  className={`${baseStyle} ${buttonStyle} z-10`}
                >
                  <div className="flex items-center gap-3">
                    <span className="hidden md:flex items-center justify-center w-6 h-6 border-2 border-inherit rounded-md text-sm font-bold opacity-60">
                      {index + 1}
                    </span>
                    <span>
                      {!isReverseMode
                        ? displayMeaning(option.englishMeaning) +
                          "  /  " +
                          displayMeaning(option.hindiMeaning)
                        : (option.article ? option.article + " " : "") +
                          option.germanWord}
                    </span>
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
