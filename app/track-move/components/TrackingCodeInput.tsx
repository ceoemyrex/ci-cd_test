"use client";
import { useEffect, useRef, useState } from "react";

interface TrackingCodeInputProps {
  length?: number;
  onComplete?: (code: string) => void;
}

export function TrackingCodeInput({
  length = 6,
  onComplete,
}: TrackingCodeInputProps) {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Focus first input on mount
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const focusInput = (index: number) => {
    inputsRef.current[index]?.focus();
  };

  const handleChange = (value: string, index: number) => {
    if (!value) return;

    const char = value[value.length - 1]; // take last typed char

    const newValues = [...values];
    newValues[index] = char;
    setValues(newValues);

    if (index < length - 1) {
      focusInput(index + 1);
    }

    const code = newValues.join("");
    if (code.length === length && !newValues.includes("")) {
      onComplete?.(code);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace") {
      if (values[index]) {
        const newValues = [...values];
        newValues[index] = "";
        setValues(newValues);
      } else if (index > 0) {
        focusInput(index - 1);
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      focusInput(index - 1);
    }

    if (e.key === "ArrowRight" && index < length - 1) {
      focusInput(index + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").slice(0, length);
    const pastedArray = pasted.split("");

    const newValues = [...values];
    pastedArray.forEach((char, i) => {
      if (i < length) newValues[i] = char;
    });

    setValues(newValues);

    const code = newValues.join("");
    if (code.length === length && !newValues.includes("")) {
      onComplete?.(code);
    }
  };

  return (
    <div className="flex w-[90%] mx-auto gap-2 lg:gap-4 justify-center">
      {values.map((value, index) => (
        <div key={index} className="flex-1">
          <input
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            className="
            h-12.5 lg:h-20.25
            w-full
            bg-white
            rounded-lg
            text-center lg:text-xl font-semibold
            focus:outline-none focus:shadow focus:ring-2 focus:ring-secondary
            transition-all
          "
          />
        </div>
      ))}
    </div>
  );
}
