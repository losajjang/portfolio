"use client";

import { Controller } from "react-hook-form";
import Dropdown from "./Dropdown";
import type { StepFormProps } from "../utils/types/Form.types";

const DEVELOPMENT_PART_OPTIONS = [
  { label: "프론트엔드", value: "frontend" },
  { label: "백엔드", value: "backend" },
];

const Step03 = ({ control, errors, clearErrors }: StepFormProps) => {
  return (
    <fieldset className="flex flex-col gap-5">
      <legend className="mb-5 typo-title2 text-gray-gray_90">개발 정보</legend>

      <div className="flex flex-col gap-2">
        <span className="typo-body4_strong text-gray-gray_80">개발 파트</span>
        <Controller
          name="developmentPart"
          control={control}
          render={({ field }) => (
            <Dropdown
              ref={field.ref}
              value={field.value}
              options={DEVELOPMENT_PART_OPTIONS}
              placeholder="개발 파트를 선택해주세요"
              isError={Boolean(errors.developmentPart)}
              helperText={errors.developmentPart?.message}
              onChange={(value) => {
                clearErrors("developmentPart");
                field.onChange(value);
              }}
            />
          )}
        />
      </div>
    </fieldset>
  );
};

export default Step03;
