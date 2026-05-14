import { Pill } from "./pill";

type CardProps = {
  pill: string;
  title: string;
  body: string;
  features: string[];
  highlighted?: boolean;
};

export function Card({ pill, title, body, features, highlighted = false }: CardProps) {
  return (
    <div
      className={`
        flex flex-col gap-3
        p-8 pb-9
        rounded-2xl
        ${highlighted
          ? "bg-surface-lowest border border-primary shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
          : "bg-surface-low border border-outline-variant"
        }
      `}
    >
      <Pill withShadow={highlighted}>{pill}</Pill>

      <h3 className="font-serif text-2xl font-bold leading-8 text-primary">
        {title}
      </h3>

      <p className="font-sans text-base font-normal leading-6 text-on-surface-variant">
        {body}
      </p>

      <ul className="flex flex-col gap-2 mt-2">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2">
            <CheckIcon />
            <span className="font-sans text-sm font-normal leading-5 text-on-surface-variant">
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" className="text-primary" />
      <path
        d="M5 8L7 10L11 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
      />
    </svg>
  );
}