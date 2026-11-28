/**
 * Facts about the eleven state reports that the press page, the state pages, and the reports' own
 * "Cite or reuse" sections share. Dates, ACS years, rates, and paths are read from each report's REPORT
 * object; nothing numeric is typed in here.
 *
 * The page title (h1) and the list of data sources of each report live in this file, and the report
 * pages build their on-page citation from it, so the citation on a report page and the one on the press
 * page cannot differ.
 */

import { site } from "@/lib/site";
import { reports as reportListings } from "./index";
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

interface ReportMeta {
  slug: string;
  path: string;
  csvPath: string;
  datePublished: string;
  dateModified: string;
  acsYear: number;
  csvVersion: number;
}

interface Entry {
  report: ReportMeta;
  /** Page title (the h1 of the report page) */
  h1: string;
  /** ACS tables the page cites */
  tables: string;
  /** Other source named in the citation, if any */
  extraSource?: string;
}

/** Newest report first, the same order as the reports index. */
const ENTRIES = [
  {
    report: commute.REPORT,
    h1: "Commute Time by State: How Long Workers Travel and Who Works From Home",
    tables: "B08301, B08303, B08013, B08121, B19013",
  },
  {
    report: propertyTax.REPORT,
    h1: "Property Tax by State: What Homeowners Pay and the Effective Rate",
    tables: "B25102, B25103, B25090, B25077, B19013",
  },
  {
    report: selfEmployment.REPORT,
    h1: "Self-Employment by State: Who Works for Themselves and What They Earn",
    tables: "B24080, B19053, B19063, B19052, B19062, B19013",
  },
  {
    report: sixFigure.REPORT,
    h1: "Six-Figure Households by State: Who Earns $100,000 or More",
    tables: "B19001, B19080, B19083, B20017, B19013",
    extraSource: `Social Security Administration, Wage Statistics for ${sixFigure.WAGE_EARNERS.year}`,
  },
  {
    report: mortgageFree.REPORT,
    h1: "Mortgage-Free Homeowners by State: Who Owns Free and Clear",
    tables: "B25081, B25027, B25088, B25077",
  },
  {
    report: retirement.REPORT,
    h1: "Social Security and Retirement Income by State: Who Receives It and How Much",
    tables: "B19055, B19059, B19065, B19069, B19049, B11007",
    extraSource: `Social Security Administration, Monthly Statistical Snapshot, ${retirement.SSA.month}`,
  },
  {
    report: cars.REPORT,
    h1: "Car Ownership by State: Vehicles per Household and What They Cost",
    tables: "B25044, B25046, B19013",
    extraSource: `AAA, Your Driving Costs ${cars.AAA.year}`,
  },
  {
    report: insurance.REPORT,
    h1: "Homeowners Insurance Cost by State: What Owners Actually Pay",
    tables: "B25141, B25077, B25103, B19013",
    extraSource: `Freddie Mac PMMS, ${insurance.REPORT.mortgageRateDate}`,
  },
  {
    report: costBurden.REPORT,
    h1: "Housing Cost Burden by State: Households Paying 30% or More of Income",
    tables: "B25070, B25091, B25071, B25092, B25064, B25119",
  },
  {
    report: rentVsBuy.REPORT,
    h1: "Rent vs. Buy by State: Median Rent vs. the Payment on the Median Home",
    tables: "B25064, B25119, B25077, B25103",
    extraSource: `Freddie Mac Primary Mortgage Market Survey, ${rentVsBuy.REPORT.mortgageRateDate}`,
  },
  {
    report: affordability.REPORT,
    h1: "Mortgage Affordability by State: Median Home vs. Median Income",
    tables: "B25077, B25103, B19013",
    extraSource: `Freddie Mac Primary Mortgage Market Survey, ${affordability.REPORT.mortgageRateDate}`,
  },
] as const satisfies readonly Entry[];

export type ReportSlug = (typeof ENTRIES)[number]["report"]["slug"];

const bySlug = new Map<string, Entry>(ENTRIES.map((e) => [e.report.slug, e]));

function entry(slug: ReportSlug): Entry {
  const e = bySlug.get(slug);
  if (!e) throw new Error(`Unknown report: ${slug}`);
  return e;
}

export const acsLabel = (report: ReportMeta) =>
  `U.S. Census Bureau, ${report.acsYear} American Community Survey 1-year estimates`;

