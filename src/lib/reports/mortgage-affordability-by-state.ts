/**
 * Data and calculations for the "Mortgage Affordability by State" report.
 * The report page and the CSV download both read from this file, so the
 * numbers in the text, the table, and the dataset cannot drift apart.
 *
 * Raw inputs (ACS 2024 1-year, tables B25077, B25103, B19013) were pulled on
 * 2026-10-20. Median home value and median household income were checked
 * against the Census Bureau's own published tables (GCT2510 and ACS brief
 * ACSBR-025) for all 50 states and DC; property taxes were checked against
 * data.census.gov for New Jersey and against a second compilation of the same
 * table for the other states. All 153 numbers matched.
 */

export const REPORT = {
  slug: "mortgage-affordability-by-state",
  path: "/reports/mortgage-affordability-by-state",
  csvPath: "/reports/mortgage-affordability-by-state/data.csv",
  datePublished: "2026-10-20",
  dateModified: "2026-10-20",
  /** ACS survey year of the housing and income figures */
  acsYear: 2024,
  /**
   * Freddie Mac PMMS 30-year fixed average, week of October 15, 2026. Pinned on purpose: a dated
   * report must not change when the weekly average does, so it does not read `src/lib/market-data.ts`.
   */
  mortgageRate: 7.4,
  mortgageRateDate: "October 15, 2026",
  /** Same survey one year earlier (stated in Freddie Mac's Oct. 15, 2026 release) */
  mortgageRateYearAgo: 6.27,
  downPaymentPct: 20,
  termYears: 30,
  /** Front-end housing-cost guideline, % of gross monthly income */
  guidelinePct: 28,
  /** Rates shown in the sensitivity table */
  sensitivityRates: [6.0, 6.27, 7.0, 7.4, 8.0],
} as const;

export const REPORT_SOURCES = {
  acsHome: {
    label: "U.S. Census Bureau, ACS 2024 1-year, table B25077 (median value)",
    href: "https://data.census.gov/table/ACSDT1Y2024.B25077",
  },
  acsTax: {
    label: "U.S. Census Bureau, ACS 2024 1-year, table B25103 (median real estate taxes paid)",
    href: "https://data.census.gov/table/ACSDT1Y2024.B25103",
  },
  acsIncome: {
    label: "U.S. Census Bureau, ACS 2024 1-year, table B19013 (median household income)",
    href: "https://data.census.gov/table/ACSDT1Y2024.B19013",
  },
  acsBrief: {
    label: "Census Bureau, Household Income in States and Metropolitan Areas: 2024 (ACSBR-025)",
    href: "https://www2.census.gov/library/publications/2025/demo/acsbr-025.pdf",
  },
  pmms: {
    label: "Freddie Mac PMMS release of Oct. 15, 2026",
    href: "https://freddiemac.gcs-web.com/news-releases/news-release-details/mortgage-rates-hold-steady-740/",
  },
  acsRelease: {
    label: "Census Bureau notice: 2025 ACS 1-year release on Oct. 29, 2026",
    href: "https://www.census.gov/newsroom/press-releases/2026/dates-announced-for-2025-acs-1-year-estimates.html",
  },
} as const;

export interface StateRow {
  fips: string;
  abbr: string;
  name: string;
  /** B25077_001E: median value of owner-occupied housing units, dollars */
  value: number;
  valueMoe: number;
  /** B25103_001E: median real estate taxes paid, dollars per year */
  tax: number;
  taxMoe: number;
  /** B19013_001E: median household income, dollars per year */
  income: number;
  incomeMoe: number;
}

export const US_ROW: StateRow = {
  fips: "00",
  abbr: "US",
  name: "United States",
  value: 360600,
  valueMoe: 618,
  tax: 3211,
  taxMoe: 7,
  income: 81604,
  incomeMoe: 128,
};

