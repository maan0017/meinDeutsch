import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { FontProvider } from "@/components/FontProvider";

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
      <body
        suppressHydrationWarning={true}
        className={`antialiased min-h-screen bg-background text-foreground relative`}
      >
        <ThemeProvider>
          <FontProvider>
            {children}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 overflow-hidden z-0"
            >
              {/* <div className="absolute -top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-sky-600/6 blur-[120px]" /> */}
              {/* <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-violet-600/5 blur-[120px]" /> */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[64px_64px] dark:bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)]" />
            </div>
          </FontProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
