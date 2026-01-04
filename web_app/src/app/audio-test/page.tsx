"use client";

import GermanSTT from "@/components/GSTT";
import STT from "@/components/STT";
import { useState } from "react";

export default function AudioTest() {
  const [sttTranscript, setSttTranscript] = useState("");
  const [gsttTranscript, setGsttTranscript] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8 bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-800">
        Audio Input Comparison
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        {/* Left Side: Standard STT */}
        <div className="flex flex-col gap-6 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="border-b border-gray-100 pb-4">
            <h2 className="text-xl font-semibold text-gray-700">
              Standard STT
            </h2>
            <p className="text-sm text-gray-500">Supports text & voice input</p>
          </div>

          <div className="flex justify-center py-4">
            <STT onTranscript={setSttTranscript} continuous={true} />
          </div>

          <div className="mt-auto space-y-2">
            <p className="text-xs text-gray-400 font-medium uppercase">
              Transcript Output
            </p>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-700 min-h-[100px] wrap-break-word whitespace-pre-wrap">
              {sttTranscript || (
                <span className="text-gray-400 italic">No input yet...</span>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: German GSTT */}
        <div className="flex flex-col gap-6 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="border-b border-gray-100 pb-4">
            <h2 className="text-xl font-semibold text-gray-700">German STT</h2>
            <p className="text-sm text-gray-500">
              Optimized for German voice input
            </p>
          </div>

          <div className="flex justify-center py-4">
            <GermanSTT onTranscript={setGsttTranscript} />
          </div>

          <div className="mt-auto space-y-2">
            <p className="text-xs text-gray-400 font-medium uppercase">
              Transcript Output
            </p>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-700 min-h-[100px] wrap-break-word whitespace-pre-wrap">
              {gsttTranscript || (
                <span className="text-gray-400 italic">No input yet...</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
