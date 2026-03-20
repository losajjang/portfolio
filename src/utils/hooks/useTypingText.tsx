"use client";
import { useEffect, useState } from "react";

type UseTypingTextProps = {
  text: string;
  speed?: number;
  startDelay?: number;
};

const useTypingText = ({
  text, // 타이핑될 텍스트
  speed = 100, // 타이핑 속도 (ms)
  startDelay = 0, // 타이핑 시작 전 대기 시간 (ms)
}: UseTypingTextProps) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> = setInterval(() => {}, 0);
    let currentIndex = 0;

    const startTyping = () => {
      intervalId = setInterval(() => {
        currentIndex += 1;
        setDisplayText(text.slice(0, currentIndex));
        if (currentIndex >= text.length) {
          clearInterval(intervalId);
        }
      }, speed);
    };

    const timeoutId = setTimeout(startTyping, startDelay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  return displayText;
};

export default useTypingText;
