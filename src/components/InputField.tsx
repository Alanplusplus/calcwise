"use client";

interface Props {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  prefix?: string;
  suffix?: string;
  type?: string;
  min?: number;
  max?: number;
  step?: number;
  helpText?: string;
}

export function InputField({
  label,
  id,
  value,
  onChange,
  prefix,
  suffix,
  type = "number",
  min,
  max,
  step,
  helpText,
}: Props) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink-700">
        {label}
      </label>
      <div className="relative mt-1">
        {prefix && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-ink-400">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          max={max}
          step={step}
          className={`w-full rounded-lg border border-ink-300 bg-white px-3 py-2.5 text-ink-900 shadow-input transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 ${
            prefix ? "pl-7" : ""
          } ${suffix ? "pr-12" : ""}`}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-ink-400">
            {suffix}
          </span>
        )}
      </div>
      {helpText && (
        <p className="mt-1 text-xs text-ink-400">{helpText}</p>
      )}
    </div>
  );
}
