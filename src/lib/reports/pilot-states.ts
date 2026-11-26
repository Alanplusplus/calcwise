/**
 * The seven states that have a page at /states/[slug]. This file imports nothing on purpose: the report
 * tables are client components and read it to decide which state names get a link, so it must not pull
 * the report data modules into the browser bundle.
 */
export const PILOT_STATES = [
  { slug: "florida", abbr: "FL" },
  { slug: "new-hampshire", abbr: "NH" },
  { slug: "new-jersey", abbr: "NJ" },
  { slug: "illinois", abbr: "IL" },
  { slug: "louisiana", abbr: "LA" },
  { slug: "washington", abbr: "WA" },
  { slug: "south-carolina", abbr: "SC" },
] as const;

export type PilotStateSlug = (typeof PILOT_STATES)[number]["slug"];

/** URL segment of a state page, or undefined when the state has no page. */
export function pilotSlugForAbbr(abbr: string): PilotStateSlug | undefined {
  return PILOT_STATES.find((s) => s.abbr === abbr)?.slug;
}
