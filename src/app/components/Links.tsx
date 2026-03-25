import { useRef } from "react";
import SectionWrapper from "./SectionWrapper";
import useInViewportOffset from "@/utils/hooks/useInViewportOffset";
import EducationItem from "./EducationItem";

const Links = () => {
  const linksTitleRef = useRef<HTMLElement | null>(null);

  const { isReached: isLinksTitleReached } = useInViewportOffset({
    ref: linksTitleRef,
    bottomOffset: 100,
  });

  return (
    <SectionWrapper
      ref={linksTitleRef}
      title="링크"
      isTitleReached={isLinksTitleReached}
    ></SectionWrapper>
  );
};

export default Links;
