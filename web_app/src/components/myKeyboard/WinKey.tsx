"use client";

interface WinKeyProps {
  onClick: () => void;
  width?: string;
  isPressed?: boolean;
}

export default function WinKey({
  onClick,
  width = "w-14",
  isPressed,
}: WinKeyProps) {
  return (
    <button
      onClick={onClick}
      className={`
        ${width} h-12
        relative
        flex items-center justify-center
        select-none cursor-pointer
        font-sans font-medium text-sm
        transition-all duration-75
        
        bg-linear-to-b from-[#e8e8e8] to-[#d0d0d0]
        text-gray-900
        border border-gray-400
        shadow-sm
        
        dark:bg-linear-to-b dark:from-gray-700 dark:to-gray-800
        dark:text-gray-100
        dark:border-gray-600
        
        hover:from-[#f0f0f0] hover:to-[#d8d8d8]
        dark:hover:from-gray-650 dark:hover:to-gray-750
        
        rounded-md
        
        ${
          isPressed
            ? `
              translate-y-1
              shadow-inner
              from-[#d0d0d0]! to-[#c0c0c0]!
              dark:from-gray-800! dark:to-gray-900!
              scale-[0.95]
            `
            : ""
        }
      `}
    >
      <span className="flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="opacity-90"
        >
          <path d="M3 12V6.75L9 5.25V12H3ZM3 17.25V13H9V18.75L3 17.25ZM21 4.75V12H10V4.25L21 4.75ZM21 19.25L10 19.75V13H21V19.25Z" />
        </svg>
      </span>
    </button>
  );
}
