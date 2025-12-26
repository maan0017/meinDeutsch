import { useSoundEffects } from "@/hooks/useSoundEffects";
import React from "react";

interface SearchBarProps {
  inputRef?: React.RefObject<HTMLInputElement | null>;
  shortcutKeys?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  isFocused?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  inputRef,
  shortcutKeys,
  value,
  onChange,
  placeholder = "Search...",
  onFocus,
  onBlur,
  isFocused = false,
}) => {
  const { playKeyboardSound } = useSoundEffects();
  return (
    <div className="relative group w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          className={`h-4 w-4 transition-colors duration-200 ${
            isFocused
              ? "text-blue-500 dark:text-blue-400"
              : "text-slate-400 dark:text-slate-500"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <input
        ref={inputRef}
        type="text"
        className={`block w-full pl-9 pr-14 py-2 text-sm rounded-lg border transition-all duration-200 outline-none
          shadow-sm
          ${
            isFocused
              ? "border-blue-500 dark:border-blue-500 ring-2 ring-blue-100 dark:ring-blue-900/30 bg-white dark:bg-[#1E1E1E]"
              : "border-slate-200 dark:border-[#444444] bg-slate-50 dark:bg-[#1E1E1E] hover:border-slate-300 dark:hover:border-[#666666]"
          }
           text-slate-900 dark:text-[#E0E0E0] placeholder-slate-400 dark:placeholder-[#888888]
        `}
        placeholder={placeholder}
        value={value}
        onKeyDown={(e) => playKeyboardSound(e.key)}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {shortcutKeys && (
        <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
          <kbd
            className={`hidden md:inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium border transition-colors duration-200 ${
              isFocused
                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-800"
                : "bg-slate-100 dark:bg-[#2C2C2C] text-slate-500 dark:text-[#888888] border-slate-200 dark:border-[#444444]"
            }`}
          >
            {shortcutKeys}
          </kbd>
        </div>
      )}
    </div>
  );
};
