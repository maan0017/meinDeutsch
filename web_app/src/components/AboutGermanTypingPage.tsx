import Link from "next/link";
import { Keyboard } from "lucide-react";

export const AboutGermanTypingPage = () => {
  return (
    <Link
      href="/about-german-keyboard"
      className="group relative bg-white dark:bg-[#121212] px-6 py-4 md:px-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-cyan-200 dark:border-[#444444] hover:border-cyan-300 dark:hover:border-cyan-700 overflow-hidden block"
      aria-label="Navigate to German Keyboard Tool"
    >
      <div className="absolute inset-0 bg-cyan-50/30 dark:bg-cyan-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <div
          className={`w-14 h-14 bg-cyan-50 text-cyan-600 group-hover:bg-cyan-600 rounded-xl flex items-center justify-center shrink-0 group-hover:text-white group-hover:scale-105 transition-all duration-300 shadow-md dark:bg-[#121212] dark:text-cyan-400 dark:border dark:border-[#444444]`}
        >
          <Keyboard className="w-6 h-6" />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold text-slate-900 dark:text-[#E0E0E0] group-hover:text-cyan-700 dark:group-hover:text-cyan-400 transition-colors">
              German Keyboard Tool
            </h3>
            <span className="px-2 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 text-xs font-semibold rounded-full">
              No Install
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-[#B0B0B0] mb-2">
            Type Umlaute (ä, ö, ü, ß) easily without installing anything.
            Perfect for quick German typing on any device.
          </p>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-[#888888]">
            <div className="w-1.5 h-1.5 bg-cyan-500 dark:bg-cyan-400 rounded-full" />
            Browser-based tool
          </div>
        </div>

        <div className="hidden sm:block text-slate-400 dark:text-[#888888] group-hover:text-cyan-600 dark:group-hover:text-cyan-400 group-hover:translate-x-1 transition-all">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};
