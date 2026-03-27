"use client";

import { QuizGameInput } from "./QuizGameInput";
import { germanWords } from "@/data/germanWords";
import { useGroupSystem } from "@/hooks/quizGame/useGroupSystem";
import { useQuizGameLogic } from "@/hooks/quizGame/useQuizGameLogic";
import { QuizHeader } from "./quizGame/QuizHeader";
import { QuizGroupControls } from "./quizGame/QuizGroupControls";
import { QuizFeedback } from "./quizGame/QuizFeedback";

export default function GuessGermanWordQuizGame() {
  const {
    currentGroup,
    setCurrentGroup,
    totalGroups,
    allIn,
    setAllIn,
    strictMode,
    setStrictMode,
    isInitialized,
    moveToNextGroup,
    moveToPrevGroup,
    groupSize,
  } = useGroupSystem();

  const {
    word,
    userAnswer,
    setUserAnswer,
    status,
    inputRef,
    handleSubmit,
    handleInputKeyDowns,
    seenIndices,
  } = useQuizGameLogic({
    currentGroup,
    groupSize,
    allIn,
    strictMode,
    isInitialized,
    moveToNextGroup,
    moveToPrevGroup,
  });

  const displayMeaning = (text: string | string[]): string =>
    Array.isArray(text) ? text.join(", ") : text;

  if (!word) return null;

  const currentGroupStart = allIn ? 0 : currentGroup * groupSize;

  const currentGroupEnd = allIn
    ? germanWords.length
    : Math.min((currentGroup + 1) * groupSize, germanWords.length);

  const totalWordsInCurrentGroup = currentGroupEnd - currentGroupStart;

  let count = 0;
  for (const i of seenIndices) {
    if (i >= currentGroupStart && i < currentGroupEnd) count++;
  }

  // safer version (handles negatives)
  const remainingWordsInGroup = Math.max(
    0,
    Math.min(
      totalWordsInCurrentGroup - (count - 1),
      totalWordsInCurrentGroup - 1
    )
  );

  const progressPercent = totalWordsInCurrentGroup
    ? Math.round(((count - 1) * 100) / totalWordsInCurrentGroup)
    : 0;

  const statusConfig = {
    correct: {
      card: "border-emerald-500/50 shadow-emerald-500/10 shadow-xl",
      accent: "bg-emerald-500",
      input: [
        "border-emerald-500 focus:border-emerald-500",
        "text-emerald-700 bg-emerald-50 focus:ring-emerald-100",
        "dark:text-emerald-300 dark:bg-emerald-950/30 dark:focus:ring-emerald-900",
      ].join(" "),
    },
    wrong: {
      card: "border-red-500/50 shadow-red-500/10 shadow-xl",
      accent: "bg-red-500",
      input: [
        "border-red-500 focus:border-red-500",
        "text-red-700 bg-red-50 focus:ring-red-100",
        "dark:text-red-300 dark:bg-red-950/30 dark:focus:ring-red-900",
      ].join(" "),
    },
    idle: {
      card: [
        "shadow-xl",
        "border-gray-200 shadow-gray-100/80",
        "dark:border-white/[0.07] dark:shadow-black/50",
      ].join(" "),
      accent: "bg-sky-500",
      input: [
        "focus:border-sky-500",
        "border-gray-300 text-gray-800 bg-white hover:border-gray-400 focus:ring-sky-100",
        "dark:border-white/10 dark:text-white dark:bg-white/5 dark:hover:border-white/20 dark:focus:ring-sky-950",
      ].join(" "),
    },
  } as const;

  const currentStatus =
    status === "correct"
      ? statusConfig.correct
      : status === "wrong"
        ? statusConfig.wrong
        : statusConfig.idle;

  return (
    <main className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden px-4 bg-gray-50 dark:bg-[#121212]">
      <div className="relative flex w-full max-w-xl flex-col gap-3 z-10">
        {/* Header */}
        <QuizHeader />

        {/* Progress bar */}
        {/* <div className="flex items-center gap-3">
          <div className="h-[2px] flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-white/6">
            <div
              className="h-full rounded-full bg-linear-to-r from-sky-500 to-violet-500 transition-all duration-700 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="shrink-0 text-[10px] font-medium uppercase tracking-widest text-gray-400 dark:text-white/25">
            {seenWordsInCurrentGroupCount}/{totalWordsInCurrentGroup}
          </span>
        </div> */}

        {/* Main card */}
        <article
          className={[
            "relative overflow-hidden rounded-2xl border transition-all duration-300 ease-out",
            "bg-white dark:bg-[#121212]",
            currentStatus.card,
          ].join(" ")}
        >
          <div className="p-4 md:p-6">
            {/* Group controls */}
            <QuizGroupControls
              currentGroup={currentGroup}
              totalGroups={totalGroups}
              groupSize={groupSize}
              allIn={allIn}
              setAllIn={setAllIn}
              strictMode={strictMode}
              setStrictMode={setStrictMode}
              moveToNextGroup={moveToNextGroup}
              moveToPrevGroup={moveToPrevGroup}
              setCurrentGroup={setCurrentGroup}
              remainingWords={remainingWordsInGroup}
              wordGerman={word.germanWord}
            />

            {/* Clues */}
            <div className="mt-4 grid gap-4">
              {/* English */}
              <section className="text-center">
                <span className="inline-block rounded border border-gray-200 bg-gray-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:border-white/8 dark:bg-white/4 dark:text-white/35">
                  English
                </span>
                <p className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-white md:text-4xl">
                  {displayMeaning(word.englishMeaning)}
                </p>
              </section>

              {/* Hindi */}
              <section className="text-center">
                <span className="inline-block rounded border border-gray-200 bg-gray-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:border-white/8 dark:bg-white/4 dark:text-white/35">
                  Hindi
                </span>
                <p className="mt-2 text-xl font-medium leading-snug text-gray-600 font-hindi dark:text-white/65 md:text-2xl">
                  {displayMeaning(word.hindiMeaning)}
                </p>
              </section>
            </div>

            {/* Feedback */}
            <div className="mt-3">
              <QuizFeedback status={status} word={word} />
            </div>

            {/* Input */}
            <div className="mt-3">
              <QuizGameInput
                handleSubmit={handleSubmit}
                inputRef={inputRef}
                status={status}
                inputStyles={currentStatus.input}
                userAnswer={userAnswer}
                setUserAnswer={setUserAnswer}
                useMicrophone={true}
                handleKeyDown={handleInputKeyDowns}
              />
            </div>
          </div>
        </article>

        {/* Footer stats */}
        <div className="flex items-center justify-between px-0.5">
          <p className="text-[10px] font-medium tracking-wide text-gray-400 dark:text-white/20">
            {remainingWordsInGroup} word{remainingWordsInGroup !== 1 ? "s" : ""}{" "}
            remaining
          </p>
          <p className="text-[10px] font-medium tracking-wide text-gray-400 dark:text-white/20">
            {progressPercent}% completed
          </p>
        </div>
      </div>
    </main>
  );
}
