import type { Metadata } from "next";
import Link from "next/link";
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
          shouldn't require expensive software, a finance degree, or a paid
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
          Financial literacy is one of the most impactful life skills, yet it's
          rarely taught in schools. Millions of people make major financial
          decisions — buying a home, choosing a loan, planning retirement —
          without fully understanding the numbers. CalcWise exists to close that
          gap with tools that are simple enough for beginners but thorough
          enough for informed decision-making.
        </p>

        <h2>Our Approach</h2>
        <ul>
          <li>
            <strong>Accuracy first:</strong> Our calculators use standard
            financial formulas, and every input has minimum and maximum bounds
            so a formula cannot break. The formulas, assumptions, data sources,
            and known limits behind each tool are documented on
            our <Link href="/methodology">methodology page</Link>.
          </li>
          <li>
            <strong>Education alongside tools:</strong> Every calculator comes
            with an in-depth guide explaining the concepts, formulas, and
            practical tips — not just a number output.
          </li>
          <li>
            <strong>Private by design:</strong> All calculations happen
            client-side in your browser, so the numbers you enter never reach
            us. We use no tracking cookies and don't require any personal
            information. The only measurement is anonymous, cookieless
            page-view statistics.
          </li>
          <li>
            <strong>Always free:</strong> We will never charge for calculator
            access or gate features behind a paywall.
          </li>
        </ul>

        <h2>Who Maintains CalcWise</h2>
        <p>
          CalcWise is built and maintained by Alan, an independent developer.
          Parts of the site's content, including guides and calculator
          articles, are drafted with the help of AI tools.
        </p>

        <h2>Editorial Standards</h2>
        <p>
          Our review process checks every rate, limit, tax bracket, and
          benchmark against a primary source, such as the IRS, the Census
          Bureau, or Freddie Mac. Pages that have been through it show a
          Sources line with links and the month the figures were checked; the{" "}
          <Link href="/methodology">methodology page</Link> lists which pages
          are covered and which are still waiting. Guides show a "last
          updated" date so you know how current the information is. If you
          find an error, email{" "}
          <a href="mailto:hello@calcwise.tools">hello@calcwise.tools</a> and
          we will check it against the source.
        </p>
        <p>
          While we strive for accuracy, our tools and content are for
          educational purposes only and should not be considered personalized
          financial advice. For decisions involving significant money, we
          recommend consulting a qualified financial advisor.
        </p>

        <h2>Contact Us</h2>
        <p>
          Have a question, suggestion, or found an error? We'd love to hear
          from you. Visit our{" "}
          <a href="/contact">contact page</a> to get in touch.
        </p>
      </div>
    </div>
  );
}
