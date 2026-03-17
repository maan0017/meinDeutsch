"use client";

import { useSettingsStore } from "@/store/settings";
import type { FontFamily } from "@/store/settings";
import { useEffect, useState } from "react";
import localFont from "next/font/local";
import { IM_Fell_English, Courier_Prime, Roboto } from "next/font/google";

// ---------------------------------------------------------------------------
// Custom / Google font definitions
// Paths are relative to THIS file: src/components/FontProvider.tsx
// → ../fonts/ resolves to src/fonts/
// ---------------------------------------------------------------------------

const literata = localFont({
  src: [
    {
      path: "../fonts/Literata-Bold-subset.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Literata-Bold-subset.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-literata",
  display: "swap",
  preload: true, // Default font — eagerly preloaded
});

const imFellEnglish = IM_Fell_English({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-fell",
  display: "swap",
  preload: false,
});

const courierPrime = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-courier",
  display: "swap",
  preload: false,
});

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
  preload: false,
});

// ---------------------------------------------------------------------------
// Font config map
//
// Each entry describes how to apply a font:
//   - variableClass: the Next.js CSS variable class (custom/Google fonts only)
//   - fontClass:     the Tailwind utility class to set font-family
//
// System fonts (sans, serif, mono, Georgia, etc.) don't need a variable class
// because their font-family is a plain CSS value, declared directly in
// globals.css as @utility classes like .font-system-sans { font-family: ... }
// ---------------------------------------------------------------------------

interface FontConfig {
  variableClass: string | null; // null = no Next.js variable needed
  fontClass: string; // Tailwind utility class defined in globals.css
}

const FONT_CONFIG: Record<FontFamily, FontConfig> = {
  // Custom / Google — need both a variable class and a utility class
  "Literata": { variableClass: literata.variable, fontClass: "font-literata" },
  "IM_Fell_English": {
    variableClass: imFellEnglish.variable,
    fontClass: "font-fell",
  },
  "Courier_Prime": {
    variableClass: courierPrime.variable,
    fontClass: "font-courier",
  },
  "Roboto": { variableClass: roboto.variable, fontClass: "font-roboto" },

  // System generic families — no variable class needed
  "system-sans": { variableClass: null, fontClass: "font-system-sans" },
  "system-serif": { variableClass: null, fontClass: "font-system-serif" },
  "system-mono": { variableClass: null, fontClass: "font-system-mono" },

  // Named system fonts — no variable class needed
  "Georgia": { variableClass: null, fontClass: "font-georgia" },
  "Times_New_Roman": { variableClass: null, fontClass: "font-times" },
  "Arial": { variableClass: null, fontClass: "font-arial" },
  "Trebuchet_MS": { variableClass: null, fontClass: "font-trebuchet" },
  "Verdana": { variableClass: null, fontClass: "font-verdana" },
};

const DEFAULT_FONT: FontFamily = "Literata";

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function FontProvider({ children }: { children: React.ReactNode }) {
  const { fontFamily } = useSettingsStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use DEFAULT_FONT during SSR / pre-hydration to prevent mismatch
  const activeFont: FontFamily = mounted ? fontFamily : DEFAULT_FONT;
  const { variableClass, fontClass } = FONT_CONFIG[activeFont];

  return (
    <div className={`h-full w-full ${fontClass} ${variableClass ?? ""}`}>
      {children}
    </div>
  );
}
