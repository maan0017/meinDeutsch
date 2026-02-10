"use client";

import { useState, useEffect, useMemo, memo, useCallback, useRef } from "react";
import GermanSTT from "@/components/GSTT";
import { RotateCcw } from "lucide-react";
import { germanParagraphs } from "@/data/germanParagraphs";
import Link from "next/link";
import STT from "./STT";
import { numberToGerman } from "@/utils/germanNumbers";

// Memoized Word Component
const Word = memo(
  ({
    word,
    status,
  }: {
    word: string;
    status: "completed" | "skipped" | "current" | "pending";
  }) => {
    const className = useMemo(() => {
      let base = "inline-block mr-2 transition-colors duration-200 ";

      switch (status) {
        case "completed":
          return base + "text-gray-900 dark:text-gray-100 not-italic";
        case "skipped":
          return (
            base +
            "text-amber-500 dark:text-amber-500 line-through decoration-amber-300/50 dark:decoration-amber-500/30"
          );
        case "current":
          return (
            base +
            "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 not-italic font-medium bg-blue-50/50 dark:bg-blue-900/20 rounded-xs px-0.5 -mx-0.5"
          );
        default:
          return base + "text-gray-400 dark:text-gray-600";
      }
    }, [status]);

    return <span className={className}>{word}</span>;
  }
);

Word.displayName = "Word";

// Normalize function for consistent comparison
const normalizeWord = (word: string) => {
  return word
    .toLowerCase()
    .normalize("NFD") // Decompose umlauts
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^a-z0-9]/gi, "") // Remove punctuation
    .trim();
};

