"use client";

import { useMemo, useState } from "react";

export interface SelfEmploymentTableRow {
  rank: number;
  name: string;
  abbr: string;
  /** percent of employed workers who are self-employed */
  seShare: number;
  /** 90% margin of error of seShare, percentage points */
  seShareMoe: number;
  /** percent of the self-employed whose business is unincorporated */
  unincShare: number;
  /** percent of the self-employed who are women */
  femaleShare: number;
  /** percent of households with self-employment income */
  hhShare: number;
  /** mean self-employment income of the households that report it, dollars a year */
  seMean: number;
  /** self-employment income as a percent of self-employment plus wage and salary income */
  earnShare: number;
  /** self-employment tax on the mean self-employment income, 2026 rules, dollars */
  seTax: number;
}

type SortKey =
  | "rank"
  | "name"
  | "seShare"
  | "unincShare"
  | "femaleShare"
  | "hhShare"
  | "seMean"
  | "earnShare"
  | "seTax";

const columns: { key: SortKey; label: string; align: "left" | "right" }[] = [
  { key: "rank", label: "Rank", align: "left" },
  { key: "name", label: "State", align: "left" },
  { key: "seShare", label: "Workers who are self-employed", align: "left" },
  { key: "unincShare", label: "Unincorporated, % of self-employed", align: "right" },
  { key: "femaleShare", label: "Women, % of self-employed", align: "right" },
  { key: "hhShare", label: "Households with self-employment income", align: "right" },
  { key: "seMean", label: "Mean self-employment income", align: "right" },
  { key: "earnShare", label: "Self-employment, % of earned income", align: "right" },
  { key: "seTax", label: "Self-employment tax on the mean", align: "right" },
];

const usd0 = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export function StateSelfEmploymentTable({
  rows,
  usShare,
}: {
  rows: SelfEmploymentTableRow[];
  usShare: number;
}) {
  const [sortKey, setSortKey] = useState<SortKey>("rank");
  const [asc, setAsc] = useState(true);
  const [query, setQuery] = useState("");

  const maxShare = Math.max(...rows.map((r) => r.seShare));

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
            placeholder="e.g. Montana or MT"
            className="w-52 rounded-lg border border-ink-300 bg-white px-3 py-2 text-sm text-ink-900 shadow-input transition-colors focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/15"
          />
        </label>
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-500">
          <li className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-sm bg-brand-600" />
            Share of employed workers who run their own business
          </li>
        </ul>
      </div>

      <div className="mt-3 overflow-x-auto rounded-xl border border-ink-200 bg-white shadow-card">
        <table className="w-full min-w-[1180px] text-sm">
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
                      title={`${r.seShare.toFixed(1)}% of employed workers are self-employed, margin of error ±${r.seShareMoe.toFixed(1)} points`}
                    >
                      <div
                        className="h-2.5 rounded-full bg-brand-600"
                        style={{ width: `${(r.seShare / maxShare) * 100}%` }}
                      />
                      <div
                        className="absolute top-[-2px] h-[14px] w-px bg-ink-700"
                        style={{ left: `${(usShare / maxShare) * 100}%` }}
                        aria-hidden="true"
                      />
                    </div>
                    <span className="w-14 tabular-nums font-semibold text-ink-900">{r.seShare.toFixed(1)}%</span>
                  </div>
                </td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{r.unincShare.toFixed(1)}%</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{r.femaleShare.toFixed(1)}%</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{r.hhShare.toFixed(1)}%</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(r.seMean)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{r.earnShare.toFixed(1)}%</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(r.seTax)}</td>
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
        Rank 1 is the state where the largest share of employed workers is self-employed in an own business,
        incorporated or not. The thin vertical mark on each bar is the U.S. figure ({usShare.toFixed(1)}%);
        hover a bar for its margin of error. The mean is per household that reports any self-employment
        income, losses included. The last column applies the 2026 self-employment tax rules to that mean.
      </p>
    </div>
  );
}
