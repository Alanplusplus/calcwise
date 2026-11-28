/**
 * Figures for the state pages (/states/[state]). Every value, national value, rank, and margin of error
 * is read from the eleven report data modules and formatted with the same helpers the report pages use;
 * no number is typed in here.
 *
 * Ranks compare the 50 states and DC (51 places). A metric that a report ranks by carries that report's
 * own rank (`reportRank`), so the rank on the state page is the one in the report's table and CSV. Every
 * other metric is ranked here from its value, highest first.
 */

import * as affordability from "./mortgage-affordability-by-state";
import * as rentVsBuy from "./rent-vs-buy-by-state";
import * as costBurden from "./housing-cost-burden-by-state";
import * as insurance from "./homeowners-insurance-by-state";
import * as cars from "./car-ownership-by-state";
import * as retirement from "./retirement-income-by-state";
import * as mortgageFree from "./mortgage-free-homeowners-by-state";
import * as sixFigure from "./six-figure-households-by-state";
import * as propertyTax from "./property-tax-by-state";
import * as selfEmployment from "./self-employment-by-state";
import * as commute from "./commute-time-by-state";
import { ACS_YEARS, PRESS_ROWS, reportH1, type ReportSlug } from "./press";
import { PILOT_STATES, type PilotStateSlug } from "./pilot-states";

export { PILOT_STATES, type PilotStateSlug };

// ---- Formatting ------------------------------------------------------------------------------------

interface Format {
  value: (n: number) => string;
  moe: (n: number) => string;
}

const { pct1, usd0 } = affordability;

const FORMATS = {
  usd: { value: usd0, moe: (n) => `±${usd0(n)}` },
  pct1: { value: pct1, moe: (n) => `±${n.toFixed(2)} pts` },
  pct2: { value: (n) => `${n.toFixed(2)}%`, moe: (n) => `±${n.toFixed(2)} pts` },
  ratio2: { value: (n) => `${n.toFixed(2)}x`, moe: (n) => `±${n.toFixed(2)}` },
  dec2: { value: (n) => n.toFixed(2), moe: (n) => `±${n.toFixed(3)}` },
  min1: { value: (n) => `${n.toFixed(1)} minutes`, moe: (n) => `±${n.toFixed(2)} minutes` },
} satisfies Record<string, Format>;

type FormatKey = keyof typeof FORMATS;

const ORDINAL_RULES = new Intl.PluralRules("en-US", { type: "ordinal" });
const ORDINAL_SUFFIX: Record<string, string> = { one: "st", two: "nd", few: "rd", other: "th" };
export const ordinal = (n: number) => `${n}${ORDINAL_SUFFIX[ORDINAL_RULES.select(n)]}`;

// ---- Metric model ----------------------------------------------------------------------------------

interface RankedRow {
  abbr: string;
  name: string;
  rank: number;
}

type Without<Row> = Omit<Row, "rank">;

interface Def<Row> {
  id: string;
  report: ReportSlug;
  /** Row label in the table */
  label: string;
  /** Lower-case phrase used inside the overview sentence */
  phrase: string;
  /** Assumptions or context shown under the label */
  sub?: string;
  fmt: FormatKey;
  value: (r: Without<Row>) => number;
  /** 90% margin of error, in the unit of the value */
  moe?: (r: Without<Row>) => number;
  /** Range from the report's conservative calculation at the 90% margins of its inputs */
  range?: (r: Without<Row>) => [number, number];
  /** Extra fact about this one value, such as the published bracket an estimate falls in */
  note?: (r: Without<Row>) => string;
  /** Set when this is the figure the report ranks by; the report's own rank is then used */
  reportRank?: "highest-first" | "lowest-first";
}

export interface MetricState {
  name: string;
  value: number;
  moe?: number;
  range?: [number, number];
  note?: string;
  /** Position counted from the highest value (1 = highest) and from the lowest value (1 = lowest) */
  posHigh: number;
  posLow: number;
  /** Rank as the report prints it, when the metric is the one the report ranks by */
  reportRank?: number;
  /** Other places with exactly the same value */
  tiedWith: string[];
}

export interface Metric {
  id: string;
  report: ReportSlug;
  label: string;
  phrase: string;
  sub?: string;
  fmt: FormatKey;
  reportRankOrder?: "highest-first" | "lowest-first";
  us: { value: number; moe?: number };
  places: number;
  byAbbr: Record<string, MetricState>;
  highest: { name: string; value: number };
  lowest: { name: string; value: number };
}

