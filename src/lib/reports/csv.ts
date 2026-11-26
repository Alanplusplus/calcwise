/**
 * File name and response for the CSV download of a data report. The ACS year and the version come from
 * the report's own REPORT metadata, so the name changes when the data year or the version changes.
 */

export interface CsvReportMeta {
  slug: string;
  acsYear: number;
  csvVersion: number;
}

/** For example "calcwise-property-tax-by-state-acs2025-v1.csv". */
export function csvFilename(report: CsvReportMeta): string {
  return `calcwise-${report.slug}-acs${report.acsYear}-v${report.csvVersion}.csv`;
}

export function csvResponse(body: string, report: CsvReportMeta): Response {
  return new Response(body, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${csvFilename(report)}"`,
    },
  });
}
