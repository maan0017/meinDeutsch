"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useGoBack = () => {
  const router = useRouter();

  useEffect(() => {
    const keyHandler = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        return;
      }

      if (event.key.toLowerCase() === "backspace") {
        router.back();
      }
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, []);
};
