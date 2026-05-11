"use client";

import { useState } from "react";
import { useGoBack } from "@/hooks/useGoBack";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import WordExplainComp from "@/components/WordExplainComp";
import { ShortStory } from "@/data/shortStories";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import {
  ArrowLeft,
  BookOpen,
  Pause,
  Play,
  X,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Menu,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface MDXShortStory extends ShortStory {
  mdxSource: MDXRemoteSerializeResult;
}

export default function ShortStoriesPracticeComp({
  initialStories,
}: {
  initialStories: MDXShortStory[];
}) {
  useGoBack();
  const router = useRouter();

  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const currentStory = initialStories[currentStoryIndex] || initialStories[0];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Audio Speech State
  const { speak, stop, pause, resume, isPlaying, isPaused, isSupported } =
    useTextToSpeech({
      lang: "de-DE",
      pitch: 0.9,
      rate: 1,
      volume: 1,
    });

  // Derived
  const currentQuestion = currentStory?.questions[currentQuestionIndex];
  const isLastQuestion =
    currentQuestionIndex === (currentStory?.questions.length || 0) - 1;

  // Handlers
  const handleOptionSelect = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      handleNextStory();
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    }
  };

  const handleNextStory = () => {
    const nextIndex = (currentStoryIndex + 1) % initialStories.length;
    setCurrentStoryIndex(nextIndex);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    stop();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePlayAudio = () => {
    if (!isSupported) {
      alert("Ihr Browser unterstützt diese Audiofunktion leider nicht.");
      return;
    }
    if (isPlaying && !isPaused) {
      pause();
      return;
    }
    if (isPaused) {
      resume();
      return;
    }
    let textToSpeak = currentStory.originalText || currentStory.title;
    speak({ text: textToSpeak });
  };

  if (!currentStory) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f6f2] dark:bg-[#121212] text-[#1a1a2e] dark:text-[#E0E0E0] transition-colors duration-300">
        <div className="text-center space-y-4">
          <BookOpen className="w-12 h-12 mx-auto opacity-50" />
          <p className="text-lg font-serif">Keine Geschichten gefunden.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f6f2] dark:bg-[#121212] text-[#1a1a2e] dark:text-[#E0E0E0] font-sans selection:bg-[#e8d5b7] dark:selection:bg-[#333] selection:text-[#1a1a2e] dark:selection:text-white transition-colors duration-300">
      {/* HEADER - Normal, non-sticky */}
      <header className="max-w-[720px] mx-auto px-6 py-5 flex items-center justify-between border-b border-[#1a1a2e]/10 dark:border-white/10">
        <button
          onClick={() => {
            stop();
            router.push("/juwelen");
          }}
          className="flex items-center gap-2 text-[#1a1a2e]/70 dark:text-[#E0E0E0]/70 hover:text-[#1a1a2e] dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-semibold tracking-wider uppercase">
            <WordExplainComp
              word="zurück"
              meaning="back"
              position="BOTTOM_RIGHT_BOTTOM"
              alwaysShow
              showArrow
            />
          </span>
        </button>

        <button
          onClick={() => setIsSettingsOpen(true)}
          className="flex items-center gap-2 text-[#1a1a2e]/70 dark:text-[#E0E0E0]/70 hover:text-[#1a1a2e] dark:hover:text-white transition-colors"
        >
          <span className="text-sm font-semibold tracking-wider uppercase">
            <WordExplainComp
              word="Andere Geschichten"
              meaning="other stories"
              position="BOTTOM_LEFT_BOTTOM"
              showArrow
              alwaysShow
            />
          </span>
          <Menu className="w-5 h-5" />
        </button>
      </header>

      {/* ARTICLE CONTAINER */}
      <main className="max-w-[720px] mx-auto px-6 py-10">
        {/* BANNER */}
        {currentStory.imageUrl && (
          <div className="w-full aspect-16/7 rounded-xl overflow-hidden mb-10 shadow-sm relative bg-[#1a1a2e] dark:bg-[#0a0a14]">
            <img
              src={currentStory.imageUrl}
              alt={currentStory.title}
              className="w-full h-full object-cover opacity-90"
            />
          </div>
        )}

        {/* TITLE & METADATA */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1a1a2e] dark:text-[#f0f0f0] leading-tight mb-6">
            {currentStory.title}
          </h1>

          <div className="flex items-center justify-between border-t border-b border-[#1a1a2e]/10 dark:border-white/10 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1a1a2e] dark:bg-[#E0E0E0] flex items-center justify-center text-[#e8d5b7] dark:text-[#121212] font-serif font-bold text-lg">
                AR
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-[#1a1a2e] dark:text-[#E0E0E0]">
                  A.R. Redaktion
                </span>
                <span className="text-[11px] font-medium text-[#1a1a2e]/50 dark:text-[#E0E0E0]/50 uppercase tracking-widest">
                  Level {currentStory.level}
                </span>
              </div>
            </div>

            <button
              onClick={handlePlayAudio}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#1a1a2e]/20 dark:border-white/20 text-[#1a1a2e] dark:text-[#E0E0E0] hover:bg-[#1a1a2e] dark:hover:bg-[#E0E0E0] hover:text-[#f7f6f2] dark:hover:text-[#121212] transition-colors text-sm font-semibold tracking-wide"
            >
              {isPlaying && !isPaused ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current ml-0.5" />
              )}
              {isPlaying && !isPaused ? "Pausieren" : "Listen"}
            </button>
          </div>
        </div>

        {/* STORY BODY */}
        <div
          className="prose prose-lg md:prose-xl max-w-none font-serif leading-relaxed mb-16
                     prose-p:text-[#1a1a2e]/80 dark:prose-p:text-[#E0E0E0]/90 
                     prose-headings:text-[#1a1a2e] dark:prose-headings:text-[#f0f0f0] 
                     prose-strong:text-[#1a1a2e] dark:prose-strong:text-[#f0f0f0]
                     prose-p:first-of-type:first-letter:text-6xl prose-p:first-of-type:first-letter:font-bold 
                     prose-p:first-of-type:first-letter:text-[#1a1a2e] dark:prose-p:first-of-type:first-letter:text-[#f0f0f0]
                     prose-p:first-of-type:first-letter:float-left 
                     prose-p:first-of-type:first-letter:mr-3 prose-p:first-of-type:first-letter:mt-1"
        >
          <MDXRemote
            {...currentStory.mdxSource}
            components={{ WordExplainComp }}
          />
        </div>

        {/* QUIZ SECTION */}
        {currentQuestion && (
          <div className="mt-16 pt-10 border-t border-[#1a1a2e]/20 dark:border-white/10">
            <h3 className="text-2xl font-serif font-bold text-[#1a1a2e] dark:text-[#f0f0f0] mb-2 text-center">
              Test Your Understanding
            </h3>
            <p className="text-sm text-[#1a1a2e]/60 dark:text-[#E0E0E0]/60 font-sans font-medium mb-8 text-center uppercase tracking-widest">
              Frage {currentQuestionIndex + 1} von{" "}
              {currentStory.questions.length}
            </p>

            <div className="bg-[#fffdf8] dark:bg-[#1a1a1a] p-8 md:p-10 rounded-2xl shadow-sm border border-[#1a1a2e]/10 dark:border-white/5">
              <p className="text-xl font-bold font-serif text-[#1a1a2e] dark:text-[#f0f0f0] mb-8 leading-snug">
                {currentQuestion.question}
              </p>

              <div className="flex flex-col gap-3 font-sans">
                {currentQuestion.options.map((opt) => {
                  const isSelected = selectedOption === opt;
                  const isCorrect = opt === currentQuestion.correctAnswer;

                  let btnClass =
                    "bg-white dark:bg-[#222] border-[#1a1a2e]/10 dark:border-white/10 text-[#1a1a2e] dark:text-[#E0E0E0] hover:bg-[#f7f6f2] dark:hover:bg-[#2a2a2a] hover:border-[#1a1a2e]/30 dark:hover:border-white/30";
                  let Icon: React.ReactNode = null;

                  if (isAnswered) {
                    if (isCorrect) {
                      btnClass =
                        "bg-[#eef8f2] dark:bg-emerald-950/30 border-[#2e8b57] dark:border-emerald-500/50 text-[#1e5c3a] dark:text-emerald-400 ring-1 ring-[#2e8b57]/50 dark:ring-emerald-500/30";
                      Icon = (
                        <CheckCircle2 className="w-5 h-5 text-[#2e8b57] dark:text-emerald-400 shrink-0" />
                      );
                    } else if (isSelected) {
                      btnClass =
                        "bg-[#fff0f0] dark:bg-rose-950/30 border-[#c0392b] dark:border-rose-500/50 text-[#962d22] dark:text-rose-400 ring-1 ring-[#c0392b]/50 dark:ring-rose-500/30";
                      Icon = (
                        <XCircle className="w-5 h-5 text-[#c0392b] dark:text-rose-400 shrink-0" />
                      );
                    } else {
                      btnClass =
                        "bg-white dark:bg-[#222] border-[#1a1a2e]/5 dark:border-white/5 text-[#1a1a2e]/40 dark:text-[#E0E0E0]/40 opacity-60";
                    }
                  } else if (isSelected) {
                    btnClass =
                      "bg-[#e8d5b7]/20 dark:bg-white/10 border-[#1a1a2e] dark:border-white text-[#1a1a2e] dark:text-white ring-1 ring-[#1a1a2e] dark:ring-white";
                  }

                  return (
                    <button
                      key={opt}
                      onClick={() => handleOptionSelect(opt)}
                      disabled={isAnswered}
                      className={`w-full flex items-center justify-between px-6 py-4 rounded-xl border transition-all duration-200 text-left text-base font-semibold ${btnClass}`}
                    >
                      <span>{opt}</span>
                      {Icon && <span className="ml-3">{Icon}</span>}
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <div className="mt-8 p-6 bg-[#f7f6f2] dark:bg-[#111] rounded-xl animate-in fade-in slide-in-from-top-2 border border-[#1a1a2e]/10 dark:border-white/5 font-sans">
                  <span className="font-bold uppercase tracking-widest text-[11px] text-[#1a1a2e]/50 dark:text-[#E0E0E0]/50 block mb-2">
                    Erklärung
                  </span>
                  <p className="text-base text-[#1a1a2e]/80 dark:text-[#E0E0E0]/90 leading-relaxed font-medium">
                    {currentQuestion.explanation}
                  </p>
                </div>
              )}

              {isAnswered && (
                <button
                  onClick={handleNextQuestion}
                  className="mt-8 w-full py-4 bg-[#1a1a2e] dark:bg-[#E0E0E0] text-[#f7f6f2] dark:text-[#121212] text-sm font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] font-sans shadow-md"
                >
                  {isLastQuestion ? "Nächste Geschichte" : "Nächste Frage"}
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* FOOTER */}
        <footer className="mt-20 pt-8 border-t border-[#1a1a2e]/10 dark:border-white/10 pb-10 text-center">
          <p className="text-xs text-[#1a1a2e]/40 dark:text-[#E0E0E0]/40 font-medium uppercase tracking-widest font-sans">
            © {new Date().getFullYear()} Mein Deutsch. Alle Rechte vorbehalten.
          </p>
        </footer>
      </main>

      {/* STORY SELECTOR MODAL */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1a1a2e]/40 dark:bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[#f7f6f2] dark:bg-[#1a1a1a] w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[80vh] border border-[#1a1a2e]/10 dark:border-white/10">
            <div className="p-6 flex items-center justify-between shrink-0 border-b border-[#1a1a2e]/10 dark:border-white/10">
              <h2 className="text-xl font-serif font-bold text-[#1a1a2e] dark:text-[#f0f0f0]">
                <WordExplainComp
                  word="Bibliothek"
                  meaning="Library"
                  position="BOTTOM_RIGHT_BOTTOM"
                  alwaysShow
                  showArrow
                />
              </h2>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="p-2 rounded-full hover:bg-[#1a1a2e]/10 dark:hover:bg-white/10 text-[#1a1a2e]/60 dark:text-[#E0E0E0]/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 py-6 overflow-y-auto custom-scrollbar font-sans">
              <div className="space-y-2">
                {initialStories.map((story, idx) => (
                  <button
                    key={story.id}
                    onClick={() => {
                      setCurrentStoryIndex(idx);
                      setCurrentQuestionIndex(0);
                      setSelectedOption(null);
                      setIsAnswered(false);
                      stop();
                      setIsSettingsOpen(false);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`w-full text-left px-5 py-4 rounded-xl text-sm transition-all ${
                      currentStoryIndex === idx
                        ? "bg-[#1a1a2e] dark:bg-[#E0E0E0] text-[#f7f6f2] dark:text-[#121212] font-semibold shadow-md"
                        : "bg-white dark:bg-[#222] text-[#1a1a2e]/80 dark:text-[#E0E0E0]/80 hover:bg-[#e8d5b7]/30 dark:hover:bg-[#333] border border-[#1a1a2e]/10 dark:border-white/5 font-medium"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`shrink-0 font-bold text-[10px] px-2 py-0.5 rounded uppercase tracking-wider ${
                          currentStoryIndex === idx
                            ? "bg-[#f7f6f2]/20 dark:bg-black/20 text-[#f7f6f2] dark:text-[#121212]"
                            : "bg-[#1a1a2e]/5 dark:bg-white/5 text-[#1a1a2e]/60 dark:text-[#E0E0E0]/60"
                        }`}
                      >
                        {story.level}
                      </span>
                      <span className="truncate">{story.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
