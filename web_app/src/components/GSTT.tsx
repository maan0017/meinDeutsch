"use client";

import { useGermanSpeechToText } from "@/hooks/useGermanSpeechToText";
import { Mic, Square, MicOff } from "lucide-react";
import { useEffect } from "react";

interface GSTTProps {
  onTranscript: (text: string) => void;
  className?: string;
  startTitle?: string;
  stopTitle?: string;
  disabled?: boolean;
}

export default function GermanSTT({
  onTranscript,
  className,
  startTitle = "Start recording",
  stopTitle = "Stop recording",
  disabled = false,
}: GSTTProps) {
  const { transcript, listening, start, stop, isSupported, resetTranscript } =
    useGermanSpeechToText();

  useEffect(() => {
    if (transcript) {
      onTranscript(transcript);
      resetTranscript();
    }
  }, [transcript, onTranscript]);

  useEffect(() => {
    const handleKeyboardShortcut = (event: KeyboardEvent) => {
      if ((event.key === " " || event.code === "Space") && event.ctrlKey) {
        event.preventDefault();
        if (listening) {
          stop();
        } else {
          start();
        }
      }
    };

    document.addEventListener("keydown", handleKeyboardShortcut);

    return () => {
      document.removeEventListener("keydown", handleKeyboardShortcut);
    };
  }, [listening, start, stop]);

  return (
    <div className={className}>
      {!isSupported ? (
        <button
          disabled
          type="button"
          className="p-2 rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-400 dark:text-zinc-600 cursor-not-allowed border border-gray-200 dark:border-zinc-700"
          title="Browser doesn't support speech recognition"
        >
          <MicOff size={20} />
        </button>
      ) : (
        <div className="relative">
          {listening && (
            <div
              className={`absolute inset-0 bg-blue-500 dark:bg-blue-400 animate-pulse opacity-20 ${className}`}
            ></div>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation(); // Stop event bubbling
              listening ? stop() : start();
            }}
            // Use onPointerDown to prevent focus loss on both mouse and touch devices
            onPointerDown={(e) => e.preventDefault()}
            disabled={disabled}
            className={`relative p-2 transition-all duration-200 touch-manipulation flex items-center justify-center 
              ${className}
              ${
                listening
                  ? "bg-blue-600 dark:bg-blue-500 text-white shadow-md ring-2 ring-blue-200 dark:ring-blue-900"
                  : "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 border border-gray-200 dark:border-zinc-700"
              } 
              ${
                disabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-200 dark:hover:bg-zinc-700 cursor-pointer active:scale-95"
              }`}
            title={listening ? stopTitle : startTitle}
          >
            {listening ? (
              <Square size={20} fill="currentColor" />
            ) : (
              <Mic size={20} />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
