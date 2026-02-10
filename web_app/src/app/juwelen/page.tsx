"use client";

import { useGoBack } from "@/hooks/useGoBack";
import Link from "next/link";
import {
  BookType,
  ListChecks,
  Hash,
  Clock,
  BrainCircuit,
  GraduationCap,
  LucideIcon,
  BookMinus,
  BookUserIcon,
  BookMarked,
} from "lucide-react";

type ColorType = "blue" | "emerald" | "purple" | "indigo";

interface QuizCardProps {
  href: string;
  title: string;
  description: string;
  color: ColorType;
  icon: LucideIcon;
}

const QuizCard = ({
  href,
  title,
  description,
  color,
  icon: Icon,
}: QuizCardProps) => {
  const colors: Record<ColorType, string> = {
    blue: "hover:border-blue-500/50 dark:hover:border-blue-500 group-hover:shadow-blue-500/20",
    emerald:
      "hover:border-emerald-500/50 dark:hover:border-emerald-500 group-hover:shadow-emerald-500/20",
    purple:
      "hover:border-purple-500/50 dark:hover:border-purple-500 group-hover:shadow-purple-500/20",
    indigo:
      "hover:border-indigo-500/50 dark:hover:border-indigo-500 group-hover:shadow-indigo-500/20",
  };

  const iconColors: Record<ColorType, string> = {
    blue: "text-blue-600 dark:text-blue-400",
    emerald: "text-emerald-600 dark:text-emerald-400",
    purple: "text-purple-600 dark:text-purple-400",
    indigo: "text-indigo-600 dark:text-indigo-400",
  };

  const bgColors: Record<ColorType, string> = {
    blue: "group-hover:bg-blue-50/30 dark:group-hover:bg-blue-950/20",
    emerald: "group-hover:bg-emerald-50/30 dark:group-hover:bg-emerald-950/20",
    purple: "group-hover:bg-purple-50/30 dark:group-hover:bg-purple-950/20",
    indigo: "group-hover:bg-indigo-50/30 dark:group-hover:bg-indigo-950/20",
  };

  return (
    <Link
      href={href}
      className={`
        group relative flex items-center gap-3 p-3.5
        bg-white dark:bg-[#1E1E1E] 
        rounded-xl border border-slate-200 dark:border-[#333] 
        hover:shadow-lg hover:-translate-y-0.5
        transition-all duration-200 ease-out
        ${colors[color]} ${bgColors[color]}
      `}
    >
      {/* Icon - compact size */}
      <div
        className={`shrink-0 ${iconColors[color]} transition-transform duration-200 group-hover:scale-110`}
      >
        <Icon className="w-5 h-5" strokeWidth={2.5} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate mb-0.5 transition-colors">
          {title}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
          {description}
        </p>
      </div>

      {/* Arrow indicator */}
      <div className="shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
        <svg
          className="w-4 h-4 text-slate-400 dark:text-slate-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </Link>
  );
};

export default function QuizGamesHomePage() {
  useGoBack();

  const quizzes: QuizCardProps[] = [
    {
      href: "/juwel/bookmarked-words-guess",
      title: "Bookmarked Words Guess",
      description: "Guess the German word from your bookmarks",
      color: "emerald",
      icon: BookMarked,
    },
    {
      href: "/juwel/practice-german-word",
      title: "Practice German Words",
      description: "Guess the German word",
      color: "blue",
      icon: BookType,
    },
    {
      href: "/juwel/practice-german-word-mcq",
      title: "Practice German Words (MCQs)",
      description: "Guess the meaning of German words out of 4 options",
      color: "emerald",
      icon: ListChecks,
    },
    {
      href: "/juwel/practice-german-numbers",
      title: "Practice German Numbers",
      description: "Write numbers in German",
      color: "blue",
      icon: Hash,
    },
    {
      href: "/juwel/practice-german-time",
      title: "Practice German Time",
      description: "Write time in German",
      color: "emerald",
      icon: Clock,
    },
    {
      href: "/juwel/practice-grammar",
      title: "Practice Core Grammar",
      description: "Infinite grammar drills without hints",
      color: "indigo",
      icon: BrainCircuit,
    },
    {
      href: "/juwel/grammar-exercises",
      title: "Grammar Exercises",
      description: "Master conjugations, articles, and cases",
      color: "purple",
      icon: GraduationCap,
    },
    {
      href: "/juwel/practice-german-sentences",
      title: "Practice German Sentences",
      description: "Write sentences in German",
      color: "emerald",
      icon: BookMinus,
    },
    {
      href: "/juwel/practice-reading",
      title: "Practice Reading",
      description: "Read German sentences",
      color: "indigo",
      icon: BookUserIcon,
    },
  ];

  return (
    <main className="min-h-screen w-full flex flex-col bg-slate-50 dark:bg-[#121212] overflow-hidden">
      {/* Header Section - minimal height */}
      <div className="pt-6 pb-4 px-6 z-10 w-full">
        <div className="max-w-7xl mx-auto w-full relative flex items-center justify-center">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 ml-6">
            <Link
              href="/"
              className="p-1.5 md:p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#444444] text-gray-500 dark:text-[#B0B0B0] transition-colors inline-flex items-center justify-center"
              title="Back to Quiz Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              <span className="hidden md:inline text-sm font-semibold font-serif">
                Back To Main Menu
              </span>
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
              My Gems
            </h1>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Select a game mode
            </p>
          </div>
        </div>
      </div>

      {/* Content Grid - Fill remaining space, centered */}
      <div className="flex-1 p-6 flex flex-col justify-center max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.href} {...quiz} />
          ))}

          {/* Future proof placeholder or empty space handler if needed, 
                  but user said "don't use too much sapce for all option beacuse in future i'm going to add more game options"
                  Grid auto-flow handles this well.
              */}
        </div>
      </div>
    </main>
  );
}
