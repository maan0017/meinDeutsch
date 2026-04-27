"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import MyKeyboard from "@/components/myKeyboard/myKeyboard";
import { X, Keyboard as KeyboardIcon, Monitor, Command } from "lucide-react";

export default function AboutGermanKeyboard() {
  const [showKeyboard, setShowKeyboard] = useState(false);

  useEffect(() => {
    if (showKeyboard) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showKeyboard]);

  const methods = [
    {
      num: "1",
      id: "method-1",
      label: "Windows Alt Codes",
      sub: "Numeric keypad shortcuts",
    },
    {
      num: "2",
      id: "method-2",
      label: "Mac Option Key",
      sub: "Built-in macOS shortcuts",
    },
    {
      num: "3",
      id: "method-3",
      label: "Long Press (Mobile)",
      sub: "Touch & hold on phone/tablet",
    },
    {
      num: "4",
      id: "method-4",
      label: "US International Layout",
      sub: "Best for frequent typing",
    },
    {
      num: "5",
      id: "method-5",
      label: "Virtual Keyboard",
      sub: "Try it right here",
    },
  ];

  return (
    <>
      <main className="min-h-screen bg-slate-50 dark:bg-[#121212] transition-colors py-8 md:py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto space-y-10">
          {/* Back */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-slate-400 dark:text-[#666] hover:text-slate-700 dark:hover:text-[#ccc] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            <span className="text-sm font-medium">Back</span>
          </Link>

          {/* Header */}
          <div className="space-y-3">
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-[#E0E0E0]">
              How to Type German Characters
            </h1>
            <p className="text-base text-slate-500 dark:text-[#888] leading-relaxed max-w-2xl">
              German uses special characters that aren&apos;t on a standard
              English keyboard — the umlauts{" "}
              <span className="font-semibold text-slate-700 dark:text-[#ccc]">
                ä ö ü
              </span>
              , their capitals{" "}
              <span className="font-semibold text-slate-700 dark:text-[#ccc]">
                Ä Ö Ü
              </span>
              , the Eszett{" "}
              <span className="font-semibold text-slate-700 dark:text-[#ccc]">
                ß
              </span>
              , and the Euro sign{" "}
              <span className="font-semibold text-slate-700 dark:text-[#ccc]">
                €
              </span>
              . Here are the best ways to type them.
            </p>
          </div>

          {/* Quick overview */}
          <div className="relative z-10 flex flex-wrap gap-2">
            {methods.map((m) => (
              <a
                key={m.num}
                href={`#${m.id}`}
                className="flex items-center gap-2 bg-white dark:bg-[#1a1a1a] hover:bg-slate-50 dark:hover:bg-[#222] border border-slate-200 dark:border-[#2a2a2a] rounded-lg px-3 py-2 transition-colors cursor-pointer"
              >
                <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-[#333] text-[10px] font-bold text-slate-500 dark:text-[#888] flex items-center justify-center shrink-0">
                  {m.num}
                </span>
                <span className="text-xs font-semibold text-slate-700 dark:text-[#ccc]">
                  {m.label}
                </span>
              </a>
            ))}
          </div>

          <div className="h-px bg-slate-200 dark:bg-[#2a2a2a]" />

          {/* ───── Method 1: Windows Alt Codes ───── */}
          <section
            id="method-1"
            className="relative z-10 bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-sm border border-slate-200 dark:border-[#2a2a2a] overflow-hidden scroll-mt-24"
          >
            <div className="p-6 space-y-3 border-b border-slate-100 dark:border-[#2a2a2a]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
                  <Monitor className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-[#E0E0E0]">
                    Method 1: Windows Alt Codes
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-[#888]">
                    Hold{" "}
                    <kbd className="px-1 py-0.5 rounded bg-slate-100 dark:bg-[#333] border border-slate-200 dark:border-[#444] text-slate-700 dark:text-[#ccc] font-mono text-[10px]">
                      Alt
                    </kbd>{" "}
                    + type the number on the <strong>numeric keypad</strong>
                  </p>
                </div>
              </div>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-[#111]">
                <tr>
                  <th className="px-6 py-2.5 text-left text-xs font-semibold text-slate-500 dark:text-[#888] uppercase tracking-wider">
                    Character
                  </th>
                  <th className="px-6 py-2.5 text-right text-xs font-semibold text-slate-500 dark:text-[#888] uppercase tracking-wider">
                    Alt Code
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#2a2a2a]">
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
                    className="hover:bg-slate-50/50 dark:hover:bg-[#222] transition-colors"
                  >
                    <td className="px-6 py-3 text-lg font-medium text-slate-900 dark:text-[#E0E0E0]">
                      {item.char}
                    </td>
                    <td className="px-6 py-3 text-right font-mono text-xs text-slate-500 dark:text-[#888]">
                      {item.code}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* ───── Method 2: Mac Shortcuts ───── */}
          <section
            id="method-2"
            className="relative z-10 bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-sm border border-slate-200 dark:border-[#2a2a2a] overflow-hidden scroll-mt-24"
          >
            <div className="p-6 space-y-3 border-b border-slate-100 dark:border-[#2a2a2a]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 dark:bg-[#222] text-slate-700 dark:text-[#ccc] rounded-lg">
                  <Command className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-[#E0E0E0]">
                    Method 2: Mac Shortcuts
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-[#888]">
                    Hold{" "}
                    <kbd className="px-1 py-0.5 rounded bg-slate-100 dark:bg-[#333] border border-slate-200 dark:border-[#444] text-slate-700 dark:text-[#ccc] font-mono text-[10px]">
                      Option
                    </kbd>{" "}
                    +{" "}
                    <kbd className="px-1 py-0.5 rounded bg-slate-100 dark:bg-[#333] border border-slate-200 dark:border-[#444] text-slate-700 dark:text-[#ccc] font-mono text-[10px]">
                      u
                    </kbd>
                    , release both, then type the vowel
                  </p>
                </div>
              </div>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-[#111]">
                <tr>
                  <th className="px-6 py-2.5 text-left text-xs font-semibold text-slate-500 dark:text-[#888] uppercase tracking-wider">
                    Result
                  </th>
                  <th className="px-6 py-2.5 text-right text-xs font-semibold text-slate-500 dark:text-[#888] uppercase tracking-wider">
                    Sequence
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#2a2a2a]">
                {[
                  { char: "ä, ö, ü", code: "Option + u → a / o / u" },
                  { char: "Ä, Ö, Ü", code: "Option + u → Shift + A / O / U" },
                  { char: "ß", code: "Option + s" },
                  { char: "€", code: "Shift + Option + 2" },
                ].map((item, i) => (
                  <tr
                    key={i}
                    className="hover:bg-slate-50/50 dark:hover:bg-[#222] transition-colors"
                  >
                    <td className="px-6 py-3 text-lg font-medium text-slate-900 dark:text-[#E0E0E0]">
                      {item.char}
                    </td>
                    <td className="px-6 py-3 text-right font-mono text-xs text-slate-500 dark:text-[#888]">
                      {item.code}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* ───── Method 3: Long Press (Mobile) ───── */}
          <section
            id="method-3"
            className="relative z-10 bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-sm border border-slate-200 dark:border-[#2a2a2a] p-6 space-y-4 scroll-mt-24"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                  <path d="M12 18h.01" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-[#E0E0E0]">
                  Method 3: Long Press (Mobile)
                </h2>
                <p className="text-xs text-slate-500 dark:text-[#888]">
                  Works on iPhone, iPad, and Android
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-[#aaa] leading-relaxed">
              On touchscreen devices, simply{" "}
              <strong className="text-slate-800 dark:text-[#ccc]">
                long-press
              </strong>{" "}
              any vowel key (<span className="font-mono font-semibold">A</span>,{" "}
              <span className="font-mono font-semibold">O</span>,{" "}
              <span className="font-mono font-semibold">U</span>,{" "}
              <span className="font-mono font-semibold">S</span>) on your
              on-screen keyboard. A popup will appear with the umlaut and
              special character options. Slide your finger to select the one you
              need.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              {["a → ä", "o → ö", "u → ü", "s → ß"].map((ex) => (
                <span
                  key={ex}
                  className="text-sm font-mono bg-slate-50 dark:bg-[#222] border border-slate-200 dark:border-[#333] px-3 py-1.5 rounded-lg text-slate-700 dark:text-[#ccc]"
                >
                  {ex}
                </span>
              ))}
            </div>
          </section>

          {/* ───── Method 4: US International Keyboard ───── */}
          <section
            id="method-4"
            className="relative z-10 bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-sm border border-slate-200 dark:border-[#2a2a2a] p-6 space-y-5 scroll-mt-24"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-[#E0E0E0]">
                    Method 4: US International Keyboard
                  </h2>
                  <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40">
                    ★ Recommended
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-[#888]">
                  Recommended for frequent German typing
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-[#aaa] leading-relaxed">
              The{" "}
              <strong className="text-slate-800 dark:text-[#ccc]">
                US International
              </strong>{" "}
              keyboard layout turns your standard keyboard into a multilingual
              typing tool. Enable it once in your OS settings, and you can type
              German characters with simple key combinations — no codes to
              memorize.
            </p>

            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-500 dark:text-[#888] uppercase tracking-wider">
                How it works
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { keys: '" + a', result: "ä" },
                  { keys: '" + o', result: "ö" },
                  { keys: '" + u', result: "ü" },
                  { keys: '" + s', result: "ß" },
                  { keys: '" + Shift+A', result: "Ä" },
                  { keys: "RAlt + 5", result: "€" },
                ].map((item) => (
                  <div
                    key={item.keys}
                    className="flex items-center justify-between bg-slate-50 dark:bg-[#111] rounded-lg px-4 py-2.5 border border-slate-100 dark:border-[#2a2a2a]"
                  >
                    <span className="font-mono text-xs text-slate-600 dark:text-[#aaa]">
                      {item.keys}
                    </span>
                    <span className="text-lg font-semibold text-slate-900 dark:text-[#E0E0E0]">
                      {item.result}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-900/20 rounded-xl p-4 text-sm text-emerald-800 dark:text-emerald-300">
              <strong>How to enable:</strong> Go to Settings → Time & Language →
              Language → Keyboard → Add <em>United States – International</em>.
            </div>
          </section>

          {/* ───── Method 5: Virtual Keyboard (My Keyboard) ───── */}
          <section
            id="method-5"
            className="relative z-10 bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-sm border border-amber-200 dark:border-amber-900/30 p-6 space-y-5 scroll-mt-24"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 rounded-lg">
                <KeyboardIcon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-[#E0E0E0]">
                    Method 5: Custom Keyboard Layout
                  </h2>
                  <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800/40">
                    ⚠ Experimental
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-[#888]">
                  Custom-made · Windows-specific · US-layout
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-[#aaa] leading-relaxed">
              This is a{" "}
              <strong className="text-slate-800 dark:text-[#ccc]">
                custom-made keyboard layout
              </strong>{" "}
              that I personally built and use every day. It&apos;s based on the
              standard US layout but modified to support German special
              characters natively — press{" "}
              <kbd className="px-1 py-0.5 rounded bg-slate-100 dark:bg-[#333] border border-slate-200 dark:border-[#444] text-slate-700 dark:text-[#ccc] font-mono text-[10px]">
                RAlt
              </kbd>{" "}
              (or{" "}
              <kbd className="px-1 py-0.5 rounded bg-slate-100 dark:bg-[#333] border border-slate-200 dark:border-[#444] text-slate-700 dark:text-[#ccc] font-mono text-[10px]">
                Ctrl+Alt
              </kbd>
              ) to type umlauts and special characters directly.
            </p>

            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/20 rounded-xl p-4 text-sm text-amber-800 dark:text-amber-300">
              <strong>Requires installation:</strong> Download the layout file
              below and install it on your Windows machine to use this keyboard
              layout system-wide.
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                disabled
                title="Download temporarily disabled"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-300 dark:bg-slate-800 text-slate-500 dark:text-slate-500 font-semibold rounded-xl shadow-sm cursor-not-allowed text-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
                Download Layout Installer
              </button>
              <button
                onClick={() => setShowKeyboard(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-600 dark:hover:bg-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all duration-200 text-sm"
              >
                <KeyboardIcon className="w-4 h-4" />
                Try in Browser
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* Full-Screen Keyboard Overlay */}
      {showKeyboard && (
        <div className="fixed inset-0 z-100 flex flex-col bg-slate-50 dark:bg-[#121212]">
          <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a]">
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
              <KeyboardIcon className="w-5 h-5" />
              <span className="font-bold text-sm">Interactive Keyboard</span>
            </div>
            <button
              onClick={() => setShowKeyboard(false)}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-[#333] text-slate-500 dark:text-[#888] transition-colors"
              aria-label="Close keyboard"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-auto p-4 md:p-8 flex flex-col items-center justify-center">
            <div className="w-full max-w-5xl bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-2xl border border-slate-200 dark:border-[#2a2a2a] p-4 md:p-8">
              <MyKeyboard />
            </div>
            <p className="mt-4 text-xs text-slate-400 dark:text-[#666]">
              Press RAlt or click Alt on the virtual keyboard to access special
              characters
            </p>
          </div>
        </div>
      )}
    </>
  );
}
