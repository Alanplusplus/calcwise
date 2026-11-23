/**
 * Model behind the "How Much Should a Freelancer Charge?" guide: the revenue and hourly rate a freelancer
 * needs to end up with the same spendable cash, health coverage, and retirement saving as an employee on a
 * given salary. Everything is federal, single filer, tax year 2026, with no state or local tax on either side.
 *
 * Employee side: the salary, minus the worker's share of the health premium (a pre-tax cafeteria-plan
 * deduction, so it lowers both income-tax wages and Social Security and Medicare wages), minus federal income
 * tax on wages after the standard deduction, minus the employee's 7.65% payroll tax. The employer also pays
 * the other 7.65%, the rest of the health premium, and a retirement match; those are not cash to the worker.
 *
 * Freelancer side: net profit P (revenue minus business expenses). The freelancer pays self-employment tax
 * on P, buys the whole health premium (an above-the-line deduction), puts the same dollars in a solo 401(k)
 * that the employer would have matched (also deducted), and takes the 20% qualified business income
 * deduction. P is found by bisection so the freelancer's cash equals the employee's cash.
 *
 * The inputs below are planning assumptions, not statistics: change them and the answer moves.
 */

import {
  STANDARD_DEDUCTIONS,
  federalIncomeTax,
  selfEmploymentTax,
  SOCIAL_SECURITY_EMPLOYEE_RATE,
  SOCIAL_SECURITY_WAGE_BASE,
  MEDICARE_EMPLOYEE_RATE,
} from "./tax-data";
import {
  KFF_EMPLOYER_SHARE_SINGLE_2026,
  KFF_SINGLE_PREMIUM_2026,
  KFF_WORKER_SHARE_SINGLE_2026,
  STANDARD_PAID_HOURS_PER_YEAR,
} from "./wage-data";

export const FREELANCE_ASSUMPTIONS = {
  /** employer 401(k) match, percent of salary, that the freelancer replaces with their own solo 401(k) contribution */
  employerMatchPct: 4,
  /** software, liability insurance, accounting, equipment, and similar costs, dollars a year */
  businessExpenses: 6_000,
  /** days a year the freelancer does not work and does not bill, each 8 hours */
  vacationDays: 15,
  holidays: 10,
  sickDays: 5,
  /** share of available working hours that are billed to a client; the rest is sales, admin, and bookkeeping */
  baseUtilizationPct: 70,
  utilizationScenarios: [60, 70, 80],
  hoursPerDay: 8,
} as const;

const A = FREELANCE_ASSUMPTIONS;

export const HEALTH = {
  /** KFF 2026 average annual single premium: what the freelancer is assumed to pay in full */
  totalPremium: KFF_SINGLE_PREMIUM_2026,
  /** the part an average covered worker pays from their paycheck */
  workerShare: KFF_WORKER_SHARE_SINGLE_2026,
  /** the part an average employer pays */
  employerShare: KFF_EMPLOYER_SHARE_SINGLE_2026,
} as const;

const STD = STANDARD_DEDUCTIONS.single;

/** Hours a freelancer can sell: paid hours of a full-time job minus the days off that a paycheck would still pay for. */
export const HOURS = (() => {
  const paid = STANDARD_PAID_HOURS_PER_YEAR;
  const offDays = A.vacationDays + A.holidays + A.sickDays;
  const off = offDays * A.hoursPerDay;
  const available = paid - off;
  const billableAt = (utilizationPct: number) => available * (utilizationPct / 100);
  return {
    paid,
    offDays,
    off,
    available,
    weeks: available / 40,
    billableAt,
    base: billableAt(A.baseUtilizationPct),
  };
})();

export interface W2Package {
  salary: number;
  healthWorkerShare: number;
  /** wages subject to income tax and payroll tax after the pre-tax premium */
  wages: number;
  taxable: number;
  federal: number;
  ss: number;
  medicare: number;
  fica: number;
  /** spendable cash after the premium share, federal income tax, and payroll tax */
  cash: number;
  employerHealth: number;
  employerMatch: number;
  hourly: number;
}

export function w2Package(salary: number): W2Package {
  const wages = salary - HEALTH.workerShare;
  const taxable = Math.max(0, wages - STD);
  const federal = federalIncomeTax(taxable, "single");
  const ss = Math.min(wages, SOCIAL_SECURITY_WAGE_BASE) * SOCIAL_SECURITY_EMPLOYEE_RATE;
  const medicare = wages * MEDICARE_EMPLOYEE_RATE;
  return {
    salary,
    healthWorkerShare: HEALTH.workerShare,
    wages,
    taxable,
    federal,
    ss,
    medicare,
    fica: ss + medicare,
    cash: wages - federal - ss - medicare,
    employerHealth: HEALTH.employerShare,
    employerMatch: salary * (A.employerMatchPct / 100),
    hourly: salary / STANDARD_PAID_HOURS_PER_YEAR,
  };
}

export interface FreelanceYear {
  revenue: number;
  expenses: number;
  /** revenue minus business expenses */
  profit: number;
  seTax: number;
  /** the deductible half of self-employment tax */
  seTaxDeduction: number;
  health: number;
  retirement: number;
  /** profit minus the deductible half of SE tax, the health premium, and the retirement contribution */
  agi: number;
  taxableBeforeQbi: number;
  qbi: number;
  taxable: number;
  federal: number;
  /** profit minus SE tax, income tax, the health premium, and the retirement contribution */
  cash: number;
  /** self-employment tax plus federal income tax, as a share of profit */
  taxShareOfProfit: number;
}

/** One freelance year from a given revenue, with the premium and retirement contribution held fixed. */
export function freelanceYear(revenue: number, retirement: number, expenses: number = A.businessExpenses): FreelanceYear {
  const profit = revenue - expenses;
  const se = selfEmploymentTax(profit);
  const seTaxDeduction = se.total / 2;
  const health = HEALTH.totalPremium;
  const agi = profit - seTaxDeduction - health - retirement;
  const taxableBeforeQbi = Math.max(0, agi - STD);
  // QBI is profit less the same three deductions, which is agi; 20% of it is capped by 20% of taxable income before the deduction.
  const qbi = Math.min(0.2 * Math.max(0, agi), 0.2 * taxableBeforeQbi);
  const taxable = taxableBeforeQbi - qbi;
  const federal = federalIncomeTax(taxable, "single");
  const cash = profit - se.total - federal - health - retirement;
  return {
    revenue,
    expenses,
    profit,
    seTax: se.total,
    seTaxDeduction,
    health,
    retirement,
    agi,
    taxableBeforeQbi,
    qbi,
    taxable,
    federal,
    cash,
    taxShareOfProfit: profit > 0 ? ((se.total + federal) / profit) * 100 : 0,
  };
}

export interface FreelanceRequirement extends FreelanceYear {
  w2: W2Package;
  /** revenue divided by the employee's salary */
  multiple: number;
  /** required revenue divided by the billable hours at the base utilization */
  hourly: number;
}

/** The revenue at which a freelancer's cash equals the employee's cash on the same salary. */
export function freelanceRequirement(salary: number): FreelanceRequirement {
  const w2 = w2Package(salary);
  const retirement = w2.employerMatch;
  let lo = 0;
  let hi = 10_000_000;
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    if (freelanceYear(mid + A.businessExpenses, retirement).cash < w2.cash) lo = mid;
    else hi = mid;
  }
  const revenue = (lo + hi) / 2 + A.businessExpenses;
  const year = freelanceYear(revenue, retirement);
  return { ...year, w2, multiple: revenue / salary, hourly: revenue / HOURS.base };
}
