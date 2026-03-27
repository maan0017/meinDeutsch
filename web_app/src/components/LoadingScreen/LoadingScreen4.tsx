"use client";

import { useState, useEffect } from "react";

export default function LoadingScreen4() {
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

      {/* Spinner */}
      <svg
        className="animate-spin text-foreground"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="20"
          cy="20"
          r="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className="opacity-20"
        />
        {/* Inner colored circle */}
        <circle
          cx="20"
          cy="20"
          r="16"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="3"
          strokeDasharray="60 44"
          strokeLinecap="round"
        />
      </svg>

      {/* Progress bar + status label */}
      <div className="flex w-56 flex-col items-center gap-2.5">
        <div className="relative h-2.5 w-full overflow-hidden rounded-full">
          {/* Track background separated out to properly inherit alpha safely */}
          <div className="absolute inset-0 bg-foreground opacity-15" />
          <div
            className="absolute top-0 left-0 h-full rounded-full bg-foreground transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs text-foreground opacity-60">
          Loading fonts…
        </span>
      </div>

      {/* Pulsing dots */}
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
}
