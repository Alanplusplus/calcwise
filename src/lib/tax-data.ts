/**
 * Federal tax constants for tax year 2026: the single source of truth for every
 * calculator, article, FAQ, and guide on the site.
 *
 * Do not paste bracket, deduction, wage-base, or threshold numbers anywhere else.
 * Import from here. When the IRS or SSA publish new figures, follow the
 * `tax-data-refresh` task in `.cursor/rules/refresh-content.mdc`.
 */

export type FilingStatus = "single" | "mfj" | "hoh";

export interface Bracket {
  rate: number;
  /** Upper edge of this bracket in dollars. Income above the last edge is taxed at the top rate. */
  upTo: number;
}

export interface TaxSource {
  label: string;
  href: string;
}

export const TAX_DATA = {
  taxYear: 2026,
  /** Date these figures were last compared against the sources below (ISO). */
  checkedOn: "2026-10-20",
  /** Same date, formatted for page text. */
  checkedOnLabel: "October 20, 2026",
} as const;

export const TAX_SOURCES = {
  revProc: {
    label: "IRS Rev. Proc. 2025-32 (tax year 2026 inflation adjustments)",
    href: "https://www.irs.gov/pub/irs-drop/rp-25-32.pdf",
  },
  irsRelease: {
    label: "IRS 2026 tax inflation adjustments (IR-2025-103)",
    href: "https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill",
  },
  ssaWageBase: {
    label: "SSA contribution and benefit base",
    href: "https://www.ssa.gov/oact/cola/cbb.html",
  },
  niit: {
    label: "IRS Topic 559, Net Investment Income Tax",
    href: "https://www.irs.gov/taxtopics/tc559",
  },
  additionalMedicare: {
    label: "IRS Additional Medicare Tax Q&A",
    href: "https://www.irs.gov/businesses/small-businesses-self-employed/questions-and-answers-for-the-additional-medicare-tax",
  },
  selfEmploymentTax: {
    label: "IRS Self-Employment Tax",
    href: "https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes",
  },
  capitalGains: {
    label: "IRS Topic 409, Capital Gains and Losses",
    href: "https://www.irs.gov/taxtopics/tc409",
  },
  federalRates: {
    label: "IRS federal income tax rates and brackets",
    href: "https://www.irs.gov/filing/federal-income-tax-rates-and-brackets",
  },
  retirementLimits: {
    label: "IRS IR-2025-111, 2026 retirement plan limits (Nov. 13, 2025)",
    href: "https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500",
  },
  hsaLimits: {
    label: "IRS Rev. Proc. 2025-19 (2026 HSA limits)",
    href: "https://www.irs.gov/pub/irs-drop/rp-25-19.pdf",
  },
  saltCap: {
    label: "IRS note on the 2026 state and local tax deduction limit",
    href: "https://www.irs.gov/forms-pubs/correction-to-state-and-local-income-tax-deduction-amount-in-the-2026-form-1040-es",
  },
  estimatedTaxForm: {
    label: "IRS Form 1040-ES (2026), estimated tax due dates",
    href: "https://www.irs.gov/pub/irs-pdf/f1040es.pdf",
  },
  underpaymentRate: {
    label: "IRS IR-2026-98, fourth quarter 2026 interest rates (Aug. 21, 2026)",
    href: "https://www.irs.gov/newsroom/interest-rates-remain-the-same-for-the-fourth-quarter-of-2026",
  },
  notice2025_67: {
    label: "IRS Notice 2025-67 (2026 retirement plan limits, including the $72,000 annual additions cap)",
    href: "https://www.irs.gov/pub/irs-drop/n-25-67.pdf",
  },
  soloK: {
    label: "IRS One-Participant 401(k) Plans",
    href: "https://www.irs.gov/retirement-plans/one-participant-401k-plans",
  },
  pub15b: {
    label: "IRS Publication 15-B (2026), dependent care FSA limit",
    href: "https://www.irs.gov/pub/irs-pdf/p15b.pdf",
  },
  mileage: {
    label: "IRS standard mileage rates",
    href: "https://www.irs.gov/tax-professionals/standard-mileage-rates",
  },
} as const satisfies Record<string, TaxSource>;

/** 2026 employer-plan and IRA contribution limits (IRS IR-2025-111 / Notice 2025-67). */
export const RETIREMENT_LIMITS = {
  /** 401(k), 403(b), governmental 457, TSP employee deferral. */
  employeeDeferral: 24500,
  /** Catch-up for age 50+ (total $32,500). */
  catchUp50: 8000,
  /** Higher catch-up for ages 60-63 (replaces the $8,000 catch-up). */
  catchUp60to63: 11250,
  ira: 7500,
  iraCatchUp50: 1100,
  /** Overall annual additions cap per participant in a defined contribution plan (IRC 415(c)), before catch-up. */
  definedContributionTotal: 72000,
} as const;

/** Qualified Business Income (section 199A) taxable-income thresholds for 2026 (Rev. Proc. 2025-32, section 4.26). */
export const QBI_THRESHOLDS = {
  single: 201750,
  mfj: 403500,
} as const;

/** Gift tax annual exclusion per recipient for 2026 (Rev. Proc. 2025-32, section 4.42). */
export const GIFT_ANNUAL_EXCLUSION = 19000;

