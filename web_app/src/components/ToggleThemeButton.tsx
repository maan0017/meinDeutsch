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
      <SunIcon className="w-5 h-5 text-orange-500" />
    ) : theme === "dark" ? (
      <MoonIcon className="w-5 h-5 text-slate-100" />
    ) : (
      <ComputerIcon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
    );

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        type="button"
        title="Toggle Theme ( t )"
        onClick={handleLeftClick}
        onContextMenu={handleRightClick}
        className="p-2 rounded-full border border-slate-200 bg-gray-50 text-slate-500 hover:bg-slate-200 dark:border-[#333] dark:bg-[#1a1a1a] dark:text-[#B0B0B0] dark:hover:bg-[#262626] transition-all cursor-pointer"
      >
        {currentIcon}
      </button>

      {/* Right-click menu */}
      {openMenu && (
        <div
          ref={menuRef}
          className="absolute top-full mt-2 right-0 w-40 bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#333] rounded-lg shadow-xl z-50 p-1 overflow-hidden"
        >
          {(["light", "dark", "system"] as ThemeOption[]).map((option) => {
            const icons = {
              light: <SunIcon className="w-4 h-4 text-orange-500" />,
              dark: <MoonIcon className="w-4 h-4 text-slate-100" />,
              system: (
                <ComputerIcon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              ),
            };

            return (
              <button
                key={option}
                type="button"
                onClick={() => selectTheme(option)}
                className={`w-full px-3 py-2 text-left flex items-center gap-2.5 text-sm rounded-md transition-colors cursor-pointer
                  ${
                    isActive(option)
                      ? "bg-slate-100 dark:bg-[#333] text-slate-900 dark:text-[#E0E0E0] font-medium"
                      : "text-slate-600 dark:text-[#B0B0B0] hover:bg-slate-50 dark:hover:bg-[#262626]"
                  }
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
