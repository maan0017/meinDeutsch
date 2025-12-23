import GuessEnglishWordMCQQuizGame from "@/components/GuessEnglishWordMCQQuizGame";

export default function GuessEnglishWordMCQQuiz() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#121212] text-slate-900 dark:text-[#E0E0E0] transition-colors duration-300">
      <GuessEnglishWordMCQQuizGame />
    </main>
  );
}
