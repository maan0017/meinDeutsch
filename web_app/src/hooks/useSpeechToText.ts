"use client";

import { useRef, useState, useCallback, useEffect } from "react";

type UseSpeechToTextOptions = {
  //   lang?: "en-US" | "hi-IN" | "de-DE";
  lang?: "de-DE";
  continuous?: boolean;
  interimResults?: boolean;
};

export function useSpeechToText({
  lang = "de-DE",
  continuous = false,
  interimResults = true,
}: UseSpeechToTextOptions = {}) {
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  // Buffer to hold confirmed text segments
  const finalTranscriptRef = useRef("");

  useEffect(() => {
    setIsSupported(
      typeof window !== "undefined" &&
        ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)
    );
  }, []);

  const start = useCallback(() => {
    if (!isSupported) {
      setError("Web Speech API not supported");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition: SpeechRecognition = new SpeechRecognition();
    recognition.lang = lang;
    recognition.continuous = continuous;
    recognition.interimResults = interimResults;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onresult = (event) => {
      let interimTranscript = "";
      let newFinalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          newFinalTranscript += result[0].transcript + " ";
        } else {
          interimTranscript += result[0].transcript;
        }
      }

      if (newFinalTranscript) {
        finalTranscriptRef.current += newFinalTranscript;

        // Optimize buffer: Keep only last 50 words
        const words = finalTranscriptRef.current.trim().split(/\s+/);
        if (words.length > 50) {
          finalTranscriptRef.current = words.slice(-50).join(" ") + " ";
        }
      }

      setTranscript((finalTranscriptRef.current + interimTranscript).trim());
    };

    recognition.onerror = (e: any) => {
      // Ignore 'no-speech' error if continuous to prevent stopping
      if (e.error === "no-speech" && continuous) return;

      console.error("Speech recognition error:", e.error);
      setError(e.error || "Speech recognition error");
      if (e.error !== "no-speech") setIsListening(false);
    };

    recognition.onend = () => {
      // If continuous, don't set listening to false automatically unless explicitly stopped
      // But for standard behavior, we usually update state
      if (!continuous) {
        setIsListening(false);
      } else {
        // If it stopped unexpectedly in continuous mode, try to restart (optional, but requested "fast and continuous" implies robustness)
        // For now, let's respect the explicit stop command or error state logic
        // We'll rely on the existing setIsListening(false) in onerror/stop
        // If just ends without error (rare in continuous), it might be silence timeout
        setIsListening(false);
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, [lang, continuous, interimResults, isSupported]);

  const stop = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsListening(false);
  }, []);

  const reset = useCallback(() => {
    setTranscript("");
    finalTranscriptRef.current = "";
    setError(null);
  }, []);

  return {
    transcript,
    isListening,
    error,
    isSupported,
    start,
    stop,
    reset,
  };
}
