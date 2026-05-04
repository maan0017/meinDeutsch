"use client";

import { useGoBack } from "@/hooks/useGoBack";
import Link from "next/link";
import {
  Type,
  Hash,
  Clock,
  Calendar,
  PenTool,
  ListChecks,
  HelpCircle,
  Layers,
  Target,
  GitCompare,
  Link2,
  Zap,
  RefreshCw,
  Brain,
  GraduationCap,
  Puzzle,
  BookOpen,
  LucideIcon,
} from "lucide-react";

type ColorType = "blue" | "emerald" | "purple" | "indigo" | "amber" | "rose" | "cyan";

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
    emerald: "hover:border-emerald-500/50 dark:hover:border-emerald-500 group-hover:shadow-emerald-500/20",
    purple: "hover:border-purple-500/50 dark:hover:border-purple-500 group-hover:shadow-purple-500/20",
    indigo: "hover:border-indigo-500/50 dark:hover:border-indigo-500 group-hover:shadow-indigo-500/20",
    amber: "hover:border-amber-500/50 dark:hover:border-amber-500 group-hover:shadow-amber-500/20",
    rose: "hover:border-rose-500/50 dark:hover:border-rose-500 group-hover:shadow-rose-500/20",
    cyan: "hover:border-cyan-500/50 dark:hover:border-cyan-500 group-hover:shadow-cyan-500/20",
  };

  const iconColors: Record<ColorType, string> = {
    blue: "text-blue-600 dark:text-blue-400",
    emerald: "text-emerald-600 dark:text-emerald-400",
    purple: "text-purple-600 dark:text-purple-400",
    indigo: "text-indigo-600 dark:text-indigo-400",
    amber: "text-amber-600 dark:text-amber-400",
    rose: "text-rose-600 dark:text-rose-400",
    cyan: "text-cyan-600 dark:text-cyan-400",
  };

  const bgColors: Record<ColorType, string> = {
    blue: "group-hover:bg-blue-50/30 dark:group-hover:bg-blue-950/20",
    emerald: "group-hover:bg-emerald-50/30 dark:group-hover:bg-emerald-950/20",
    purple: "group-hover:bg-purple-50/30 dark:group-hover:bg-purple-950/20",
    indigo: "group-hover:bg-indigo-50/30 dark:group-hover:bg-indigo-950/20",
    amber: "group-hover:bg-amber-50/30 dark:group-hover:bg-amber-950/20",
    rose: "group-hover:bg-rose-50/30 dark:group-hover:bg-rose-950/20",
    cyan: "group-hover:bg-cyan-50/30 dark:group-hover:bg-cyan-950/20",
  };

  return (
    <Link
      href={href}
      className={`
        group relative flex items-center gap-3 p-3.5 z-10
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
    // --- FOUNDATION ---
    {
      href: "/juwel/practice-german-alphabets",
      title: "Alphabet Practice",
      description: "Learn to pronounce and type German letters",
      color: "blue",
      icon: Type,
    },
    {
      href: "/juwel/practice-german-numbers",
      title: "Numbers Game",
      description: "Spell and type numbers from zero to infinity",
      color: "cyan",
      icon: Hash,
    },
    {
      href: "/juwel/practice-german-time",
      title: "Telling Time",
      description: "Practice reading and writing the clock in German",
      color: "rose",
      icon: Clock,
    },
    {
      href: "/juwel/calendar-memory-game",
      title: "Calendar Memory",
      description: "Memorize days of the week, months, and seasons",
      color: "emerald",
      icon: Calendar,
    },

    // --- VOCABULARY ---
    {
      href: "/juwel/practice-german-word",
      title: "Vocabulary Builder",
      description: "Type the exact German translation for essential words",
      color: "indigo",
      icon: PenTool,
    },
    {
      href: "/juwel/practice-german-word-mcq",
      title: "Vocabulary Quiz",
      description: "Multiple-choice test for word translations",
      color: "purple",
      icon: ListChecks,
    },
    {
      href: "/juwel/adjectives-memory-game",
      title: "Adjectives Memory",
      description: "Memorize common descriptive words and their opposites",
      color: "amber",
      icon: GitCompare,
    },
    {
      href: "/juwel/practice-wh-words",
      title: "W-Fragen Quiz",
      description: "Master the question words: who, what, where, when, why",
      color: "rose",
      icon: HelpCircle,
    },

    // --- GRAMMAR & STRUCTURE ---
    {
      href: "/juwel/grammar-cases-memory-game",
      title: "Cases Master",
      description: "Memorize the Nominativ, Akkusativ, Dativ & Genitiv tables",
      color: "emerald",
      icon: Layers,
    },
    {
      href: "/juwel/dativs-memory-game",
      title: "Dativ Verbs",
      description: "Memorize specific verbs that strictly demand the Dativ case",
      color: "blue",
      icon: Target,
    },
    {
      href: "/juwel/prepositions-memory-game",
      title: "Prepositions Matrix",
      description: "Master Akkusativ, Dativ, and two-way (Wechsel) prepositions",
      color: "purple",
      icon: ListChecks,
    },
    {
      href: "/juwel/konnectors-memory-game",
      title: "Connectors Game",
      description: "Practice conjunctions like weil, dass, wenn, and deshalb",
      color: "cyan",
      icon: Link2,
    },
    {
      href: "/juwel/modal-verbs-memory-game",
      title: "Modal Verbs",
      description: "Memorize conjugations for können, müssen, dürfen, etc.",
      color: "amber",
      icon: Zap,
    },
    {
      href: "/juwel/verb-forms-challange",
      title: "Verb Forms Challenge",
      description: "Master the past tense and participles of irregular verbs",
      color: "rose",
      icon: RefreshCw,
    },
    {
      href: "/juwel/practice-grammar",
      title: "Core Grammar Drills",
      description: "Infinite, fast-paced exercises to build your grammar muscle",
      color: "indigo",
      icon: Brain,
    },
    {
      href: "/juwel/grammar-exercises",
      title: "Grammar Exams",
      description: "Comprehensive tests covering articles and conjugations",
      color: "purple",
      icon: GraduationCap,
    },

    // --- COMPREHENSION & USAGE ---
    {
      href: "/juwel/practice-german-sentences",
      title: "Sentence Builder",
      description: "Translate and construct complete, grammatically correct sentences",
      color: "emerald",
      icon: Puzzle,
    },
    {
      href: "/juwel/practice-reading",
      title: "Reading Comprehension",
      description: "Read, analyze, and understand full German texts",
      color: "blue",
      icon: BookOpen,
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
              <span className="hidden md:inline text-sm font-semibold ">
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
      <div className="flex-1 p-6 flex flex-col justify-start max-w-7xl mx-auto w-full">
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
