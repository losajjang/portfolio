import clsx from "clsx";

type NavProps = {
  showContent: boolean;
  activeSectionId: string;
};

const NAV_ITEMS = [
  { href: "#intro", id: "intro", label: "핵심 역량" },
  { href: "#abilities", id: "abilities", label: "기술 스택" },
  { href: "#career", id: "career", label: "경력 사항" },
  { href: "#education", id: "education", label: "교육 사항" },
];

const Nav = ({ showContent, activeSectionId }: NavProps) => {
  return (
    <nav
      className={clsx(
        "transition-all duration-500 ease-in-out",
        showContent ? "opacity-100" : "opacity-0 h-0",
      )}
    >
      <ul className={clsx("flex flex-col gap-4 mt-8", "typo-title3")}>
        {NAV_ITEMS.map((item) => {
          const isActive = item.id === activeSectionId;

          return (
            <li key={item.id}>
              <a
                href={item.href}
                aria-current={isActive ? "location" : undefined}
                className={clsx(
                  "transition-colors duration-300 hover:text-primary-primary_50",
                  isActive ? "text-primary-primary_50" : "text-gray-gray_80",
                )}
              >
                🔗 {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;
