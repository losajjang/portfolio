"use client";
import useCalendar from "@/utils/hooks/useCalendar";
import clsx from "clsx";
import dayjs, { Dayjs } from "dayjs";
import Button from "./Button";
import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";

type CalendarProps = {
  // 부모에게 선택된 날짜를 전달하기 위한 콜백 함수. 날짜가 선택될 때마다 호출되어 부모 컴포넌트로 선택된 날짜를 전달
  selectedDateListener?: (date: Date | Dayjs | undefined) => void;
};

const Calendar = ({ selectedDateListener }: CalendarProps) => {
  const { weekCalendarList, currentDate, setCurrentDate } = useCalendar();

  const [minYear, setMinYear] = useState(dayjs().year().toString()); // 최소 이동 제한 년도 상태
  const [maxYear, setMaxYear] = useState(dayjs().year().toString()); // 최대 이동 제한 년도 상태
  const [minMonth, setMinMonth] = useState("1"); // 최소 이동 제한 월 상태
  const [maxMonth, setMaxMonth] = useState("12"); // 최대 이동 제한 월 상태

  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

  const commonDayStyle = clsx("p-2 text-center", "rounded-full");

  // 최소/최대 이동 제한이 같은 년도로 설정된 경우, 월 이동 제한 로직에서 년도 비교를 최적화하기 위한 변수
  const isSameBoundaryYear =
    minYear && maxYear && Number(minYear) === Number(maxYear);

  // 최소 이동 제한 년도가 변경될 때, 최대 이동 제한 년도와 비교하여 유효성 검사 후 상태 업데이트
  const handleMinYearChange = (nextMinYear: string) => {
    setMinYear(nextMinYear);

    if (
      nextMinYear &&
      maxYear &&
      Number(nextMinYear) === Number(maxYear) &&
      Number(minMonth) > Number(maxMonth)
    ) {
      setMinMonth(maxMonth);
    }
  };

  // 최대 이동 제한 년도가 변경될 때, 최소 이동 제한 년도와 비교하여 유효성 검사 후 상태 업데이트
  const handleMaxYearChange = (nextMaxYear: string) => {
    setMaxYear(nextMaxYear);

    if (
      minYear &&
      nextMaxYear &&
      Number(minYear) === Number(nextMaxYear) &&
      Number(minMonth) > Number(maxMonth)
    ) {
      setMaxMonth(minMonth);
    }
  };

  // 최소 이동 제한 월이 변경될 때, 최대 이동 제한 월과 비교하여 유효성 검사 후 상태 업데이트
  const handleMinMonthChange = (nextMinMonth: string) => {
    if (
      isSameBoundaryYear &&
      nextMinMonth &&
      maxMonth &&
      Number(nextMinMonth) > Number(maxMonth)
    ) {
      setMinMonth(maxMonth);
      return;
    }

    setMinMonth(nextMinMonth);
  };

  // 최대 이동 제한 월이 변경될 때, 최소 이동 제한 월과 비교하여 유효성 검사 후 상태 업데이트
  const handleMaxMonthChange = (nextMaxMonth: string) => {
    setMaxMonth(nextMaxMonth);

    if (
      isSameBoundaryYear &&
      minMonth &&
      nextMaxMonth &&
      Number(minMonth) > Number(nextMaxMonth)
    ) {
      setMinMonth(nextMaxMonth);
    }
  };

  // 이전 달로 이동
  const prevMonth = () => {
    if (minYear && minMonth) {
      const minDate = dayjs()
        .year(parseInt(minYear))
        .month(parseInt(minMonth) - 1)
        .startOf("month");
      if (dayjs(currentDate).subtract(1, "month").isBefore(minDate, "month")) {
        return; // 최소 이동 제한을 벗어나면 이동하지 않음
      }
    }
    setCurrentDate(dayjs(currentDate).subtract(1, "month").toDate());
  };

  // 다음 달로 이동
  const nextMonth = () => {
    if (maxYear && maxMonth) {
      const maxDate = dayjs()
        .year(parseInt(maxYear))
        .month(parseInt(maxMonth) - 1)
        .endOf("month");
      if (dayjs(currentDate).add(1, "month").isAfter(maxDate, "month")) {
        return; // 최대 이동 제한을 벗어나면 이동하지 않음
      }
    }
    setCurrentDate(dayjs(currentDate).add(1, "month").toDate());
  };

  // 오늘 날짜로 이동
  const selectToday = () => {
    setCurrentDate(dayjs().toDate());
  };

  // 특정 날짜 선택
  const selectDate = (date: Date | Dayjs) => {
    setCurrentDate(dayjs(date).toDate());
  };

  // 선택된 날짜가 변경될 때마다 부모 컴포넌트로 전달
  useEffect(() => {
    if (selectedDateListener) {
      selectedDateListener(dayjs(currentDate).toDate());
    }
    return () => {
      if (selectedDateListener) {
        selectedDateListener(undefined);
      }
    };
  }, [currentDate, selectedDateListener]);

  return (
    <div
      className={clsx("flex flex-col items-center justify-center p-2 sm:p-6")}
    >
      <div
        className={clsx(
          "flex flex-col gap-2 w-full bg-gray-gray_20 p-4 rounded-2xl mb-4",
        )}
      >
        <div className={clsx("flex items-center gap-1 w-full")}>
          <span className={clsx("typo-body3_normal")}>최소 이동 제한: </span>
          <Dropdown
            width="w-30"
            value={minYear}
            onChange={handleMinYearChange}
            placeholder="최소 이동 제한 년도"
            options={[{ label: "없음", value: "" }].concat(
              Array.from({ length: 10 }).map((_, index) => {
                const year = dayjs().subtract(index, "year").year();
                return {
                  label: `${year}년`,
                  value: year.toString(),
                };
              }),
            )}
          />
          <Dropdown
            width="w-22"
            value={minMonth}
            onChange={handleMinMonthChange}
            placeholder="최소 이동 제한 월"
            options={Array.from({ length: 12 }).map((_, index) => {
              const month = index + 1;
              return {
                label: `${month}월`,
                value: month.toString(),
                disabled: dayjs()
                  .year(Number(maxYear))
                  .month(Number(maxMonth) - 1)
                  .isBefore(
                    dayjs()
                      .year(Number(minYear))
                      .month(month - 1),
                  ), // 최대 이동 제한보다 이전 월은 선택 불가능
              };
            })}
          />
        </div>
        <div className={clsx("flex items-center gap-1 w-full")}>
          <span className={clsx("typo-body3_normal")}>최대 이동 제한: </span>
          <Dropdown
            width="w-30"
            value={maxYear}
            onChange={handleMaxYearChange}
            placeholder="최대 이동 제한 년도"
            options={[{ label: "없음", value: "" }].concat(
              Array.from({ length: 10 }).map((_, index) => {
                const year = dayjs().add(index, "year").year();
                return {
                  label: `${year}년`,
                  value: year.toString(),
                };
              }),
            )}
          />
          <Dropdown
            width="w-22"
            value={maxMonth}
            onChange={handleMaxMonthChange}
            placeholder="최대 이동 제한 월"
            options={Array.from({ length: 12 }).map((_, index) => {
              const month = index + 1;
              return {
                label: `${month}월`,
                value: month.toString(),
                disabled: dayjs()
                  .year(Number(minYear))
                  .month(Number(minMonth) - 1)
                  .isAfter(
                    dayjs()
                      .year(Number(maxYear))
                      .month(month - 1),
                    "month",
                  ), // 최소 이동 제한보다 이후 월은 선택 불가능
              };
            })}
          />
        </div>
      </div>
      <div className={clsx("flex items-center justify-between w-full mb-4")}>
        <h2 className={clsx("w-full", "typo-title2 text-gray-gray_90")}>
          {dayjs(currentDate).year()}년 {dayjs(currentDate).month() + 1}월
        </h2>
        <div className={clsx("flex items-center justify-center shrink-0")}>
          <Button buttonName="❮" buttonStyle="secondary" onClick={prevMonth} />
          <Button
            buttonName="오늘"
            buttonStyle="secondary"
            onClick={selectToday}
          />
          <Button buttonName="❯" buttonStyle="secondary" onClick={nextMonth} />
        </div>
      </div>
      <table className={clsx("w-full")}>
        <thead>
          <tr>
            {dayNames.map((dayName, index) => (
              <th
                key={index}
                className={clsx(
                  commonDayStyle,
                  "typo-body3_strong sm:typo-body2_strong",
                  index === 0
                    ? "text-status-error_50"
                    : index === 6
                      ? "text-primary-primary_50"
                      : "text-gray-gray_90",
                )}
              >
                {dayName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weekCalendarList.map((week, index) => (
            <tr key={index}>
              {week.map((date, idx) => {
                const isCurrentMonth =
                  dayjs(date).month() === dayjs(currentDate).month();
                const isToday = dayjs(date).isSame(new Date(), "day");
                const selectedDay = dayjs(date).isSame(currentDate, "day");
                const isSameMonth =
                  dayjs(date).month() === dayjs(currentDate).month();
                return (
                  <td
                    key={idx}
                    className={clsx(
                      commonDayStyle,
                      "group",
                      "relative isolate",
                      "h-10 sm:h-16 cursor-pointer",
                      isToday
                        ? "typo-body4_strong sm:typo-body3_strong"
                        : "typo-body4_normal sm:typo-body3_normal", // 오늘 날짜 강조
                      idx === 0 &&
                        isCurrentMonth &&
                        !selectedDay &&
                        "text-status-error_50", // 일요일 색상
                      idx === 6 &&
                        isCurrentMonth &&
                        !selectedDay &&
                        "text-primary-primary_50", // 토요일 색상
                      selectedDay && isSameMonth && "text-gray-gray_0", // 이번달 선택된 날짜는 글자색을 흰색으로 변경
                      !selectedDay && isSameMonth && "text-gray-gray_90", // 이번달 선택되지 않은 날짜는 글자색을 회색으로 변경
                      !isSameMonth && "text-gray-gray_40", // 이번 달이 아닌 날짜는 회색으로 표시
                    )}
                    onClick={() => selectDate(date)} // 날짜 클릭 시 해당 날짜로 이동
                  >
                    <span className="relative z-10">{dayjs(date).date()}</span>
                    {/* 날짜 배경 */}
                    <div
                      className={clsx(
                        "absolute z-0 ",
                        "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                        "w-8 h-8 sm:w-10 sm:h-10",
                        "rounded-full",
                        selectedDay
                          ? "bg-primary-primary_50"
                          : "group-hover:bg-gray-gray_20", // 선택된 날짜는 primary 색상
                        "flex items-center justify-center",
                        "transition-colors duration-200",
                      )}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
