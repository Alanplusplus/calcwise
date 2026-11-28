/**
 * Model behind the "Is a Long Commute Worth It?" guide: what a job's pay is worth per hour once the hours
 * spent getting to it and the cost of the miles are counted.
 *
 * Pay side: a single filer, tax year 2026, wages only. Take-home is salary minus federal income tax on wages
 * after the standard deduction minus the 7.65% employee payroll tax (Social Security stops at the wage base).
 * State and local income tax and pre-tax deductions are left out on both sides of every comparison.
 *
 * Commute side: miles and hours follow from the one-way minutes at a fixed door-to-door speed. Car cost is
 * cents per mile times miles, and the guide shows two prices: the AAA 2026 fuel plus maintenance cost, which
 * is what an extra mile adds to a car you already own, and the IRS 2026 business mileage rate, which also
 * prices in depreciation, insurance, and registration and is used here only as an all-in yardstick (commuting
 * itself is not deductible).
 *
 * Real take-home per hour = (take-home pay - car cost) / (job hours + weight x commute hours). With weight 1
 * a commute hour counts as much as a working hour, the strictest view; weight 0 ignores commute time.
 *
 * The inputs below are planning assumptions, not statistics: change them and the answer moves.
 */

import { AAA } from "./reports/car-ownership-by-state";
import { REPORT as COMMUTE_REPORT } from "./reports/commute-time-by-state";
import {
  BUSINESS_MILEAGE_CENTS_2026,
  STANDARD_DEDUCTIONS,
  federalIncomeTax,
  MEDICARE_EMPLOYEE_RATE,
  SOCIAL_SECURITY_EMPLOYEE_RATE,
  SOCIAL_SECURITY_WAGE_BASE,
} from "./tax-data";

export const COMMUTE_ASSUMPTIONS = {
  /** days a year the job is worked, in the office or not; also the days the guide counts for a full-time office job */
  jobDays: COMMUTE_REPORT.commuteDays,
  /** hours in a working day */
  workdayHours: COMMUTE_REPORT.workdayHours,
  /** door-to-door speed used to turn minutes into miles */
  mph: 30,
  /** AAA fuel plus maintenance, cents per mile: what an extra mile adds to a car the worker already owns */
  operatingCentsPerMile: Math.round((AAA.fuelCentsPerMile + AAA.maintenanceCentsPerMile) * 10) / 10,
  /** IRS business standard mileage rate from July 1, 2026, cents per mile: an all-in yardstick */
  allInCentsPerMile: BUSINESS_MILEAGE_CENTS_2026.julToDec,
} as const;

const A = COMMUTE_ASSUMPTIONS;
const STD = STANDARD_DEDUCTIONS.single;

/** Hours worked in a year at the assumed days and hours. */
export const JOB_HOURS = A.jobDays * A.workdayHours;

export interface CommuteScenario {
  salary: number;
  /** minutes each way on a day in the office */
  oneWayMinutes: number;
  /** days a year the worker travels to the office (default: every job day) */
  officeDays?: number;
  /** cents per mile (default: the AAA operating cost) */
  centsPerMile?: number;
  /** how much a commute hour counts compared with a working hour, 0 to 1 (default: 1) */
  timeWeight?: number;
}

export interface CommuteYear {
  salary: number;
  federal: number;
  payroll: number;
  takeHome: number;
  jobHours: number;
  commuteHours: number;
  miles: number;
  carCost: number;
  /** take-home pay minus car cost */
  cash: number;
  /** take-home pay divided by job hours only: what the paycheck suggests */
  takeHomePerJobHour: number;
  /** cash divided by job hours plus weighted commute hours */
  realPerHour: number;
}

export function commuteYear(s: CommuteScenario): CommuteYear {
  const officeDays = s.officeDays ?? A.jobDays;
  const centsPerMile = s.centsPerMile ?? A.operatingCentsPerMile;
  const weight = s.timeWeight ?? 1;
  const federal = federalIncomeTax(Math.max(0, s.salary - STD));
  const payroll =
    Math.min(s.salary, SOCIAL_SECURITY_WAGE_BASE) * SOCIAL_SECURITY_EMPLOYEE_RATE + s.salary * MEDICARE_EMPLOYEE_RATE;
  const takeHome = s.salary - federal - payroll;
  const commuteHours = (officeDays * 2 * s.oneWayMinutes) / 60;
  const miles = officeDays * 2 * s.oneWayMinutes * (A.mph / 60);
  const carCost = (miles * centsPerMile) / 100;
  const cash = takeHome - carCost;
  return {
    salary: s.salary,
    federal,
    payroll,
    takeHome,
    jobHours: JOB_HOURS,
    commuteHours,
    miles,
    carCost,
    cash,
    takeHomePerJobHour: takeHome / JOB_HOURS,
    realPerHour: cash / (JOB_HOURS + weight * commuteHours),
  };
}

/** The salary at which a job with the given commute leaves the same real take-home per hour as `target`. */
export function breakEvenSalary(target: number, s: Omit<CommuteScenario, "salary">): number {
  let lo = 0;
  let hi = 10_000_000;
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    if (commuteYear({ ...s, salary: mid }).realPerHour < target) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

/**
 * The commute-hour weight at which two scenarios leave the same real take-home per hour. Below it the job
 * with the longer commute and bigger paycheck wins; above it the shorter commute wins.
 */
export function breakEvenWeight(near: CommuteYear, far: CommuteYear): number {
  return (JOB_HOURS * (far.cash - near.cash)) / (near.cash * far.commuteHours - far.cash * near.commuteHours);
}
