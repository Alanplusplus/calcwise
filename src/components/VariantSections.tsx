import type { CalculatorVariant } from "@/lib/variants/types";
import { FaqJsonLd } from "./FaqJsonLd";
import { Sources } from "./Sources";

interface Props {
  variant: CalculatorVariant;
}

export function VariantSections({ variant }: Props) {
  const { keyResults, comparisonNote, faq, sources, sourcesChecked, sourcesNote } = variant;
  const hasContent = keyResults?.length || comparisonNote || faq?.length || sources?.length;
  if (!hasContent) return null;

  return (
    <>
      {keyResults && keyResults.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold text-ink-900">Quick Numbers</h2>
          <div className="mt-4 overflow-hidden rounded-lg border border-ink-200">
            <table className="w-full text-left text-sm">
              <tbody>
                {keyResults.map((r, i) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? "bg-white" : "bg-ink-50"}
                  >
                    <td className="px-4 py-3 font-medium text-ink-700">
                      {r.label}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-ink-900">
                      {r.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {comparisonNote && (
        <div className="mt-8">
          <h2 className="text-xl font-bold text-ink-900">How This Compares</h2>
          <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
            <p className="text-ink-700">{comparisonNote}</p>
          </div>
        </div>
      )}

      {faq && faq.length > 0 && (
        <div className="mt-8">
          <FaqJsonLd
            faqs={faq.map((f) => ({ question: f.q, answer: f.a }))}
          />
          <h2 className="text-xl font-bold text-ink-900">
            Frequently Asked Questions
          </h2>
          <dl className="mt-4 space-y-4">
            {faq.map((f, i) => (
              <div key={i}>
                <dt className="font-semibold text-ink-900">{f.q}</dt>
                <dd className="mt-1 text-ink-700">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {sources && sources.length > 0 && (
        <Sources
          items={sources}
          checked={sourcesChecked}
          note={sourcesNote}
          className="mt-8 border-t border-ink-200 pt-4"
        />
      )}
    </>
  );
}
