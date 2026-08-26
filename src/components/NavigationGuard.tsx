"use client";
import useNavigationGuard from "@/utils/hooks/useNavigationGuard";

type NavigationGuardProps = {
  enabled?: boolean;
  message?: string;
};

const NavigationGuard = ({
  enabled = true,
  message = "현재 페이지를 이탈하시겠습니까?",
}: NavigationGuardProps) => {
  useNavigationGuard({ enabled, message });

  if (!enabled) return null;

  return (
    <div role="status" className=" text-gray-gray_80">
      <p className="typo-body4_strong">네비게이션 가드 활성화 중</p>
    </div>
  );
};

export default NavigationGuard;
