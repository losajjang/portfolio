import clsx from "clsx";

const CONTACTS = [
  {
    label: "Email",
    value: "losajjang@gmail.com",
    href: "mailto:losajjang@gmail.com",
  },
  {
    label: "GitHub",
    value: "@losajjang",
    href: "https://github.com/losajjang",
  },
  {
    label: "Blog",
    value: "losajjang.tistory",
    href: "https://losajjang.tistory.com/",
  },
];

const FloatingContact = () => {
  return (
    <aside
      tabIndex={0}
      aria-label="Contact links"
      className={clsx(
        "group fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-50",
        "w-60 max-w-[calc(100vw-2rem)] overflow-hidden px-4 py-3",
        "rounded-3xl border border-primary-primary_10 bg-gray-gray_0 shadow-[0_20px_60px_rgba(1,103,192,0.14)] outline-none",
        "transition-all duration-300 ease-out",
        "hover:w-[calc(100vw-2rem)] hover:px-5 hover:py-5 hover:shadow-[0_24px_80px_rgba(1,103,192,0.18)]",
        "focus-within:w-[calc(100vw-2rem)] focus-within:px-5 focus-within:py-5 focus-within:shadow-[0_24px_80px_rgba(1,103,192,0.18)]",
        "sm:hover:w-80 sm:focus-within:w-80",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="relative flex size-3 shrink-0">
            <span
              className={clsx(
                "absolute",
                "inline-flex h-full w-full",
                "rounded-full bg-primary-primary_30",
                "opacity-75 animate-ping transition-opacity duration-200",
                "group-hover:opacity-0 group-focus-within:opacity-0",
              )}
            />
            <span className="relative inline-flex size-3 rounded-full bg-primary-primary_60" />
          </span>
          <p className="typo-body4_strong text-primary-primary_80">
            Contact me
          </p>
        </div>
        <span className="typo-detail1_normal text-gray-gray_50 transition-opacity duration-200 group-hover:opacity-0 group-focus-within:opacity-0">
          호버해주세요
        </span>
      </div>
      <div
        className={clsx(
          "mt-0 max-h-0 overflow-hidden opacity-0",
          "transition-[max-height,opacity,margin] duration-300 ease-out",
          "group-hover:mt-4 group-hover:max-h-80 group-hover:opacity-100",
          "group-focus-within:mt-4 group-focus-within:max-h-80 group-focus-within:opacity-100",
        )}
      >
        <div className={clsx("mt-3 flex flex-col gap-3")}>
          {CONTACTS.map((contact) => (
            <a
              key={contact.label}
              href={contact.href}
              target={contact.label === "Email" ? undefined : "_blank"}
              rel={contact.label === "Email" ? undefined : "noreferrer"}
              className={clsx(
                "block px-4 py-3",
                "rounded-2xl border border-gray-gray_20 bg-background-bg_5/70",
                "hover:border-primary-primary_20 hover:bg-gray-gray_0",
              )}
            >
              <p className="typo-detail1_strong text-gray-gray_50">
                {contact.label}
              </p>
              <p className="mt-1 break-all typo-body4_normal text-gray-gray_80 transition-colors duration-200 hover:text-primary-primary_80">
                {contact.value}
              </p>
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default FloatingContact;
