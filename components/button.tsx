type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost";
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
};

export function Button({
  variant = "primary",
  children,
  onClick,
  disabled = false,
  type = "button",
  className = "",
}: ButtonProps) {
  const base =
    "rounded-md font-sans text-base font-normal leading-6 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-primary text-on-primary px-6 py-[13px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] hover:opacity-90",
    secondary:
      "bg-transparent border border-outline-variant text-primary px-6 py-3 hover:bg-primary/5",
    ghost:
      "bg-transparent text-primary px-2 py-2 hover:opacity-70",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}