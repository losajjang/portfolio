"use client";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { IcnLineCheckW16 } from "@public/icons";
import CustomImage from "./CustomImage";

type ProgressBarProps = {
  steps: number; // 전체 단계 수
  currentStep: number; // 현재 진행 중인 단계 (1부터 시작)
  margin?: string;
  padding?: string;
  completeProps?: boolean;
  type?: "number" | "string";
  width?: string;
};

/**
*	ProgressBar 컴포넌트는 단계별 진행 표시를 위한 UI 컴포넌트입니다.
* @param {number} ProgressBarProps.steps - 전체 단계 수
* @param {number} ProgressBarProps.currentStep - 현재 진행 중인 단계 (1부터 시작)
* @param {string} ProgressBarProps.margin - Tailwind 클래스를 활용한 마진
* @param {string} ProgressBarProps.padding - Tailwind 클래스를 활용한 패딩
*	@param {boolean} ProgressBarProps.completeProps - 전체 완료 여부 (완료된 경우 true)
* @param {string} ProgressBarProps.width - 너비 설정 (Tailwind 클래스 사용 가능, "w-100", "max-w-100", "min-w-100")
* @component
* @example
    <ProgressBar
      steps={totalSteps}
      currentStep={currentStep}
      margin=“mt-48”
      completeProps={isApplySuccess}
      width=“max-w-456”
    />  

*/

const ProgressBar = ({
  steps,
  currentStep,
  margin,
  padding,
  completeProps,
  width,
}: ProgressBarProps) => {
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [maxLabelWidth, setMaxLabelWidth] = useState(0);

  useEffect(() => {
    // 모든 텍스트 라벨 중 가장 긴 width를 찾기
    const widths = labelRefs.current.map((ref) => ref?.offsetWidth || 0);
    setMaxLabelWidth(Math.max(...widths));
  }, []);

  return (
    <div
      className={clsx(
        `${margin}`,
        `${padding}`,
        "flex flex-col w-full",
        `${width}`,
      )}
    >
      <div className={clsx("flex flex-col items-center w-full")}>
        <div
          className={clsx("flex items-center w-full")}
          style={{
            // 동그라미 외부에 텍스트를 사용시 정렬을 위해 사용하는 스타일
            paddingLeft: `${maxLabelWidth / 2 - 8}px`,
            paddingRight: `${maxLabelWidth / 2 - 8}px`,
          }}
        >
          {Array.from({ length: steps }, (_, index) => {
            const step = index + 1;
            const isCompleted = step < currentStep || completeProps;
            const isActive = step === currentStep;

            return (
              <div
                key={step}
                className={clsx(
                  "flex items-center py-1",
                  step !== steps ? "grow" : "w-auto",
                )}
              >
                {/* 단계 (완료: 체크 아이콘, 현재: 파란색, 남은 단계: 회색) */}
                <div
                  className={clsx(
                    "relative",
                    "flex items-center justify-center",
                    "w-8 h-8",
                    "rounded-full",
                    "transition-all duration-300",
                    "bg-gray-gray_30",
                    isCompleted && "bg-gray-gray_90",
                    isActive && "bg-primary-primary_50",
                  )}
                >
                  {/* 현재 단계 애니메이션 요소 */}
                  {isActive && !completeProps && (
                    <span
                      className={clsx(
                        "absolute rounded-full ring-4 ring-primary-primary_30 animate-pulse",
                        "w-8 h-8",
                      )}
                    />
                  )}
                  {/* 동그라미 내부에 표시할 텍스트 */}
                  <span
                    className={clsx("typo-body3_strong", "text-gray-gray_0")}
                  >
                    {step}
                  </span>
                </div>
                {/* 단계 연결 선 (마지막 단계 이후에는 없음) */}
                {step !== steps && (
                  <div
                    className={clsx(
                      "flex-1 min-w-0 h-0.5",
                      isCompleted ? "bg-gray-gray_90" : "bg-gray-gray_30",
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
