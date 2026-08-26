"use client";

import { Controller } from "react-hook-form";
import Input from "./Input";
import type { StepFormProps } from "../utils/types/Form.types";

const Step02 = ({ control, errors, clearErrors }: StepFormProps) => {
  return (
    <fieldset className="flex flex-col gap-5">
      <legend className="mb-5 typo-title2 text-gray-gray_90">나이 정보</legend>

      <label className="flex flex-col gap-2">
        <span className="typo-body4_strong text-gray-gray_80">나이</span>
        <Controller
          name="age"
          control={control}
          render={({ field }) => (
            <Input
              ref={field.ref}
              name={field.name}
              value={field.value ?? ""}
              type="number"
              inputMode="numeric"
              min={1}
              max={120}
              step={1}
              placeholder="나이를 입력해주세요"
              isError={Boolean(errors.age)}
              helperText={errors.age?.message}
              onBlur={field.onBlur}
              onKeyDown={(event) => {
                if (["e", "E", "+", "-", "."].includes(event.key)) {
                  event.preventDefault();
                }
              }}
              onChange={(event) => {
                if (!isNaN(Number(event.target.value))) {
                  clearErrors("age");
                  const value = event.target.value;
                  field.onChange(value === "" ? undefined : Number(value));
                }
                return;
              }}
            />
          )}
        />
      </label>
    </fieldset>
  );
};

export default Step02;
