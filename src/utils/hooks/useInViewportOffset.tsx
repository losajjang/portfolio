"use client";
import { RefObject, useEffect, useState } from "react";

type UseInViewportOffsetProps = {
  ref: RefObject<HTMLElement | null>;
  bottomOffset?: number;
};

const useInViewportOffset = ({
  ref, // 관찰할 요소의 ref
  bottomOffset = 0, // 뷰포트 하단에서의 오프셋 (px)
}: UseInViewportOffsetProps) => {
  const [isReached, setIsReached] = useState(false);

  useEffect(() => {
    if (isReached) return; // 이미 도달한 상태라면 다시 관찰할 필요 없음

    const target = ref.current; // 관찰할 요소

    if (!target) return; // 요소가 존재하지 않으면 관찰하지 않음

    // IntersectionObserver 설정
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsReached(entry.isIntersecting); // 요소가 뷰포트에 들어왔는지 여부 업데이트
      },
      {
        root: null, // 뷰포트를 기준으로 관찰
        threshold: 0, // 요소가 조금이라도 보이면 콜백 실행
        rootMargin: `0px 0px -${bottomOffset}px 0px`, // 뷰포트 하단에서의 오프셋
      },
    );
    observer.observe(target); // 요소 관찰 시작. 관찰 대상은 target 요소

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReached]);

  return { isReached };
};

export default useInViewportOffset;