/** Estimated tax payment due dates for tax year 2026 (Form 1040-ES). */
export const ESTIMATED_TAX_DUE_DATES_2026 = ["April 15, 2026", "June 15, 2026", "September 15, 2026", "January 15, 2027"] as const;

/** 2026 HSA contribution limits (Rev. Proc. 2025-19). The $1,000 catch-up for age 55+ is set by statute. */
export const HSA_LIMITS = {
  selfOnly: 4400,
  family: 8750,
  catchUp55: 1000,
} as const;

/** State and local tax (SALT) itemized-deduction cap for 2026; shrinks by 30% of MAGI above the threshold, never below $10,000. */
export const SALT_CAP = {
  limit: 40400,
  phaseOutMagi: 505000,
  floor: 10000,
} as const;

/** Maximum Child Tax Credit per child for 2026 (Rev. Proc. 2025-32, section 4.05). */
export const CHILD_TAX_CREDIT = 2200;

/** Employer cafeteria-plan limits for 2026: health FSA (Rev. Proc. 2025-32, section 4.15) and dependent care FSA (IRC 129, Pub. 15-B). */
export const FSA_LIMITS = {
  health: 3400,
  dependentCare: 7500,
} as const;

/** IRS business standard mileage rate for 2026, in cents per mile. The IRS raised it mid-year (Announcement 2026-11). */
export const BUSINESS_MILEAGE_CENTS_2026 = {
  janToJun: 72.5,
  julToDec: 76,
} as const;

/** Standard deduction by filing status (Rev. Proc. 2025-32, section 4.15). */
export const STANDARD_DEDUCTIONS: Record<FilingStatus, number> = {
  single: 16100,
  mfj: 32200,
  hoh: 24150,
};

/** Ordinary income brackets, 10% through 35%. Income above the last edge is taxed at TOP_ORDINARY_RATE. */
export const ORDINARY_BRACKETS: Record<FilingStatus, Bracket[]> = {
  single: [
    { rate: 0.1, upTo: 12400 },
    { rate: 0.12, upTo: 50400 },
    { rate: 0.22, upTo: 105700 },
    { rate: 0.24, upTo: 201775 },
    { rate: 0.32, upTo: 256225 },
    { rate: 0.35, upTo: 640600 },
  ],
  mfj: [
    { rate: 0.1, upTo: 24800 },
    { rate: 0.12, upTo: 100800 },
    { rate: 0.22, upTo: 211400 },
    { rate: 0.24, upTo: 403550 },
    { rate: 0.32, upTo: 512450 },
    { rate: 0.35, upTo: 768700 },
  ],
  hoh: [
    { rate: 0.1, upTo: 17700 },
    { rate: 0.12, upTo: 67450 },
    { rate: 0.22, upTo: 105700 },
    { rate: 0.24, upTo: 201750 },
    { rate: 0.32, upTo: 256200 },
    { rate: 0.35, upTo: 640600 },
  ],
};

export const TOP_ORDINARY_RATE = 0.37;

/**
 * Long-term capital gains: the 0% rate applies up to the first edge, 15% up to the second,
 * and LONG_TERM_TOP_RATE above that (Rev. Proc. 2025-32, section 4.03). The edges are
 * measured against taxable income, which includes the gain itself.
 */
export const LONG_TERM_BRACKETS: Record<FilingStatus, Bracket[]> = {
  single: [
    { rate: 0.0, upTo: 49450 },
    { rate: 0.15, upTo: 545500 },
  ],
  mfj: [
    { rate: 0.0, upTo: 98900 },
    { rate: 0.15, upTo: 613700 },
  ],
  hoh: [
    { rate: 0.0, upTo: 66200 },
    { rate: 0.15, upTo: 579600 },
  ],
};

export const LONG_TERM_TOP_RATE = 0.2;

/** Net Investment Income Tax: 3.8% on the lesser of investment income or MAGI above the threshold. Not inflation-indexed (IRC 1411). */
export const NIIT_RATE = 0.038;
export const NIIT_THRESHOLDS: Record<FilingStatus, number> = {
  single: 200000,
  mfj: 250000,
  hoh: 200000,
};

/** Social Security taxable maximum for 2026 (SSA). Earnings above this are not subject to the 6.2% / 12.4% tax. */
export const SOCIAL_SECURITY_WAGE_BASE = 184500;
export const SOCIAL_SECURITY_EMPLOYEE_RATE = 0.062;
export const SOCIAL_SECURITY_SELF_EMPLOYED_RATE = 0.124;
export const MEDICARE_EMPLOYEE_RATE = 0.0145;
export const MEDICARE_SELF_EMPLOYED_RATE = 0.029;

/** Additional Medicare Tax: 0.9% on wages/SE earnings above the threshold. Not inflation-indexed. */
export const ADDITIONAL_MEDICARE_RATE = 0.009;
export const ADDITIONAL_MEDICARE_THRESHOLDS: Record<"single" | "mfj", number> = {
  single: 200000,
  mfj: 250000,
};

/** Net earnings from self-employment are multiplied by this factor before SE tax is applied (IRC 1402). */
export const SE_EARNINGS_FACTOR = 0.9235;

/** Format a whole-dollar figure for page text, e.g. 184500 -> "$184,500". */
export function usd(n: number): string {
  return `$${n.toLocaleString("en-US")}`;
}
