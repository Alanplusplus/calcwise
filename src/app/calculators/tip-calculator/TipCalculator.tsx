"use client";

import { useState, useMemo } from "react";
import { InputField } from "@/components/InputField";

function formatCurrency(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

const QUICK_TIP_PERCENTAGES = ["15", "18", "20", "25"];
const REFERENCE_PERCENTAGES = [15, 18, 20, 22, 25];

interface Props {
  defaults?: Record<string, string>;
}

export function TipCalculator({ defaults }: Props) {
  const [billAmount, setBillAmount] = useState(defaults?.billAmount || "85.00");
  const [tipPercentage, setTipPercentage] = useState(defaults?.tipPercentage || "18");
  const [numberOfPeople, setNumberOfPeople] = useState(defaults?.numberOfPeople || "2");

  const results = useMemo(() => {
    const bill = parseFloat(billAmount) || 0;
    const tipPct = parseFloat(tipPercentage) || 0;
    const people = Math.max(1, Math.floor(parseFloat(numberOfPeople) || 1));

    const tipAmount = bill * tipPct / 100;
    const totalAmount = bill + tipAmount;
    const perPersonTotal = totalAmount / people;
    const perPersonTip = tipAmount / people;

    const referenceTips = REFERENCE_PERCENTAGES.map((pct) => ({
      percentage: pct,
      tip: bill * pct / 100,
      total: bill + bill * pct / 100,
    }));

    return {
      bill,
      tipAmount,
      totalAmount,
      perPersonTotal,
      perPersonTip,
      people,
      referenceTips,
    };
  }, [billAmount, tipPercentage, numberOfPeople]);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <InputField
          label="Bill Amount"
          id="billAmount"
          value={billAmount}
          onChange={setBillAmount}
          prefix="$"
          min={0}
          step={0.01}
          helpText="Pre-tax bill amount before tip"
        />
        <div>
          <InputField
            label="Tip Percentage"
            id="tipPercentage"
            value={tipPercentage}
            onChange={setTipPercentage}
            suffix="%"
            min={0}
            max={100}
            step={1}
            helpText="Select a preset or enter a custom percentage"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {QUICK_TIP_PERCENTAGES.map((pct) => (
              <button
                key={pct}
                type="button"
                onClick={() => setTipPercentage(pct)}
                className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                  tipPercentage === pct
                    ? "border-brand-500 bg-brand-50 text-brand-700"
                    : "border-ink-300 bg-white text-ink-700 hover:border-brand-300"
                }`}
              >
                {pct}%
              </button>
            ))}
          </div>
        </div>
        <InputField
          label="Number of People"
          id="numberOfPeople"
          value={numberOfPeople}
          onChange={setNumberOfPeople}
          min={1}
          step={1}
          helpText="Split the total bill and tip evenly"
        />
      </div>

      <div className="mt-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-brand-200 bg-brand-50 p-4">
            <p className="text-sm font-medium text-brand-700">Tip Amount</p>
            <p className="mt-2 text-xl font-bold text-brand-900">
              {formatCurrency(results.tipAmount)}
            </p>
            <p className="mt-1 text-sm text-brand-700">
              {tipPercentage}% of {formatCurrency(results.bill)}
            </p>
          </div>
          <div className="rounded-lg border border-accent-200 bg-accent-50 p-4">
            <p className="text-sm font-medium text-accent-700">Total Amount</p>
            <p className="mt-2 text-xl font-bold text-accent-900">
              {formatCurrency(results.totalAmount)}
            </p>
            <p className="mt-1 text-sm text-accent-700">
              Bill + tip
            </p>
          </div>
          {results.people > 1 && (
            <div className="rounded-lg bg-ink-100 p-4">
              <p className="text-sm font-medium text-ink-600">Per Person</p>
              <p className="mt-2 text-xl font-bold text-ink-800">
                {formatCurrency(results.perPersonTotal)}
              </p>
              <p className="mt-1 text-sm text-ink-600">
                {formatCurrency(results.perPersonTip)} tip each
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 overflow-x-auto">
          <h3 className="mb-3 text-sm font-semibold text-ink-700">
            Tip Reference for {formatCurrency(results.bill)} Bill
          </h3>
          <table className="w-full min-w-[400px] text-left text-sm">
            <thead>
              <tr className="border-b border-ink-200 text-ink-500">
                <th className="py-2 pr-4 font-medium">Tip %</th>
                <th className="py-2 pr-4 font-medium">Tip Amount</th>
                <th className="py-2 font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {results.referenceTips.map((row) => (
                <tr key={row.percentage} className="border-b border-ink-100">
                  <td className="py-2 pr-4 text-ink-800">{row.percentage}%</td>
                  <td className="py-2 pr-4 text-brand-700">{formatCurrency(row.tip)}</td>
                  <td className="py-2 text-ink-800">{formatCurrency(row.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
