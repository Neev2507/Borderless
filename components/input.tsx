type InputProps = {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "password" | "number";
  error?: string;
  disabled?: boolean;
};

export function Input({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  error,
  disabled = false,
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="font-sans text-sm font-semibold leading-5 tracking-[0.01em] text-on-surface-variant">
          {label}
        </label>
      )}

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          font-sans text-base font-normal leading-6
          bg-surface-low text-on-surface
          px-4 py-3 rounded
          border outline-none
          transition-colors
          disabled:opacity-50 disabled:cursor-not-allowed
          placeholder:text-on-surface-variant
          ${error
            ? "border-error focus:border-error"
            : "border-outline-variant focus:border-primary"
          }
        `}
      />

      {error && (
        <span className="font-sans text-xs font-medium leading-4 tracking-[0.02em] text-error">
          {error}
        </span>
      )}
    </div>
  );
}