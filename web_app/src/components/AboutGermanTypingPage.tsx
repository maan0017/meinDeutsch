import Link from "next/link";
import { Keyboard, ArrowRight } from "lucide-react";

export const AboutGermanTypingPage = () => {
  return (
    <Link
      href="/about-german-keyboard"
      className="group relative z-10 block rounded-xl border border-slate-200 dark:border-[#2a2a2a] hover:border-cyan-300 dark:hover:border-cyan-800 bg-white dark:bg-[#1a1a1a] overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
      aria-label="Navigate to German Keyboard Tool"
    >
      <div className="flex items-center gap-4 p-4 md:p-5">
        {/* Icon */}
        <div className="w-10 h-10 rounded-lg bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200">
          <Keyboard className="w-5 h-5" strokeWidth={2} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="text-sm font-bold text-slate-900 dark:text-[#E0E0E0] truncate">
              German Keyboard &amp; Typing Guide
            </h3>
            <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800/40 shrink-0">
              Tool
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-[#888] leading-snug">
            5 ways to type ä ö ü ß — shortcuts, layouts &amp; interactive
            keyboard
          </p>
        </div>

        {/* Arrow */}
        <ArrowRight className="w-4 h-4 text-slate-300 dark:text-[#444] group-hover:text-cyan-500 dark:group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all duration-200 shrink-0" />
      </div>
    </Link>
  );
};
