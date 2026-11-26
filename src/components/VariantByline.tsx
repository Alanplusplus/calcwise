import type { CalculatorVariant } from "@/lib/variants/types";
import { AuthorByline } from "./AuthorByline";

const updatedFormat = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

/** Last-updated date and founder byline shown under the variant page description. */
export function VariantByline({ variant }: { variant: Pick<CalculatorVariant, "lastUpdated"> }) {
  return (
    <div className="mt-3">
      <p className="text-sm text-ink-500">Last updated {updatedFormat.format(new Date(variant.lastUpdated))}</p>
      <AuthorByline />
    </div>
  );
}
