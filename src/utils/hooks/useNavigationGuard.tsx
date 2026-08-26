"use client";
import { useEffect, useId } from "react";

// window.history.state에 생성될 "__navigationGuardId"키이름 정의
// 네비게이션 가드가 생성한 state인지 식별하는 용도
const NAVIGATION_GUARD_STATE_KEY = "__navigationGuardId";

type UseNavigationGuardOptions = {
  enabled?: boolean;
  message?: string;
};

// window.history.state객체를 복사한 후 "__navigationGuardId"키에 guardId값을 할당
const createGuardState = (state: unknown, guardId: string) => ({
  ...(typeof state === "object" && state !== null ? state : {}),
  [NAVIGATION_GUARD_STATE_KEY]: guardId,
});

const useNavigationGuard = ({
  enabled = true,
  message = "현재 페이지에서 나갈 수 없습니다.",
}: UseNavigationGuardOptions = {}) => {
  const guardId = useId(); // 고유 아이디 생성

  useEffect(() => {
    if (!enabled) return; // 가드 미사용시 반환 값 없음

    let isLeaving = false;

    const guardedUrl = window.location.href; // 현재 머무르고 있는 이탈 방지된 url

    // window.history.state에 __navigationGuardId키의 값이 guardId와 같은지 확인
    const hasCurrentGuard =
      window.history.state?.[NAVIGATION_GUARD_STATE_KEY] === guardId;

    // window.history.state에 __navigationGuardId키값이 없는 경우 추가한다
    if (!hasCurrentGuard) {
      window.history.pushState(
        createGuardState(window.history.state, guardId),
        "",
        guardedUrl,
      );
    }

    // 새로고침시 이탈 경고 표시
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isLeaving) return;

      event.preventDefault();
    };

    // 뒤로가기시 이탈 경고 표시
    const handlePopState = (event: PopStateEvent) => {
      if (isLeaving) return;

      const isLeave = window.confirm(message); // confirm 표시

      // confirm창에서 확인버튼 클릭시 뒤로가기 작동
      if (isLeave) {
        isLeaving = true;
        window.history.back();
        return;
      }

      // 이탈을 취소한 경우에만 현재의 url 유지
      window.history.pushState(
        createGuardState(event.state, guardId),
        "",
        guardedUrl,
      );
    };

    window.addEventListener("beforeunload", handleBeforeUnload); // 브라우저 기본 이탈창 생성
    window.addEventListener("popstate", handlePopState); // confirm 으로 알람 생성

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [enabled, guardId, message]);
};

export default useNavigationGuard;
