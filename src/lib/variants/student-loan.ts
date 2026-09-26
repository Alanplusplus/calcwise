import type { CalculatorVariant } from "./types";

export const studentLoanVariants: CalculatorVariant[] = [
  {
    slug: "20000-loan",
    lastUpdated: "2026-09-01",
    title: "Student Loan Calculator for $20,000",
    description:
      "Calculate monthly payments on a $20,000 student loan. At 5.0% over 10 years, expect ~$212/mo. See total interest, payoff timeline, and accelerated payoff options.",
    defaults: { balance: "20000", interestRate: "5.0", termYears: "10" },
    intro:
      "A $20,000 student loan balance is common among graduates of in-state public universities who covered part of their costs through scholarships or work-study. This is a manageable level of debt relative to most starting salaries, and with the right repayment approach, you can eliminate it well before the standard 10-year timeline. Borrowers in this range often benefit most from small extra payments rather than complex strategies like refinancing or extended repayment.",
    tips: [
      "At 5.0% over 10 years, your standard monthly payment is $212, and you will pay $5,456 in total interest -- roughly 27% of the original principal.",
      "Adding just $100/month in extra payments ($312 total) cuts your payoff timeline from 10 years to approximately 6 years and saves $2,200 in interest.",
      "At this balance level, refinancing typically saves less than $1,500 total, so only pursue it if you can lock in a rate at least 1.5% lower and do not need federal loan protections.",
      "Consider the debt avalanche strategy if you have other loans: pay minimums on everything else and direct all extra cash to whichever loan has the highest interest rate.",
      "On a $45,000 starting salary, $212/month represents just 6.3% of take-home pay -- well within the recommended 10% threshold for student loan payments.",
    ],
    keyResults: [
      { label: "Standard Monthly Payment", value: "$212" },
      { label: "Total Interest (10 yr)", value: "$5,456" },
      { label: "Total Repayment", value: "$25,456" },
      { label: "Payoff Timeline (standard)", value: "10 years" },
      { label: "Payoff with $100/mo Extra", value: "~6 years" },
      { label: "Income for Comfortable Repayment", value: "$45,000/yr" },
    ],
    comparisonNote:
      "At $20,000, your standard payment of $212 is less than half the $434 owed on a $40,000 balance, and total interest stays under $5,500. This level of debt is manageable on most entry-level salaries without requiring income-driven repayment, making aggressive payoff or modest extra payments the most effective strategy rather than refinancing or extended terms.",
    faq: [
      {
        q: "Should I use income-driven repayment or the standard plan on a $20,000 loan?",
        a: "For most borrowers with a $20,000 balance and a starting salary above $40,000, the standard 10-year plan is the better choice because your $212 payment is already affordable and IDR extends the timeline to 20+ years with significantly more total interest. IDR only makes sense temporarily if you lose your job or take a low-paying fellowship, since you can switch back to standard repayment once income stabilizes without penalty.",
      },
      {
        q: "Is refinancing worth it for a $20,000 student loan balance?",
        a: "Refinancing a $20,000 balance typically saves less than $1,500 in total interest, which may not justify losing federal protections like deferment, forbearance, and income-driven repayment options. Pursue refinancing only if you can lock in a rate at least 1.5% below your current rate and have stable employment with an emergency fund covering 3-6 months of expenses. At this balance level, extra payments of $50-$100 per month often deliver better returns than the refinancing process.",
      },
      {
        q: "How quickly can I pay off $20,000 in student loans?",
        a: "Adding $100 per month to the standard $212 payment pays off the balance in approximately 6 years and saves $2,200 in interest. Increasing to $312 total per month (an extra $100) is achievable on a $45,000 salary where loan payments represent just 6.3% of take-home pay. Even $50 per month in extra payments shaves 18-24 months off the timeline and saves $800-$1,100 in interest.",
      },
    ],
  },
  {
    slug: "40000-loan",
    lastUpdated: "2026-09-01",
    title: "Student Loan Calculator for $40,000",
    description:
      "Run the numbers on a $40,000 student loan at 5.5% interest. See your monthly payment (~$434/mo for 10 years), total interest cost, and how extra payments accelerate payoff.",
    defaults: { balance: "40000", interestRate: "5.5", termYears: "10" },
    intro:
      "Forty thousand dollars is close to the national average student loan balance and represents a typical outcome for four-year degree holders at public or mid-tier private institutions. At this level, the standard 10-year repayment plan produces a meaningful monthly obligation that requires deliberate budgeting. The good news: targeted strategies like refinancing or accelerated payments can save thousands in interest and shave years off the payoff timeline.",
    tips: [
      "Your standard monthly payment at 5.5% over 10 years is $434, with total interest of $12,040 -- that means you repay $52,040 in total for a $40,000 loan.",
      "Refinancing from 5.5% to 4.0% on a 7-year term changes your payment to $547/month but saves $6,104 in total interest compared to the standard plan.",
      "Increasing your monthly payment to $600 (an extra $166/month) pays off the loan in 6 years and 9 months and saves $4,370 in interest.",
      "Income-driven repayment at a $50,000 salary reduces your payment to roughly $250/month, but extends the timeline to 20+ years and increases total interest to approximately $22,000 before forgiveness.",
      "If your employer offers student loan repayment assistance ($5,250/year tax-free), applying that benefit reduces your payoff timeline from 10 years to about 6.5 years, saving $3,280 in interest.",
    ],
    keyResults: [
      { label: "Standard Monthly Payment", value: "$434" },
      { label: "Total Interest (10 yr)", value: "$12,040" },
      { label: "Total Repayment", value: "$52,040" },
      { label: "Payoff Timeline (standard)", value: "10 years" },
      { label: "Payoff at $600/mo", value: "~6.8 years" },
      { label: "Income for Comfortable Repayment", value: "$65,000/yr" },
    ],
    comparisonNote:
      "A $40,000 balance doubles both the monthly payment and total interest compared to $20,000, making refinancing and employer assistance programs worth evaluating. Compared to the $60,000 tier, you pay $226 less per month and save $7,160 in total interest, placing this balance close to the national average where standard repayment remains viable for borrowers earning $55,000 or more.",
    faq: [
      {
        q: "When should I refinance a $40,000 student loan?",
        a: "Refinancing makes sense when you have a credit score above 700, stable W-2 employment, and can reduce your rate by at least 1.5 percentage points. Dropping from 5.5% to 4.0% on a 7-year term raises your payment to $547 but saves $6,104 in total interest compared to the standard 10-year plan. Avoid refinancing if you work in public service, may need IDR in the future, or lack an emergency fund.",
      },
      {
        q: "How does employer student loan assistance affect a $40,000 balance?",
        a: "The IRS allows employers to contribute up to $5,250 per year tax-free toward employee student loans through 2025. Applying a full $5,250 annual benefit to a $40,000 balance at 5.5% reduces your payoff timeline from 10 years to approximately 6.5 years and saves $3,280 in interest. Ask your HR department whether your employer offers this benefit, as adoption has grown significantly among mid-size and large companies.",
      },
      {
        q: "Is income-driven repayment a good option at the $40,000 balance level?",
        a: "On a $50,000 salary, IDR reduces your payment to roughly $250 per month but extends repayment to 20+ years and increases total interest to approximately $22,000 before any forgiveness. This trade-off only makes sense during a temporary income reduction or career transition. Once your income rises above $55,000, switching back to standard or accelerated repayment saves thousands compared to staying on IDR long term.",
      },
    ],
  },
  {
    slug: "60000-loan",
    lastUpdated: "2026-09-01",
    title: "Student Loan Calculator for $60,000",
    description:
      "Plan repayment for $60,000 in student loans at 5.8%. Monthly payment is ~$660/mo over 10 years. Compare standard, accelerated, and income-driven repayment scenarios.",
    defaults: { balance: "60000", interestRate: "5.8", termYears: "10" },
    intro:
      "Sixty thousand dollars in student debt typically results from attending a private university, pursuing a professional certificate program, or completing an undergraduate degree without significant scholarship support. This balance sits above the national average and requires careful financial planning. Monthly payments on the standard plan consume a significant portion of entry-level salaries, making it critical to explore all available repayment strategies before choosing your path.",
    tips: [
      "At 5.8% over 10 years, your monthly payment is $660 and total interest reaches $19,200 -- meaning you repay $79,200 for a $60,000 loan.",
      "On a $55,000 starting salary (roughly $3,600/month take-home), a $660 payment represents 18.3% of net income -- above the recommended 10% threshold and a sign you should consider IDR temporarily.",
      "Refinancing to 4.5% over 10 years drops your payment to $621 and saves $4,680 in interest, but you forfeit federal protections including income-driven repayment and potential PSLF eligibility.",
      "The avalanche method is especially powerful at this balance: if you have a $25,000 loan at 6.8% and a $35,000 loan at 5.0%, targeting the high-rate loan first saves $1,200 more than the snowball approach over the full payoff period.",
      "Making biweekly half-payments ($330 every two weeks instead of $660/month) adds one extra payment per year and shortens payoff by approximately 11 months, saving $2,100 in interest.",
    ],
    keyResults: [
      { label: "Standard Monthly Payment", value: "$660" },
      { label: "Total Interest (10 yr)", value: "$19,200" },
      { label: "Total Repayment", value: "$79,200" },
      { label: "Payoff Timeline (standard)", value: "10 years" },
      { label: "Share of $55K Take-Home Pay", value: "18.3%" },
      { label: "Income for Comfortable Repayment", value: "$85,000/yr" },
    ],
    comparisonNote:
      "At $60,000, your $660 standard payment consumes 18.3% of take-home pay on a $55,000 salary, well above the 10% comfort threshold and a clear signal to explore IDR or refinancing. Compared to the $100,000 tier, you avoid the $1,110 monthly obligation that often forces career decisions, while still benefiting from aggressive payoff strategies that can save $4,000-$7,000 in interest.",
    faq: [
      {
        q: "Should I refinance $60,000 in federal student loans?",
        a: "Refinancing from 5.8% to 4.5% saves $4,680 in total interest and drops your payment to $621, but you permanently lose access to income-driven repayment, deferment, and PSLF. This trade-off is reasonable only if you have stable private-sector employment, a credit score above 720, and no plans to work in public service. Keep at least one federal loan unrefinanced as a safety net if your income is variable.",
      },
      {
        q: "What repayment strategy works best for multiple loans totaling $60,000?",
        a: "The avalanche method — paying minimums on all loans while directing extra payments to the highest-rate balance first — saves the most money when your loans carry different interest rates. If you hold a $25,000 loan at 6.8% and a $35,000 loan at 5.0%, targeting the 6.8% loan first saves approximately $1,200 more than the snowball approach over the full payoff period. Automate minimum payments and manually apply all extra cash to the highest-rate loan each month.",
      },
      {
        q: "How can I reduce my monthly payment without extending to 25 years?",
        a: "Income-driven repayment on a $55,000 salary drops your payment to roughly $280-$320 per month, providing immediate relief during early career years. Biweekly half-payments of $330 every two weeks maintain the same monthly cash outflow while adding one extra payment per year, shortening payoff by 11 months and saving $2,100 in interest. Refinancing to a lower rate without extending the term is the third option, saving $39 per month while preserving a 10-year timeline.",
      },
    ],
  },
  {
    slug: "100000-loan",
    lastUpdated: "2026-09-01",
    title: "Student Loan Calculator for $100,000",
    description:
      "Tackle a $100,000 student loan balance at 6.0% interest. See your $1,110/mo standard payment, total cost of $133,224, and strategies to reduce interest and accelerate payoff.",
    defaults: { balance: "100000", interestRate: "6.0", termYears: "10" },
    intro:
      "A six-figure student loan balance is increasingly common among medical school graduates, law school alumni, MBA holders, and those who funded multiple degrees with federal and private borrowing. At $100,000, the standard 10-year payment exceeds $1,100/month -- more than many borrowers' rent. This level of debt demands a strategic approach: income-driven repayment during early career years, aggressive payoff once income rises, or Public Service Loan Forgiveness if you work in a qualifying nonprofit or government role.",
    tips: [
      "At 6.0% over 10 years, your monthly payment is $1,110 and total interest is $33,224, bringing total repayment to $133,224 -- a third more than you borrowed.",
      "Extending to a 20-year term drops the monthly payment to $716 but more than doubles total interest to $71,880, costing you an extra $38,656 over the life of the loan.",
      "If you qualify for PSLF (120 qualifying payments while working full-time for a nonprofit or government employer), your forgiven balance could be $50,000 to $70,000 -- making it the most powerful option at this debt level.",
      "Refinancing from 6.0% to 4.5% on a 10-year term saves $8,676 in interest and drops the monthly payment to $1,036, but only makes sense if you are confident you will not need IDR or PSLF.",
      "The $100,000 borrower earning $65,000 spends 20.5% of take-home pay on student loans under the standard plan -- well above comfort level. Starting on SAVE/IDR at roughly $350/month provides breathing room while income grows.",
    ],
    keyResults: [
      { label: "Standard Monthly Payment", value: "$1,110" },
      { label: "Total Interest (10 yr)", value: "$33,224" },
      { label: "Total Repayment", value: "$133,224" },
      { label: "IDR Payment ($65K salary)", value: "~$350/mo" },
      { label: "Potential PSLF Forgiveness", value: "$50,000-$70,000" },
      { label: "Income for Comfortable Repayment", value: "$130,000/yr" },
    ],
    comparisonNote:
      "A $100,000 balance more than doubles the monthly payment of a $40,000 loan ($1,110 vs $434) and adds $21,184 in additional interest over 10 years. At this level, repayment strategy becomes a career decision: PSLF can forgive $50,000-$70,000 for qualifying public service work, while private-sector borrowers with rising incomes benefit most from IDR during residency followed by aggressive payoff once earnings exceed $150,000.",
    faq: [
      {
        q: "Am I eligible for Public Service Loan Forgiveness with $100,000 in loans?",
        a: "PSLF requires 120 qualifying monthly payments while working full-time for a government agency or 501(c)(3) nonprofit, with all loans on an income-driven repayment plan. On a $65,000 starting salary, your IDR payment of roughly $350 per month over 10 years totals approximately $42,000 in payments, and the remaining $50,000-$70,000 balance is forgiven tax-free. Verify your employer's eligibility at studentaid.gov before relying on PSLF as your primary strategy.",
      },
      {
        q: "Should I extend to a 20-year term on a $100,000 student loan?",
        a: "Extending from 10 to 20 years drops your payment from $1,110 to $716, but more than doubles total interest from $33,224 to $71,880 — an extra $38,656 over the life of the loan. This extension only makes sense as a temporary bridge during residency, fellowship, or early career when income is below $80,000. Once your income exceeds $100,000, revert to standard or accelerated repayment to avoid paying interest for two decades.",
      },
      {
        q: "When does refinancing make sense for $100,000 in student debt?",
        a: "Refinancing from 6.0% to 4.5% on a 10-year term saves $8,676 in total interest and reduces your payment to $1,036, but permanently eliminates PSLF and IDR options. Refinance only after you have confirmed you will not pursue public service, your income is stable above $120,000, and you hold an emergency fund covering 6 months of expenses. Medical and dental residents should almost always stay on federal loans until their attending salary materializes.",
      },
    ],
  },
  {
    slug: "graduate-school",
    lastUpdated: "2026-09-01",
    title: "Graduate School Student Loan Calculator",
    description:
      "Calculate payments on an $80,000 graduate school loan at 7.0% over 15 years. Monthly payment is ~$719/mo. Explore refinancing, PSLF, and accelerated payoff strategies.",
    defaults: { balance: "80000", interestRate: "7.0", termYears: "15" },
    intro:
      "Graduate school loans typically carry higher interest rates than undergraduate borrowing -- Direct Unsubsidized loans for graduate students are priced at 7.05% for 2025-2026, and Grad PLUS loans reach 8.05%. An $80,000 balance on a 15-year term reflects a common outcome for master's degree programs in fields like education, social work, public policy, and the humanities where starting salaries may not immediately support aggressive repayment. Understanding the interplay between rate, term, and repayment plan is essential for managing graduate-level debt effectively.",
    tips: [
      "At 7.0% over 15 years, your monthly payment is $719 and total interest reaches $49,459 -- you repay $129,459 for an $80,000 loan, with interest exceeding 60% of the original principal.",
      "Switching to a 10-year term raises the payment to $929/month but slashes total interest to $31,449, a savings of $18,010 compared to the 15-year plan.",
      "If you work in public service, PSLF forgives remaining balance after 120 qualifying IDR payments. On a $55,000 salary, your SAVE payment would be roughly $185/month, and after 10 years of payments totaling approximately $22,200, the remaining $65,000+ balance is forgiven tax-free.",
      "Refinancing graduate loans from 7.0% to 5.0% over 10 years drops total interest from $49,459 to $21,859 and monthly payment from $719 to $849 -- a net savings of $27,600 but a higher monthly commitment.",
      "Graduate borrowers with both subsidized undergraduate and unsubsidized graduate loans should use the avalanche method, targeting the 7.0% graduate loans first while making minimums on 3.5-5.5% undergraduate loans.",
    ],
    keyResults: [
      { label: "Standard Monthly Payment", value: "$719" },
      { label: "Total Interest (15 yr)", value: "$49,459" },
      { label: "Total Repayment", value: "$129,459" },
      { label: "Payment on 10-yr Term", value: "$929/mo" },
      { label: "PSLF Forgiven Balance (est.)", value: "$65,000+" },
      { label: "Income for Comfortable Repayment", value: "$105,000/yr" },
    ],
    comparisonNote:
      "Graduate school loans at 7.0% over 15 years cost $18,010 more in total interest than a 10-year term, but the lower $719 payment provides breathing room during early career years when master's-level salaries often start at $45,000-$55,000. Compared to the $100,000 tier, graduate borrowers face a lower rate spread but longer default terms, making the IDR-to-aggressive-payoff transition the defining strategy rather than immediate standard repayment.",
    faq: [
      {
        q: "When should graduate borrowers switch from IDR to standard repayment?",
        a: "Start on an income-driven plan during the first 3-5 years when your salary is below $60,000 and IDR payments of $185-$280 per month are manageable. Once your income exceeds $75,000-$80,000, switch to a 10-year standard or refinanced plan to attack the remaining balance aggressively. Delaying this transition beyond year 5 adds $10,000-$15,000 in unnecessary interest because graduate loan rates of 7.0%+ compound quickly on large balances.",
      },
      {
        q: "Is refinancing graduate school loans a good idea at 7.0%?",
        a: "Refinancing from 7.0% to 5.0% over 10 years saves $27,600 in total interest but raises your monthly payment from $719 to $849. This makes sense once you have 2-3 years of stable employment, a credit score above 740, and confirmed you will not pursue PSLF. Borrowers in social work, education, and public policy should retain federal loan status because their career paths often qualify for PSLF forgiveness that exceeds refinancing savings.",
      },
      {
        q: "How does PSLF work for graduate school borrowers with $80,000 in loans?",
        a: "Graduate borrowers working in qualifying public service roles make 120 IDR payments over 10 years, after which the remaining balance is forgiven tax-free. On a $55,000 salary, your SAVE payment would be roughly $185 per month, totaling approximately $22,200 in payments over 10 years. The remaining $65,000+ balance is forgiven, making PSLF the most powerful strategy for graduate borrowers in nonprofit, government, and public-sector roles.",
      },
    ],
  },
];