function defineMetric<Row extends RankedRow>(states: Row[], us: Without<Row>, def: Def<Row>): Metric {
  const places = states.length;
  if (places !== 51) throw new Error(`${def.id}: expected 50 states and DC, found ${places} places`);
  const values = states.map((s) => def.value(s));

  const byAbbr: Record<string, MetricState> = {};
  states.forEach((s, i) => {
    const v = values[i];
    let posHigh = 1 + values.filter((x) => x > v).length;
    let posLow = 1 + values.filter((x) => x < v).length;
    if (def.reportRank) {
      posHigh = def.reportRank === "highest-first" ? s.rank : places + 1 - s.rank;
      posLow = places + 1 - posHigh;
    }
    byAbbr[s.abbr] = {
      name: s.name,
      value: v,
      moe: def.moe?.(s),
      range: def.range?.(s),
      note: def.note?.(s),
      posHigh,
      posLow,
      reportRank: def.reportRank ? s.rank : undefined,
      tiedWith: states.filter((o, j) => j !== i && values[j] === v).map((o) => o.name),
    };
  });

  // A metric that borrows the report's rank must really be what the report sorts by.
  if (def.reportRank) {
    const ordered = [...states].sort((a, b) => a.rank - b.rank).map((s) => def.value(s));
    for (let i = 1; i < ordered.length; i++) {
      const wrong = def.reportRank === "highest-first" ? ordered[i] > ordered[i - 1] : ordered[i] < ordered[i - 1];
      if (wrong) throw new Error(`${def.id}: the report's rank does not follow this metric (${def.reportRank})`);
    }
  }

  const sorted = [...states].sort((a, b) => def.value(b) - def.value(a));
  const top = sorted[0];
  const bottom = sorted[sorted.length - 1];

  return {
    id: def.id,
    report: def.report,
    label: def.label,
    phrase: def.phrase,
    sub: def.sub,
    fmt: def.fmt,
    reportRankOrder: def.reportRank,
    us: { value: def.value(us), moe: def.moe?.(us) },
    places,
    byAbbr,
    highest: { name: top.name, value: def.value(top) },
    lowest: { name: bottom.name, value: def.value(bottom) },
  };
}

const A = affordability;
const R = rentVsBuy;
const B = costBurden;
const I = insurance;
const C = cars;
const T = retirement;
const M = mortgageFree;
const S = sixFigure;
const P = propertyTax;
const E = selfEmployment;
const W = commute;

