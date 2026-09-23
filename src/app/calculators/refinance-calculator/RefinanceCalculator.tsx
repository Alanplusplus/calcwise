"use client";

import { useState, useMemo } from "react";
import { InputField } from "@/components/InputField";

function formatCurrency(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function calcMonthlyPayment(principal: number, annualRate: number, termMonths: number): number {
  if (principal <= 0 || termMonths <= 0) return 0;
  const r = annualRate / 100 / 12;
  if (r === 0) return principal / termMonths;
  return (principal * r * Math.pow(1 + r, termMonths)) / (Math.pow(1 + r, termMonths) - 1);
}

function calcRemainingBalance(principal: number, annualRate: number, termMonths: number, paymentsMade: number): number {
  if (principal <= 0 || termMonths <= 0) return 0;
  const r = annualRate / 100 / 12;
  if (r === 0) return principal - (principal / termMonths) * paymentsMade;
  const monthlyPayment = calcMonthlyPayment(principal, annualRate, termMonths);
  return principal * Math.pow(1 + r, paymentsMade) - monthlyPayment * ((Math.pow(1 + r, paymentsMade) - 1) / r);
}

interface Props {
  defaults?: Record<string, string>;
}

export function RefinanceCalculator({ defaults }: Props) {
  const [originalLoan, setOriginalLoan] = useState(defaults?.originalLoan || "350000");
  const [originalRate, setOriginalRate] = useState(defaults?.originalRate || "7.0");
  const [originalTerm, setOriginalTerm] = useState(defaults?.originalTerm || "360");
  const [paymentsMade, setPaymentsMade] = useState(defaults?.paymentsMade || "60");
  const [newRate, setNewRate] = useState(defaults?.newRate || "5.75");
  const [newTerm, setNewTerm] = useState(defaults?.newTerm || "360");
  const [closingCosts, setClosingCosts] = useState(defaults?.closingCosts || "6000");
  const [rollInCosts, setRollInCosts] = useState(defaults?.rollInCosts || "no");

  const results = useMemo(() => {
    const origLoan = parseFloat(originalLoan) || 0;
    const origRate = parseFloat(originalRate) || 0;
    const origTerm = parseInt(originalTerm) || 360;
    const pmtsMade = parseInt(paymentsMade) || 0;
    const nRate = parseFloat(newRate) || 0;
    const nTerm = parseInt(newTerm) || 360;
    const closing = parseFloat(closingCosts) || 0;
    const rollIn = rollInCosts === "yes";

    if (origLoan <= 0) return null;

    const currentMonthlyPayment = calcMonthlyPayment(origLoan, origRate, origTerm);
    const remainingBalance = Math.max(0, calcRemainingBalance(origLoan, origRate, origTerm, pmtsMade));
    const remainingMonths = origTerm - pmtsMade;
    const totalRemainingCurrent = currentMonthlyPayment * Math.max(0, remainingMonths);
    const totalInterestRemaining = totalRemainingCurrent - remainingBalance;

    const newPrincipal = rollIn ? remainingBalance + closing : remainingBalance;
    const newMonthlyPayment = calcMonthlyPayment(newPrincipal, nRate, nTerm);
    const totalNewPayments = newMonthlyPayment * nTerm;
    const totalNewInterest = totalNewPayments - newPrincipal;
    const upfrontClosing = rollIn ? 0 : closing;

    const monthlySavings = currentMonthlyPayment - newMonthlyPayment;
    const breakEvenMonths = monthlySavings > 0 ? Math.ceil(upfrontClosing / monthlySavings) : monthlySavings === 0 ? Infinity : 0;

    const totalCostCurrent = totalRemainingCurrent;
    const totalCostNew = totalNewPayments + upfrontClosing;
    const lifetimeSavings = totalCostCurrent - totalCostNew;

    const interestSaved = totalInterestRemaining - totalNewInterest;

    const amortization: {
      year: number;
      currentBalance: number;
      currentInterest: number;
      newBalance: number;
      newInterest: number;
    }[] = [];

    const maxYears = Math.min(Math.ceil(Math.max(remainingMonths, nTerm) / 12), 30);

    let curBal = remainingBalance;
    let newBal = newPrincipal;
    let curIntAccum = 0;
    let newIntAccum = 0;
    const curR = origRate / 100 / 12;
    const newR = nRate / 100 / 12;

    for (let y = 1; y <= maxYears; y++) {
      for (let m = 1; m <= 12; m++) {
        if (curBal > 0) {
          const curIntMonth = curBal * curR;
          curIntAccum += curIntMonth;
          const curPrinMonth = Math.min(currentMonthlyPayment - curIntMonth, curBal);
          curBal = Math.max(0, curBal - curPrinMonth);
        }
        if (newBal > 0) {
          const newIntMonth = newBal * newR;
          newIntAccum += newIntMonth;
          const newPrinMonth = Math.min(newMonthlyPayment - newIntMonth, newBal);
          newBal = Math.max(0, newBal - newPrinMonth);
        }
      }
      amortization.push({
        year: y,
        currentBalance: curBal,
        currentInterest: curIntAccum,
        newBalance: newBal,
        newInterest: newIntAccum,
      });
      if (curBal <= 0 && newBal <= 0) break;
    }

    return {
      currentMonthlyPayment,
      remainingBalance,
      remainingMonths,
      totalInterestRemaining,
      totalRemainingCurrent,
      newPrincipal,
      newMonthlyPayment,
      totalNewPayments,
      totalNewInterest,
      upfrontClosing,
      monthlySavings,
      breakEvenMonths,
      totalCostCurrent,
      totalCostNew,
      lifetimeSavings,
      interestSaved,
      nTerm,
      rollIn,
      amortization,
    };
  }, [originalLoan, originalRate, originalTerm, paymentsMade, newRate, newTerm, closingCosts, rollInCosts]);

  return (
    <div>
      <p className="text-sm font-semibold text-ink-700">Current Mortgage</p>
      <div className="mt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <InputField label="Original Loan Amount" id="originalLoan" value={originalLoan} onChange={setOriginalLoan} prefix="$" min={0} step={5000} />
        <InputField label="Current Interest Rate" id="originalRate" value={originalRate} onChange={setOriginalRate} suffix="%" min={0} max={15} step={0.125} />
        <div>
          <label htmlFor="originalTerm" className="block text-sm font-medium text-ink-700">Original Loan Term</label>
          <select id="originalTerm" value={originalTerm} onChange={(e) => setOriginalTerm(e.target.value)} className="mt-1 w-full rounded-lg border border-ink-300 bg-white px-3 py-2.5 text-ink-900 shadow-input focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20">
            <option value="360">30 years (360 months)</option>
            <option value="240">20 years (240 months)</option>
            <option value="180">15 years (180 months)</option>
            <option value="120">10 years (120 months)</option>
          </select>
        </div>
        <InputField label="Payments Already Made" id="paymentsMade" value={paymentsMade} onChange={setPaymentsMade} min={0} step={1} helpText="Number of monthly payments completed" />
      </div>

      <p className="mt-6 text-sm font-semibold text-ink-700">New Loan Details</p>
      <div className="mt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <InputField label="New Interest Rate" id="newRate" value={newRate} onChange={setNewRate} suffix="%" min={0} max={15} step={0.125} />
        <div>
          <label htmlFor="newTerm" className="block text-sm font-medium text-ink-700">New Loan Term</label>
          <select id="newTerm" value={newTerm} onChange={(e) => setNewTerm(e.target.value)} className="mt-1 w-full rounded-lg border border-ink-300 bg-white px-3 py-2.5 text-ink-900 shadow-input focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20">
            <option value="360">30 years (360 months)</option>
            <option value="240">20 years (240 months)</option>
            <option value="180">15 years (180 months)</option>
            <option value="120">10 years (120 months)</option>
          </select>
        </div>
        <InputField label="Closing Costs" id="closingCosts" value={closingCosts} onChange={setClosingCosts} prefix="$" min={0} step={500} helpText="Typically 2-5% of loan amount" />
        <div>
          <label htmlFor="rollInCosts" className="block text-sm font-medium text-ink-700">Roll Closing Costs into Loan?</label>
          <select id="rollInCosts" value={rollInCosts} onChange={(e) => setRollInCosts(e.target.value)} className="mt-1 w-full rounded-lg border border-ink-300 bg-white px-3 py-2.5 text-ink-900 shadow-input focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20">
            <option value="no">No (pay upfront)</option>
            <option value="yes">Yes (add to loan balance)</option>
          </select>
        </div>
      </div>

      {results ? (
        <div className="mt-8">
          {/* Verdict */}
          <div className={`rounded-lg p-6 text-center ${results.monthlySavings > 0 ? "bg-brand-50" : results.monthlySavings < 0 ? "bg-amber-50" : "bg-ink-100"}`}>
            <p className={`text-sm font-medium ${results.monthlySavings > 0 ? "text-brand-700" : results.monthlySavings < 0 ? "text-amber-700" : "text-ink-600"}`}>
              {results.monthlySavings > 0 ? "Refinancing Saves You" : results.monthlySavings < 0 ? "Refinancing Costs More" : "No Change in Payment"}
            </p>
            <p className={`mt-1 text-3xl font-bold ${results.monthlySavings > 0 ? "text-brand-900" : results.monthlySavings < 0 ? "text-amber-900" : "text-ink-800"}`}>
              {formatCurrency(Math.abs(results.monthlySavings))}/month
            </p>
            {results.monthlySavings > 0 && results.breakEvenMonths < Infinity && (
              <p className="mt-2 text-sm text-brand-600">
                Break-even in {results.breakEvenMonths} months ({(results.breakEvenMonths / 12).toFixed(1)} years) after closing costs
              </p>
            )}
          </div>

          {/* Side-by-Side Summary */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-ink-100 p-5">
              <p className="text-sm font-semibold text-ink-700">Current Mortgage</p>
              <p className="mt-1 text-2xl font-bold text-ink-900">{formatCurrency(results.currentMonthlyPayment)}/mo</p>
              <div className="mt-3 space-y-1.5 text-sm">
                <div className="flex justify-between"><span className="text-ink-500">Remaining Balance</span><span className="font-medium text-ink-800">{formatCurrency(results.remainingBalance)}</span></div>
                <div className="flex justify-between"><span className="text-ink-500">Remaining Months</span><span className="font-medium text-ink-800">{results.remainingMonths}</span></div>
                <div className="flex justify-between"><span className="text-ink-500">Remaining Interest</span><span className="font-medium text-ink-800">{formatCurrency(results.totalInterestRemaining)}</span></div>
                <div className="border-t border-ink-200 pt-1.5 flex justify-between"><span className="text-ink-600 font-medium">Total Remaining Cost</span><span className="font-bold text-ink-900">{formatCurrency(results.totalCostCurrent)}</span></div>
              </div>
            </div>
            <div className="rounded-lg bg-brand-50 p-5">
              <p className="text-sm font-semibold text-brand-700">Refinanced Mortgage</p>
              <p className="mt-1 text-2xl font-bold text-brand-900">{formatCurrency(results.newMonthlyPayment)}/mo</p>
              <div className="mt-3 space-y-1.5 text-sm">
                <div className="flex justify-between"><span className="text-brand-600">New Loan Amount</span><span className="font-medium text-brand-800">{formatCurrency(results.newPrincipal)}</span></div>
                <div className="flex justify-between"><span className="text-brand-600">New Loan Term</span><span className="font-medium text-brand-800">{results.nTerm} months</span></div>
                <div className="flex justify-between"><span className="text-brand-600">Total New Interest</span><span className="font-medium text-brand-800">{formatCurrency(results.totalNewInterest)}</span></div>
                <div className="flex justify-between"><span className="text-brand-600">Closing Costs{results.rollIn ? " (rolled in)" : ""}</span><span className="font-medium text-brand-800">{formatCurrency(results.rollIn ? 0 : results.upfrontClosing)}</span></div>
                <div className="border-t border-brand-200 pt-1.5 flex justify-between"><span className="text-brand-700 font-medium">Total Refinance Cost</span><span className="font-bold text-brand-900">{formatCurrency(results.totalCostNew)}</span></div>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-accent-50 p-4 text-center">
              <p className="text-xs font-medium text-accent-600">Lifetime Savings</p>
              <p className={`mt-1 text-lg font-bold ${results.lifetimeSavings > 0 ? "text-green-700" : "text-red-700"}`}>{results.lifetimeSavings > 0 ? "" : "-"}{formatCurrency(Math.abs(results.lifetimeSavings))}</p>
            </div>
            <div className="rounded-lg bg-accent-50 p-4 text-center">
              <p className="text-xs font-medium text-accent-600">Interest Saved</p>
              <p className={`mt-1 text-lg font-bold ${results.interestSaved > 0 ? "text-green-700" : "text-red-700"}`}>{results.interestSaved > 0 ? "" : "-"}{formatCurrency(Math.abs(results.interestSaved))}</p>
            </div>
            <div className="rounded-lg bg-accent-50 p-4 text-center">
              <p className="text-xs font-medium text-accent-600">Break-Even Point</p>
              <p className="mt-1 text-lg font-bold text-ink-800">
                {results.breakEvenMonths === Infinity || results.breakEvenMonths === 0 ? "N/A" : `${results.breakEvenMonths} months`}
              </p>
            </div>
          </div>

          {/* Year-by-Year Comparison */}
          <div className="mt-6">
            <p className="text-sm font-medium text-ink-700">Year-by-Year Balance &amp; Interest Comparison</p>
            <div className="mt-2 overflow-auto rounded-lg border border-ink-200">
              <table className="w-full text-sm">
                <thead className="bg-ink-100">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium text-ink-600">Year</th>
                    <th className="px-3 py-2 text-right font-medium text-ink-600">Current Balance</th>
                    <th className="px-3 py-2 text-right font-medium text-ink-600">New Balance</th>
                    <th className="px-3 py-2 text-right font-medium text-ink-600">Current Interest (cum.)</th>
                    <th className="px-3 py-2 text-right font-medium text-ink-600">New Interest (cum.)</th>
                  </tr>
                </thead>
                <tbody>
                  {results.amortization.map((row) => (
                    <tr key={row.year} className="border-t border-ink-100">
                      <td className="px-3 py-2 font-medium text-ink-800">Year {row.year}</td>
                      <td className="px-3 py-2 text-right text-ink-700">{formatCurrency(row.currentBalance)}</td>
                      <td className="px-3 py-2 text-right text-brand-700">{formatCurrency(row.newBalance)}</td>
                      <td className="px-3 py-2 text-right text-ink-700">{formatCurrency(row.currentInterest)}</td>
                      <td className="px-3 py-2 text-right text-brand-700">{formatCurrency(row.newInterest)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-8 rounded-lg bg-amber-50 p-4 text-center text-sm text-amber-800">
          Enter a valid original loan amount to see refinancing results.
        </div>
      )}
    </div>
  );
}
