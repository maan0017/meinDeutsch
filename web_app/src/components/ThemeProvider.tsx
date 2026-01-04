"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
}

function ThemeEvents() {
  // useEffect(() => {
  //   function KeyJobs(event: KeyboardEvent) {
  //     const target = event.target as HTMLElement;

  //     // Ignore typing in input, textarea, or editable elements
  //     if (
  //       ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) ||
  //       target.isContentEditable
  //     )
  //       return;

  //     if (!event.shiftKey && event.key.toLowerCase() === "t") {
  //       setTheme(resolvedTheme === "dark" ? "light" : "dark");
  //     }
  //   }

  //   window.addEventListener("keydown", KeyJobs);
  //   return () => window.removeEventListener("keydown", KeyJobs);
  // }, [resolvedTheme, setTheme]);

  return null;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // useEffect(() => {
  //   if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  //     document.documentElement.classList.add("dark");
  //   }
  // }, []);
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
    >
      <ThemeEvents />
      {children}
    </NextThemesProvider>
  );
}
