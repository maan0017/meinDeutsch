"use client";

interface CapsKeyProps {
  onClick: () => void;
  width?: string;
  isPressed?: boolean;
}

export default function CapsKey({
  onClick,
  width = "w-20",
  isPressed,
}: CapsKeyProps) {
  return (
    <button
      onClick={onClick}
      className={`
        ${width} h-12
        relative
        flex items-center justify-start pl-4
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
        
        active:translate-y-1
        active:shadow-inner
        active:from-[#d0d0d0]! 
        active:to-[#c0c0c0]!
        active:dark:from-gray-800! 
        active:dark:to-gray-900!
        active:scale-[0.95]
      `}
    >
      {/* LED indicator light */}
      <div
        className={`
          absolute top-2 right-2
          w-1.5 h-1.5 rounded-full
          transition-all duration-150
          ${
            isPressed
              ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"
              : "bg-gray-300 dark:bg-gray-600 inner-shadow"
          }
        `}
      />
      <span className="font-medium">Caps Lock</span>
    </button>
  );
}
