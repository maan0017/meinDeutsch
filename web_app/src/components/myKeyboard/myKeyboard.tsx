"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { KeyInterface, Key } from "./key";
import { keys } from "./keys";
import ShiftKey from "./ShiftKey";
import CapsKey from "./CapsKey";
import WinKey from "./WinKey";
import AltKey from "./AltKey";
import CtrlKey from "./CtrlKey";
import SpaceBar from "./SpaceBar";
import TabKey from "./TabKey";
import EnterKey from "./EnterKey";
import BackspaceKey from "./BackspaceKey";

const FLASH_DURATION = 100;
const NON_OUTPUT_TYPES = new Set(["shift", "alt", "ctrl", "caps", "win"]);

export default function MyKeyboard() {
  const [output, setOutput] = useState("");
  const [pressedCodes, setPressedCodes] = useState<Set<string>>(new Set());
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [capsLock, setCapsLock] = useState(false);

  const modifiers = useMemo(
    () => ({
      shift: pressedCodes.has("ShiftLeft") || pressedCodes.has("ShiftRight"),
      alt: pressedCodes.has("AltLeft") || pressedCodes.has("AltRight"),
      ctrl: pressedCodes.has("ControlLeft") || pressedCodes.has("ControlRight"),
    }),
    [pressedCodes],
  );

  const flatKeys = useMemo(() => keys.flat(), []);

  const getCharFromKey = useCallback(
    (key: KeyInterface, isAlt: boolean, isShift: boolean, isCaps: boolean) => {
      if (isAlt && isShift && key.capitalSpecialLabel)
        return key.capitalSpecialLabel;
      if (isAlt && key.specialLabel) return key.specialLabel;
      if ((isCaps || isShift) && key.shiftLabel) return key.shiftLabel;
      if ((isCaps || isShift) && /[a-z]/.test(key.value))
        return key.value.toUpperCase();
      return key.value;
    },
    [],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;

      if (e.key === "CapsLock") {
        setCapsLock((prev) => !prev);
      }

      setPressedCodes((prev) => new Set(prev).add(e.code));

      const keyObj = flatKeys.find(
        (k) =>
          k.code === e.code ||
          (!NON_OUTPUT_TYPES.has(k.type!) &&
            (k.value.toLowerCase() === e.key.toLowerCase() ||
              k.label.toLowerCase() === e.key.toLowerCase())),
      );

      if (!keyObj) return;

      setPressedKey(keyObj.value);

      if (["tab", "alt", "space"].includes(keyObj.type!)) e.preventDefault();

      if (keyObj.type === "backspace") {
        setOutput((prev) => prev.slice(0, -1));
      } else if (keyObj.type === "enter") {
        setOutput((prev) => prev + "\n");
      } else if (keyObj.type === "tab") {
        setOutput((prev) => prev + "  ");
      } else if (!NON_OUTPUT_TYPES.has(keyObj.type!)) {
        const char = getCharFromKey(
          keyObj,
          e.altKey,
          e.shiftKey,
          e.getModifierState("CapsLock"),
        );
        setOutput((prev) => prev + char);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setPressedCodes((prev) => {
        const next = new Set(prev);
        next.delete(e.code);
        return next;
      });
      setPressedKey(null);
    };

    const handleBlur = () => {
      setPressedCodes(new Set());
      setPressedKey(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleBlur);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleBlur);
    };
  }, [getCharFromKey, flatKeys]);

  // References for keeping handleKeyPress stable
  const modifiersRef = useRef(modifiers);
  const capsLockRef = useRef(capsLock);

  useEffect(() => {
    modifiersRef.current = modifiers;
    capsLockRef.current = capsLock;
  }, [modifiers, capsLock]);

  const handleKeyPress = useCallback(
    (key: KeyInterface) => {
      if (key.type === "caps") {
        setCapsLock((prev) => !prev);
        return;
      }

      if (["shift", "alt", "ctrl"].includes(key.type!)) {
        setPressedCodes((prev) => {
          const next = new Set(prev);
          next.has(key.code!) ? next.delete(key.code!) : next.add(key.code!);
          return next;
        });
        return;
      }

      if (key.type === "win") return;

      setPressedKey(key.value);
      setTimeout(() => setPressedKey(null), FLASH_DURATION);

      if (key.type === "backspace") {
        setOutput((prev) => prev.slice(0, -1));
      } else if (key.type === "enter") {
        setOutput((prev) => prev + "\n");
      } else if (key.type === "tab") {
        setOutput((prev) => prev + "  ");
      } else {
        const currentModifiers = modifiersRef.current;
        const currentCaps = capsLockRef.current;

        const char = getCharFromKey(
          key,
          currentModifiers.alt,
          currentModifiers.shift,
          currentCaps,
        );
        setOutput((prev) => prev + char);
        if (currentModifiers.shift) {
          setPressedCodes((prev) => {
            const next = new Set(prev);
            next.delete("ShiftLeft");
            next.delete("ShiftRight");
            return next;
          });
        }
      }
    },
    [getCharFromKey],
  );

  const renderKey = (key: KeyInterface, rowIdx: number, keyIdx: number) => {
    const isPressed =
      (key.code && pressedCodes.has(key.code)) || pressedKey === key.value;
    const isActive =
      (key.type === "caps" && capsLock) ||
      (key.code && pressedCodes.has(key.code));
    const k = `${rowIdx}-${keyIdx}`;

    if (key.type === "shift") {
      return (
        <ShiftKey
          key={k}
          onClick={() => handleKeyPress(key)}
          isActive={key.code ? pressedCodes.has(key.code) : false}
          width={key.width}
        />
      );
    }
    if (key.type === "caps") {
      return (
        <CapsKey
          key={k}
          onClick={() => handleKeyPress(key)}
          isPressed={capsLock}
          width={key.width}
        />
      );
    }
    if (key.type === "win") {
      return (
        <WinKey
          key={k}
          onClick={() => handleKeyPress(key)}
          isPressed={Boolean(isPressed)}
          width={key.width}
        />
      );
    }
    if (key.type === "alt") {
      return (
        <AltKey
          key={k}
          onClick={() => handleKeyPress(key)}
          isPressed={Boolean(isActive)}
          width={key.width}
        />
      );
    }
    if (key.type === "ctrl") {
      return (
        <CtrlKey
          key={k}
          onClick={() => handleKeyPress(key)}
          isPressed={Boolean(isActive)}
          width={key.width}
        />
      );
    }
    if (key.type === "space") {
      return (
        <SpaceBar
          key={k}
          onClick={() => handleKeyPress(key)}
          isPressed={Boolean(isPressed)}
          width={key.width}
        />
      );
    }
    if (key.type === "backspace") {
      return (
        <BackspaceKey
          key={k}
          onClick={() => handleKeyPress(key)}
          isPressed={Boolean(isPressed)}
          width={key.width}
        />
      );
    }
    if (key.type === "tab") {
      return (
        <TabKey
          key={k}
          onClick={() => handleKeyPress(key)}
          isPressed={Boolean(isPressed)}
          width={key.width}
        />
      );
    }
    if (key.type === "enter") {
      return (
        <EnterKey
          key={k}
          onClick={() => handleKeyPress(key)}
          isPressed={Boolean(isPressed)}
          width={key.width}
        />
      );
    }
    return (
      <Key
        key={k}
        keyIdx={keyIdx}
        rowIdx={rowIdx}
        keyData={key}
        isPressed={Boolean(isPressed)}
        isActive={Boolean(isActive)}
        isShiftPressed={modifiers.shift}
        isCapsLockOn={capsLock}
        isAltPressed={modifiers.alt}
        handleKeyPress={handleKeyPress}
      />
    );
  };

  return (
    <div className="w-full max-w-4xl space-y-3 transition-colors mx-auto">
      {/* Compact Header */}
      <div className="flex items-center justify-between px-2">
        <div className="flex gap-3 text-xs">
          {[
            { active: modifiers.shift, label: "Shift", color: "bg-blue-500" },
            { active: capsLock, label: "Caps", color: "bg-blue-500" },
            { active: modifiers.alt, label: "Alt", color: "bg-amber-500" },
            { active: modifiers.ctrl, label: "Ctrl", color: "bg-indigo-500" },
          ].map(({ active, label, color }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div
                className={`w-2 h-2 rounded-full transition-colors ${
                  active ? color : "bg-gray-300 dark:bg-gray-700"
                }`}
              />
              <span className="text-gray-600 dark:text-gray-400">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Compact Output */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-3">
        <output className="font-mono text-sm text-gray-900 dark:text-gray-100 whitespace-pre-wrap break-all min-h-[60px] max-h-[120px] overflow-auto block">
          {output || <span className="text-gray-400">Type something...</span>}
        </output>
      </div>

      {/* Compact Keyboard */}
      <div className="bg-linear-to-b from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 rounded-lg p-3 shadow-xl border-2 border-gray-300 dark:border-gray-700">
        <div className="flex flex-col gap-1 select-none">
          {keys.map((row, rowIdx) => (
            <div key={rowIdx} className="flex gap-1 justify-center">
              {row.map((key, keyIdx) => renderKey(key, rowIdx, keyIdx))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