export const ReadParagraph = () => {
  const [paragraph, setParagraph] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [processedLength, setProcessedLength] = useState(0); // Track what we've already processed
  const lastProcessedWordRef = useRef(""); // Track last processed word to avoid duplicates
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [completedWords, setCompletedWords] = useState(new Set<number>());
  const [skippedWords, setSkippedWords] = useState(new Set<number>());
  const [accuracy, setAccuracy] = useState(100);
  const [currentWordAttempts, setCurrentWordAttempts] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [sttEngine, setSttEngine] = useState<"native" | "german">("german");
  const [trigger, setTrigger] = useState<number>(0);

  // Initialize paragraph
  useEffect(() => {
    const randomParagraph =
      germanParagraphs[Math.floor(Math.random() * germanParagraphs.length)];
    setParagraph(randomParagraph);
  }, []);

  // Calculate accuracy
  useEffect(() => {
    if (!paragraph) return;
    if (totalAttempts > 0) {
      setAccuracy(Math.round((completedWords.size / totalAttempts) * 100));
    } else {
      setAccuracy(100);
    }
  }, [completedWords, totalAttempts, paragraph]);

  // Memoize words and tokens
  const words = useMemo(() => paragraph.trim().split(/\s+/), [paragraph]);

  // Process transcript changes - OPTIMIZED
  useEffect(() => {
    if (!userAnswer || !paragraph || currentWordIndex >= words.length) return;

    const transcriptWords = userAnswer.trim().split(/\s+/);
    if (transcriptWords.length === 0) return;

    const lastWord = transcriptWords[transcriptWords.length - 1].trim();

    // Skip if we already processed this exact word
    if (!lastWord || lastWord === lastProcessedWordRef.current) return;
    lastProcessedWordRef.current = lastWord;

    // Count attempt
    setTotalAttempts((prev) => prev + 1);

    const targetWord = words[currentWordIndex];
    const normalizedTarget = normalizeWord(targetWord);
    const normalizedSpoken = normalizeWord(lastWord);

    let isMatch = normalizedSpoken === normalizedTarget;

    // Try number conversion if not a direct match
    if (!isMatch && !isNaN(Number(lastWord))) {
      const num = numberToGerman(Number(lastWord));
      isMatch = normalizeWord(num) === normalizedTarget;
    }

    if (isMatch) {
      setCompletedWords((prev) => new Set([...prev, currentWordIndex]));
      setCurrentWordIndex((prev) => prev + 1);
      setCurrentWordAttempts(0);

      // Clear for next word
      setUserAnswer("");
      lastProcessedWordRef.current = "";
      setTrigger((prev) => prev + 1);
    } else {
      setCurrentWordAttempts((prev) => prev + 1);
    }
  }, [userAnswer, currentWordIndex, paragraph, words]);

  // Clear buffer every 3 seconds if no match (prevent accumulation)
  useEffect(() => {
    if (!userAnswer) return;

    const timeout = setTimeout(() => {
      setUserAnswer("");
      lastProcessedWordRef.current = "";
    }, 3000);

    return () => clearTimeout(timeout);
  }, [userAnswer]);

  // Skip handler
  const handleSkip = useCallback(() => {
    if (currentWordIndex >= words.length) return;

    setSkippedWords((prev) => new Set(prev).add(currentWordIndex));

    setCurrentWordIndex((prev) => prev + 1);
    setCurrentWordAttempts(0);
  }, [currentWordIndex, words]);

  // Reset handler
  const resetPractice = useCallback(() => {
    setUserAnswer("");
    setCurrentWordIndex(0);
    setCompletedWords(new Set());
    setSkippedWords(new Set());
    setAccuracy(100);
    setCurrentWordAttempts(0);
    setTotalAttempts(0);
  }, []);

  // Calculate progress
  const { completedCount, progressPercentage } = useMemo(() => {
    const count = completedWords.size + skippedWords.size;
    const percentage = words.length > 0 ? (count / words.length) * 100 : 0;
    return { completedCount: count, progressPercentage: percentage };
  }, [completedWords.size, skippedWords.size, words.length]);

  // Toggle STT engine
  const toggleEngine = useCallback(() => {
    setSttEngine((prev) => (prev === "german" ? "native" : "german"));
  }, []);

  // Get word status
  const getWordStatus = useCallback(
    (index: number) => {
      if (completedWords.has(index)) return "completed";
      if (skippedWords.has(index)) return "skipped";
      if (index === currentWordIndex) return "current";
      return "pending";
    },
    [completedWords, skippedWords, currentWordIndex]
  );

  return (
    <main className="relative w-full min-h-screen bg-slate-50 dark:bg-[#121212] flex flex-col items-center justify-start pt-20 px-4 md:px-8 transition-colors duration-300">
      <div className="max-w-4xl w-full">
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

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 md:mb-12 gap-6">
          <div className="flex flex-col items-center gap-4">
            <div>
              <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100 tracking-tight">
                German Reading Practice
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Read the paragraph aloud
              </p>
            </div>
          </div>
          <div className="flex gap-2 self-end md:self-auto">
            {currentWordAttempts >= 3 && (
              <button
                onClick={handleSkip}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-amber-600 bg-amber-50 hover:bg-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:hover:bg-amber-900/30 rounded-md transition-colors animate-in fade-in"
              >
                Skip Word
              </button>
            )}
            <button
              onClick={resetPractice}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>
        </div>

        {/* Progress & Stats */}
        <div className="mb-8 sticky top-4 z-40 bg-slate-50/90 dark:bg-[#121212]/90 backdrop-blur-md py-4 -my-4">
          <div className="flex justify-between items-end mb-3">
            <span className="text-sm font-medium text-gray-900 dark:text-gray-200">
              {completedCount}{" "}
              <span className="text-gray-400 dark:text-gray-500">
                / {words.length} words
              </span>
            </span>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-200">
              {accuracy}%{" "}
              <span className="text-gray-400 dark:text-gray-500">
                accuracy ({completedWords.size}/{totalAttempts})
              </span>
            </span>
          </div>
          <div className="w-full h-1.5 bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 dark:bg-indigo-500 transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Paragraph Display */}
        <div className="relative pb-32">
          <p className="text-lg md:text-xl leading-loose md:leading-loose text-gray-400 dark:text-gray-600 font-serif italic text-justify">
            {words.map((word, index) => (
              <Word key={index} word={word} status={getWordStatus(index)} />
            ))}
          </p>

          {/* Floating Control Bar */}
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4">
            <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl shadow-2xl dark:shadow-zinc-950/50 rounded-full p-2 border border-white/50 dark:border-white/10 flex items-center justify-between gap-3 transition-all duration-300">
              {/* Engine Toggle */}
              <button
                onClick={toggleEngine}
                className="px-3 py-2 rounded-full text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all font-medium text-sm"
                title={`Current: ${
                  sttEngine === "german" ? "German Optimized" : "Browser Native"
                } (click to switch)`}
              >
                {sttEngine === "german" ? "DE" : "BR"}
              </button>

              {/* Feedback Text */}
              <div className="flex-1 overflow-hidden flex justify-center">
                {userAnswer ? (
                  <div
                    key={userAnswer.split(" ").slice(-1)[0] || "start"}
                    className="truncate max-w-[150px] text-center"
                  >
                    <span className="text-slate-900 dark:text-slate-100 font-semibold text-base">
                      {userAnswer.split(" ").slice(-1)[0]}
                    </span>
                  </div>
                ) : (
                  <span className="text-gray-400 text-sm">Speak now...</span>
                )}
              </div>

              {/* Microphone */}
              <div className="relative shrink-0">
                {sttEngine === "german" ? (
                  <GermanSTT
                    onTranscript={setUserAnswer}
                    className="rounded-full"
                    trigger={trigger}
                  />
                ) : (
                  <STT
                    onTranscript={setUserAnswer}
                    continuous
                    className="rounded-full"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
