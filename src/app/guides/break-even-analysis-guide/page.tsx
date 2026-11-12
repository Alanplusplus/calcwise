import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { RelatedGuides } from "@/components/RelatedGuides";
import { Sources } from "@/components/Sources";
import { site } from "@/lib/site";

const title = "Break-Even Analysis: Formulas, Examples & Case Study";
const h1 =
  "Break-Even Analysis: How to Know When Your Business Starts Making Money";
const description =
  "Break-even analysis in units and dollars: formulas, contribution margin, Etsy and Amazon fees, margin of safety, and a restaurant case study.";
const slug = "break-even-analysis-guide";
const datePublished = "2026-11-12";
const dateModified = "2026-11-12";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "break even analysis",
    "break even calculator",
    "break even point in dollars",
    "contribution margin ratio",
    "calculate break even",
  ],
  openGraph: {
    title: `${title} | ${site.name}`,
    description,
    type: "article",
    publishedTime: datePublished,
    modifiedTime: dateModified,
  },
};

const usd0 = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
const usd2 = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
const pct1 = (n: number) => `${n.toFixed(1)}%`;
const num0 = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 0 });

const beUnits = (fixed: number, price: number, vc: number) => {
  const cm = price - vc;
  return cm > 0 ? Math.ceil(fixed / cm) : 0;
};
const beRevenueFromRatio = (fixed: number, cmr: number) => (cmr > 0 ? fixed / cmr : 0);
const marginOfSafetyPct = (actual: number, be: number) => (actual > 0 ? ((actual - be) / actual) * 100 : 0);

// Textbook-style worked examples
const HW_FIXED_35K = 35000;
const HW_CMR = 0.4;
const hwRevenue = beRevenueFromRatio(HW_FIXED_35K, HW_CMR);
const APP_FIXED = 2500;
const APP_CM = 8;
const appDownloads = Math.ceil(APP_FIXED / APP_CM);

// Default calculator scenario (matches break-even tool defaults)
const DEF_FC = 10000;
const DEF_PRICE = 50;
const DEF_VC = 25;
const defCm = DEF_PRICE - DEF_VC;
const defCmr = defCm / DEF_PRICE;
const defBeUnits = beUnits(DEF_FC, DEF_PRICE, DEF_VC);
const defBeRevenue = defBeUnits * DEF_PRICE;

// Marketplace fee examples (US), verified Nov 2026
const ETSY_TXN = 0.065;
const ETSY_PAY_PCT = 0.03;
const ETSY_PAY_FLAT = 0.25;
const ETSY_LISTING = 0.2;
const etsyFeesPerOrder = (price: number) => price * ETSY_TXN + price * ETSY_PAY_PCT + ETSY_PAY_FLAT + ETSY_LISTING;

const AMZ_REFERRAL = 0.15;
const AMZ_MIN = 0.3;
const amazonFee = (price: number) => Math.max(price * AMZ_REFERRAL, AMZ_MIN);

const ETSY_PRICE = 28;
const ETSY_BASE_VC = 8.5;
const etsyFees = etsyFeesPerOrder(ETSY_PRICE);
const etsyEffectiveVc = ETSY_BASE_VC + etsyFees;
const etsyCm = ETSY_PRICE - etsyEffectiveVc;
const etsyBeNoFee = beUnits(1000, ETSY_PRICE, ETSY_BASE_VC);
const etsyBe = beUnits(1000, ETSY_PRICE, etsyEffectiveVc);

const ECOMM_PRICE = 42;
const ECOMM_BASE_VC = 22;
const ECOMM_FC = 6800;
const ecommFee = amazonFee(ECOMM_PRICE);
const ecommVcWithFee = ECOMM_BASE_VC + ecommFee;
const ecommCmNoFee = ECOMM_PRICE - ECOMM_BASE_VC;
const ecommBeNoFee = beUnits(ECOMM_FC, ECOMM_PRICE, ECOMM_BASE_VC);
const ecommBeWithFee = beUnits(ECOMM_FC, ECOMM_PRICE, ecommVcWithFee);

// SBA five-year survival (employer establishments, 1994–2022)
const SBA_FIVE_YEAR_SURVIVAL = 49.2;

