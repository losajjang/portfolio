import clsx from "clsx";
import Image from "next/image";

type IntroItemProps = {
  images?: { src: string; alt: string }[]; // 이미지 정보 배열
  title?: string; // 제목
  description?: string; // 설명
};

const IntroItem = ({
  images = [],
  title = "",
  description = "",
}: IntroItemProps) => {
  return (
    <div className={clsx("flex flex-col gap-4 w-60")}>
      <div
        className={clsx(
          "relative flex flex-row justify-center items-center gap-2 h-50 rounded-8",
          "bg-gray-gray_20",
        )}
      >
        {images.map((image, index) => (
          <div key={index}>
            <Image
              src={image.src}
              alt={image.alt}
              width={40}
              height={40}
              className="w-10 h-10"
            />
          </div>
        ))}
      </div>
      <div className={clsx("flex flex-col gap-1")}>
        <h3 className={clsx("typo-title1 text-gray-gray_80")}>⎮ {title}</h3>
        <p
          className={clsx(
            "typo-body4_normal break-keep whitespace-break-spaces text-gray-gray_70",
          )}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default IntroItem;
