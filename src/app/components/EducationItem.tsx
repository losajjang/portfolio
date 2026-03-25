import clsx from "clsx";

type EducationItemProps = {
  title: string;
  period: string;
  details?: string[];
};

const EducationItem = ({ title, period, details }: EducationItemProps) => {
  return (
    <div>
      <h3 className="typo-title3 text-gray-gray_80">{title}</h3>
      <div className="ml-4">
        <p className="typo-body4_strong text-gray-gray_60">{period}</p>
        <ul className={clsx("typo-body4_normal")}>
          {details?.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EducationItem;
