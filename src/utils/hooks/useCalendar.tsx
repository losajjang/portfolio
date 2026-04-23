"use client";
import dayjs from "dayjs";
import { useState } from "react";

const CALENDAR_LENGTH = 42; // 42칸으로 유지 (6주)
const DAY_OF_WEEK = 7;

const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const totalMonthDays = dayjs(currentDate).daysInMonth(); // 이번 달의 총 일 수 (28, 30, 31)

  // 이번 달 1일의 요일에 따라 앞쪽 빈 칸(0) 생성
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay(); // 이번 달 1일의 요일 (0: 일 ~ 6: 토)

  const prevMonthDate = dayjs(currentDate).subtract(1, "month");
  const prevMonthLastDate = prevMonthDate.daysInMonth(); // 이전 달의 총 일 수
  //이전 달의 날짜 리스트
  const prevDayList = Array.from({ length: firstDayOfMonth }).map((_, i) =>
    prevMonthDate.date(prevMonthLastDate - (firstDayOfMonth - 1) + i).toDate()
  );
  // 이번 달의 날짜 배열
  const currentDayList = Array.from({ length: totalMonthDays }).map((_, i) =>
    dayjs(currentDate)
      .date(i + 1)
      .toDate()
  );

  // 다음달의 날짜 리스트. 다음 달의 빈 공간을 42칸 기준으로 계산하여 설정
  const nextMonthDate = dayjs(currentDate).add(1, "month");
  const nextDayLength = Math.max(
    0,
    CALENDAR_LENGTH - (prevDayList.length + currentDayList.length)
  );

  const nextDayList = Array.from({ length: nextDayLength }).map((_, i) =>
    nextMonthDate.date(i + 1).toDate()
  );

  // 최종 달력 배열 (이전 빈 칸 + 현재 달 날짜 + 다음 빈 칸)
  const currentCalendarList = prevDayList.concat(currentDayList, nextDayList);

  // 7일씩 나누어 `weekCalendarList` 생성
  const weekCalendarList = currentCalendarList.reduce(
    (acc: Date[][], cur, idx) => {
      const chunkIndex = Math.floor(idx / DAY_OF_WEEK);
      if (!acc[chunkIndex]) {
        acc[chunkIndex] = [];
      }
      acc[chunkIndex].push(cur);
      return acc;
    },
    []
  );

  return {
    weekCalendarList: weekCalendarList,
    currentDate: currentDate,
    setCurrentDate: setCurrentDate,
  };
};

export default useCalendar;