export const STATE_ROWS: StateRow[] = [
  { fips: "01", abbr: "AL", name: "Alabama", value: 233300, valueMoe: 2461, tax: 890, taxMoe: 17, income: 66659, incomeMoe: 780 },
  { fips: "02", abbr: "AK", name: "Alaska", value: 376500, valueMoe: 7020, tax: 3976, taxMoe: 149, income: 95665, incomeMoe: 3278 },
  { fips: "04", abbr: "AZ", name: "Arizona", value: 426000, valueMoe: 2728, tax: 1828, taxMoe: 17, income: 81486, incomeMoe: 684 },
  { fips: "05", abbr: "AR", name: "Arkansas", value: 215600, valueMoe: 3253, tax: 1113, taxMoe: 21, income: 62106, incomeMoe: 831 },
  { fips: "06", abbr: "CA", name: "California", value: 759500, valueMoe: 3644, tax: 5369, taxMoe: 34, income: 100149, incomeMoe: 381 },
  { fips: "08", abbr: "CO", name: "Colorado", value: 574600, valueMoe: 3773, tax: 2828, taxMoe: 25, income: 97113, incomeMoe: 1081 },
  { fips: "09", abbr: "CT", name: "Connecticut", value: 396900, valueMoe: 3745, tax: 6573, taxMoe: 47, income: 96049, incomeMoe: 1824 },
  { fips: "10", abbr: "DE", name: "Delaware", value: 371600, valueMoe: 4972, tax: 1750, taxMoe: 40, income: 87534, incomeMoe: 2747 },
  { fips: "11", abbr: "DC", name: "District of Columbia", value: 733400, valueMoe: 25632, tax: 4594, taxMoe: 245, income: 109707, incomeMoe: 4149 },
  { fips: "12", abbr: "FL", name: "Florida", value: 396900, valueMoe: 1617, tax: 2993, taxMoe: 20, income: 77735, incomeMoe: 564 },
  { fips: "13", abbr: "GA", name: "Georgia", value: 343300, valueMoe: 2287, tax: 2554, taxMoe: 26, income: 79991, incomeMoe: 633 },
  { fips: "15", abbr: "HI", name: "Hawaii", value: 875900, valueMoe: 14013, tax: 2385, taxMoe: 58, income: 100745, incomeMoe: 1760 },
  { fips: "16", abbr: "ID", name: "Idaho", value: 446400, valueMoe: 5301, tax: 1912, taxMoe: 27, income: 81166, incomeMoe: 1340 },
  { fips: "17", abbr: "IL", name: "Illinois", value: 280700, valueMoe: 1768, tax: 5399, taxMoe: 43, income: 83211, incomeMoe: 898 },
  { fips: "18", abbr: "IN", name: "Indiana", value: 243500, valueMoe: 1916, tax: 1798, taxMoe: 19, income: 71959, incomeMoe: 630 },
  { fips: "19", abbr: "IA", name: "Iowa", value: 227300, valueMoe: 2299, tax: 2937, taxMoe: 34, income: 75501, incomeMoe: 1016 },
  { fips: "20", abbr: "KS", name: "Kansas", value: 238700, valueMoe: 2937, tax: 2983, taxMoe: 45, income: 75514, incomeMoe: 996 },
  { fips: "21", abbr: "KY", name: "Kentucky", value: 226000, valueMoe: 2611, tax: 1611, taxMoe: 26, income: 64526, incomeMoe: 1165 },
  { fips: "22", abbr: "LA", name: "Louisiana", value: 223200, valueMoe: 2575, tax: 1187, taxMoe: 31, income: 60986, incomeMoe: 803 },
  { fips: "23", abbr: "ME", name: "Maine", value: 341900, valueMoe: 4987, tax: 3103, taxMoe: 56, income: 76442, incomeMoe: 1354 },
  { fips: "24", abbr: "MD", name: "Maryland", value: 436300, valueMoe: 3089, tax: 4144, taxMoe: 40, income: 102905, incomeMoe: 1404 },
  { fips: "25", abbr: "MA", name: "Massachusetts", value: 607400, valueMoe: 3979, tax: 6080, taxMoe: 39, income: 104828, incomeMoe: 1650 },
  { fips: "26", abbr: "MI", name: "Michigan", value: 254200, valueMoe: 1616, tax: 2988, taxMoe: 19, income: 72389, incomeMoe: 567 },
  { fips: "27", abbr: "MN", name: "Minnesota", value: 344600, valueMoe: 1807, tax: 3501, taxMoe: 24, income: 87117, incomeMoe: 961 },
  { fips: "28", abbr: "MS", name: "Mississippi", value: 186500, valueMoe: 3787, tax: 1221, taxMoe: 29, income: 59127, incomeMoe: 1560 },
  { fips: "29", abbr: "MO", name: "Missouri", value: 254400, valueMoe: 2059, tax: 2021, taxMoe: 29, income: 71589, incomeMoe: 703 },
  { fips: "30", abbr: "MT", name: "Montana", value: 425400, valueMoe: 10246, tax: 2939, taxMoe: 57, income: 75340, incomeMoe: 1635 },
  { fips: "31", abbr: "NE", name: "Nebraska", value: 263100, valueMoe: 3117, tax: 3739, taxMoe: 49, income: 76376, incomeMoe: 1384 },
  { fips: "32", abbr: "NV", name: "Nevada", value: 455500, valueMoe: 3836, tax: 2143, taxMoe: 48, income: 81134, incomeMoe: 1112 },
  { fips: "33", abbr: "NH", name: "New Hampshire", value: 458800, valueMoe: 6138, tax: 6707, taxMoe: 88, income: 99782, incomeMoe: 2489 },
  { fips: "34", abbr: "NJ", name: "New Jersey", value: 496000, valueMoe: 2982, tax: 9358, taxMoe: 53, income: 104294, incomeMoe: 997 },
  { fips: "35", abbr: "NM", name: "New Mexico", value: 279900, valueMoe: 4338, tax: 1776, taxMoe: 45, income: 67816, incomeMoe: 1867 },
  { fips: "36", abbr: "NY", name: "New York", value: 449800, valueMoe: 3718, tax: 6542, taxMoe: 47, income: 85820, incomeMoe: 653 },
  { fips: "37", abbr: "NC", name: "North Carolina", value: 333000, valueMoe: 1908, tax: 2044, taxMoe: 20, income: 73958, incomeMoe: 863 },
  { fips: "38", abbr: "ND", name: "North Dakota", value: 266100, valueMoe: 5332, tax: 2550, taxMoe: 64, income: 77871, incomeMoe: 2755 },
  { fips: "39", abbr: "OH", name: "Ohio", value: 239800, valueMoe: 1395, tax: 2937, taxMoe: 20, income: 72212, incomeMoe: 538 },
  { fips: "40", abbr: "OK", name: "Oklahoma", value: 222100, valueMoe: 2147, tax: 1672, taxMoe: 24, income: 66148, incomeMoe: 663 },
  { fips: "41", abbr: "OR", name: "Oregon", value: 497500, valueMoe: 3618, tax: 3895, taxMoe: 40, income: 85220, incomeMoe: 1399 },
  { fips: "42", abbr: "PA", name: "Pennsylvania", value: 277600, valueMoe: 1517, tax: 3214, taxMoe: 26, income: 77545, incomeMoe: 816 },
  { fips: "44", abbr: "RI", name: "Rhode Island", value: 455700, valueMoe: 6647, tax: 4886, taxMoe: 76, income: 83504, incomeMoe: 3548 },
  { fips: "45", abbr: "SC", name: "South Carolina", value: 299500, valueMoe: 3303, tax: 1337, taxMoe: 15, income: 72350, incomeMoe: 959 },
  { fips: "46", abbr: "SD", name: "South Dakota", value: 289600, valueMoe: 6421, tax: 2940, taxMoe: 67, income: 76881, incomeMoe: 1990 },
  { fips: "47", abbr: "TN", name: "Tennessee", value: 332600, valueMoe: 2448, tax: 1488, taxMoe: 17, income: 71997, incomeMoe: 638 },
  { fips: "48", abbr: "TX", name: "Texas", value: 313200, valueMoe: 1780, tax: 4108, taxMoe: 42, income: 79721, incomeMoe: 564 },
  { fips: "49", abbr: "UT", name: "Utah", value: 545200, valueMoe: 6188, tax: 2648, taxMoe: 22, income: 96658, incomeMoe: 1179 },
  { fips: "50", abbr: "VT", name: "Vermont", value: 352800, valueMoe: 7277, tax: 5026, taxMoe: 131, income: 82730, incomeMoe: 1846 },
  { fips: "51", abbr: "VA", name: "Virginia", value: 403500, valueMoe: 3411, tax: 2872, taxMoe: 25, income: 92090, incomeMoe: 831 },
  { fips: "53", abbr: "WA", name: "Washington", value: 602200, valueMoe: 3897, tax: 4729, taxMoe: 41, income: 99389, incomeMoe: 1322 },
  { fips: "54", abbr: "WV", name: "West Virginia", value: 170800, valueMoe: 2594, tax: 881, taxMoe: 19, income: 60798, incomeMoe: 1120 },
  { fips: "55", abbr: "WI", name: "Wisconsin", value: 294700, valueMoe: 1862, tax: 3680, taxMoe: 23, income: 77488, incomeMoe: 902 },
  { fips: "56", abbr: "WY", name: "Wyoming", value: 339500, valueMoe: 8452, tax: 1947, taxMoe: 50, income: 75532, incomeMoe: 2468 },
];

