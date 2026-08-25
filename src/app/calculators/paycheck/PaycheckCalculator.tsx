"use client";

import { useState, useMemo } from "react";
import { InputField } from "@/components/InputField";

function formatCurrency(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function formatCurrencyExact(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });
}

type PayFrequency = "weekly" | "biweekly" | "semimonthly" | "monthly";
type FilingStatus = "single" | "mfj" | "hoh";

const PAY_PERIODS: Record<PayFrequency, number> = {
  weekly: 52,
  biweekly: 26,
  semimonthly: 24,
  monthly: 12,
};

const STANDARD_DEDUCTIONS: Record<FilingStatus, number> = {
  single: 15000,
  mfj: 30000,
  hoh: 22500,
};

const FEDERAL_BRACKETS: Record<FilingStatus, { rate: number; upTo: number }[]> = {
  single: [
    { rate: 0.10, upTo: 11600 },
    { rate: 0.12, upTo: 47150 },
    { rate: 0.22, upTo: 100525 },
    { rate: 0.24, upTo: 191950 },
    { rate: 0.32, upTo: 243725 },
    { rate: 0.35, upTo: 609350 },
  ],
  mfj: [
    { rate: 0.10, upTo: 23200 },
    { rate: 0.12, upTo: 94300 },
    { rate: 0.22, upTo: 201050 },
    { rate: 0.24, upTo: 383900 },
    { rate: 0.32, upTo: 487450 },
    { rate: 0.35, upTo: 1218700 },
  ],
  hoh: [
    { rate: 0.10, upTo: 17400 },
    { rate: 0.12, upTo: 65700 },
    { rate: 0.22, upTo: 150788 },
    { rate: 0.24, upTo: 287925 },
    { rate: 0.32, upTo: 365587 },
    { rate: 0.35, upTo: 914025 },
  ],
};

const SOCIAL_SECURITY_RATE = 0.062;
const SOCIAL_SECURITY_WAGE_BASE = 168600;
const MEDICARE_RATE = 0.0145;
const MEDICARE_SURTAX_RATE = 0.009;
const MEDICARE_SURTAX_THRESHOLD_SINGLE = 200000;
const MEDICARE_SURTAX_THRESHOLD_MFJ = 250000;

function calculateFederalTax(taxableIncome: number, status: FilingStatus): number {
  if (taxableIncome <= 0) return 0;
  const brackets = FEDERAL_BRACKETS[status];
  let tax = 0;
  let prev = 0;
  for (const bracket of brackets) {
    if (taxableIncome <= prev) break;
    const amount = Math.min(taxableIncome, bracket.upTo) - prev;
    if (amount > 0) tax += amount * bracket.rate;
    prev = bracket.upTo;
  }
  if (taxableIncome > brackets[brackets.length - 1].upTo) {
    tax += (taxableIncome - brackets[brackets.length - 1].upTo) * 0.37;
  }
  return tax;
}

interface Props {
  defaults?: Record<string, string>;
}

