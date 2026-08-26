import clsx from "clsx";

type ButtonProps = {
  buttonName?: string;
  buttonSize?: "small" | "medium" | "large";
  buttonStyle?: "primary" | "secondary";
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

const Button = ({
  buttonName = "버튼",
  buttonSize = "medium",
  buttonStyle = "primary",
  onClick = () => {},
  disabled = false,
  type = "button",
}: ButtonProps) => {
  const buttonSizeClass = clsx({
    "py-1 px-2 typo-detail1_normal": buttonSize === "small",
    "py-2 px-4 typo-body4_normal": buttonSize === "medium",
    "py-3 px-6 typo-body3_normal": buttonSize === "large",
  });

  const buttonStyleClass = clsx({
    "bg-button-primary hover:bg-button-primary_hover cursor-pointer active:bg-button-primary_clicked":
      buttonStyle === "primary",
    "bg-button-secondary hover:bg-button-secondary_hover cursor-pointer active:bg-button-secondary_clicked":
      buttonStyle === "secondary",
  });

  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        buttonSizeClass,
        buttonStyleClass,
        "rounded-md",
        buttonStyle === "primary" && !disabled && "text-gray-gray_0",
        buttonStyle === "secondary" && !disabled && "text-gray-gray_80",
        buttonStyle === "primary" &&
          disabled &&
          "bg-gray-gray_60 text-gray-gray_30 hover:bg-gray-gray_60 active:bg-gray-gray_60",
        buttonStyle === "secondary" &&
          disabled &&
          "text-gray-gray_30 hover:bg-gray-gray_60 active:bg-gray-gray_60",
      )}
      disabled={disabled}
    >
      {buttonName}
    </button>
  );
};

export default Button;
