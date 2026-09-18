"use client";

import { useState, useMemo } from "react";
import { InputField } from "@/components/InputField";

function formatCurrency(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function formatPercent(n: number): string {
  return n.toFixed(1) + "%";
}

function getDtiRating(dti: number): { label: string; color: string; bg: string; description: string } {
  if (dti <= 20) return { label: "Excellent", color: "text-green-700", bg: "bg-green-50", description: "Very manageable debt load. You are in a strong position for any loan." };
  if (dti <= 36) return { label: "Good", color: "text-brand-700", bg: "bg-brand-50", description: "Healthy range. Most lenders consider this acceptable for conventional mortgages." };
  if (dti <= 43) return { label: "Acceptable", color: "text-amber-700", bg: "bg-amber-50", description: "At the upper limit for most mortgage programs. Reducing debt would strengthen your position." };
  if (dti <= 50) return { label: "High", color: "text-orange-700", bg: "bg-orange-50", description: "Many conventional lenders will decline applications in this range. FHA may allow up to 50% in some cases." };
  return { label: "Very High", color: "text-red-700", bg: "bg-red-50", description: "Significantly above qualifying thresholds. Focus on paying down debt before applying for new credit." };
}

interface Props {
  defaults?: Record<string, string>;
}

export function DebtToIncomeCalculator({ defaults }: Props) {
  const [grossIncome, setGrossIncome] = useState(defaults?.grossIncome || "6000");
  const [housingPayment, setHousingPayment] = useState(defaults?.housingPayment || "1500");
  const [carPayment, setCarPayment] = useState(defaults?.carPayment || "400");
  const [studentLoans, setStudentLoans] = useState(defaults?.studentLoans || "300");
  const [creditCards, setCreditCards] = useState(defaults?.creditCards || "200");
  const [personalLoans, setPersonalLoans] = useState(defaults?.personalLoans || "0");
  const [otherDebt, setOtherDebt] = useState(defaults?.otherDebt || "0");
  const [childSupport, setChildSupport] = useState(defaults?.childSupport || "0");

  const results = useMemo(() => {
    const income = parseFloat(grossIncome) || 0;
    if (income <= 0) return null;

    const housing = parseFloat(housingPayment) || 0;
    const car = parseFloat(carPayment) || 0;
    const student = parseFloat(studentLoans) || 0;
    const cards = parseFloat(creditCards) || 0;
    const personal = parseFloat(personalLoans) || 0;
    const other = parseFloat(otherDebt) || 0;
    const child = parseFloat(childSupport) || 0;

    const totalNonHousingDebt = car + student + cards + personal + other + child;
    const totalDebt = housing + totalNonHousingDebt;

    const frontEndDti = (housing / income) * 100;
    const backEndDti = (totalDebt / income) * 100;

    const frontEndRating = getDtiRating(frontEndDti);
    const backEndRating = getDtiRating(backEndDti);

    const maxHousingAt28 = income * 0.28;
    const maxTotalAt36 = income * 0.36;
    const maxTotalAt43 = income * 0.43;

    const housingRoom = maxHousingAt28 - housing;
    const totalRoom36 = maxTotalAt36 - totalDebt;
    const totalRoom43 = maxTotalAt43 - totalDebt;

    const debtBreakdown = [
      { label: "Housing (Rent/Mortgage)", amount: housing, color: "bg-brand-500" },
      { label: "Car Payment", amount: car, color: "bg-amber-400" },
      { label: "Student Loans", amount: student, color: "bg-emerald-400" },
      { label: "Credit Cards", amount: cards, color: "bg-rose-400" },
      { label: "Personal Loans", amount: personal, color: "bg-purple-400" },
      { label: "Other Debt", amount: other, color: "bg-cyan-400" },
      { label: "Child Support / Alimony", amount: child, color: "bg-orange-400" },
    ].filter((d) => d.amount > 0);

    const thresholds = [
      { label: "Conventional Mortgage (Front-End)", limit: 28, your: frontEndDti, type: "Housing only" },
      { label: "Conventional Mortgage (Back-End)", limit: 36, your: backEndDti, type: "All debt" },
      { label: "FHA Loan Maximum", limit: 43, your: backEndDti, type: "All debt" },
      { label: "Qualified Mortgage (QM) Limit", limit: 43, your: backEndDti, type: "All debt" },
      { label: "VA Loan Guideline", limit: 41, your: backEndDti, type: "All debt" },
    ];

    return {
      income,
      totalDebt,
      totalNonHousingDebt,
      frontEndDti,
      backEndDti,
      frontEndRating,
      backEndRating,
      maxHousingAt28,
      maxTotalAt36,
      maxTotalAt43,
      housingRoom,
      totalRoom36,
      totalRoom43,
      debtBreakdown,
      thresholds,
    };
  }, [grossIncome, housingPayment, carPayment, studentLoans, creditCards, personalLoans, otherDebt, childSupport]);

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-ink-700 uppercase tracking-wide">Monthly Income</h3>
        <div className="mt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <InputField
            label="Gross Monthly Income"
            id="grossIncome"
            value={grossIncome}
            onChange={setGrossIncome}
            prefix="$"
            min={0}
            step={100}
            helpText="Before taxes and deductions"
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-ink-700 uppercase tracking-wide">Monthly Debt Payments</h3>
        <div className="mt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <InputField
            label="Housing Payment"
            id="housingPayment"
            value={housingPayment}
            onChange={setHousingPayment}
            prefix="$"
            min={0}
            step={50}
            helpText="Mortgage/rent, taxes, insurance"
          />
          <InputField
            label="Car Payment"
            id="carPayment"
            value={carPayment}
            onChange={setCarPayment}
            prefix="$"
            min={0}
            step={25}
          />
          <InputField
            label="Student Loans"
            id="studentLoans"
            value={studentLoans}
            onChange={setStudentLoans}
            prefix="$"
            min={0}
            step={25}
          />
          <InputField
            label="Credit Card Minimums"
            id="creditCards"
            value={creditCards}
            onChange={setCreditCards}
            prefix="$"
            min={0}
            step={25}
            helpText="Total minimum payments"
          />
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <InputField
            label="Personal Loans"
            id="personalLoans"
            value={personalLoans}
            onChange={setPersonalLoans}
            prefix="$"
            min={0}
            step={25}
          />
          <InputField
            label="Other Debt"
            id="otherDebt"
            value={otherDebt}
            onChange={setOtherDebt}
            prefix="$"
            min={0}
            step={25}
            helpText="Medical bills, etc."
          />
          <InputField
            label="Child Support / Alimony"
            id="childSupport"
            value={childSupport}
            onChange={setChildSupport}
            prefix="$"
            min={0}
            step={25}
          />
        </div>
      </div>

      {results && (
        <div className="mt-8">
          {/* Primary DTI Results */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className={`rounded-lg ${results.frontEndRating.bg} p-5 text-center`}>
              <p className={`text-sm font-medium ${results.frontEndRating.color}`}>Front-End DTI (Housing Only)</p>
              <p className={`mt-1 text-3xl font-bold ${results.frontEndRating.color}`}>
                {formatPercent(results.frontEndDti)}
              </p>
              <p className={`mt-1 text-sm font-semibold ${results.frontEndRating.color}`}>
                {results.frontEndRating.label}
              </p>
            </div>
            <div className={`rounded-lg ${results.backEndRating.bg} p-5 text-center`}>
              <p className={`text-sm font-medium ${results.backEndRating.color}`}>Back-End DTI (All Debt)</p>
              <p className={`mt-1 text-3xl font-bold ${results.backEndRating.color}`}>
                {formatPercent(results.backEndDti)}
              </p>
              <p className={`mt-1 text-sm font-semibold ${results.backEndRating.color}`}>
                {results.backEndRating.label}
              </p>
            </div>
          </div>

          {/* Rating Description */}
          <div className="mt-4 rounded-lg bg-ink-100 p-4">
            <p className="text-sm text-ink-700">{results.backEndRating.description}</p>
          </div>

          {/* Summary Cards */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-ink-100 p-3 text-center">
              <p className="text-xs font-medium text-ink-500">Gross Income</p>
              <p className="mt-1 text-lg font-bold text-ink-800">{formatCurrency(results.income)}/mo</p>
            </div>
            <div className="rounded-lg bg-ink-100 p-3 text-center">
              <p className="text-xs font-medium text-ink-500">Total Debt Payments</p>
              <p className="mt-1 text-lg font-bold text-ink-800">{formatCurrency(results.totalDebt)}/mo</p>
            </div>
            <div className="rounded-lg bg-ink-100 p-3 text-center">
              <p className="text-xs font-medium text-ink-500">Remaining After Debt</p>
              <p className="mt-1 text-lg font-bold text-ink-800">{formatCurrency(results.income - results.totalDebt)}/mo</p>
            </div>
            <div className="rounded-lg bg-ink-100 p-3 text-center">
              <p className="text-xs font-medium text-ink-500">Annual Debt Payments</p>
              <p className="mt-1 text-lg font-bold text-ink-800">{formatCurrency(results.totalDebt * 12)}/yr</p>
            </div>
          </div>

          {/* Debt Breakdown Bar */}
          {results.debtBreakdown.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-medium text-ink-700">Debt Payment Breakdown</p>
              <div className="mt-2 flex h-5 overflow-hidden rounded-full">
                {results.debtBreakdown.map((d) => (
                  <div
                    key={d.label}
                    className={d.color}
                    style={{ width: `${(d.amount / results.totalDebt) * 100}%` }}
                    title={d.label}
                  />
                ))}
              </div>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-500">
                {results.debtBreakdown.map((d) => (
                  <span key={d.label}>
                    <span className={`mr-1 inline-block h-2 w-2 rounded-full ${d.color}`} />
                    {d.label}: {formatCurrency(d.amount)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Lender Thresholds */}
          <div className="mt-6">
            <p className="text-sm font-medium text-ink-700">Lender Qualification Thresholds</p>
            <div className="mt-2 overflow-auto rounded-lg border border-ink-200">
              <table className="w-full text-sm">
                <thead className="bg-ink-100">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium text-ink-600">Loan Type</th>
                    <th className="px-3 py-2 text-right font-medium text-ink-600">Limit</th>
                    <th className="px-3 py-2 text-right font-medium text-ink-600">Your DTI</th>
                    <th className="px-3 py-2 text-center font-medium text-ink-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {results.thresholds.map((t) => {
                    const passes = t.your <= t.limit;
                    return (
                      <tr key={t.label} className="border-t border-ink-100">
                        <td className="px-3 py-2 text-ink-700">
                          {t.label}
                          <span className="ml-1 text-xs text-ink-400">({t.type})</span>
                        </td>
                        <td className="px-3 py-2 text-right text-ink-700">{t.limit}%</td>
                        <td className="px-3 py-2 text-right text-ink-700">{formatPercent(t.your)}</td>
                        <td className="px-3 py-2 text-center">
                          <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${passes ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                            {passes ? "Pass" : "Over"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Room to Borrow */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-accent-50 p-4 text-center">
              <p className="text-sm font-medium text-accent-700">Max Housing at 28% DTI</p>
              <p className="mt-1 text-xl font-bold text-accent-900">{formatCurrency(results.maxHousingAt28)}/mo</p>
              <p className="mt-1 text-xs text-accent-600">
                {results.housingRoom >= 0
                  ? `${formatCurrency(results.housingRoom)} room`
                  : `${formatCurrency(Math.abs(results.housingRoom))} over`}
              </p>
            </div>
            <div className="rounded-lg bg-ink-100 p-4 text-center">
              <p className="text-sm font-medium text-ink-600">Max Total Debt at 36%</p>
              <p className="mt-1 text-xl font-bold text-ink-800">{formatCurrency(results.maxTotalAt36)}/mo</p>
              <p className="mt-1 text-xs text-ink-500">
                {results.totalRoom36 >= 0
                  ? `${formatCurrency(results.totalRoom36)} room`
                  : `${formatCurrency(Math.abs(results.totalRoom36))} over`}
              </p>
            </div>
            <div className="rounded-lg bg-ink-100 p-4 text-center">
              <p className="text-sm font-medium text-ink-600">Max Total Debt at 43%</p>
              <p className="mt-1 text-xl font-bold text-ink-800">{formatCurrency(results.maxTotalAt43)}/mo</p>
              <p className="mt-1 text-xs text-ink-500">
                {results.totalRoom43 >= 0
                  ? `${formatCurrency(results.totalRoom43)} room`
                  : `${formatCurrency(Math.abs(results.totalRoom43))} over`}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
