import Link from "next/link";
import React from "react";

export const QuizHeader = () => {
  return (
    <header className="flex items-center justify-between w-full mb-2 md:mb-4 relative">
      <div className="shrink-0">
        <Link
          href="/juwelen"
          className="p-1.5 md:p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#444444] text-gray-500 dark:text-[#B0B0B0] transition-colors inline-flex items-center justify-center"
          title="Back to Quiz Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </Link>
      </div>

      <div className="flex-1 text-center px-2 md:px-4">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-[#E0E0E0]">
          Practice German Words
        </h1>
        <p className="text-xs md:text-sm text-gray-500 dark:text-[#B0B0B0] font-medium mt-0.5 md:mt-1">
          Translate the word below into German
        </p>
      </div>
    </header>
  );
};
