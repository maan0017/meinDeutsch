"use client";

import { useState, useEffect, useRef, MouseEvent } from "react";
import { useTheme } from "next-themes";
import { ComputerIcon, MoonIcon, SunIcon, CheckIcon } from "lucide-react";

type ThemeOption = "light" | "dark" | "system";

export const ThemeToggleButton = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true); // ensures hydration
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | globalThis.MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpenMenu(false);
      }
    };

    if (openMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenu]);

  if (!mounted) return null;

  const handleLeftClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (theme === "dark" || (theme === "system" && systemTheme === "dark")) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const handleRightClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpenMenu((prev) => !prev);
  };

  const selectTheme = (option: ThemeOption) => {
    setTheme(option);
    setOpenMenu(false);
  };

  const isActive = (option: ThemeOption) => {
    if (theme === "system") return option === "system";
    return option === theme;
  };

  const currentIcon =
    theme === "light" ? (
      <SunIcon className="w-5 h-5 text-yellow-500" />
    ) : theme === "dark" ? (
      <MoonIcon className="w-5 h-5 text-gray-200" />
    ) : (
      <ComputerIcon className="w-5 h-5 text-blue-400" />
    );

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        type="button"
        title="Toggle Theme ( t )"
        onClick={handleLeftClick}
        onContextMenu={handleRightClick}
        className="w-12 h-12 flex items-center justify-center rounded-full border 
        border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 
        text-gray-800 dark:text-gray-100 hover:ring-2 hover:ring-blue-500 
        transition-all cursor-pointer"
      >
        {currentIcon}
      </button>

      {/* Right-click menu */}
      {openMenu && (
        <div
          ref={menuRef}
          className="absolute top-full mt-2 right-0 w-36 bg-white dark:bg-[#121212] border border-gray-300 dark:border-gray-700 rounded-md shadow-lg z-50"
        >
          {(["light", "dark", "system"] as ThemeOption[]).map((option) => {
            const icons = {
              light: <SunIcon className="w-4 h-4 text-yellow-500" />,
              dark: <MoonIcon className="w-4 h-4 text-gray-200" />,
              system: <ComputerIcon className="w-4 h-4 text-blue-400" />,
            };

            return (
              <button
                key={option}
                type="button"
                onClick={() => selectTheme(option)}
                className={`w-full px-4 py-2 text-left flex items-center gap-2 transition-colors hover:rounded-md cursor-pointer
                  ${
                    isActive(option)
                      ? "bg-blue-500 text-white dark:bg-blue-600 dark:text-white font-semibold"
                      : "text-gray-800 dark:text-gray-100 hover:bg-sky-100 dark:hover:bg-gray-800"
                  }
                ${theme === "light" ? "rounded-t-md" : ""}    
                ${theme === "system" ? "rounded-b-md" : ""}    
                `}
              >
                {icons[option]}
                <span className="flex-1 capitalize">{option}</span>
                {isActive(option) && <CheckIcon className="w-4 h-4" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
