import Link from "next/link";
import { pilotSlugForAbbr } from "@/lib/reports/pilot-states";

/**
 * State name cell for the report tables. The seven states that have a page at /states/[slug] link to it;
 * every other state renders as plain text, exactly as before.
 */
export function StateNameLink({ abbr, name }: { abbr: string; name: string }) {
  const slug = pilotSlugForAbbr(abbr);
  if (!slug) return <>{name}</>;
  return (
    <Link
      href={`/states/${slug}`}
      className="underline decoration-ink-300 underline-offset-2 hover:text-brand-600 hover:decoration-brand-600"
    >
      {name}
    </Link>
  );
}
