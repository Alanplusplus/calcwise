"use client";

import { useState, useMemo } from "react";
import { InputField } from "@/components/InputField";

function formatCurrency(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function formatCurrencyExact(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

interface Props {
  defaults?: Record<string, string>;
}

export function HourlyToSalaryCalculator({ defaults }: Props) {
  const [hourlyRate, setHourlyRate] = useState(defaults?.hourlyRate || "25");
  const [hoursPerWeek, setHoursPerWeek] = useState(defaults?.hoursPerWeek || "40");
  const [weeksPerYear, setWeeksPerYear] = useState(defaults?.weeksPerYear || "52");
  const [ptoWeeks, setPtoWeeks] = useState(defaults?.ptoWeeks || "2");
  const [overtimeHours, setOvertimeHours] = useState(defaults?.overtimeHours || "0");
  const [overtimeMultiplier, setOvertimeMultiplier] = useState(defaults?.overtimeMultiplier || "1.5");
  const [federalTaxRate, setFederalTaxRate] = useState(defaults?.federalTaxRate || "22");
  const [stateTaxRate, setStateTaxRate] = useState(defaults?.stateTaxRate || "5");
  const [ficaRate, setFicaRate] = useState(defaults?.ficaRate || "7.65");

  const results = useMemo(() => {
    const rate = parseFloat(hourlyRate) || 0;
    const hours = parseFloat(hoursPerWeek) || 0;
    const weeks = parseFloat(weeksPerYear) || 0;
    const pto = parseFloat(ptoWeeks) || 0;
    const ot = parseFloat(overtimeHours) || 0;
    const otMult = parseFloat(overtimeMultiplier) || 1.5;
    const fedTax = (parseFloat(federalTaxRate) || 0) / 100;
    const stTax = (parseFloat(stateTaxRate) || 0) / 100;
    const fica = (parseFloat(ficaRate) || 0) / 100;

    if (rate <= 0 || hours <= 0 || weeks <= 0) return null;

    const workedWeeks = weeks - pto;
    const regularAnnual = rate * hours * weeks;
    const overtimeRate = rate * otMult;
    const overtimeAnnual = overtimeRate * ot * workedWeeks;
    const grossAnnual = regularAnnual + overtimeAnnual;

    const totalTaxRate = fedTax + stTax + fica;
    const annualTaxes = grossAnnual * totalTaxRate;
    const netAnnual = grossAnnual - annualTaxes;

    const grossMonthly = grossAnnual / 12;
    const netMonthly = netAnnual / 12;
    const grossBiweekly = grossAnnual / 26;
    const netBiweekly = netAnnual / 26;
    const grossWeekly = grossAnnual / weeks;
    const netWeekly = netAnnual / weeks;
    const grossDaily = grossWeekly / (hours / 8 || 5);
    const netDaily = netWeekly / (hours / 8 || 5);

    const effectiveHourly = grossAnnual / (workedWeeks * hours + workedWeeks * ot);
    const ptoValue = rate * hours * pto;

    const commonRates = [10, 12, 15, 18, 20, 22, 25, 28, 30, 35, 40, 45, 50, 60, 75, 100];
    const referenceTable = commonRates.map((r) => ({
      hourly: r,
      weekly: r * hours,
      biweekly: r * hours * 2,
      monthly: (r * hours * weeks) / 12,
      annual: r * hours * weeks,
    }));

    return {
      rate,
      grossAnnual,
      netAnnual,
      grossMonthly,
      netMonthly,
      grossBiweekly,
      netBiweekly,
      grossWeekly,
      netWeekly,
      grossDaily,
      netDaily,
      totalTaxRate,
      annualTaxes,
      overtimeRate,
      overtimeAnnual,
      effectiveHourly,
      ptoValue,
      workedWeeks,
      referenceTable,
    };
  }, [hourlyRate, hoursPerWeek, weeksPerYear, ptoWeeks, overtimeHours, overtimeMultiplier, federalTaxRate, stateTaxRate, ficaRate]);

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-ink-700 uppercase tracking-wide">Hourly Rate</h3>
        <div className="mt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <InputField
            label="Hourly Rate"
            id="hourlyRate"
            value={hourlyRate}
            onChange={setHourlyRate}
            prefix="$"
            min={0}
            step={0.5}
          />
          <InputField
            label="Hours Per Week"
            id="hoursPerWeek"
            value={hoursPerWeek}
            onChange={setHoursPerWeek}
            min={1}
            max={168}
            step={1}
          />
          <InputField
            label="Weeks Per Year"
            id="weeksPerYear"
            value={weeksPerYear}
            onChange={setWeeksPerYear}
            min={1}
            max={52}
            step={1}
          />
          <InputField
            label="Paid Time Off (weeks)"
            id="ptoWeeks"
            value={ptoWeeks}
            onChange={setPtoWeeks}
            min={0}
            max={52}
            step={1}
            helpText="Vacation, sick, holidays"
          />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-ink-700 uppercase tracking-wide">Overtime (Optional)</h3>
        <div className="mt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <InputField
            label="Overtime Hours/Week"
            id="overtimeHours"
            value={overtimeHours}
            onChange={setOvertimeHours}
            min={0}
            max={80}
            step={1}
          />
          <InputField
            label="Overtime Multiplier"
            id="overtimeMultiplier"
            value={overtimeMultiplier}
            onChange={setOvertimeMultiplier}
            suffix="x"
            min={1}
            max={3}
            step={0.25}
            helpText="1.5x = time and a half"
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-ink-700 uppercase tracking-wide">Tax Estimates</h3>
        <div className="mt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <InputField
            label="Federal Tax Rate"
            id="federalTaxRate"
            value={federalTaxRate}
            onChange={setFederalTaxRate}
            suffix="%"
            min={0}
            max={50}
            step={1}
          />
          <InputField
            label="State Tax Rate"
            id="stateTaxRate"
            value={stateTaxRate}
            onChange={setStateTaxRate}
            suffix="%"
            min={0}
            max={15}
            step={0.5}
            helpText="0% for TX, FL, WA, etc."
          />
          <InputField
            label="FICA (SS + Medicare)"
            id="ficaRate"
            value={ficaRate}
            onChange={setFicaRate}
            suffix="%"
            min={0}
            max={15}
            step={0.01}
            helpText="Standard: 7.65%"
          />
        </div>
      </div>

      {results && (
        <div className="mt-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-brand-50 p-5 text-center">
              <p className="text-sm font-medium text-brand-700">Annual Salary (Gross)</p>
              <p className="mt-1 text-3xl font-bold text-brand-700">
                {formatCurrency(results.grossAnnual)}
              </p>
              <p className="mt-1 text-sm text-brand-600">
                {formatCurrencyExact(results.rate)}/hr
              </p>
            </div>
            <div className="rounded-lg bg-accent-50 p-5 text-center">
              <p className="text-sm font-medium text-accent-700">Annual Take-Home (Net)</p>
              <p className="mt-1 text-3xl font-bold text-accent-700">
                {formatCurrency(results.netAnnual)}
              </p>
              <p className="mt-1 text-sm text-accent-600">
                After {(results.totalTaxRate * 100).toFixed(1)}% taxes
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-ink-100 p-3 text-center">
              <p className="text-xs font-medium text-ink-500">Monthly (Gross)</p>
              <p className="mt-1 text-lg font-bold text-ink-800">{formatCurrency(results.grossMonthly)}</p>
              <p className="text-xs text-ink-400">Net: {formatCurrency(results.netMonthly)}</p>
            </div>
            <div className="rounded-lg bg-ink-100 p-3 text-center">
              <p className="text-xs font-medium text-ink-500">Biweekly (Gross)</p>
              <p className="mt-1 text-lg font-bold text-ink-800">{formatCurrency(results.grossBiweekly)}</p>
              <p className="text-xs text-ink-400">Net: {formatCurrency(results.netBiweekly)}</p>
            </div>
            <div className="rounded-lg bg-ink-100 p-3 text-center">
              <p className="text-xs font-medium text-ink-500">Weekly (Gross)</p>
              <p className="mt-1 text-lg font-bold text-ink-800">{formatCurrency(results.grossWeekly)}</p>
              <p className="text-xs text-ink-400">Net: {formatCurrency(results.netWeekly)}</p>
            </div>
            <div className="rounded-lg bg-ink-100 p-3 text-center">
              <p className="text-xs font-medium text-ink-500">Daily (Gross)</p>
              <p className="mt-1 text-lg font-bold text-ink-800">{formatCurrency(results.grossDaily)}</p>
              <p className="text-xs text-ink-400">Net: {formatCurrency(results.netDaily)}</p>
            </div>
          </div>

          {results.overtimeAnnual > 0 && (
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg bg-amber-50 p-3 text-center">
                <p className="text-xs font-medium text-amber-600">Overtime Rate</p>
                <p className="mt-1 text-lg font-bold text-amber-800">{formatCurrencyExact(results.overtimeRate)}/hr</p>
              </div>
              <div className="rounded-lg bg-amber-50 p-3 text-center">
                <p className="text-xs font-medium text-amber-600">Annual Overtime Pay</p>
                <p className="mt-1 text-lg font-bold text-amber-800">{formatCurrency(results.overtimeAnnual)}</p>
              </div>
              <div className="rounded-lg bg-amber-50 p-3 text-center">
                <p className="text-xs font-medium text-amber-600">Effective Hourly Rate</p>
                <p className="mt-1 text-lg font-bold text-amber-800">{formatCurrencyExact(results.effectiveHourly)}/hr</p>
              </div>
            </div>
          )}

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg bg-ink-100 p-3 text-center">
              <p className="text-xs font-medium text-ink-500">Annual Taxes</p>
              <p className="mt-1 text-lg font-bold text-ink-800">{formatCurrency(results.annualTaxes)}</p>
            </div>
            <div className="rounded-lg bg-ink-100 p-3 text-center">
              <p className="text-xs font-medium text-ink-500">PTO Value</p>
              <p className="mt-1 text-lg font-bold text-ink-800">{formatCurrency(results.ptoValue)}</p>
            </div>
            <div className="rounded-lg bg-ink-100 p-3 text-center">
              <p className="text-xs font-medium text-ink-500">Weeks Worked</p>
              <p className="mt-1 text-lg font-bold text-ink-800">{results.workedWeeks}</p>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-sm font-medium text-ink-700">Hourly to Annual Salary Reference Table</p>
            <div className="mt-2 overflow-auto rounded-lg border border-ink-200">
              <table className="w-full text-sm">
                <thead className="bg-ink-100">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium text-ink-600">Hourly</th>
                    <th className="px-3 py-2 text-right font-medium text-ink-600">Weekly</th>
                    <th className="px-3 py-2 text-right font-medium text-ink-600">Biweekly</th>
                    <th className="px-3 py-2 text-right font-medium text-ink-600">Monthly</th>
                    <th className="px-3 py-2 text-right font-medium text-ink-600">Annual</th>
                  </tr>
                </thead>
                <tbody>
                  {results.referenceTable.map((row) => (
                    <tr
                      key={row.hourly}
                      className={`border-t border-ink-100 ${row.hourly === results.rate ? "bg-brand-50 font-semibold" : ""}`}
                    >
                      <td className="px-3 py-2 text-ink-700">${row.hourly.toFixed(2)}</td>
                      <td className="px-3 py-2 text-right text-ink-700">{formatCurrency(row.weekly)}</td>
                      <td className="px-3 py-2 text-right text-ink-700">{formatCurrency(row.biweekly)}</td>
                      <td className="px-3 py-2 text-right text-ink-700">{formatCurrency(row.monthly)}</td>
                      <td className="px-3 py-2 text-right text-ink-700">{formatCurrency(row.annual)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
