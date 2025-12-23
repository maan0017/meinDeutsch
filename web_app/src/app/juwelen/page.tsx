"use client";

import { useGoBack } from "@/hooks/useGoBack";
import Link from "next/link";

type ColorType = "blue" | "emerald";

interface QuizCardProps {
  href: string;
  title: string;
  description: string;
  color: ColorType;
}

const QuizCard = ({ href, title, description, color }: QuizCardProps) => {
  const colors: Record<ColorType, string> = {
    blue: "hover:border-blue-500/50 dark:hover:border-blue-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:bg-blue-50",
    emerald:
      "hover:border-emerald-500/50 dark:hover:border-emerald-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:bg-emerald-50",
  };

  const colorClass = colors[color];

  return (
    <Link
      href={href}
      className={`group flex items-center p-5 bg-white dark:bg-[#1E1E1E] rounded-2xl border border-slate-200 dark:border-[#444] shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-200 ${colorClass}`}
    >
      <div className="flex-1">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white transition-colors">
          {title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-[#B0B0B0] mt-1 pr-2">
          {description}
        </p>
      </div>
      <div className="h-8 w-8 rounded-full bg-slate-50 dark:bg-[#2A2A2A] flex items-center justify-center shrink-0 transition-colors">
        <span className="text-slate-400 dark:text-[#888] transition-colors group-hover:translate-x-0.5 transform duration-300">
          →
        </span>
      </div>
    </Link>
  );
};

export default function QuizGamesHomePage() {
  useGoBack();

  const quizzes: QuizCardProps[] = [
    {
      href: "/juwel/practice-german-word",
      title: "Practice German Word",
      description: "Translate English words to German",
      color: "blue",
    },
    {
      href: "/juwel/practice-german-word-mcq",
      title: "Practice German Word (MCQ)",
      description: "Identify the meaning of English words out of 4 options",
      color: "emerald",
    },
    {
      href: "/juwel/practice-german-numbers",
      title: "Practice German Number",
      description: "Write numbers in German",
      color: "blue",
    },
    {
      href: "/juwel/practice-german-time",
      title: "Practice German Time",
      description: "Write time in German",
      color: "emerald",
    },
  ];

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-[#121212]">
      <div className="w-full max-w-lg space-y-8">
        {/* Top Section */}
        <div className="relative flex items-center justify-center w-full mb-8">
          {/* Back Button - Pinned to the left absolutely */}
          <Link
            href="/"
            className="
      absolute left-0
      group inline-flex items-center gap-2
      px-2 py-2 -ml-2 /* Negative margin expands touch area without moving visual center */
      text-sm font-medium
      text-slate-500 hover:text-slate-900 
      dark:text-slate-400 dark:hover:text-white
      transition-colors duration-200
    "
            aria-label="Go back"
          >
            <svg
              className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={
                2.5
              } /* Slightly thicker for better visibility without text */
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Link>

          {/* Header - Centered naturally by the flex container */}
          <header className="text-center space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              my Gems
            </h1>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Select a game mode
            </p>
          </header>
        </div>

        {/* Game Options */}
        <nav className="flex flex-col gap-4">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.href} {...quiz} />
          ))}
        </nav>
      </div>
    </main>
  );
}
