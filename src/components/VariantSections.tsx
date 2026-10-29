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
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-ink-900">Quick Numbers</h2>
          <div className="mt-4 overflow-hidden rounded-xl border border-ink-200 bg-white shadow-card">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-ink-100">
                {keyResults.map((r, i) => (
                  <tr key={i}>
                    <td className="px-5 py-3.5 text-ink-600">{r.label}</td>
                    <td className="numeral px-5 py-3.5 text-right text-lg font-semibold text-ink-900">
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
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-ink-900">How This Compares</h2>
          <div className="mt-4 rounded-xl border border-ink-200 border-l-[3px] border-l-gold-500 bg-white p-5 shadow-card">
            <p className="leading-relaxed text-ink-700">{comparisonNote}</p>
          </div>
        </div>
      )}

      {faq && faq.length > 0 && (
        <div className="mt-10">
          <FaqJsonLd
            faqs={faq.map((f) => ({ question: f.q, answer: f.a }))}
          />
          <h2 className="text-2xl font-semibold text-ink-900">
            Frequently Asked Questions
          </h2>
          <dl className="mt-5 divide-y divide-ink-200 border-y border-ink-200">
            {faq.map((f, i) => (
              <div key={i} className="py-5">
                <dt className="font-serif text-lg font-semibold leading-snug text-ink-900">{f.q}</dt>
                <dd className="mt-2 leading-relaxed text-ink-700">{f.a}</dd>
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
          className="mt-8"
        />
      )}
    </>
  );
}
