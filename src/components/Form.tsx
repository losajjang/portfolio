"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { ComponentType, useState } from "react";
import { FieldPath, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "./Button";
import ProgressBar from "./ProgressBar";
import Step01 from "./Step01";
import Step02 from "./Step02";
import Step03 from "./Step03";
import { MultiStepFormValues, StepFormProps } from "@/utils/types";

const formSchema: yup.ObjectSchema<MultiStepFormValues> = yup.object({
  name: yup
    .string()
    .trim()
    .required("이름을 입력해주세요.")
    .max(30, "이름은 30자 이하로 입력해주세요."),
  gender: yup
    .string()
    .oneOf(["male", "female"], "성별을 선택해주세요.")
    .required("성별을 선택해주세요."),
  age: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" || Number.isNaN(value) ? undefined : value,
    )
    .typeError("나이는 숫자로 입력해주세요.")
    .required("나이를 입력해주세요.")
    .integer("나이는 정수로 입력해주세요.")
    .min(1, "나이는 1세 이상으로 입력해주세요.")
    .max(120, "나이는 120세 이하로 입력해주세요."),
  developmentPart: yup
    .string()
    .oneOf(["frontend", "backend"], "개발 파트를 선택해주세요.")
    .required("개발 파트를 선택해주세요."),
});

type StepConfig = {
  Component: ComponentType<StepFormProps>;
  fields: FieldPath<MultiStepFormValues>[];
};

const STEP_COMPONENTS: StepConfig[] = [
  { Component: Step01, fields: ["name", "gender"] },
  { Component: Step02, fields: ["age"] },
  { Component: Step03, fields: ["developmentPart"] },
];

const Form = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = STEP_COMPONENTS.length;
  const isFirstStep = currentStep === 1;
  const isFinalStep = currentStep === totalSteps;
  const currentStepConfig = STEP_COMPONENTS[currentStep - 1];
  const ActiveStep = currentStepConfig.Component;

  const {
    control,
    formState: { errors },
    clearErrors,
    handleSubmit,
    trigger,
  } = useForm<MultiStepFormValues>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      name: "",
      gender: "",
      age: undefined,
      developmentPart: "",
    },
    shouldUnregister: false,
  });

  const moveToNextStep = async () => {
    const isCurrentStepValid = await trigger(currentStepConfig.fields, {
      shouldFocus: true,
    });

    if (!isCurrentStepValid) return;

    setCurrentStep((step) => Math.min(step + 1, totalSteps));
  };

  const moveToPreviousStep = () => {
    setCurrentStep((step) => Math.max(step - 1, 1));
  };

  const submitForm: SubmitHandler<MultiStepFormValues> = (values) => {
    const genderLabel = values.gender === "male" ? "남" : "여";
    const developmentPartLabel =
      values.developmentPart === "frontend" ? "프론트엔드" : "백엔드";

    alert(
      [
        "입력한 내용",
        `이름: ${values.name}`,
        `성별: ${genderLabel}`,
        `나이: ${values.age}세`,
        `개발 파트: ${developmentPartLabel}`,
      ].join("\n"),
    );
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(submitForm)}
      className="mx-auto flex w-full max-w-xl flex-col gap-8"
    >
      <div className="w-full px-20">
        <ProgressBar
          steps={totalSteps}
          currentStep={currentStep}
          completeProps={false}
          type="number"
        />
      </div>
      <div
        key={currentStep}
        className="rounded-3xl border border-gray-gray_20 bg-gray-gray_0 p-5 sm:p-6"
      >
        <ActiveStep
          control={control}
          errors={errors}
          clearErrors={clearErrors}
        />
      </div>
      <div className={clsx("flex items-center justify-between gap-3")}>
        <Button
          type="button"
          buttonName="이전"
          buttonStyle="secondary"
          disabled={isFirstStep}
          onClick={moveToPreviousStep}
        />
        {isFinalStep ? (
          <Button
            key="submit"
            type="submit"
            buttonName="제출"
            buttonStyle="primary"
          />
        ) : (
          <Button
            key="next"
            type="button"
            buttonName="다음"
            buttonStyle="primary"
            onClick={moveToNextStep}
          />
        )}
      </div>
    </form>
  );
};

export default Form;
