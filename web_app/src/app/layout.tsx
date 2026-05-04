import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { FontProvider } from "@/components/FontProvider";
import NextTopLoader from "nextjs-toploader";
import { ALL_FONT_VARIABLES } from "@/utils/fonts";
import { FontScript } from "@/components/FontScript";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Mein Deutsch",
  description: "My personal project to learn and practice German",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head />
      <body
        suppressHydrationWarning={true}
        className={`${ALL_FONT_VARIABLES} antialiased min-h-screen bg-background text-foreground relative`}
      >
        <FontScript />
        <ThemeProvider>
          <FontProvider>
            <NextTopLoader />
            {children}
            {/* IMP** comment don't delete it. it causes page looks like empty or background, may be used in future*/}
            {/* <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 overflow-hidden z-0"
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[64px_64px] dark:bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)]" />
            </div> */}
          </FontProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
