import { KeyboardEvent } from "react";

export const AllowOnlyNumberInput = (e: KeyboardEvent<HTMLInputElement>) => {
  const allowedKeys = [
    "Backspace",
    "Delete",
    "ArrowLeft",
    "ArrowRight",
    "Tab",
    "Enter",
  ];

  if (allowedKeys.includes(e.key)) return;

  // Allow numbers only
  if (!/^[0-9]$/.test(e.key)) {
    e.preventDefault();
  }
};
