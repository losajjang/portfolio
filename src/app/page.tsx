"use client";
import clsx from "clsx";
import {
  Abilities,
  Career,
  Education,
  FloatingContact,
  Intro,
  Nav,
} from "./components";
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

const SECTION_IDS = ["intro", "abilities", "career", "education"] as const;
const ACTIVE_SECTION_OFFSET_PX = 32;

export default function Home() {
  const { displaySegments, isEqualText: isHelloTextTypingComplete } =
    useTypingText({
      segments: INTRO_SEGMENTS,
      speed: 120,
      startDelay: 300,
    });

  const [showContent, setShowContent] = useState(false);
  const [activeSectionId, setActiveSectionId] =
    useState<(typeof SECTION_IDS)[number]>("intro");

  // 인삿말이 모두 타이핑된 후 0.5초 후에 콘텐츠를 보여줌
  useEffect(() => {
    if (isHelloTextTypingComplete) {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isHelloTextTypingComplete]);

  useEffect(() => {
    if (!showContent) return;

    const updateActiveSection = () => {
      let nextActiveSectionId: (typeof SECTION_IDS)[number] = SECTION_IDS[0];

      SECTION_IDS.forEach((sectionId) => {
        const section = document.getElementById(sectionId);

        if (!section) return;

        if (section.getBoundingClientRect().top <= ACTIVE_SECTION_OFFSET_PX) {
          nextActiveSectionId = sectionId;
        }
      });

      setActiveSectionId((currentSectionId) =>
        currentSectionId === nextActiveSectionId
          ? currentSectionId
          : nextActiveSectionId,
      );
    };

    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [showContent]);

  return (
    <section
      className={clsx(
        "relative",
        "w-full h-screen pt-4",
        isHelloTextTypingComplete ? "flex-row" : "flex-col",
      )}
    >
      <div
        className={clsx(
          "flex flex-col justify-center",
          isHelloTextTypingComplete ? "items-start" : "items-center",
          isHelloTextTypingComplete ? "w-fit shrink-0" : "w-full",
          "transition-all duration-500 ease-in-out",
          isHelloTextTypingComplete
            ? "fixed top-4 left-4 translate-x-0 translate-y-0 typo-title2"
            : "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 typo-display1",
        )}
      >
        <h1
          className={clsx(
            "whitespace-pre",
            // "transition-all duration-500 ease-in-out",
            // isHelloTextTypingComplete
            //   ? "absolute top-4 left-4 translate-x-0 translate-y-0 typo-title2"
            //   : "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 typo-display1",
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
        <Nav showContent={showContent} activeSectionId={activeSectionId} />
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
          <div className="w-full h-100 mb-100">
            <p className={clsx("typo-body2_strong text-primary-primary_80")}>
              읽어주셔서 정말 감사드립니다.
            </p>
            <p className="text-gray-gray_0">-------------</p>
            <p className="text-gray-gray_0">-------------</p>
            <p className="text-gray-gray_0">-------------</p>
            <p className="text-gray-gray_0">-------------</p>
          </div>
        </div>
      </div>
      {showContent && <FloatingContact />}
    </section>
  );
}
