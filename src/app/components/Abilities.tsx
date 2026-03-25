import { useRef } from "react";
import SectionWrapper from "./SectionWrapper";
import useInViewportOffset from "@/utils/hooks/useInViewportOffset";

const Abilities = () => {
  const abilitiesTitleRef = useRef<HTMLElement | null>(null);

  const { isReached: isAbilitiesTitleReached } = useInViewportOffset({
    ref: abilitiesTitleRef,
    bottomOffset: 100,
  });

  return (
    <SectionWrapper
      ref={abilitiesTitleRef}
      title="기술 스택"
      isTitleReached={isAbilitiesTitleReached}
    ></SectionWrapper>
  );
};

export default Abilities;
