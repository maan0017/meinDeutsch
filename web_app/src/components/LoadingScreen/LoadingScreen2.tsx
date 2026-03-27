"use client";

export default function LoadingScreen2() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-100 transition-opacity duration-300">
      <div className="flex flex-col items-center gap-8 translate-y-[-10%]">
        {/* Animated Brand Spinner */}
        <div className="relative flex items-center justify-center w-24 h-24">
          {/* Outer ring */}
          <div
            className="absolute inset-0 rounded-full border-2 border-primary/20 border-t-primary animate-spin"
            style={{ animationDuration: "1.5s" }}
          ></div>
          {/* Inner ring */}
          <div
            className="absolute inset-2 rounded-full border-2 border-secondary/20 border-b-secondary animate-spin"
            style={{ animationDuration: "1s", animationDirection: "reverse" }}
          ></div>
          {/* Logo center */}
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-xl font-bold text-primary tracking-tighter">
              MD
            </span>
          </div>
        </div>

        {/* Text Content */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Mein Deutsch
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping"></span>
            <p className="text-sm font-medium text-foreground/60 uppercase tracking-widest">
              Preparing environment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
