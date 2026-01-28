"use client";

import { useState } from "react";
import { X } from "lucide-react";
import germanGrammar from "@/data/germanGrammer";

interface Props {
  onClose: () => void;
}

type Tab = "Pronouns" | "Articles" | "Verbs" | "Structure";

export default function GrammarCheatSheet({ onClose }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("Pronouns");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-50 dark:bg-[#0a0a0a] w-full h-full rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 dark:border-[#333] animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-[#222] bg-white dark:bg-[#121212]">
          <div className="flex items-center gap-4">
            <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              📚 Grammar Cheat Sheet
            </h2>
            {/* Tabs inline with header for space efficiency */}
            <div className="hidden md:flex bg-slate-100 dark:bg-[#1a1a1a] p-1 rounded-lg">
              {(["Pronouns", "Articles", "Verbs", "Structure"] as Tab[]).map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`
                                px-4 py-1.5 text-sm font-semibold rounded-md transition-all
                                ${
                                  activeTab === tab
                                    ? "bg-white dark:bg-[#333] text-blue-600 dark:text-blue-400 shadow-sm"
                                    : "text-slate-500 dark:text-[#888] hover:text-slate-700 dark:hover:text-[#B0B0B0]"
                                }
                            `}
                  >
                    {tab}
                  </button>
                )
              )}
            </div>
          </div>
          {/* Mobile Tabs Dropdown or Scroll (simplified to scroll for now if mobile) */}
          <div className="md:hidden flex overflow-x-auto gap-2 pr-2">
            {(["Pronouns", "Articles", "Verbs", "Structure"] as Tab[]).map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-xs px-2 py-1 rounded border ${
                    activeTab === tab
                      ? "bg-blue-50 border-blue-200 text-blue-600"
                      : "border-transparent text-slate-500"
                  }`}
                >
                  {tab}
                </button>
              )
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-red-500 dark:text-[#666] dark:hover:text-red-400 transition-colors"
            title="Close (Esc)"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Area - Full width grid layouts */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50/50 dark:bg-[#0a0a0a]">
          {activeTab === "Pronouns" && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-full">
              <Section title="Personal Pronouns" className="h-full">
                <div className="h-full overflow-hidden rounded-xl border border-slate-200 dark:border-[#333] bg-white dark:bg-[#121212]">
                  <table className="w-full text-sm text-left h-full">
                    <thead className="bg-slate-100 dark:bg-[#1a1a1a] text-slate-500 dark:text-[#888] font-medium uppercase text-xs sticky top-0 z-10">
                      <tr>
                        <th className="px-4 py-3">Person</th>
                        <th className="px-4 py-3">Nom</th>
                        <th className="px-4 py-3">Acc</th>
                        <th className="px-4 py-3">Dat</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-[#222]">
                      {[
                        ...germanGrammar.personalPronouns.singular,
                        ...germanGrammar.personalPronouns.plural,
                      ].map((p, i) => (
                        <tr
                          key={i}
                          className="hover:bg-slate-50 dark:hover:bg-[#1a1a1a] transition-colors"
                        >
                          <td className="px-4 py-2.5 font-medium text-slate-900 dark:text-white capitalize border-r border-slate-50 dark:border-[#222]">
                            {p.person.replace("3rd_", "").replace("_", " ")}
                            <span className="block text-[10px] text-slate-400 font-normal">
                              {p.hindi.split("/")[0]}
                            </span>
                          </td>
                          <td className="px-4 py-2.5 text-slate-600 dark:text-[#B0B0B0] font-mono font-bold bg-blue-50/30 dark:bg-blue-900/10">
                            {p.nominative}
                          </td>
                          <td className="px-4 py-2.5 text-slate-600 dark:text-[#B0B0B0] font-mono">
                            {p.accusative}
                          </td>
                          <td className="px-4 py-2.5 text-slate-600 dark:text-[#B0B0B0] font-mono">
                            {p.dative}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Section>

              <Section
                title="Possessive Pronouns"
                className="h-full overflow-y-auto"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {germanGrammar.possessivePronouns.map((poss, i) => (
                    <div
                      key={i}
                      className="bg-white dark:bg-[#121212] p-3 rounded-lg border border-slate-200 dark:border-[#333] shadow-sm flex flex-col justify-between"
                    >
                      <div className="flex justify-between items-center mb-2 border-b border-slate-50 dark:border-[#222] pb-1">
                        <span className="font-bold text-slate-900 dark:text-white text-base">
                          {poss.person}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {poss.hindi.split("/")[0]}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-1 text-[11px] text-center">
                        {Object.entries(poss.nominative).map(
                          ([gender, word]) => (
                            <div key={gender} className="flex flex-col">
                              <span className="text-slate-400 uppercase text-[9px] mb-0.5">
                                {gender}
                              </span>
                              <span className="font-mono bg-slate-50 dark:bg-[#1a1a1a] py-1 rounded text-slate-700 dark:text-[#ccc] border border-slate-100 dark:border-[#222]">
                                {word}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            </div>
          )}

          {activeTab === "Articles" && (
            <div className="flex flex-col h-full gap-6">
              {/* Case Explainer - Quick Reference */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0">
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900 rounded-xl p-4">
                  <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-1 flex items-center gap-2">
                    <span className="bg-blue-200 dark:bg-blue-800 text-xs px-1.5 py-0.5 rounded text-blue-800 dark:text-blue-200">
                      Subj
                    </span>
                    Nominative
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    The <strong>Subject</strong> acting. <br />
                    <em>
                      "<strong>Der Mann</strong> isst."
                    </em>{" "}
                    (The man eats)
                  </p>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900 rounded-xl p-4">
                  <h4 className="font-bold text-emerald-700 dark:text-emerald-300 mb-1 flex items-center gap-2">
                    <span className="bg-emerald-200 dark:bg-emerald-800 text-xs px-1.5 py-0.5 rounded text-emerald-800 dark:text-emerald-200">
                      Obj
                    </span>
                    Accusative
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    The <strong>Direct Object</strong> being acted upon.
                    <br />
                    <em>
                      "Ich sehe <strong>den Mann</strong>."
                    </em>{" "}
                    (I see the man)
                  </p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-900 rounded-xl p-4">
                  <h4 className="font-bold text-purple-700 dark:text-purple-300 mb-1 flex items-center gap-2">
                    <span className="bg-purple-200 dark:bg-purple-800 text-xs px-1.5 py-0.5 rounded text-purple-800 dark:text-purple-200">
                      Ind. Obj
                    </span>
                    Dative
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    The <strong>Receiver</strong> of the action.
                    <br />
                    <em>
                      "Ich helfe <strong>dem Mann</strong>."
                    </em>{" "}
                    (I help the man)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 grow overflow-y-auto pb-4">
                <Section title="Definite Articles (The)">
                  <div className="bg-white dark:bg-[#121212] rounded-xl border border-slate-200 dark:border-[#333] shadow-sm flex flex-col h-full">
                    <div className="bg-slate-50 dark:bg-[#1a1a1a] px-4 py-2 border-b border-slate-100 dark:border-[#333]">
                      <span className="text-xs font-mono text-slate-500">
                        Der, Die, Das
                      </span>
                    </div>
                    <div className="grow">
                      <ArticleTable
                        data={germanGrammar.definiteArticles.bestimmte}
                        color="blue"
                      />
                    </div>
                  </div>
                </Section>
                <Section title="Indefinite Articles (A/An)">
                  <div className="bg-white dark:bg-[#121212] rounded-xl border border-slate-200 dark:border-[#333] shadow-sm flex flex-col h-full">
                    <div className="bg-slate-50 dark:bg-[#1a1a1a] px-4 py-2 border-b border-slate-100 dark:border-[#333]">
                      <span className="text-xs font-mono text-slate-500">
                        Ein, Eine
                      </span>
                    </div>
                    <div className="grow">
                      <ArticleTable
                        data={germanGrammar.indefiniteArticles.unbestimmte}
                        color="emerald"
                      />
                    </div>
                  </div>
                </Section>
                <Section title="Negative Articles (None)">
                  <div className="bg-white dark:bg-[#121212] rounded-xl border border-slate-200 dark:border-[#333] shadow-sm flex flex-col h-full">
                    <div className="bg-slate-50 dark:bg-[#1a1a1a] px-4 py-2 border-b border-slate-100 dark:border-[#333]">
                      <span className="text-xs font-mono text-slate-500">
                        Kein, Keine
                      </span>
                    </div>
                    <div className="grow">
                      <ArticleTable
                        data={germanGrammar.indefiniteArticles.negative}
                        color="red"
                      />
                    </div>
                  </div>
                </Section>
              </div>
            </div>
          )}

          {activeTab === "Structure" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
              <div className="space-y-6">
                <Section title="Sentence Structure">
                  <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border border-slate-200 dark:border-[#333] space-y-4 h-full">
                    <h3 className="font-bold text-2xl text-slate-900 dark:text-white">
                      NVDA Rule
                    </h3>
                    <p className="text-slate-600 dark:text-[#B0B0B0] text-base leading-relaxed">
                      {germanGrammar.sentenceStructure.NVDA.description}
                    </p>
                    <div className="bg-slate-50 dark:bg-[#1a1a1a] p-5 rounded-xl font-mono text-base space-y-3 border border-slate-100 dark:border-[#333]">
                      <div className="grid grid-cols-[80px_1fr] gap-2">
                        <span className="text-slate-400">German:</span>
                        <span className="text-blue-600 dark:text-blue-400 font-bold">
                          {germanGrammar.sentenceStructure.NVDA.example.german}
                        </span>

                        <span className="text-slate-400">Logic:</span>
                        <div className="flex flex-wrap gap-2 text-sm">
                          {germanGrammar.sentenceStructure.NVDA.example.structure
                            .split("+")
                            .map((part, i) => (
                              <span
                                key={i}
                                className="bg-white dark:bg-[#252525] px-2 py-0.5 rounded border border-slate-200 dark:border-[#444] shadow-sm"
                              >
                                {part.trim()}
                              </span>
                            ))}
                        </div>

                        <span className="text-slate-400">English:</span>
                        <span className="text-slate-600 dark:text-[#aaa]">
                          {germanGrammar.sentenceStructure.NVDA.example.english}
                        </span>
                      </div>
                    </div>
                  </div>
                </Section>
              </div>

              <Section title="Pronoun Endings Reference">
                <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border border-slate-200 dark:border-[#333] h-full flex items-center justify-center">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 w-full max-w-md">
                    {germanGrammar.pronounEndings.personToEnding.map(
                      (item, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center bg-slate-50 dark:bg-[#1a1a1a] px-6 py-4 rounded-xl border border-slate-100 dark:border-[#222]"
                        >
                          <span className="font-medium text-slate-700 dark:text-[#E0E0E0] text-lg">
                            {item.pronoun}
                          </span>
                          <span className="font-bold text-blue-600 dark:text-blue-400 font-mono text-xl">
                            {item.ending}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </Section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const Section = ({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <section className={`flex flex-col gap-3 ${className}`}>
    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-[#666] ml-1">
      {title}
    </h3>
    {children}
  </section>
);

const ArticleTable = ({
  data,
  color = "blue",
}: {
  data: any;
  color?: string;
}) => {
  const colorClasses: any = {
    blue: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/10",
    emerald:
      "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/10",
    red: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/10",
  };

  return (
    <div className="h-full overflow-hidden rounded-xl border border-slate-200 dark:border-[#333] bg-white dark:bg-[#121212] flex flex-col">
      <table className="w-full text-sm text-center flex-1">
        <thead
          className={`font-medium uppercase text-xs ${colorClasses[color]} bg-opacity-50`}
        >
          <tr>
            <th className="px-2 py-3 text-left">Case</th>
            <th className="px-2 py-3">M</th>
            <th className="px-2 py-3">F</th>
            <th className="px-2 py-3">N</th>
            <th className="px-2 py-3">Pl</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-[#222]">
          {["nominative", "accusative", "dative"].map((c, i) => (
            <tr key={i} className="hover:bg-slate-50 dark:hover:bg-[#1a1a1a]">
              <td className="px-2 py-4 text-left font-bold capitalize text-slate-700 dark:text-[#ccc] text-xs sm:text-sm">
                {c.substring(0, 3)}.
              </td>
              <td className="px-2 py-4 font-mono font-medium text-slate-900 dark:text-white">
                {data[c].M}
              </td>
              <td className="px-2 py-4 font-mono font-medium text-slate-900 dark:text-white">
                {data[c].F}
              </td>
              <td className="px-2 py-4 font-mono font-medium text-slate-900 dark:text-white">
                {data[c].N}
              </td>
              <td className="px-2 py-4 font-mono font-medium text-slate-900 dark:text-white">
                {data[c].Pl}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
