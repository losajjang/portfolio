import { useRef } from "react";
import SectionWrapper from "./SectionWrapper";
import useInViewportOffset from "@/utils/hooks/useInViewportOffset";
import AbilityItem from "./AbilityItem";

const FRONTEND_ABILITIES = [
  { name: "JavaScript", color: "#f7df1e" },
  { name: "TypeScript", color: "#3178c6" },
  { name: "Next.js", color: "#000000" },
  { name: "TailwindCSS", color: "#38b2ac" },
];

const LIBRARY_ABILITIES = [
  { name: "Zustand", color: "#D97B93" },
  { name: "React Hook Form", color: "#D98E73" },
  { name: "yup", color: "#C9A227" },
  { name: "Day.js", color: "#8FAF5A" },
];

const DEPLOYMENT_ABILITIES = [
  { name: "AWS Amplify", color: "#5FAE8B" },
  { name: "Git", color: "#4FA3B8" },
  { name: "Bitbucket", color: "#5C8FD6" },
  { name: "GitHub", color: "#7C83D6" },
];

const COLLABORATION_ABILITIES = [
  { name: "Notion", color: "#9A7FD1" },
  { name: "Figma", color: "#A67C6B" },
  { name: "Slack", color: "#7F8C9A" },
];

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
    >
      <AbilityItem title="프론트엔드" abilities={FRONTEND_ABILITIES} />
      <AbilityItem title="라이브러리" abilities={LIBRARY_ABILITIES} />
      <AbilityItem title="배포/운영" abilities={DEPLOYMENT_ABILITIES} />
      <AbilityItem title="협업" abilities={COLLABORATION_ABILITIES} />
    </SectionWrapper>
  );
};

export default Abilities;
