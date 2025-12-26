import Link from "next/link";
import { Book, Gamepad2, Settings } from "lucide-react";
import { ThemeToggleButton } from "@/components/ToggleThemeButton";

export default function Home() {
  // Main Landing Page
  const cards = [
    {
      href: "/german-language-most-common-words",
      icon: Book,
      title: "German Core Vocabulary",
      description:
        "Most commonly used German words with english and hindi meanings.",
      stat: "2,000+ words",
      color: "blue",
      badge: "Essential",
    },
    {
      href: "/juwelen",
      icon: Gamepad2,
      title: "Quiz Games",
      description: "Practice German with games.",
      stat: "6 game modes",
      color: "indigo",
      badge: "Practice",
    },
    // {
    //   href: "/german-language-most-common-sentences",
    //   icon: MessageCircle,
    //   title: "Sentences",
    //   description: "Useful phrases",
    //   stat: "300+ phrases",
    //   color: "emerald",
    //   badge: "Essential",
    // },
    // {
    //   href: "/german-language-roadmap",
    //   icon: Map,
    //   title: "Roadmap",
    //   description: "Learning path",
    //   stat: "A1 to C2",
    //   color: "amber",
    // },
    // {
    //   href: "/grammar-reference",
    //   icon: BookOpen,
    //   title: "Grammar",
    //   description: "Rules & examples",
    //   stat: "12 topics",
    //   color: "rose",
    // },
    // {
    //   href: "/flashcards",
    //   icon: Zap,
    //   title: "Flashcards",
    //   description: "Spaced repetition",
    //   stat: "Smart review",
    //   color: "purple",
    // },
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
      {/* Top Panel: Branding & Text */}
      <section className="flex w-full justify-center items-center px-6 md:px-10 py-2 bg-white dark:bg-[#121212] border-b border-slate-200 dark:border-[#444444] shadow-sm z-10 transition-colors duration-300">
        <div className="w-full max-w-6xl flex justify-between items-center">
          <div className="flex flex-col">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-[#E0E0E0] mb-3 bg-linear-to-r from-slate-900 via-blue-900 to-slate-900 dark:from-white dark:via-blue-300 dark:to-white bg-clip-text">
                mein Deutsch
              </h1>

              <p className=" text-slate-600 dark:text-[#B0B0B0] pl-2 leading-relaxed italic text-base md:text-lg mb-2 font-serif">
                &quot;My personal German learning project.&quot;
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggleButton />
            <Link
              href="/settings"
              aria-label="Settings"
              className="p-2 rounded-full text-zinc-500 hover:bg-slate-100 dark:text-zinc-400 dark:hover:bg-[#333] transition-all"
            >
              <Settings className="w-5 h-5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>

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
                  className="group relative bg-white dark:bg-[#121212] p-4 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 border border-slate-200 dark:border-[#444444] hover:border-blue-300 dark:hover:border-blue-700 overflow-hidden"
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
                        } dark:bg-[#121212] dark:text-[#E0E0E0] dark:border dark:border-[#444444]`}
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

          {/* Keyboard Tool - Full Width */}
          {/* <Link
            href="/about-german-keyboard"
            className="group relative bg-white dark:bg-[#121212] px-6 py-4 md:px-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-cyan-200 dark:border-[#444444] hover:border-cyan-300 dark:hover:border-cyan-700 overflow-hidden block"
            aria-label="Navigate to German Keyboard Tool"
          >
            <div className="absolute inset-0 bg-cyan-50/30 dark:bg-cyan-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div
                className={`w-14 h-14 ${colorClasses.cyan} rounded-xl flex items-center justify-center shrink-0 group-hover:text-white group-hover:scale-105 transition-all duration-300 shadow-md dark:bg-[#121212] dark:text-cyan-400 dark:border dark:border-[#444444]`}
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
          </Link> */}
        </div>
      </section>
    </main>
  );
}
