import { BookmarkedWordsGuessGame } from "@/components/BookmarkedWordsGuessGame";

export default function BookmarkedWordsGuessPage() {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#121212] text-slate-900 dark:text-[#E0E0E0] transition-colors duration-300">
      <BookmarkedWordsGuessGame />
    </main>
  );
}
