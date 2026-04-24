"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

const CONTACTS = [
  {
    label: "Phone",
    value: "010-7170-9054",
    href: "tel:01071709054",
  },
  {
    label: "Email",
    value: "losajjang@gmail.com",
    href: "mailto:losajjang@gmail.com",
  },
  {
    label: "GitHub",
    value: "@losajjang",
    href: "https://github.com/losajjang",
  },
  {
    label: "Blog",
    value: "losajjang.tistory",
    href: "https://losajjang.tistory.com/",
  },
];

const FloatingContact = () => {
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const contactRef = useRef<HTMLElement | null>(null);

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

    const updateViewportType = () => {
      const nextIsMobileViewport = window.innerWidth < getSmBreakpointPx();

      setIsMobileViewport(nextIsMobileViewport);
      setIsMobileOpen((current) =>
        nextIsMobileViewport ? current : false,
      );
    };

    updateViewportType();
    window.addEventListener("resize", updateViewportType);

    return () => {
      window.removeEventListener("resize", updateViewportType);
    };
  }, []);

  useEffect(() => {
    if (!isMobileViewport || !isMobileOpen) return;

    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!contactRef.current?.contains(event.target as Node)) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener("pointerdown", closeOnOutsidePress);

    return () => {
      window.removeEventListener("pointerdown", closeOnOutsidePress);
    };
  }, [isMobileOpen, isMobileViewport]);

  return (
    <aside
      ref={contactRef}
      aria-label="Contact links"
      className={clsx(
        "group fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-50",
        "overflow-hidden rounded-3xl border border-primary-primary_10 bg-gray-gray_0 outline-none",
        "transition-all duration-300 ease-out",
        isMobileOpen
          ? "w-[calc(100vw-2rem)] max-w-[calc(100vw-2rem)] px-5 py-5 shadow-[0_24px_80px_rgba(1,103,192,0.18)]"
          : "w-60 max-w-[calc(100vw-2rem)] px-4 py-3 shadow-[0_20px_60px_rgba(1,103,192,0.14)]",
        "sm:w-60 sm:px-4 sm:py-3",
        "sm:hover:w-80 sm:hover:px-5 sm:hover:py-5 sm:hover:shadow-[0_24px_80px_rgba(1,103,192,0.18)]",
        "sm:focus-within:w-80 sm:focus-within:px-5 sm:focus-within:py-5 sm:focus-within:shadow-[0_24px_80px_rgba(1,103,192,0.18)]",
      )}
    >
      <button
        type="button"
        aria-expanded={isMobileViewport ? isMobileOpen : undefined}
        aria-controls="floating-contact-content"
        onClick={() => {
          if (!isMobileViewport) return;

          setIsMobileOpen((current) => !current);
        }}
        className="flex w-full items-center justify-between gap-3 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="relative flex size-3 shrink-0">
            <span
              className={clsx(
                "absolute",
                "inline-flex h-full w-full",
                "rounded-full bg-primary-primary_30",
                "opacity-75 animate-ping transition-opacity duration-200",
                isMobileOpen && "opacity-0",
                "group-hover:opacity-0 group-focus-within:opacity-0",
              )}
            />
            <span className="relative inline-flex size-3 rounded-full bg-primary-primary_60" />
          </span>
          <p className="typo-body4_strong text-primary-primary_80">
            Contact me
          </p>
        </div>
        <span
          className={clsx(
            "typo-detail1_normal text-gray-gray_50 transition-opacity duration-200",
            isMobileViewport ? "inline" : "hidden sm:inline",
            isMobileOpen && "opacity-0",
            "sm:group-hover:opacity-0 sm:group-focus-within:opacity-0",
          )}
        >
          {isMobileViewport ? "탭해주세요" : "호버해주세요"}
        </span>
      </button>
      <div
        id="floating-contact-content"
        className={clsx(
          "overflow-hidden transition-[max-height,opacity,margin] duration-300 ease-out",
          isMobileOpen
            ? "mt-4 max-h-80 opacity-100"
            : "mt-0 max-h-0 opacity-0",
          "sm:mt-0 sm:max-h-0 sm:opacity-0",
          "sm:group-hover:mt-4 sm:group-hover:max-h-80 sm:group-hover:opacity-100",
          "sm:group-focus-within:mt-4 sm:group-focus-within:max-h-80 sm:group-focus-within:opacity-100",
        )}
      >
        <div className={clsx("mt-3 flex flex-col gap-3")}>
          {CONTACTS.map((contact) => (
            <a
              key={contact.label}
              href={contact.href}
              target={contact.label === "Email" ? undefined : "_blank"}
              rel={contact.label === "Email" ? undefined : "noreferrer"}
              onClick={() => {
                if (isMobileViewport) {
                  setIsMobileOpen(false);
                }
              }}
              className={clsx(
                "block px-4 py-3",
                "rounded-2xl border border-gray-gray_20 bg-background-bg_5/70",
                "hover:border-primary-primary_20 hover:bg-gray-gray_0",
              )}
            >
              <p className="typo-detail1_strong text-gray-gray_50">
                {contact.label}
              </p>
              <p className="mt-1 break-all typo-body4_normal text-gray-gray_80 transition-colors duration-200 hover:text-primary-primary_80">
                {contact.value}
              </p>
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default FloatingContact;
