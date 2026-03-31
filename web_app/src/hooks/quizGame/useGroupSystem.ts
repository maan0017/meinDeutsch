import { useState, useEffect, useCallback } from "react";
import { GetGermanWordsGroupLength } from "@/helper/RandomGermanWordSelector";
import { useSettingsStore } from "@/store/settings";

export const useGroupSystem = (
  SAVED_STATE_CURRENT_GROUP: string,
  SAVED_STATE_ALL_IN: string,
  SAVED_STATE_STRICT_MODE: string
) => {
  const { groupSize } = useSettingsStore();
  const [currentGroup, setCurrentGroup] = useState<number>(0);
  const totalGroups = GetGermanWordsGroupLength(groupSize);

  const [allIn, setAllIn] = useState<boolean>(false);
  const [strictMode, setStrictMode] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const moveToNextGroup = useCallback(() => {
    if (currentGroup === totalGroups - 1 || allIn) return;
    setCurrentGroup((prev) => Math.min(totalGroups - 1, prev + 1));
  }, [currentGroup, totalGroups, allIn]);

  const moveToPrevGroup = useCallback(() => {
    if (currentGroup <= 0 || allIn) return;
    setCurrentGroup((prev) => Math.max(0, prev - 1));
  }, [currentGroup, allIn]);

  // Reset group if out of bounds
  useEffect(() => {
    if (currentGroup >= totalGroups && totalGroups > 0) {
      setCurrentGroup(0);
    }
  }, [totalGroups, currentGroup]);

  // Load state
  useEffect(() => {
    const savedGroup = localStorage.getItem(SAVED_STATE_CURRENT_GROUP);
    if (savedGroup) setCurrentGroup(Number(savedGroup));

    const savedAllIn = localStorage.getItem(SAVED_STATE_ALL_IN);
    if (savedAllIn) setAllIn(savedAllIn === "true");

    const savedStrictMode = localStorage.getItem(SAVED_STATE_STRICT_MODE);
    if (savedStrictMode) setStrictMode(savedStrictMode === "true");

    setIsInitialized(true);
  }, [SAVED_STATE_CURRENT_GROUP, SAVED_STATE_ALL_IN, SAVED_STATE_STRICT_MODE]);

  // Save state
  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem(SAVED_STATE_CURRENT_GROUP, String(currentGroup));
    localStorage.setItem(SAVED_STATE_ALL_IN, String(allIn));
    localStorage.setItem(SAVED_STATE_STRICT_MODE, String(strictMode));
  }, [
    currentGroup,
    allIn,
    strictMode,
    isInitialized,
    SAVED_STATE_CURRENT_GROUP,
    SAVED_STATE_ALL_IN,
    SAVED_STATE_STRICT_MODE,
  ]);

  return {
    currentGroup,
    setCurrentGroup,
    totalGroups,
    allIn,
    setAllIn,
    strictMode,
    setStrictMode,
    isInitialized,
    moveToNextGroup,
    moveToPrevGroup,
    groupSize,
  };
};
