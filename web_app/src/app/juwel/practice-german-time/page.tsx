import TimeTellerGame from "@/components/TimeTellerGame";

export default function PracticeGermanTime() {
  return (
    <main className="flex w-full h-screen flex-col items-center justify-center bg-slate-50 dark:bg-[#121212] text-slate-900 dark:text-[#E0E0E0] font-sans overflow-hidden transition-colors duration-300">
      <TimeTellerGame />
    </main>
  );
}
