export interface CalculatorVariant {
  slug: string;
  title: string;
  description: string;
  defaults: Record<string, string>;
  intro: string;
  tips: string[];
}

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
  },
];
