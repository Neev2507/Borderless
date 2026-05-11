type ButtonProps = {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
};

export function Button({
  variant = "primary",
  children,
  onClick,
  disabled = false,
  type = "button",
}: ButtonProps) {
  const base =
    "px-6 py-3 rounded-md text-label-md transition-opacity disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-primary text-on-primary hover:opacity-90",
    secondary: "bg-transparent border border-primary text-primary hover:bg-primary/5",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}