"use client";

import { useState, useMemo } from "react";
import { InputField } from "@/components/InputField";

function formatCurrency(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function formatCurrencyExact(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
}

interface Props {
  defaults?: Record<string, string>;
}

interface YearRow {
  year: number;
  shares: number;
  sharePrice: number;
  dividendPerShare: number;
  annualDividend: number;
  portfolioValue: number;
  totalDividends: number;
}

export function DividendCalculator({ defaults }: Props) {
  const [investmentAmount, setInvestmentAmount] = useState(
    defaults?.investmentAmount || "10000"
  );
  const [sharePrice, setSharePrice] = useState(
    defaults?.sharePrice || "50"
  );
  const [dividendPerShare, setDividendPerShare] = useState(
    defaults?.dividendPerShare || "2.00"
  );
  const [dividendGrowth, setDividendGrowth] = useState(
    defaults?.dividendGrowth || "5"
  );
  const [sharePriceGrowth, setSharePriceGrowth] = useState(
    defaults?.sharePriceGrowth || "7"
  );
  const [years, setYears] = useState(defaults?.years || "20");
  const [reinvest, setReinvest] = useState(
    defaults?.reinvest !== "no"
  );
  const [monthlyContribution, setMonthlyContribution] = useState(
    defaults?.monthlyContribution || "200"
  );

  const results = useMemo(() => {
    const invest = parseFloat(investmentAmount) || 0;
    const price = parseFloat(sharePrice) || 0;
    const divPS = parseFloat(dividendPerShare) || 0;
    const divGrowth = (parseFloat(dividendGrowth) || 0) / 100;
    const priceGrowth = (parseFloat(sharePriceGrowth) || 0) / 100;
    const numYears = parseInt(years) || 1;
    const monthly = parseFloat(monthlyContribution) || 0;

    if (invest <= 0 || price <= 0) return null;

    const initialShares = invest / price;
    const initialYield = (divPS / price) * 100;

    let shares = initialShares;
    let currentPrice = price;
    let currentDiv = divPS;
    let totalDividends = 0;
    let totalContributions = invest;
    const yearData: YearRow[] = [];

    for (let y = 1; y <= numYears; y++) {
      currentPrice *= 1 + priceGrowth;
      currentDiv *= 1 + divGrowth;

      const yearlyContribution = monthly * 12;
      const newShares = yearlyContribution / currentPrice;
      shares += newShares;
      totalContributions += yearlyContribution;

      const annualDividend = shares * currentDiv;
      totalDividends += annualDividend;

      if (reinvest) {
        const reinvestedShares = annualDividend / currentPrice;
        shares += reinvestedShares;
      }

      yearData.push({
        year: y,
        shares,
        sharePrice: currentPrice,
        dividendPerShare: currentDiv,
        annualDividend,
        portfolioValue: shares * currentPrice,
        totalDividends,
      });
    }

    const finalValue = shares * currentPrice;
    const finalAnnualDividend = shares * currentDiv;
    const finalYield = (currentDiv / currentPrice) * 100;
    const yieldOnCost = (currentDiv * shares) / totalContributions * 100;

    return {
      initialShares,
      initialYield,
      finalValue,
      finalAnnualDividend,
      finalYield,
      yieldOnCost,
      totalDividends,
      totalContributions,
      yearData,
    };
  }, [investmentAmount, sharePrice, dividendPerShare, dividendGrowth, sharePriceGrowth, years, reinvest, monthlyContribution]);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <InputField
          label="Initial Investment"
          id="investmentAmount"
          value={investmentAmount}
          onChange={setInvestmentAmount}
          prefix="$"
          min={0}
          helpText="Total amount to invest upfront"
        />
        <InputField
          label="Share Price"
          id="sharePrice"
          value={sharePrice}
          onChange={setSharePrice}
          prefix="$"
          min={0.01}
          step={0.01}
          helpText="Current price per share"
        />
        <InputField
          label="Annual Dividend per Share"
          id="dividendPerShare"
          value={dividendPerShare}
          onChange={setDividendPerShare}
          prefix="$"
          min={0}
          step={0.01}
          helpText="Current annual dividend per share"
        />
        <InputField
          label="Dividend Growth Rate"
          id="dividendGrowth"
          value={dividendGrowth}
          onChange={setDividendGrowth}
          suffix="%"
          min={0}
          max={50}
          step={0.5}
          helpText="Expected annual dividend increase"
        />
        <InputField
          label="Share Price Growth"
          id="sharePriceGrowth"
          value={sharePriceGrowth}
          onChange={setSharePriceGrowth}
          suffix="%"
          min={-20}
          max={50}
          step={0.5}
          helpText="Expected annual price appreciation"
        />
        <InputField
          label="Time Period"
          id="years"
          value={years}
          onChange={setYears}
          suffix="years"
          min={1}
          max={50}
          step={1}
        />
        <InputField
          label="Monthly Contribution"
          id="monthlyContribution"
          value={monthlyContribution}
          onChange={setMonthlyContribution}
          prefix="$"
          min={0}
          helpText="Additional monthly investment"
        />
        <div className="flex items-end">
          <label className="flex items-center gap-2 pb-2.5">
            <input
              type="checkbox"
              checked={reinvest}
              onChange={(e) => setReinvest(e.target.checked)}
              className="h-4 w-4 rounded border-ink-300 text-brand-600 focus:ring-brand-500"
            />
            <span className="text-sm font-medium text-ink-700">
              Reinvest Dividends (DRIP)
            </span>
          </label>
        </div>
      </div>

      {results && (
        <div className="mt-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-brand-200 bg-brand-50 p-4">
              <p className="text-sm font-medium text-brand-700">Portfolio Value</p>
              <p className="mt-2 text-xl font-bold text-brand-900">
                {formatCurrency(results.finalValue)}
              </p>
              <p className="mt-1 text-sm text-brand-700">
                After {years} years
              </p>
            </div>
            <div className="rounded-lg border border-accent-200 bg-accent-50 p-4">
              <p className="text-sm font-medium text-accent-700">Annual Dividend Income</p>
              <p className="mt-2 text-xl font-bold text-accent-900">
                {formatCurrency(results.finalAnnualDividend)}
              </p>
              <p className="mt-1 text-sm text-accent-700">
                {formatCurrencyExact(results.finalAnnualDividend / 12)}/month
              </p>
            </div>
            <div className="rounded-lg bg-ink-100 p-4">
              <p className="text-sm font-medium text-ink-600">Total Dividends Earned</p>
              <p className="mt-2 text-xl font-bold text-ink-800">
                {formatCurrency(results.totalDividends)}
              </p>
              <p className="mt-1 text-sm text-ink-600">
                Over {years} years
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-ink-100 p-4">
              <p className="text-sm font-medium text-ink-600">Current Yield</p>
              <p className="mt-2 text-xl font-bold text-ink-800">
                {results.initialYield.toFixed(2)}%
              </p>
              <p className="mt-1 text-sm text-ink-600">
                Dividend / share price
              </p>
            </div>
            <div className="rounded-lg bg-ink-100 p-4">
              <p className="text-sm font-medium text-ink-600">Yield on Cost</p>
              <p className="mt-2 text-xl font-bold text-ink-800">
                {results.yieldOnCost.toFixed(2)}%
              </p>
              <p className="mt-1 text-sm text-ink-600">
                Dividend / total invested
              </p>
            </div>
            <div className="rounded-lg bg-ink-100 p-4">
              <p className="text-sm font-medium text-ink-600">Total Invested</p>
              <p className="mt-2 text-xl font-bold text-ink-800">
                {formatCurrency(results.totalContributions)}
              </p>
              <p className="mt-1 text-sm text-ink-600">
                Initial + contributions
              </p>
            </div>
            <div className="rounded-lg bg-ink-100 p-4">
              <p className="text-sm font-medium text-ink-600">Initial Shares</p>
              <p className="mt-2 text-xl font-bold text-ink-800">
                {results.initialShares.toFixed(2)}
              </p>
              <p className="mt-1 text-sm text-ink-600">
                At purchase price
              </p>
            </div>
          </div>

          {results.yearData.length > 1 && (
            <div className="mt-6 overflow-x-auto">
              <h3 className="mb-3 text-sm font-semibold text-ink-700">
                Year-by-Year Growth
              </h3>
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead>
                  <tr className="border-b border-ink-200 text-ink-500">
                    <th className="py-2 pr-4 font-medium">Year</th>
                    <th className="py-2 pr-4 font-medium">Shares</th>
                    <th className="py-2 pr-4 font-medium">Div/Share</th>
                    <th className="py-2 pr-4 font-medium">Annual Dividend</th>
                    <th className="py-2 pr-4 font-medium">Portfolio Value</th>
                    <th className="py-2 font-medium">Total Dividends</th>
                  </tr>
                </thead>
                <tbody>
                  {results.yearData.map((row) => (
                    <tr key={row.year} className="border-b border-ink-100">
                      <td className="py-2 pr-4 text-ink-800">{row.year}</td>
                      <td className="py-2 pr-4 text-ink-800">{row.shares.toFixed(2)}</td>
                      <td className="py-2 pr-4 text-ink-800">{formatCurrencyExact(row.dividendPerShare)}</td>
                      <td className="py-2 pr-4 text-green-700">{formatCurrency(row.annualDividend)}</td>
                      <td className="py-2 pr-4 text-ink-800">{formatCurrency(row.portfolioValue)}</td>
                      <td className="py-2 text-green-700">{formatCurrency(row.totalDividends)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
