import Link from "next/link";
import {
  Book,
  BookOpen,
  ChromeIcon,
  Gamepad2,
  Info,
  Keyboard,
  Map,
  MessageCircle,
  Settings,
  Zap,
} from "lucide-react";
import { ThemeToggleButton } from "@/components/ToggleThemeButton";

export default function Home() {
  // Main Landing Page
  const cards = [
    {
      href: "/german-language-roadmap",
      icon: Map,
      title: "Learning Roadmap",
      description: "Structured curriculum from A1 beginner to C2 mastery.",
      stat: "A1 to C2 Path",
      color: "emerald",
      badge: "Start Here",
    },
    {
      href: "/german-language-most-common-words",
      icon: BookOpen,
      title: "Core Vocabulary",
      description:
        "Master the most frequent German words with bilingual translations.",
      stat: "2,000+ words",
      color: "indigo",
      badge: "Essential",
    },
    {
      href: "/juwelen",
      icon: Gamepad2,
      title: "Interactive Games",
      description:
        "Test your grammar and vocabulary through gamified practice.",
      stat: "10+ Game Modes",
      color: "amber",
      badge: "Practice",
    },
    {
      href: "/about-german-keyboard",
      icon: Keyboard,
      title: "German Keyboard",
      description:
        "Learn the easiest ways to type umlauts (ä, ö, ü) and the Eszett (ß).",
      stat: "Typing Guide",
      color: "cyan",
      badge: "Tool",
    },
    {
      href: "/about",
      icon: Info,
      title: "About the Project",
      description:
        "Information about the developer and the learning philosophy.",
      stat: "Version 1.0",
      color: "purple",
    },
  ];

  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 group-hover:bg-blue-600",
    indigo: "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600",
    emerald: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600",
    amber: "bg-amber-50 text-amber-600 group-hover:bg-amber-600",
    cyan: "bg-cyan-50 text-cyan-600 group-hover:bg-cyan-600",
    rose: "bg-rose-50 text-rose-600 group-hover:bg-rose-600",
    purple: "bg-purple-50 text-purple-600 group-hover:bg-purple-600",
  };

  return (
    <main className="h-screen w-full flex flex-col bg-slate-50 dark:bg-[#121212] overflow-auto text-slate-900 dark:text-[#E0E0E0] transition-colors duration-300">
      {/* Top Panel: Compact Header */}
      <header className="flex w-full justify-center px-4 md:px-8 py-3 bg-white/90 dark:bg-[#151515]/90 backdrop-blur-md border-b border-slate-200 dark:border-[#222] shadow-sm sticky top-0 z-50 transition-colors duration-300">
        <div className="w-full max-w-6xl flex justify-between items-center">
          {/* Logo & Tagline */}
          <div className="flex items-baseline gap-3 md:gap-4">
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 dark:text-[#eee]">
              Mein Deutsch
            </h1>
            <span className="hidden md:block w-1 h-1 rounded-full bg-slate-300 dark:bg-[#444]" />
            <p className="hidden sm:block text-slate-500 dark:text-[#888] text-xs font-medium tracking-wide uppercase">
              Language Practice
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1.5">
            <ThemeToggleButton />
            <Link
              href="/settings"
              aria-label="Settings"
              className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:text-[#666] dark:hover:text-[#ccc] dark:hover:bg-[#2a2a2a] transition-all"
            >
              <Settings className="w-6 h-6" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </header>

      {/* Navigation Grid */}
      <section className="flex items-start justify-center p-4 md:p-8 lg:p-12">
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-5">
            {cards.map((card, index) => {
              const Icon = card.icon;
              return (
                <Link
                  key={index}
                  href={card.href}
                  className="group relative bg-white dark:bg-[#1a1a1a] p-4 rounded-xl shadow-sm z-10 
                  hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 border 
                  border-slate-200 dark:border-[#2a2a2a] hover:border-blue-300 
                  dark:hover:border-blue-700 overflow-hidden"
                  aria-label={`Navigate to ${card.title}`}
                >
                  {/* Subtle hover background */}
                  <div className="absolute inset-0 bg-blue-50/40 dark:bg-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                  {/* Badge */}
                  {card.badge && (
                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-blue-600 dark:bg-blue-500 text-white text-[10px] font-semibold rounded-full">
                      {card.badge}
                    </div>
                  )}

                  <div className="relative">
                    {/* Icon + Title */}
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-105 group-hover:text-white ${
                          colorClasses[card.color as keyof typeof colorClasses]
                        } dark:bg-[#1a1a1a] dark:text-[#E0E0E0] dark:border dark:border-[#2a2a2a]`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      <h3 className="text-base font-semibold text-slate-900 dark:text-[#E0E0E0] group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                        {card.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-slate-600 dark:text-[#B0B0B0] leading-snug mb-2">
                      {card.description}
                    </p>

                    {/* Stat */}
                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500 dark:text-[#888888]">
                      <span className="w-1 h-1 bg-blue-500 dark:bg-blue-400 rounded-full" />
                      {card.stat}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
