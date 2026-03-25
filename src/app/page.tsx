"use client";
import clsx from "clsx";
import { Abilities, Career, Education, Intro, Links } from "./components";
import { useEffect, useState } from "react";
import useTypingText from "@/utils/hooks/useTypingText";

const INTRO_SEGMENTS = [
  {
    text: "안녕하세요\n프론트엔드 개발자 ",
    className: "text-gray-gray_80",
  },
  {
    text: "박재민",
    className: "text-primary-primary_50",
  },
  {
    text: "입니다.",
    className: "text-gray-gray_80",
  },
];

export default function Home() {
  const { displaySegments, isEqualText: isHelloTextTypingComplete } =
    useTypingText({
      segments: INTRO_SEGMENTS,
      speed: 120,
      startDelay: 300,
    });

  const [showContent, setShowContent] = useState(false);

  // 인삿말이 모두 타이핑된 후 0.5초 후에 콘텐츠를 보여줌
  useEffect(() => {
    if (isHelloTextTypingComplete) {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isHelloTextTypingComplete]);

  return (
    <section
      className={clsx(
        "relative",
        "w-full h-full pt-4",
        isHelloTextTypingComplete ? "flex-row" : "flex-col",
      )}
    >
      <div
        className={clsx(
          "flex items-center justify-center",
          isHelloTextTypingComplete ? "w-fit shrink-0" : "w-full",
        )}
      >
        <h1
          className={clsx(
            "whitespace-pre",
            "transition-all duration-500 ease-in-out",
            isHelloTextTypingComplete
              ? "absolute top-4 left-4 translate-x-0 translate-y-0 typo-title2"
              : "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 typo-display1",
          )}
        >
          {displaySegments().map((segment, index) => (
            <span key={index} className={segment.className}>
              {segment.text}
            </span>
          ))}
          {!isHelloTextTypingComplete && (
            <span className="animate-blink">|</span>
          )}
        </h1>
      </div>
      <div
        className={clsx(
          "transition-all duration-500 ease-in-out",
          showContent ? "flex w-full h-full" : "hidden",
        )}
      >
        <div className={clsx("flex flex-col gap-12 mx-auto px-80")}>
          <Intro />
          <Abilities />
          <Career />
          <Education />
          <Links />
        </div>
      </div>
    </section>
  );
}
