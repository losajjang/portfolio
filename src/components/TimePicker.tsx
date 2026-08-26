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

type AmPm = "오전" | "오후";

type SelectedHourMinute = {
  amPm: AmPm;
  hour: number;
  minute: number;
};

// 시간 초기값 생성
const getInitialTime = (dateValue: string): SelectedHourMinute => {
  const parsedDate = dayjs(dateValue);
  const initialDate = parsedDate.isValid() ? parsedDate : dayjs();
  const hour24 = initialDate.hour();

  return {
    amPm: hour24 < 12 ? "오전" : "오후",
    hour: hour24 % 12 || 12,
    minute: initialDate.minute(),
  };
};

const TimePicker = ({
  dateValue,
  setTime,
  minuteListStyle = "all",
  useRolling = false,
}: HoursMinutesSelectProps) => {
  const [selectedHourMinute, setSelectedHourMinute] =
    useState<SelectedHourMinute>(() => getInitialTime(dateValue));

  const amPm: { en: string; ko: AmPm }[] = [
    { en: "AM", ko: "오전" },
    { en: "PM", ko: "오후" },
  ];
  const hours = Array.from({ length: 12 }, (_, i) => i + 1); // 12시간 생성
  // 분 생성. all: 1분단위, half: 30분단위, ten: 10분단위
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

  const extendedHours = [...hours, ...hours, ...hours]; // 무한 롤링용 시간 배열
  const extendedMinutes = [...minutes, ...minutes, ...minutes]; // 무한 롤링용 분 배열

  const mappingMinutes = () => {
    if (useRolling && minuteListStyle !== "half") {
      return extendedMinutes;
    } else {
      return minutes;
    }
  };

  // 24시간제로 변경
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

  // 같은 목록을 세 번 이어 붙인 뒤 끝에 닿으면 같은 값이 있는 구간으로 옮겨 무한 스크롤처럼 보이게 한다.
  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    if (useRolling) {
      const { scrollTop, scrollHeight } = event.currentTarget;

      if (scrollTop === 0) {
        // 맨 위에서는 가운데 목록으로 옮겨 위쪽으로 계속 스크롤할 여유를 만든다.
        event.currentTarget.scrollTop = scrollHeight / 3;
      } else if (scrollTop > (scrollHeight / 3) * 2) {
        // 마지막 목록을 지나면 첫 목록으로 돌아가 롤링을 이어간다.
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
    // 롤링 목록에는 같은 시간이 여러 번 있으므로 값과 렌더링 순번으로 정확한 항목을 찾는다.
    const element = document.querySelector(
      `.TimeElement.${type}-${currentSelect}-${number}`,
    );

    if (element) {
      // 선택한 항목이 시간 또는 분 목록의 가운데에 오도록 스크롤한다.
      element.scrollIntoView({
        behavior: animation as ScrollBehavior,
        block: "center",
      });
    }
  };

  useEffect(() => {
    // 기존 날짜에 사용자가 선택한 시각을 반영하고 초는 0으로 맞춰 부모 컴포넌트에 전달한다.
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

    // 세 묶음 중 가운데 묶음에 있는 선택값의 위치를 계산한다.
    const hIndex = extendedHours.length / 3 + hour - 1;
    const mIndex = extendedMinutes.length / 3 + minute;

    // 처음 위치를 잡을 때 목록이 움직이는 모습이 보이지 않도록 애니메이션 없이 이동한다.
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
                  setSelectedHourMinute((currentTime) => ({
                    ...currentTime,
                    amPm: a.ko,
                  }))
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
