"use client";
import { UIEvent, useEffect, useState } from "react";
import clsx from "clsx";
import dayjs from "dayjs";
import { VDivider } from "./Divider";

export type MinuteListStyle = "all" | "half" | "ten"; // all: 0 ~ 59, half: 0, 30 ten: 0, 10, 20, ..., 50

type HoursMinutesSelectProps = {
  dateValue: string;
  setTime: (time: string) => void;
  minuteListStyle?: MinuteListStyle;
  useRolling?: boolean;
};

const TimePicker = ({
  dateValue,
  setTime,
  minuteListStyle = "all",
  useRolling = false,
}: HoursMinutesSelectProps) => {
  const [selectedHourMinute, setSelectedHourMinute] = useState<{
    amPm: string;
    hour: number;
    minute: number;
  }>({
    amPm: "",
    hour: dayjs(dateValue).get("hour"),
    minute: dayjs(dateValue).get("minute"),
  });

  const amPm = [
    { en: "AM", ko: "오전" },
    { en: "PM", ko: "오후" },
  ];
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  let minutes: number[];
  switch (minuteListStyle) {
    case "all":
      minutes = Array.from({ length: 60 }, (_, i) => i);
      break;
    case "half":
      minutes = Array.from({ length: 60 / 30 }, (_, i) => i * 30);
      break;
    case "ten":
      minutes = Array.from({ length: 60 / 10 }, (_, i) => i * 10);
      break;
    default:
      minutes = Array.from({ length: 60 }, (_, i) => i);
      break;
  }

  const extendedHours = [...hours, ...hours, ...hours];
  const extendedMinutes = [...minutes, ...minutes, ...minutes];

  const mappingMinutes = () => {
    if (useRolling && minuteListStyle !== "half") {
      return extendedMinutes;
    } else {
      return minutes;
    }
  };

  const changeHourTo24 = (): number => {
    if (selectedHourMinute.amPm === "오후" && selectedHourMinute.hour === 12) {
      return 12;
    } else if (selectedHourMinute.amPm === "오후") {
      return selectedHourMinute.hour + 12;
    } else if (
      selectedHourMinute.amPm === "오전" &&
      selectedHourMinute.hour === 12
    ) {
      return 0;
    } else {
      return selectedHourMinute.hour;
    }
  };

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    if (useRolling) {
      const { scrollTop, scrollHeight } = event.currentTarget;
      if (scrollTop === 0) {
        event.currentTarget.scrollTop = scrollHeight / 3;
      } else if (scrollTop > (scrollHeight / 3) * 2) {
        event.currentTarget.scrollTop = 0;
      }
    }
  };

  const adjustScroll = (
    type: string,
    currentSelect: number,
    number: number,
    animation = "smooth",
  ) => {
    const element = document.querySelector(
      `.TimeElement.${type}-${currentSelect}-${number}`,
    );
    if (element) {
      element.scrollIntoView({
        behavior: animation as ScrollBehavior,
        block: "center",
      });
    }
  };

  useEffect(() => {
    if (dateValue) {
      setSelectedHourMinute({
        amPm: dayjs(dateValue).format("A"),
        hour:
          dayjs(dateValue).get("hour") === 0
            ? 12
            : dayjs(dateValue).get("hour") > 12
              ? dayjs(dateValue).get("hour") - 12
              : dayjs(dateValue).get("hour"),
        minute: dayjs(dateValue).get("minute"),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const selectTime = dayjs(dateValue)
      .set("hour", changeHourTo24())
      .set("minute", selectedHourMinute.minute)
      .set("second", 0)
      .format("YYYY-MM-DDTHH:mm:ss");
    setTime(selectTime);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedHourMinute]);

  useEffect(() => {
    const hour = selectedHourMinute.hour;
    const minute = selectedHourMinute.minute;
    const hIndex = extendedHours.length / 3 + hour - 1;
    const mIndex = extendedMinutes.length / 3 + minute;
    adjustScroll("Hour", hour, hIndex, "instant");
    adjustScroll("Minute", minute, mIndex, "instant");
  }, [
    extendedHours.length,
    extendedMinutes.length,
    selectedHourMinute.hour,
    selectedHourMinute.minute,
  ]);

  return (
    <div>
      <div>
        <div
          className={clsx(
            "h-50",
            "z-50 grid grid-cols-[1fr_1px_1fr_1px_1fr] gap-2 p-2",
            "rounded-3xl bg-gray-gray_0 border border-gray-gray_30 shadow-dropdownShadow rounded-4",
          )}
        >
          {/* AM / PM 선택 */}
          <div
            className={clsx(
              "h-full flex flex-col justify-center items-center",
              "[&::-webkit-scrollbar]:hidden",
            )}
          >
            {amPm.map((a) => (
              <span
                key={a.en}
                className={clsx(
                  "typo-body4_normal",
                  "flex justify-start items-center w-full h-8 rounded-4 px-2",
                  selectedHourMinute.amPm === a.ko
                    ? "bg-primary-primary_10 text-primary-primary_90"
                    : "hover:bg-gray-gray_10",
                )}
                onClick={() =>
                  setSelectedHourMinute({ ...selectedHourMinute, amPm: a.ko })
                }
              >
                {a.ko}
              </span>
            ))}
          </div>
          <VDivider />
          {/* 시간 선택 */}
          <div
            className={clsx(
              "HoursList",
              "h-full",
              "overflow-y-scroll scrollbar-none [&::-webkit-scrollbar]:hidden",
            )}
            onScroll={handleScroll}
          >
            {(useRolling ? extendedHours : hours).map((hour, i) => (
              <span
                key={i}
                className={clsx(
                  `TimeElement Hour-${hour}-${i}`,
                  "typo-body4_normal",
                  "flex justify-start items-center w-full h-8 rounded-4 px-2",
                  selectedHourMinute.hour === hour
                    ? "bg-primary-primary_10 text-primary-primary_90"
                    : "hover:bg-gray-gray_10",
                )}
                onClick={() => {
                  setSelectedHourMinute({ ...selectedHourMinute, hour });
                  adjustScroll("Hour", hour, i);
                }}
              >
                {String(hour).padStart(2, "0")}
              </span>
            ))}
          </div>
          <VDivider />
          {/* 분 선택 */}
          <div
            className={clsx(
              "MinutesList",
              "h-full",
              minuteListStyle === "half"
                ? "flex flex-col justify-center items-center"
                : "overflow-y-scroll scrollbar-none [&::-webkit-scrollbar]:hidden",
            )}
            onScroll={handleScroll}
          >
            {mappingMinutes().map((minute, i) => (
              <span
                key={i}
                className={clsx(
                  `TimeElement Minute-${minute}-${i}`,
                  "typo-body4_normal",
                  "flex justify-start items-center w-full h-8 rounded-4 px-2",
                  selectedHourMinute.minute === minute
                    ? "bg-primary-primary_10 text-primary-primary_90"
                    : "hover:bg-gray-gray_10",
                )}
                onClick={() => {
                  setSelectedHourMinute({ ...selectedHourMinute, minute });
                  adjustScroll("Minute", minute, i);
                }}
              >
                {String(minute).padStart(2, "0")}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimePicker;