/** The title of the report page (its h1). */
export function reportH1(slug: ReportSlug): string {
  return entry(slug).h1;
}

/** The citation printed at the end of the report page and on the press page. */
export function reportCitation(slug: ReportSlug): string {
  const e = entry(slug);
  const year = new Date(e.report.dateModified).getUTCFullYear();
  const extra = e.extraSource ? `; ${e.extraSource}` : "";
  return `${site.name} (${year}). ${e.h1}. ${site.url}${e.report.path}. Data: ${acsLabel(e.report)} (${e.tables})${extra}.`;
}

export interface PressRow {
  slug: ReportSlug;
  title: string;
  path: string;
  csvPath: string;
  /** first sentence of the description on the reports index, which is built from the data files */
  summary: string;
  datePublished: string;
  dateModified: string;
  acsYear: number;
  tables: string;
  extraSource?: string;
  csvVersion: number;
  citation: string;
}

/** First sentence of a listing description (a sentence ends at a period followed by a capital letter). */
const firstSentence = (text: string) => text.split(/(?<=[a-z0-9%)])\.\s+(?=[A-Z])/)[0].replace(/\.?$/, ".");

export const PRESS_ROWS: PressRow[] = ENTRIES.map((e) => {
  const slug = e.report.slug as ReportSlug;
  const listing = reportListings.find((l) => l.slug === slug);
  if (!listing) throw new Error(`The reports index has no entry for ${slug}`);
  return {
    slug,
    title: e.h1,
    path: e.report.path,
    csvPath: e.report.csvPath,
    summary: firstSentence(listing.description),
    datePublished: e.report.datePublished,
    dateModified: e.report.dateModified,
    acsYear: e.report.acsYear,
    tables: e.tables,
    extraSource: "extraSource" in e ? e.extraSource : undefined,
    csvVersion: e.report.csvVersion,
    citation: reportCitation(slug),
  };
});

/** Every report cites the same ACS year; the press page states it once if so. */
export const ACS_YEARS = Array.from(new Set(PRESS_ROWS.map((r) => r.acsYear))).sort();

export interface ChangelogEvent {
  date: string;
  kind: "First published" | "Last modified";
  slug: ReportSlug;
  title: string;
  path: string;
  acsYear: number;
}

/** First-published and last-modified dates of every report, newest first. */
export const CHANGELOG: ChangelogEvent[] = PRESS_ROWS.flatMap((r) => {
  const events: ChangelogEvent[] = [
    { date: r.datePublished, kind: "First published", slug: r.slug, title: r.title, path: r.path, acsYear: r.acsYear },
  ];
  if (r.dateModified !== r.datePublished) {
    events.push({ date: r.dateModified, kind: "Last modified", slug: r.slug, title: r.title, path: r.path, acsYear: r.acsYear });
  }
  return events;
}).sort((a, b) => (a.date === b.date ? a.title.localeCompare(b.title) : a.date < b.date ? 1 : -1));

/** Latest date on which any report changed: the date the press and state pages last changed with the data. */
export const LATEST_REPORT_DATE = PRESS_ROWS.map((r) => r.dateModified).reduce((a, b) => (a > b ? a : b));

export interface PinnedRate {
  slug: ReportSlug;
  title: string;
  path: string;
  rate: number;
  date: string;
  /** Set when the report borrows the rate from another report */
  note?: string;
}

/** The mortgage rate each payment-based report holds fixed. The six-figure report uses the affordability report's terms. */
export const PINNED_RATES: PinnedRate[] = [
  { slug: affordability.REPORT.slug, rate: affordability.REPORT.mortgageRate, date: affordability.REPORT.mortgageRateDate },
  { slug: rentVsBuy.REPORT.slug, rate: rentVsBuy.REPORT.mortgageRate, date: rentVsBuy.REPORT.mortgageRateDate },
  { slug: insurance.REPORT.slug, rate: insurance.REPORT.mortgageRate, date: insurance.REPORT.mortgageRateDate },
  {
    slug: sixFigure.REPORT.slug,
    rate: sixFigure.AFFORDABILITY_PINNED.rate,
    date: sixFigure.AFFORDABILITY_PINNED.rateDate,
    note: "uses the terms of the mortgage affordability report",
  },
].map((p) => {
  const slug = p.slug as ReportSlug;
  return { ...p, slug, title: entry(slug).h1, path: entry(slug).report.path };
});