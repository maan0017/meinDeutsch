"use client";

import { useState, useCallback, useEffect, memo } from "react";

// ==================== KEY COMPONENT ====================

export type KeyType =
  | "letter"
  | "number"
  | "special"
  | "space"
  | "enter"
  | "shift"
  | "backspace"
  | "tab"
  | "caps"
  | "win"
  | "alt"
  | "modifier"
  | "action"
  | "ctrl";

export interface KeyInterface {
  label: string;
  smallLabel: string;
  capitalLabel: string;
  specialLabel?: string;
  capitalSpecialLabel?: string;
  shiftLabel?: string;
  value: string;
  width?: string;
  type?: KeyType;
  code?: string; // e.g., "ShiftLeft", "ControlRight"
}

export interface KeyProps {
  keyData: KeyInterface;
  rowIdx: number;
  keyIdx: number;
  isPressed: boolean;
  isActive: boolean;
  isShiftPressed: boolean;
  isCapsLockOn: boolean;
  isAltPressed: boolean;
  handleKeyPress: (key: KeyInterface) => void;
}

export const Key = memo(
  ({
    keyData,
    isPressed,
    isActive,
    isShiftPressed,
    isCapsLockOn,
    isAltPressed,
    handleKeyPress,
  }: KeyProps) => {
    const getDisplayLabel = () => {
      const isShiftActive = isShiftPressed || isCapsLockOn;

      if (isAltPressed && isShiftActive && keyData.capitalSpecialLabel) {
        return keyData.capitalSpecialLabel;
      }

      if (isAltPressed && keyData.specialLabel) {
        return keyData.specialLabel;
      }

      if (isShiftActive) {
        return keyData.shiftLabel || keyData.capitalLabel;
      }

      return keyData.smallLabel;
    };

    const shouldShowDualLabels = () => {
      return (
        keyData.type === "letter" ||
        keyData.type === "number" ||
        (keyData.shiftLabel && keyData.shiftLabel !== keyData.smallLabel)
      );
    };

    const displayLabel = getDisplayLabel();
    const showDualLabels = shouldShowDualLabels();

    const getSecondaryLabel = () => {
      if (keyData.type === "letter" && keyData.specialLabel) {
        return keyData.specialLabel;
      }
      if (keyData.type === "number" && keyData.shiftLabel) {
        return keyData.shiftLabel;
      }
      return null;
    };

    const secondaryLabel = getSecondaryLabel();

    return (
      <button
        onClick={() => handleKeyPress(keyData)}
        onMouseDown={(e) => e.preventDefault()}
        className={`
        ${keyData?.width || "w-14"} h-12
        relative
        flex items-center justify-center
        select-none cursor-pointer
        font-sans text-sm
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
        
        ${
          isActive
            ? `
              bg-linear-to-b from-blue-400 to-blue-500
              dark:from-blue-600 dark:to-blue-700
              text-white dark:text-white
              border-blue-500! dark:border-blue-600!
              translate-y-1
              shadow-inner
            `
            : ""
        }
      `}
      >
        {showDualLabels && secondaryLabel ? (
          <div className="w-full h-full relative flex items-center justify-center">
            <span
              className={`
              absolute text-xs opacity-60
              ${
                keyData.type === "number"
                  ? "top-1 left-1.5"
                  : "bottom-1 right-1.5"
              }
            `}
            >
              {secondaryLabel}
            </span>

            <span className="font-medium text-base">{displayLabel}</span>
          </div>
        ) : (
          <span
            className={`
          font-medium
          ${
            keyData.type === "modifier" ||
            keyData.type === "action" ||
            keyData.width
              ? "text-xs"
              : "text-base"
          }
        `}
          >
            {displayLabel}
          </span>
        )}

        {isAltPressed && keyData.specialLabel && (
          <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-amber-400 dark:bg-amber-500" />
        )}
      </button>
    );
  },
);

Key.displayName = "Key";
