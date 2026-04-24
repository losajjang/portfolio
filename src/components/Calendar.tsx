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

// 특정 년도와 월에 해당하는 일 수를 계산하는 함수. dayjs 라이브러리를 사용하여 해당 월의 일 수를 반환
const calculateDaysInMonth = (year: number, month: number) => {
  return dayjs().year(year).month(month).daysInMonth();
};

const isBeforeDate = (
  date1: Date | Dayjs,
  date2: Date | Dayjs,
  precision: "day" | "month" | "year" = "day",
) => {
  return dayjs(date1).isBefore(dayjs(date2), precision);
};

const isAfterDate = (
  date1: Date | Dayjs,
  date2: Date | Dayjs,
  precision: "day" | "month" | "year" = "day",
) => {
  return dayjs(date1).isAfter(dayjs(date2), precision);
};

const Calendar = ({ selectedDateListener }: CalendarProps) => {
  const { weekCalendarList, currentDate, setCurrentDate } = useCalendar();

  const [minYear, setMinYear] = useState(dayjs().year().toString()); // 최소 이동 제한 년도 상태
  const [maxYear, setMaxYear] = useState(dayjs().year().toString()); // 최대 이동 제한 년도 상태
  const [minMonth, setMinMonth] = useState("1"); // 최소 이동 제한 월 상태
  const [maxMonth, setMaxMonth] = useState("12"); // 최대 이동 제한 월 상태
  const [minDay, setMinDay] = useState("1"); // 최소 이동 제한 일 상태
  const [maxDay, setMaxDay] = useState(
    calculateDaysInMonth(dayjs().year(), dayjs().month()).toString(),
  ); // 최대 이동 제한 일 상태

  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

  const commonDayStyle = clsx("p-2 text-center", "rounded-full");

  // 최소 이동 제한 년도가 변경될 때, 최대 이동 제한 년도와 비교하여 유효성 검사 후 상태 업데이트
  const handleMinYearChange = (nextMinYear: string) => {
    setMinYear(nextMinYear);

    if (
      nextMinYear &&
      maxYear &&
      isAfterDate(
        dayjs().year(Number(nextMinYear)).month(Number(minMonth)),
        dayjs().year(Number(maxYear)).month(Number(maxMonth)),
        "month",
      )
    ) {
      // 최소 이동 제한 년도가 최대 이동 제한 년도와 같고, 최소 이동 제한 월이 최대 이동 제한 월보다 큰 경우, 최소 이동 제한 월을 최대 이동 제한 월로 자동 조정
      setMinMonth(maxMonth);
    }

    if (
      isAfterDate(
        dayjs()
          .year(Number(nextMinYear))
          .month(Number(minMonth) - 1)
          .date(Number(minDay)),
        dayjs()
          .year(Number(maxYear))
          .month(Number(maxMonth) - 1)
          .date(Number(maxDay)),
        "day",
      )
    ) {
      // 최소 이동 제한 년도가 현재 년도와 같고, 최소 이동 제한 월이 현재 월과 같으며, 최소 이동 제한 일이 현재 일보다 큰 경우, 최소 이동 제한 일을 현재 일로 자동 조정
      setMinDay(maxDay);
    }
  };

  // 최대 이동 제한 년도가 변경될 때, 최소 이동 제한 년도와 비교하여 유효성 검사 후 상태 업데이트
  const handleMaxYearChange = (nextMaxYear: string) => {
    setMaxYear(nextMaxYear);

    if (
      nextMaxYear &&
      minYear &&
      isBeforeDate(
        dayjs().year(Number(nextMaxYear)).month(Number(maxMonth)),
        dayjs().year(Number(minYear)).month(Number(minMonth)),
        "month",
      )
    ) {
      // 최대 이동 제한 년도가 최소 이동 제한 년도와 같고, 최소 이동 제한 월이 최대 이동 제한 월보다 큰 경우, 최대 이동 제한 월을 최소 이동 제한 월로 자동 조정
      setMaxMonth(minMonth);
    }

    if (
      isBeforeDate(
        dayjs()
          .year(Number(nextMaxYear))
          .month(Number(maxMonth) - 1)
          .date(Number(maxDay)),
        dayjs()
          .year(Number(minYear))
          .month(Number(minMonth) - 1)
          .date(Number(minDay)),
        "day",
      )
    ) {
      // 최대 이동 제한 년도가 현재 년도와 같고, 최대 이동 제한 월이 현재 월과 같으며, 최대 이동 제한 일이 현재 일보다 큰 경우, 최대 이동 제한 일을 현재 일로 자동 조정
      setMaxDay(minDay);
    }
  };

  // 최소 이동 제한 월이 변경될 때, 최대 이동 제한 월과 비교하여 유효성 검사 후 상태 업데이트
  const handleMinMonthChange = (nextMinMonth: string) => {
    setMinMonth(nextMinMonth);

    const daysInMonth = calculateDaysInMonth(
      minYear ? Number(minYear) : dayjs().year(),
      nextMinMonth ? Number(nextMinMonth) - 1 : dayjs().month(),
    );
    if (Number(minDay) > Number(daysInMonth)) {
      // 선택된 최소 이동 제한 일이 해당 월의 일 수보다 큰 경우, 최소 이동 제한 일을 해당 월의 마지막 날로 자동 조정
      handleMinDayChange(daysInMonth.toString());
    }

    if (
      isAfterDate(
        dayjs()
          .year(Number(minYear))
          .month(Number(nextMinMonth) - 1)
          .date(Number(minDay)),
        dayjs()
          .year(Number(maxYear))
          .month(Number(maxMonth) - 1)
          .date(Number(maxDay)),
        "day",
      )
    ) {
      // 최소 이동 제한 년도가 현재 년도와 같고, 최소 이동 제한 월이 현재 월과 같으며, 최소 이동 제한 일이 현재 일보다 큰 경우, 최소 이동 제한 일을 현재 일로 자동 조정
      setMinDay(maxDay);
    }
  };

  // 최대 이동 제한 월이 변경될 때, 최소 이동 제한 월과 비교하여 유효성 검사 후 상태 업데이트
  const handleMaxMonthChange = (nextMaxMonth: string) => {
    setMaxMonth(nextMaxMonth);

    const daysInMonth = calculateDaysInMonth(
      maxYear ? Number(maxYear) : dayjs().year(),
      nextMaxMonth ? Number(nextMaxMonth) - 1 : dayjs().month(),
    );
    if (Number(maxDay) > Number(daysInMonth)) {
      // 선택된 최대 이동 제한 일이 해당 월의 일 수보다 큰 경우, 최대 이동 제한 일을 해당 월의 마지막 날로 자동 조정
      handleMaxDayChange(daysInMonth.toString());
    }

    if (
      isBeforeDate(
        dayjs()
          .year(Number(maxYear))
          .month(Number(nextMaxMonth) - 1)
          .date(Number(maxDay)),
        dayjs()
          .year(Number(minYear))
          .month(Number(minMonth) - 1)
          .date(Number(minDay)),
        "day",
      )
    ) {
      // 최대 이동 제한 년도가 현재 년도와 같고, 최대 이동 제한 월이 현재 월과 같으며, 최대 이동 제한 일이 현재 일보다 큰 경우, 최대 이동 제한 일을 현재 일로 자동 조정
      setMaxDay(minDay);
    }
  };

  // 최소 이동 제한 일이 변경될 때, 최대 이동 제한 일과 비교하여 유효성 검사 후 상태 업데이트
  const handleMinDayChange = (nextMinDay: string) => {
    setMinDay(nextMinDay);
  };

  const handleMaxDayChange = (nextMaxDay: string) => {
    setMaxDay(nextMaxDay);
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
          <span
            className={clsx("typo-body4_normal sm:typo-body3_normal shrink-0")}
          >
            최소이동제한:{" "}
          </span>
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
                  ), // 최대 이동 제한보다 이후 월은 선택 불가능
              };
            })}
          />
          <Dropdown
            width="w-22"
            value={minDay}
            onChange={handleMinDayChange}
            placeholder="최소 이동 제한 일"
            options={Array.from({
              length: calculateDaysInMonth(
                minYear ? Number(minYear) : dayjs().year(),
                minMonth ? Number(minMonth) - 1 : dayjs().month(),
              ),
            }).map((_, index) => {
              const day = index + 1;
              return {
                label: `${day}일`,
                value: day.toString(),
                disabled: dayjs()
                  .year(Number(maxYear))
                  .month(Number(maxMonth) - 1)
                  .date(Number(maxDay))
                  .isBefore(
                    dayjs()
                      .year(Number(minYear))
                      .month(Number(minMonth) - 1)
                      .date(day),
                    "day",
                  ), // 최대 이동 제한 일보다 이후 날짜는 선택 불가능
              };
            })}
          />
        </div>
        <div className={clsx("flex items-center gap-1 w-full")}>
          <span
            className={clsx("typo-body4_normal sm:typo-body3_normal shrink-0")}
          >
            최대이동제한:{" "}
          </span>
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
                  ), // 최소 이동 제한보다 이전 월은 선택 불가능
              };
            })}
          />
          <Dropdown
            width="w-22"
            value={maxDay}
            onChange={handleMaxDayChange}
            placeholder="최대 이동 제한 일"
            options={Array.from({
              length: calculateDaysInMonth(
                maxYear ? Number(maxYear) : dayjs().year(),
                maxMonth ? Number(maxMonth) - 1 : dayjs().month(),
              ),
            }).map((_, index) => {
              const day = index + 1;
              return {
                label: `${day}일`,
                value: day.toString(),
                disabled: dayjs()
                  .year(Number(minYear))
                  .month(Number(minMonth) - 1)
                  .date(Number(minDay))
                  .isAfter(
                    dayjs()
                      .year(Number(maxYear))
                      .month(Number(maxMonth) - 1)
                      .date(day),
                    "day",
                  ), // 최소 이동 제한 일보다 이전 날짜는 선택 불가능
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
                const isSameMonth = dayjs(date).isSame(
                  dayjs(currentDate),
                  "month",
                );
                // 최소 이동 제한 날짜보다 이전이거나 최대 이동 제한 날짜보다 이후인 경우 선택 제한
                const restrictSelection =
                  (minYear &&
                    minMonth &&
                    minDay &&
                    isBeforeDate(
                      dayjs(date),
                      dayjs()
                        .year(Number(minYear))
                        .month(Number(minMonth) - 1)
                        .date(Number(minDay)),
                    )) ||
                  (maxYear &&
                    maxMonth &&
                    maxDay &&
                    isAfterDate(
                      dayjs(date),
                      dayjs()
                        .year(Number(maxYear))
                        .month(Number(maxMonth) - 1)
                        .date(Number(maxDay)),
                    ));

                return (
                  <td
                    key={idx}
                    className={clsx(
                      commonDayStyle,
                      "group",
                      "relative isolate",
                      "h-10 sm:h-16",
                      restrictSelection
                        ? "cursor-not-allowed"
                        : "cursor-pointer",
                      isToday
                        ? "typo-body4_strong sm:typo-body3_strong"
                        : "typo-body4_normal sm:typo-body3_normal", // 오늘 날짜 강조
                      restrictSelection && "text-gray-gray_40", // 선택 제한된 날짜는 회색으로 표시
                      idx === 0 &&
                        isCurrentMonth &&
                        !restrictSelection &&
                        !selectedDay &&
                        "text-status-error_50", // 일요일 색상
                      idx === 6 &&
                        isCurrentMonth &&
                        !restrictSelection &&
                        !selectedDay &&
                        "text-primary-primary_50", // 토요일 색상
                      selectedDay &&
                        isSameMonth &&
                        !restrictSelection &&
                        "text-gray-gray_0", // 이번달 선택된 날짜는 글자색을 흰색으로 변경
                      !selectedDay &&
                        isSameMonth &&
                        !restrictSelection &&
                        "text-gray-gray_90", // 이번달 선택되지 않은 날짜는 글자색을 회색으로 변경
                      !isSameMonth && "text-gray-gray_40", // 이번 달이 아닌 날짜는 회색으로 표시
                    )}
                    onClick={() => {
                      if (restrictSelection) return; // 선택 제한된 날짜는 클릭해도 동작하지 않음
                      selectDate(date);
                    }} // 날짜 클릭 시 해당 날짜로 이동
                  >
                    <span className="relative z-10">{dayjs(date).date()}</span>
                    {/* 날짜 배경 */}
                    <div
                      className={clsx(
                        "absolute z-0 ",
                        "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                        "w-8 h-8 sm:w-10 sm:h-10",
                        "rounded-full",
                        selectedDay && !restrictSelection
                          ? "bg-primary-primary_50"
                          : !restrictSelection && "group-hover:bg-gray-gray_20", // 선택된 날짜는 primary 색상
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
