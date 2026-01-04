"use client";

import { useSpeechToText } from "@/hooks/useSpeechToText";
import { Mic, Square, MicOff } from "lucide-react";
import { useEffect } from "react";

interface STTProps {
  onTranscript: (text: string) => void;
  lang?: "de-DE" | "en-US" | "hi-IN";
  className?: string;
  continuous?: boolean;
  startTitle?: string;
  stopTitle?: string;
  disabled?: boolean;
}

export default function STT({
  onTranscript,
  className,
  continuous = false,
  startTitle = "Start recording",
  stopTitle = "Stop recording",
  disabled = false,
}: STTProps) {
  const { transcript, isListening, start, stop, isSupported } = useSpeechToText(
    { lang: "de-DE", continuous }
  );

  useEffect(() => {
    if (transcript) {
      onTranscript(transcript);
    }
  }, [transcript, onTranscript]);

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
          {isListening && (
            <div
              className={`absolute inset-0 bg-blue-500 dark:bg-blue-400 animate-pulse opacity-20 ${className}`}
            ></div>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              isListening ? stop() : start();
            }}
            onPointerDown={(e) => e.preventDefault()}
            disabled={disabled}
            className={`relative p-2 transition-all duration-200 touch-manipulation flex items-center justify-center 
              ${className}
              ${
                isListening
                  ? "bg-blue-600 dark:bg-blue-500 text-white shadow-md ring-2 ring-blue-200 dark:ring-blue-900"
                  : "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 border border-gray-200 dark:border-zinc-700"
              } 
              ${
                disabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-200 dark:hover:bg-zinc-700 cursor-pointer active:scale-95"
              }`}
            title={isListening ? stopTitle : startTitle}
          >
            {isListening ? (
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
