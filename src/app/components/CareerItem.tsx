import clsx from "clsx";
import { ReactNode, useState } from "react";
import CareerExpandDetail from "./CareerExpandDetail";

type CareerItemProps = {
  title: string;
  period: string;
  part: string;
  position: string;
  description: string;
  detail: {
    id: number;
    project: string;
    period: string;
    part: string;
    position: string;
    description: string;
    detail?: ReactNode;
  }[];
};

const CareerItem = ({
  title,
  period,
  part,
  position,
  description,
  detail,
}: CareerItemProps) => {
  const [viewMoreInfo, setViewMoreInfo] = useState({
    isOpen: false,
    selectedId: 0,
  }); // 업무 내용 더보기 버튼 토글 상태

  return (
    <div>
      <h3 className="typo-title3 text-gray-gray_80">⎮ {title}</h3>
      <div className="mt-2 sm:ml-4 sm:mt-0">
        <div className="flex flex-col gap-1 text-gray-gray_60 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2">
          <p className="typo-body4_strong">🗓️ {period}</p>
          {part && <p className="typo-body4_strong">{part}</p>}
          {position && <p className="typo-body4_strong">{position}</p>}
        </div>
        <div className={clsx("mt-3 sm:ml-4 sm:mt-0")}>
          <p className={clsx("typo-body3_strong")}>주요 업무: {description}</p>
          <div
            className={clsx(
              "relative",
              "mt-4 rounded-xl border-2 border-gray-gray_30 p-3 sm:p-4",
            )}
          >
            <p
              className={clsx(
                "absolute top-0 -translate-y-1/2",
                "bg-gray-gray_0 px-2",
                "typo-body3_strong text-gray-gray_70",
              )}
            >
              진행 프로젝트
            </p>
            <div className={clsx("flex flex-col gap-4")}>
              {detail.map((item, index) => (
                <div key={index} className={clsx("flex items-start gap-2")}>
                  <span className="pt-0.5">📌</span>
                  <div className="w-full">
                    <p className={clsx("typo-body3_strong text-gray-gray_80")}>
                      {item.project}
                    </p>
                    <div className="flex flex-col gap-1 text-gray-gray_60 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2">
                      <p className={clsx("typo-body4_normal")}>{item.period}</p>
                      <p className={clsx("typo-body4_normal")}>{item.part}</p>
                      <p className={clsx("typo-body4_normal")}>
                        {item.position}
                      </p>
                    </div>
                    <p
                      className={clsx(
                        "mt-1 typo-body4_normal text-gray-gray_80",
                        "break-keep whitespace-break-spaces",
                      )}
                    >
                      {item.description}
                    </p>
                    {item.detail && (
                      <>
                        <button
                          className={clsx(
                            "mt-2 cursor-pointer typo-detail1_strong text-button-primary hover:text-button-primary_hover",
                          )}
                          onClick={() => {
                            if (viewMoreInfo.selectedId === item.id) {
                              setViewMoreInfo((prev) => ({
                                ...prev,
                                isOpen: !prev.isOpen,
                              }));
                            } else {
                              setViewMoreInfo({
                                isOpen: true,
                                selectedId: item.id,
                              });
                            }
                          }}
                        >
                          &gt; 주요 업무 내용{" "}
                          {viewMoreInfo.isOpen &&
                          viewMoreInfo.selectedId === item.id
                            ? "접기"
                            : "보기"}
                        </button>
                        <CareerExpandDetail
                          isOpen={
                            viewMoreInfo.isOpen &&
                            viewMoreInfo.selectedId === item.id
                          }
                        >
                          {item.detail}
                        </CareerExpandDetail>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerItem;
