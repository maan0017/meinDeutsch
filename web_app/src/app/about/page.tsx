"use client";
import Link from "next/link";
import { Mail, Linkedin, Globe } from "lucide-react";
import { useGoBack } from "@/hooks/useGoBack";

export default function AboutPage() {
  useGoBack();
  return (
    <div className="h-dvh w-full flex flex-col items-center justify-center bg-white dark:bg-[#121212] text-slate-900 dark:text-[#E0E0E0] px-6 relative">
      {/* Back */}
      <Link
        href="/"
        className="absolute top-4 left-4 flex items-center gap-1.5 text-slate-400 dark:text-[#666] hover:text-slate-700 dark:hover:text-[#ccc] transition-colors"
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
        <span className="text-sm font-medium">Back to main menu</span>
      </Link>

      <div className="max-w-md w-full space-y-6">
        {/* Title */}
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-[#E0E0E0]">
            Mein Deutsch
          </h1>
          <p className="text-xs text-slate-400 dark:text-[#666] font-medium tracking-wider uppercase mt-1">
            About this project
          </p>
        </div>

        {/* Divider */}
        <div className="h-px w-10 bg-slate-200 dark:bg-[#333]" />

        {/* Content */}
        <div className="space-y-4 text-sm md:text-[15px] leading-relaxed text-slate-600 dark:text-[#aaa]">
          <p>
            Built for learning, practicing, and improving German language
            skills. A personal project — just one indie dev working on this
            solo.
          </p>
          <p>
            This project isn&apos;t perfect, and it&apos;s far from it. But
            it&apos;s a start. Improvements are always in progress, and more
            features will be added over time.
          </p>
          <p className="text-slate-400 dark:text-[#666] text-xs italic">
            Made with ☕ and stubbornness.
          </p>
        </div>

        {/* Divider */}
        <div className="h-px w-10 bg-slate-200 dark:bg-[#333]" />

        {/* Contact Links */}
        {/* <div className="flex flex-col gap-3">
          <a
            href="mailto:your.email@example.com"
            className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-[#aaa] hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
          >
            <div className="p-2 rounded-lg bg-slate-100 dark:bg-[#1a1a1a] group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors border border-transparent dark:border-[#222]">
              <Mail className="w-4 h-4" />
            </div>
            Email Me
          </a>
          <a
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-[#aaa] hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
          >
            <div className="p-2 rounded-lg bg-slate-100 dark:bg-[#1a1a1a] group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors border border-transparent dark:border-[#222]">
              <Linkedin className="w-4 h-4" />
            </div>
            LinkedIn Profile
          </a>
          <a
            href="https://yourportfolio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-[#aaa] hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
          >
            <div className="p-2 rounded-lg bg-slate-100 dark:bg-[#1a1a1a] group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors border border-transparent dark:border-[#222]">
              <Globe className="w-4 h-4" />
            </div>
            Professional Portfolio
          </a>
        </div> */}

        {/* Divider */}
        <div className="h-px w-10 bg-slate-200 dark:bg-[#333]" />

        {/* Tech stack / fun facts */}
        <div className="flex flex-wrap gap-2">
          {["Next.js", "TypeScript", "Tailwind CSS", "PWA"].map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border border-slate-200 dark:border-[#333] bg-slate-50 dark:bg-[#1a1a1a] text-slate-400 dark:text-[#555]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
