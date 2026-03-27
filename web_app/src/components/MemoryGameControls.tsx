"use client";

import { ChangeEvent, KeyboardEvent, useEffect } from "react";
import { useSoundEffects } from "@/hooks/useSoundEffects";

type MemoryGameControlsProps = {
  input: string;
  setInput: (val: string) => void;
  handleGuess: () => void;
  resetFunction: () => void;
  showAll: boolean;
  toggleShow: () => void;
  shake: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  placeholder?: string;
  containerClassName?: string;
};

export default function MemoryGameControls({
  input,
  setInput,
  handleGuess,
  resetFunction,
  showAll,
  toggleShow,
  shake,
  inputRef,
  placeholder = "Type a word…",
  containerClassName = "mb-3",
}: MemoryGameControlsProps) {
  const { playKeyboardSound } = useSoundEffects();

  useEffect(() => {
    const KeyJobs = (e: globalThis.KeyboardEvent) => {
      if (
        e.key.toLowerCase() === "s" &&
        e.altKey &&
        !e.ctrlKey &&
        !e.shiftKey
      ) {
        e.preventDefault();
        toggleShow();
      }
      if (
        e.key.toLowerCase() === "r" &&
        e.altKey &&
        !e.ctrlKey &&
        !e.shiftKey
      ) {
        e.preventDefault();
        resetFunction();
      }

      const target = e.target as HTMLElement;

      if (
        (e.altKey &&
          e.key.toLowerCase() === "i" &&
          !e.shiftKey &&
          !e.ctrlKey &&
          !["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) ||
        target.isContentEditable
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }

      if (
        (e.key === "Escape" &&
          !e.altKey &&
          !e.shiftKey &&
          !e.ctrlKey &&
          ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) ||
        target.isContentEditable
      ) {
        e.preventDefault();
        inputRef.current?.blur();
      }
    };

    document.addEventListener("keydown", KeyJobs);
    return () => document.removeEventListener("keydown", KeyJobs);
  }, [toggleShow, resetFunction, inputRef]);

  return (
    <div
      className={`flex gap-2.5 items-center flex-wrap justify-center ${containerClassName} ${shake ? "animate-shake" : ""}`}
    >
      <input
        ref={inputRef}
        className={`bg-white dark:bg-[#15151c] border border-slate-300 
          dark:border-[#3a3a4a] rounded-md text-slate-900 dark:text-[#e8e2d6] z-10 
          text-[0.95rem] py-2 px-4 w-[240px] outline-none transition-colors duration-200 
          focus:border-green-500 dark:focus:border-[#7ec87e]`}
        value={input}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setInput(e.target.value)
        }
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
          playKeyboardSound(e.key);
          if (e.key === "Enter") handleGuess();
        }}
        placeholder={placeholder}
        title="Alt + I to focus"
        autoFocus
      />
      <button
        type="button"
        className="bg-green-100 dark:bg-[#1e3a1e] border z-10 
        border-green-500 dark:border-[#3d6b3d] rounded-md text-green-700 
        dark:text-[#7ec87e] text-[0.9rem] py-2 px-[1.2rem] cursor-pointer 
        transition-colors duration-200 hover:bg-green-200 dark:hover:bg-[#2a4a2a]"
        onClick={handleGuess}
        title="Enter"
      >
        Enter
      </button>
      <button
        type="button"
        className="bg-slate-100 dark:bg-[#2a2a35] border z-10  
        border-slate-300 dark:border-[#3a3a4a] rounded-md text-slate-700 
        dark:text-[#c8c0b0] text-[0.9rem] py-2 px-[1.2rem] cursor-pointer 
        transition-colors duration-200 hover:bg-slate-200 dark:hover:bg-[#3a3a4a]"
        onClick={resetFunction}
        title="Alt + R to Reset"
      >
        Reset
      </button>
      <button
        type="button"
        className="bg-blue-50 dark:bg-[#1c2738] border z-10 
        border-blue-400 dark:border-[#3d5b8b] rounded-md text-blue-700 
        dark:text-[#7ba9e8] text-[0.9rem] py-2 px-[1.2rem] cursor-pointer 
        transition-colors duration-200 hover:bg-blue-100 dark:hover:bg-[#26354b] ml-1"
        onClick={toggleShow}
        title="Alt + S to Toggle Show All"
      >
        {showAll ? "Hide All" : "Show All"}
      </button>
    </div>
  );
}
