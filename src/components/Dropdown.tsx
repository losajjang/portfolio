"use client";

import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";

export type DropdownOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

type DropdownProps = {
  width?: string;
  options: DropdownOption[];
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  helperText?: string;
  onChange?: (value: string) => void;
};

const Dropdown = ({
  width = "w-full",
  options,
  value = "",
  placeholder = "항목을 선택해주세요",
  disabled = false,
  helperText = "",
  onChange = () => {},
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const selectedOption = useMemo(
    () => options.find((option) => option.value === value),
    [options, value],
  );

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className={clsx("relative", width)}>
      <button
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={clsx(
          "flex w-full items-center justify-between gap-3",
          "rounded-8 border px-4 py-3 text-left transition-colors duration-200",
          "typo-body4_normal",
          disabled
            ? "cursor-not-allowed border-gray-gray_20 bg-gray-gray_10 text-gray-gray_40"
            : "cursor-pointer border-gray-gray_30 bg-gray-gray_0 text-gray-gray_90 hover:border-primary-primary_30",
          isOpen && !disabled && "border-primary-primary_50 shadow-inputShadow",
        )}
        onClick={() => {
          if (disabled) return;

          setIsOpen((prev) => !prev);
        }}
      >
        <span
          className={clsx(
            "truncate",
            selectedOption ? "text-gray-gray_90" : "text-gray-gray_50",
          )}
        >
          {selectedOption?.label ?? placeholder}
        </span>
        <span
          aria-hidden="true"
          className={clsx(
            "shrink-0 text-gray-gray_60 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        >
          ▾
        </span>
      </button>

      {isOpen && (
        <div
          className={clsx(
            "absolute top-[calc(100%+8px)] left-0 z-50",
            "w-full overflow-hidden",
            "rounded-8 border border-gray-gray_20 bg-gray-gray_0 shadow-dropdownShadow",
          )}
        >
          <ul className="max-h-60 overflow-y-auto py-2" role="listbox">
            {options.map((option) => {
              const isSelected = option.value === value;

              return (
                <li key={option.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    disabled={option.disabled}
                    className={clsx(
                      "flex w-full items-center justify-between px-4 py-3 text-left transition-colors duration-150",
                      "typo-body4_normal",
                      option.disabled
                        ? "cursor-not-allowed text-gray-gray_40"
                        : "cursor-pointer text-gray-gray_80 hover:bg-background-bg_5",
                      isSelected &&
                        "bg-primary-primary_5 text-primary-primary_80",
                    )}
                    onClick={() => {
                      if (option.disabled) return;

                      onChange(option.value);
                      setIsOpen(false);
                    }}
                  >
                    <span className="truncate">{option.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {helperText && (
        <p className="mt-2 px-1 typo-detail1_normal text-gray-gray_60">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Dropdown;
