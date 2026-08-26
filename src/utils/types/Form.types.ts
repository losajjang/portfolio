import type {
  Control,
  FieldErrors,
  UseFormClearErrors,
} from "react-hook-form";

export type MultiStepFormValues = {
  name: string;
  gender: string;
  age?: number;
  developmentPart: string;
};

export type StepFormProps = {
  control: Control<MultiStepFormValues>;
  errors: FieldErrors<MultiStepFormValues>;
  clearErrors: UseFormClearErrors<MultiStepFormValues>;
};
