"use client";

import { useState, useMemo } from "react";
import { InputField } from "@/components/InputField";

function formatCurrency(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

interface Props {
  defaults?: Record<string, string>;
}

export function SavingsGoalCalculator({ defaults }: Props) {
  const [goalAmount, setGoalAmount] = useState(defaults?.goalAmount || "50000");
  const [currentSavings, setCurrentSavings] = useState(defaults?.currentSavings || "5000");
  const [timeframe, setTimeframe] = useState(defaults?.timeframe || "5");
  const [annualReturn, setAnnualReturn] = useState(defaults?.annualReturn || "4.25");

  const results = useMemo(() => {
    const goal = parseFloat(goalAmount) || 0;
    const current = parseFloat(currentSavings) || 0;
    const years = parseFloat(timeframe) || 1;
    const rate = (parseFloat(annualReturn) || 0) / 100;

    const months = years * 12;
    const monthlyRate = rate / 12;

    const futureValueOfCurrent = current * Math.pow(1 + monthlyRate, months);
    const amountNeeded = goal - futureValueOfCurrent;

    let monthlySavings: number;
    if (monthlyRate === 0) {
      monthlySavings = amountNeeded / months;
    } else {
      monthlySavings =
        amountNeeded / ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    }

    const totalContributions = monthlySavings * months + current;
    const totalInterest = goal - totalContributions;
    const weeklySavings = (monthlySavings * 12) / 52;
    const dailySavings = (monthlySavings * 12) / 365;

    return {
      monthlySavings: Math.max(0, monthlySavings),
      weeklySavings: Math.max(0, weeklySavings),
      dailySavings: Math.max(0, dailySavings),
      totalContributions,
      totalInterest: Math.max(0, totalInterest),
      alreadyMet: futureValueOfCurrent >= goal,
    };
  }, [goalAmount, currentSavings, timeframe, annualReturn]);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        <InputField
          label="Savings Goal"
          id="goalAmount"
          value={goalAmount}
          onChange={setGoalAmount}
          prefix="$"
          min={0}
          helpText="How much do you want to save?"
        />
        <InputField
          label="Current Savings"
          id="currentSavings"
          value={currentSavings}
          onChange={setCurrentSavings}
          prefix="$"
          min={0}
          helpText="What you've already saved toward this goal"
        />
        <InputField
          label="Timeframe"
          id="timeframe"
          value={timeframe}
          onChange={setTimeframe}
          suffix="years"
          min={0.5}
          max={50}
          step={0.5}
          helpText="When do you want to reach your goal?"
        />
        <InputField
          label="Expected Annual Return"
          id="annualReturn"
          value={annualReturn}
          onChange={setAnnualReturn}
          suffix="%"
          min={0}
          max={30}
          step={0.1}
          helpText="Interest or investment return rate"
        />
      </div>

      {results && (
        <div className="mt-8">
          {results.alreadyMet ? (
            <div className="rounded-lg bg-accent-50 p-6 text-center">
              <p className="text-lg font-semibold text-accent-800">
                Great news! Your current savings will reach your goal with
                interest alone.
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg bg-brand-50 p-4 text-center">
                  <p className="text-sm font-medium text-brand-700">
                    Save Per Month
                  </p>
                  <p className="mt-1 text-2xl font-bold text-brand-900">
                    {formatCurrency(results.monthlySavings)}
                  </p>
                </div>
                <div className="rounded-lg bg-ink-100 p-4 text-center">
                  <p className="text-sm font-medium text-ink-600">
                    Save Per Week
                  </p>
                  <p className="mt-1 text-2xl font-bold text-ink-800">
                    {formatCurrency(results.weeklySavings)}
                  </p>
                </div>
                <div className="rounded-lg bg-ink-100 p-4 text-center">
                  <p className="text-sm font-medium text-ink-600">
                    Save Per Day
                  </p>
                  <p className="mt-1 text-2xl font-bold text-ink-800">
                    {formatCurrency(results.dailySavings)}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-lg bg-accent-50 p-4">
                <p className="text-sm text-accent-800">
                  <strong>Interest will contribute {formatCurrency(results.totalInterest)}</strong>{" "}
                  toward your goal — that's money earned without any extra
                  effort on your part.
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
