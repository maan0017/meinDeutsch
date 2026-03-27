"use client";

import { useState, useEffect } from "react";

const facts = [
  {
    de: "Wusstest du schon?",
    text: "Nouns in German always start with a capital letter, making them easy to spot.",
  },
  {
    de: "Gut zu wissen",
    text: "German has three grammatical genders: masculine (der), feminine (die), and neuter (das).",
  },
  {
    de: "Schon gewusst?",
    text: "The longest German word ever published is 79 letters long!",
  },
  {
    de: "Lerntipp",
    text: "Practicing 15 minutes a day is far more effective than 2 hours once a week.",
  },
  {
    de: "Grammatik",
    text: "German verbs usually go in the second position of a sentence, but move to the end in subordinate clauses.",
  },
];

export default function LoadingScreen3() {
  const [factIndex, setFactIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Cycle facts every 4 seconds
    const factInterval = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % facts.length);
    }, 4000);

    // Simulate a realistic loading progress bar
    const progressInterval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          return 0; // Loop back to 0 for testing purposes
        }
        // Randomize the progress bumps to look authentic
        const diff = Math.random() * 8 + 2;
        return oldProgress + diff > 100 ? 100 : oldProgress + diff;
      });
    }, 600);

    // Jump to 15% immediately to show things are happening
    setTimeout(() => setProgress(15), 100);

    return () => {
      clearInterval(factInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-100 overflow-hidden px-4">
      {/* Subtle Background Glow for a premium feel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="flex flex-col items-center justify-center w-full max-w-sm z-10 translate-y-[-5%]">
        {/* Abstract Branding Icon */}
        <div className="relative flex items-center justify-center w-24 h-24 mb-10">
          <div className="absolute inset-0 rounded-3xl border border-primary/20 bg-primary/5 rotate-45 transition-transform duration-700 hover:rotate-90"></div>
          <div
            className="absolute inset-0 rounded-3xl border border-secondary/20 bg-secondary/5 -rotate-12 animate-pulse"
            style={{ animationDuration: "3s" }}
          ></div>
          <span className="text-3xl font-black text-primary drop-shadow-md tracking-tighter shadow-primary">
            MD
          </span>
        </div>

        {/* Main Title Area */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-3">
            Mein Deutsch
          </h1>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.25em]">
            Language Masterclass
          </p>
        </div>

        {/* Progress Bar System */}
        <div className="w-full mb-10">
          <div className="flex justify-between items-end mb-3 px-1">
            <span className="flex items-center gap-2 text-xs font-semibold text-foreground/60 uppercase tracking-widest">
              <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
              Loading assets
            </span>
            <span className="text-sm font-bold text-foreground slashed-zero tabular-nums">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-2 w-full bg-secondary/10 overflow-hidden rounded-full shadow-inner">
            <div
              className="h-full bg-primary rounded-full transition-all ease-out duration-700 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent w-full animate-[shimmer_2s_infinite]" />
            </div>
          </div>
        </div>

        {/* Dynamic Facts / Tips Area */}
        <div className="h-32 flex flex-col items-center justify-start text-center border-t border-border/40 pt-6 w-full relative">
          <div
            key={factIndex}
            className="animate-in fade-in slide-in-from-bottom-2 duration-700 fill-mode-forwards absolute top-6"
          >
            <span className="inline-flex items-center justify-center px-3 py-1 mb-3 rounded-full bg-secondary/10 text-secondary-foreground text-[10px] font-bold tracking-widest uppercase border border-secondary/20">
              {facts[factIndex].de}
            </span>
            <p className="text-sm text-foreground/80 font-medium leading-relaxed">
              {facts[factIndex].text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