/** Standard fixed-rate payment: M = P * r / (1 - (1 + r)^-n) */
export function monthlyPrincipalInterest(
  loan: number,
  annualRatePct: number,
  years: number = REPORT.termYears,
): number {
  const r = annualRatePct / 100 / 12;
  const n = years * 12;
  return (loan * r) / (1 - Math.pow(1 + r, -n));
}

function paymentFor(value: number, tax: number, ratePct: number) {
  const loan = value * (1 - REPORT.downPaymentPct / 100);
  const pi = monthlyPrincipalInterest(loan, ratePct);
  return { loan, pi, taxMonthly: tax / 12, total: pi + tax / 12 };
}

export interface StateResult extends StateRow {
  /** 1 = payment takes the smallest share of income */
  rank: number;
  downPayment: number;
  loan: number;
  pi: number;
  taxMonthly: number;
  payment: number;
  incomeMonthly: number;
  /** payment as % of gross monthly income */
  share: number;
  /** conservative range using every input at its 90% margin of error */
  shareLow: number;
  shareHigh: number;
  /** annual income needed for the payment to equal the guideline share */
  incomeNeeded: number;
  priceToIncome: number;
  /** median tax / median value, % */
  taxRate: number;
  paymentYearAgoRate: number;
  shareYearAgoRate: number;
}

