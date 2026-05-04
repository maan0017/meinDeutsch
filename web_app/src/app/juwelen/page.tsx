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
import WordExplainComp from "@/components/WordExplainComp";

type ColorType =
  | "blue"
  | "emerald"
  | "purple"
  | "indigo"
  | "amber"
  | "rose"
  | "cyan";

interface QuizCardProps {
  href: string;
  title: React.ReactNode;
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
    amber:
      "hover:border-amber-500/50 dark:hover:border-amber-500 group-hover:shadow-amber-500/20",
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
        hover:shadow-lg hover:-translate-y-0.5 hover:z-20
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
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-0.5 transition-colors">
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
      title: <>Alphabetübung</>,
      description: "Lerne, deutsche Buchstaben auszusprechen und zu tippen",
      color: "blue",
      icon: Type,
    },
    {
      href: "/juwel/practice-german-numbers",
      title: (
        <>
          <WordExplainComp
            word="Zahlenspiel"
            meaning="Numbers Game"
            position="TOP_LEFT_LEFT"
            className="group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors"
          />
        </>
      ),
      description: "Zahlen von null bis unendlich buchstabieren und tippen",
      color: "cyan",
      icon: Hash,
    },
    {
      href: "/juwel/practice-german-time",
      title: (
        <>
          <WordExplainComp
            word="Uhrzeit"
            meaning="Telling Time"
            position="TOP_RIGHT_RIGHT"
            className="group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors"
          />
        </>
      ),
      description: "Übe das Lesen und Schreiben der Uhrzeit auf Deutsch",
      color: "rose",
      icon: Clock,
    },
    {
      href: "/juwel/calendar-memory-game",
      title: (
        <>
          <WordExplainComp
            word="Kalender"
            meaning="Calendar"
            position="TOP_LEFT_LEFT"
            className="group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors"
          />
          -Memory
        </>
      ),
      description: "Merke dir Wochentage, Monate und Jahreszeiten",
      color: "emerald",
      icon: Calendar,
    },

    // --- VOCABULARY ---
    {
      href: "/juwel/practice-german-word",
      title: (
        <>
          <WordExplainComp
            word="Vokabeltrainer"
            meaning="Vocabulary Builder"
            position="TOP_RIGHT_RIGHT"
            className="group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
          />
        </>
      ),
      description: "Tippe die genaue deutsche Übersetzung für wichtige Wörter",
      color: "indigo",
      icon: PenTool,
    },
    {
      href: "/juwel/practice-german-word-mcq",
      title: (
        <>
          <WordExplainComp
            word="Vokabel"
            meaning="Vocabulary"
            position="TOP_LEFT_LEFT"
            className="group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors"
          />
          -Quiz
        </>
      ),
      description: "Multiple-Choice-Test für Wortübersetzungen",
      color: "purple",
      icon: ListChecks,
    },
    {
      href: "/juwel/adjectives-memory-game",
      title: (
        <>
          <WordExplainComp
            word="Adjektiv"
            meaning="Adjective"
            position="TOP_RIGHT_RIGHT"
            className="group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors"
          />
          -Memory
        </>
      ),
      description: "Merke dir häufige beschreibende Wörter und ihre Gegensätze",
      color: "amber",
      icon: GitCompare,
    },
    {
      href: "/juwel/practice-wh-words",
      title: (
        <>
          <WordExplainComp
            word="W-Fragen"
            meaning="Wh-Questions"
            position="TOP_LEFT_LEFT"
            className="group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors"
          />
          -Quiz
        </>
      ),
      description: "Meistere die Fragewörter: wer, was, wo, wann, warum",
      color: "rose",
      icon: HelpCircle,
    },

    // --- GRAMMAR & STRUCTURE ---
    {
      href: "/juwel/grammar-cases-memory-game",
      title: (
        <>
          <WordExplainComp
            word="Kasus"
            meaning="Cases"
            position="TOP_RIGHT_RIGHT"
            className="group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors"
          />
          -Meister
        </>
      ),
      description:
        "Merke dir die Nominativ-, Akkusativ-, Dativ- & Genitiv-Tabellen",
      color: "emerald",
      icon: Layers,
    },
    {
      href: "/juwel/dativs-memory-game",
      title: (
        <>
          Dativ-
          <WordExplainComp
            word="Verben"
            meaning="Verbs"
            position="TOP_LEFT_LEFT"
            className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
          />
        </>
      ),
      description:
        "Merke dir spezifische Verben, die zwingend den Dativ verlangen",
      color: "blue",
      icon: Target,
    },
    {
      href: "/juwel/prepositions-memory-game",
      title: (
        <>
          <WordExplainComp
            word="Präpositionen"
            meaning="Prepositions"
            position="TOP_RIGHT_RIGHT"
            className="group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors"
          />
          -Matrix
        </>
      ),
      description: "Meistere Akkusativ-, Dativ- und Wechselpräpositionen",
      color: "purple",
      icon: ListChecks,
    },
    {
      href: "/juwel/konnectors-memory-game",
      title: (
        <>
          <WordExplainComp
            word="Konnektoren"
            meaning="Connectors"
            position="TOP_LEFT_LEFT"
            className="group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors"
          />
          -Spiel
        </>
      ),
      description: "Übe Konjunktionen wie weil, dass, wenn und deshalb",
      color: "cyan",
      icon: Link2,
    },
    {
      href: "/juwel/modal-verbs-memory-game",
      title: (
        <>
          <WordExplainComp
            word="Modalverben"
            meaning="Modal Verbs"
            position="TOP_RIGHT_RIGHT"
            className="group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors"
          />
        </>
      ),
      description: "Merke dir Konjugationen für können, müssen, dürfen, usw.",
      color: "amber",
      icon: Zap,
    },
    {
      href: "/juwel/verb-forms-challange",
      title: (
        <>
          <WordExplainComp
            word="Verbformen"
            meaning="Verb Forms"
            position="TOP_LEFT_LEFT"
            className="group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors"
          />
          -Herausforderung
        </>
      ),
      description:
        "Meistere die Vergangenheitsform und Partizipien unregelmäßiger Verben",
      color: "rose",
      icon: RefreshCw,
    },
    {
      href: "/juwel/practice-grammar",
      title: (
        <>
          <WordExplainComp
            word="Grammatik"
            meaning="Grammar"
            position="TOP_RIGHT_RIGHT"
            className="group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
          />
          -Übungen
        </>
      ),
      description: "Unendliche, rasante Übungen zum Aufbau deiner Grammatik",
      color: "indigo",
      icon: Brain,
    },
    {
      href: "/juwel/grammar-exercises",
      title: (
        <>
          Grammatik-
          <WordExplainComp
            word="Prüfungen"
            meaning="Exams"
            position="TOP_LEFT_LEFT"
            className="group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors"
          />
        </>
      ),
      description: "Umfassende Tests zu Artikeln und Konjugationen",
      color: "purple",
      icon: GraduationCap,
    },

    // --- COMPREHENSION & USAGE ---
    {
      href: "/juwel/practice-german-sentences",
      title: (
        <>
          <WordExplainComp
            word="Satzbauer"
            meaning="Sentence Builder"
            position="TOP_RIGHT_RIGHT"
            className="group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors"
          />
        </>
      ),
      description:
        "Übersetze und bilde vollständige, grammatikalisch korrekte Sätze",
      color: "emerald",
      icon: Puzzle,
    },
    {
      href: "/juwel/practice-reading",
      title: (
        <>
          <WordExplainComp
            word="Leseverstehen"
            meaning="Reading Comprehension"
            position="TOP_LEFT_LEFT"
            className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
          />
        </>
      ),
      description: "Lese, analysiere und verstehe vollständige deutsche Texte",
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
                <WordExplainComp
                  word="Zurück zum Hauptmenü"
                  meaning="Back to the main menu"
                  position="TOP_RIGHT_RIGHT"
                />
              </span>
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
              Meine{" "}
              <WordExplainComp
                word="Juwelen"
                meaning="Gems"
                position="TOP_RIGHT_RIGHT"
                offsetY={-5}
                highlight={true}
              />
            </h1>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <WordExplainComp
                word="Wähle einen Spielmodus"
                meaning="Select a game mode"
                position="RIGHT"
                offsetX={30}
              />
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
