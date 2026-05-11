import Link from "next/link";
import {
  BookOpen,
  Gamepad2,
  Info,
  Keyboard,
  Map,
  Settings,
} from "lucide-react";
import { ThemeToggleButton } from "@/components/ToggleThemeButton";
import WordExplainComp from "@/components/WordExplainComp";

export default function Home() {
  // Main Landing Page
  const cards = [
    {
      href: "/german-language-roadmap",
      icon: Map,
      title: (
        <WordExplainComp
          word="Lernpfad"
          meaning="Learning Path"
          position="TOP_RIGHT_RIGHT"
          className="group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors"
          alwaysShow={true}
          showArrow={true}
        />
      ),
      description: (
        <>
          <WordExplainComp
            word="Strukturierter"
            meaning="Structured"
            theme="slate"
            alwaysShow={false}
            highlight={false}
            position="TOP"
          />{" "}
          <WordExplainComp
            word="Lehrplan"
            meaning="Curriculum"
            theme="slate"
            alwaysShow={false}
            highlight={false}
            position="TOP"
          />{" "}
          vom A1-
          <WordExplainComp
            word="Anfänger"
            meaning="Beginner"
            theme="slate"
            alwaysShow={false}
            highlight={false}
            position="TOP"
          />{" "}
          bis zur C2-
          <WordExplainComp
            word="Meisterschaft"
            meaning="Mastery"
            theme="slate"
            alwaysShow={false}
            highlight={false}
            position="TOP"
          />
          .
        </>
      ),
      stat: "A1 bis C2 Pfad",
      color: "emerald",
      badge: "Hier Starten",
    },
    {
      href: "/german-language-most-common-words",
      icon: BookOpen,
      title: (
        <WordExplainComp
          word="Grundwortschatz"
          meaning="Core Vocabulary"
          position="TOP"
          className="group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
          alwaysShow={true}
          showArrow={true}
        />
      ),
      description: (
        <>
          Meistern Sie die{" "}
          <WordExplainComp
            word="häufigsten"
            meaning="most common"
            theme="slate"
            alwaysShow={false}
            highlight={false}
            position="TOP"
          />{" "}
          deutschen{" "}
          <WordExplainComp
            word="Wörter"
            meaning="words"
            theme="slate"
            alwaysShow={false}
            highlight={false}
            position="TOP"
          />{" "}
          mit{" "}
          <WordExplainComp
            word="zweisprachigen"
            meaning="bilingual"
            theme="slate"
            alwaysShow={false}
            highlight={false}
            position="TOP"
          />{" "}
          <WordExplainComp
            word="Übersetzungen"
            meaning="translations"
            theme="slate"
            alwaysShow={false}
            highlight={false}
            position="TOP"
          />
          .
        </>
      ),
      stat: "2.000+ Wörter",
      color: "indigo",
      badge: "Wichtig",
    },
    {
      href: "/juwelen",
      icon: Gamepad2,
      title: (
        <>
          Interaktive{" "}
          <WordExplainComp
            word="Spiele"
            meaning="Games"
            position="TOP"
            className="group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors"
            alwaysShow={true}
            showArrow={true}
          />
        </>
      ),
      description: (
        <>
          Testen Sie Ihre{" "}
          <WordExplainComp
            word="Grammatik"
            meaning="Grammar"
            theme="slate"
            alwaysShow={false}
            highlight={false}
            position="TOP"
          />{" "}
          und Ihren{" "}
          <WordExplainComp
            word="Wortschatz"
            meaning="Vocabulary"
            theme="slate"
            alwaysShow={false}
            highlight={false}
            position="TOP"
          />{" "}
          durch{" "}
          <WordExplainComp
            word="spielerische"
            meaning="playful"
            theme="slate"
            alwaysShow={false}
            highlight={false}
            position="TOP"
          />{" "}
          <WordExplainComp
            word="Übungen"
            meaning="Exercises"
            theme="slate"
            alwaysShow={false}
            highlight={false}
            position="TOP"
          />
          .
        </>
      ),
      stat: "10+ Spielmodi",
      color: "amber",
      badge: "Üben",
    },
    {
      href: "/about-german-keyboard",
      icon: Keyboard,
      title: (
        <>
          Deutsche{" "}
          <WordExplainComp
            word="Tastatur"
            meaning="Keyboard"
            position="TOP_RIGHT_RIGHT"
            offsetY={10}
            className="group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors"
            alwaysShow={true}
            showArrow={true}
          />
        </>
      ),
      description: (
        <>
          Lernen Sie die{" "}
          <WordExplainComp
            word="einfachsten"
            meaning="easiest"
            theme="slate"
            alwaysShow={false}
            highlight={false}
            position="TOP"
          />{" "}
          <WordExplainComp
            word="Wege"
            meaning="Ways"
            theme="slate"
            alwaysShow={false}
            highlight={false}
            position="TOP"
          />
          ,{" "}
          <WordExplainComp
            word="Umlaute"
            meaning="Umlauts"
            theme="slate"
            alwaysShow={false}
            highlight={false}
            position="TOP"
          />{" "}
          (ä, ö, ü) und das Eszett (ß) zu{" "}
          <WordExplainComp
            word="tippen"
            meaning="to type"
            theme="slate"
            alwaysShow={false}
            highlight={false}
            position="TOP"
          />
          .
        </>
      ),
      stat: "Tipp-Anleitung",
      color: "cyan",
      badge: "Werkzeug",
    },
    {
      href: "/about",
      icon: Info,
      title: (
        <>
          <WordExplainComp
            word="Über das Projekt"
            meaning="About the project"
            position="TOP_RIGHT_RIGHT"
            className="group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors"
            alwaysShow={true}
            showArrow={true}
          />
        </>
      ),
      description: (
        <>
          <WordExplainComp
            word="Informationen"
            meaning="Information"
            theme="slate"
            alwaysShow={false}
            highlight={false}
            position="TOP"
          />{" "}
          über den{" "}
          <WordExplainComp
            word="Entwickler"
            meaning="Developer"
            theme="slate"
            alwaysShow={false}
            highlight={false}
            position="TOP"
          />{" "}
          und die{" "}
          <WordExplainComp
            word="Lernphilosophie"
            meaning="Learning Philosophy"
            theme="slate"
            alwaysShow={false}
            highlight={false}
            position="TOP"
          />
          .
        </>
      ),
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
              <WordExplainComp
                word="Mein"
                meaning="my"
                position="BOTTOM_LEFT_BOTTOM"
                alwaysShow={true}
                showArrow={true}
              />{" "}
              <WordExplainComp
                word="Deutsch"
                meaning="German"
                position="BOTTOM_RIGHT_BOTTOM"
                highlight={true}
                alwaysShow={true}
                showArrow={true}
              />
            </h1>
            <span className="hidden md:block w-1 h-1 rounded-full bg-slate-300 dark:bg-[#444]" />
            <p className="hidden sm:block text-slate-500 dark:text-[#888] text-xs font-medium tracking-wide uppercase">
              <WordExplainComp
                word="Sprachübung"
                meaning="Language Practice"
                position="BOTTOM_RIGHT_BOTTOM"
                alwaysShow={true}
                showArrow={true}
              />
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
                  dark:hover:border-blue-700 hover:z-20"
                  aria-label={`Navigate to German Section`}
                >
                  {/* Subtle hover background */}
                  <div className="absolute inset-0 bg-blue-50/40 dark:bg-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl pointer-events-none" />

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

                      <h3 className="text-base font-semibold text-slate-900 dark:text-[#E0E0E0]">
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
