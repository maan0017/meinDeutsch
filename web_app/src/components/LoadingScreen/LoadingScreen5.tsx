"use client";

import { useState, useEffect } from "react";

export default function LoadingScreen5() {
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

      {/* Progress bar + status label */}
      <div className="flex w-56 flex-col items-center gap-2.5">
        <div className="relative h-2.5 w-full overflow-hidden rounded-full">
          <div className="absolute inset-0 bg-slate-300 dark:bg-slate-700" />
          <div
            className="absolute top-0 left-0 h-full rounded-full bg-green-500 dark:bg-green-400 transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs text-foreground opacity-60">
          Loading fonts…
        </span>
      </div>
    </div>
  );
}
