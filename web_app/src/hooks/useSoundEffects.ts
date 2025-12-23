"use client";
import { useEffect, useRef, useCallback } from "react";
import { useSettingsStore } from "@/store/settings";

export const useSoundEffects = () => {
  const isSoundEffectsOn = useSettingsStore((state) => state.soundEffects);

  // Audio refs
  const correctAudio = useRef<HTMLAudioElement | null>(null);
  const wrongAudio = useRef<HTMLAudioElement | null>(null);
  const tickAudio = useRef<HTMLAudioElement | null>(null);

  // Keyboard Audio refs
  const keypressAudio = useRef<HTMLAudioElement | null>(null);
  const spaceAudio = useRef<HTMLAudioElement | null>(null);
  const backspaceAudio = useRef<HTMLAudioElement | null>(null);
  const enterAudio = useRef<HTMLAudioElement | null>(null);

  // Initialize Audio
  useEffect(() => {
    correctAudio.current = new Audio("/sounds/correct.opus");
    wrongAudio.current = new Audio("/sounds/wrong.opus");
    tickAudio.current = new Audio("/sounds/tick.opus");
    keypressAudio.current = new Audio("/sounds/key.opus");
    spaceAudio.current = new Audio("/sounds/spacebar.opus");
    backspaceAudio.current = new Audio("/sounds/backspace.opus");
    enterAudio.current = new Audio("/sounds/enter.opus");
  }, []);

  const safePlay = useCallback(
    (audio: HTMLAudioElement | null) => {
      if (isSoundEffectsOn == "OFF") return;
      if (audio) {
        audio.currentTime = 0;
        audio.play().catch(() => {
          // Ignore NotAllowedError (autoplay blocked)
        });
      }
    },
    [isSoundEffectsOn],
  );

  const playKeyboardSound = useCallback(
    (key: string) => {
      if (isSoundEffectsOn == "OFF") return;
      try {
        let audioToPlay: HTMLAudioElement | null = null;

        if (key === "Enter") {
          audioToPlay = enterAudio.current;
        } else if (key === "Backspace") {
          audioToPlay = backspaceAudio.current;
        } else if (key === " ") {
          audioToPlay = spaceAudio.current;
        } else {
          // Default for other keys (letters, numbers, etc.)
          if (key.length === 1) {
            audioToPlay = keypressAudio.current;
          }
        }

        if (audioToPlay) {
          // Clone the audio node to allow overlapping sounds (fast typing)
          const soundClone = audioToPlay.cloneNode(true) as HTMLAudioElement;
          soundClone.volume = 0.5; // Optional: slightly lower volume for typing to not be overwhelming
          soundClone.play().catch(() => {});
        }
      } catch {
        // Ignore
      }
    },
    [isSoundEffectsOn],
  );

  const playSound = useCallback(
    (type: "correct" | "wrong" | "tick") => {
      if (isSoundEffectsOn === "OFF") return;
      if (type === "correct") {
        safePlay(correctAudio.current);
      } else if (type === "wrong") {
        safePlay(wrongAudio.current);
      } else if (type === "tick") {
        safePlay(tickAudio.current);
      }
    },
    [safePlay, isSoundEffectsOn],
  );

  return {
    playKeyboardSound,
    playSound,
  };
};
