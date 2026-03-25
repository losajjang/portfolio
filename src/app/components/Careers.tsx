import { useRef } from "react";
import SectionWrapper from "./SectionWrapper";
import useInViewportOffset from "@/utils/hooks/useInViewportOffset";

const Career = () => {
  const careerTitleRef = useRef<HTMLElement | null>(null);

  const { isReached: isCareerTitleReached } = useInViewportOffset({
    ref: careerTitleRef,
    bottomOffset: 100,
  });

  return (
    <SectionWrapper
      ref={careerTitleRef}
      title="경력"
      isTitleReached={isCareerTitleReached}
    ></SectionWrapper>
  );
};

export default Career;
