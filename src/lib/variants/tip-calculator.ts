import type { CalculatorVariant } from "./types";

export const tipCalculatorVariants: CalculatorVariant[] = [
  {
    slug: "restaurant-dinner",
    title: "Restaurant Dinner Tip Calculator",
    description: "Calculate the right tip for a restaurant dinner. Pre-set for a typical $120 dinner with 20% gratuity split between 2 diners.",
    defaults: {
      billAmount: "120.00",
      tipPercentage: "20",
      numberOfPeople: "2",
    },
    intro: "Restaurant dining is the most common tipping scenario in the United States, where servers depend on gratuities for the majority of their income. The federal tipped minimum wage is just $2.13/hour, making tips essential rather than optional. For a sit-down dinner averaging $120, a 20% tip of $24 brings the total to $144 — or $72 per person when split between two diners. This standard applies whether you are at a casual chain restaurant or an upscale steakhouse.",
    tips: [
      "On a $120 restaurant bill, a 15% tip is $18.00, 18% is $21.60, 20% is $24.00, and 25% is $30.00. The difference between acceptable and generous is only $12 — roughly the price of a single appetizer.",
      "Always tip on the pre-tax subtotal. On a $120 bill with 8% sales tax ($9.60), tipping on the after-tax total of $129.60 at 20% costs you an extra $1.92 compared to tipping on $120.",
      "For large parties of 6 or more, many restaurants automatically add an 18% gratuity. Check your bill before adding an additional tip to avoid double-tipping.",
      "If you received exceptional service — a server who accommodated dietary restrictions, handled a complicated order, or provided a memorable experience — a 25% tip ($30 on $120) is a meaningful way to acknowledge it.",
      "When splitting a check unevenly (some ordered more expensive items), calculate each person's share based on what they ordered rather than dividing equally. A tip calculator makes this straightforward.",
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
      "Restaurant sit-down dining at 18-20% is the highest standard tipping category because servers earn a tipped minimum wage of $2.13/hour and rely on gratuities for most of their income. Food delivery typically warrants 15-20% with a $5 minimum, while salon services follow the same 20% norm but for a single provider rather than a full service team. Restaurant tipping expectations remain the benchmark against which all other service tipping is measured.",
    faq: [
      {
        q: "Should I tip on the pre-tax or post-tax bill amount?",
        a: "Etiquette experts and most servers agree that tips should be calculated on the pre-tax subtotal. On a $120 bill with 8% sales tax ($9.60), tipping 20% on the after-tax total of $129.60 costs an extra $1.92 compared to tipping on $120. While the difference is modest on a single meal, consistently tipping on the post-tax amount adds up over dozens of restaurant visits each year.",
      },
      {
        q: "What are auto-gratuity policies at restaurants?",
        a: "Many restaurants automatically add 18-20% gratuity for parties of 6 or more, and some apply it for large bills regardless of party size. This charge appears as a line item on your receipt and is legally distinct from a voluntary tip. Always review your bill before adding an additional tip to avoid double-tipping, though adding 2-5% extra in cash for exceptional service on a large party is a common and appreciated gesture.",
      },
      {
        q: "How should I handle tipping on comped or discounted items?",
        a: "Tip on the full pre-discount price of comped items, not the reduced amount shown on your bill. If a manager comped a $25 appetizer due to a kitchen error, calculate your tip as if that item were still on the bill at its original price. The server provided the same service regardless of the comp, and tipping on the discounted total effectively penalizes them for a problem they did not cause.",
      },
    ],
  },
  {
    slug: "group-dinner",
    title: "Group Dinner Tip Calculator (6 People)",
    description: "Calculate tip and per-person cost for a group dinner of 6. Pre-set for a $350 bill with 20% gratuity split equally among all guests.",
    defaults: {
      billAmount: "350.00",
      tipPercentage: "20",
      numberOfPeople: "6",
    },
    intro: "Group dinners with friends, family, or colleagues present unique tipping and splitting challenges. A $350 bill for 6 people averages $58.33 per person before tip. Adding a 20% gratuity of $70 brings the total to $420, or $70 per person all-in. Many restaurants automatically apply 18% gratuity for parties of 6 or more, so always verify your receipt before adding extra. Group dining is also where bill-splitting apps and tip calculators prove most valuable, eliminating awkward mental math at the table.",
    tips: [
      "A $350 group dinner with 20% tip ($70) totals $420. Split 6 ways, each person pays $70.00 — a clean number that includes a fair gratuity for your server managing a large table.",
      "Groups of 6+ typically require more server attention: coordinating timing, handling multiple dietary requests, and managing separate drink orders. A 20% tip acknowledges this extra workload compared to a 2-person table.",
      "If your restaurant applies an automatic 18% gratuity ($63 on $350), you can add an additional 2-5% in cash for outstanding service without overpaying. Check the receipt line items carefully.",
      "Venmo and payment apps have made splitting group bills easier, but always designate one person to handle the tip calculation to ensure the server receives the full intended amount rather than leaving it to chance.",
      "For corporate team dinners, the host typically covers the full bill and tip. Budget $75-$85 per person (including 20% gratuity and tax) when planning group dining events at mid-range restaurants.",
    ],
    keyResults: [
      { label: "Total with 20% tip", value: "$420.00 ($350 + $70)" },
      { label: "Per-person share", value: "$70.00 ($420 ÷ 6)" },
      { label: "Auto-gratuity threshold", value: "18% ($63) for parties of 6+" },
      { label: "Minimum suggested per person with tax", value: "$74.67 ($448 total ÷ 6)" },
      { label: "Pre-tip per-person cost", value: "$58.33 ($350 ÷ 6)" },
      { label: "Additional tip on auto-gratuity", value: "$7-$17.50 for 2-5% extra" },
    ],
    comparisonNote:
      "A server managing a 6-person table handles roughly three times the order complexity of a couple — coordinating timing, refills, dietary requests, and separate checks — yet receives the same percentage tip. Group dinners at $70 per person represent a higher total gratuity in absolute dollars ($70 vs $24 for a couple's dinner), which partially compensates for the extra workload. The per-server effort ratio makes 20% the fair minimum for large parties even when auto-gratuity is already applied.",
    faq: [
      {
        q: "What is the fairest way to split a group dinner check?",
        a: "Equal division works when everyone ordered similarly priced items, but itemized splitting is fairer when some guests ordered appetizers, premium entrees, or multiple drinks while others did not. Calculate each person's food and drink subtotal, add their proportional share of tax, then apply the tip percentage to their individual amount. This avoids subsidizing expensive orders and prevents resentment among group members.",
      },
      {
        q: "When does auto-gratuity apply to large parties?",
        a: "Most restaurants automatically add 18% gratuity for parties of 6 or more, though some set the threshold at 8 guests. On a $350 bill, auto-gratuity at 18% equals $63 and is mandatory regardless of service quality — it cannot be removed without manager approval. Check your receipt for an auto-gratuity line before adding a voluntary tip, as the combined total may exceed your intended amount.",
      },
      {
        q: "How do Venmo and payment apps affect group tip collection?",
        a: "Payment apps simplify collecting each person's share but create a risk that the designated payer forgets to include the full tip when requesting reimbursements. Designate one person to calculate the total including tip and tax, then request a fixed amount from each guest — $70.00 in this scenario — rather than having everyone tip individually. This ensures the server receives the intended gratuity rather than a partial amount left after some guests miscalculate.",
      },
    ],
  },
  {
    slug: "coffee-shop",
    title: "Coffee Shop Tip Calculator",
    description: "Calculate the right tip at a coffee shop or cafe. Pre-set for a $7.50 order with suggested tipping amounts for counter service.",
    defaults: {
      billAmount: "7.50",
      tipPercentage: "15",
      numberOfPeople: "1",
    },
    intro: "Coffee shop tipping has become one of the most debated etiquette questions since digital payment terminals started presenting tip prompts for counter service. Unlike sit-down restaurants where tipping is essential, coffee shop tips are appreciated but not universally expected. A $7.50 latte order with a 15% tip adds $1.13, bringing the total to $8.63. Many customers opt for a flat $1-$2 tip or simply round up to the nearest dollar, especially for straightforward drip coffee or grab-and-go orders.",
    tips: [
      "For a $7.50 coffee order, common tipping approaches include: 15% ($1.13), 20% ($1.50), rounding up to $8 ($0.50), or a flat $1 tip. Any of these is appropriate for counter service.",
      "Digital payment terminals often present 15%, 20%, and 25% options even for counter service. There is no social obligation to select the highest option — $1 on a $5-$8 coffee purchase is a perfectly reasonable tip.",
      "If a barista makes a complex custom drink (multiple modifications, specific temperature, alternative milk preparation), a 20% tip acknowledges the extra craft involved compared to a standard pour.",
      "Regular customers who tip $1 per visit at their daily coffee shop spend roughly $250-$365/year on tips. At 5 visits per week, that is $260/year — worth budgeting for if you visit frequently.",
      "For large catering orders ($50+) from a coffee shop, a 15-20% tip is appropriate since the staff prepares multiple drinks simultaneously and may arrange delivery or setup.",
    ],
    keyResults: [
      { label: "Tip at $1 flat", value: "$1.00 (13.3% of $7.50)" },
      { label: "Tip at $1.50", value: "$1.50 (20.0% of $7.50)" },
      { label: "Tip at $2 flat", value: "$2.00 (26.7% of $7.50)" },
      { label: "Annual cost if daily at $1.50", value: "$547.50/year (365 visits)" },
      { label: "15% calculated tip", value: "$1.13 (total $8.63)" },
      { label: "Counter service vs sit-down norm", value: "$1-$2 flat vs 18-20% percentage" },
    ],
    comparisonNote:
      "Counter service coffee shops operate on a different tipping model than full-service restaurants — baristas earn at or above minimum wage rather than the $2.13 tipped minimum, and the interaction lasts under two minutes instead of an hour-long dining experience. A flat $1-$2 tip on a $7.50 order is widely accepted, whereas the same dollar amount on a $120 restaurant bill would be considered inadequate. The percentage-based norm of 18-20% applies to sit-down dining, not grab-and-go counter service.",
    faq: [
      {
        q: "Why do digital tip screens create pressure at coffee shops?",
        a: "Payment terminals often display tipping options of 15%, 20%, and 25% on a screen facing the customer while the barista watches, creating social pressure to select a higher amount. These defaults are set by the payment processor, not the coffee shop, and are designed to maximize tip revenue. Selecting a custom tip, choosing the lowest option, or tapping no tip are all acceptable for standard counter service orders.",
      },
      {
        q: "Is a flat tip or percentage better for small coffee orders?",
        a: "Flat tips of $1-$2 are more practical for orders under $10 because percentage-based tips produce awkward amounts — 20% of $7.50 is $1.50, which most customers round anyway. A flat $1 tip on a $5 drip coffee is reasonable, while 20% ($1.00) on the same order is also fine. For orders above $15 or complex custom drinks, switching to a percentage calculation becomes more appropriate.",
      },
      {
        q: "Should I tip at a drive-through coffee window?",
        a: "Drive-through tipping is optional and less common than counter service inside the shop. If a tip jar is present, $1 is a generous gesture for a standard order, but there is no widespread expectation to tip at drive-through windows. The interaction is even briefer than counter service, and employees typically rotate through drive-through duty rather than relying on tips as primary income.",
      },
    ],
  },
  {
    slug: "food-delivery",
    title: "Food Delivery Tip Calculator",
    description: "Calculate the appropriate tip for food delivery drivers. Pre-set for a $45 delivery order with recommended gratuity for driver compensation.",
    defaults: {
      billAmount: "45.00",
      tipPercentage: "20",
      numberOfPeople: "1",
    },
    intro: "Food delivery tipping has shifted significantly with the rise of app-based services like DoorDash, Uber Eats, and Grubhub. Delivery drivers use personal vehicles, pay for their own gas and insurance, and often earn minimal base pay per delivery. For a $45 food delivery order, a 20% tip of $9.00 is the current standard — many drivers see the tip amount before accepting the order, so lower tips may result in longer wait times or declined deliveries. In bad weather, heavy traffic, or for large orders, tipping 25% or more acknowledges the additional difficulty.",
    tips: [
      "A $45 delivery order with 20% tip ($9.00) totals $54.00. Many delivery experts recommend a $5 minimum tip regardless of order size, since a $3 tip on a $15 order may not justify the driver's time and fuel costs.",
      "Delivery drivers see tip amounts before accepting orders on most platforms. A $9 tip on a $45 order makes your delivery more attractive and likely results in faster pickup and more careful handling of your food.",
      "In bad weather (rain, snow, extreme heat), consider tipping 25-30%. On a $45 order, that is $11.25-$13.50 — a few extra dollars that significantly acknowledge the driver's effort in difficult conditions.",
      "For apartment or office deliveries requiring the driver to navigate parking, elevators, or security checkpoints, an extra $2-$3 beyond your standard tip compensates for the additional 5-10 minutes of unpaid time.",
      "Ordering from a restaurant 10+ miles away typically means the driver spends 30-45 minutes on your delivery alone. A $12-$15 tip (27-33% on $45) better reflects the distance commitment than a flat percentage.",
    ],
    keyResults: [
      { label: "Tip at 20%", value: "$9.00" },
      { label: "Total with tip and typical fees", value: "$62.00 ($45 + $5 delivery + $3 service + $9 tip)" },
      { label: "Driver visibility of tip", value: "Shown before accepting on most apps" },
      { label: "Minimum recommended tip", value: "$5.00 regardless of order size" },
      { label: "Bad weather tip at 25%", value: "$11.25 on $45 order" },
      { label: "Long-distance tip (10+ miles)", value: "$12.00-$15.00 (27-33%)" },
    ],
    comparisonNote:
      "Delivery drivers bear costs that restaurant servers do not — personal vehicle wear, gas, insurance, and unpaid time between orders — making the effective hourly rate heavily dependent on tips. A 20% tip on a $45 delivery order ($9) is comparable to restaurant tipping in percentage terms, but the absolute amount matters more because drivers may earn only $2-$4 in base pay per delivery. A $5 minimum tip ensures the delivery is worth the driver's time and fuel regardless of order size.",
    faq: [
      {
        q: "Should I tip before or after delivery on app-based orders?",
        a: "Most delivery platforms show your tip to drivers before they accept the order, so pre-tipping affects how quickly your food is picked up and handled. A low pre-tip may result in longer wait times or fewer available drivers willing to accept the delivery. You can often adjust the tip after delivery on some platforms if service was exceptionally good or poor, but the initial tip amount strongly influences driver behavior.",
      },
      {
        q: "How much extra should I tip in bad weather?",
        a: "Rain, snow, and extreme heat significantly increase delivery difficulty and risk, warranting a 25-30% tip rather than the standard 20%. On a $45 order, that means $11.25-$13.50 instead of $9.00 — an extra $2.25-$4.50 that meaningfully acknowledges the driver's effort in hazardous conditions. Drivers who accept orders during storms often face reduced order volume and higher expenses, making generous tipping especially important.",
      },
      {
        q: "Do I need to tip on pickup orders placed through delivery apps?",
        a: "Pickup orders do not require a tip because no delivery service is provided — you are retrieving the food yourself. Some apps still present a tip screen at checkout for pickup orders, but skipping the tip is standard practice. If a restaurant employee brings the order to your car in a curbside pickup arrangement, a $2-$3 tip is a courteous gesture but not expected.",
      },
    ],
  },
  {
    slug: "salon-haircut",
    title: "Hair Salon Tip Calculator",
    description: "Calculate the right tip for your hairstylist or barber. Pre-set for a $65 salon service with standard 20% gratuity.",
    defaults: {
      billAmount: "65.00",
      tipPercentage: "20",
      numberOfPeople: "1",
    },
    intro: "Tipping your hairstylist or barber is customary in the United States, with 20% being the widely accepted standard for salon services. On a $65 haircut and styling service, a 20% tip of $13 brings the total to $78. The tipping expectation applies whether you visit a budget-friendly chain or an upscale salon, though the baseline percentage may differ. If multiple people work on your hair — one for washing, another for cutting, and a third for styling — each person traditionally receives a separate tip proportional to their role in the service.",
    tips: [
      "A standard $65 salon service with 20% tip ($13.00) totals $78.00. For color treatments, highlights, or complex styling that takes 2-3 hours, many clients tip 25% ($16.25 on $65) to reflect the stylist's extended time and skill.",
      "If your salon charges $65 for a cut and $40 for color (total $105), tip 20% on the full $105 ($21.00) rather than calculating separate percentages for each service. The total amount reflects the stylist's full effort.",
      "When a salon assistant washes and conditions your hair separately from the stylist who cuts it, a $3-$5 cash tip directly to the assistant is customary in addition to the main stylist's 20% tip.",
      "Holiday tipping for your regular stylist typically equals one full service price. If your regular haircut is $65, a $65 holiday tip (or gift card) in December is a generous industry-standard practice.",
      "Salon owners who also cut hair have historically been excluded from the tipping convention, but this norm has shifted. Most etiquette guides now recommend tipping salon owners the same 15-20% as any other stylist.",
    ],
    keyResults: [
      { label: "Tip at 20%", value: "$13.00" },
      { label: "Total cost with tip", value: "$78.00" },
      { label: "Holiday tip guideline", value: "$65.00 (one full service price)" },
      { label: "Multi-service tip (cut + color)", value: "$21.00 on $105 total at 20%" },
      { label: "Assistant wash tip", value: "$3.00-$5.00 cash in addition to stylist tip" },
      { label: "Premium service tip at 25%", value: "$16.25 on $65 service" },
    ],
    comparisonNote:
      "Salon tipping at 20% matches restaurant norms in percentage, but the service model differs significantly — a stylist spends 30-60 minutes focused entirely on one client versus a server managing multiple tables simultaneously. The tip compensates for skilled labor and personal attention rather than volume of service. Multi-service appointments (cut, color, styling) can run 2-3 hours, making the absolute tip amount higher even at the same percentage rate.",
    faq: [
      {
        q: "Should I tip a salon owner who also cuts my hair?",
        a: "Historically, salon owners were exempt from tipping because they set prices and keep the full service fee. Modern etiquette has shifted, and most guides now recommend tipping owners the same 15-20% as employed stylists. If the owner provides the service personally and you would tip an employee stylist for the same work, extending the same gratuity to the owner is appropriate and appreciated.",
      },
      {
        q: "Do I need separate tips for the wash assistant and stylist?",
        a: "When a salon assistant washes and conditions your hair separately from the stylist who cuts it, a $3-$5 cash tip directly to the assistant is customary in addition to the 20% tip on the full service for your stylist. Hand the assistant tip in cash at the shampoo bowl rather than adding it to the credit card transaction, as assistants may not receive a share of card-based tips processed through the salon's payment system.",
      },
      {
        q: "What is the proper holiday tipping etiquette for a regular stylist?",
        a: "Holiday tipping for a stylist you visit regularly equals the cost of one full service — $65 in this scenario — typically given in December as cash or a gift card. This annual bonus acknowledges the ongoing relationship and is separate from your regular 20% tip at each appointment. If you visit multiple times per year, the holiday tip is in addition to your per-visit gratuity, not a replacement for it.",
      },
    ],
  },
];
