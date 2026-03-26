import { useRef } from "react";
import SectionWrapper from "./SectionWrapper";
import useInViewportOffset from "@/utils/hooks/useInViewportOffset";
import EducationItem from "./EducationItem";

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
    >
      <EducationItem
        title="스파르타코딩클럽 항해99 웹 프론트엔드 과정"
        period="2022.03 ~ 2022.06 | 수료"
        details={[
          "React 기반 팀 프로젝트 2회 진행",
          "Git, 코드 리뷰, 협업 경험",
        ]}
      />
      <EducationItem
        title="경기과학기술대학교 컴퓨터응용금형디자인"
        period="2004.03 ~ 2009.02 | 졸업"
      />
    </SectionWrapper>
  );
};

export default Education;
