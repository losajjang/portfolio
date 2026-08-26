import clsx from "clsx";
import React from "react";

type Props = {
  width?: string;
  margin?: string;
  bg?: string;
  height?: string;
  padding?: string;
  classNames?: string;
};

const HDivider = ({
  width = "w-full",
  margin,
  bg = "bg-gray-gray_30",
  height = "h-1",
  padding,
  classNames,
}: Props) => {
  return (
    <div
      className={clsx(
        `${width}`,
        `${margin}`,
        `${bg}`,
        `${height}`,
        `${padding}`,
        `${classNames}`
      )}
    />
  );
};

const VDivider = ({
  width = "w-1",
  margin,
  bg = "bg-gray-gray_30",
  height = "h-full",
  padding,
  classNames,
}: Props) => {
  return (
    <div>
      <div
        className={clsx(
          `${width}`,
          `${margin}`,
          `${bg}`,
          `${height}`,
          `${padding}`,
          `${classNames}`
        )}
      />
    </div>
  );
};

export { HDivider, VDivider };
