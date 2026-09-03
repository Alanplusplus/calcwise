export interface CalculatorVariant {
  slug: string;
  title: string;
  description: string;
  defaults: Record<string, string>;
  intro: string;
  tips: string[];
}

export const creditCardPayoffVariants: CalculatorVariant[] = [
  {
    slug: "2000-balance",
    title: "Pay Off $2,000 Credit Card Balance",
    description:
      "See how long it takes to pay off a $2,000 credit card balance at 22.9% APR. Compare minimum vs fixed payments and find the fastest, cheapest payoff strategy.",
    defaults: { balance: "2000", interestRate: "22.9", fixedPayment: "100" },
    intro:
      "A $2,000 credit card balance is one of the most common starting points for people tackling their first real debt. It often results from a single unexpected expense — a car repair, medical bill, or appliance replacement — that gets charged to plastic and then lingers. The good news: this balance is small enough to eliminate in under two years with disciplined payments, and the total interest cost is manageable enough that aggressive payoff is clearly the right move over balance transfers or debt consolidation.",
    tips: [
      "At 22.9% APR, paying $100/month clears the $2,000 balance in approximately 24 months with about $380 in total interest — bringing your all-in cost to $2,380.",
      "Minimum payments at 2% ($40/month initially, declining as balance drops) would take over 9 years to pay off and cost roughly $1,900 in interest — nearly doubling your original balance.",
      "Increasing your payment from $100 to $150/month cuts the payoff time from 24 months to 15 months and saves approximately $130 in interest, totaling $250 instead of $380.",
      "At this balance level, a 0% balance transfer card with a 3% fee costs $60 upfront. If you can pay $170/month and clear it in 12 months, you save $320 compared to the 22.9% card — but only if you commit to the payoff before the promotional rate expires.",
      "Consider automating a fixed $100+ payment and treating it as a non-negotiable bill. On a $3,000/month take-home pay, $100 is just 3.3% of income — an affordable amount that eliminates the debt within two years.",
    ],
  },
  {
    slug: "5000-balance",
    title: "Pay Off $5,000 Credit Card Balance",
    description:
      "Calculate your payoff timeline for $5,000 in credit card debt at 21.9% APR. See total interest cost, monthly payment options, and how to save thousands by paying more.",
    defaults: { balance: "5000", interestRate: "21.9", fixedPayment: "200" },
    intro:
      "Five thousand dollars in credit card debt represents a turning point where interest costs become genuinely expensive and minimum payments trap borrowers in a decade-long repayment cycle. This balance commonly accumulates across two or three cards over a period of overspending, or results from financing a major purchase like furniture or travel at a high APR. At this level, the difference between minimum and fixed payments can mean $3,000 to $5,000 in saved interest — making it critical to commit to a specific payoff strategy now.",
    tips: [
      "Paying $200/month on a $5,000 balance at 21.9% APR clears the debt in approximately 32 months with $1,390 in total interest, bringing the all-in cost to $6,390.",
      "Minimum payments (2% of balance, or $25 minimum) would take over 19 years to eliminate this balance and cost approximately $6,800 in interest — more than the original debt itself.",
      "Bumping your payment to $300/month cuts the timeline to 20 months and reduces total interest to $855, saving $535 compared to the $200/month plan.",
      "The avalanche method is most effective here: if your $5,000 is split across a 21.9% card ($3,000) and a 16.9% card ($2,000), pay minimums on the lower-rate card and direct all extra cash to the 21.9% card first.",
      "On a $50,000 salary (roughly $3,400/month take-home), dedicating $200/month to credit card payoff is 5.9% of income — well within the recommended range for aggressive debt elimination.",
    ],
  },
  {
    slug: "10000-balance",
    title: "Pay Off $10,000 Credit Card Balance",
    description:
      "Plan your strategy to eliminate $10,000 in credit card debt at 19.9% APR. Compare payoff timelines at different monthly payments and see how much interest you can save.",
    defaults: { balance: "10000", interestRate: "19.9", fixedPayment: "300" },
    intro:
      "Ten thousand dollars in credit card debt places you significantly above the national average revolving balance and signals that a deliberate, structured payoff plan is no longer optional. At this level, interest charges alone can exceed $150/month, meaning minimum payments barely touch the principal. This is the point where many financial advisors recommend consolidation options, but aggressive fixed payments often outperform them when you factor in transfer fees, origination charges, and the behavioral risk of running up cleared cards again.",
    tips: [
      "At 19.9% APR with $300/month payments, your $10,000 balance takes approximately 44 months (3.7 years) to clear, with $3,155 in total interest — a total cost of $13,155.",
      "Minimum payments at 2% would stretch payoff to over 27 years and cost roughly $14,600 in interest — you would pay $24,600 total for a $10,000 balance.",
      "Increasing your payment to $500/month cuts the timeline to 24 months and reduces total interest to $1,860, saving $1,295 compared to the $300 plan.",
      "A personal loan at 10% over 3 years has a $323/month payment with $1,616 in total interest — saving $1,539 compared to keeping the balance on the credit card at $300/month. However, closing costs and the temptation to re-charge the freed card are real risks.",
      "If you receive a $3,000 tax refund and apply it immediately, then continue $300/month payments on the remaining $7,000, your payoff timeline drops from 44 months to approximately 29 months and total interest falls to $1,980.",
    ],
  },
  {
    slug: "15000-balance",
    title: "Pay Off $15,000 Credit Card Balance",
    description:
      "Map out a payoff plan for $15,000 in credit card debt at 18.9% APR. See how fixed payments vs minimum payments affect your timeline, total interest, and total cost.",
    defaults: { balance: "15000", interestRate: "18.9", fixedPayment: "400" },
    intro:
      "Fifteen thousand dollars in credit card debt puts significant pressure on monthly cash flow and limits your ability to save, invest, or handle emergencies. This balance is common among households that relied on credit during a job loss, medical event, or extended period of income shortfall. At 18.9% APR, you are paying roughly $236/month in interest alone — meaning any payment below that amount causes the balance to grow. A clear, aggressive plan with automated payments is essential to break the cycle and begin rebuilding financial stability.",
    tips: [
      "Paying $400/month on $15,000 at 18.9% APR takes approximately 53 months (4.4 years) to eliminate, with $5,960 in total interest — total cost of $20,960.",
      "Minimum payments (2% floor of $25) would require over 30 years and cost approximately $21,000 in interest, bringing total repayment to $36,000 for a $15,000 balance.",
      "Increasing your payment to $600/month cuts the timeline to 31 months and reduces total interest to $3,420 — saving $2,540 compared to the $400 plan.",
      "At $15,000, a balance transfer to a 0% card (typically 3-5% fee, or $450-$750) combined with a $900/month payment can eliminate the debt in 18 months interest-free, but requires enough discipline and income to maintain that payment level without adding new charges.",
      "If you negotiate your APR down by calling the issuer — many will reduce by 2-5% for customers in good standing — dropping from 18.9% to 14.9% saves approximately $1,100 over the life of a $400/month payoff plan, with zero fees and no balance transfer risk.",
    ],
  },
  {
    slug: "minimum-payment",
    title: "Credit Card Minimum Payment Calculator",
    description:
      "See the true cost of making only minimum payments on your credit card. Discover how decades of interest add up and how much you save by paying a fixed amount each month.",
    defaults: { balance: "8000", interestRate: "20.9", fixedPayment: "160" },
    intro:
      "Minimum payments are designed to keep your account in good standing while maximizing the total interest the card issuer collects over time. Most cards calculate the minimum as 1-3% of the outstanding balance or a flat floor of $25, whichever is greater. Early in repayment, the vast majority of each minimum payment covers interest — with only a few dollars reducing principal. This structure creates a repayment timeline that can stretch decades, turning a manageable balance into a five-figure lifetime cost.",
    tips: [
      "On an $8,000 balance at 20.9% APR, the initial minimum payment (2%) is $160. Of that, roughly $139 goes to interest and only $21 reduces your principal — a 13% principal reduction rate.",
      "Paying only the minimum on this $8,000 balance takes approximately 30 years to clear and costs over $13,500 in total interest, meaning you pay $21,500 total for an $8,000 purchase.",
      "Switching to a fixed $250/month payment eliminates the same balance in 41 months with $2,190 in interest — saving $11,310 compared to minimum payments.",
      "Even adding just $40/month above the minimum ($200 total) cuts the payoff from 30 years to approximately 57 months and saves roughly $8,200 in interest. Each extra dollar accelerates principal reduction exponentially.",
      "The minimum payment percentage itself matters: a 2% minimum on $8,000 starts at $160 and declines. A 3% minimum starts at $240 but pays off in about 12 years instead of 30 — still expensive, but dramatically faster than the 2% floor most cards use.",
    ],
  },
];
