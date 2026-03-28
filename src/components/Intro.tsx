import useInViewportOffset from "@/utils/hooks/useInViewportOffset";
import {
  javascriptIcon,
  nextjsIcon,
  typescriptIcon,
  bitbucketIcon,
  notionIcon,
  figmaIcon,
  slackIcon,
} from "@public/icons";
import clsx from "clsx";
import { useRef } from "react";
import IntroItem from "./IntroItem";
import SectionWrapper from "./SectionWrapper";

const Intro = () => {
  const introTitleRef = useRef<HTMLElement | null>(null);

  const { isReached: isIntroTitleReached } = useInViewportOffset({
    ref: introTitleRef,
    bottomOffset: 100,
  });

  return (
    <SectionWrapper
      id="intro"
      ref={introTitleRef}
      title="핵심 역량"
      isTitleReached={isIntroTitleReached}
    >
      <div
        className={clsx("flex flex-col gap-4", "typo-title1 text-gray-gray_80")}
      >
        <h2>
          사용자 입력 흐름이 복잡한 서비스에서
          <br />
          폼, 상태 관리, 공통 컴포넌트, 디자인 시스템 제작과
          <br className="hidden sm:block" /> 실서비스를 개발·운영해 온
          프론트엔드 개발자입니다.
        </h2>
        <div className={clsx("flex flex-col gap-4 sm:flex-row")}>
          <IntroItem
            images={[
              { src: javascriptIcon, alt: "JavaScript Logo" },
              { src: typescriptIcon, alt: "TypeScript Logo" },
              { src: nextjsIcon, alt: "Next.js Logo" },
            ]}
            title="0 to 1 프론트엔드 개발"
            description="React, Next.js, TypeScript를 활용한 모던 프론트엔드 개발에 능숙하며, 0 to 1 프로젝트 개발과 런칭 및 유지보수 경험이 있습니다."
          />
          <IntroItem
            images={[
              { src: bitbucketIcon, alt: "Bitbucket Logo" },
              { src: notionIcon, alt: "Notion Logo" },
              { src: figmaIcon, alt: "Figma Logo" },
              { src: slackIcon, alt: "Slack Logo" },
            ]}
            title="협업 도구 활용"
            description="Bitbucket, Notion, Figma, Slack 등 다양한 협업 도구를 활용하여 팀과의 원활한 소통과 효율적인 프로젝트 관리를 수행한 경험이 있습니다."
          />
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Intro;
