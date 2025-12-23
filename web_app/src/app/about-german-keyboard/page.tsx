"use client";

import Link from "next/link";
import MyKeyboard from "@/components/myKeyboard/myKeyboard";

export default function AboutGermanKeyboard() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] transition-colors py-8 md:py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-10 md:space-y-16">
        {/* Navigation & Header */}
        <header className="space-y-6 text-center relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:block">
            <Link
              href="/"
              className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-[#1E1E1E] text-gray-500 dark:text-[#888888] transition-all inline-flex items-center justify-center border border-transparent hover:border-gray-200 dark:hover:border-[#333333]"
              title="Return Home"
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
            </Link>
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center justify-center space-x-2 mb-2">
              <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Typing Guide
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              German Keyboard
            </h1>
            <p className="text-lg text-gray-600 dark:text-[#A0A0A0] max-w-2xl mx-auto leading-relaxed">
              Master the German umlauts (Ä, Ö, Ü) and Eszett (ß) on your
              standard keyboard using these simple shortcuts and tools.
            </p>
          </div>
        </header>

        {/* Interactive Playground */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
              Interactive Playground
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:inline-block">
              Try typing German characters below
            </span>
          </div>

          <div className="bg-white dark:bg-[#121212] rounded-2xl shadow-xl border border-gray-200 dark:border-[#333333] p-4 md:p-8 overflow-hidden">
            <MyKeyboard />
          </div>
        </section>

        {/* Shortcuts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Windows Alt Codes */}
          <section className="bg-white dark:bg-[#121212] rounded-2xl shadow-lg border border-gray-200 dark:border-[#333333] p-6 md:p-8 space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-500"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                Windows Alt Codes
              </h3>
              <p className="text-sm text-gray-500 dark:text-[#888888]">
                Hold{" "}
                <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-[#333333] border border-gray-200 dark:border-[#444444] font-mono text-xs text-gray-700 dark:text-gray-300">
                  Alt
                </kbd>{" "}
                and type the number on your numeric keypad.
              </p>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-100 dark:border-[#2C2C2C]">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-[#1A1A1A] border-b border-gray-100 dark:border-[#2C2C2C]">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-400">
                      Character
                    </th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-600 dark:text-gray-400">
                      Shortcut
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-[#2C2C2C]">
                  {[
                    { char: "ä", code: "Alt + 0228" },
                    { char: "Ä", code: "Alt + 0196" },
                    { char: "ö", code: "Alt + 0246" },
                    { char: "Ö", code: "Alt + 0214" },
                    { char: "ü", code: "Alt + 0252" },
                    { char: "Ü", code: "Alt + 0220" },
                    { char: "ß", code: "Alt + 0223" },
                    { char: "€", code: "Alt + 0128" },
                  ].map((item, i) => (
                    <tr
                      key={i}
                      className="hover:bg-gray-50/50 dark:hover:bg-[#1E1E1E] transition-colors"
                    >
                      <td className="px-4 py-3 text-lg font-medium text-gray-900 dark:text-white">
                        {item.char}
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-gray-600 dark:text-[#AAAAAA]">
                        {item.code}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Mac Shortcuts */}
          <section className="bg-white dark:bg-[#121212] rounded-2xl shadow-lg border border-gray-200 dark:border-[#333333] p-6 md:p-8 space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-800 dark:text-white"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12h8" />
                  <path d="M12 8v8" />
                </svg>
                Mac Shortcuts
              </h3>
              <p className="text-sm text-gray-500 dark:text-[#888888]">
                Hold{" "}
                <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-[#333333] border border-gray-200 dark:border-[#444444] font-mono text-xs text-gray-700 dark:text-gray-300">
                  Option
                </kbd>{" "}
                (or Alt), then press <code>u</code>, release, and type the
                letter.
              </p>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-100 dark:border-[#2C2C2C]">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-[#1A1A1A] border-b border-gray-100 dark:border-[#2C2C2C]">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-400">
                      Result
                    </th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-600 dark:text-gray-400">
                      Action Sequence
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-[#2C2C2C]">
                  {[
                    { char: "ä, ö, ü", code: "Option + u, then a/o/u" },
                    { char: "Ä, Ö, Ü", code: "Option + u, then A/O/U" },
                    { char: "ß", code: "Option + s" },
                    { char: "€", code: "Shift + Option + 2" },
                  ].map((item, i) => (
                    <tr
                      key={i}
                      className="hover:bg-gray-50/50 dark:hover:bg-[#1E1E1E] transition-colors"
                    >
                      <td className="px-4 py-3 text-lg font-medium text-gray-900 dark:text-white">
                        {item.char}
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-gray-600 dark:text-[#AAAAAA]">
                        {item.code}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl text-sm text-blue-800 dark:text-blue-300">
              <span className="font-bold">Pro Tip:</span> On iPhone/iPad, simply
              long-press the vowel keys (A, O, U, S) to see the umlaut options.
            </div>
          </section>
        </div>

        {/* Windows International Setup */}
        <section className="bg-gray-100 dark:bg-[#1A1A1A] rounded-2xl p-6 md:p-8 text-center space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Recommended for Frequent Writers
          </h2>
          <p className="text-gray-600 dark:text-[#ACACAC] max-w-2xl mx-auto">
            If you type German frequently, the best method is to enable the{" "}
            <strong>&quot;US International&quot;</strong> keyboard layout in
            your system settings. This allows you to type{" "}
            <code>&quot; + a</code> to get <code>ä</code> without memorizing
            codes.
          </p>
        </section>
      </div>
    </main>
  );
}
