import { buildCsv } from "@/lib/reports/rent-vs-buy-by-state";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildCsv(), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="calcwise-rent-vs-buy-by-state-2026.csv"',
    },
  });
}
