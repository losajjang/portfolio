import clsx from "clsx";

type AbilityItemProps = {
  title: string;
  abilities: { name: string; color: string }[];
};

const AbilityItem = ({ title, abilities }: AbilityItemProps) => {
  return (
    <div className={clsx("grid grid-cols-[100px_1fr] gap-8 items-center")}>
      <h3 className={clsx("typo-body3_strong text-gray-gray_80")}>⎮ {title}</h3>
      <ul className="flex flex-row gap-2">
        {abilities.map((ability, index) => (
          <li
            key={index}
            className={clsx(
              "flex items-center gap-2",
              "typo-body3 text-gray-gray_60",
            )}
          >
            <span
              className={clsx(
                "block bg-gray-gray_80 px-2 py-1 rounded-6",
                "typo-detail1_strong text-gray-gray_0",
              )}
              style={{ backgroundColor: ability.color }}
            >
              {ability.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AbilityItem;
