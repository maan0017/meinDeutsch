"use client";
import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const VoiceAssistant = () => {
  const [savedTranscripts, setSavedTranscripts] = useState<string[]>([]);
  const [language, setLanguage] = useState<"en-US" | "de-DE">("de-DE");

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleReset = () => {
    if (transcript.trim()) {
      setSavedTranscripts((prev) => [...prev, transcript]);
    }
    resetTranscript();
  };

  const clearAll = () => {
    setSavedTranscripts([]);
    resetTranscript();
  };

  const startListening = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: language,
    });
  };

  const toggleLanguage = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    }
    setLanguage((prev) => (prev === "de-DE" ? "en-US" : "de-DE"));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Status & Controls */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-3 h-3 rounded-full ${
                listening ? "bg-red-500 animate-pulse" : "bg-gray-300"
              }`}
            />
            <span className="font-medium">
              Microphone: {listening ? "Listening..." : "Off"}
            </span>
          </div>

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
            style={{
              backgroundColor: language === "de-DE" ? "#6366f1" : "#6b7280",
              color: "white",
            }}
            title={`Current: ${
              language === "de-DE" ? "German" : "English"
            } (click to switch)`}
          >
            {language === "de-DE" ? "🇩🇪 German" : "🇺🇸 English"}
          </button>
        </div>

        <div className="flex gap-3">
          <button
            onClick={startListening}
            disabled={listening}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start Listening
          </button>

          <button
            onClick={SpeechRecognition.stopListening}
            disabled={!listening}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Stop
          </button>

          <button
            onClick={handleReset}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save & Reset
          </button>

          <button
            onClick={clearAll}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Current Transcript */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-3">
          Current Transcript ({language === "de-DE" ? "Deutsch" : "English"}):
        </h3>
        <div className="min-h-[150px] p-4 bg-gray-50 dark:bg-zinc-800 rounded border border-gray-200 dark:border-zinc-700">
          <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
            {transcript || (
              <span className="text-gray-400 italic">
                {language === "de-DE"
                  ? "Sprechen Sie, um die Transkription zu sehen..."
                  : "Start speaking to see transcript..."}
              </span>
            )}
          </p>
        </div>
        <div className="mt-2 text-sm text-gray-500">
          Character count: {transcript.length}
        </div>
      </div>

      {/* Saved Transcripts */}
      {savedTranscripts.length > 0 && (
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-3">
            Saved Transcripts ({savedTranscripts.length}):
          </h3>
          <div className="space-y-3">
            {savedTranscripts.map((text, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 dark:bg-zinc-800 rounded border border-gray-200 dark:border-zinc-700"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-medium text-gray-500">
                    Transcript #{index + 1}
                  </span>
                  <button
                    onClick={() =>
                      setSavedTranscripts((prev) =>
                        prev.filter((_, i) => i !== index)
                      )
                    }
                    className="text-xs text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
                <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                  {text}
                </p>
                <div className="mt-2 text-xs text-gray-500">
                  {text.length} characters
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-sm text-blue-800 dark:text-blue-300">
        <h4 className="font-semibold mb-2">
          {language === "de-DE" ? "Test-Anweisungen:" : "Test Instructions:"}
        </h4>
        <ul className="list-disc list-inside space-y-1">
          {language === "de-DE" ? (
            <>
              <li>
                Klicken Sie auf "Start Listening" und sprechen Sie einen langen
                Absatz
              </li>
              <li>Klicken Sie während des Sprechens auf "Save & Reset"</li>
              <li>
                Ihr vorheriges Transkript wird gespeichert und ein neues beginnt
              </li>
              <li>
                Testen Sie, wie es mit Unterbrechungen und kontinuierlicher
                Sprache umgeht
              </li>
            </>
          ) : (
            <>
              <li>Click "Start Listening" and speak a long paragraph</li>
              <li>
                While speaking, click "Save & Reset" to test mid-speech reset
              </li>
              <li>
                Your previous transcript will be saved and a new one will start
              </li>
              <li>Test how it handles interruptions and continuous speech</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default VoiceAssistant;
