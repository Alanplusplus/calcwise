"use client";

import { useState, useMemo } from "react";
import { InputField } from "@/components/InputField";

function formatCurrency(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

interface Props {
  defaults?: Record<string, string>;
}

interface BreakdownRow {
  period: string;
  gross: number;
  net: number;
}

export function SalaryToHourlyCalculator({ defaults }: Props) {
  const [annualSalary, setAnnualSalary] = useState(defaults?.annualSalary || "65000");
  const [hoursPerWeek, setHoursPerWeek] = useState(defaults?.hoursPerWeek || "40");
  const [weeksPerYear, setWeeksPerYear] = useState(defaults?.weeksPerYear || "52");
  const [paidHolidays, setPaidHolidays] = useState(defaults?.paidHolidays || "10");
  const [vacationDays, setVacationDays] = useState(defaults?.vacationDays || "15");
  const [effectiveTaxRate, setEffectiveTaxRate] = useState(defaults?.effectiveTaxRate || "22");

  const results = useMemo(() => {
    const salary = parseFloat(annualSalary) || 0;
    const hpw = parseFloat(hoursPerWeek) || 0;
    const wpy = parseFloat(weeksPerYear) || 0;
    const holidays = parseFloat(paidHolidays) || 0;
    const vacation = parseFloat(vacationDays) || 0;
    const taxRate = (parseFloat(effectiveTaxRate) || 0) / 100;

    if (salary <= 0 || hpw <= 0 || wpy <= 0) return null;

    const totalHoursPerYear = hpw * wpy;
    const hourlyRate = salary / totalHoursPerYear;

    const paidTimeOffDays = holidays + vacation;
    const paidTimeOffHours = paidTimeOffDays * (hpw / 5);
    const actualWorkingHours = totalHoursPerYear - paidTimeOffHours;
    const effectiveHourlyRate = salary / actualWorkingHours;

    const afterTaxAnnual = salary * (1 - taxRate);
    const afterTaxHourly = afterTaxAnnual / totalHoursPerYear;
    const afterTaxEffective = afterTaxAnnual / actualWorkingHours;

    const monthly = salary / 12;
    const biweekly = salary / 26;
    const weekly = salary / wpy;
    const daily = salary / (wpy * 5);

    const afterTaxMonthly = afterTaxAnnual / 12;
    const afterTaxBiweekly = afterTaxAnnual / 26;
    const afterTaxWeekly = afterTaxAnnual / wpy;
    const afterTaxDaily = afterTaxAnnual / (wpy * 5);

    const breakdown: BreakdownRow[] = [
      { period: "Hourly", gross: hourlyRate, net: afterTaxHourly },
      { period: "Daily", gross: daily, net: afterTaxDaily },
      { period: "Weekly", gross: weekly, net: afterTaxWeekly },
      { period: "Bi-Weekly", gross: biweekly, net: afterTaxBiweekly },
      { period: "Monthly", gross: monthly, net: afterTaxMonthly },
      { period: "Annual", gross: salary, net: afterTaxAnnual },
    ];

    return {
      hourlyRate,
      effectiveHourlyRate,
      afterTaxHourly,
      afterTaxEffective,
      afterTaxAnnual,
      paidTimeOffDays,
      actualWorkingHours,
      totalHoursPerYear,
      breakdown,
    };
  }, [annualSalary, hoursPerWeek, weeksPerYear, paidHolidays, vacationDays, effectiveTaxRate]);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <InputField
          label="Annual Salary"
          id="annualSalary"
          value={annualSalary}
          onChange={setAnnualSalary}
          prefix="$"
          min={0}
          step={1000}
          helpText="Your gross annual salary"
        />
        <InputField
          label="Hours per Week"
          id="hoursPerWeek"
          value={hoursPerWeek}
          onChange={setHoursPerWeek}
          suffix="hrs"
          min={1}
          max={168}
          step={1}
          helpText="Standard work hours per week"
        />
        <InputField
          label="Weeks per Year"
          id="weeksPerYear"
          value={weeksPerYear}
          onChange={setWeeksPerYear}
          suffix="wks"
          min={1}
          max={52}
          step={1}
          helpText="Paid weeks per year"
        />
        <InputField
          label="Paid Holidays"
          id="paidHolidays"
          value={paidHolidays}
          onChange={setPaidHolidays}
          suffix="days"
          min={0}
          max={30}
          step={1}
          helpText="Company holidays per year"
        />
        <InputField
          label="Vacation Days"
          id="vacationDays"
          value={vacationDays}
          onChange={setVacationDays}
          suffix="days"
          min={0}
          max={60}
          step={1}
          helpText="Paid vacation days per year"
        />
        <InputField
          label="Effective Tax Rate"
          id="effectiveTaxRate"
          value={effectiveTaxRate}
          onChange={setEffectiveTaxRate}
          suffix="%"
          min={0}
          max={60}
          step={0.5}
          helpText="Combined federal + state tax rate"
        />
      </div>

      {results && (
        <div className="mt-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-brand-200 bg-brand-50 p-4">
              <p className="text-sm font-medium text-brand-700">Hourly Rate</p>
              <p className="mt-2 text-xl font-bold text-brand-900">
                {formatCurrency(results.hourlyRate)}
              </p>
              <p className="mt-1 text-sm text-brand-700">
                Before taxes
              </p>
            </div>
            <div className="rounded-lg border border-accent-200 bg-accent-50 p-4">
              <p className="text-sm font-medium text-accent-700">Effective Hourly Rate</p>
              <p className="mt-2 text-xl font-bold text-accent-900">
                {formatCurrency(results.effectiveHourlyRate)}
              </p>
              <p className="mt-1 text-sm text-accent-700">
                Excluding PTO ({results.paidTimeOffDays} days off)
              </p>
            </div>
            <div className="rounded-lg bg-ink-100 p-4">
              <p className="text-sm font-medium text-ink-600">After-Tax Hourly</p>
              <p className="mt-2 text-xl font-bold text-ink-800">
                {formatCurrency(results.afterTaxHourly)}
              </p>
              <p className="mt-1 text-sm text-ink-600">
                Take-home per hour
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-ink-100 p-4">
              <p className="text-sm font-medium text-ink-600">After-Tax Annual</p>
              <p className="mt-2 text-xl font-bold text-ink-800">
                {formatCurrency(results.afterTaxAnnual)}
              </p>
              <p className="mt-1 text-sm text-ink-600">
                Net annual income
              </p>
            </div>
            <div className="rounded-lg bg-ink-100 p-4">
              <p className="text-sm font-medium text-ink-600">Total Hours/Year</p>
              <p className="mt-2 text-xl font-bold text-ink-800">
                {results.totalHoursPerYear.toLocaleString()}
              </p>
              <p className="mt-1 text-sm text-ink-600">
                Paid hours per year
              </p>
            </div>
            <div className="rounded-lg bg-ink-100 p-4">
              <p className="text-sm font-medium text-ink-600">Actual Working Hours</p>
              <p className="mt-2 text-xl font-bold text-ink-800">
                {results.actualWorkingHours.toLocaleString()}
              </p>
              <p className="mt-1 text-sm text-ink-600">
                Excluding PTO
              </p>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto">
            <h3 className="mb-3 text-sm font-semibold text-ink-700">
              Pay Period Breakdown
            </h3>
            <table className="w-full min-w-[500px] text-left text-sm">
              <thead>
                <tr className="border-b border-ink-200 text-ink-500">
                  <th className="py-2 pr-4 font-medium">Period</th>
                  <th className="py-2 pr-4 font-medium">Gross Pay</th>
                  <th className="py-2 pr-4 font-medium">After Tax</th>
                </tr>
              </thead>
              <tbody>
                {results.breakdown.map((row) => (
                  <tr key={row.period} className="border-b border-ink-100">
                    <td className="py-2 pr-4 font-medium text-ink-800">{row.period}</td>
                    <td className="py-2 pr-4 text-ink-800">{formatCurrency(row.gross)}</td>
                    <td className="py-2 pr-4 text-green-700">{formatCurrency(row.net)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
