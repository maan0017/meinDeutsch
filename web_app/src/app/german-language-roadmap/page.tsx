import { roadmapData } from "./RoadmapData";
import { RoadmapSection } from "./RoadmapSection";
import Link from "next/link";

const LEVEL_CONFIG = {
  A1: {
    title: "Beginner",
    color: "#3b82f6",
    softBg: "#eff6ff",
    mutedColor: "#93c5fd",
    textColor: "#1d4ed8",
  },
  A2: {
    title: "Elementary",
    color: "#10b981",
    softBg: "#ecfdf5",
    mutedColor: "#6ee7b7",
    textColor: "#065f46",
  },
} as const;

const totalTopics = roadmapData.filter((n) => n.type !== "milestone").length;

export default function GermanLanguageRoadmapPage() {
  const a1Nodes = roadmapData.filter((n) => n.level === "A1");
  const a2Nodes = roadmapData.filter((n) => n.level === "A2");

  return (
    <div className="min-h-dvh w-full bg-slate-50 text-slate-900 pt-10 pb-16 px-4 md:px-6">
      <div className="max-w-[900px] mx-auto w-full">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-slate-400 hover:text-slate-700 transition-colors mb-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          <span className="text-sm font-medium">Back</span>
        </Link>

        {/* Page header — index/document style */}
        <div className="flex items-baseline justify-between border-b-2 border-slate-200 pb-3 mb-6">
          <h1 className="text-[20px] font-semibold tracking-tight text-slate-900">
            German Language Roadmap
          </h1>
          <span className="text-[13px] text-slate-500">
            A1 → C1 · {totalTopics} topics
          </span>
        </div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
          <RoadmapSection level="A1" nodes={a1Nodes} {...LEVEL_CONFIG.A1} />
          <RoadmapSection level="A2" nodes={a2Nodes} {...LEVEL_CONFIG.A2} />
        </div>

        {/* Coming soon — compact footer row */}
        <div className="mt-6 flex items-center justify-center gap-4 border-2 border-dashed border-slate-200 rounded-xl py-6 bg-white relative z-10 shadow-sm">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
            Coming soon
          </span>
          <span className="text-[18px] font-bold tracking-tight text-slate-300">
            B1 · B2 · C1
          </span>
        </div>

        {/* Legend */}
        <div className="mt-3 flex items-center gap-4 px-1">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span className="text-[11px] text-slate-400">Grammar</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-200" />
            <span className="text-[11px] text-slate-400">Vocabulary</span>
          </div>
        </div>
      </div>
    </div>
  );
}
