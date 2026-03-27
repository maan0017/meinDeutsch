import { roadmapData } from "./RoadmapData";
import { RoadmapSection } from "./RoadmapSection";
import Link from "next/link";

export default function GermanLanguageRoadmapPage() {
  const a1Nodes = roadmapData.filter((n) => n.level === "A1");
  const a2Nodes = roadmapData.filter((n) => n.level === "A2");

  return (
    <div
      className="min-h-dvh w-full bg-slate-50 dark:bg-[#121212] 
    text-slate-900 dark:text-[#E0E0E0] transition-colors 
    duration-300 flex flex-col"
    >
      {/* Top Panel: Branding & Text */}
      <section className="sticky top-0 w-full flex justify-center items-center px-4 md:px-10 py-3 md:py-4 bg-white/90 dark:bg-[#121212]/90 backdrop-blur-md border-b border-slate-200 dark:border-[#444444] shadow-sm z-50 transition-colors duration-300">
        <div className="w-full max-w-6xl flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-600 dark:text-[#B0B0B0] hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
            title="Back to Main Menu"
          >
            <div className="p-1.5 rounded-full bg-slate-100 dark:bg-[#333] group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </div>
            <span className="hidden sm:inline text-sm font-semibold ">
              Main Menu
            </span>
          </Link>
          <div className="text-center absolute left-1/2 -translate-x-1/2">
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-[#E0E0E0] tracking-tight">
              Roadmap
            </h1>
          </div>
          <div className="w-[88px] sm:w-[120px]"></div>{" "}
          {/* Spacer to keep title perfectly centered */}
        </div>
      </section>

      <RoadmapSection
        level="A1"
        title="Beginner"
        nodes={a1Nodes}
        color="#3b82f6"
        accent="#60a5fa"
      />

      <RoadmapSection
        level="A2"
        title="Elementary"
        nodes={a2Nodes}
        color="#10b981"
        accent="#34d399"
      />

      {/* Footer / Coming Soon Section */}
      <section className="relative w-full h-[60vh] flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-[#121212] border-t border-slate-200 dark:border-[#333]">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="inline-flex items-center justify-center p-3 sm:p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 mb-2 shadow-sm border border-blue-100 dark:border-blue-900/30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v20" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold bg-linear-to-r from-slate-900 via-blue-900 to-slate-900 dark:from-white dark:via-blue-300 dark:to-white bg-clip-text text-transparent">
            B1, B2, C1, C2
          </h2>
          <div className="h-px w-16 bg-slate-200 dark:bg-[#444] mx-auto"></div>
          <p className="text-slate-500 dark:text-[#888888] font-medium tracking-wide uppercase text-xs md:text-sm">
            Mastery Content Coming Soon
          </p>
        </div>
      </section>
    </div>
  );
}
