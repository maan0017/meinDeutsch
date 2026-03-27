"use client";

import { useState, useEffect } from "react";

export default function LoadingScreen6() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-7 bg-background">
      {/* Title + subtitle */}
      <div className="flex flex-col items-center gap-1.5">
        <h1 className="text-[22px] font-medium tracking-tight text-foreground">
          Mein Deutsch
        </h1>
        <p className="text-sm text-foreground opacity-60">
          Preparing your workspace…
        </p>
      </div>

      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-500 animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>

      {/* Progress bar + status label */}
      <div className="flex w-56 flex-col items-center gap-2.5">
        <span className="text-xs text-foreground opacity-60">
          Loading fonts…
        </span>
      </div>

      {/* Pulsing dots */}
    </div>
  );
}
