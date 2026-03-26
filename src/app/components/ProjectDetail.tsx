import clsx from "clsx";
import Link from "next/link";

export type UrlType = {
  label: string;
  url: string;
};

type ProjectDetailProps = {
  detail: {
    detailTitle: string;
    description?: string;
  }[];
  urls?: UrlType[];
};

const ProjectDetail = ({ detail, urls }: ProjectDetailProps) => {
  return (
    <div>
      {urls && urls.length > 0 ? (
        <div className={clsx("flex flex-row gap-4 mb-2")}>
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
          "list-outside list-disc ml-6",
          "typo-body4_string",
        )}
      >
        {detail.map((item, index) => (
          <li key={index}>
            {item.detailTitle}
            {item.description && (
              <p className={clsx("typo-body4_normal mt-1")}>
                ↳ {item.description}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectDetail;
