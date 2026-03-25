import { useRef } from "react";
import SectionWrapper from "./SectionWrapper";
import useInViewportOffset from "@/utils/hooks/useInViewportOffset";

const Education = () => {
  const educationTitleRef = useRef<HTMLElement | null>(null);

  const { isReached: isEducationTitleReached } = useInViewportOffset({
    ref: educationTitleRef,
    bottomOffset: 100,
  });

  return (
    <SectionWrapper
      ref={educationTitleRef}
      title="교육"
      isTitleReached={isEducationTitleReached}
    ></SectionWrapper>
  );
};

export default Education;
