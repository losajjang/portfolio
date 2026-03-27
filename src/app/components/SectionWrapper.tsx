import clsx from "clsx";
import { ReactNode, RefObject } from "react";

type SectionWrapperProps = {
  id: string; // 섹션의 고유 ID
  ref?: RefObject<HTMLElement | null>; // 섹션의 ref
  title?: string | ReactNode; // 섹션 제목
  children?: string | ReactNode; // 섹션 내용
  isTitleReached?: boolean; // 제목이 뷰포트에 도달했는지 여부
};

const SectionWrapper = ({
  id,
  ref = { current: null },
  title = "",
  children = null,
  isTitleReached = false,
}: SectionWrapperProps) => {
  return (
    <section
      id={id}
      ref={ref}
      className={clsx(
        isTitleReached ? "animate-fadeInUp" : "opacity-0",
        "transition-opacity duration-1000",
        "flex flex-col gap-3 scroll-mt-34 sm:gap-4 sm:scroll-mt-8",
      )}
    >
      <p className={clsx("typo-body2_strong text-primary-primary_50")}>
        {title}
      </p>
      {children}
      <hr className="border-gray-gray_50" />
    </section>
  );
};

export default SectionWrapper;
