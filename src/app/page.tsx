import Link from "next/link";
import type { Metadata } from "next";
import { categories, calculators, getCalculatorsByCategory } from "@/lib/calculators";
import { guides } from "@/lib/guides";
import { site } from "@/lib/site";
import { STATE_RESULTS } from "@/lib/reports/mortgage-affordability-by-state";
import { CalculatorCard } from "@/components/CalculatorCard";
import { SectionHeading } from "@/components/SectionHeading";
import { StateShareChart } from "@/components/StateShareChart";
import { CheckCircleIcon, LockIcon, ShieldIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: `${site.name} – Free Online Financial Calculators`,
  description: site.description,
};

const publishedGuides = guides.filter((g) => g.published);
const [featuredGuide, ...otherGuides] = publishedGuides.slice(0, 4);

const stats = [
  { value: String(calculators.length), label: "Free calculators" },
  { value: String(publishedGuides.length), label: "In-depth guides" },
  { value: String(STATE_RESULTS.length), label: "States and DC in our data report" },
  { value: "0", label: "Sign-ups, accounts, or stored inputs" },
];

const principles = [
  {
    icon: ShieldIcon,
    title: "Checked against the source",
    body: "Rates, limits, and brackets come from the Federal Reserve, IRS, Census Bureau, and Freddie Mac. Each figure is dated and linked, and the assumptions behind every tool are on our methodology page.",
  },
  {
    icon: LockIcon,
    title: "Private by design",
    body: "Every calculation runs in your browser. We never store or transmit what you type, so you can model real balances and salaries without handing them over.",
  },
  {
    icon: CheckCircleIcon,
    title: "Free, with nothing in the way",
    body: "No signup, no paywall, no email gate. Open a calculator, change a number, and read the answer, as many times as you need.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-ink-200">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_30rem_at_85%_-10%,rgb(223_231_243/0.9),transparent_60%),radial-gradient(40rem_24rem_at_-5%_110%,rgb(245_236_208/0.7),transparent_60%)]"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-24">
          <div>
            <p className="eyebrow">Independent · Private · Source-cited</p>
            <h1 className="mt-5 text-[2.75rem] font-semibold leading-[1.05] text-ink-900 sm:text-[3.5rem] lg:text-[4rem]">
              Smart financial calculators,{" "}
              <em className="font-medium italic text-brand-700">built on primary-source data.</em>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-600">
              Plan your mortgage, grow your savings, pay off debt, and map your retirement. Every rate and limit
              is dated and traced to the agency that publishes it, and your numbers never leave your browser.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#calculators" className="btn-primary">
                Browse {calculators.length} calculators
                <span aria-hidden="true">→</span>
              </a>
              <Link href="/guides" className="btn-secondary">
                Read the guides
              </Link>
            </div>
            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-600">
              {["No signup", "Runs in your browser", "Sources cited and dated"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-gold-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <StateShareChart />
        </div>
      </section>

      {/* Numbers strip */}
      <section aria-label="CalcWise at a glance" className="border-b border-ink-200 bg-white">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 divide-ink-200 px-4 sm:px-6 lg:grid-cols-4 lg:divide-x">
          {stats.map((stat) => (
            <div key={stat.label} className="px-2 py-7 text-center sm:px-6 lg:text-left">
              <dd className="numeral text-[2.5rem] font-semibold leading-none text-brand-800">{stat.value}</dd>
              <dt className="mt-2 text-[0.8125rem] leading-snug text-ink-500">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* Calculators by category */}
      <div id="calculators" className="mx-auto max-w-6xl px-4 pb-4 pt-16 sm:px-6">
        {categories.map((category, index) => {
          const calcs = getCalculatorsByCategory(category.slug);
          return (
            <section key={category.slug} className="mb-16">
              <SectionHeading
                eyebrow={`${String(index + 1).padStart(2, "0")} · Calculators`}
                title={category.name}
                description={category.description}
                action={{ href: `/calculators/category/${category.slug}`, label: "View all" }}
              />
              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {calcs.map((calc) => (
                  <CalculatorCard key={calc.slug} calc={calc} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Guides */}
      <section className="border-y border-ink-200 bg-paper-2">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <SectionHeading
            eyebrow="Guides"
            title="Financial guides"
            description="In-depth articles with real numbers, case studies, and steps you can act on."
            action={{ href: "/guides", label: "All guides" }}
          />
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            {featuredGuide && (
              <Link
                href={`/guides/${featuredGuide.slug}`}
                className="group flex flex-col justify-between rounded-xl border border-ink-200 bg-white p-7 shadow-card transition duration-200 hover:border-gold-400 hover:shadow-card-hover sm:p-9"
              >
                <div>
                  <p className="eyebrow">Featured guide</p>
                  <h3 className="mt-3 text-[1.75rem] font-semibold leading-snug text-ink-900 sm:text-[2rem]">
                    {featuredGuide.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-ink-600">{featuredGuide.description}</p>
                </div>
                <div className="mt-8 flex items-end justify-between gap-4">
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 group-hover:text-brand-900">
                    Read the guide
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="numeral select-none text-[6.5rem] font-semibold leading-[0.8] text-gold-200"
                  >
                    01
                  </span>
                </div>
              </Link>
            )}
            <ol className="flex flex-col divide-y divide-ink-200 rounded-xl border border-ink-200 bg-white shadow-card">
              {otherGuides.map((guide, i) => (
                <li key={guide.slug} className="flex-1">
                  <Link
                    href={`/guides/${guide.slug}`}
                    className="group flex h-full gap-5 p-6 transition-colors hover:bg-ink-50"
                  >
                    <span className="numeral pt-0.5 text-2xl font-semibold text-gold-500">
                      {String(i + 2).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block font-serif text-[1.1875rem] font-semibold leading-snug text-ink-900 group-hover:text-brand-700">
                        {guide.title}
                      </span>
                      <span className="mt-1.5 line-clamp-2 block text-sm leading-relaxed text-ink-500">
                        {guide.description}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="max-w-2xl">
          <p className="eyebrow">Why CalcWise</p>
          <h2 className="mt-2 text-[1.875rem] font-semibold leading-tight text-ink-900 sm:text-[2.125rem]">
            Built like a reference, not a funnel
          </h2>
        </div>
        <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
          {principles.map((item, i) => (
            <div key={item.title} className="border-t border-ink-300 pt-6">
              <div className="flex items-center justify-between">
                <span className="numeral text-lg font-semibold text-gold-600">{String(i + 1).padStart(2, "0")}</span>
                <item.icon className="h-6 w-6 text-brand-700" />
              </div>
              <h3 className="mt-5 text-[1.375rem] font-semibold leading-snug text-ink-900">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-600">{item.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-sm text-ink-500">
          Read how we verify figures on the{" "}
          <Link href="/methodology" className="font-semibold text-brand-700 underline decoration-gold-400 decoration-[1.5px] underline-offset-4 hover:text-brand-900">
            methodology page
          </Link>
          .
        </p>
      </section>
    </>
  );
}
