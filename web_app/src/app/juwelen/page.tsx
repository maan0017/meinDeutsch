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
  ArrowLeft,
  LucideIcon,
  LineChart,
  Scale,
  BookA,
  BookMinus,
  BookUserIcon,
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
    blue: "hover:border-blue-500/50 dark:hover:border-blue-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:bg-blue-50/50 dark:group-hover:bg-blue-900/10",
    emerald:
      "hover:border-emerald-500/50 dark:hover:border-emerald-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:bg-emerald-50/50 dark:group-hover:bg-emerald-900/10",
    purple:
      "hover:border-purple-500/50 dark:hover:border-purple-500 group-hover:text-purple-600 dark:group-hover:text-purple-400 group-hover:bg-purple-50/50 dark:group-hover:bg-purple-900/10",
    indigo:
      "hover:border-indigo-500/50 dark:hover:border-indigo-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:bg-indigo-50/50 dark:group-hover:bg-indigo-900/10",
  };

  const iconColors: Record<ColorType, string> = {
    blue: "text-blue-500 dark:text-blue-400 bg-blue-100/50 dark:bg-blue-900/30",
    emerald:
      "text-emerald-500 dark:text-emerald-400 bg-emerald-100/50 dark:bg-emerald-900/30",
    purple:
      "text-purple-500 dark:text-purple-400 bg-purple-100/50 dark:bg-purple-900/30",
    indigo:
      "text-indigo-500 dark:text-indigo-400 bg-indigo-100/50 dark:bg-indigo-900/30",
  };

  const colorClass = colors[color];
  const iconClass = iconColors[color];

  return (
    <Link
      href={href}
      className={`
        group relative flex flex-col gap-4 p-5 
        bg-white dark:bg-[#1E1E1E] 
        rounded-2xl border border-slate-200 dark:border-[#333] 
        shadow-sm hover:shadow-xl hover:-translate-y-1
        transition-all duration-300 ease-out
        ${colorClass}
      `}
    >
      <div className="flex items-start justify-between w-full">
        <div
          className={`p-3 rounded-xl ${iconClass} transition-colors duration-300`}
        >
          <Icon className="w-6 h-6" strokeWidth={2.5} />
        </div>

        {/* Hover arrow indicator */}
        <div className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <span className="text-slate-400 dark:text-slate-500">→</span>
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-current transition-colors">
          {title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          {description}
        </p>
      </div>
    </Link>
  );
};

export default function QuizGamesHomePage() {
  useGoBack();

  const quizzes: QuizCardProps[] = [
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
