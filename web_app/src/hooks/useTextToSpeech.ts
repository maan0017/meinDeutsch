// hooks/useTextToSpeech.ts
"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type UseSpeechOptions = {
  lang?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
  autoCancel?: boolean;
  onEnd?: () => void;
  onStart?: () => void;
  onError?: (error: SpeechSynthesisErrorEvent) => void;
};

type SpeakOptions = {
  text: string;
};

export function useTextToSpeech({
  lang = "de-DE",
  rate = 1,
  pitch = 1,
  volume = 1,
  autoCancel = true,
  onEnd,
  onStart,
  onError,
}: UseSpeechOptions = {}) {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Tracking for mid-speech restarts
  const fullTextRef = useRef<string>("");
  const baseOffsetRef = useRef<number>(0);
  const currentOffsetRef = useRef<number>(0);
  const isRestartingRef = useRef<boolean>(false);
  const prevSettingsRef = useRef({ rate, pitch, volume });

  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setIsSupported(true);
      // Preload voices to avoid initial lag
      window.speechSynthesis.getVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => {
          window.speechSynthesis.getVoices();
        };
      }
    }

    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  const cleanup = useCallback(() => {
    setIsPlaying(false);
    setIsPaused(false);
    utteranceRef.current = null;
    fullTextRef.current = "";
    baseOffsetRef.current = 0;
    currentOffsetRef.current = 0;
  }, []);

  const speak = useCallback(
    ({ text }: SpeakOptions) => {
      if (!window.speechSynthesis || !text?.trim()) return;

      try {
        if (autoCancel) {
          window.speechSynthesis.cancel();
        }

        fullTextRef.current = text;
        baseOffsetRef.current = 0;
        currentOffsetRef.current = 0;

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = rate;
        utterance.pitch = pitch;
        utterance.volume = volume;

        utterance.onstart = () => {
          setIsPlaying(true);
          setIsPaused(false);
          onStart?.();
        };

        utterance.onboundary = (e) => {
          if (e.name === "word") {
            currentOffsetRef.current = e.charIndex;
          }
        };

        utterance.onend = () => {
          if (!isRestartingRef.current) {
            cleanup();
            onEnd?.();
          }
        };

        utterance.onerror = (event) => {
          if (!isRestartingRef.current) {
            cleanup();
            onError?.(event);
          }
        };

        utteranceRef.current = utterance;
        
        // Speak instantly
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        cleanup();
        console.error("Speech synthesis failed:", err);
      }
    },
    [autoCancel, cleanup, lang, onEnd, onError, onStart, pitch, rate, volume]
  );

  // Dynamically apply settings changes mid-speech
  useEffect(() => {
    const settingsChanged =
      prevSettingsRef.current.rate !== rate ||
      prevSettingsRef.current.pitch !== pitch ||
      prevSettingsRef.current.volume !== volume;

    if (settingsChanged) {
      prevSettingsRef.current = { rate, pitch, volume };

      if (
        isPlaying &&
        !isPaused &&
        fullTextRef.current &&
        window.speechSynthesis
      ) {
        isRestartingRef.current = true;

        // Calculate the exact string index where we are currently reading
        baseOffsetRef.current += currentOffsetRef.current;
        currentOffsetRef.current = 0;

        window.speechSynthesis.cancel();

        setTimeout(() => {
          const remainingText = fullTextRef.current.slice(
            baseOffsetRef.current
          );

          if (!remainingText.trim()) {
            isRestartingRef.current = false;
            cleanup();
            onEnd?.();
            return;
          }

          const utterance = new SpeechSynthesisUtterance(remainingText);
          utterance.lang = lang;
          utterance.rate = rate;
          utterance.pitch = pitch;
          utterance.volume = volume;

          utterance.onstart = () => {
            isRestartingRef.current = false;
            setIsPlaying(true);
            setIsPaused(false);
          };

          utterance.onboundary = (e) => {
            if (e.name === "word") {
              currentOffsetRef.current = e.charIndex;
            }
          };

          utterance.onend = () => {
            if (!isRestartingRef.current) {
              cleanup();
              onEnd?.();
            }
          };

          utterance.onerror = (event) => {
            if (!isRestartingRef.current) {
              cleanup();
              onError?.(event);
            }
          };

          utteranceRef.current = utterance;
          window.speechSynthesis.speak(utterance);
        }, 10);
      }
    }
  }, [rate, pitch, volume, isPlaying, isPaused, lang, cleanup, onEnd, onError]);

  const pause = useCallback(() => {
    if (!window.speechSynthesis.speaking) return;

    window.speechSynthesis.pause();
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    if (!window.speechSynthesis.paused) return;

    window.speechSynthesis.resume();
    setIsPaused(false);
  }, []);

  const stop = useCallback(() => {
    isRestartingRef.current = false;
    window.speechSynthesis.cancel();
    cleanup();
  }, [cleanup]);

  const toggle = useCallback(
    (text: string) => {
      if (isPlaying) {
        stop();
      } else {
        speak({ text });
      }
    },
    [isPlaying, speak, stop]
  );

  return {
    speak,
    pause,
    resume,
    stop,
    toggle,

    isPlaying,
    isPaused,
    isSupported,
  };
}
