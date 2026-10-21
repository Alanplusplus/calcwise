"use client";

import { useState, useMemo } from "react";
import { InputField } from "@/components/InputField";
import { RateDefaultNote } from "@/components/RateDefaultNote";
import { DEFAULT_MORTGAGE_RATE } from "@/lib/market-data";

function formatCurrency(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function formatCurrencyExact(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });
}

interface Props {
  defaults?: Record<string, string>;
}

export function DownPaymentCalculator({ defaults }: Props) {
  const [homePrice, setHomePrice] = useState(defaults?.homePrice || "350000");
  const [downPaymentPercent, setDownPaymentPercent] = useState(defaults?.downPaymentPercent || "20");
  const [interestRate, setInterestRate] = useState(defaults?.interestRate || DEFAULT_MORTGAGE_RATE);
  const [loanTerm, setLoanTerm] = useState(defaults?.loanTerm || "30");
  const [monthlySavings, setMonthlySavings] = useState(defaults?.monthlySavings || "1000");
  const [currentSavings, setCurrentSavings] = useState(defaults?.currentSavings || "10000");
  const [savingsRate, setSavingsRate] = useState(defaults?.savingsRate || "4.5");

  const results = useMemo(() => {
    const price = parseFloat(homePrice) || 0;
    const pct = parseFloat(downPaymentPercent) || 0;
    const rate = parseFloat(interestRate) || 0;
    const years = parseInt(loanTerm) || 30;
    const monthly = parseFloat(monthlySavings) || 0;
    const current = parseFloat(currentSavings) || 0;
    const savRate = (parseFloat(savingsRate) || 0) / 100 / 12;

    if (price <= 0 || pct <= 0) return null;

    const downPaymentAmount = price * (pct / 100);
    const loanAmount = price - downPaymentAmount;
    const remaining = Math.max(0, downPaymentAmount - current);

    let monthsToSave = 0;
    if (remaining > 0 && monthly > 0) {
      let balance = current;
      while (balance < downPaymentAmount && monthsToSave < 600) {
        balance = balance * (1 + savRate) + monthly;
        monthsToSave++;
      }
    } else if (remaining <= 0) {
      monthsToSave = 0;
    }

    const closingCostEstimate = price * 0.03;
    const totalCashNeeded = downPaymentAmount + closingCostEstimate;

    const monthlyRate = rate / 100 / 12;
    const n = years * 12;
    let monthlyMortgage = 0;
    if (loanAmount > 0 && monthlyRate > 0) {
      monthlyMortgage = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
    }

    const needsPMI = pct < 20;
    const pmiMonthly = needsPMI ? (loanAmount * 0.007) / 12 : 0;
    const totalMonthlyPayment = monthlyMortgage + pmiMonthly;

    const scenarios = [3.5, 5, 10, 15, 20].map((p) => {
      const dp = price * (p / 100);
      const loan = price - dp;
      const pmi = p < 20 ? (loan * 0.007) / 12 : 0;
      let payment = 0;
      if (loan > 0 && monthlyRate > 0) {
        payment = (loan * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
      }
      const totalInterest = (payment * n) - loan;
      return {
        percent: p,
        downPayment: dp,
        loanAmount: loan,
        monthlyPayment: payment + pmi,
        pmi,
        totalInterest,
      };
    });

    return {
      downPaymentAmount,
      loanAmount,
      remaining,
      monthsToSave,
      closingCostEstimate,
      totalCashNeeded,
      monthlyMortgage,
      needsPMI,
      pmiMonthly,
      totalMonthlyPayment,
      scenarios,
    };
  }, [homePrice, downPaymentPercent, interestRate, loanTerm, monthlySavings, currentSavings, savingsRate]);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <InputField
          label="Home Price"
          id="homePrice"
          value={homePrice}
          onChange={setHomePrice}
          prefix="$"
          min={0}
          step={5000}
        />
        <InputField
          label="Down Payment"
          id="downPaymentPercent"
          value={downPaymentPercent}
          onChange={setDownPaymentPercent}
          suffix="%"
          min={0}
          max={100}
          step={0.5}
        />
        <InputField
          label="Interest Rate"
          id="interestRate"
          value={interestRate}
          onChange={setInterestRate}
          suffix="%"
          min={0}
          max={30}
          step={0.1}
        />
        <InputField
          label="Loan Term"
          id="loanTerm"
          value={loanTerm}
          onChange={setLoanTerm}
          suffix="years"
          min={1}
          max={50}
        />
        <InputField
          label="Current Savings"
          id="currentSavings"
          value={currentSavings}
          onChange={setCurrentSavings}
          prefix="$"
          min={0}
          step={1000}
        />
        <InputField
          label="Monthly Savings"
          id="monthlySavings"
          value={monthlySavings}
          onChange={setMonthlySavings}
          prefix="$"
          min={0}
          step={100}
          helpText="How much you can save toward down payment each month"
        />
        <InputField
          label="Savings Account APY"
          id="savingsRate"
          value={savingsRate}
          onChange={setSavingsRate}
          suffix="%"
          min={0}
          max={20}
          step={0.1}
          helpText="Interest rate on your savings"
        />
      </div>
      <RateDefaultNote rate={interestRate} />

      {results && (
        <div className="mt-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-brand-50 p-5 text-center">
              <p className="text-sm font-medium text-brand-700">Down Payment</p>
              <p className="mt-1 text-2xl font-bold text-brand-900">{formatCurrency(results.downPaymentAmount)}</p>
              <p className="mt-1 text-xs text-brand-600">{downPaymentPercent}% of home price</p>
            </div>
            <div className="rounded-lg bg-accent-50 p-5 text-center">
              <p className="text-sm font-medium text-accent-700">Loan Amount</p>
              <p className="mt-1 text-2xl font-bold text-accent-900">{formatCurrency(results.loanAmount)}</p>
            </div>
            <div className="rounded-lg bg-ink-100 p-5 text-center">
              <p className="text-sm font-medium text-ink-600">Monthly Payment</p>
              <p className="mt-1 text-2xl font-bold text-ink-800">{formatCurrencyExact(results.totalMonthlyPayment)}</p>
              {results.needsPMI && (
                <p className="mt-1 text-xs text-ink-500">Incl. {formatCurrencyExact(results.pmiMonthly)} PMI</p>
              )}
            </div>
            <div className="rounded-lg bg-ink-100 p-5 text-center">
              <p className="text-sm font-medium text-ink-600">Total Cash Needed</p>
              <p className="mt-1 text-2xl font-bold text-ink-800">{formatCurrency(results.totalCashNeeded)}</p>
              <p className="mt-1 text-xs text-ink-500">Down payment + ~3% closing costs</p>
            </div>
          </div>

          {results.remaining > 0 && (
            <div className="mt-6 rounded-lg border border-brand-200 bg-brand-50 p-4">
              <p className="font-semibold text-brand-800">Savings Timeline</p>
              <p className="mt-1 text-ink-700">
                You still need <strong>{formatCurrency(results.remaining)}</strong> more.
                {results.monthsToSave > 0 ? (
                  <> At {formatCurrency(parseFloat(monthlySavings))}/month with a {savingsRate}% APY savings account, you will reach your goal in approximately <strong>{results.monthsToSave} months ({(results.monthsToSave / 12).toFixed(1)} years)</strong>.</>
                ) : (
                  <> Enter a monthly savings amount to see your timeline.</>
                )}
              </p>
            </div>
          )}

          {results.remaining <= 0 && (
            <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4">
              <p className="font-semibold text-green-800">You already have enough saved for this down payment.</p>
              <p className="mt-1 text-sm text-green-700">
                Your current savings of {formatCurrency(parseFloat(currentSavings))} covers the {formatCurrency(results.downPaymentAmount)} down payment.
                Remember to budget an additional {formatCurrency(results.closingCostEstimate)} for estimated closing costs.
              </p>
            </div>
          )}

          {results.needsPMI && (
            <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm text-amber-800">
                <strong>PMI applies:</strong> With less than 20% down, private mortgage insurance adds approximately {formatCurrencyExact(results.pmiMonthly)}/month ({formatCurrency(results.pmiMonthly * 12)}/year) until you reach 20% equity.
              </p>
            </div>
          )}

          <div className="mt-8">
            <h3 className="text-sm font-semibold text-ink-700">Down Payment Comparison</h3>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead>
                  <tr className="border-b border-ink-200 text-ink-500">
                    <th className="py-2 pr-4 font-medium">Down %</th>
                    <th className="py-2 pr-4 font-medium">Down Payment</th>
                    <th className="py-2 pr-4 font-medium">Loan Amount</th>
                    <th className="py-2 pr-4 font-medium">Monthly Payment</th>
                    <th className="py-2 pr-4 font-medium">PMI</th>
                    <th className="py-2 font-medium">Total Interest</th>
                  </tr>
                </thead>
                <tbody>
                  {results.scenarios.map((s) => (
                    <tr key={s.percent} className={`border-b border-ink-100 ${s.percent === parseFloat(downPaymentPercent) ? "bg-brand-50 font-medium" : ""}`}>
                      <td className="py-2 pr-4 text-ink-800">{s.percent}%</td>
                      <td className="py-2 pr-4 text-ink-800">{formatCurrency(s.downPayment)}</td>
                      <td className="py-2 pr-4 text-ink-800">{formatCurrency(s.loanAmount)}</td>
                      <td className="py-2 pr-4 text-ink-800">{formatCurrencyExact(s.monthlyPayment)}</td>
                      <td className="py-2 pr-4 text-ink-800">{s.pmi > 0 ? formatCurrencyExact(s.pmi) : "None"}</td>
                      <td className="py-2 text-ink-800">{formatCurrency(s.totalInterest)}</td>
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
