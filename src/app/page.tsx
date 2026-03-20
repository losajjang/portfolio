"use client";
import clsx from "clsx";
import { Abilities, Career, Education, Intro, Links } from "./components";
import { useEffect, useState } from "react";
import useTypingText from "@/utils/hooks/useTypingText";

export default function Home() {
  const typedText = useTypingText({
    text: "안녕하세요\n프론트엔드 개발자 박재민입니다.",
    speed: 100,
    startDelay: 500,
  });

  const [isHelloTextMoved, setIsHelloTextMoved] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHelloTextMoved(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isHelloTextMoved) {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isHelloTextMoved]);

  return (
    <section
      className={clsx(
        "relative",
        "w-full h-screen pl-80 pt-4",
        isHelloTextMoved ? "flex-row" : "flex-col",
      )}
    >
      <div
        className={clsx(
          "flex items-center justify-center",
          isHelloTextMoved ? "w-fit" : "w-full",
        )}
      >
        <h1
          className={clsx(
            "whitespace-pre",
            "text-gray-gray_80",
            "transition-all duration-500 ease-in-out",
            isHelloTextMoved
              ? "absolute top-4 left-4 translate-x-0 translate-y-0 typo-title2"
              : "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 typo-display1",
          )}
        >
          {typedText}
          {!isHelloTextMoved && <span className="animate-blink">|</span>}
        </h1>
      </div>
      <div
        className={clsx(
          "transition-all duration-500 ease-in-out",
          showContent ? "opacity-100 w-full h-full" : "opacity-0",
        )}
      >
        <article>
          <Intro />
        </article>
        <article>
          <Abilities />
        </article>
        <article>
          <Career />
        </article>
        <article>
          <Education />
        </article>
        <article>
          <Links />
        </article>
      </div>
    </section>
  );
}
