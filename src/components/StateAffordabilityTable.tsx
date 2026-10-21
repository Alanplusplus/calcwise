"use client";

import { useMemo, useState } from "react";

export interface StateTableRow {
  rank: number;
  name: string;
  abbr: string;
  value: number;
  income: number;
  payment: number;
  share: number;
  shareLow: number;
  shareHigh: number;
  incomeNeeded: number;
}

type SortKey = "rank" | "name" | "value" | "income" | "payment" | "share" | "incomeNeeded";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const columns: { key: SortKey; label: string; align: "left" | "right" }[] = [
  { key: "rank", label: "Rank", align: "left" },
  { key: "name", label: "State", align: "left" },
  { key: "value", label: "Median home value", align: "right" },
  { key: "income", label: "Median household income", align: "right" },
  { key: "payment", label: "Monthly payment", align: "right" },
  { key: "share", label: "Share of income", align: "left" },
  { key: "incomeNeeded", label: "Income needed", align: "right" },
];

export function StateAffordabilityTable({
  rows,
  guidelinePct,
}: {
  rows: StateTableRow[];
  guidelinePct: number;
}) {
  const [sortKey, setSortKey] = useState<SortKey>("rank");
  const [asc, setAsc] = useState(true);
  const [query, setQuery] = useState("");

  const maxShare = Math.max(...rows.map((r) => r.shareHigh));
  const farAbove = guidelinePct * 1.5;

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? rows.filter((r) => r.name.toLowerCase().includes(q) || r.abbr.toLowerCase() === q)
      : rows;
    return [...filtered].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const cmp =
        typeof av === "string" && typeof bv === "string" ? av.localeCompare(bv) : (av as number) - (bv as number);
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
            placeholder="e.g. Texas or TX"
            className="w-48 rounded-md border border-ink-200 bg-white px-3 py-1.5 text-sm text-ink-900"
          />
        </label>
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-500">
          <li className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-sm bg-emerald-500" />
            At or under {guidelinePct}%
          </li>
          <li className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-sm bg-amber-500" />
            {guidelinePct}% to {farAbove}%
          </li>
          <li className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-sm bg-red-500" />
            Over {farAbove}%
          </li>
        </ul>
      </div>

      <div className="mt-3 overflow-x-auto rounded-xl border border-ink-200 bg-white">
        <table className="w-full min-w-[820px] text-sm">
          <thead className="bg-ink-50 text-xs text-ink-600">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  aria-sort={
                    col.key === sortKey ? (asc ? "ascending" : "descending") : "none"
                  }
                  className={`px-3 py-2.5 font-semibold ${col.align === "right" ? "text-right" : "text-left"}`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(col.key)}
                    className="inline-flex items-center gap-1 hover:text-brand-600"
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
            {visible.map((r) => {
              const color =
                r.share <= guidelinePct
                  ? "bg-emerald-500"
                  : r.share <= farAbove
                    ? "bg-amber-500"
                    : "bg-red-500";
              return (
                <tr key={r.abbr} className="hover:bg-ink-50">
                  <td className="px-3 py-2 text-ink-500">{r.rank}</td>
                  <td className="px-3 py-2 font-medium text-ink-900">{r.name}</td>
                  <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd.format(r.value)}</td>
                  <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd.format(r.income)}</td>
                  <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd.format(r.payment)}</td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="relative h-2.5 w-28 shrink-0 rounded-full bg-ink-100"
                        title={`90% range: ${r.shareLow.toFixed(1)}% to ${r.shareHigh.toFixed(1)}%`}
                      >
                        <div
                          className={`h-2.5 rounded-full ${color}`}
                          style={{ width: `${(r.share / maxShare) * 100}%` }}
                        />
                        <div
                          className="absolute top-[-2px] h-[14px] w-px bg-ink-700"
                          style={{ left: `${(guidelinePct / maxShare) * 100}%` }}
                          aria-hidden="true"
                        />
                      </div>
                      <span className="w-12 tabular-nums font-semibold text-ink-900">
                        {r.share.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd.format(r.incomeNeeded)}</td>
                </tr>
              );
            })}
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
        Rank 1 is the most affordable. The thin vertical mark on each bar is the {guidelinePct}%
        guideline. Hover a bar to see the 90% range that comes from the Census margins of error.
      </p>
    </div>
  );
}
