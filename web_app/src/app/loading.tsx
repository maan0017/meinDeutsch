"use client";

export default function LoadingScreen() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-7 bg-background">
      {/* Title + subtitle */}
      <div className="flex flex-col items-center gap-1.5">
        <h1 className="text-[22px] font-medium tracking-tight text-foreground">
          Mein Deutsch
        </h1>
        <p className="text-sm text-muted-foreground">
          Preparing your workspace…
        </p>
      </div>

      {/* Spinner */}
      <svg
        className="animate-spin"
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
          className="text-border"
        />
        <circle
          cx="20"
          cy="20"
          r="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeDasharray="60 44"
          strokeLinecap="round"
          className="text-foreground"
        />
      </svg>

      {/* Progress bar + status label */}
      <div className="flex w-56 flex-col items-center gap-2.5">
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full w-2/3 animate-[progress_2s_ease-in-out_infinite] rounded-full bg-foreground" />
        </div>
        <span className="text-xs text-muted-foreground">Loading fonts…</span>
      </div>

      {/* Pulsing dots */}
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
}
