import clsx from "clsx";
import { ReactNode, useEffect, useRef, useState } from "react";

type CareerItemProps = {
  isOpen: boolean;
  children: ReactNode;
};

const CareerExpandDetail = ({ isOpen, children }: CareerItemProps) => {
  const contentRef = useRef<HTMLDivElement | null>(null); // 업무 내용 상세 설명 영역의 참조

  const [detailsHeight, setDetailsHeight] = useState(0); // 업무 내용 상세 설명 영역의 높이 상태

  useEffect(() => {
    if (!contentRef.current) return;

    if (isOpen) {
      const currentHeight = contentRef.current.scrollHeight; // 내용이 모두 보였을 때의 높이 계산
      setDetailsHeight(currentHeight);
    } else {
      setDetailsHeight(0);
    }
  }, [isOpen]);

  return (
    <div
      className={clsx(
        "transition-[height] duration-300 ease-in-out overflow-hidden",
        "bg-gray-gray_30 rounded-6",
      )}
      style={{
        height: isOpen ? `${detailsHeight}px` : "0",
      }}
    >
      <div ref={contentRef} className={clsx("p-4")}>
        {children}
      </div>
    </div>
  );
};

export default CareerExpandDetail;