// Case study: Priya's fast-casual bowl shop, Denver
const PRIYA_FC = 14200;
const PRIYA_PRICE = 24;
const PRIYA_VC = 9.2;
const priyaCm = PRIYA_PRICE - PRIYA_VC;
const priyaCmr = priyaCm / PRIYA_PRICE;
const priyaBeUnits = beUnits(PRIYA_FC, PRIYA_PRICE, PRIYA_VC);
const priyaBeRevenue = priyaBeUnits * PRIYA_PRICE;
const PRIYA_ACTUAL_UNITS = 820;
const priyaMos = marginOfSafetyPct(PRIYA_ACTUAL_UNITS, priyaBeUnits);
const PRIYA_TARGET_PROFIT = 6000;
const priyaUnitsForProfit = Math.ceil((PRIYA_FC + PRIYA_TARGET_PROFIT) / priyaCm);
const priyaRevenueForProfit = priyaUnitsForProfit * PRIYA_PRICE;
const priyaLossAtActual = PRIYA_ACTUAL_UNITS * priyaCm - PRIYA_FC;

function pctWholeFromRatio(ratio: number) {
  return `${(ratio * 100).toFixed(0)}%`;
}

const comparisonModels = [
  {
    model: "Freelance brand designer",
    fixed: 2400,
    price: 450,
    vc: 60,
    actual: 9,
    notes: "Fixed = software, coworking desk, health insurance. Variable = stock assets and subcontracted illustration per project",
  },
  {
    model: "Amazon seller (referral fee only)",
    fixed: ECOMM_FC,
    price: ECOMM_PRICE,
    vc: ecommVcWithFee,
    actual: 890,
    notes: "15% referral fee included in variable cost; fulfillment fees not included",
  },
  {
    model: "Weekend food truck",
    fixed: 5600,
    price: 14,
    vc: 5.6,
    actual: 780,
    notes: "Fixed = commissary kitchen, permits and insurance, truck loan",
  },
].map((row) => {
  const cm = row.price - row.vc;
  const be = beUnits(row.fixed, row.price, row.vc);
  const mos = marginOfSafetyPct(row.actual, be);
  return { ...row, cm, be, beRev: be * row.price, mos };
});

const faqs = [
  {
    question: "How much revenue must I earn if fixed costs are $35,000 and the contribution margin ratio is 40%?",
    answer: `Divide fixed costs by the contribution margin ratio: ${usd0(HW_FIXED_35K)} ÷ 0.40 = ${usd0(hwRevenue)} in break-even revenue. At a 40% margin ratio, every $1 of revenue contributes $0.40 toward fixed costs, so you need ${usd0(hwRevenue)} in sales before profit begins. If your average selling price is ${usd0(DEF_PRICE)}, that equals ${num0(Math.ceil(hwRevenue / DEF_PRICE))} units at that price point.`,
  },
  {
    question: "How many downloads does a mobile app need if fixed expenses are $2,500 and contribution margin is $8 per download?",
    answer: `Break-even units = ${usd0(APP_FIXED)} ÷ ${usd2(APP_CM)} = ${(APP_FIXED / APP_CM).toFixed(1)}, rounded up to ${num0(appDownloads)} paid downloads per month. Each download after ${num0(appDownloads)} contributes the full ${usd2(APP_CM)} toward profit. Treat app-store commissions the same way as Etsy or Amazon fees: subtract per-download platform charges from price (or add them to variable cost) before dividing fixed costs by contribution margin.`,
  },
  {
    question: "What is break-even in sales dollars for a division?",
    answer: `Use Break-Even Revenue = Fixed Costs ÷ Contribution Margin Ratio. Example: ${usd0(DEF_FC)} fixed costs and a ${pctWholeFromRatio(defCmr)} contribution margin ratio (price ${usd0(DEF_PRICE)}, variable ${usd0(DEF_VC)}) yield ${usd0(defBeRevenue)} in break-even revenue, equal to ${num0(defBeUnits)} units. Division-level break-even works the same way if you assign that division its own fixed and variable costs.`,
  },
  {
    question: "How do Etsy or Amazon fees change break-even?",
    answer: `Treat each sale's platform and payment fees as variable cost. On Etsy (US), a ${usd2(ETSY_PRICE)} item with materials costing ${usd2(ETSY_BASE_VC)} also pays about ${usd2(etsyFees)} in listing, 6.5% transaction, and 3% + ${usd2(ETSY_PAY_FLAT)} processing fees, cutting contribution margin from ${usd2(ETSY_PRICE - ETSY_BASE_VC)} to ${usd2(etsyCm)} and pushing monthly break-even from ${num0(beUnits(1000, ETSY_PRICE, ETSY_BASE_VC))} to ${num0(etsyBe)} units at ${usd0(1000)} fixed costs. A ${usd2(ECOMM_PRICE)} Amazon SKU with a 15% referral fee adds ${usd2(ecommFee)} per unit, raising break-even from ${num0(ecommBeNoFee)} to ${num0(ecommBeWithFee)} units when fixed costs are ${usd0(ECOMM_FC)}.`,
  },
  {
    question: "What is margin of safety in break-even analysis?",
    answer: `Margin of safety measures how far actual sales sit above break-even: (Actual Units − Break-Even Units) ÷ Actual Units. Priya sells ${num0(PRIYA_ACTUAL_UNITS)} bowls monthly against a break-even of ${num0(priyaBeUnits)}, so her margin of safety is negative (${pct1(priyaMos)}), meaning she is still ${num0(priyaBeUnits - PRIYA_ACTUAL_UNITS)} meals short and loses about ${usd0(Math.abs(priyaLossAtActual))} per month at current volume. Hitting break-even is only the first hurdle; margin of safety shows cushion before a sales dip turns profit back into a loss.`,
  },
];