export function PaycheckCalculator({ defaults }: Props) {
  const [annualSalary, setAnnualSalary] = useState(defaults?.annualSalary || "75000");
  const [payFrequency, setPayFrequency] = useState<PayFrequency>(
    (defaults?.payFrequency as PayFrequency) || "biweekly"
  );
  const [filingStatus, setFilingStatus] = useState<FilingStatus>(
    (defaults?.filingStatus as FilingStatus) || "single"
  );
  const [retirement401k, setRetirement401k] = useState(defaults?.retirement401k || "6");
  const [stateTaxRate, setStateTaxRate] = useState(defaults?.stateTaxRate || "5");

  const results = useMemo(() => {
    const salary = parseFloat(annualSalary) || 0;
    const retirementPct = (parseFloat(retirement401k) || 0) / 100;
    const stateRate = (parseFloat(stateTaxRate) || 0) / 100;
    const periods = PAY_PERIODS[payFrequency];

    if (salary <= 0) return null;

    const annual401k = salary * retirementPct;
    const taxableIncomeForFederal = Math.max(0, salary - annual401k - STANDARD_DEDUCTIONS[filingStatus]);

    const federalTax = calculateFederalTax(taxableIncomeForFederal, filingStatus);

    const socialSecurity = Math.min(salary, SOCIAL_SECURITY_WAGE_BASE) * SOCIAL_SECURITY_RATE;

    const medicareSurtaxThreshold =
      filingStatus === "mfj" ? MEDICARE_SURTAX_THRESHOLD_MFJ : MEDICARE_SURTAX_THRESHOLD_SINGLE;
    const medicare =
      salary * MEDICARE_RATE +
      Math.max(0, salary - medicareSurtaxThreshold) * MEDICARE_SURTAX_RATE;

    const stateTax = (salary - annual401k) * stateRate;

    const totalDeductions = federalTax + socialSecurity + medicare + stateTax + annual401k;
    const annualTakeHome = salary - totalDeductions;
    const perPaycheck = annualTakeHome / periods;

    return {
      grossPerPaycheck: salary / periods,
      federalTax,
      federalTaxPerPaycheck: federalTax / periods,
      socialSecurity,
      socialSecurityPerPaycheck: socialSecurity / periods,
      medicare,
      medicarePerPaycheck: medicare / periods,
      stateTax,
      stateTaxPerPaycheck: stateTax / periods,
      annual401k,
      retirement401kPerPaycheck: annual401k / periods,
      annualTakeHome,
      perPaycheck,
      effectiveTaxRate: ((federalTax + socialSecurity + medicare + stateTax) / salary) * 100,
      periods,
    };
  }, [annualSalary, payFrequency, filingStatus, retirement401k, stateTaxRate]);

  return (
    <div>
      <p className="mb-4 text-sm text-ink-500">
        Estimate your take-home pay per paycheck after taxes, Social Security, Medicare, and retirement contributions.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <InputField
          label="Annual Salary"
          id="annualSalary"
          value={annualSalary}
          onChange={setAnnualSalary}
          prefix="$"
          min={0}
        />
        <div>
          <label htmlFor="payFrequency" className="block text-sm font-medium text-ink-700">
            Pay Frequency
          </label>
          <select
            id="payFrequency"
            value={payFrequency}
            onChange={(e) => setPayFrequency(e.target.value as PayFrequency)}
            className="mt-1 w-full rounded-lg border border-ink-300 bg-white px-3 py-2.5 text-ink-900 shadow-input focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          >
            <option value="weekly">Weekly (52 paychecks)</option>
            <option value="biweekly">Bi-weekly (26 paychecks)</option>
            <option value="semimonthly">Semi-monthly (24 paychecks)</option>
            <option value="monthly">Monthly (12 paychecks)</option>
          </select>
        </div>
        <div>
          <label htmlFor="filingStatus" className="block text-sm font-medium text-ink-700">
            Filing Status
          </label>
          <select
            id="filingStatus"
            value={filingStatus}
            onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}
            className="mt-1 w-full rounded-lg border border-ink-300 bg-white px-3 py-2.5 text-ink-900 shadow-input focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          >
            <option value="single">Single</option>
            <option value="mfj">Married Filing Jointly</option>
            <option value="hoh">Head of Household</option>
          </select>
        </div>
        <InputField
          label="401(k) Contribution"
          id="retirement401k"
          value={retirement401k}
          onChange={setRetirement401k}
          suffix="%"
          min={0}
          max={100}
          step={0.5}
          helpText="Percentage of gross salary contributed pre-tax"
        />
        <InputField
          label="State Income Tax Rate"
          id="stateTaxRate"
          value={stateTaxRate}
          onChange={setStateTaxRate}
          suffix="%"
          min={0}
          max={15}
          step={0.1}
          helpText="Enter 0% for states with no income tax (TX, FL, WA, etc.)"
        />
      </div>

      {results && (
        <div className="mt-8">
          <div className="mb-6 rounded-lg border border-ink-200 p-4 text-center">
            <p className="text-sm font-medium text-ink-600">Your Take-Home Pay Per Paycheck</p>
            <p className="mt-1 text-3xl font-bold text-ink-900">
              {formatCurrencyExact(results.perPaycheck)}
            </p>
            <p className="mt-1 text-sm text-ink-500">
              {formatCurrency(results.annualTakeHome)} per year ({results.periods} paychecks)
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-brand-50 p-4 text-center">
              <p className="text-sm font-medium text-brand-700">Federal Tax</p>
              <p className="mt-1 text-xl font-bold text-brand-900">
                {formatCurrency(results.federalTaxPerPaycheck)}
              </p>
              <p className="text-xs text-brand-600">{formatCurrency(results.federalTax)}/yr</p>
            </div>
            <div className="rounded-lg bg-accent-50 p-4 text-center">
              <p className="text-sm font-medium text-accent-700">FICA (SS + Medicare)</p>
              <p className="mt-1 text-xl font-bold text-accent-900">
                {formatCurrency(results.socialSecurityPerPaycheck + results.medicarePerPaycheck)}
              </p>
              <p className="text-xs text-accent-600">
                {formatCurrency(results.socialSecurity + results.medicare)}/yr
              </p>
            </div>
            <div className="rounded-lg bg-ink-100 p-4 text-center">
              <p className="text-sm font-medium text-ink-600">State Tax</p>
              <p className="mt-1 text-xl font-bold text-ink-800">
                {formatCurrency(results.stateTaxPerPaycheck)}
              </p>
              <p className="text-xs text-ink-500">{formatCurrency(results.stateTax)}/yr</p>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto rounded-lg border border-ink-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-medium text-ink-700">Deduction</th>
                  <th className="px-4 py-3 text-right font-medium text-ink-700">Per Paycheck</th>
                  <th className="px-4 py-3 text-right font-medium text-ink-700">Annual</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-ink-100">
                  <td className="px-4 py-3 text-ink-800">Gross Pay</td>
                  <td className="px-4 py-3 text-right text-ink-600">{formatCurrencyExact(results.grossPerPaycheck)}</td>
                  <td className="px-4 py-3 text-right text-ink-600">{formatCurrency(parseFloat(annualSalary) || 0)}</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className="px-4 py-3 text-ink-800">Federal Income Tax</td>
                  <td className="px-4 py-3 text-right text-red-600">-{formatCurrencyExact(results.federalTaxPerPaycheck)}</td>
                  <td className="px-4 py-3 text-right text-red-600">-{formatCurrency(results.federalTax)}</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className="px-4 py-3 text-ink-800">Social Security</td>
                  <td className="px-4 py-3 text-right text-red-600">-{formatCurrencyExact(results.socialSecurityPerPaycheck)}</td>
                  <td className="px-4 py-3 text-right text-red-600">-{formatCurrency(results.socialSecurity)}</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className="px-4 py-3 text-ink-800">Medicare</td>
                  <td className="px-4 py-3 text-right text-red-600">-{formatCurrencyExact(results.medicarePerPaycheck)}</td>
                  <td className="px-4 py-3 text-right text-red-600">-{formatCurrency(results.medicare)}</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className="px-4 py-3 text-ink-800">State Income Tax</td>
                  <td className="px-4 py-3 text-right text-red-600">-{formatCurrencyExact(results.stateTaxPerPaycheck)}</td>
                  <td className="px-4 py-3 text-right text-red-600">-{formatCurrency(results.stateTax)}</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className="px-4 py-3 text-ink-800">401(k) Contribution</td>
                  <td className="px-4 py-3 text-right text-blue-600">-{formatCurrencyExact(results.retirement401kPerPaycheck)}</td>
                  <td className="px-4 py-3 text-right text-blue-600">-{formatCurrency(results.annual401k)}</td>
                </tr>
                <tr className="bg-ink-50 font-medium">
                  <td className="px-4 py-3 text-ink-900">Take-Home Pay</td>
                  <td className="px-4 py-3 text-right text-ink-900">{formatCurrencyExact(results.perPaycheck)}</td>
                  <td className="px-4 py-3 text-right text-ink-900">{formatCurrency(results.annualTakeHome)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 rounded-lg bg-brand-50 p-4">
            <p className="text-sm font-semibold text-brand-800">
              Effective tax rate: {results.effectiveTaxRate.toFixed(1)}% of gross income goes to taxes
              (excluding 401(k) contributions which grow tax-deferred in your retirement account).
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