export function computeRow(row: StateRow, ratePct: number = REPORT.mortgageRate): Omit<StateResult, "rank"> {
  const base = paymentFor(row.value, row.tax, ratePct);
  const low = paymentFor(row.value - row.valueMoe, row.tax - row.taxMoe, ratePct);
  const high = paymentFor(row.value + row.valueMoe, row.tax + row.taxMoe, ratePct);
  const yearAgo = paymentFor(row.value, row.tax, REPORT.mortgageRateYearAgo);
  const incomeMonthly = row.income / 12;

  return {
    ...row,
    downPayment: row.value * (REPORT.downPaymentPct / 100),
    loan: base.loan,
    pi: base.pi,
    taxMonthly: base.taxMonthly,
    payment: base.total,
    incomeMonthly,
    share: (base.total / incomeMonthly) * 100,
    shareLow: (low.total / ((row.income + row.incomeMoe) / 12)) * 100,
    shareHigh: (high.total / ((row.income - row.incomeMoe) / 12)) * 100,
    incomeNeeded: (base.total * 12) / (REPORT.guidelinePct / 100),
    priceToIncome: row.value / row.income,
    taxRate: (row.tax / row.value) * 100,
    paymentYearAgoRate: yearAgo.total,
    shareYearAgoRate: (yearAgo.total / incomeMonthly) * 100,
  };
}

