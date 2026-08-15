"use client";

import { useState, useMemo } from "react";
import { InputField } from "@/components/InputField";

function formatCurrency(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState("30");
  const [retirementAge, setRetirementAge] = useState("65");
  const [currentSavings, setCurrentSavings] = useState("50000");
  const [monthlyContribution, setMonthlyContribution] = useState("1000");
  const [expectedReturn, setExpectedReturn] = useState("7");
  const [desiredIncome, setDesiredIncome] = useState("60000");
  const [withdrawalRate, setWithdrawalRate] = useState("4");

  const results = useMemo(() => {
    const age = parseInt(currentAge) || 30;
    const retAge = parseInt(retirementAge) || 65;
    const savings = parseFloat(currentSavings) || 0;
    const monthly = parseFloat(monthlyContribution) || 0;
    const returnRate = (parseFloat(expectedReturn) || 0) / 100;
    const income = parseFloat(desiredIncome) || 0;
    const withdrawal = (parseFloat(withdrawalRate) || 4) / 100;

    const yearsToRetirement = retAge - age;
    if (yearsToRetirement <= 0) return null;

    const months = yearsToRetirement * 12;
    const monthlyRate = returnRate / 12;

    // Future value of current savings
    const fvCurrent = savings * Math.pow(1 + monthlyRate, months);

    // Future value of monthly contributions
    let fvContributions: number;
    if (monthlyRate === 0) {
      fvContributions = monthly * months;
    } else {
      fvContributions = monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    }

    const projectedTotal = fvCurrent + fvContributions;

    // How much you need for desired income
    const neededForIncome = income / withdrawal;

    // Sustainable annual income from projected savings
    const sustainableIncome = projectedTotal * withdrawal;

    const onTrack = projectedTotal >= neededForIncome;
    const gap = neededForIncome - projectedTotal;

    // Monthly contribution needed to reach goal
    let neededMonthly: number;
    const deficit = neededForIncome - fvCurrent;
    if (monthlyRate === 0) {
      neededMonthly = deficit / months;
    } else {
      neededMonthly = deficit / ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    }

    return {
      projectedTotal,
      neededForIncome,
      sustainableIncome,
      onTrack,
      gap: Math.max(0, gap),
      neededMonthly: Math.max(0, neededMonthly),
      yearsToRetirement,
      totalContributions: savings + monthly * months,
      totalGrowth: projectedTotal - (savings + monthly * months),
    };
  }, [currentAge, retirementAge, currentSavings, monthlyContribution, expectedReturn, desiredIncome, withdrawalRate]);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <InputField
          label="Current Age"
          id="currentAge"
          value={currentAge}
          onChange={setCurrentAge}
          suffix="years"
          min={18}
          max={80}
        />
        <InputField
          label="Retirement Age"
          id="retirementAge"
          value={retirementAge}
          onChange={setRetirementAge}
          suffix="years"
          min={30}
          max={90}
        />
        <InputField
          label="Current Retirement Savings"
          id="currentSavings"
          value={currentSavings}
          onChange={setCurrentSavings}
          prefix="$"
          min={0}
        />
        <InputField
          label="Monthly Contribution"
          id="monthlyContribution"
          value={monthlyContribution}
          onChange={setMonthlyContribution}
          prefix="$"
          min={0}
        />
        <InputField
          label="Expected Annual Return"
          id="expectedReturn"
          value={expectedReturn}
          onChange={setExpectedReturn}
          suffix="%"
          min={0}
          max={20}
          step={0.5}
        />
        <InputField
          label="Desired Annual Income"
          id="desiredIncome"
          value={desiredIncome}
          onChange={setDesiredIncome}
          prefix="$"
          min={0}
          helpText="In today's dollars"
        />
      </div>

      {results && (
        <div className="mt-8">
          {/* Status */}
          <div className={`rounded-lg p-4 ${results.onTrack ? "bg-accent-50" : "bg-amber-50"}`}>
            <p className={`text-lg font-semibold ${results.onTrack ? "text-accent-800" : "text-amber-800"}`}>
              {results.onTrack
                ? "You're on track for your retirement goal!"
                : "You may need to save more to reach your goal."}
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-brand-50 p-4 text-center">
              <p className="text-sm font-medium text-brand-700">Projected at Retirement</p>
              <p className="mt-1 text-2xl font-bold text-brand-900">
                {formatCurrency(results.projectedTotal)}
              </p>
            </div>
            <div className="rounded-lg bg-ink-100 p-4 text-center">
              <p className="text-sm font-medium text-ink-600">Target Needed</p>
              <p className="mt-1 text-2xl font-bold text-ink-800">
                {formatCurrency(results.neededForIncome)}
              </p>
            </div>
            <div className="rounded-lg bg-accent-50 p-4 text-center">
              <p className="text-sm font-medium text-accent-700">Sustainable Income</p>
              <p className="mt-1 text-2xl font-bold text-accent-800">
                {formatCurrency(results.sustainableIncome)}/yr
              </p>
            </div>
          </div>

          {!results.onTrack && (
            <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm text-amber-800">
                <strong>Gap: {formatCurrency(results.gap)}</strong> — To reach your goal, consider increasing your monthly contribution to{" "}
                <strong>{formatCurrency(results.neededMonthly)}/month</strong>.
              </p>
            </div>
          )}

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-ink-200 p-3">
              <p className="text-xs text-ink-500">Total You&apos;ll Contribute</p>
              <p className="font-semibold text-ink-800">{formatCurrency(results.totalContributions)}</p>
            </div>
            <div className="rounded-lg border border-ink-200 p-3">
              <p className="text-xs text-ink-500">Investment Growth</p>
              <p className="font-semibold text-accent-700">{formatCurrency(results.totalGrowth)}</p>
            </div>
          </div>

          <p className="mt-4 text-xs text-ink-400">
            Based on {results.yearsToRetirement} years to retirement, {withdrawalRate}% safe
            withdrawal rate. This is a simplified estimate — consult a financial advisor for
            personalized retirement planning.
          </p>
        </div>
      )}
    </div>
  );
}
