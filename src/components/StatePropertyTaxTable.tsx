"use client";

import { useMemo, useState } from "react";

export interface PropertyTaxTableRow {
  rank: number;
  name: string;
  abbr: string;
  /** median real estate taxes paid, dollars a year */
  med: number;
  /** 90% margin of error of med, dollars */
  medMoe: number;
  /** median tax divided by median home value, percent */
  effRate: number;
  /** median tax, owners with a mortgage, dollars */
  medMort: number;
  /** median tax, owners without a mortgage, dollars */
  medFree: number;
  /** percent of owners whose bill is $3,000 or more */
  over3000: number;
  /** percent of owners who report no real estate tax */
  noTax: number;
  /** mean bill among owners who report one, dollars */
  mean: number;
  /** effective rate applied to the illustrative home, dollars a year */
  billOnHome: number;
}

type SortKey =
  | "rank"
  | "name"
  | "med"
  | "effRate"
  | "medMort"
  | "medFree"
  | "over3000"
  | "noTax"
  | "mean"
  | "billOnHome";

const usd0 = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export function StatePropertyTaxTable({
  rows,
  usMedian,
  homeValue,
}: {
  rows: PropertyTaxTableRow[];
  usMedian: number;
  homeValue: number;
}) {
  const columns: { key: SortKey; label: string; align: "left" | "right" }[] = [
    { key: "rank", label: "Rank", align: "left" },
    { key: "name", label: "State", align: "left" },
    { key: "med", label: "Median bill", align: "left" },
    { key: "effRate", label: "Effective rate", align: "right" },
    { key: "medMort", label: "Median, with mortgage", align: "right" },
    { key: "medFree", label: "Median, no mortgage", align: "right" },
    { key: "over3000", label: "Owners paying $3,000 or more", align: "right" },
    { key: "noTax", label: "Owners reporting no tax", align: "right" },
    { key: "mean", label: "Mean bill", align: "right" },
    { key: "billOnHome", label: `On a ${usd0(homeValue)} home`, align: "right" },
  ];

  const [sortKey, setSortKey] = useState<SortKey>("rank");
  const [asc, setAsc] = useState(true);
  const [query, setQuery] = useState("");

  const maxMed = Math.max(...rows.map((r) => r.med));

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
            placeholder="e.g. Texas or TX"
            className="w-52 rounded-lg border border-ink-300 bg-white px-3 py-2 text-sm text-ink-900 shadow-input transition-colors focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/15"
          />
        </label>
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-500">
          <li className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-sm bg-brand-600" />
            Median property tax bill for owner-occupied homes
          </li>
        </ul>
      </div>

      <div className="mt-3 overflow-x-auto rounded-xl border border-ink-200 bg-white shadow-card">
        <table className="w-full min-w-[1240px] text-sm">
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
                <td className="px-3 py-2 font-medium text-ink-900">{r.name}</td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="relative h-2.5 w-24 shrink-0 rounded-full bg-ink-100"
                      title={`Median property tax ${usd0(r.med)} a year, margin of error ±${usd0(r.medMoe)}`}
                    >
                      <div
                        className="h-2.5 rounded-full bg-brand-600"
                        style={{ width: `${(r.med / maxMed) * 100}%` }}
                      />
                      <div
                        className="absolute top-[-2px] h-[14px] w-px bg-ink-700"
                        style={{ left: `${(usMedian / maxMed) * 100}%` }}
                        aria-hidden="true"
                      />
                    </div>
                    <span className="w-16 tabular-nums font-semibold text-ink-900">{usd0(r.med)}</span>
                  </div>
                </td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{r.effRate.toFixed(2)}%</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(r.medMort)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(r.medFree)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{r.over3000.toFixed(1)}%</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{r.noTax.toFixed(1)}%</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(r.mean)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(r.billOnHome)}</td>
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
        Rank 1 is the state with the highest median property tax bill. The thin vertical mark on each bar is the
        U.S. median ({usd0(usMedian)}); hover a bar for its margin of error. The effective rate is the median bill
        divided by the median home value. The mean is the total tax divided by the owners who report a bill. The
        last column applies each state's effective rate to a {usd0(homeValue)} home, so it is an illustration,
        not a quote for any property.
      </p>
    </div>
  );
}
