import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { RelatedGuides } from "@/components/RelatedGuides";
import { Sources } from "@/components/Sources";

export const metadata: Metadata = {
  title: "How Much Should You Tip? The Complete 2026 Tipping Guide by Service",
  description:
    "Learn exactly how much to tip at restaurants, coffee shops, for delivery, at salons, and for group dinners. Specific dollar amounts, percentage ranges, and etiquette rules for every situation.",
  keywords: [
    "how much to tip",
    "tipping guide",
    "restaurant tip percentage",
    "how much to tip delivery driver",
    "salon tip etiquette",
    "group dinner tip calculator",
    "coffee shop tipping",
  ],
};

const faqs = [
  {
    question: "Should I tip on the pre-tax or post-tax total?",
    answer:
      "Most etiquette experts and servers agree that tips should be calculated on the pre-tax subtotal, not the total after sales tax. Tax is a government levy, not a cost of service. On a $120 bill with 8% sales tax ($9.60), tipping 20% pre-tax means $24.00 in gratuity. Tipping 20% post-tax on $129.60 yields $25.92 — an extra $1.92 per meal that adds up across dozens of restaurant visits each year. Look for the subtotal line on your receipt before calculating.",
  },
  {
    question: "Do I need to tip at coffee shops?",
    answer:
      "Coffee shop tips are appreciated but not universally expected the way restaurant tips are. Baristas typically earn at or above the federal $7.25 minimum wage rather than the $2.13 tipped-employee cash wage, and the interaction lasts under two minutes. Bankrate's 2025 survey found only 18% of coffee shop visitors always tip baristas (Tier-2 survey). A flat $1-$2 tip on a $5-$8 order is perfectly reasonable for counter service. Digital tip screens often present 15%, 20%, and 25% options, but there is no social obligation to select the highest amount. For complex custom drinks or large catering orders ($50+), a 15-20% tip is more appropriate.",
  },
  {
    question: "How much should I tip a food delivery driver?",
    answer:
      "The current standard for food delivery is 20% of the order total, with a $5 minimum regardless of order size. On a $45 order, that is $9.00. Drivers see tip amounts before accepting orders on most platforms, so lower tips may result in longer wait times. In bad weather (rain, snow, extreme heat), bump to 25-30% ($11.25-$13.50 on a $45 order). For deliveries 10+ miles away, consider $12-$15 (27-33%) to reflect the driver's time and fuel costs.",
  },
  {
    question: "Should I tip the salon owner?",
    answer:
      "Historically, salon owners were exempt from tipping because they set prices and keep the full service fee. Modern etiquette has shifted, and most guides now recommend tipping owners the same 15-20% as employed stylists. If the owner provides the service personally and you would tip an employee stylist for the same work, extending the same gratuity is appropriate. On a $65 service, that means $13.00 at 20%.",
  },
  {
    question: "How much do Americans spend on tips annually?",
    answer:
      "A typical American who dines out twice per week at $60 per meal and tips 20% spends roughly $1,248 per year on restaurant gratuities alone. Add daily coffee shop tips ($260/year at $1 per visit, 5 days per week), monthly salon visits ($156/year at $13 per tip), and weekly food delivery ($468/year at $9 per order), and total annual tipping easily reaches $2,100-$2,500 for an active consumer. Tracking tips as a budget line item prevents end-of-month surprises.",
  },
];

