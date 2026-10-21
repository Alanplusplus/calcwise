import type { ReactNode } from "react";

export interface SourceLink {
  /** Link text. Include the publisher and, when useful, the document date, e.g. "IRS IR-2025-111 (Nov. 13, 2025)". */
  label: string;
  href: string;
}

interface SourcesProps {
  items: SourceLink[];
  /** Month or date the figures were last checked against these sources, e.g. "October 2026". */
  checked?: string;
  /** Optional trailing note: caveats, or how a figure was derived from the sources. */
  note?: ReactNode;
  className?: string;
}

/**
 * Standard "Sources" line for any page that quotes a rate, limit, bracket, or benchmark.
 * Use this instead of hand-writing anchor lists so every citation looks and behaves the same.
 */
export function Sources({ items, checked, note, className = "mt-3" }: SourcesProps) {
  return (
    <p className={`${className} text-xs text-ink-500`}>
      {items.length === 1 ? "Source" : "Sources"}:{" "}
      {items.map((item, i) => (
        <span key={item.href}>
          {i > 0 && ", "}
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {item.label}
          </a>
        </span>
      ))}
      .{checked && <> Checked {checked}.</>}
      {note && <> {note}</>}
    </p>
  );
}
