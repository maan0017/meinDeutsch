import { useState, useRef, useCallback, useEffect } from "react";
import { GermanWord } from "@/models/germanWord";
import { germanWords } from "@/data/germanWords";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface UseQuizGameLogicProps {
  currentGroup: number;
  groupSize: number;
  allIn: boolean;
  strictMode: boolean;
  isInitialized: boolean;
  moveToNextGroup: () => void;
  moveToPrevGroup: () => void;
}

export const useQuizGameLogic = ({
  currentGroup,
  groupSize,
  allIn,
  strictMode,
  isInitialized,
  moveToNextGroup,
  moveToPrevGroup,
}: UseQuizGameLogicProps) => {
  const { playSound } = useSoundEffects();
  const [word, setWord] = useState<GermanWord | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const inputRef = useRef<HTMLInputElement>(null);
  /* seenIndices:
     - Ref: Used for immediate logic updates inside handleNextWord to avoid dependency cycles.
     - State: Used for UI rendering (e.g., progress bar).
  */
  const [seenIndices, setSeenIndices] = useState<Set<number>>(new Set());
  const seenIndicesRef = useRef<Set<number>>(new Set());

  // Reset seen words when group or mode changes
  useEffect(() => {
    const newSet = new Set<number>();
    setSeenIndices(newSet);
    seenIndicesRef.current = newSet;
  }, [currentGroup, allIn]);

  const handleNextWord = useCallback(
    (forceReset = false) => {
      let start = 0;
      let end = germanWords.length;

      if (!allIn) {
        start = currentGroup * groupSize;
        end = Math.min((currentGroup + 1) * groupSize, germanWords.length);
      }

      let availableIndices: number[] = [];
      const indicesToCheck = forceReset
        ? new Set<number>()
        : seenIndicesRef.current;

      for (let i = start; i < end; i++) {
        if (!indicesToCheck.has(i)) {
          availableIndices.push(i);
        }
      }

      // If all words seen (or strict subset logic), reset or recycle
      if (availableIndices.length === 0) {
        availableIndices = [];
        for (let i = start; i < end; i++) {
          availableIndices.push(i);
        }
        if (!forceReset) {
          const newSet = new Set<number>();
          seenIndicesRef.current = newSet;
          setSeenIndices(newSet);
        }
      }

      const randomIndex = Math.floor(Math.random() * availableIndices.length);
      const selectedOriginalIndex = availableIndices[randomIndex];

      if (forceReset) {
        seenIndicesRef.current = new Set([selectedOriginalIndex]);
      } else {
        seenIndicesRef.current.add(selectedOriginalIndex);
      }

      // Update state to trigger render
      setSeenIndices(new Set(seenIndicesRef.current));

      setWord(germanWords[selectedOriginalIndex]);
      setUserAnswer("");
      setStatus("idle");
      setTimeout(() => inputRef.current?.focus(), 50);
    },
    [allIn, currentGroup, groupSize]
  );

  // Sync state changes -> Next Word
  useEffect(() => {
    if (isInitialized) {
      handleNextWord(true);
    }
  }, [currentGroup, allIn, isInitialized, handleNextWord]);

  // Initial load
  useEffect(() => {
    if (!word && isInitialized) {
      handleNextWord();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!word || status !== "idle") return;

    const normalize = (s: string) => s.trim().toLowerCase();
    let userAttempt, baseAnswer;

    if (strictMode && word.article) {
      userAttempt = userAnswer;
      baseAnswer = `${word.article} ${word.germanWord}`;
    } else {
      userAttempt = normalize(userAnswer);
      baseAnswer = normalize(word.germanWord);
    }

    const isCorrect =
      strictMode && word.article
        ? userAttempt.split(" ")[0].toLowerCase() ===
            word.article.toLowerCase() &&
          userAttempt.split(" ")[1] === word.germanWord
        : userAttempt.toLowerCase() === baseAnswer.toLowerCase() ||
          userAttempt.toLowerCase() ===
            `${word?.article?.toLowerCase()} ${word.germanWord.toLowerCase()}`;

    setStatus(isCorrect ? "correct" : "wrong");
    playSound(isCorrect ? "correct" : "wrong");

    const isMobile = window.innerWidth < 768;
    setTimeout(handleNextWord, isMobile ? 1500 : 3000);
  };

  const handleInputKeyDowns = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.altKey && e.key === "ArrowLeft") {
      e.preventDefault();
      moveToPrevGroup();
    }
    if (e.altKey && e.key === "ArrowRight") {
      e.preventDefault();
      moveToNextGroup();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isInitialized) return;
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (status !== "idle") return;
      const target = e.target as HTMLInputElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;

      if (e.key === "ArrowLeft" && !allIn) moveToPrevGroup();
      if (e.key === "ArrowRight" && !allIn) moveToNextGroup();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    status,
    isInitialized,
    allIn,
    moveToNextGroup,
    moveToPrevGroup,
    currentGroup,
  ]);

  return {
    word,
    userAnswer,
    setUserAnswer,
    status,
    inputRef,
    handleSubmit,
    handleInputKeyDowns,
    seenIndices,
  };
};
