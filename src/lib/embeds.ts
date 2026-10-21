/**
 * Calculators that can be embedded on other sites through /embed/[slug].
 * `height` is the iframe height (px) that fits the calculator without an inner
 * scrollbar at the recommended 720px max width (measured Oct 2026, plus a buffer). Hosts that load /embed.js get
 * automatic resizing on top of this default.
 */
export interface EmbedItem {
  slug: string;
  /** Short line shown in the picker */
  blurb: string;
  height: number;
}

export const embeds: EmbedItem[] = [
  { slug: "mortgage", blurb: "Monthly payment, total interest, and amortization schedule", height: 640 },
  { slug: "home-affordability", blurb: "How much house a given income can support", height: 1160 },
  { slug: "compound-interest", blurb: "Growth of savings with regular contributions", height: 860 },
  { slug: "savings-goal", blurb: "Monthly savings needed to hit a target date", height: 600 },
  { slug: "retirement", blurb: "Projected nest egg and retirement income", height: 890 },
  { slug: "auto-loan", blurb: "Car payment, interest, and total cost", height: 1130 },
  { slug: "debt-payoff", blurb: "Payoff dates with avalanche and snowball methods", height: 610 },
  { slug: "credit-card-payoff", blurb: "Months and interest to clear a card balance", height: 470 },
  { slug: "student-loan", blurb: "Student loan payment and payoff timeline", height: 1150 },
  { slug: "salary-to-hourly", blurb: "Convert annual salary to an hourly rate", height: 1330 },
  { slug: "paycheck", blurb: "Take-home pay after federal tax, FICA, and state tax", height: 1380 },
  { slug: "tip-calculator", blurb: "Tip and bill splitting", height: 980 },
  { slug: "emergency-fund", blurb: "Emergency fund target and time to reach it", height: 950 },
  { slug: "roi", blurb: "Return on investment and annualized return", height: 910 },
];

export function getEmbed(slug: string): EmbedItem | undefined {
  return embeds.find((e) => e.slug === slug);
}

export function isEmbeddable(slug: string): boolean {
  return embeds.some((e) => e.slug === slug);
}

/** Message type posted from the iframe to the host page (see public/embed.js). */
export const EMBED_RESIZE_MESSAGE = "calcwise:resize";
