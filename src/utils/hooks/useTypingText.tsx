"use client";
import { useEffect, useMemo, useState } from "react";

type TypingSegment = {
  text: string;
  className?: string;
};

type UseTypingTextProps = {
  segments: TypingSegment[];
  speed?: number;
  startDelay?: number;
};

const useTypingText = ({
  segments, // text
  speed = 100, // 타이핑 속도 (ms)
  startDelay = 0, // 타이핑 시작 전 대기 시간 (ms)
}: UseTypingTextProps) => {
  const [typedLength, setTypedLength] = useState(0); // 현재까지 타이핑된 글자 수

  const fullText = useMemo(
    () => segments.map((segment) => segment.text).join(""),
    [segments],
  ); // 전체 텍스트

  const isEqualText = typedLength >= fullText.length; // 타이핑이 완료되었는지 여부

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined; // 타이핑 인터벌 ID
    let currentIndex = 0; // 현재까지 타이핑된 글자 수

    const startTyping = () => {
      setTypedLength(0); // 타이핑 시작 시 글자 수 초기화

      // 타이핑 인터벌 설정
      intervalId = setInterval(() => {
        currentIndex += 1;
        setTypedLength(currentIndex);

        if (currentIndex >= fullText.length && intervalId) {
          // 타이핑이 완료되면 인터벌 종료
          clearInterval(intervalId);
        }
      }, speed);
    };

    const timeoutId = setTimeout(startTyping, startDelay); // startDelay 후에 타이핑 시작

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [fullText, speed, startDelay]);

  // 현재 타이핑된 글자 수에 따라 segments를 조합하여 displaySegments 생성
  const displaySegments = () => {
    const result = segments.reduce(
      (acc, segment) => {
        if (acc.remain <= 0) return acc; // 이미 모든 글자가 타이핑된 경우

        const visibleText = segment.text.slice(0, acc.remain); // 현재 타이핑된 글자 수에 맞게 텍스트 자르기
        const nextRemain = acc.remain - visibleText.length; // 다음 segment로 넘어갈 때 남은 글자 수 계산

        return {
          remain: nextRemain,
          items: [
            ...acc.items,
            {
              ...segment,
              text: visibleText,
            },
          ],
        };
      },
      {
        remain: typedLength,
        items: [] as TypingSegment[],
      },
    );

    return result.items;
  };

  return { displaySegments, isEqualText };
};

export default useTypingText;