/** First metric of each report is the one the press page shows as the report's key figure. */
export const METRICS: Metric[] = [
  // Mortgage affordability
  defineMetric(A.STATE_RESULTS, A.US_RESULT, {
    id: "afford-share",
    report: A.REPORT.slug,
    label: "Home payment as a share of median household income",
    phrase: "monthly payment on the median home as a share of median household income",
    sub: `Principal, interest, and property tax on the median home, ${A.REPORT.downPaymentPct}% down, ${A.REPORT.termYears}-year fixed at ${A.REPORT.mortgageRate.toFixed(2)}% (Freddie Mac PMMS, week of ${A.REPORT.mortgageRateDate})`,
    fmt: "pct1",
    value: (r) => r.share,
    range: (r) => [r.shareLow, r.shareHigh],
    reportRank: "lowest-first",
  }),
  defineMetric(A.STATE_RESULTS, A.US_RESULT, {
    id: "afford-value",
    report: A.REPORT.slug,
    label: "Median home value",
    phrase: "median home value",
    fmt: "usd",
    value: (r) => r.value,
    moe: (r) => r.valueMoe,
  }),
  defineMetric(A.STATE_RESULTS, A.US_RESULT, {
    id: "afford-income",
    report: A.REPORT.slug,
    label: "Median household income",
    phrase: "median household income",
    sub: "Per year",
    fmt: "usd",
    value: (r) => r.income,
    moe: (r) => r.incomeMoe,
  }),

  // Rent vs. buy
  defineMetric(R.STATE_RESULTS, R.US_RESULT, {
    id: "rent-ratio",
    report: R.REPORT.slug,
    label: "Payment on the median home divided by median rent",
    phrase: "ratio of the payment on the median home to the median rent",
    sub: `Principal, interest, and property tax, ${R.REPORT.downPaymentPct}% down, ${R.REPORT.termYears}-year fixed at ${R.REPORT.mortgageRate.toFixed(2)}% (Freddie Mac PMMS, week of ${R.REPORT.mortgageRateDate})`,
    fmt: "ratio2",
    value: (r) => r.ratio,
    range: (r) => [r.ratioLow, r.ratioHigh],
    reportRank: "lowest-first",
  }),
  defineMetric(R.STATE_RESULTS, R.US_RESULT, {
    id: "rent-gross",
    report: R.REPORT.slug,
    label: "Median gross rent",
    phrase: "median gross rent",
    sub: "Per month, rent plus tenant-paid utilities",
    fmt: "usd",
    value: (r) => r.rent,
    moe: (r) => r.rentMoe,
  }),

  // Housing cost burden
  defineMetric(B.STATE_RESULTS, B.US_RESULT, {
    id: "burden-all",
    report: B.REPORT.slug,
    label: "Households paying 30% or more of income on housing",
    phrase: `share of households paying ${B.REPORT.burdenPct}% or more of income on housing`,
    sub: "Renters and owners together",
    fmt: "pct1",
    value: (r) => r.allShare30.pct,
    moe: (r) => r.allShare30.moe,
    reportRank: "highest-first",
  }),
  defineMetric(B.STATE_RESULTS, B.US_RESULT, {
    id: "burden-renters",
    report: B.REPORT.slug,
    label: "Renters paying 30% or more of income on rent",
    phrase: `share of renters paying ${B.REPORT.burdenPct}% or more of income on rent`,
    fmt: "pct1",
    value: (r) => r.renterShare30.pct,
    moe: (r) => r.renterShare30.moe,
  }),

  // Homeowners insurance
  defineMetric(I.STATE_RESULTS, I.US_RESULT, {
    id: "insurance-median",
    report: I.REPORT.slug,
    label: "Estimated median annual homeowners insurance premium",
    phrase: "estimated median homeowners insurance premium for owners with a mortgage",
    sub: "Owners with a mortgage. Estimated by interpolation inside a published bracket, so no margin of error is published; places with close values are best read as one tier, not a strict order",
    fmt: "usd",
    value: (r) => r.mortMedian,
    note: (r) => `Published bracket: ${r.mortBracket} a year`,
    reportRank: "highest-first",
  }),
  defineMetric(I.STATE_RESULTS, I.US_RESULT, {
    id: "insurance-3k",
    report: I.REPORT.slug,
    label: "Owners with a mortgage paying $3,000 or more a year for insurance",
    phrase: "share of owners with a mortgage paying $3,000 or more a year for homeowners insurance",
    fmt: "pct1",
    value: (r) => r.mortShare3k.pct,
    moe: (r) => r.mortShare3k.moe,
  }),

  // Car ownership
  defineMetric(C.STATE_RESULTS, C.US_RESULT, {
    id: "cars-per-hh",
    report: C.REPORT.slug,
    label: "Vehicles per household",
    phrase: "number of vehicles per household",
    sub: "All households, including those with no vehicle",
    fmt: "dec2",
    value: (r) => r.perHh.value,
    moe: (r) => r.perHh.moe,
    reportRank: "highest-first",
  }),
  defineMetric(C.STATE_RESULTS, C.US_RESULT, {
    id: "cars-none",
    report: C.REPORT.slug,
    label: "Households with no vehicle",
    phrase: "share of households with no vehicle",
    fmt: "pct1",
    value: (r) => r.noneShare.pct,
    moe: (r) => r.noneShare.moe,
  }),

  // Social Security and retirement income
  defineMetric(T.STATE_RESULTS, T.US_RESULT, {
    id: "retire-ss-share",
    report: T.REPORT.slug,
    label: "Households with Social Security income",
    phrase: "share of households with Social Security income",
    fmt: "pct1",
    value: (r) => r.ssShare.pct,
    moe: (r) => r.ssShare.moe,
  }),
  defineMetric(T.STATE_RESULTS, T.US_RESULT, {
    id: "retire-combined",
    report: T.REPORT.slug,
    label: "Social Security plus retirement income per household",
    phrase: "Social Security plus retirement income per household",
    sub: "Per year, all households, counting households with none",
    fmt: "usd",
    value: (r) => r.combinedPerHh.value,
    moe: (r) => r.combinedPerHh.moe,
    reportRank: "highest-first",
  }),

  // Mortgage-free homeowners
  defineMetric(M.STATE_RESULTS, M.US_RESULT, {
    id: "free-share",
    report: M.REPORT.slug,
    label: "Owners with no mortgage",
    phrase: "share of homeowners with no mortgage",
    fmt: "pct1",
    value: (r) => r.noMortShare.pct,
    moe: (r) => r.noMortShare.moe,
    reportRank: "highest-first",
  }),
  defineMetric(M.STATE_RESULTS, M.US_RESULT, {
    id: "free-65-mortgage",
    report: M.REPORT.slug,
    label: "Owners 65 and over who still have a mortgage",
    phrase: "share of owners 65 and over who still have a mortgage",
    fmt: "pct1",
    value: (r) => r.mort65Share.pct,
    moe: (r) => r.mort65Share.moe,
  }),

  // Six-figure households
  defineMetric(S.STATE_RESULTS, S.US_RESULT, {
    id: "six-share",
    report: S.REPORT.slug,
    label: "Households with income of $100,000 or more",
    phrase: "share of households with income of $100,000 or more",
    fmt: "pct1",
    value: (r) => r.h100Share.pct,
    moe: (r) => r.h100Share.moe,
    reportRank: "highest-first",
  }),
  defineMetric(S.STATE_RESULTS, S.US_RESULT, {
    id: "six-top20",
    report: S.REPORT.slug,
    label: "Household income where the top 20% begins",
    phrase: "household income at which the top 20% of households begin",
    sub: "Per year, lower limit of the top fifth of households",
    fmt: "usd",
    value: (r) => r.q4,
    moe: (r) => r.q4Moe,
  }),

  // Property tax
  defineMetric(P.STATE_RESULTS, P.US_RESULT, {
    id: "tax-median",
    report: P.REPORT.slug,
    label: "Median property tax bill",
    phrase: "median property tax bill",
    sub: "Per year, owner-occupied homes",
    fmt: "usd",
    value: (r) => r.med,
    moe: (r) => r.medMoe,
    reportRank: "highest-first",
  }),
  defineMetric(P.STATE_RESULTS, P.US_RESULT, {
    id: "tax-rate",
    report: P.REPORT.slug,
    label: "Effective property tax rate",
    phrase: "effective property tax rate",
    sub: "Median tax divided by median home value",
    fmt: "pct2",
    value: (r) => r.effRate.value,
    moe: (r) => r.effRate.moe,
  }),

  // Self-employment
  defineMetric(E.STATE_RESULTS, E.US_RESULT, {
    id: "se-share",
    report: E.REPORT.slug,
    label: "Workers who are self-employed",
    phrase: "share of workers who are self-employed",
    fmt: "pct1",
    value: (r) => r.seWorkerShare.pct,
    moe: (r) => r.seWorkerShare.moe,
    reportRank: "highest-first",
  }),
  defineMetric(E.STATE_RESULTS, E.US_RESULT, {
    id: "se-mean",
    report: E.REPORT.slug,
    label: "Mean self-employment income of households that have it",
    phrase: "mean self-employment income of households that report it",
    sub: "Per year, net of expenses",
    fmt: "usd",
    value: (r) => r.seMean.value,
    moe: (r) => r.seMean.moe,
  }),

  // Commute time
  defineMetric(W.STATE_RESULTS, W.US_RESULT, {
    id: "commute-mean",
    report: W.REPORT.slug,
    label: "Mean one-way commute",
    phrase: "mean one-way commute time",
    sub: "Workers 16 and over who do not work from home",
    fmt: "min1",
    value: (r) => r.meanMin.value,
    moe: (r) => r.meanMin.moe,
    reportRank: "highest-first",
  }),
  defineMetric(W.STATE_RESULTS, W.US_RESULT, {
    id: "commute-wfh",
    report: W.REPORT.slug,
    label: "Workers who work from home",
    phrase: "share of workers who work from home",
    sub: "Share of all workers 16 and over",
    fmt: "pct1",
    value: (r) => r.wfhShare.pct,
    moe: (r) => r.wfhShare.moe,
  }),
];

