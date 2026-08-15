import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${site.name} — our mission to provide free, accurate financial calculators to help everyone make smarter money decisions.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-ink-900">About {site.name}</h1>

      <div className="prose mt-8">
        <p>
          CalcWise was founded with a simple mission: make financial planning
          accessible to everyone. We believe that understanding your finances
          shouldn&apos;t require expensive software, a finance degree, or a paid
          consultation. A well-designed calculator and clear explanation can
          answer most financial questions people face daily.
        </p>

        <h2>Our Mission</h2>
        <p>
          We build free, accurate, and privacy-respecting financial tools that
          help people make confident decisions about mortgages, savings,
          investments, debt, and retirement. Every calculator on this site runs
          entirely in your browser — we never collect, store, or transmit your
          financial data.
        </p>

        <h2>Why We Built This</h2>
        <p>
          Financial literacy is one of the most impactful life skills, yet it&apos;s
          rarely taught in schools. Millions of people make major financial
          decisions — buying a home, choosing a loan, planning retirement —
          without fully understanding the numbers. CalcWise exists to close that
          gap with tools that are simple enough for beginners but thorough
          enough for informed decision-making.
        </p>

        <h2>Our Approach</h2>
        <ul>
          <li>
            <strong>Accuracy first:</strong> Our calculators use
            industry-standard financial formulas. We test edge cases and verify
            results against established financial tools.
          </li>
          <li>
            <strong>Education alongside tools:</strong> Every calculator comes
            with an in-depth guide explaining the concepts, formulas, and
            practical tips — not just a number output.
          </li>
          <li>
            <strong>No data collection:</strong> All calculations happen
            client-side in your browser. We use no cookies for tracking and
            don&apos;t require any personal information.
          </li>
          <li>
            <strong>Always free:</strong> We sustain the site through
            advertising. We will never charge for calculator access or gate
            features behind a paywall.
          </li>
        </ul>

        <h2>Editorial Standards</h2>
        <p>
          Content on CalcWise is researched and written by our editorial team
          with input from finance professionals. We update articles regularly to
          reflect current rates, tax rules, and financial best practices. Each
          page includes a &quot;last updated&quot; date so you know the
          information is current.
        </p>
        <p>
          While we strive for accuracy, our tools and content are for
          educational purposes only and should not be considered personalized
          financial advice. For decisions involving significant money, we
          recommend consulting a qualified financial advisor.
        </p>

        <h2>Contact Us</h2>
        <p>
          Have a question, suggestion, or found an error? We&apos;d love to hear
          from you. Visit our{" "}
          <a href="/contact">contact page</a> to get in touch.
        </p>
      </div>
    </div>
  );
}
