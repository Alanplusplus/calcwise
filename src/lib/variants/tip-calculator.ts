import type { CalculatorVariant } from "./types";

const DOL_TIPPED_MINIMUM = {
  label: "U.S. DOL Fact Sheet #15 — federal tipped minimum cash wage $2.13 (2026)",
  href: "https://www.dol.gov/agencies/whd/fact-sheets/15-tipped-employees-flsa",
};

const IRS_QUALIFIED_TIPS = {
  label: "IRS — Qualified tips deduction (tax years 2025–2028, up to $25,000)",
  href: "https://www.irs.gov/newsroom/what-the-no-tax-on-tips-deduction-means-for-you",
};

const TOAST_TIPPING_Q2_2026 = {
  label: "Toast restaurant tipping data — Q2 2026 U.S. averages",
  href: "https://pos.toasttab.com/blog/data/restaurant-tipping-trends",
};

const BANKRATE_TIPPING_2025 = {
  label: "Bankrate Tipping Survey (June 4, 2025)",
  href: "https://www.bankrate.com/press-releases/63-of-americans-have-a-negative-view-about-tipping-with-41-saying-tipping-culture-has-gotten-out-of-control/",
};

export const tipCalculatorVariants: CalculatorVariant[] = [
  {
    slug: "restaurant-dinner",
    lastUpdated: "2026-10-21",
    title: "Restaurant Dinner Tip Calculator",
    description:
      "Calculate tip on a $120 dinner at 20%. Toast averaged 19.1% at full-service restaurants in Q2 2026 — see split-check totals.",
    defaults: {
      billAmount: "120.00",
      tipPercentage: "20",
      numberOfPeople: "2",
    },
    intro:
      "Full-service restaurant tips averaged 19.1% on Toast card transactions in Q2 2026 — close to the 18–20% etiquette range. Federal law still allows a $2.13 per hour direct cash wage when tips bring workers to the $7.25 minimum, so gratuities remain core server income. On a $120 pre-tax dinner, 20% is $24 (total $144, or $72 per person for two).",
    tips: [
      "On $120 pre-tax: 15% is $18.00, 18% is $21.60, 20% is $24.00, and 25% is $30.00 — a $12 spread between adequate and generous.",
      "Tip on the pre-tax subtotal. With 8% sales tax ($9.60), tipping 20% on $129.60 after tax adds $1.92 versus tipping on $120.",
      "Mandatory service charges on large parties are not voluntary tips for IRS qualified-tip rules unless the customer can change the charge — check the receipt before adding extra.",
      "Bankrate's 2025 survey found 70% of sit-down diners always tip servers, while 35% typically leave at least 20%.",
      "Split checks by each diner's food plus proportional tax, then apply the tip percentage to each share.",
    ],
    keyResults: [
      { label: "Tip at 15%", value: "$18.00" },
      { label: "Tip at 18%", value: "$21.60" },
      { label: "Tip at 20%", value: "$24.00" },
      { label: "Tip at 25%", value: "$30.00" },
      { label: "Per-person total at 20%", value: "$72.00 ($144 ÷ 2)" },
      { label: "Pre-tax vs post-tax tip difference", value: "$1.92 extra at 20% on after-tax total" },
    ],
    comparisonNote:
      "Full-service dining targets 18–20% because of the tipped minimum wage structure and longer service time. Toast's Q2 2026 average of 19.1% at full-service restaurants sits between those marks. Delivery and counter service norms run lower in percentage terms on small tickets but still matter for worker pay.",
    faq: [
      {
        q: "Should I tip on the pre-tax or post-tax bill amount?",
        a: "Etiquette guides recommend the pre-tax subtotal. On $120 plus $9.60 tax, 20% on $129.60 costs $1.92 more than 20% on $120. The gap grows with higher tax rates and frequent dining.",
      },
      {
        q: "What are auto-gratuity policies at restaurants?",
        a: "Many venues add 18–20% for parties of six or more. That charge may be a service fee rather than a voluntary tip under IRS rules if the customer cannot adjust it. Read the receipt before stacking another full percentage on top.",
      },
      {
        q: "How should I handle tipping on comped or discounted items?",
        a: "Tip on the menu price of comped items when you can estimate it — the server still delivered the meal. If management removes an item for a kitchen error, calculate gratuity as if the item were still billed.",
      },
    ],
    sources: [DOL_TIPPED_MINIMUM, TOAST_TIPPING_Q2_2026, BANKRATE_TIPPING_2025],
    sourcesChecked: "October 2026",
  },
  {
    slug: "group-dinner",
    lastUpdated: "2026-10-21",
    title: "Group Dinner Tip Calculator (6 People)",
    description:
      "Split a $350 pre-tax bill plus 20% tip among six guests. See $70 per person and auto-gratuity pitfalls.",
    defaults: {
      billAmount: "350.00",
      tipPercentage: "20",
      numberOfPeople: "6",
    },
    intro:
      "Six-person tables require more coordination — timing courses, refills, and split checks — but the percentage norm stays near 18–20%. A $350 pre-tax bill with 20% gratuity adds $70 for a $420 total, or $70 per person when split evenly. Many restaurants auto-gratuate parties of six or more at 18% ($63 on $350); verify before tipping twice.",
    tips: [
      "A $350 bill with 20% tip ($70) totals $420 — $70.00 per person when divided six ways.",
      "Auto-gratuity at 18% on $350 equals $63; adding 2% cash ($7) or 5% ($17.50) on top rewards standout service without double-paying a full second tip.",
      "Designate one payer to collect the all-in per-person amount ($70 here) so the server receives the full intended gratuity.",
      "Corporate hosts should budget about $75–$85 per person including tax and 20% tip on mid-range menus.",
      "Itemized splits prevent one guest from subsidizing another guest's steak or wine when prices vary widely.",
    ],
    keyResults: [
      { label: "Total with 20% tip", value: "$420.00 ($350 + $70)" },
      { label: "Per-person share", value: "$70.00 ($420 ÷ 6)" },
      { label: "Auto-gratuity at 18%", value: "$63.00 on $350" },
      { label: "Per person with 8% tax + 20% tip", value: "$74.67 ($448 total ÷ 6)" },
      { label: "Pre-tip per-person cost", value: "$58.33 ($350 ÷ 6)" },
      { label: "Extra on auto-gratuity (2–5%)", value: "$7.00–$17.50" },
    ],
    comparisonNote:
      "A six-top generates a larger absolute tip ($70 vs $24 on a $120 dinner) but similar percentage norms. Auto-gratuity policies exist partly because large parties occupy tables longer — always reconcile the printed service charge before adding voluntary tip.",
    faq: [
      {
        q: "What is the fairest way to split a group dinner check?",
        a: "Split equally when orders are similar; otherwise assign each guest their food and drink subtotal, allocate tax proportionally, then apply the tip rate to each subtotal. That avoids subsidizing expensive orders.",
      },
      {
        q: "When does auto-gratuity apply to large parties?",
        a: "Policies vary, but 18% for six or more is common. On $350, that is $63 mandated before any voluntary add-on. Only increase if service exceeded expectations and the receipt shows service charge rather than a duplicate tip line.",
      },
      {
        q: "How do payment apps affect group tip collection?",
        a: "Apps simplify splitting but invite rounding errors. Set a fixed all-in amount per person ($70 in this scenario) rather than letting each guest tip independently on food only.",
      },
    ],
    sources: [TOAST_TIPPING_Q2_2026, DOL_TIPPED_MINIMUM],
    sourcesChecked: "October 2026",
  },
  {
    slug: "coffee-shop",
    lastUpdated: "2026-10-21",
    title: "Coffee Shop Tip Calculator",
    description:
      "Tip on a $7.50 cafe order. Bankrate found 18% of coffee shop users always tip in 2025 — flat $1–$2 is typical.",
    defaults: {
      billAmount: "7.50",
      tipPercentage: "15",
      numberOfPeople: "1",
    },
    intro:
      "Counter-service coffee tipping is optional and lower-stakes than sit-down dining. Bankrate's 2025 survey found only 18% of coffee shop customers always tip baristas, down from 20% in 2024. On a $7.50 order, 15% is $1.13 (total $8.63); many customers leave a flat $1–$2 instead of calculating percentages on small tickets.",
    tips: [
      "On $7.50: 15% is $1.13, 20% is $1.50, and a flat $1 is 13.3% — all reasonable for counter service.",
      "Digital tip prompts are set by payment processors; choosing custom, low, or no tip on a simple drip coffee is widely accepted.",
      "Complex custom drinks warrant $1.50–$2 to acknowledge extra prep time.",
      "Five visits per week at $1.50 tip equals about $390 per year — budget if you visit daily.",
      "Catering orders $50+ deserve 15–20% because staff batch-prepares many drinks.",
    ],
    keyResults: [
      { label: "Tip at $1 flat", value: "$1.00 (13.3% of $7.50)" },
      { label: "Tip at $1.50", value: "$1.50 (20.0% of $7.50)" },
      { label: "Tip at $2 flat", value: "$2.00 (26.7% of $7.50)" },
      { label: "15% calculated tip", value: "$1.13 (total $8.63)" },
      { label: "Daily $1.50 tip (5 days/wk)", value: "$390/year" },
      { label: "Bankrate always-tip rate (2025)", value: "18% of coffee customers" },
    ],
    comparisonNote:
      "Counter workers generally earn at least the standard minimum wage in many states (California, Washington, and others require full minimum wage before tips), unlike the $2.13 federal tipped cash wage for waitstaff. Flat dollar tips fit small tickets better than forcing 20% percentages designed for $50+ restaurant checks.",
    faq: [
      {
        q: "Why do digital tip screens create pressure at coffee shops?",
        a: "Screens face the customer during checkout, often with 15–25% presets. Processors design defaults to maximize tips. Custom amounts or skipping tip on routine orders remain acceptable for counter service.",
      },
      {
        q: "Is a flat tip or percentage better for small coffee orders?",
        a: "Flat $1–$2 avoids awkward cents on sub-$10 orders. Percentages matter more above $15 or on catering-sized orders.",
      },
      {
        q: "Should I tip at a drive-through coffee window?",
        a: "Optional. A $1 gesture is generous when a tip jar is present; there is no broad expectation compared with inside counter service.",
      },
    ],
    sources: [BANKRATE_TIPPING_2025, DOL_TIPPED_MINIMUM],
    sourcesChecked: "October 2026",
  },
  {
    slug: "food-delivery",
    lastUpdated: "2026-10-21",
    title: "Food Delivery Tip Calculator",
    description:
      "Tip on a $45 delivery order at 20% ($9). See $5 minimum guidance and bad-weather adjustments.",
    defaults: {
      billAmount: "45.00",
      tipPercentage: "20",
      numberOfPeople: "1",
    },
    intro:
      "Delivery drivers cover fuel, vehicle wear, and unpaid waiting time. Bankrate found 52% of food delivery users always tip in 2025. On a $45 order, 20% is $9.00. Many guides recommend at least $5 even on small orders because base pay per delivery is often only a few dollars before tips.",
    tips: [
      "$45 at 20% equals $9.00 tip and $54.00 food-plus-tip total before delivery and service fees.",
      "Pre-tipping on apps affects acceptance speed — low displayed tips can mean longer waits.",
      "Rain, snow, or heat justify 25–30% ($11.25–$13.50 on $45) when conditions are harsh.",
      "Apartment or office handoffs that add 5–10 minutes merit an extra $2–$3 beyond your usual percentage.",
      "Long-distance orders (10+ miles) often deserve $12–$15 tips because the driver commits half an hour or more.",
    ],
    keyResults: [
      { label: "Tip at 20%", value: "$9.00" },
      { label: "Order total with 20% tip", value: "$54.00" },
      { label: "Minimum suggested tip", value: "$5.00" },
      { label: "Bad weather tip at 25%", value: "$11.25" },
      { label: "Bad weather tip at 30%", value: "$13.50" },
      { label: "Bankrate always-tip rate (2025)", value: "52% of delivery users" },
    ],
    comparisonNote:
      "Delivery tips compensate vehicle costs that restaurant servers do not bear. Percentages mirror dining (15–20%), but the $5 floor matters on $15–$25 orders where 15% might not cover the driver's time and fuel.",
    faq: [
      {
        q: "Should I tip before or after delivery on app-based orders?",
        a: "Most platforms show tips to drivers before acceptance. You can often adjust after delivery on some apps, but the initial amount strongly affects pickup priority.",
      },
      {
        q: "How much extra should I tip in bad weather?",
        a: "Add roughly 5–10 percentage points or a flat $2–$4. On $45, moving from 20% ($9) to 25% ($11.25) acknowledges hazard and slower routes.",
      },
      {
        q: "Do I need to tip on pickup orders placed through delivery apps?",
        a: "Pickup does not require tip — no one drives to you. Curbside handoffs may warrant $2–$3 as a courtesy but it is not standard.",
      },
    ],
    sources: [BANKRATE_TIPPING_2025],
    sourcesChecked: "October 2026",
  },
  {
    slug: "salon-haircut",
    lastUpdated: "2026-10-21",
    title: "Hair Salon Tip Calculator",
    description:
      "Calculate 20% on a $65 haircut ($13 tip, $78 total). Bankrate: 54% always tip stylists in 2025.",
    defaults: {
      billAmount: "65.00",
      tipPercentage: "20",
      numberOfPeople: "1",
    },
    intro:
      "Salon gratuity customarily runs 15–20% of the service total. Bankrate's 2025 survey found 54% of salon clients always tip stylists or barbers. On a $65 service, 20% is $13 for a $78 total. Assistants who shampoo hair often receive $3–$5 cash in addition to the stylist's percentage.",
    tips: [
      "$65 at 20% is $13.00 tip and $78.00 total; 25% on long color appointments is $16.25.",
      "Multi-service visits ($65 cut plus $40 color = $105) deserve 20% on the combined $105 ($21.00), not separate lower percentages.",
      "Hand shampoo assistants $3–$5 in cash at the bowl — card tips may not reach them.",
      "Holiday tipping equal to one full service ($65 here) in December is a common loyalty gesture.",
      "Salon owners who still perform services increasingly receive the same 15–20% as employees.",
    ],
    keyResults: [
      { label: "Tip at 20%", value: "$13.00" },
      { label: "Total cost with tip", value: "$78.00" },
      { label: "Tip at 25%", value: "$16.25" },
      { label: "Multi-service tip on $105", value: "$21.00 at 20%" },
      { label: "Assistant wash tip", value: "$3.00–$5.00 cash" },
      { label: "Holiday tip guideline", value: "$65.00 (one service)" },
    ],
    comparisonNote:
      "Salon tips match restaurant percentages but compensate for 30–60 minutes of focused labor on one client. Multi-hour color services produce higher absolute tips even at the same percentage rate.",
    faq: [
      {
        q: "Should I tip a salon owner who also cuts my hair?",
        a: "Modern etiquette treats owners like employees when they perform the service — 15–20% remains appropriate.",
      },
      {
        q: "Do I need separate tips for the wash assistant and stylist?",
        a: "Yes — $3–$5 cash to the assistant plus 20% on the full service for the stylist is standard when both serve you.",
      },
      {
        q: "What is the proper holiday tipping etiquette for a regular stylist?",
        a: "One full service price ($65 here) in cash or a gift card in December, in addition to regular visit tips.",
      },
    ],
    sources: [BANKRATE_TIPPING_2025, IRS_QUALIFIED_TIPS],
    sourcesChecked: "October 2026",
    sourcesNote:
      "Eligible stylists in listed occupations may deduct up to $25,000 of qualified tips on 2025–2028 federal returns subject to MAGI limits.",
  },
];
