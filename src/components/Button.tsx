import clsx from "clsx";
import { ReactNode } from "react";

type ButtonProps = {
  buttonName?: string;
  buttonSize?: "small" | "medium" | "large";
  buttonStyle?: "primary" | "secondary";
  onClick?: () => void;
};

const Button = ({
  buttonName = "버튼",
  buttonSize = "medium",
  buttonStyle = "primary",
  onClick = () => {},
}: ButtonProps) => {
  const buttonSizeClass = clsx({
    "py-1 px-2 typo-detail1_normal": buttonSize === "small",
    "py-2 px-4 typo-body4_normal": buttonSize === "medium",
    "py-3 px-6 typo-body3_normal": buttonSize === "large",
  });

  const buttonStyleClass = clsx({
    "bg-button-primary text-gray-gray_0 hover:bg-button-primary_hover cursor-pointer active:bg-button-primary_clicked":
      buttonStyle === "primary",
    "bg-button-secondary text-gray-gray_80 hover:bg-button-secondary_hover cursor-pointer active:bg-button-secondary_clicked":
      buttonStyle === "secondary",
  });

  return (
    <button
      onClick={onClick}
      className={clsx(buttonSizeClass, buttonStyleClass, "rounded-md")}
    >
      {buttonName}
    </button>
  );
};

export default Button;
