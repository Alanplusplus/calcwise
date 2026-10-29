import Link from "next/link";
import type { ReactNode } from "react";

interface Props {
  /** Small caps label above the title, e.g. "01 · Calculators". */
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  /** Optional "View all" style link on the right. */
  action?: { href: string; label: string };
  as?: "h1" | "h2";
}

/** Editorial section header: gold eyebrow, serif title, hairline underneath. */
export function SectionHeading({ eyebrow, title, description, action, as: Tag = "h2" }: Props) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-b border-ink-200 pb-5">
      <div className="max-w-2xl">
        <p className="eyebrow">{eyebrow}</p>
        <Tag className="mt-2 text-[1.875rem] font-semibold leading-tight text-ink-900 sm:text-[2.125rem]">
          {title}
        </Tag>
        {description && <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-500">{description}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-900"
        >
          {action.label}
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      )}
    </div>
  );
}