export default function TippingGuideHowMuch() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <ArticleJsonLd
        title="How Much Should You Tip? The Complete 2026 Tipping Guide by Service"
        description="Learn exactly how much to tip at restaurants, coffee shops, for delivery, at salons, and for group dinners. Specific dollar amounts, percentage ranges, and etiquette rules for every situation."
        slug="tipping-guide-how-much"
        datePublished="2026-09-13"
        dateModified="2026-10-20"
        image="/images/tip-calculator-infographic.webp"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Guides", href: "/guides" },
          {
            name: "How Much Should You Tip?",
            href: "/guides/tipping-guide-how-much",
          },
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        {/* Hero */}
        <header>
          <p className="text-sm font-medium text-brand-600">
            <Link href="/guides" className="hover:underline">
              Guides
            </Link>{" "}
            / Everyday Finance
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">
            How Much Should You Tip? The Complete 2026 Tipping Guide by Service
          </h1>
          <p className="mt-4 text-lg text-ink-600">
            Tipping in the United States is not optional generosity — it is how
            millions of service workers earn a livable wage.             A server in a tipped-minimum state may earn as little as $2.13 per
            hour in direct wages before tips, with employers required to make up
            the difference if tips plus wages fall below the $7.25 federal
            minimum. Your 18-20% gratuity often makes up much of their take-home
            pay. Yet the rules differ dramatically by service
            type: what is standard at a steakhouse is excessive at a coffee
            counter, and what works for a couple's dinner breaks down at a
            six-person group table. This guide gives you specific dollar amounts
            and percentage ranges for every common tipping scenario.
          </p>
          <p className="mt-2 text-sm text-ink-500">Last updated: October 2026</p>
        </header>

        {/* TL;DR */}
        <section className="mt-10 rounded-xl border border-brand-200 bg-brand-50 p-6">
          <h2 className="text-lg font-semibold text-brand-800">
            TL;DR - Quick Reference
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-brand-200 bg-brand-100/50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Service Type
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Standard Tip
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Example ($)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-100">
                <tr>
                  <td className="px-4 py-3 text-ink-700">Restaurant (sit-down)</td>
                  <td className="px-4 py-3 text-ink-800">18-20% pre-tax</td>
                  <td className="px-4 py-3 text-ink-800">$24 on $120 bill</td>
                </tr>
                <tr className="bg-brand-100/30">
                  <td className="px-4 py-3 text-ink-700">Group dinner (6+)</td>
                  <td className="px-4 py-3 text-ink-800">18-20% (auto-gratuity common)</td>
                  <td className="px-4 py-3 text-ink-800">$70 on $350 bill</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-ink-700">Coffee shop (counter)</td>
                  <td className="px-4 py-3 text-ink-800">$1-$2 flat</td>
                  <td className="px-4 py-3 text-ink-800">$1.50 on $7.50 order</td>
                </tr>
                <tr className="bg-brand-100/30">
                  <td className="px-4 py-3 text-ink-700">Food delivery</td>
                  <td className="px-4 py-3 text-ink-800">20% ($5 minimum)</td>
                  <td className="px-4 py-3 text-ink-800">$9 on $45 order</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-ink-700">Hair salon / barber</td>
                  <td className="px-4 py-3 text-ink-800">20% of service total</td>
                  <td className="px-4 py-3 text-ink-800">$13 on $65 service</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-ink-600">
            Use our{" "}
            <Link
              href="/calculators/tip-calculator"
              className="font-medium text-brand-600 underline"
            >
              Tip Calculator
            </Link>{" "}
            to compute exact amounts for any bill size, party count, or tip
            percentage.
          </p>
        </section>

        {/* Infographic */}
        <section className="mt-12">
          <figure className="overflow-hidden rounded-xl border border-ink-200">
            <Image
              src="/images/tip-calculator-infographic.webp"
              alt="Tipping guide infographic showing recommended tip percentages for restaurants, delivery, salon, and other services in the United States"
              width={1200}
              height={800}
              quality={80}
              className="w-full"
              priority
            />
            <figcaption className="bg-ink-50 px-4 py-2 text-center text-sm text-ink-500">
              Standard tipping percentages by service type in the United States
            </figcaption>
          </figure>
        </section>

        {/* Restaurant Dining */}
        <section className="mt-12">
          <h2 id="restaurant-dinner" className="text-2xl font-bold text-ink-900">
            Restaurant Dining
          </h2>
          <p className="mt-4 text-ink-700">
            Full-service restaurant dining is the highest-standard tipping
            category in the United States. Under federal law, employers may pay
            tipped employees as little as $2.13 per hour in direct wages when
            tips bring total hourly pay up to the $7.25 federal minimum wage;
            many states require higher cash wages. Your gratuity often makes up
            much of a server's take-home pay. Etiquette guides commonly cite
            18% for satisfactory service and 20% for good service on the pre-tax
            subtotal; Bankrate's 2025 survey found 35% of Americans typically
            tip at least 20% at sit-down restaurants (Tier-2 survey).
          </p>
          <Sources
            items={[
              {
                label: "U.S. Department of Labor, Tips (federal $2.13 tipped wage / $7.25 minimum)",
                href: "https://www.dol.gov/general/topic/wages/wagestips",
              },
              {
                label: "U.S. Department of Labor, Minimum Wage ($7.25/hour)",
                href: "https://www.dol.gov/general/topic/wages/minimumwage",
              },
              {
                label: "Bankrate Tipping Survey press release (June 4, 2025)",
                href: "https://www.bankrate.com/press-releases/63-of-americans-have-a-negative-view-about-tipping-with-41-saying-tipping-culture-has-gotten-out-of-control/",
              },
            ]}
            checked="October 2026"
            note="Percentages for 18-20% service norms are etiquette guidance; Bankrate figures are self-reported survey results (Tier-2)."
          />
          <p className="mt-4 text-ink-700">
            On a typical $120 dinner bill, the math breaks down cleanly:
          </p>
          <ul className="mt-4 space-y-2 text-ink-700">
            <li>
              <strong>15% (acceptable):</strong> $18.00 — adequate service, no
              major issues
            </li>
            <li>
              <strong>18% (standard):</strong> $21.60 — the baseline most
              etiquette guides recommend
            </li>
            <li>
              <strong>20% (good):</strong> $24.00 — attentive service, accurate
              orders, timely refills
            </li>
            <li>
              <strong>25% (exceptional):</strong> $30.00 — memorable experience,
              dietary accommodations, or outstanding care
            </li>
          </ul>
          <p className="mt-4 text-ink-700">
            The difference between acceptable and generous is only $12 — roughly
            the price of a single appetizer — yet it meaningfully affects a
            server's earnings across a full shift.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-ink-800">
            Pre-Tax vs Post-Tax Tipping
          </h3>
          <p className="mt-2 text-ink-700">
            Etiquette experts recommend calculating your tip on the pre-tax
            subtotal, not the total after sales tax. Tax is a government levy,
            not a cost of service. On a $120 bill with 8% sales tax ($9.60),
            tipping 20% on the after-tax total of $129.60 costs an extra $1.92
            compared to tipping on $120. While modest on one meal, that
            difference exceeds $100 over a year of monthly client dinners at
            similar price points.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-ink-800">
            Counter Service vs Sit-Down
          </h3>
          <p className="mt-2 text-ink-700">
            Fast-casual counter service — where you order at a register and pick
            up your food — typically does not require a tip, though many payment
            screens now prompt for one anyway. Sit-down dining where a server
            takes your order, refills drinks, and handles the check is where
            18-20% is expected and essential.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-ink-800">
            When to Tip More or Less
          </h3>
          <p className="mt-2 text-ink-700">
            Standard percentages are starting points, not rigid rules.
            Exceptional service — attentive without being intrusive, accurate
            orders, and genuine warmth — warrants 20-25%. Mediocre service with
            long waits might justify 15%, though many diners still tip 18% to
            avoid penalizing a server covering too many tables. Truly poor
            service — rude behavior or completely wrong orders with no apology —
            may warrant speaking with a manager rather than reducing the tip to
            zero, since many restaurants pool or share tips among staff.
          </p>

          <div className="mt-6 rounded-lg border-l-4 border-amber-400 bg-amber-50 p-4">
            <p className="font-medium text-amber-800">Key Insight</p>
            <p className="mt-1 text-sm text-amber-700">
              Tip on comped or discounted items at their full pre-discount price.
              If a manager comped a $25 appetizer due to a kitchen error,
              calculate your tip as if that item were still on the bill. The
              server provided the same service regardless of the comp.
            </p>
          </div>
        </section>

        {/* Group Dinners */}
        <section className="mt-12">
          <h2 id="group-dinner" className="text-2xl font-bold text-ink-900">
            Group Dinners
          </h2>
          <p className="mt-4 text-ink-700">
            Group dinners with friends, family, or colleagues introduce unique
            tipping and splitting challenges. A $350 bill for six people averages
            $58.33 per person before tip. Adding a 20% gratuity of $70 brings the
            total to $420, or $70 per person all-in — a clean number that
            includes fair compensation for a server managing a large table.
          </p>
          <p className="mt-4 text-ink-700">
            A server managing a six-person table handles roughly three times the
            order complexity of a couple — coordinating timing, refills, dietary
            requests, and separate drink orders — yet receives the same percentage
            tip. The absolute dollar amount ($70 vs $24 for a couple's
            dinner) partially compensates for the extra workload.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-ink-800">
            Auto-Gratuity Thresholds
          </h3>
          <p className="mt-2 text-ink-700">
            Most restaurants automatically add 18-20% gratuity for parties of six
            or more, though some set the threshold at eight guests. On a $350
            bill, auto-gratuity at 18% equals $63 and appears as a line item on
            your receipt.             Mandatory service charges that customers cannot change are not
            voluntary tips under IRS rules, even when distributed to staff.
            Always review your bill before adding an
            additional tip to avoid double-tipping — adding another 20% on top of
            an included 18% gratuity would overpay by $70.
          </p>
          <p className="mt-4 text-ink-700">
            If auto-gratuity is already included, you may still leave an
            additional 2-5% in cash for outstanding service ($7-$17.50 on a $350
            bill). This is a common and appreciated gesture for large parties
            without overpaying.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-ink-800">
            Per-Person Calculation and Check-Splitting
          </h3>
          <p className="mt-2 text-ink-700">
            The fairest approach: add the tip to the full bill, then divide the
            total by the number of people. On a $350 bill with 20% tip ($70),
            each of six people pays $70.00. Splitting only the food subtotal and
            leaving one person to cover the entire tip creates confusion and often
            shortchanges the server.
          </p>
          <p className="mt-4 text-ink-700">
            When guests ordered unevenly — some had appetizers, premium entrees,
            or multiple drinks — itemized splitting is fairer. Calculate each
            person's food and drink subtotal, add their proportional share of
            tax, then apply the tip percentage to their individual amount. Venmo
            and payment apps simplify collection, but designate one person to
            calculate the total including tip and tax, then request a fixed
            amount from each guest rather than leaving tip calculation to chance.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-ink-800">
            Corporate Dining Etiquette
          </h3>
          <p className="mt-2 text-ink-700">
            For corporate team dinners, the host typically covers the full bill
            and tip. Budget $75-$85 per person (including 20% gratuity and tax)
            when planning group dining events at mid-range restaurants. If you
            are the host, calculate the expected total before the meal and
            communicate per-person cost to attendees so no one is surprised when
            the check arrives.
          </p>
        </section>

        {/* Coffee Shops */}
        <section className="mt-12">
          <h2 id="coffee-shop" className="text-2xl font-bold text-ink-900">
            Coffee Shops and Counter Service
          </h2>
          <p className="mt-4 text-ink-700">
            Coffee shop tipping has become one of the most debated etiquette
            questions since digital payment terminals started presenting tip
            prompts for counter service. Unlike sit-down restaurants where tipping
            is essential, coffee shop tips are appreciated but not universally
            expected. Baristas typically earn at or above the $7.25 federal minimum
            wage, and the interaction lasts under two minutes instead of an
            hour-long dining experience. Bankrate's 2025 survey found 18% of
            coffee shop customers always tip baristas (Tier-2 survey).
          </p>
          <p className="mt-4 text-ink-700">
            For a $7.50 latte order, common approaches include:
          </p>
          <ul className="mt-4 space-y-2 text-ink-700">
            <li>
              <strong>Flat $1:</strong> 13.3% — perfectly reasonable for a
              standard order
            </li>
            <li>
              <strong>15% calculated:</strong> $1.13 — total $8.63
            </li>
            <li>
              <strong>20% calculated:</strong> $1.50 — acknowledges extra craft
            </li>
            <li>
              <strong>Round up to $8:</strong> $0.50 — acceptable for drip coffee
              or grab-and-go
            </li>
          </ul>

          <h3 className="mt-8 text-xl font-semibold text-ink-800">
            Digital Tip Screen Etiquette
          </h3>
          <p className="mt-2 text-ink-700">
            Payment terminals often display tipping options of 15%, 20%, and 25%
            on a screen facing the customer while the barista watches, creating
            social pressure to select a higher amount. These defaults are set by
            the payment processor, not the coffee shop. Selecting a custom tip,
            choosing the lowest option, or tapping no tip are all acceptable for
            standard counter service orders. There is no social obligation to
            select the highest option — $1 on a $5-$8 coffee purchase is a
            perfectly reasonable tip.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-ink-800">
            Frequency Impact: The $260/Year Question
          </h3>
          <p className="mt-2 text-ink-700">
            Regular customers who visit a coffee shop five times per week and tip
            $1 per visit spend roughly $260 per year (5 × 52 weeks). At $1.50 per
            visit on the same schedule, that rises to $390 per year. Daily visits
            with a $1.50 tip (365 days) reach about $548 per year. These amounts are worth
            budgeting for if you visit frequently — they belong in your
            discretionary spending category alongside dining and entertainment.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-ink-800">
            Barista Complexity Factor
          </h3>
          <p className="mt-2 text-ink-700">
            If a barista makes a complex custom drink — multiple modifications,
            specific temperature, alternative milk preparation — a 20% tip
            acknowledges the extra craft involved compared to a standard pour.
            For large catering orders ($50+) from a coffee shop, a 15-20% tip is
            appropriate since staff prepares multiple drinks simultaneously and
            may arrange delivery or setup. Drive-through tipping is optional and
            less common; if a tip jar is present, $1 is generous but not expected.
          </p>
        </section>

        {/* Food Delivery */}
        <section className="mt-12">
          <h2 id="food-delivery" className="text-2xl font-bold text-ink-900">
            Food Delivery
          </h2>
          <p className="mt-4 text-ink-700">
            Food delivery tipping has shifted significantly with app-based
            services like DoorDash, Uber Eats, and Grubhub. Delivery drivers use
            personal vehicles, pay for their own gas and insurance, and often
            earn low per-delivery base pay before tips. For a $45 food
            delivery order, a 20% tip of $9.00 matches common etiquette guidance;
            Bankrate's 2025 survey found 52% of delivery customers always tip
            (Tier-2 survey).
          </p>

          <h3 className="mt-8 text-xl font-semibold text-ink-800">
            The $5 Minimum Rule
          </h3>
          <p className="mt-2 text-ink-700">
            Many delivery experts recommend a $5 minimum tip regardless of order
            size. A $3 tip on a $15 order may not justify the driver's time
            and fuel costs. The percentage-based norm of 20% works for larger
            orders, but the absolute dollar amount matters more for small orders
            because drivers bear vehicle wear, gas, and unpaid time between
            deliveries.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-ink-800">
            Driver Visibility of Tip Amount
          </h3>
          <p className="mt-2 text-ink-700">
            Most delivery platforms show your tip to drivers before they accept
            the order. A $9 tip on a $45 order makes your delivery more
            attractive and likely results in faster pickup and more careful
            handling. A low pre-tip may result in longer wait times or fewer
            available drivers willing to accept the delivery. You can often adjust
            the tip after delivery on some platforms if service was exceptionally
            good or poor, but the initial tip amount strongly influences driver
            behavior.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-ink-800">
            Bad Weather Premium (25-30%)
          </h3>
          <p className="mt-2 text-ink-700">
            Rain, snow, and extreme heat significantly increase delivery
            difficulty and risk, warranting a 25-30% tip rather than the standard
            20%. On a $45 order, that means $11.25-$13.50 instead of $9.00 — an
            extra $2.25-$4.50 that meaningfully acknowledges the driver's
            effort in hazardous conditions. Drivers who accept orders during
            storms often face reduced order volume and higher expenses, making
            generous tipping especially important.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-ink-800">
            Distance Factor and App Fees
          </h3>
          <p className="mt-2 text-ink-700">
            Ordering from a restaurant 10+ miles away typically means the driver
            spends 30-45 minutes on your delivery alone. A $12-$15 tip (27-33%
            on $45) better reflects the distance commitment than a flat
            percentage. For apartment or office deliveries requiring parking,
            elevators, or security checkpoints, add an extra $2-$3 beyond your
            standard tip.
          </p>
          <p className="mt-4 text-ink-700">
            App delivery fees ($3-$8) and service charges go to the platform,
            not the driver. Your tip is separate compensation for the person who
            physically delivers your food. A typical $45 order with $5 delivery
            fee, $3 service charge, and $9 tip totals $62 — the tip is the only
            portion that directly rewards the driver's effort.
          </p>
          <p className="mt-4 text-ink-700">
            Pickup orders placed through delivery apps do not require a tip
            because no delivery service is provided. If a restaurant employee
            brings the order to your car in a curbside pickup arrangement, a
            $2-$3 tip is a courteous gesture but not expected.
          </p>
        </section>

        {/* Hair Salon */}
        <section className="mt-12">
          <h2 id="salon-haircut" className="text-2xl font-bold text-ink-900">
            Hair Salon and Personal Services
          </h2>
          <p className="mt-4 text-ink-700">
            Tipping your hairstylist or barber is customary in the United States,
            with 20% being the widely accepted standard for salon services. On a
            $65 haircut and styling service, a 20% tip of $13.00 brings the total
            to $78.00. The tipping expectation applies whether you visit a
            budget-friendly chain or an upscale salon.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-ink-800">
            Multi-Service Tipping
          </h3>
          <p className="mt-2 text-ink-700">
            If your salon charges $65 for a cut and $40 for color (total $105),
            tip 20% on the full $105 ($21.00) rather than calculating separate
            percentages for each service. The total amount reflects the
            stylist's full effort across a 2-3 hour appointment. For color
            treatments, highlights, or complex styling, many clients tip 25%
            ($16.25 on a $65 service) to reflect the extended time and skill.
          </p>
          <p className="mt-4 text-ink-700">
            When a salon assistant washes and conditions your hair separately
            from the stylist who cuts it, a $3-$5 cash tip directly to the
            assistant is customary in addition to the main stylist's 20% tip.
            Hand the assistant tip in cash at the shampoo bowl rather than adding
            it to the credit card transaction, as assistants may not receive a
            share of card-based tips processed through the salon's payment
            system.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-ink-800">
            Holiday Tipping
          </h3>
          <p className="mt-2 text-ink-700">
            Holiday tipping for your regular stylist equals the cost of one full
            service — $65 in this scenario — typically given in December as cash
            or a gift card. This annual bonus acknowledges the ongoing
            relationship and is separate from your regular 20% tip at each
            appointment. If you visit multiple times per year, the holiday tip is
            in addition to your per-visit gratuity, not a replacement for it.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-ink-800">
            Tipping Salon Owners
          </h3>
          <p className="mt-2 text-ink-700">
            Historically, salon owners were exempt from tipping because they set
            prices and keep the full service fee. Modern etiquette has shifted,
            and most guides now recommend tipping owners the same 15-20% as
            employed stylists. If the owner provides the service personally and
            you would tip an employee stylist for the same work, extending the
            same gratuity is appropriate and appreciated.
          </p>
        </section>

        {/* Tips, taxes, and reporting */}
        <section className="mt-12">
          <h2 id="tips-taxes" className="text-2xl font-bold text-ink-900">
            Tips, Taxes, and the Law
          </h2>
          <p className="mt-4 text-ink-700">
            If you work for tips, IRS Publication 531 requires you to report cash
            and card tips to your employer when total tips from one job exceed{" "}
            <strong>$20 in a calendar month</strong>. Report by the 10th of the
            following month (or when employment ends). Tips you keep after tip
            pooling count; amounts you pass to coworkers do not. On your tax
            return, tips already on Form W-2 are included in wages; unreported
            tips may trigger penalties.
          </p>
          <p className="mt-4 text-ink-700">
            For customers, a <strong>service charge</strong> added automatically
            to a bill (with no option to change it) is not a qualified tip under
            IRS rules, even if the restaurant shares it with staff. Voluntary
            amounts you add on top are tips.
          </p>
          <p className="mt-4 text-ink-700">
            Under the One Big Beautiful Bill Act, eligible tipped workers may
            deduct up to <strong>$25,000</strong> of qualified tips on federal
            returns for tax years <strong>2025 through 2028</strong>, including
            the return you file in 2027 for 2026 calendar-year income. The
            deduction phases out when modified adjusted gross income exceeds
            $150,000 ($300,000 married filing jointly), requires a valid Social
            Security number, and (if married) a joint return. Tips must be in an
            occupation on the IRS tipped-occupation list and appear on Form W-2,
            Form 1099-NEC, Form 1099-MISC, Form 1099-K, or Form 4137.
          </p>
          <Sources
            items={[
              {
                label: "IRS Publication 531 (Dec. 2024), Reporting Tip Income",
                href: "https://www.irs.gov/publications/p531",
              },
              {
                label: "IRS IR-2026-49, final tipped-occupation list (Apr. 10, 2026)",
                href: "https://www.irs.gov/newsroom/treasury-irs-issue-final-regulations-listing-occupations-where-workers-customarily-and-regularly-receive-tips-under-the-one-big-beautiful-bill",
              },
              {
                label: "IRS Working Families Tax Cuts — No tax on tips overview",
                href: "https://www.irs.gov/newsroom/working-families-tax-cuts-individuals-and-workers",
              },
              {
                label: "IRS Publication 6133 (Mar. 2026), No tax on tips overview",
                href: "https://www.irs.gov/pub/irs-pdf/p6133.pdf",
              },
              {
                label: "IRS, What the No Tax on Tips deduction means (Mar. 5, 2026)",
                href: "https://www.irs.gov/newsroom/what-the-no-tax-on-tips-deduction-means-for-you",
              },
            ]}
            checked="October 2026"
            note="The $25,000 cap and phase-out thresholds are statutory; there is no shared constant in tax-data.ts yet."
          />
        </section>

        {/* Annual Budget Impact */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            How Tipping Adds Up: Annual Budget Impact
          </h2>
          <p className="mt-4 text-ink-700">
            Tipping affects your monthly budget in ways that are easy to
            overlook. A couple who dines out twice per week at $60 per meal and
            tips 20% spends roughly $1,248 per year on restaurant gratuities alone
            — before drinks, tax, or delivery fees. Tracking tips as a budget
            line item prevents end-of-month surprises. Use our{" "}
            <Link
              href="/guides/50-30-20-budget-rule"
              className="font-medium text-brand-600 underline"
            >
              50/30/20 budget rule guide
            </Link>{" "}
            to see how dining and tipping fit into your wants allocation.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Service
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Frequency
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Avg Tip
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Annual Cost
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <tr>
                  <td className="px-4 py-3 text-ink-700">Restaurant dining</td>
                  <td className="px-4 py-3 text-ink-800">2x per week</td>
                  <td className="px-4 py-3 text-ink-800">$12 (20% on $60)</td>
                  <td className="px-4 py-3 font-medium text-ink-900">$1,248</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3 text-ink-700">Coffee shop</td>
                  <td className="px-4 py-3 text-ink-800">5x per week</td>
                  <td className="px-4 py-3 text-ink-800">$1 flat</td>
                  <td className="px-4 py-3 font-medium text-ink-900">$260</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-ink-700">Food delivery</td>
                  <td className="px-4 py-3 text-ink-800">1x per week</td>
                  <td className="px-4 py-3 text-ink-800">$9 (20% on $45)</td>
                  <td className="px-4 py-3 font-medium text-ink-900">$468</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3 text-ink-700">Hair salon</td>
                  <td className="px-4 py-3 text-ink-800">1x per month</td>
                  <td className="px-4 py-3 text-ink-800">$13 (20% on $65)</td>
                  <td className="px-4 py-3 font-medium text-ink-900">$156</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-ink-700">Group dinners</td>
                  <td className="px-4 py-3 text-ink-800">1x per month</td>
                  <td className="px-4 py-3 text-ink-800">$12 (share of $70)</td>
                  <td className="px-4 py-3 font-medium text-ink-900">$144</td>
                </tr>
                <tr className="bg-brand-50/50 font-medium">
                  <td className="px-4 py-3 text-ink-900">Total</td>
                  <td className="px-4 py-3">—</td>
                  <td className="px-4 py-3">—</td>
                  <td className="px-4 py-3 text-brand-700">$2,276</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-500">
            Based on a typical active consumer. Adjust frequencies and amounts to
            match your habits. If you dine out $400 per month on food and drink
            before tip, add 18% ($72) to your dining budget for a realistic $472
            monthly restaurant spend.
          </p>
        </section>

        {/* Calculator CTA */}
        <section className="mt-12 rounded-xl border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-8 text-center">
          <h2 className="text-2xl font-bold text-ink-900">
            Calculate Your Tip in Seconds
          </h2>
          <p className="mt-2 text-ink-600">
            Enter any bill amount, tip percentage, and number of diners to get
            exact gratuity amounts and per-person splits — for restaurants, group
            dinners, delivery, salons, and more.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/calculators/tip-calculator"
              className="rounded-lg bg-brand-600 px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-brand-700"
            >
              Tip Calculator
            </Link>
            <Link
              href="/calculators/budget-50-30-20"
              className="rounded-lg border border-brand-300 bg-white px-6 py-3 font-medium text-brand-700 shadow-sm transition-colors hover:bg-brand-50"
            >
              50/30/20 Budget Calculator
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-12">
          <Sources
            items={[
              {
                label: "U.S. Department of Labor, Tips",
                href: "https://www.dol.gov/general/topic/wages/wagestips",
              },
              {
                label: "IRS Publication 531 (Dec. 2024)",
                href: "https://www.irs.gov/publications/p531",
              },
              {
                label: "Bankrate Tipping Survey (2025)",
                href: "https://www.bankrate.com/press-releases/63-of-americans-have-a-negative-view-about-tipping-with-41-saying-tipping-culture-has-gotten-out-of-control/",
              },
            ]}
            checked="October 2026"
            note="Federal wage figures are Tier-1; tipping percentages cited from etiquette guides and Bankrate surveys are Tier-2."
          />
          <h2 className="text-2xl font-bold text-ink-900">
            Frequently Asked Questions
          </h2>
          <div className="mt-6 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-lg border border-ink-200 bg-white"
              >
                <summary className="cursor-pointer px-5 py-4 font-medium text-ink-800 hover:text-brand-600">
                  {faq.question}
                </summary>
                <p className="px-5 pb-4 text-sm text-ink-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <RelatedGuides
          currentSlug="tipping-guide-how-much"
          relatedSlugs={["50-30-20-budget-rule"]}
        />
      </article>
    </>
  );
}
