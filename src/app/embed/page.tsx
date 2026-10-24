import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { CategoryIcon } from "@/components/Icons";
import { EmbedPicker } from "@/components/EmbedPicker";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { embeds } from "@/lib/embeds";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";

const title = "Embed Free Financial Calculators on Your Website";
const description =
  "Add a free mortgage, savings, retirement, or paycheck calculator to your site with one copy-and-paste snippet. No account, and inputs never reach us.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} | ${site.name}`,
    description,
    type: "website",
  },
};

const faqs = [
  {
    question: "Is the embeddable calculator free?",
    answer: `Yes. There is no account, fee, or traffic cap, and commercial sites are welcome. The only condition is that the credit line under the frame (the calculator name and a ${site.name} link to its page) stays in place. The link is a plain link, and you decide whether to add rel attributes such as nofollow to it.`,
  },
  {
    question: "Do the calculators collect my visitors' numbers?",
    answer: `No. Every calculation runs in the visitor's browser, so the income, balances, and rates they type are never sent to ${site.name}. The frame contains the calculator and one credit line.`,
  },
  {
    question: "Will it work on WordPress, Wix, Squarespace, Webflow, or Shopify?",
    answer:
      "It works on any platform that lets you paste custom HTML: the Custom HTML block in WordPress, an Embed code element in Wix, a Code block in Squarespace, an Embed element in Webflow, or a Custom Liquid section in Shopify. Some free plans strip iframes or script tags. If that happens, use the snippet without the resize script and the frame keeps a fixed height.",
  },
  {
    question: "Do embedded calculators stay up to date?",
    answer:
      "Yes. The frame loads the live calculator, so when tax brackets, contribution limits, or default assumptions change, every embed updates without any change on your site. The formulas and data sources are listed on the methodology page.",
  },
  {
    question: "Can I change the colors, defaults, or size?",
    answer:
      "Not at the moment. You can set the width of the frame (up to 720px is recommended), but colors and starting values are fixed. If you need a calculator with different defaults, contact us and we will consider it.",
  },
];

export default function EmbedPage() {
  const items = embeds.flatMap((e) => {
    const calc = getCalculator(e.slug);
    return calc
      ? [{ slug: e.slug, title: calc.title, blurb: e.blurb, height: e.height }]
      : [];
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <BreadcrumbJsonLd items={[{ name: "Embed Calculators", href: "/embed" }]} />
      <FaqJsonLd faqs={faqs} />

      <nav className="mb-6 text-sm text-ink-500">
        <Link href="/" className="hover:text-brand-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink-700">Embed Calculators</span>
      </nav>

      <h1 className="text-3xl font-bold text-ink-900 sm:text-4xl">
        Embed Free Financial Calculators on Your Website
      </h1>
      <p className="mt-3 max-w-3xl text-lg text-ink-600">
        Pick a calculator, copy the snippet, and paste it into any page that accepts custom
        HTML. Your readers get a working tool without leaving your site, and you do not
        maintain any formulas, tax tables, or rate assumptions.
      </p>

      <div className="mt-8 rounded-xl border border-ink-200 bg-white p-6 shadow-card sm:p-8">
        <EmbedPicker items={items} />
      </div>

      <div className="prose mt-12 max-w-none">
        <h2>How it works</h2>
        <ul>
          <li>
            <strong>One snippet.</strong> It is an iframe plus a one-line credit. It adds no
            plugin, no API key, and no build step, and it works in blog posts, resource pages,
            and newsletters that render HTML.
          </li>
          <li>
            <strong>Private by design.</strong> The calculation code runs inside your
            visitor’s browser. {site.name} does not receive the numbers they enter. See
            our <Link href="/privacy">privacy policy</Link>.
          </li>
          <li>
            <strong>Maintained for you.</strong> Tax brackets, contribution limits, and rate
            defaults are reviewed on a schedule and cited on the{" "}
            <Link href="/methodology">methodology page</Link>.
          </li>
          <li>
            <strong>Fits any column.</strong> The layout adapts from phone width to 720px. The
            optional resize script adjusts the frame height when a result expands the page.
          </li>
        </ul>

        <h2>Terms of use for embeds</h2>
        <ul>
          <li>
            Embedding is free for personal, editorial, educational, and commercial sites.
          </li>
          <li>
            Keep the credit line below the frame. It names the calculator and links to its page
            on {site.name}. The link is a plain link; whether to add{" "}
            <code>rel=&quot;nofollow&quot;</code> or any other rel attribute to it is your decision.
          </li>
          <li>
            Do not copy the calculator code, cover or restyle the frame so that it appears to be
            your own tool, or present its results as advice from your organization.
          </li>
          <li>
            Results are estimates for general information. The{" "}
            <Link href="/terms">terms of service</Link> apply to embedded use as well.
          </li>
        </ul>
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-bold text-ink-900">Calculators you can embed</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`/calculators/${item.slug}`}
              className="flex items-start gap-3 rounded-lg border border-ink-200 bg-white p-4 transition-shadow hover:shadow-card-hover"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand-50 text-brand-600">
                <CategoryIcon name={item.slug} className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-ink-800">{item.title}</h3>
                <p className="mt-1 text-xs text-ink-500">{item.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold text-ink-900">Frequently asked questions</h2>
        <div className="mt-4 divide-y divide-ink-200 rounded-xl border border-ink-200 bg-white">
          {faqs.map((faq) => (
            <div key={faq.question} className="p-5">
              <h3 className="text-base font-semibold text-ink-900">{faq.question}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
