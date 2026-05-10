"use client";

import { useState } from "react";
import { useGoBack } from "@/hooks/useGoBack";
import { shortStories, StoryLevel, ShortStory } from "@/data/shortStories";
import { useSpeech } from "@/hooks/useTextToSpeech";
import {
  Settings,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  ChevronRight,
  BookOpen,
  Pause,
  Play,
  SlidersHorizontal,
  RefreshCw,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function ShortStoriesPracticeComp() {
  useGoBack();
  const router = useRouter();

  // Selected Level / Story State
  const [selectedLevel, setSelectedLevel] = useState<StoryLevel | "All">("All");
  const filteredStories = shortStories.filter(
    (s) => selectedLevel === "All" || s.level === selectedLevel
  );

  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const currentStory = filteredStories[currentStoryIndex] || filteredStories[0];

  // Quiz State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // UI State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showAudioControls, setShowAudioControls] = useState(false);

  // Audio Speech State
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(0.85);
  const [volume, setVolume] = useState(1);

  const { speak, stop, pause, resume, isPlaying, isPaused, isSupported } =
    useSpeech({
      lang: "de-DE",
      pitch,
      rate,
      volume,
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
    const nextIndex = (currentStoryIndex + 1) % filteredStories.length;
    setCurrentStoryIndex(nextIndex);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    stop();
    document.getElementById("story-scroll-container")?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLevelChange = (level: StoryLevel | "All") => {
    setSelectedLevel(level);
    setCurrentStoryIndex(0);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    stop();
    document.getElementById("story-scroll-container")?.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Audio extraction
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

    const storyEl = document.getElementById("story-content-box");
    if (!storyEl) return;

    // Clone DOM to safely remove tooltips
    const clone = storyEl.cloneNode(true) as HTMLElement;
    const tooltips = clone.querySelectorAll(".word-meaning-tooltip");
    tooltips.forEach((t) => t.remove());

    let textToSpeak =
      clone.innerText || clone.textContent || currentStory.title;
    textToSpeak = textToSpeak.replace(/\s+/g, " ").trim();

    speak({ text: textToSpeak });
  };

  const resetAudioSettings = () => {
    setPitch(1);
    setRate(0.85);
    setVolume(1);
  };

  if (!currentStory) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] dark:bg-[#0A0A0A] text-slate-800 dark:text-slate-200">
        <div className="text-center space-y-4">
          <BookOpen className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700" />
          <p className="text-lg font-serif">Keine Geschichten gefunden.</p>
          <button
            onClick={() => handleLevelChange("All")}
            className="px-6 py-2.5 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-full text-sm font-bold tracking-wide transition-transform hover:scale-105"
          >
            Alle anzeigen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#FCFCFC] dark:bg-[#0A0A0A] text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-200 dark:selection:bg-blue-900/40 overflow-hidden">
      {/* MINIMALIST HEADER - Fixed Top */}
      <header className="flex-none bg-[#FCFCFC]/80 dark:bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-white/5 px-4 py-3 flex items-center justify-between z-40">
        <button
          onClick={() => {
            stop();
            router.push("/juwelen");
          }}
          className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium tracking-wide">Zurück</span>
        </button>

        <div className="absolute left-1/2 -translate-x-1/2">
          <h1 className="text-sm font-bold tracking-widest uppercase text-slate-800 dark:text-slate-200 opacity-60">
            Kurzgeschichten
          </h1>
        </div>

        <button
          onClick={() => setIsSettingsOpen(true)}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <Settings className="w-4 h-4" />
        </button>
      </header>

      {/* MAIN SPLIT LAYOUT */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden max-w-[1600px] mx-auto w-full">
        
        {/* LEFT/TOP: FIXED HERO PANEL */}
        <div className="flex-none lg:w-[45%] xl:w-[40%] p-4 md:p-6 lg:p-8 flex flex-col relative z-20">
          <div className="relative w-full h-[40vh] min-h-[300px] lg:h-full lg:min-h-0 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-end group bg-slate-900">
            {currentStory.imageUrl ? (
              <img
                src={currentStory.imageUrl}
                alt={currentStory.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <BookOpen className="w-32 h-32 text-white" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
            
            <div className="relative p-5 md:p-8 flex flex-col gap-4 md:gap-6 w-full">
              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2 md:gap-3">
                <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-[10px] md:text-xs font-bold uppercase tracking-widest shadow-lg">
                  Level {currentStory.level}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] md:text-xs font-semibold uppercase tracking-widest border border-white/20">
                  {currentStory.tags.join(" · ")}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.15] drop-shadow-lg">
                {currentStory.title}
              </h1>

              {/* Audio Player Bar */}
              <div className="mt-2 p-3 md:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-between shadow-xl relative">
                <div className="flex items-center gap-3 md:gap-4">
                  <button
                    onClick={handlePlayAudio}
                    className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white text-slate-900 hover:scale-105 active:scale-95 transition-transform shadow-lg shrink-0"
                  >
                    {isPlaying && !isPaused ? (
                      <Pause className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                    ) : (
                      <Play className="w-4 h-4 md:w-5 md:h-5 fill-current ml-1" />
                    )}
                  </button>
                  <div className="flex flex-col">
                    <span className="font-bold text-xs md:text-sm text-white line-clamp-1">
                      {isPlaying && !isPaused
                        ? "Wird vorgelesen..."
                        : "Geschichte anhören"}
                    </span>
                    <span className="text-[10px] text-white/70 font-medium">KI Stimme</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 md:gap-2 shrink-0">
                  {(isPlaying || isPaused) && (
                    <button
                      onClick={stop}
                      className="text-[10px] md:text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-colors"
                    >
                      Stop
                    </button>
                  )}
                  <button
                    onClick={() => setShowAudioControls(!showAudioControls)}
                    className={`p-2 md:p-2.5 rounded-full transition-colors ${
                      showAudioControls
                        ? "bg-white text-slate-900 shadow-md"
                        : "text-white/80 hover:text-white hover:bg-white/20"
                    }`}
                  >
                    <SlidersHorizontal className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>

                {/* Audio Settings Popover */}
                {showAudioControls && (
                  <div className="absolute bottom-full right-0 mb-4 w-[280px] sm:w-[320px] p-5 rounded-2xl bg-[#1A1A1A]/95 backdrop-blur-xl border border-white/10 shadow-2xl z-30 animate-in slide-in-from-bottom-2">
                    <div className="flex flex-col gap-5">
                      {/* Tempo */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex justify-between">
                          <span>Tempo</span>
                          <span className="text-white">
                            {rate.toFixed(2)}x
                          </span>
                        </label>
                        <input
                          type="range"
                          min="0.5"
                          max="2"
                          step="0.05"
                          value={rate}
                          onChange={(e) => setRate(parseFloat(e.target.value))}
                          className="w-full accent-white h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      {/* Pitch */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex justify-between">
                          <span>Tonhöhe</span>
                          <span className="text-white">
                            {pitch.toFixed(1)}
                          </span>
                        </label>
                        <input
                          type="range"
                          min="0.1"
                          max="2"
                          step="0.1"
                          value={pitch}
                          onChange={(e) => setPitch(parseFloat(e.target.value))}
                          className="w-full accent-white h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      {/* Volume */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex justify-between">
                          <span>Lautstärke</span>
                          <span className="text-white">
                            {Math.round(volume * 100)}%
                          </span>
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={volume}
                          onChange={(e) => setVolume(parseFloat(e.target.value))}
                          className="w-full accent-white h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className="mt-5 pt-4 border-t border-white/10 flex justify-end">
                      <button
                        onClick={resetAudioSettings}
                        className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
                      >
                        <RefreshCw className="w-3 h-3" />
                        Standard
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT/BOTTOM: SCROLLABLE STORY SECTION */}
        <div 
          id="story-scroll-container"
          className="flex-1 overflow-y-auto px-5 sm:px-8 py-8 lg:py-12 custom-scrollbar relative z-10"
        >
          <div className="max-w-2xl mx-auto lg:ml-0 lg:max-w-3xl xl:max-w-4xl">
            {/* STORY TEXT */}
            <div
              id="story-content-box"
              className="prose prose-lg md:prose-xl dark:prose-invert max-w-none text-slate-800 dark:text-slate-300 font-serif leading-relaxed"
            >
              {currentStory.content}
            </div>

            {/* DIVIDER */}
            <div className="my-16 lg:my-24 flex items-center justify-center gap-4 opacity-30">
              <div className="w-16 h-px bg-slate-400" />
              <div className="w-2 h-2 rounded-full border border-slate-500" />
              <div className="w-16 h-px bg-slate-400" />
            </div>

            {/* QUIZ SECTION */}
            <div className="mb-20">
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">
                  Testen Sie Ihr Verständnis
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                  Frage {currentQuestionIndex + 1} von{" "}
                  {currentStory.questions.length}
                </p>
              </div>

              {currentQuestion ? (
                <div className="bg-white dark:bg-[#111] p-6 md:p-8 rounded-3xl shadow-lg border border-slate-100 dark:border-white/5">
                  <p className="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-200 mb-6 leading-snug">
                    {currentQuestion.question}
                  </p>

                  <div className="flex flex-col gap-3">
                    {currentQuestion.options.map((opt) => {
                      const isSelected = selectedOption === opt;
                      const isCorrect = opt === currentQuestion.correctAnswer;

                      let btnClass =
                        "bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 hover:border-slate-300 dark:hover:bg-white/10";
                      let Icon: React.ReactNode = null;

                      if (isAnswered) {
                        if (isCorrect) {
                          btnClass =
                            "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-500 text-emerald-800 dark:text-emerald-400 ring-1 ring-emerald-500/50";
                          Icon = (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                          );
                        } else if (isSelected) {
                          btnClass =
                            "bg-rose-50 dark:bg-rose-500/10 border-rose-500 text-rose-800 dark:text-rose-400 ring-1 ring-rose-500/50";
                          Icon = (
                            <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                          );
                        } else {
                          btnClass =
                            "bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-transparent text-slate-400 dark:text-slate-500 opacity-50";
                        }
                      } else if (isSelected) {
                        btnClass =
                          "bg-blue-50 dark:bg-blue-500/10 border-blue-500 text-blue-800 dark:text-blue-400 ring-1 ring-blue-500/50";
                      }

                      return (
                        <button
                          key={opt}
                          onClick={() => handleOptionSelect(opt)}
                          disabled={isAnswered}
                          className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl border-2 transition-all duration-200 text-left text-base font-semibold ${btnClass}`}
                        >
                          <span>{opt}</span>
                          {Icon && <span className="ml-3">{Icon}</span>}
                        </button>
                      );
                    })}
                  </div>

                  {isAnswered && (
                    <div className="mt-6 p-5 bg-slate-50 dark:bg-white/5 rounded-2xl animate-in fade-in slide-in-from-top-2">
                      <span className="font-bold uppercase tracking-widest text-[10px] text-slate-400 block mb-2">
                        Erklärung
                      </span>
                      <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                        {currentQuestion.explanation}
                      </p>
                    </div>
                  )}

                  {isAnswered && (
                    <button
                      onClick={handleNextQuestion}
                      className="mt-8 w-full py-4 bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-sm font-bold uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
                    >
                      {isLastQuestion ? "Nächste Geschichte" : "Nächste Frage"}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </main>

      {/* SETTINGS OVERLAY */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white dark:bg-[#111] w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
            <div className="p-6 flex items-center justify-between shrink-0">
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Leseeinstellungen
              </h2>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 pb-6 overflow-y-auto custom-scrollbar">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                Sprachlevel wählen
              </h3>
              <div className="grid grid-cols-5 gap-2">
                {(["All", "A1", "A2", "B1", "B2"] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => {
                      handleLevelChange(lvl);
                      setIsSettingsOpen(false);
                    }}
                    className={`py-2.5 rounded-xl text-sm font-bold transition-all ${
                      selectedLevel === lvl
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md scale-105"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-white/10"
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>

              <div className="mt-10">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                  Bibliothek
                </h3>
                <div className="space-y-2">
                  {filteredStories.map((story, idx) => (
                    <button
                      key={story.id}
                      onClick={() => {
                        setCurrentStoryIndex(idx);
                        setCurrentQuestionIndex(0);
                        setSelectedOption(null);
                        setIsAnswered(false);
                        stop();
                        setIsSettingsOpen(false);
                        document.getElementById("story-scroll-container")?.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className={`w-full text-left px-4 py-3.5 rounded-2xl text-sm transition-all ${
                        currentStoryIndex === idx
                          ? "bg-blue-50 text-blue-900 font-bold dark:bg-blue-500/10 dark:text-blue-400 ring-1 ring-blue-500/30"
                          : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-white/5 font-medium"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`shrink-0 font-bold text-[10px] px-2 py-0.5 rounded uppercase ${
                            currentStoryIndex === idx
                              ? "bg-blue-100 dark:bg-blue-900/40"
                              : "bg-slate-100 dark:bg-white/10 text-slate-500"
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
        </div>
      )}
    </div>
  );
}
