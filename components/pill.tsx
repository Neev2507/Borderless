type PillProps = {
  children: React.ReactNode;
  withShadow?: boolean;
};

export function Pill({ children, withShadow = false }: PillProps) {
  return (
    <span
      className={`
        inline-flex items-center
        px-3 py-1
        rounded-full
        bg-surface-lowest
        text-on-surface-variant
        font-sans text-xs font-medium
        ${withShadow ? "shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]" : ""}
      `}
    >
      {children}
    </span>
  );
}