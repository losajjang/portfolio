"use client";
import clsx from "clsx";
import Link from "next/link";
import Button from "./Button";
import { ReactNode, useState } from "react";
import Modal from "./Modal";

export type UrlType = {
  label: string;
  url: string;
};

type ProjectDetailProps = {
  detail: {
    detailTitle: string;
    description?: string;
    demo?: {
      label?: string;
      modalContent?: {
        id?: string;
        title?: string;
        description?: ReactNode | string;
        demoBody?: ReactNode;
      };
    };
  }[];
  urls?: UrlType[];
};

const ProjectDetail = ({ detail, urls }: ProjectDetailProps) => {
  const [isModalOpen, setIsModalOpen] = useState<{
    isOpen: boolean;
    id: string;
  }>({
    isOpen: false,
    id: "",
  });

  return (
    <div>
      {urls && urls.length > 0 ? (
        <div className={clsx("mb-2 flex flex-wrap gap-2 sm:gap-4")}>
          {urls.map((url, index) => (
            <Link
              key={index}
              href={url.url}
              target="_blank"
              rel="noopener noreferrer"
              className={clsx("typo-body4_under text-primary-primary_60")}
            >
              {url.label}
            </Link>
          ))}
        </div>
      ) : (
        <p className={clsx("typo-body4_under text-gray-gray_70 mb-2")}>
          서비스 종료로 인해 현재는 링크가 제공되지 않습니다.
        </p>
      )}
      <ul
        className={clsx(
          "flex flex-col gap-4",
          "ml-5 list-outside list-disc sm:ml-6",
          "typo-body4_string",
        )}
      >
        {detail.map((item, index) => (
          <div key={index}>
            <li>
              {item.detailTitle}
              {item.description && (
                <p className={clsx("typo-body4_normal mt-1")}>
                  ↳ {item.description}
                </p>
              )}
              {item.demo && (
                <Button
                  buttonName={item.demo.label || "데모 보기"}
                  onClick={() =>
                    setIsModalOpen({
                      isOpen: true,
                      id: item.demo?.modalContent?.id || "",
                    })
                  }
                  buttonSize="small"
                  buttonStyle="primary"
                />
              )}
            </li>
            <Modal
              isOpen={
                isModalOpen.isOpen &&
                isModalOpen.id === item.demo?.modalContent?.id
              }
              onClose={() => setIsModalOpen({ isOpen: false, id: "" })}
              title={item.demo?.modalContent?.title || "데모"}
              description={
                item.demo?.modalContent?.description || "데모 내용이 없습니다."
              }
              footer={
                <>
                  <Button
                    buttonName="닫기"
                    buttonStyle="secondary"
                    onClick={() => setIsModalOpen({ isOpen: false, id: "" })}
                  />
                  <Button
                    buttonName="확인"
                    onClick={() => setIsModalOpen({ isOpen: false, id: "" })}
                  />
                </>
              }
            >
              {item.demo?.modalContent?.demoBody || "데모 내용이 없습니다."}
            </Modal>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ProjectDetail;