export default function BreakEvenAnalysisGuide() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <ArticleJsonLd
        title={h1}
        description={description}
        slug={slug}
        datePublished={datePublished}
        dateModified={dateModified}
        image="/images/guides/break-even-analysis-guide.webp"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Guides", href: "/guides" },
          { name: "Break-Even Analysis", href: `/guides/${slug}` },
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <header>
          <p className="text-sm font-medium text-brand-600">
            <Link href="/guides" className="hover:underline">
              Guides
            </Link>{" "}
            / Small Business Finance
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">{h1}</h1>
          <p className="mt-4 text-lg text-ink-600">
            Priya is negotiating a {usd0(6800)}-per-month lease for a second bowl-shop location, but her
            current store sells only {num0(PRIYA_ACTUAL_UNITS)} meals a month against a break-even of{" "}
            {num0(priyaBeUnits)}. She needs a number before the build-out: how much revenue clears every
            cost?{" "}
            <strong>
              Break-even analysis finds the sales volume where total revenue equals total costs
            </strong>
            . The core formula is{" "}
            <strong>Break-Even Units = Fixed Costs ÷ (Price − Variable Cost per Unit)</strong>, where
            price minus variable cost is the contribution margin. This guide walks through dollars vs
            units, contribution margin ratio, target profit, marketplace fees, and what the textbook
            model leaves out.
          </p>
          <p className="mt-2 text-sm text-ink-500">Last updated: November 2026</p>
        </header>

        <section className="mt-10 rounded-xl border border-brand-200 bg-brand-50 p-6">
          <h2 className="text-lg font-semibold text-brand-800">TL;DR — Quick Answer</h2>
          <ul className="mt-3 space-y-2 text-ink-700">
            <li>
              <strong>Units:</strong> Break-Even Units = Fixed Costs ÷ Contribution Margin. Example:{" "}
              {usd0(DEF_FC)} ÷ ({usd0(DEF_PRICE)} − {usd0(DEF_VC)}) = {num0(defBeUnits)} units.
            </li>
            <li>
              <strong>Dollars:</strong> Break-Even Revenue = Fixed Costs ÷ Contribution Margin Ratio
              ({pctWholeFromRatio(defCmr)} here) = {usd0(defBeRevenue)}.
            </li>
            <li>
              <strong>Textbook check:</strong> {usd0(HW_FIXED_35K)} fixed costs at a 40% margin ratio →{" "}
              {usd0(hwRevenue)} revenue; {usd0(APP_FIXED)} fixed costs at {usd2(APP_CM)} contribution
              margin → {num0(appDownloads)} downloads.
            </li>
            <li>
              <strong>Run your model:</strong> Use the{" "}
              <Link href="/calculators/break-even" className="text-brand-600 hover:text-brand-800 font-medium">
                Break-Even Calculator
              </Link>{" "}
              for price scenarios, target profit, and volume tables without rebuilding the spreadsheet.
            </li>
          </ul>
        </section>

        <figure className="mt-10">
          <Image
            src="/images/guides/break-even-analysis-guide.webp"
            alt="Break-even analysis infographic for a restaurant: $14,200 monthly fixed costs, $24 average price, $9.20 variable cost, 960 meals per month break-even, $23,040 break-even revenue, $14.80 contribution margin per meal"
            width={1200}
            height={800}
            className="rounded-lg border border-ink-200"
          />
          <figcaption className="mt-2 text-center text-sm text-ink-500">
            Priya's shop: break-even at {num0(priyaBeUnits)} meals and {usd0(priyaBeRevenue)} monthly
            revenue (November 2026 assumptions)
          </figcaption>
        </figure>

        <section className="prose mt-10 max-w-none">
          <h2>What Is Break-Even Analysis?</h2>
          <p>
            Break-even analysis answers one question: how much do you need to sell before profit starts?
            Below break-even, each sale only recovers part of your overhead. Above it, every additional
            unit keeps its full contribution margin. For a division with {usd0(HW_FIXED_35K)} in fixed
            costs and a 40% contribution margin ratio, break-even revenue is {usd0(hwRevenue)}, the
            standard textbook setup.
          </p>
          <p>
            The SBA Office of Advocacy reports that from 1994 through 2022 about {pct1(SBA_FIVE_YEAR_SURVIVAL)}{" "}
            of new employer establishments survived five years (BLS Business Employment Dynamics data).
            Knowing your break-even will not change industry survival rates, but it explains why many
            owners discover too late that rent, payroll, and loan payments require more volume than they
            planned.
          </p>

          <h2>Break-Even in Units vs Dollars</h2>
          <p>
            <strong>Units formula:</strong> Break-Even Units = Fixed Costs ÷ (Price per Unit − Variable
            Cost per Unit). Variable cost is everything that scales with output: ingredients, packaging,
            fulfillment, per-order payment fees, and sales commissions. Fixed costs stay the same whether
            you sell 10 units or 10,000: rent, salaried payroll, insurance, loan payments, and base
            software subscriptions.
          </p>
          <p>
            <strong>Dollars formula:</strong> Break-Even Revenue = Fixed Costs ÷ Contribution Margin
            Ratio, where Contribution Margin Ratio = (Price − Variable Cost) ÷ Price. A {usd0(DEF_PRICE)}{" "}
            product with {usd0(DEF_VC)} variable cost has a {usd0(defCm)} contribution margin and a{" "}
            {pctWholeFromRatio(defCmr)} ratio, so {usd0(DEF_FC)} in fixed costs require {usd0(defBeRevenue)} in
            revenue ({num0(defBeUnits)} units). Service businesses can treat each billable hour or project
            as a unit with the same math.
          </p>
          <p>
            <strong>Target profit:</strong> Units for Target Profit = (Fixed Costs + Target Profit) ÷
            Contribution Margin. Priya wants {usd0(PRIYA_TARGET_PROFIT)} monthly profit on top of costs,
            so she must cover {usd0(PRIYA_FC + PRIYA_TARGET_PROFIT)} ÷ {usd2(priyaCm)} ={" "}
            {num0(priyaUnitsForProfit)} meals ({usd0(priyaRevenueForProfit)} revenue), not merely the{" "}
            {num0(priyaBeUnits)} meals at break-even.
          </p>

          <h2>Worked Examples: Dollars, Units, and Product Lines</h2>
          <h3>Given $35,000 fixed costs and a 40% contribution margin ratio</h3>
          <p>
            Revenue = {usd0(HW_FIXED_35K)} ÷ 0.40 = <strong>{usd0(hwRevenue)}</strong>. You do not need
            the selling price to solve in dollars — only the margin ratio. If you also know price is{" "}
            {usd0(DEF_PRICE)} and variable cost is {usd0(DEF_VC)}, the ratio checks out: {usd0(defCm)} ÷{" "}
            {usd0(DEF_PRICE)} = 50%, a wider margin than the 40% in the textbook example, so it needs less revenue per fixed dollar.
          </p>
          <h3>Mobile app: $2,500 fixed expenses, $8 contribution margin per download</h3>
          <p>
            Break-even downloads = {usd0(APP_FIXED)} ÷ {usd2(APP_CM)} = {(APP_FIXED / APP_CM).toFixed(1)},{" "}
            rounded up to <strong>{num0(appDownloads)}</strong> because you cannot sell a fraction of a
            download. Download {num0(appDownloads + 1)} contributes another {usd2(APP_CM)} straight to
            profit once fixed server and contractor costs are covered.
          </p>
          <h3>Break-even in sales dollars for a product line</h3>
          <p>
            When finance asks for break-even in dollars, use the margin ratio form. With {usd0(DEF_FC)}{" "}
            fixed costs and a {pctWholeFromRatio(defCmr)} ratio, break-even sales are {usd0(defBeRevenue)}. Multi-product
            firms can compute one ratio per SKU, or a blended ratio weighted by expected sales mix — the
            calculator on CalcWise handles single-SKU models; mix changes require a weighted contribution
            margin before you divide into fixed costs.
          </p>

          <h2>Contribution Margin and Operating Leverage</h2>
          <p>
            Contribution margin is the cash each sale sends toward fixed costs after variable expenses. Priya
            earns {usd2(priyaCm)} per {usd2(PRIYA_PRICE)} bowl ({pct1(priyaCmr * 100)} margin ratio). Raise
            price by {usd2(1)} without changing food cost and break-even falls by{" "}
            {Math.ceil(PRIYA_FC / priyaCm) - Math.ceil(PRIYA_FC / (priyaCm + 1))} meals at current costs.
            Cut variable cost by {usd2(0.5)} per bowl and break-even drops by{" "}
            {Math.ceil(PRIYA_FC / priyaCm) - Math.ceil(PRIYA_FC / (priyaCm + 0.5))} meals.
          </p>
          <p>
            Businesses with high fixed costs and high contribution margins carry more operating leverage:
            once you pass break-even, profit accelerates. At exactly break-even, operating income is zero,
            so leverage ratios blow up — that is why managers pair break-even with{" "}
            <strong>margin of safety</strong> (actual sales minus break-even sales). Priya's{" "}
            {num0(PRIYA_ACTUAL_UNITS)} meals produce {usd0(Math.abs(priyaLossAtActual))} in monthly loss
            because she is {num0(priyaBeUnits - PRIYA_ACTUAL_UNITS)} meals below break-even. Her sales sit{" "}
            {pct1(Math.abs(priyaMos))} below the break-even line, a margin of safety of {pct1(priyaMos)}.
          </p>
          <p>
            Compare contribution margin across offers with the{" "}
            <Link href="/calculators/margin-calculator" className="text-brand-600 hover:text-brand-800 font-medium">
              Margin Calculator
            </Link>{" "}
            before you run break-even, especially when shipping or processing fees differ by channel.
          </p>

          <h2>Break-Even When Platforms Take a Cut</h2>
          <p>
            Marketplace fees belong in variable cost, not fixed cost, because they scale with orders. Etsy
            charges {usd2(ETSY_LISTING)} per listing, 6.5% on the order total, and for US sellers a payment
            processing fee of 3% + {usd2(ETSY_PAY_FLAT)} per order (Etsy Help Center, checked November 2026).
            On a {usd2(ETSY_PRICE)} candle with {usd2(ETSY_BASE_VC)} in materials, fees near{" "}
            {usd2(etsyFees)} shrink contribution margin to {usd2(etsyCm)} and lift break-even from{" "}
            {num0(etsyBeNoFee)} to {num0(etsyBe)} units at {usd0(1000)} monthly fixed costs, which is{" "}
            {num0(etsyBe - etsyBeNoFee)} extra sales per month just to offset fees.
          </p>
          <p>
            Amazon's US referral fee for most general categories is 15% of the total sale price with a{" "}
            {usd2(AMZ_MIN)} minimum per item (sell.amazon.com pricing, November 2026). On a {usd2(ECOMM_PRICE)}{" "}
            SKU with {usd2(ECOMM_BASE_VC)} landed cost, the fee is {usd2(ecommFee)}, cutting contribution
            margin from {usd2(ecommCmNoFee)} to {usd2(ECOMM_PRICE - ecommVcWithFee)} and pushing break-even
            from {num0(ecommBeNoFee)} to {num0(ecommBeWithFee)} units when fixed costs are{" "}
            {usd0(ECOMM_FC)}. This counts the referral fee only; Fulfillment by Amazon fees, storage, and
            advertising would raise variable or fixed costs further. If you sell both direct-to-consumer
            and on Amazon, run separate break-evens: your Shopify site may have lower variable cost but
            higher ad spend in fixed costs.
          </p>

          <Sources
            items={[
              {
                label: "SBA Office of Advocacy, FAQs About Small Business (Feb. 2026) — 49.2% five-year survival",
                href: "https://advocacy.sba.gov/wp-content/uploads/2026/02/FINAL_FAQsAboutSmallBusiness_2026_012826.pdf",
              },
              {
                label: "Etsy Help Center — fees and US payment processing (3% + $0.25)",
                href: "https://help.etsy.com/hc/en-us/articles/115014483627-What-are-the-Fees-and-Taxes-for-Selling-on-Etsy",
              },
              {
                label: "Amazon Sell — referral fees by category (15% most general categories)",
                href: "https://sell.amazon.com/pricing",
              },
            ]}
            checked="November 2026"
            note="Survival rates cover employer establishments in BLS Business Employment Dynamics; nonemployer and sole-prop outcomes differ."
          />

          <h2>Case Study: Priya's Fast-Casual Bowl Shop in Denver</h2>
          <p>
            Priya, 41, owns a fast-casual bowl shop in Denver. Her monthly fixed costs total{" "}
            <strong>{usd0(PRIYA_FC)}</strong>: rent {usd0(6800)}, salaried kitchen lead {usd0(4200)},
            insurance {usd0(620)}, utilities {usd0(980)}, and equipment loan {usd0(1600)}. Variable cost
            averages <strong>{usd2(PRIYA_VC)}</strong> per bowl ({usd2(5.1)} food, {usd2(0.9)} packaging,{" "}
            {usd2(0.65)} card processing, {usd2(2.55)} hourly labor). The average check is{" "}
            <strong>{usd2(PRIYA_PRICE)}</strong>, so contribution margin is <strong>{usd2(priyaCm)}</strong>{" "}
            ({pct1(priyaCmr * 100)} of price).
          </p>
          <p>
            Break-even meals = {usd0(PRIYA_FC)} ÷ {usd2(priyaCm)} = {(PRIYA_FC / priyaCm).toFixed(1)}, rounded
            to <strong>{num0(priyaBeUnits)}</strong> bowls monthly ({usd0(priyaBeRevenue)} revenue). In
            October 2026 she sold {num0(PRIYA_ACTUAL_UNITS)} bowls — {usd0(PRIYA_ACTUAL_UNITS * PRIYA_PRICE)}{" "}
            in revenue — and lost {usd0(Math.abs(priyaLossAtActual))} because she was{" "}
            {num0(priyaBeUnits - PRIYA_ACTUAL_UNITS)} meals short of break-even. To pay herself{" "}
            {usd0(PRIYA_TARGET_PROFIT)} after all costs, she needs {num0(priyaUnitsForProfit)} bowls (
            {usd0(priyaRevenueForProfit)}), which is {num0(priyaUnitsForProfit - PRIYA_ACTUAL_UNITS)} more
            than she sells today.
          </p>
          <p>
            The second location adds {usd0(6800)} of monthly rent. Rent alone lifts combined fixed costs to{" "}
            {usd0(PRIYA_FC + 6800)} and break-even to {num0(Math.ceil((PRIYA_FC + 6800) / priyaCm))} meals,
            so the new shop must sell at least {num0(Math.ceil(6800 / priyaCm))} meals a month just to cover
            its own rent, before it pays for staff, insurance, or utilities. Her current shop is still{" "}
            {num0(priyaBeUnits - PRIYA_ACTUAL_UNITS)} meals short of break-even, so the first job is lifting
            sales there. Pair break-even with the{" "}
            <Link href="/guides/how-to-calculate-roi" className="text-brand-600 hover:text-brand-800 font-medium">
              ROI guide
            </Link>{" "}
            when the expansion requires upfront capital: ROI tells you if the payoff beats other uses of cash;
            break-even tells you the minimum sales to avoid bleeding cash.
          </p>

          <h2>Three Business Models Compared</h2>
          <p>
            The table stacks three business shapes with different fixed-cost burdens. Margin of safety
            compares each owner's actual monthly volume with break-even; all three examples are illustrative.
          </p>
          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Model</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Fixed/mo</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Price</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Variable</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">BE units</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Actual vol.</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Margin of safety</th>
                </tr>
              </thead>
              <tbody>
                {comparisonModels.map((row) => (
                  <tr key={row.model} className="border-b border-ink-100">
                    <td className="px-4 py-3 text-ink-800">{row.model}</td>
                    <td className="px-4 py-3 text-ink-800">{usd0(row.fixed)}</td>
                    <td className="px-4 py-3 text-ink-800">{usd0(row.price)}</td>
                    <td className="px-4 py-3 text-ink-800">{usd2(row.vc)}</td>
                    <td className="px-4 py-3 text-ink-800">{num0(row.be)}</td>
                    <td className="px-4 py-3 text-ink-800">{num0(row.actual)}</td>
                    <td className="px-4 py-3 text-ink-800">{pct1(row.mos)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-ink-600">
            {comparisonModels[2].model}: at {num0(comparisonModels[2].actual)} meals the operator is{" "}
            {num0(comparisonModels[2].actual - comparisonModels[2].be)} meals above break-even (a{" "}
            {pct1(comparisonModels[2].mos)} margin of safety). Two canceled 100-meal weekend days would drop
            volume to {num0(comparisonModels[2].actual - 200)}, below the {num0(comparisonModels[2].be)}-meal
            threshold, because fixed commissary and truck-loan costs keep running.
          </p>

          <h2>Step-by-Step: Build Your Break-Even Model</h2>
          <ol>
            <li>
              <strong>List fixed costs for one month.</strong> Include rent, insurance, salaried payroll,
              loan payments, and base subscriptions. Split annual bills into monthly amounts ({usd0(12000)}{" "}
              insurance ÷ 12 = {usd0(1000)} per month).
            </li>
            <li>
              <strong>Find variable cost per unit.</strong> Add materials, packaging, shipping labels,
              marketplace fees, and per-unit labor. For Etsy, add listing, transaction, and processing fees
              to variable cost, not fixed cost.
            </li>
            <li>
              <strong>Compute contribution margin and ratio.</strong> Margin = price − variable cost; ratio =
              margin ÷ price. Use the margin calculator if you have multiple SKUs.
            </li>
            <li>
              <strong>Solve units and revenue.</strong> Units = fixed ÷ margin; revenue = fixed ÷ ratio (or
              units × price). Compare both answers — they should match within rounding.
            </li>
            <li>
              <strong>Add target profit if needed.</strong> Add desired owner pay or investor return to
              fixed costs before dividing.
            </li>
            <li>
              <strong>Stress-test price and volume.</strong> Run ±10% price in the{" "}
              <Link href="/calculators/break-even" className="text-brand-600 hover:text-brand-800 font-medium">
                Break-Even Calculator
              </Link>{" "}
              and compare margin of safety to slow months. Side businesses should also budget taxes and
              quarterly estimated payments — see our{" "}
              <Link href="/guides/self-employment-tax-guide" className="text-brand-600 hover:text-brand-800 font-medium">
                self-employment tax guide
              </Link>{" "}
              for how net profit turns into IRS payments.
            </li>
          </ol>

          <h2>Side Hustles, Freelancers, Restaurants, and E-Commerce</h2>
          <p>
            <strong>Freelancers</strong> treat billable projects as units. A designer charging {usd0(comparisonModels[0].price)} per project with{" "}
            {usd0(comparisonModels[0].vc)} of stock assets and subcontracting and {usd0(comparisonModels[0].fixed)} in monthly
            fixed costs breaks even at {num0(comparisonModels[0].be)} projects a month, fewer than two a week.
            Landing {num0(comparisonModels[0].actual)} projects leaves a {pct1(comparisonModels[0].mos)} margin of safety.
            Track unbilled hours in fixed cost if you pay yourself a draw regardless of sales.
          </p>
          <p>
            <strong>Restaurants and food trucks</strong> mix high fixed rent with low per-meal margins. Priya's
            model is tight: a {usd2(1)} increase in chicken cost across the menu without a price change can wipe{" "}
            {usd0(PRIYA_ACTUAL_UNITS * 1)} from monthly contribution if she sells {num0(PRIYA_ACTUAL_UNITS)} bowls.
          </p>
          <p>
            <strong>E-commerce</strong> should model fees per channel. After Amazon's 15% referral, the SKU in
            the table needs {num0(ecommBeWithFee)} units versus {num0(ecommBeNoFee)} on a direct site — a gap of{" "}
            {num0(ecommBeWithFee - ecommBeNoFee)} orders before profit. Use the{" "}
            <Link href="/calculators/roi" className="text-brand-600 hover:text-brand-800 font-medium">
              ROI Calculator
            </Link>{" "}
            on ad spend only after you know break-even units so you do not scale a negative margin.
          </p>
          <p>
            <strong>Savings runway:</strong> If the business loses {usd0(Math.abs(priyaLossAtActual))} per month,
            a {usd0(15000)} personal emergency fund covers about{" "}
            {Math.floor(15000 / Math.abs(priyaLossAtActual))} months of operation at today's volume — tie
            runway goals to the{" "}
            <Link href="/calculators/savings-goal" className="text-brand-600 hover:text-brand-800 font-medium">
              Savings Goal Calculator
            </Link>{" "}
            if you are funding the shop from W-2 income.
          </p>

          <h2>What Break-Even Analysis Does Not Capture</h2>
          <p>
            The textbook model assumes one price, one variable cost per unit, and a clean split between fixed
            and variable costs. Real businesses break those assumptions quickly. <strong>Semi-variable costs</strong>{" "}
            (utilities that step up after certain hours, card processing with a flat per-transaction fee) need
            either average variable cost or a multi-step model. <strong>Price changes and discounts</strong> mean
            your contribution margin ratio is an average, not a constant. <strong>Product mix</strong> shifts when
            customers buy high-margin drinks with low-margin entrees. <strong>Income and sales taxes</strong> sit
            below operating profit — break-even is pretax cash coverage, not after-tax owner pay.
          </p>
          <p>
            <strong>Time value of money</strong> matters when fixed costs include loan principal paydown you
            modeled as expense but investors treat as balance-sheet movement. <strong>Cash vs accrual</strong>{" "}
            timing can show profit on paper while payroll due Friday drains the account. Break-even is a monthly
            operating snapshot; use it with cash-flow planning when seasonality swings volume by 30% or more.
          </p>
        </section>

        <div className="rounded-lg border border-brand-200 bg-brand-50 p-6 my-8 text-center">
          <p className="font-semibold text-ink-800">Run Your Own Numbers</p>
          <p className="mt-1 text-sm text-ink-600">
            Model break-even units, revenue dollars, target profit, and price sensitivity in one place.
          </p>
          <Link
            href="/calculators/break-even"
            className="mt-3 inline-block rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-700"
          >
            Open Break-Even Calculator
          </Link>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">FAQ</h2>
          {faqs.map((faq, i) => (
            <div key={i} className="mt-8">
              <h3 className="text-lg font-semibold text-ink-800">{faq.question}</h3>
              <p className="mt-2 text-ink-700">{faq.answer}</p>
            </div>
          ))}
        </section>

        <RelatedGuides
          currentSlug={slug}
          relatedSlugs={["how-to-calculate-roi", "save-50000-in-3-years", "self-employment-tax-guide"]}
        />
      </article>
    </>
  );
}
