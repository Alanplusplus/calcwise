import { useId } from "react";

interface LogoProps {
  className?: string;
}

/** "CalcWise" wordmark: dark "Calc" plus "Wise" in the brand gradient. */
export function Wordmark({ className = "" }: LogoProps) {
  return (
    <span className={`font-extrabold leading-none tracking-tight text-ink-900 ${className}`}>
      Calc<span className="bg-gradient-to-r from-brand-700 to-accent-600 bg-clip-text text-transparent">Wise</span>
    </span>
  );
}

/**
 * CalcWise mark: a rising trend line on the brand gradient.
 * Keep the geometry in sync with src/app/icon.svg (the favicon source).
 */
export function LogoMark({ className = "h-9 w-9" }: LogoProps) {
  const gradientId = useId();

  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#1e40af" />
          <stop offset="1" stopColor="#10b981" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill={`url(#${gradientId})`} />
      <path
        d="M12 46L26 32L35 40L52 18"
        fill="none"
        stroke="#fff"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M40 18H52V30"
        fill="none"
        stroke="#a7f3d0"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
