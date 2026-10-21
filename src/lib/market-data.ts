/**
 * Market benchmark rates: the single source of truth for calculator defaults and
 * for the examples that are computed from those defaults.
 *
 * Do not paste the average mortgage rate anywhere else. Import from here. When
 * Freddie Mac publishes a new weekly figure that differs from this one by 0.25
 * points or more, follow the `rate-refresh` task in `.cursor/rules/refresh-content.mdc`.
 */

import type { SourceLink } from "@/components/Sources";

export const MORTGAGE_MARKET = {
  /** Freddie Mac PMMS 30-year fixed-rate average, %. */
  thirtyYear: 7.4,
  /** Freddie Mac PMMS 15-year fixed-rate average, %. */
  fifteenYear: 6.71,
  /** The 30-year average one year before `asOf`, %. */
  thirtyYearYearAgo: 6.27,
  /** Week the figures above describe (ISO). */
  asOf: "2026-10-15",
  asOfLabel: "October 15, 2026",
  /** Date these figures were last compared against the source (ISO). */
  checkedOn: "2026-10-20",
  /** Month label for page text. */
  checkedLabel: "October 2026",
} as const;

export const MORTGAGE_MARKET_SOURCES: SourceLink[] = [
  {
    label: "Freddie Mac PMMS (Oct. 15, 2026)",
    href: "https://freddiemac.gcs-web.com/news-releases/news-release-details/mortgage-rates-hold-steady-740/",
  },
];

/** Calculator default for the interest-rate input, as the string the inputs hold. */
export const DEFAULT_MORTGAGE_RATE = String(MORTGAGE_MARKET.thirtyYear);
