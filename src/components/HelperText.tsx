import clsx from "clsx";

type HelperText = {
  isError: boolean;
  text: string;
};

const HelperText = ({ isError, text }: HelperText) => {
  return (
    <p
      className={clsx(
        "mt-2 px-1 typo-detail1_normal",
        isError ? "text-status-error_50" : "text-gray-gray_60",
      )}
    >
      {text}
    </p>
  );
};

export default HelperText;
