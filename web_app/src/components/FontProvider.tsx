"use client";

import { useSettingsStore } from "@/store/settings";
import type { FontFamily } from "@/store/settings";
import { useEffect, useState } from "react";
import LoadingScreen4 from "./LoadingScreen/LoadingScreen4";

// ---------------------------------------------------------------------------
// Font config map
// ---------------------------------------------------------------------------

export const FONT_MAP: Record<FontFamily, string> = {
  "Literata": "font-literata",
  "IM_Fell_English": "font-fell",
  "Courier_Prime": "font-courier",
  "Roboto": "font-roboto",
  "Inter": "font-inter",
  "Outfit": "font-outfit",
  "Lora": "font-lora",
  "Playfair_Display": "font-playfair",
  "Fredoka": "font-fredoka",
  "system-sans": "font-system-sans",
  "system-serif": "font-system-serif",
  "system-mono": "font-system-mono",
  "Georgia": "font-georgia",
  "Times_New_Roman": "font-times",
  "Arial": "font-arial",
  "Trebuchet_MS": "font-trebuchet",
  "Verdana": "font-verdana",
};

// ---------------------------------------------------------------------------
// Provider (Approach 3 + Dynamic Runtime Sync)
// ---------------------------------------------------------------------------

export function FontProvider({ children }: { children: React.ReactNode }) {
  const { fontFamily } = useSettingsStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync Tailwind class with <body> element so it affects the entire document instantly
  // This behaves identically to `next-themes`
  useEffect(() => {
    if (!mounted) return;
    const body = document.body;
    const allFontClasses = Object.values(FONT_MAP);

    // Remove any previously set font classes managed by us
    body.classList.remove(...allFontClasses);
    // Add the newly selected user font class
    body.classList.add(FONT_MAP[fontFamily]);
  }, [fontFamily, mounted]);

  // Approach 3: Hydration Guard to prevent nested component mismatch during SSR
  if (!mounted) {
    return <LoadingScreen4 />;
  }

  return <>{children}</>;
}
