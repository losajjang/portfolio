"use client";
import { ChangeEvent, FocusEvent, forwardRef, KeyboardEvent } from "react";
import clsx from "clsx";
import HelperText from "./HelperText";

interface InputProps {
  placeholder?: string | string[];
  disabled?: boolean;
  value?: string | number | string[];
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  type?: string;
  inputMode?:
    | "search"
    | "text"
    | "email"
    | "tel"
    | "url"
    | "none"
    | "numeric"
    | "decimal";
  pattern?: string;
  id?: string;
  name?: string;
  maxLength?: number;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  onFocusCapture?: () => void;
  onBlurCapture?: () => void;
  autoComplete?: "on" | "off";
  height?: string;
  font?: string;
  padding?: string;
  helperText?: string;
  isError?: boolean;
  min?: number;
  max?: number;
  step?: number;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    placeholder,
    disabled = false,
    value,
    onChange,
    type = "text",
    inputMode = "text",
    pattern,
    onClick,
    id,
    name,
    maxLength,
    onKeyDown,
    readOnly,
    onFocusCapture,
    onBlurCapture,
    autoComplete,
    height = "h-10",
    font = "typo-body3_normal",
    padding = "py-3 px-4",
    helperText = "",
    isError = false,
    min,
    max,
    step,
    onBlur,
  },
  ref,
) {
  return (
    <div className="flex flex-col flex-1 w-full">
      <div
        className={clsx(
          `${padding}`,
          `${height}`,
          "flex items-center gap-8 rounded-4 bg-gray-gray_0 text-gray-gray_100",
          "border border-gray-gray_30 rounded-8",
          isError &&
            "border-status-error_50 shadow-inputErrorShadow focus-within:border-status-error_50",
          disabled && "text-gray-gray_50 bg-gray-gray_20 cursor-default",
          readOnly && "cursor-pointer",
        )}
        onClick={() => {
          if (onClick) {
            onClick();
          }
        }}
      >
        <input
          ref={ref}
          id={id}
          name={name}
          type={type}
          inputMode={inputMode}
          pattern={pattern}
          placeholder={placeholder as string}
          disabled={disabled}
          value={value}
          onChange={(e) => onChange && onChange(e)}
          className={clsx(
            `${font}`,
            "w-full flex-1 bg-transparent outline-none h-full",
            disabled && "placeholder-gray-gray_50",
            readOnly && "cursor-pointer",
          )}
          maxLength={maxLength}
          min={min}
          max={max}
          step={step}
          onKeyDown={(e) => onKeyDown && onKeyDown(e)}
          onBlur={onBlur}
          readOnly={readOnly}
          onFocusCapture={onFocusCapture}
          onBlurCapture={onBlurCapture}
          autoComplete={autoComplete}
        />
      </div>
      {helperText && <HelperText isError={isError} text={helperText} />}
    </div>
  );
});

export default Input;
