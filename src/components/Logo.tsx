interface LogoProps {
  className?: string;
  /** "dark" text for light backgrounds, "light" for the navy footer. */
  tone?: "dark" | "light";
}

/** "CalcWise" wordmark: serif "Calc" plus an italic "Wise" in money green (gold on navy). */
export function Wordmark({ className = "", tone = "dark" }: LogoProps) {
  const base = tone === "light" ? "text-[#fbf8ef]" : "text-ink-900";
  const accent = tone === "light" ? "text-gold-300" : "text-accent-700";
  return (
    <span className={`font-serif font-semibold leading-none tracking-tight ${base} ${className}`}>
      Calc<span className={`italic ${accent}`}>Wise</span>
    </span>
  );
}

/**
 * CalcWise mark: a rising trend line on deep navy with a champagne inner border.
 * Keep the geometry in sync with src/app/icon.svg (the favicon source).
 */
export function LogoMark({ className = "h-9 w-9" }: Omit<LogoProps, "tone">) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <rect width="64" height="64" rx="14" fill="#0d213c" />
      <rect
        x="3.5"
        y="3.5"
        width="57"
        height="57"
        rx="11"
        fill="none"
        stroke="#cfa94c"
        strokeOpacity="0.55"
        strokeWidth="1.2"
      />
      <path
        d="M13 46L26 33L35 41L50 20"
        fill="none"
        stroke="#f7f2e4"
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M40 19.5H50.5V30"
        fill="none"
        stroke="#e3be63"
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
