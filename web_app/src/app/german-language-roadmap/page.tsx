import { roadmapData } from "./RoadmapData";
import { RoadmapSection } from "./RoadmapSection";
import Link from "next/link";

export default function GermanLanguageRoadmapPage() {
  const a1Nodes = roadmapData.filter((n) => n.level === "A1");
  const a2Nodes = roadmapData.filter((n) => n.level === "A2");

  return (
    <div className="min-h-dvh w-full bg-white dark:bg-[#121212] text-slate-900 dark:text-[#E0E0E0]">
      <Link
        href="/"
        className="fixed top-4 left-4 z-50 flex items-center gap-1.5 text-slate-400 dark:text-[#666] hover:text-slate-700 dark:hover:text-[#ccc] transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
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

      <RoadmapSection
        level="A1"
        title="Beginner"
        nodes={a1Nodes}
        color="#3b82f6"
      />
      <RoadmapSection
        level="A2"
        title="Elementary"
        nodes={a2Nodes}
        color="#10b981"
      />

      {/* Coming Soon */}
      <section className="h-dvh flex flex-col items-center justify-center px-6 border-t border-slate-100 dark:border-[#222]">
        <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-slate-300 dark:text-[#444] mb-3">
          Coming Soon
        </p>
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-300 dark:text-[#333]">
          B1 · B2 · C1 · C2
        </h2>
      </section>
    </div>
  );
}
