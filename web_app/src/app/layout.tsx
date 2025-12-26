import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import localFont from "next/font/local";

const Literata = localFont({
  src: [
    {
      path: "../fonts/Literata-Bold-subset.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-literata",
  display: "swap",
});

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
        className={`antialiased min-h-screen bg-background text-foreground ${Literata.variable} ${Literata.className}`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
