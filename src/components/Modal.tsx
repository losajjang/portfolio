"use client";
import clsx from "clsx";
import { ReactNode, useEffect, useId, useRef } from "react";
import ReactDOM from "react-dom";

type ModalProps = {
  isOpen: boolean; // 모달이 열려 있는지 여부를 나타내는 boolean 값
  onClose: () => void; // 모달을 닫는 함수. 모달 외부 클릭, 닫기 버튼 클릭, Escape 키 입력 등으로 모달을 닫을 때 호출됨
  title?: ReactNode; // 모달의 title
  description?: ReactNode; // 모달의 description. title 아래에 위치하여 title에 대한 추가 설명 제공
  children: ReactNode; // 모달의 주요 내용
  footer?: ReactNode; // 모달의 footer. 주로 버튼 등을 배치
  closeOnBackdrop?: boolean; // 모달 외부 클릭 시 모달을 닫을지 여부
  closeOnEscape?: boolean; // Escape 키 입력 시 모달을 닫을지 여부
  showCloseButton?: boolean; // 모달 상단의 닫기 버튼 표시 여부
  panelClassName?: string;
};

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  closeOnBackdrop = true,
  closeOnEscape = true,
  showCloseButton = true,
  panelClassName = "",
}: ModalProps) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();
  const portalRoot =
    typeof document === "undefined"
      ? null
      : (document.getElementById("modal-root") ?? document.body);

  useEffect(() => {
    if (!isOpen) return;

    const { body } = document;
    const originalOverflow = body.style.overflow; // 모달이 열릴 때 스크롤을 방지하기 위해 body의 overflow 스타일을 "hidden"으로 설정

    body.style.overflow = "hidden";

    return () => {
      body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    // 모달이 열릴 때 dialog 요소 참조
    const dialog = dialogRef.current;
    // 모달이 열릴 때 포커스를 이동하기 위한 로직
    // previousFocusedElement는 모달이 열리기 전에 포커스가 있던 요소를 저장하여, 모달이 닫힐 때 다시 그 요소로 포커스를 이동시키기 위해 사용
    // 예. 사용자가 버튼을 클릭하여 모달을 열었다면, 모달이 닫힐 때 다시 그 버튼으로 포커스가 돌아감. 포커스가 된 버튼을 엔터나 스페이스로 누르면 다시 모달이 열리는 식으로 자연스러운 사용자 경험을 제공
    const previousFocusedElement =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    // moveFocusIntoDialog 함수는 모달이 열릴 때 포커스를 모달 내부로 이동시키는 역할을 함.
    // FOCUSABLE_SELECTOR로 지정된 요소들 중 첫 번째 요소에 포커스를 주거나, 그런 요소가 없으면 모달 자체에 포커스를 줌
    const moveFocusIntoDialog = () => {
      if (!dialog) return;

      // 포커스 가능한 요소가 있는지 로그로 확인
      // 모달내의 a, button, textarea, input, select, tabindex가 -1이 아닌 요소들을 모두 선택하여 배열로 만듦
      const focusableElements = Array.from(
        dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      );

      // 포커스 가능한 요소가 있으면 첫 번째 요소에 포커스를 주고, 없으면 모달 자체에 포커스를 줌
      (focusableElements[0] ?? dialog).focus();
    };

    // 모달이 열릴 때 moveFocusIntoDialog 함수를 애니메이션 프레임으로 실행하여, 모달이 완전히 렌더링된 후에 포커스가 이동하도록 함
    const animationFrameId = window.requestAnimationFrame(moveFocusIntoDialog);

    // handleKeyDown 함수는 모달이 열려 있을 때 키보드 이벤트를 처리하는 역할을 함. Escape 키로 모달을 닫거나, Tab 키로 포커스 트랩을 구현함
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!dialog) return;

      // Escape 키를 눌렀을 때 closeOnEscape가 true이면 모달을 닫음
      if (event.key === "Escape" && closeOnEscape) {
        event.preventDefault();
        onClose();
        return;
      }

      // Tab키가 아니라면 포커스 트랩 로직을 실행하지 않음
      if (event.key !== "Tab") return;

      // 포커스 가능한 요소가 있는지 로그로 확인
      // 모달내의 a, button, textarea, input, select, tabindex가 -1이 아닌 요소들을 모두 선택하여 배열로 만듦
      const focusableElements = Array.from(
        dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      );

      // 포커스 가능한 요소가 없으면 Tab키를 눌러도 모달 내부에서 포커스가 벗어나지 않도록 함
      if (focusableElements.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const firstFocusableElement = focusableElements[0]; // 포커스 가능한 요소 중 첫 번째 요소
      const lastFocusableElement = focusableElements.at(-1); // 포커스 가능한 요소 중 마지막 요소.

      if (!lastFocusableElement) return; // 안전장치: lastFocusableElement가 존재하지 않으면 함수 종료

      // Shift + Tab을 눌러서 포커스가 첫 번째 요소에 있을 때 뒤로 이동하려고 하면, 포커스를 마지막 요소로 이동시켜서 포커스가 모달 내부에서 순환하도록 함
      // Tab을 눌러서 포커스가 마지막 요소에 있을 때 앞으로 이동하려고 하면, 포커스를 첫 번째 요소로 이동시켜서 포커스가 모달 내부에서 순환하도록 함
      if (event.shiftKey && document.activeElement === firstFocusableElement) {
        event.preventDefault();
        lastFocusableElement.focus();
      }
      if (!event.shiftKey && document.activeElement === lastFocusableElement) {
        event.preventDefault();
        firstFocusableElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown); // 모달이 열릴 때 키다운 이벤트 리스너를 추가하여 handleKeyDown 함수를 실행하도록 함

    return () => {
      window.cancelAnimationFrame(animationFrameId); // 모달이 닫힐 때 애니메이션 프레임 취소
      document.removeEventListener("keydown", handleKeyDown); // 모달이 닫힐 때 키다운 이벤트 리스너 제거
      previousFocusedElement?.focus(); // 모달이 닫힐 때 이전에 포커스가 있던 요소로 포커스 이동
    };
  }, [closeOnEscape, isOpen, onClose]); // closeOnEscape, isOpen, onClose이 변경될 때마다 이펙트가 실행됨

  if (!isOpen || !portalRoot) return null; // 모달이 열려 있지 않거나 portalRoot가 존재하지 않으면 아무것도 렌더링하지 않음

  return ReactDOM.createPortal(
    <div
      className={clsx(
        "fixed inset-0 z-100",
        "flex items-center justify-center p-4",
        "bg-modalBg",
      )}
      onMouseDown={(event) => {
        if (!closeOnBackdrop) return;
        if (event.target !== event.currentTarget) return;

        onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className={clsx(
          "relative",
          "w-full max-w-xl sm:p-6",
          "rounded-3xl bg-gray-gray_0 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.18)]",
          "max-h-screen",
          panelClassName,
        )}
      >
        {(title || description || showCloseButton) && (
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              {title && (
                <h2 id={titleId} className="typo-title1 text-gray-gray_90">
                  {title}
                </h2>
              )}
              {description && (
                <p
                  id={descriptionId}
                  className="typo-body4_normal text-gray-gray_60"
                >
                  {description}
                </p>
              )}
            </div>
            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                aria-label="모달 닫기"
                className={clsx(
                  "shrink-0 rounded-full w-8 h-8",
                  "typo-detail1_strong text-gray-gray_60",
                  "cursor-pointer bg-gray-gray_10 transition-colors duration-200",
                  "hover:bg-gray-gray_20 hover:text-gray-gray_90",
                )}
              >
                ✕
              </button>
            )}
          </div>
        )}

        <div
          className={clsx(
            "max-h-[calc(100vh-20rem)] overflow-y-auto",
            "typo-body4_normal text-gray-gray_80",
          )}
        >
          {children}
        </div>

        {footer && (
          <div className="mt-6 flex justify-end gap-2 border-t border-gray-gray_20 pt-4">
            {footer}
          </div>
        )}
      </div>
    </div>,
    portalRoot,
  );
};

export default Modal;