/** All 50 states and DC, ranked from most to least affordable at the report rate. */
export const STATE_RESULTS: StateResult[] = STATE_ROWS.map((r) => computeRow(r))
  .sort((a, b) => a.share - b.share)
  .map((r, i) => ({ ...r, rank: i + 1 }));

export const US_RESULT = computeRow(US_ROW);

export function getStateResult(abbr: string): StateResult | undefined {
  return STATE_RESULTS.find((r) => r.abbr === abbr);
}

/** National and state-level share of income at an arbitrary mortgage rate. */
export function sensitivityAt(ratePct: number) {
  const us = computeRow(US_ROW, ratePct);
  const shares = STATE_ROWS.map((r) => computeRow(r, ratePct));
  return {
    rate: ratePct,
    usPayment: us.payment,
    usShare: us.share,
    overGuideline: shares.filter((s) => s.share > REPORT.guidelinePct).length,
  };
}

const round = (n: number, digits = 0) => {
  const f = Math.pow(10, digits);
  return Math.round(n * f) / f;
};

export const CSV_HEADER = [
  "rank_1_most_affordable",
  "state",
  "abbr",
  "fips",
  "median_home_value_usd",
  "median_home_value_moe90_usd",
  "median_property_tax_paid_usd",
  "median_property_tax_moe90_usd",
  "median_household_income_usd",
  "median_household_income_moe90_usd",
  "down_payment_usd",
  "loan_amount_usd",
  "mortgage_rate_pct",
  "monthly_principal_interest_usd",
  "monthly_property_tax_usd",
  "monthly_payment_usd",
  "payment_share_of_gross_income_pct",
  "share_range_low_pct",
  "share_range_high_pct",
  "income_needed_at_28pct_usd",
  "price_to_income_ratio",
  "effective_property_tax_rate_pct",
  "monthly_payment_at_year_ago_rate_usd",
  "share_at_year_ago_rate_pct",
] as const;

function csvLine(r: StateResult | (Omit<StateResult, "rank"> & { rank?: number })): string {
  const cells: (string | number)[] = [
    r.rank ?? "",
    r.name,
    r.abbr,
    r.fips,
    r.value,
    r.valueMoe,
    r.tax,
    r.taxMoe,
    r.income,
    r.incomeMoe,
    round(r.downPayment),
    round(r.loan),
    REPORT.mortgageRate,
    round(r.pi),
    round(r.taxMonthly),
    round(r.payment),
    round(r.share, 2),
    round(r.shareLow, 2),
    round(r.shareHigh, 2),
    round(r.incomeNeeded),
    round(r.priceToIncome, 2),
    round(r.taxRate, 2),
    round(r.paymentYearAgoRate),
    round(r.shareYearAgoRate, 2),
  ];
  return cells
    .map((c) => (typeof c === "string" && /[",\n]/.test(c) ? `"${c.replace(/"/g, '""')}"` : String(c)))
    .join(",");
}

export function buildCsv(): string {
  return [
    CSV_HEADER.join(","),
    ...STATE_RESULTS.map(csvLine),
    csvLine(US_RESULT),
  ].join("\n") + "\n";
}

export const usd0 = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

export const pct1 = (n: number) => `${n.toFixed(1)}%`;
