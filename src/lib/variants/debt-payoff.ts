export interface CalculatorVariant {
  slug: string;
  title: string;
  description: string;
  defaults: Record<string, string>;
  intro: string;
  tips: string[];
}

export const debtPayoffVariants: CalculatorVariant[] = [
  {
    slug: "5000-credit-card",
    title: "Pay Off $5,000 Credit Card Debt",
    description:
      "Calculate how long it takes to pay off $5,000 in credit card debt and how much extra payments save you in interest at typical APRs.",
    defaults: { balance: "5000", interestRate: "21.9", monthlyPayment: "200" },
    intro:
      "A $5,000 credit card balance is among the most common debt levels in the United States, often resulting from a single emergency expense or a few months of overspending. At a typical rewards-card APR of 21.9%, minimum payments of 2% would trap you in a repayment cycle lasting over a decade. The good news is that at this balance level, relatively modest extra payments can dramatically accelerate your payoff timeline.",
    tips: [
      "At $200 per month and 21.9% APR, you will pay off $5,000 in approximately 33 months with $1,563 in total interest -- meaning you pay nearly $6,563 total for the original $5,000.",
      "Increasing your payment to $300 per month cuts the timeline to 20 months and reduces total interest to $924, saving you $639 compared to paying just $200.",
      "A 0% balance transfer card (typically $150-$250 transfer fee) would let you pay $5,000 in 15 months at $334/month with zero interest -- saving over $1,400 versus staying at 21.9%.",
      "At this balance level, selling unused items worth $500-$1,000 and making a lump-sum payment can shave 3-5 months off your timeline instantly.",
      "If you carry this balance while holding a savings account earning 4-5% APY, you are losing 17% net annually -- mathematically, paying the debt first almost always wins except for emergency reserves.",
    ],
  },
  {
    slug: "10000-credit-card",
    title: "Pay Off $10,000 Credit Card Debt",
    description:
      "Plan your strategy to eliminate $10,000 in credit card debt. See payoff timelines and interest costs at different monthly payment levels.",
    defaults: { balance: "10000", interestRate: "19.9", monthlyPayment: "300" },
    intro:
      "Carrying $10,000 in credit card debt puts you above the national average balance and into territory where interest charges can exceed $150 per month before you pay down any principal. This level of debt often results from a combination of lifestyle spending and unexpected costs accumulating over time. A structured repayment plan with consistent above-minimum payments is critical to avoid spending years in a debt cycle.",
    tips: [
      "At $300 per month and 19.9% APR, eliminating $10,000 takes approximately 46 months (nearly 4 years) with $3,719 in total interest -- you pay $13,719 for the original $10,000 balance.",
      "Boosting your payment to $500 per month cuts the payoff to 24 months and reduces total interest to $1,969 -- saving $1,750 and reclaiming almost 2 years of your life.",
      "A debt consolidation personal loan at 10-12% APR could save $1,200-$1,800 in interest versus keeping the balance on a 19.9% card, even with a 3-year term.",
      "Your monthly interest charge alone is $166 at 19.9% on $10,000 -- if you pay only $200/month, just $34 goes toward principal, extending payoff to over 9 years.",
      "Consider the snowball method: if you have multiple cards, paying off a smaller balance first frees up that payment to stack onto this $10,000 balance, creating momentum.",
    ],
  },
  {
    slug: "20000-credit-card",
    title: "Pay Off $20,000 Credit Card Debt",
    description:
      "Create a realistic plan to pay off $20,000 in credit card debt. Compare aggressive vs. minimum payment strategies and total interest costs.",
    defaults: { balance: "20000", interestRate: "18.9", monthlyPayment: "500" },
    intro:
      "A $20,000 credit card balance represents a serious financial challenge that requires a multi-year commitment to resolve. At this level, monthly interest alone exceeds $300, making it nearly impossible to make progress with minimum payments. Households reaching this threshold often benefit from combining aggressive payment strategies with structural changes like balance transfers, consolidation loans, or even negotiating directly with creditors for hardship rates.",
    tips: [
      "At $500 per month and 18.9% APR, paying off $20,000 takes approximately 62 months (over 5 years) with $10,816 in total interest -- you would pay more than $30,800 total.",
      "Increasing to $800 per month cuts the timeline to 32 months and total interest to $5,345 -- saving $5,471 and finishing 2.5 years sooner.",
      "Monthly interest alone is $315 at 18.9% on $20,000. A $500 payment means only $185 goes to principal in month one -- this is why progress feels painfully slow initially.",
      "A 0% balance transfer (if you qualify) with a 3% fee ($600) and $1,112/month payment would clear the debt in 18 months interest-free -- saving over $10,000 versus the standard plan.",
      "At this debt level, consider whether a home equity line of credit (4-8% rate) or 401(k) loan (prime + 1%) could save thousands in interest, but weigh the risks of securing unsecured debt with your home or retirement funds.",
    ],
  },
  {
    slug: "30000-student-loan",
    title: "Pay Off $30,000 Student Loan",
    description:
      "Calculate your student loan payoff timeline for a $30,000 balance. Compare standard repayment vs. accelerated payment strategies.",
    defaults: { balance: "30000", interestRate: "5.5", monthlyPayment: "350" },
    intro:
      "A $30,000 student loan balance is close to the median for bachelor's degree graduates and represents the standard 10-year repayment amount under federal loan terms. At 5.5% interest -- typical for federal Direct Loans originated in recent years -- the standard payment plan produces manageable monthly obligations but results in significant interest over the full term. Unlike credit card debt, student loans offer income-driven repayment options and potential forgiveness programs that can reshape your strategy.",
    tips: [
      "The standard 10-year repayment plan at 5.5% on $30,000 requires $326/month and costs $9,078 in total interest -- paying $350/month saves $742 in interest and finishes 7 months early.",
      "Increasing to $500 per month cuts the payoff to 6 years and reduces total interest to $5,261 -- saving $3,817 versus the 10-year plan.",
      "Federal student loan interest is tax-deductible up to $2,500 per year (income limits apply), effectively reducing your real interest rate by your marginal tax rate -- at the 22% bracket, 5.5% becomes approximately 4.3% after tax.",
      "If you are on an income-driven plan paying $200/month, you will pay $15,612 in interest over 15+ years versus $9,078 on the standard plan -- IDR costs more unless you qualify for forgiveness.",
      "Refinancing to a 4% private loan (if you have strong credit) saves approximately $2,400 in interest on a 10-year term, but you lose access to federal protections like income-driven repayment and PSLF eligibility.",
    ],
  },
  {
    slug: "50000-student-loan",
    title: "Pay Off $50,000 Student Loan",
    description:
      "Build a payoff plan for $50,000 in student loans. See how payment increases and refinancing affect your total cost and freedom date.",
    defaults: { balance: "50000", interestRate: "6.0", monthlyPayment: "550" },
    intro:
      "A $50,000 student loan balance is common among graduates with advanced degrees or those who attended private universities. At this level, the standard 10-year repayment plan requires over $555 per month, which can strain budgets for early-career professionals. Strategic decisions about repayment plan selection, refinancing timing, and whether to pursue Public Service Loan Forgiveness (PSLF) can mean differences of $10,000 or more in total cost.",
    tips: [
      "The standard 10-year plan at 6.0% on $50,000 requires $555/month with $16,613 in total interest. Paying $550/month (just below standard) extends payoff to 125 months with $18,611 in interest.",
      "Increasing payments to $800/month cuts the timeline to 76 months (6.3 years) and reduces total interest to $10,636 -- saving nearly $8,000 versus the standard plan.",
      "If your employer offers student loan repayment assistance ($100-$200/month is common), that benefit is worth $12,000-$24,000 over 10 years when you include the interest savings from faster payoff.",
      "PSLF eligibility: if you work for a qualifying employer and make 120 payments on an income-driven plan, the remaining balance is forgiven tax-free -- at $50,000 this could save $15,000-$30,000 depending on income growth.",
      "Refinancing from 6.0% to 4.5% on a 10-year term drops the monthly payment to $518 and saves $4,440 in total interest, but only makes sense if you do not need federal repayment flexibility or forgiveness options.",
    ],
  },
];
