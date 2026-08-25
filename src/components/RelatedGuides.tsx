import Link from "next/link";
import { guides } from "@/lib/guides";
import type { Guide } from "@/lib/guides";

interface Props {
  currentSlug: string;
  relatedSlugs?: string[];
}

export function RelatedGuides({ currentSlug, relatedSlugs }: Props) {
  let relatedGuides: Guide[];

  if (relatedSlugs && relatedSlugs.length > 0) {
    relatedGuides = relatedSlugs
      .map((slug) => guides.find((g) => g.slug === slug))
      .filter((g): g is Guide => g !== undefined && g.published);
  } else {
    relatedGuides = guides
      .filter((g) => g.slug !== currentSlug && g.published)
      .slice(0, 3);
  }

  if (relatedGuides.length === 0) return null;

  return (
    <section className="mt-12 border-t border-ink-200 pt-8">
      <h2 className="text-lg font-semibold text-ink-800">Related Guides</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {relatedGuides.map((g) => (
          <Link
            key={g.slug}
            href={`/guides/${g.slug}`}
            className="group rounded-lg border border-ink-200 bg-white p-4 transition-shadow hover:shadow-card-hover"
          >
            <h3 className="text-sm font-semibold text-ink-800 group-hover:text-brand-600 line-clamp-2">
              {g.title}
            </h3>
            <p className="mt-1 text-xs text-ink-500 line-clamp-2">
              {g.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
