"use client";

import { useMemo, useState } from "react";
import { StateNameLink } from "./StateNameLink";

export interface IncomeTableRow {
  rank: number;
  name: string;
  abbr: string;
  /** percent of households with income of $100,000 or more */
  h100: number;
  /** 90% margin of error of h100, percentage points */
  h100Moe: number;
  /** percent of households with income of $150,000 or more */
  h150: number;
  /** percent of households with income of $200,000 or more */
  h200: number;
  /** median household income */
  income: number;
  /** lower limit of the top 20 percent of households, dollars */
  q4: number;
  /** median monthly rent times 12 as a percent of $100,000 */
  rentShare: number;
  /** payment on the median home times 12 as a percent of $100,000 */
  paymentShare: number;
}

type SortKey = "rank" | "name" | "h100" | "h150" | "h200" | "income" | "q4" | "rentShare" | "paymentShare";

const columns: { key: SortKey; label: string; align: "left" | "right" }[] = [
  { key: "rank", label: "Rank", align: "left" },
  { key: "name", label: "State", align: "left" },
  { key: "h100", label: "Households at $100K or more", align: "left" },
  { key: "h150", label: "At $150K or more", align: "right" },
  { key: "h200", label: "At $200K or more", align: "right" },
  { key: "income", label: "Median household income", align: "right" },
  { key: "q4", label: "Top 20% starts at", align: "right" },
  { key: "rentShare", label: "Median rent, % of $100K", align: "right" },
  { key: "paymentShare", label: "Median-home payment, % of $100K", align: "right" },
];

const usd0 = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export function StateIncomeTable({
  rows,
  usShare,
}: {
  rows: IncomeTableRow[];
  usShare: number;
}) {
  const [sortKey, setSortKey] = useState<SortKey>("rank");
  const [asc, setAsc] = useState(true);
  const [query, setQuery] = useState("");

  const maxShare = Math.max(...rows.map((r) => r.h100));

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? rows.filter((r) => r.name.toLowerCase().includes(q) || r.abbr.toLowerCase() === q)
      : rows;
    return [...filtered].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const cmp =
        typeof av === "string" && typeof bv === "string"
          ? av.localeCompare(bv)
          : (av as number) - (bv as number);
      return asc ? cmp : -cmp;
    });
  }, [rows, sortKey, asc, query]);

  function toggle(key: SortKey) {
    if (key === sortKey) {
      setAsc(!asc);
    } else {
      setSortKey(key);
      setAsc(key === "rank" || key === "name");
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <label className="flex items-center gap-2 text-sm text-ink-600">
          <span className="font-medium text-ink-800">Find a state</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Ohio or OH"
            className="w-52 rounded-lg border border-ink-300 bg-white px-3 py-2 text-sm text-ink-900 shadow-input transition-colors focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/15"
          />
        </label>
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-500">
          <li className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-sm bg-brand-600" />
            Share of households with income of $100,000 or more
          </li>
        </ul>
      </div>

      <div className="mt-3 overflow-x-auto rounded-xl border border-ink-200 bg-white shadow-card">
        <table className="w-full min-w-[1120px] text-sm">
          <thead className="bg-paper-2 text-[0.6875rem] uppercase tracking-[0.07em] text-ink-600">
            <tr className="border-b-2 border-brand-800">
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  aria-sort={col.key === sortKey ? (asc ? "ascending" : "descending") : "none"}
                  className={`px-3 py-3 font-semibold ${col.align === "right" ? "text-right" : "text-left"}`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(col.key)}
                    className="inline-flex items-center gap-1 text-left uppercase hover:text-brand-600"
                  >
                    {col.label}
                    <span aria-hidden="true" className="text-ink-400">
                      {col.key === sortKey ? (asc ? "▲" : "▼") : ""}
                    </span>
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {visible.map((r) => (
              <tr key={r.abbr} className="transition-colors hover:bg-gold-50">
                <td className="px-3 py-2 text-ink-500">{r.rank}</td>
                <td className="px-3 py-2 font-medium text-ink-900">
                  <StateNameLink abbr={r.abbr} name={r.name} />
                </td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="relative h-2.5 w-24 shrink-0 rounded-full bg-ink-100"
                      title={`${r.h100.toFixed(1)}% of households have income of $100,000 or more, margin of error ±${r.h100Moe.toFixed(1)} points`}
                    >
                      <div
                        className="h-2.5 rounded-full bg-brand-600"
                        style={{ width: `${(r.h100 / maxShare) * 100}%` }}
                      />
                      <div
                        className="absolute top-[-2px] h-[14px] w-px bg-ink-700"
                        style={{ left: `${(usShare / maxShare) * 100}%` }}
                        aria-hidden="true"
                      />
                    </div>
                    <span className="w-14 tabular-nums font-semibold text-ink-900">{r.h100.toFixed(1)}%</span>
                  </div>
                </td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{r.h150.toFixed(1)}%</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{r.h200.toFixed(1)}%</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(r.income)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(r.q4)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{r.rentShare.toFixed(1)}%</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{r.paymentShare.toFixed(1)}%</td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-3 py-6 text-center text-ink-500">
                  No state matches that search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-ink-500">
        Rank 1 is the state where the largest share of households has income of $100,000 or more. The thin
        vertical mark on each bar is the U.S. figure ({usShare.toFixed(1)}%); hover a bar for its margin of
        error. The last two columns show what the median rent and the payment on the median home (principal,
        interest, and property tax) would take out of a $100,000 income, before any tax.
      </p>
    </div>
  );
}
