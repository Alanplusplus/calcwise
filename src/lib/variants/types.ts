import type { SourceLink } from "@/components/Sources";

export interface CalculatorVariant {
  slug: string;
  title: string;
  description: string;
  defaults: Record<string, string>;
  intro: string;
  tips: string[];
  lastUpdated: string;
  faq?: Array<{ q: string; a: string }>;
  comparisonNote?: string;
  keyResults?: Array<{ label: string; value: string }>;
  /** Tier 1 sources for the market figures quoted in this variant. Rendered as a Sources line. */
  sources?: SourceLink[];
  /** Month the quoted figures were verified against `sources`, e.g. "October 2026". */
  sourcesChecked?: string;
  /** Optional caveat shown after the sources, e.g. how a figure was derived. */
  sourcesNote?: string;
}
