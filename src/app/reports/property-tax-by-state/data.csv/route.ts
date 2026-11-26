import { csvResponse } from "@/lib/reports/csv";
import { REPORT, buildCsv } from "@/lib/reports/property-tax-by-state";

export const dynamic = "force-static";

export function GET() {
  return csvResponse(buildCsv(), REPORT);
}
