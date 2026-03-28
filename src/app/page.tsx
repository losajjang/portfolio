"use client";
import clsx from "clsx";
import {
  Abilities,
  Career,
  Education,
  FloatingContact,
  Intro,
  Nav,
} from "../components";
import { useEffect, useRef, useState } from "react";
import useTypingText from "@/utils/hooks/useTypingText";

export type ScrollMarginTopType = number; // 섹션이 화면 상단에 도달하기 전에 활성화되도록 여유 공간을 부모 컴포넌트에서 전달받음

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
  const introCardRef = useRef<HTMLDivElement | null>(null);

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
    const getSmBreakpointPx = () => {
      const rootFontSize = Number.parseFloat(
        window.getComputedStyle(document.documentElement).fontSize,
      );
      const breakpointValue = window
        .getComputedStyle(document.documentElement)
        .getPropertyValue("--breakpoint-sm")
        .trim();

      if (breakpointValue.endsWith("rem")) {
        return Number.parseFloat(breakpointValue) * rootFontSize;
      }

      if (breakpointValue.endsWith("px")) {
        return Number.parseFloat(breakpointValue);
      }

      return 760;
    };

    const getActiveSectionOffsetPx = () => {
      if (window.innerWidth >= getSmBreakpointPx()) {
        return ACTIVE_SECTION_OFFSET_PX;
      }

      const introCardBottom =
        introCardRef.current?.getBoundingClientRect().bottom;

      return introCardBottom ?? ACTIVE_SECTION_OFFSET_PX;
    };
    if (!showContent) return;

    const updateActiveSection = () => {
      let nextActiveSectionId: (typeof SECTION_IDS)[number] = SECTION_IDS[0];
      const activeSectionOffsetPx = getActiveSectionOffsetPx();

      SECTION_IDS.forEach((sectionId) => {
        const section = document.getElementById(sectionId);

        if (!section) return;

        if (section.getBoundingClientRect().top <= activeSectionOffsetPx) {
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
      className={clsx("relative min-h-screen w-full overflow-x-hidden pt-4")}
    >
      <div
        ref={introCardRef}
        className={clsx(
          "flex flex-col justify-center",
          isHelloTextTypingComplete ? "items-start" : "items-center",
          isHelloTextTypingComplete
            ? "fixed top-4 left-4 right-4 z-40 w-auto max-w-[calc(100vw-2rem)] rounded-3xl border border-gray-gray_20 bg-gray-gray_0/92 px-4 py-4 shadow-[0_18px_50px_rgba(0,0,0,0.08)] backdrop-blur-md sm:left-4 sm:right-auto sm:max-w-none sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none sm:backdrop-blur-none"
            : "w-full",
          "transition-all duration-500 ease-in-out",
          isHelloTextTypingComplete
            ? "translate-x-0 translate-y-0 typo-title2"
            : "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 typo-display1",
        )}
      >
        <header className={clsx("whitespace-pre")}>
          {displaySegments().map((segment, index) => (
            <span key={index} className={segment.className}>
              {segment.text}
            </span>
          ))}
          {!isHelloTextTypingComplete && (
            <span className="animate-blink">|</span>
          )}
        </header>
        <Nav showContent={showContent} activeSectionId={activeSectionId} />
      </div>
      <div
        className={clsx(
          "transition-all duration-500 ease-in-out",
          showContent ? "flex w-full min-h-screen" : "hidden",
        )}
      >
        <div
          className={clsx(
            "mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 pb-32 pt-40",
            "sm:gap-12 sm:px-28 sm:pb-40 sm:pt-20",
            "lg:px-40 xl:px-80",
          )}
        >
          <Intro />
          <Abilities />
          <Career />
          <Education />
          <div className="mb-24 min-h-60 w-full sm:mb-40">
            <p className={clsx("typo-body2_strong text-primary-primary_80")}>
              읽어주셔서 정말 감사드립니다.
            </p>
          </div>
        </div>
      </div>
      {showContent && <FloatingContact />}
    </section>
  );
}