// ---- Profile of one state ----------------------------------------------------------------------------

export interface ProfileRow {
  id: string;
  reportSlug: ReportSlug;
  reportPath: string;
  reportTitle: string;
  label: string;
  sub?: string;
  value: string;
  /** "±$29", "20.1% to 22.4%", or "" when the source publishes none */
  error: string;
  errorKind: "moe" | "range" | "none";
  note?: string;
  us: string;
  /** "12th highest" */
  rank: string;
  /** Other places with exactly the same value; the rank above is the report's when it ranks by this figure */
  tiedWith: string[];
  places: number;
}

export interface StateProfile {
  abbr: string;
  name: string;
  slug: PilotStateSlug;
  rows: ProfileRow[];
  /** Two or three neutral sentences describing only the figures on the page */
  overview: string;
  acsYear: number;
  /** Date the data behind the page last changed */
  dataDate: string;
}

const reportPathOf = (slug: ReportSlug) => {
  const row = PRESS_ROWS.find((r) => r.slug === slug);
  if (!row) throw new Error(`Unknown report ${slug}`);
  return row.path;
};

export function getStateProfile(slug: string): StateProfile | undefined {
  const pilot = PILOT_STATES.find((s) => s.slug === slug);
  if (!pilot) return undefined;

  const rows: ProfileRow[] = METRICS.map((m) => {
    const s = m.byAbbr[pilot.abbr];
    if (!s) throw new Error(`${m.id}: no row for ${pilot.abbr}`);
    const f = FORMATS[m.fmt];
    let error = "";
    let errorKind: ProfileRow["errorKind"] = "none";
    if (s.moe !== undefined) {
      error = f.moe(s.moe);
      errorKind = "moe";
    } else if (s.range) {
      error = `${f.value(s.range[0])} to ${f.value(s.range[1])}`;
      errorKind = "range";
    }
    const position = m.reportRankOrder
      ? m.reportRankOrder === "highest-first"
        ? `${ordinal(s.reportRank!)} highest`
        : `${ordinal(s.reportRank!)} lowest`
      : `${ordinal(s.posHigh)} highest`;
    return {
      id: m.id,
      reportSlug: m.report,
      reportPath: reportPathOf(m.report),
      reportTitle: reportH1(m.report),
      label: m.label,
      sub: m.sub,
      value: f.value(s.value),
      error,
      errorKind,
      note: s.note,
      us: f.value(m.us.value),
      rank: position,
      tiedWith: s.tiedWith,
      places: m.places,
    };
  });

  // Overview: the measure on which the state sits nearest the top, and the one on which it sits nearest the bottom.
  const stateName = METRICS[0].byAbbr[pilot.abbr].name;
  const nearestTop = METRICS.reduce((best, m) => (m.byAbbr[pilot.abbr].posHigh < best.byAbbr[pilot.abbr].posHigh ? m : best));
  const nearestBottom = METRICS.reduce((best, m) => (m.byAbbr[pilot.abbr].posLow < best.byAbbr[pilot.abbr].posLow ? m : best));
  const sentence = (m: Metric, pos: number, dir: "highest" | "lowest") => {
    const f = FORMATS[m.fmt];
    const s = m.byAbbr[pilot.abbr];
    return `${ordinal(pos)} ${dir} of ${m.places} places for the ${m.phrase} (${f.value(s.value)}, against ${f.value(m.us.value)} for the United States)`;
  };
  if (ACS_YEARS.length !== 1) throw new Error("The reports use different ACS years; reword the state page overview.");
  const acsYear = ACS_YEARS[0];
  const overview =
    `This page lists ${rows.length} figures for ${stateName} from ${new Set(rows.map((r) => r.reportSlug)).size} CalcWise reports, all from the ${acsYear} American Community Survey 1-year estimates, each ranked among the 50 states and DC. ` +
    `${stateName} is ${sentence(nearestTop, nearestTop.byAbbr[pilot.abbr].posHigh, "highest")}. ` +
    `It is ${sentence(nearestBottom, nearestBottom.byAbbr[pilot.abbr].posLow, "lowest")}.`;

  return {
    abbr: pilot.abbr,
    name: stateName,
    slug: pilot.slug,
    rows,
    overview,
    acsYear,
    dataDate: PRESS_ROWS.map((r) => r.dateModified).reduce((a, b) => (a > b ? a : b)),
  };
}

// ---- Key figure of each report, for the press page ------------------------------------------------------

export interface KeyFigure {
  label: string;
  us: string;
  highest: string;
  lowest: string;
}

/** The first metric of each report, with the national value and the two ends of the 51 places. */
export function keyFigureFor(slug: ReportSlug): KeyFigure {
  const m = METRICS.find((x) => x.report === slug);
  if (!m) throw new Error(`No metric for ${slug}`);
  const f = FORMATS[m.fmt];
  return {
    label: m.label,
    us: f.value(m.us.value),
    highest: `${f.value(m.highest.value)} (${m.highest.name})`,
    lowest: `${f.value(m.lowest.value)} (${m.lowest.name})`,
  };
}

/** Every report must have at least one metric, so every report appears on every state page. */
for (const row of PRESS_ROWS) {
  if (!METRICS.some((m) => m.report === row.slug)) throw new Error(`No state metric for ${row.slug}`);
}
