import Link from "next/link";
import type { Calculator } from "@/lib/calculators";
import { CategoryIcon } from "./Icons";

/** Index card for one calculator: used on the home page and the category pages. */
export function CalculatorCard({ calc, heading: Heading = "h3" }: { calc: Calculator; heading?: "h2" | "h3" }) {
  return (
    <Link
      href={`/calculators/${calc.slug}`}
      className="group relative flex h-full flex-col rounded-xl border border-ink-200 bg-white p-5 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-gold-400 hover:shadow-card-hover motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <div className="flex items-start justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-100 bg-brand-50 text-brand-700 transition-colors group-hover:border-brand-800 group-hover:bg-brand-800 group-hover:text-gold-200">
          <CategoryIcon name={calc.slug} />
        </span>
        <span
          aria-hidden="true"
          className="text-lg leading-none text-ink-300 transition duration-200 group-hover:translate-x-0.5 group-hover:text-gold-600"
        >
          →
        </span>
      </div>
      <Heading className="mt-4 text-[1.1875rem] font-semibold leading-snug text-ink-900">{calc.shortTitle}</Heading>
      <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-ink-500">{calc.description}</p>
    </Link>
  );
}
