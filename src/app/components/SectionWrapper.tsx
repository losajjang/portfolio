import clsx from "clsx";
import { ReactNode, RefObject } from "react";

type SectionWrapperProps = {
  ref?: RefObject<HTMLElement | null>; // 섹션의 ref
  title?: string | ReactNode; // 섹션 제목
  children?: string | ReactNode; // 섹션 내용
  isTitleReached?: boolean; // 제목이 뷰포트에 도달했는지 여부
};

const SectionWrapper = ({
  ref = { current: null },
  title = "",
  children = null,
  isTitleReached = false,
}: SectionWrapperProps) => {
  return (
    <section
      ref={ref}
      className={clsx(
        isTitleReached ? "animate-fadeInUp" : "opacity-0",
        "transition-opacity duration-1000",
        "flex flex-col gap-4",
      )}
    >
      <p className={clsx("typo-body2_strong text-primary-primary_50")}>
        {title}
      </p>
      {children}
    </section>
  );
};

export default SectionWrapper;
