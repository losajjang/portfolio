"use client";

import { Controller } from "react-hook-form";
import Dropdown from "./Dropdown";
import Input from "./Input";
import type { StepFormProps } from "../utils/types/Form.types";

const GENDER_OPTIONS = [
  { label: "남", value: "male" },
  { label: "여", value: "female" },
];

const Step01 = ({ control, errors, clearErrors }: StepFormProps) => {
  return (
    <fieldset className="flex flex-col gap-5">
      <legend className="mb-5 typo-title2 text-gray-gray_90">기본 정보</legend>
      <label className="flex flex-col gap-2">
        <span className="typo-body4_strong text-gray-gray_80">이름</span>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              value={field.value}
              placeholder="이름을 입력해주세요"
              autoComplete="off"
              isError={Boolean(errors.name)}
              helperText={errors.name?.message}
              onChange={(event) => {
                clearErrors("name");
                field.onChange(event);
              }}
            />
          )}
        />
      </label>
      <div className="flex flex-col gap-2">
        <span className="typo-body4_strong text-gray-gray_80">성별</span>
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <Dropdown
              ref={field.ref}
              value={field.value}
              options={GENDER_OPTIONS}
              placeholder="성별을 선택해주세요"
              isError={Boolean(errors.gender)}
              helperText={errors.gender?.message}
              onChange={(value) => {
                clearErrors("gender");
                field.onChange(value);
              }}
            />
          )}
        />
      </div>
    </fieldset>
  );
};

export default Step01;
