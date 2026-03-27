import clsx from "clsx";

type EducationItemProps = {
  title: string;
  period: string;
  details?: string[];
};

const EducationItem = ({ title, period, details }: EducationItemProps) => {
  return (
    <div>
      <h3 className="typo-title3 text-gray-gray_80">⎮ {title}</h3>
      <div className="mt-2 sm:ml-4 sm:mt-0">
        <p className="typo-body4_strong text-gray-gray_60">🗓️ {period}</p>
        <ul className={clsx("ml-5 list-disc typo-body4_normal sm:ml-8")}>
          {details?.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EducationItem;
