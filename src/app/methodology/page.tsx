import type { Metadata } from "next";
import Link from "next/link";
import { ADDITIONAL_MEDICARE_THRESHOLDS, TAX_DATA, usd } from "@/lib/tax-data";
import { site } from "@/lib/site";
import { MORTGAGE_MARKET } from "@/lib/market-data";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

const title = "Calculator Methodology: Formulas & Sources";
const description = `How ${site.name} calculators work: the formulas behind each tool, default assumptions, data sources, accuracy limits, and how we handle corrections.`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} | ${site.name}`,
    description,
    type: "website",
  },
};

const sources = [
  {
    name: "IRS",
    href: "https://www.irs.gov/",
    use: "tax brackets, standard deductions, contribution limits",
  },
  {
    name: "Social Security Administration",
    href: "https://www.ssa.gov/",
    use: "Social Security wage base and benefit figures",
  },
  {
    name: "Federal Reserve and FRED",
    href: "https://fred.stlouisfed.org/",
    use: "interest rates and consumer credit data",
  },
  {
    name: "Bureau of Labor Statistics",
    href: "https://www.bls.gov/",
    use: "inflation and wage data",
  },
  {
    name: "Consumer Financial Protection Bureau",
    href: "https://www.consumerfinance.gov/",
    use: "mortgage, loan, and credit card rules",
  },
  {
    name: "FDIC",
    href: "https://www.fdic.gov/",
    use: "national deposit rates",
  },
  {
    name: "Freddie Mac Primary Mortgage Market Survey",
    href: "https://www.freddiemac.com/pmms",
    use: "average mortgage rates",
  },
  {
    name: "Federal Student Aid",
    href: "https://studentaid.gov/",
    use: "federal student loan terms",
  },
];

export default function MethodologyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <BreadcrumbJsonLd
        items={[{ name: "Methodology", href: "/methodology" }]}
      />

      <nav className="mb-6 text-sm text-ink-500">
        <Link href="/" className="hover:text-brand-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink-700">Methodology</span>
      </nav>

      <h1 className="text-3xl font-bold text-ink-900">Calculator Methodology</h1>
      <p className="mt-2 text-sm text-ink-500">Last updated: October 2026</p>

      <div className="prose mt-8">
        <p>
          This page explains how every {site.name} calculator turns your inputs
          into a result: which formulas run, which assumptions are built in,
          where reference data comes from, and where an estimate stops being
          reliable. All calculations run in your browser, so nothing you type
          into a calculator is sent to our servers.
        </p>

        <h2>How every calculator works</h2>
        <ul>
          <li>
            Each tool applies either a closed-form formula or a month-by-month
            simulation, written in JavaScript and executed on your device.
          </li>
          <li>
            Interest rates are entered as annual percentages and converted to a
            monthly rate (annual rate ÷ 12) unless a tool states otherwise.
          </li>
          <li>
            Payments and contributions are assumed to happen at the end of each
            month.
          </li>
          <li>
            Intermediate values keep full floating-point precision. Rounding
            happens only when a number is displayed.
          </li>
        </ul>

        <h2>Loan payments and amortization</h2>
        <p>
          The mortgage, house payment, auto loan, student loan, refinance, loan
          comparison, amortization, and car affordability calculators all use the
          standard fixed-rate amortization formula:
        </p>
        <p className="rounded-lg bg-ink-50 p-4 text-center font-mono text-sm">
          M = P × [r(1 + r)^n] / [(1 + r)^n − 1]
        </p>
        <ul>
          <li>
            <strong>M</strong> = monthly payment
          </li>
          <li>
            <strong>P</strong> = loan principal (amount borrowed)
          </li>
          <li>
            <strong>r</strong> = monthly interest rate (APR ÷ 12)
          </li>
          <li>
            <strong>n</strong> = number of monthly payments (years × 12)
          </li>
        </ul>
        <p>
          Tools that accept a 0% rate use M = P ÷ n instead, because the formula
          above divides by zero at 0%.
        </p>
        <p>
          <strong>Worked example.</strong> A $350,000 home with $70,000 down
          leaves P = $280,000. At 7.40% APR, r = 0.074 ÷ 12 = 0.006167. Over 30
          years (n = 360) the payment is <strong>$1,938.66</strong>, total paid
          is $697,919, and $417,919 of that is interest. In month one, $1,726.67
          goes to interest and only about $212 reduces the balance.
        </p>
        <p>
          <strong>Comparison.</strong> The same loan over 15 years (n = 180)
          costs $2,579.75 a month, which is $641.09 more, but total interest
          falls to $184,355, a saving of $233,564. Test your own numbers with the{" "}
          <Link href="/calculators/mortgage">Mortgage Calculator</Link> or compare
          two loans with the{" "}
          <Link href="/calculators/loan-comparison">Loan Comparison Calculator</Link>.
        </p>
        <p>
          Housing costs beyond principal and interest are estimated the way a
          lender would: property tax = home price × annual tax rate ÷ 12,
          insurance = annual premium ÷ 12, and private mortgage insurance (PMI)
          is added when the down payment is under 20% of the price. The{" "}
          <Link href="/calculators/down-payment">Down Payment Calculator</Link>{" "}
          estimates PMI at 0.7% of the loan per year.
        </p>

        <h2>Growth, savings, and retirement</h2>
        <ul>
          <li>
            <strong>Compound interest:</strong> the balance grows by r ÷ n each
            compounding period and contributions are added each period. The
            closed form is A = P(1 + r/n)^(nt) + PMT × [((1 + r/n)^(nt) − 1) ÷
            (r/n)], where PMT is the contribution per period. A $10,000 start
            plus $500 a month at 7% compounded monthly for 20 years grows to{" "}
            <strong>$300,851</strong>: $130,000 contributed plus $170,851 of
            growth. See the{" "}
            <Link href="/calculators/compound-interest">
              Compound Interest Calculator
            </Link>
            .
          </li>
          <li>
            <strong>Savings goal:</strong> required monthly deposit = [Goal −
            Current × (1 + r)^n] ÷ [((1 + r)^n − 1) ÷ r], with r as the monthly
            rate and n as months. A $50,000 goal with $5,000 saved, 5 years, and
            a 5% return needs <strong>$640.87</strong> a month.
          </li>
          <li>
            <strong>Retirement:</strong> projected balance = future value of
            current savings + future value of monthly contributions. The nest
            egg you need = desired annual income ÷ withdrawal rate. At the
            default 4% rate, $60,000 a year requires $1,500,000. The withdrawal
            rate is editable.
          </li>
          <li>
            <strong>Inflation:</strong> future price = amount × (1 + i)^t and
            purchasing power = amount ÷ (1 + i)^t. At 3% for 10 years, something
            that costs $100 today costs $134.39, and $100 in cash buys what $74.41
            buys today.
          </li>
          <li>
            <strong>CDs:</strong> APY = (1 + r/n)^n − 1, where n is the number
            of compounding periods per year.
          </li>
          <li>
            <strong>Simple interest:</strong> I = P × r × t, with daily interest
            calculated as P × r ÷ 365.
          </li>
        </ul>

        <h2>Debt payoff simulations</h2>
        <p>
          The debt payoff and credit card payoff calculators run a month-by-month
          simulation. Each month, interest = balance × APR ÷ 12 is added, your
          payment is applied, and the loop stops when the balance reaches zero.
          The debt payoff calculator shows an error when a payment does not cover
          the monthly interest, and it stops simulating at 600 months.
        </p>
        <p>
          <strong>Example.</strong> $15,000 at 18.9% APR with a $400 payment takes
          58 months and costs $7,861 in interest. Adding $100 a month finishes in
          41 months with $5,465 in interest, saving $2,396 and 17 months. Try it
          in the <Link href="/calculators/debt-payoff">Debt Payoff Calculator</Link>{" "}
          or the{" "}
          <Link href="/calculators/credit-card-payoff">
            Credit Card Payoff Calculator
          </Link>
          .
        </p>

        <h2>Affordability and comparison tools</h2>
        <ul>
          <li>
            <strong>Home affordability:</strong> the 28/36 rule. Housing cost
            should stay under 28% of gross monthly income and total debt under
            36%. The tool reports which of the two limits is binding for you.
          </li>
          <li>
            <strong>Debt-to-income:</strong> DTI = total monthly debt payments ÷
            gross monthly income × 100. For example, $2,400 of debt on $6,000 of
            income is 40%.
          </li>
          <li>
            <strong>Rent vs buy:</strong> ownership costs include property tax,
            insurance, and maintenance, each as a percentage of home value. The
            renter's savings are invested with monthly compounding at the
            return you assume.
          </li>
          <li>
            <strong>Lease vs buy:</strong> the owned vehicle's value = price
            × (1 − d)^years, where d is the annual depreciation rate you set.
          </li>
        </ul>

        <h2>Tax calculators</h2>
        <p>
          The income tax, capital gains tax, self-employment tax, and paycheck
          calculators model US federal rules and, where a tool asks for it, a flat
          state rate that you enter.
        </p>
        <ul>
          <li>
            <strong>Income tax:</strong> taxable income = gross income − standard
            deduction − additional deductions you enter. Tax is computed bracket
            by bracket, so each marginal rate applies only to the slice of income
            inside that bracket. Effective rate = total tax ÷ gross income.
          </li>
          <li>
            <strong>Capital gains:</strong> long-term gains are taxed at 0%, 15%,
            or 20% depending on income and filing status, short-term gains are
            taxed as ordinary income, and a 3.8% net investment income tax
            applies above the filing-status threshold.
          </li>
          <li>
            <strong>Self-employment tax:</strong> 92.35% of net earnings are
            taxable. Social Security is 12.4% up to the annual wage base (reduced
            by W-2 wages already subject to it), Medicare is 2.9% on all
            earnings, and a 0.9% Additional Medicare Tax applies above the
            threshold. Half of the self-employment tax is deductible.
          </li>
          <li>
            <strong>Paycheck:</strong> federal income tax + Social Security +
            Medicare (1.45%, plus 0.9% on wages above{" "}
            {usd(ADDITIONAL_MEDICARE_THRESHOLDS.single)} for single filers or{" "}
            {usd(ADDITIONAL_MEDICARE_THRESHOLDS.mfj)} for married filing jointly) + a flat state tax rate +
            your 401(k) contribution.
          </li>
        </ul>
        <p>
          These tools do not model tax credits, the alternative minimum tax,
          income phase-outs, or state-specific rules. Bracket limits, standard
          deductions, and the Social Security wage base are published by the IRS
          and the SSA and change every year. All four tax calculators read them
          from a single data file for tax year {TAX_DATA.taxYear}, which was last
          checked against IRS Rev. Proc. 2025-32 and the SSA on{" "}
          {TAX_DATA.checkedOnLabel}; each tax page repeats that date and links to
          the documents. Confirm the current figures at{" "}
          <a href="https://www.irs.gov/" target="_blank" rel="noopener noreferrer">
            irs.gov
          </a>{" "}
          and{" "}
          <a href="https://www.ssa.gov/" target="_blank" rel="noopener noreferrer">
            ssa.gov
          </a>{" "}
          before relying on a result for filing or a large decision.
        </p>

        <h2>Default values and assumptions</h2>
        <p>
          The starting values in each calculator, such as a 7% annual investment
          return, 3% inflation, a 4% withdrawal rate, or an 18.9% credit card
          APR, exist to show you how the tool behaves. They are illustrations,
          not forecasts or recommendations. The one benchmark we keep current is
          the mortgage rate. The mortgage, house payment, home affordability, down
          payment, rent vs buy, amortization, loan comparison, and refinance
          calculators start from the Freddie Mac fixed-rate averages for the week of{" "}
          {MORTGAGE_MARKET.asOfLabel} ({MORTGAGE_MARKET.thirtyYear.toFixed(2)}% for 30 years,{" "}
          {MORTGAGE_MARKET.fifteenYear.toFixed(2)}% for 15 years) and show that source under the
          inputs. Replace
          any starting value with your lender's quoted rate, your account's
          actual APY, or an assumption you are comfortable defending.
        </p>

        <h2>Where reference data comes from</h2>
        <p>
          Our content review process requires every rate, limit, bracket, or
          benchmark to be checked against a primary source before it is published,
          with the date it applies to written on the page. Pages that have been
          through this review show a Sources line with links next to the figures
          and the month the figures were checked, so you can open the original
          document yourself. As of {TAX_DATA.checkedOnLabel}, that covers every
          guide on the site, the four tax calculators with their articles, the
          eight mortgage-related calculators (mortgage, house payment, home
          affordability, down payment, rent vs buy, amortization, loan comparison,
          and refinance) with their articles, and the mortgage and home
          affordability scenario pages. The remaining calculator articles and the other
          scenario pages are being brought through the same review in a fixed order
          (tax figures first, then guides, then scenario pages, then the other
          calculators), so a page without a Sources line has not been through it
          yet. The primary sources we rely on:
        </p>
        <ul>
          {sources.map((s) => (
            <li key={s.href}>
              <a href={s.href} target="_blank" rel="noopener noreferrer">
                {s.name}
              </a>
              : {s.use}
            </li>
          ))}
        </ul>
        <p>
          Under the same process, financial publishers such as Bankrate or
          NerdWallet are used only for market ranges and product terms, and only
          when cross-checked against other sources. Anonymous blogs, affiliate
          comparison pages, and content farms are never the sole source for a
          figure.
        </p>

        <h2>Data reports and embedded calculators</h2>
        <p>
          Our <Link href="/reports">data reports</Link> apply the same formulas as
          the calculators to public datasets such as the Census Bureau’s
          American Community Survey. Each report lists its inputs, states its
          assumptions and limits, and publishes the full table as a CSV. Inputs
          are checked against the publisher’s own tables before publication,
          and the page records which tables were used. Calculators that you
          embed on another site through our <Link href="/embed">embed page</Link>{" "}
          run the same code as the pages on this site, so everything on this
          page applies to them as well.
        </p>

        <h2>Accuracy checks and known limits</h2>
        <p>
          Tools guard against inputs that would break a formula: tools that divide
          by the interest rate handle a 0% rate separately or require a positive
          rate, and every input has minimum and maximum bounds. Even so, every
          result is an estimate built on a simplified model:
        </p>
        <ul>
          <li>
            Rates stay constant for the whole term. Adjustable-rate loans,
            promotional APRs, and variable rates are not modeled.
          </li>
          <li>
            Fees, points, closing costs, and taxes on investment growth are
            excluded unless a tool has an input for them.
          </li>
          <li>
            Results are in nominal US dollars and are not adjusted for inflation
            unless a tool says otherwise.
          </li>
          <li>
            Tax tools follow US federal rules. The loan, savings, and debt math
            works for any currency, but the tax calculators do not apply to other
            countries, including the UK.
          </li>
          <li>
            Lenders may use different day-count conventions or round each
            payment, so a lender statement can differ from our result by a few
            dollars. Treat results as estimates, not quotes.
          </li>
        </ul>

        <h2>Updates and corrections</h2>
        <p>
          Guides display a last-updated date, and calculator pages carry a
          machine-readable modified date that we revise whenever a formula or
          reference figure changes. If a result does not match your lender, the
          IRS, or your own spreadsheet, email{" "}
          <a href="mailto:hello@calcwise.tools">hello@calcwise.tools</a> with the
          calculator name, your inputs, and the result you expected. We prioritize
          accuracy reports and typically reply within 24 hours. You can also use
          our <Link href="/contact">contact page</Link>.
        </p>

        <h2>Privacy and disclaimer</h2>
        <p>
          Calculations run entirely in your browser. We do not collect, store, or
          transmit the numbers you enter; see our{" "}
          <Link href="/privacy">privacy policy</Link> for the limited technical
          data we do process. Our tools are for educational purposes and are not
          financial, tax, or legal advice. The full disclaimer is in our{" "}
          <Link href="/terms">terms of service</Link>, and you can read more about
          who we are on the <Link href="/about">about page</Link>.
        </p>
      </div>
    </div>
  );
}
