"use client";

import { useRef, useState, useCallback, useEffect } from "react";

interface UseGermanSpeechToTextOptions {
  continuous?: boolean;
  maxWords?: number;
  autoRestart?: boolean;
  onTranscriptChange?: (transcript: string) => void;
  onError?: (error: string) => void;
}

export function useGermanSpeechToText(
  options: UseGermanSpeechToTextOptions = {}
) {
  const {
    continuous = false,
    maxWords = 100,
    autoRestart = true,
    onTranscriptChange,
    onError,
  } = options;

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const isStartingRef = useRef(false);
  const shouldRestartRef = useRef(false);
  const restartTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const finalTranscriptRef = useRef("");

  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  // Check browser support once
  useEffect(() => {
    const supported =
      typeof window !== "undefined" &&
      ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);
    setIsSupported(supported);

    return () => {
      // Cleanup on unmount
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          // Ignore abort errors
        }
        recognitionRef.current = null;
      }
    };
  }, []);

  // Optimized transcript update with minimal string operations
  const updateTranscript = useCallback(
    (newFinal: string, interim: string) => {
      if (newFinal) {
        // Append new final text
        finalTranscriptRef.current += newFinal;

        // Optimize buffer: Keep only last N words
        const words = finalTranscriptRef.current.split(/\s+/);
        if (words.length > maxWords) {
          finalTranscriptRef.current = words.slice(-maxWords).join(" ") + " ";
        }
      }

      const fullTranscript = (finalTranscriptRef.current + interim).trim();
      setTranscript(fullTranscript);
      onTranscriptChange?.(fullTranscript);
    },
    [maxWords, onTranscriptChange]
  );

  // Restart logic with exponential backoff protection
  const attemptRestart = useCallback(() => {
    if (!shouldRestartRef.current || isStartingRef.current) return;

    // Clear any pending restart
    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current);
    }

    // Immediate restart for better responsiveness
    restartTimeoutRef.current = setTimeout(() => {
      if (shouldRestartRef.current && !isStartingRef.current) {
        isStartingRef.current = true;

        try {
          const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;
          const recognition = new SpeechRecognition();

          recognition.lang = "de-DE";
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.maxAlternatives = 1; // Optimize for performance

          recognition.onstart = () => {
            isStartingRef.current = false;
            setListening(true);
            setError(null);
          };

          recognition.onresult = (event) => {
            let interimTranscript = "";
            let newFinalTranscript = "";

            // Process only new results for better performance
            for (let i = event.resultIndex; i < event.results.length; i++) {
              const result = event.results[i];
              const text = result[0].transcript;

              if (result.isFinal) {
                newFinalTranscript += text + " ";
              } else {
                interimTranscript += text;
              }
            }

            updateTranscript(newFinalTranscript, interimTranscript);
          };

          recognition.onerror = (e: any) => {
            isStartingRef.current = false;

            // Handle different error types
            const errorType = e.error;

            // Recoverable errors - attempt restart
            if (
              errorType === "no-speech" ||
              errorType === "audio-capture" ||
              errorType === "network"
            ) {
              if (continuous && autoRestart) {
                attemptRestart();
              }
              return;
            }

            // Non-recoverable errors
            console.error("Speech recognition error:", errorType);
            const errorMessage = getErrorMessage(errorType);
            setError(errorMessage);
            onError?.(errorMessage);
            shouldRestartRef.current = false;
            setListening(false);
          };

          recognition.onend = () => {
            isStartingRef.current = false;

            // Auto-restart in continuous mode
            if (continuous && shouldRestartRef.current && autoRestart) {
              attemptRestart();
            } else {
              setListening(false);
            }
          };

          recognitionRef.current = recognition;
          recognition.start();
        } catch (err) {
          isStartingRef.current = false;
          const errorMessage = "Failed to initialize speech recognition";
          console.error(errorMessage, err);
          setError(errorMessage);
          onError?.(errorMessage);
          shouldRestartRef.current = false;
          setListening(false);
        }
      }
    }, 100); // Small delay to prevent rapid restarts
  }, [continuous, autoRestart, updateTranscript, onError]);

  const start = useCallback(() => {
    if (!isSupported) {
      const errorMessage = "Speech recognition not supported in this browser";
      setError(errorMessage);
      onError?.(errorMessage);
      return;
    }

    if (isStartingRef.current || listening) {
      return; // Prevent multiple simultaneous starts
    }

    // Stop any existing instance
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (e) {
        // Ignore abort errors
      }
      recognitionRef.current = null;
    }

    shouldRestartRef.current = true;
    attemptRestart();
  }, [isSupported, listening, attemptRestart, onError]);

  const stop = useCallback(() => {
    shouldRestartRef.current = false;

    // Clear restart timeout
    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current);
      restartTimeoutRef.current = null;
    }

    // Stop recognition
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // Ignore stop errors
      }
      recognitionRef.current = null;
    }

    isStartingRef.current = false;
    setListening(false);
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript("");
    finalTranscriptRef.current = "";
    setError(null);
  }, []);

  return {
    transcript,
    listening,
    error,
    isSupported,
    isMicrophoneAvailable: isSupported,
    start,
    stop,
    resetTranscript,
  };
}

// Helper function for user-friendly error messages
function getErrorMessage(errorType: string): string {
  const errorMessages: Record<string, string> = {
    "no-speech": "Keine Sprache erkannt. Bitte sprechen Sie deutlicher.",
    "audio-capture": "Mikrofon konnte nicht aktiviert werden.",
    "not-allowed": "Mikrofonzugriff wurde verweigert.",
    "network": "Netzwerkfehler. Bitte überprüfen Sie Ihre Verbindung.",
    "service-not-allowed":
      "Spracherkennung ist in diesem Browser nicht verfügbar.",
    "bad-grammar": "Grammatikfehler in der Konfiguration.",
    "language-not-supported": "Sprache wird nicht unterstützt.",
    "aborted": "Spracherkennung wurde abgebrochen.",
  };

  return errorMessages[errorType] || `Fehler: ${errorType}`;
}
