import { buildCsv } from "@/lib/reports/retirement-income-by-state";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildCsv(), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="calcwise-retirement-income-by-state-2026.csv"',
    },
  });
}
