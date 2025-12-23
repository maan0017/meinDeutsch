"use client";

interface TabKeyProps {
  onClick: () => void;
  width?: string;
  isPressed?: boolean;
}

export default function TabKey({
  onClick,
  width = "w-20",
  isPressed,
}: TabKeyProps) {
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
      <span className="flex items-center justify-center gap-2">
        <span className="font-medium">Tab</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 12h18M17 8l4 4-4 4" strokeWidth="2.5" />
        </svg>
      </span>
    </button>
  );
}
