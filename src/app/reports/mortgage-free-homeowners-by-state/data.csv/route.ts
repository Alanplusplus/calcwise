import { buildCsv } from "@/lib/reports/mortgage-free-homeowners-by-state";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildCsv(), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="calcwise-mortgage-free-homeowners-by-state-2026.csv"',
    },
  });
}
