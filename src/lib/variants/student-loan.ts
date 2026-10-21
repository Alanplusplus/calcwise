import type { CalculatorVariant } from "./types";

const DIRECT_LOAN_RATES_2026_27 = {
  label:
    "FSA Partner Announcement GENERAL-26-33 (June 4, 2026) — 2026–27 Direct Loan fixed rates",
  href: "https://fsapartners.ed.gov/knowledge-center/library/electronic-announcements/2026-06-04/interest-rates-federal-direct-loans-first-disbursed-between-july-1-2026-and-june-30-2027",
};

const SAVE_ENDED = {
  label: "Federal Student Aid — SAVE Plan ended (court order, March 2026)",
  href: "https://studentaid.gov/articles/save/",
};

const RAP_OVERVIEW = {
  label: "U.S. Department of Education fact sheet — Repayment Assistance Plan (July 1, 2026)",
  href: "https://www.ed.gov/about/news/press-release/fact-sheet-trump-administration-making-higher-education-more-affordable-expanding-opportunity-and-simplifying-student-loan-repayment",
};

const SECTION_127 = {
  label: "IRS educational assistance FAQ — $5,250 employer student loan exclusion (2026)",
  href: "https://www.irs.gov/newsroom/updates-to-frequently-asked-questions-about-educational-assistance-programs",
};

/** Fixed undergraduate Direct Subsidized/Unsubsidized rate for loans first disbursed July 1, 2026–June 30, 2027. */
const UNDERGRAD_RATE = 6.52;
/** Graduate Direct Unsubsidized rate for the same award year. */
const GRAD_RATE = 8.07;

export const studentLoanVariants: CalculatorVariant[] = [
  {
    slug: "20000-loan",
    lastUpdated: "2026-10-21",
    title: "Student Loan Calculator for $20,000",
    description:
      "Calculate monthly payments on a $20,000 student loan at the 6.52% federal undergrad rate. See ~$227/mo over 10 years, total interest, and payoff with extra payments.",
    defaults: { balance: "20000", interestRate: "6.52", termYears: "10" },
    intro:
      "A $20,000 balance is typical for graduates who covered much of an in-state public degree with grants or part-time work. At the 6.52% fixed rate on new undergraduate Direct Loans disbursed between July 1, 2026 and June 30, 2027, the standard 10-year payment is about $227 — high enough to notice, but usually manageable on a full-time salary without income-driven repayment. Extra principal payments often beat refinancing at this balance because federal protections (deferment, RAP eligibility, PSLF on Direct Loans) are worth more than a small private rate discount.",
    tips: [
      "At 6.52% over 10 years, the standard payment is $227 and total interest reaches $7,276 — about 36% of the original principal.",
      "Adding $100 per month ($327 total) pays the loan off in roughly 6 years and 3 months and saves about $2,900 in interest versus the standard schedule.",
      "Refinancing $20,000 from 6.52% to 5.0% saves roughly $1,600 in total interest over 10 years — often less than $200 in extra payments over two years, without losing federal options.",
      "If you have multiple loans, direct every extra dollar to the highest rate (avalanche method). A $8,000 loan at 8.07% (graduate rate) and a $12,000 loan at 6.52% saves more interest than paying the smaller balance first.",
      "On a $48,000 salary with about $3,200 monthly take-home, a $227 payment is near 7% of net pay — below the common 10% comfort guideline for student debt.",
    ],
    keyResults: [
      { label: "Standard Monthly Payment", value: "$227" },
      { label: "Total Interest (10 yr)", value: "$7,276" },
      { label: "Total Repayment", value: "$27,276" },
      { label: "Payoff Timeline (standard)", value: "10 years" },
      { label: "Payoff with $100/mo Extra", value: "~6.3 years" },
      { label: "Income for Comfortable Repayment", value: "$48,000/yr" },
    ],
    comparisonNote:
      "At $20,000 and 6.52%, the $227 standard payment is about half the $455 owed on a $40,000 balance at the same rate, and total interest stays under $7,300. This tier rarely requires Repayment Assistance Plan (RAP) payments once full-time wages arrive, so aggressive payoff or modest extras usually beat refinancing fees and lost federal protections.",
    faq: [
      {
        q: "Should I use RAP or the standard plan on a $20,000 loan?",
        a: "On a salary above $45,000, the standard 10-year $227 payment is usually cheaper long term than stretching payments under RAP for 30 years. RAP helps when income drops — payments can fall to the $10 monthly floor with interest subsidies while you stay current — but it extends the timeline. Use RAP temporarily during unemployment or a low-paid fellowship, then switch back to standard or extra payments when wages recover.",
      },
      {
        q: "Is refinancing worth it for a $20,000 student loan balance?",
        a: "Private refinancing might cut 1–1.5 points off 6.52%, saving roughly $1,500–$2,000 total on $20,000. That may not justify losing deferment, death/discharge protections, and PSLF eligibility on Direct Loans. Pursue refinancing only with stable W-2 income, a credit score above 700, and an emergency fund covering six months of expenses.",
      },
      {
        q: "How quickly can I pay off $20,000 in student loans?",
        a: "An extra $100 per month on top of the $227 standard payment clears the balance in about 75 months (six years and three months) and saves roughly $2,900 in interest at 6.52%. Even $50 extra per month trims about 18 months off the term and saves near $1,500 in interest.",
      },
    ],
    sources: [DIRECT_LOAN_RATES_2026_27, RAP_OVERVIEW],
    sourcesChecked: "October 2026",
    sourcesNote:
      "Payment and interest totals match this site's student loan calculator for each variant's pre-filled inputs.",
  },
  {
    slug: "40000-loan",
    lastUpdated: "2026-10-21",
    title: "Student Loan Calculator for $40,000",
    description:
      "Run the numbers on a $40,000 student loan at 6.52%. Standard payment is ~$455/mo for 10 years — see total interest, RAP trade-offs, and employer assistance.",
    defaults: { balance: "40000", interestRate: "6.52", termYears: "10" },
    intro:
      "Forty thousand dollars sits near typical undergraduate borrowing for a four-year degree with partial aid. At the 6.52% undergraduate Direct Loan rate for 2026–27 disbursements, the standard payment is about $455 per month — a line item that belongs in any post-grad budget. Employer Section 127 assistance (up to $5,250 tax-free per year in 2026) and targeted extra payments can shave years off the term without giving up federal loan protections.",
    tips: [
      "The standard 10-year payment at 6.52% is $455, with $14,552 in total interest — you repay $54,552 on a $40,000 loan.",
      "Paying $600 per month ($145 extra) retires the balance in about seven years and saves roughly $4,750 in interest compared with minimum payments.",
      "Employer educational assistance can pay up to $5,250 per year toward your loans tax-free when offered through a written Section 127 plan — applying the full amount each year cuts payoff time materially on this balance.",
      "RAP payments on a $50,000 salary might fall near $200–$350 per month depending on dependents, but the 30-year RAP term can add tens of thousands in interest versus the $455 standard payment once income rises.",
      "Refinancing to 5.0% over seven years raises the payment to about $566 but can save $4,000+ in interest if you will never need IDR or PSLF — verify the math against your servicer quote.",
    ],
    keyResults: [
      { label: "Standard Monthly Payment", value: "$455" },
      { label: "Total Interest (10 yr)", value: "$14,552" },
      { label: "Total Repayment", value: "$54,552" },
      { label: "Payoff Timeline (standard)", value: "10 years" },
      { label: "Payoff at $600/mo", value: "~7 years" },
      { label: "Income for Comfortable Repayment", value: "$68,000/yr" },
    ],
    comparisonNote:
      "At 6.52%, a $40,000 balance doubles the $20,000 tier payment ($455 vs $227) and adds $7,276 in interest. Compared with $60,000 ($682 standard payment), you keep $227 per month in cash flow — enough to fund a Roth IRA contribution or build a three-month emergency reserve while still paying aggressively.",
    faq: [
      {
        q: "When should I refinance a $40,000 student loan?",
        a: "Refinancing makes sense with a credit score above 700, stable employment, and a rate at least 1.25 points below 6.52% on a term no longer than 10 years. Dropping to 5.0% on a seven-year schedule raises payments but saves several thousand in interest. Skip refinancing if you work in public service, might use RAP during a career change, or lack cash reserves.",
      },
      {
        q: "How does employer student loan assistance affect a $40,000 balance?",
        a: "IRC Section 127 lets employers exclude up to $5,250 per calendar year in 2026 for student loan payments and other educational assistance combined. On $40,000 at 6.52%, applying $5,250 annually plus your own standard payments can pull payoff forward by several years. Ask HR for a written educational assistance plan — the benefit is not automatic without employer adoption.",
      },
      {
        q: "Is income-driven repayment a good option at the $40,000 balance level?",
        a: "RAP can lower payments when AGI is limited, but the 30-year RAP timeline often costs more total interest than the $455 standard plan once you earn above $55,000. Treat RAP as a bridge during low-income years, then revert to standard or accelerated payments when wages rise.",
      },
    ],
    sources: [DIRECT_LOAN_RATES_2026_27, SECTION_127, RAP_OVERVIEW],
    sourcesChecked: "October 2026",
  },
  {
    slug: "60000-loan",
    lastUpdated: "2026-10-21",
    title: "Student Loan Calculator for $60,000",
    description:
      "Plan repayment for $60,000 in student loans at 6.52%. Standard payment ~$682/mo over 10 years — compare RAP, refinancing, and avalanche payoff.",
    defaults: { balance: "60000", interestRate: "6.52", termYears: "10" },
    intro:
      "Sixty thousand dollars often reflects private school costs, multiple semesters without grants, or a mix of undergraduate and graduate borrowing. At 6.52% on undergraduate Direct Loans (or a weighted average if rates differ by disbursement year), the standard payment is about $682 — enough to strain entry-level budgets. New borrowers after July 1, 2026 must use RAP or Tiered Standard plans for new debt, while existing borrowers can still compare legacy IDR options where eligible.",
    tips: [
      "At 6.52% over 10 years, the monthly payment is $682 and total interest is $21,828 — total repayment of $81,828.",
      "On a $55,000 salary with roughly $3,400 monthly take-home, $682 is about 20% of net pay — above the 10% guideline and a signal to use RAP temporarily or increase income before staying on standard payments long term.",
      "Refinancing to 5.0% over 10 years drops the payment to about $636 and saves roughly $5,500 in interest, but forfeits PSLF and federal deferment.",
      "Avalanche payoff matters here: if $25,000 sits at 8.07% (graduate Direct Unsubsidized) and $35,000 at 6.52%, paying the 8.07% loan first saves more than snowballing the smaller balance.",
      "Biweekly half-payments ($341 every two weeks) add one full payment per year and can shorten a 10-year schedule by about 10–12 months, saving near $2,000 in interest at this balance.",
    ],
    keyResults: [
      { label: "Standard Monthly Payment", value: "$682" },
      { label: "Total Interest (10 yr)", value: "$21,828" },
      { label: "Total Repayment", value: "$81,828" },
      { label: "Payoff Timeline (standard)", value: "10 years" },
      { label: "Share of $55K Take-Home Pay", value: "~20%" },
      { label: "Income for Comfortable Repayment", value: "$88,000/yr" },
    ],
    comparisonNote:
      "The $682 payment at $60,000 is $227 higher than the $40,000 tier and $455 lower than the six-figure tier. Total interest of $21,828 is the tipping point where employer assistance, side income, or PSLF planning becomes worth the paperwork — especially if any portion of the debt is graduate-rate at 8.07%.",
    faq: [
      {
        q: "Should I refinance $60,000 in federal student loans?",
        a: "A move from 6.52% to 5.0% saves roughly $5,000–$6,000 over 10 years but permanently removes PSLF and RAP options. Refinance only with stable private-sector income, no near-term public service plans, and at least one month of expenses saved for every $100 of monthly payment ($6,800+ reserve at the $682 standard payment).",
      },
      {
        q: "What repayment strategy works best for multiple loans totaling $60,000?",
        a: "List each loan's balance and rate, pay minimums on all, and send extras to the highest rate. On a $25,000 balance at 8.07% and $35,000 at 6.52%, every $100 extra on the 8.07% loan saves more interest than putting it on the undergrad-rate portion.",
      },
      {
        q: "How can I reduce my monthly payment without a 30-year term?",
        a: "RAP can cut payments when AGI is low, with a $10 floor and interest subsidies while payments stay current. Tiered Standard offers fixed terms of 10–25 years based on total debt. Biweekly payments keep the 10-year spirit while adding an extra principal payment each year.",
      },
    ],
    sources: [DIRECT_LOAN_RATES_2026_27, RAP_OVERVIEW],
    sourcesChecked: "October 2026",
  },
  {
    slug: "100000-loan",
    lastUpdated: "2026-10-21",
    title: "Student Loan Calculator for $100,000",
    description:
      "Model a $100,000 student loan at 6.52%. Standard payment ~$1,137/mo, $136,380 total repayment — PSLF, RAP, and refinance trade-offs.",
    defaults: { balance: "100000", interestRate: "6.52", termYears: "10" },
    intro:
      "Six-figure student debt is common among medical, dental, law, and MBA graduates carrying graduate Direct Unsubsidized loans at 8.07% or PLUS loans at 9.07% for 2026–27 disbursements. This variant uses 6.52% as a blended undergraduate-weighted example; your servicer's weighted average may be higher. At $100,000 and 6.52%, the standard 10-year payment is about $1,137 — often rivaling rent. Strategy shifts to PSLF for qualifying employers, RAP during training years, or aggressive payoff once attending-level income arrives.",
    tips: [
      "At 6.52% over 10 years, the payment is $1,137 with $36,380 in interest — $136,380 total repayment.",
      "Stretching to 20 years at 6.52% drops the payment to about $747 but raises total interest to roughly $79,220 — an extra $42,840 versus the 10-year plan.",
      "PSLF forgives remaining Direct Loan balances after 120 qualifying payments while working for government or 501(c)(3) employers — often the dominant strategy when IDR payments are far below standard.",
      "Refinancing $100,000 from 6.52% to 5.0% on a 10-year term saves about $8,500 in interest and cuts the payment to roughly $1,061, but eliminates PSLF permanently.",
      "Grad PLUS for new borrowers ends after June 30, 2026 under the Working Families Tax Cuts Act — professional students disbursing after that date face different borrowing caps; confirm award letters before assuming PLUS availability.",
    ],
    keyResults: [
      { label: "Standard Monthly Payment", value: "$1,137" },
      { label: "Total Interest (10 yr)", value: "$36,380" },
      { label: "Total Repayment", value: "$136,380" },
      { label: "20-Year Payment (6.52%)", value: "~$747/mo" },
      { label: "PSLF Path", value: "120 qualifying IDR/RAP payments" },
      { label: "Income for Comfortable Repayment", value: "$135,000/yr" },
    ],
    comparisonNote:
      "A $100,000 balance at 6.52% more than doubles the $40,000 payment ($1,137 vs $455) and adds $21,828 in interest versus the $60,000 tier's total. At this scale, a 0.5% rate reduction is worth $5,000+ over 10 years — but only after ruling out PSLF and verifying you will not need RAP during residency or fellowship.",
    faq: [
      {
        q: "Am I eligible for Public Service Loan Forgiveness with $100,000 in loans?",
        a: "PSLF requires Direct Loans, qualifying full-time employment (government or 501(c)(3)), and 120 qualifying payments on an IDR plan or RAP. Certify employment annually at studentaid.gov. For high-balance borrowers in public hospitals or legal aid, forgiven amounts can exceed $50,000 — but only payments made after enrolling in a qualifying plan count.",
      },
      {
        q: "Should I extend to a 20-year term on a $100,000 student loan?",
        a: "Moving from 10 to 20 years at 6.52% cuts the payment from $1,137 to about $747 but adds roughly $42,840 in interest. Use a longer term only as a temporary bridge during low-income training, then switch to standard or extra payments when salary exceeds $120,000.",
      },
      {
        q: "When does refinancing make sense for $100,000 in student debt?",
        a: "Refinance after you rule out PSLF, hold stable income well above $130,000, and receive a rate at least 1 point below your weighted average. Medical residents should almost always keep federal loans until attending wages arrive — the PSLF and RAP flexibility is worth more than a private rate quote during training.",
      },
    ],
    sources: [DIRECT_LOAN_RATES_2026_27, SAVE_ENDED, RAP_OVERVIEW],
    sourcesChecked: "October 2026",
    sourcesNote:
      "Graduate Direct Unsubsidized loans disbursed July 1, 2026–June 30, 2027 carry an 8.07% fixed rate; PLUS loans carry 9.07%. Blend your actual rates in the calculator.",
  },
  {
    slug: "graduate-school",
    lastUpdated: "2026-10-21",
    title: "Graduate School Student Loan Calculator",
    description:
      "Calculate payments on an $80,000 graduate loan at 8.07% over 15 years. Monthly payment ~$768 — compare 10-year payoff, PSLF, and refinance.",
    defaults: { balance: "80000", interestRate: "8.07", termYears: "15" },
    intro:
      "Graduate Direct Unsubsidized loans disbursed July 1, 2026 through June 30, 2027 carry a fixed 8.07% rate — up from the 7.05%–7.94% range many 2024–25 borrowers hold. An $80,000 balance on a 15-year schedule reflects common master's-level borrowing in education, social work, and public policy where starting salaries may sit in the $45,000–$55,000 range. New Grad PLUS borrowing for students who had no prior PLUS loans before July 1, 2026 ended with the 2025–26 award year; check your financial aid offer before assuming PLUS availability.",
    tips: [
      "At 8.07% over 15 years, the payment is $768 with $58,196 in total interest — $138,196 total repayment on $80,000 borrowed.",
      "Switching to a 10-year term raises the payment to about $974 but cuts total interest to $36,830 — saving $21,366 versus the 15-year schedule.",
      "PSLF with RAP payments during public service can forgive remaining balances after 120 qualifying payments; low AGI years keep payments manageable while employment is certified.",
      "Refinancing from 8.07% to 6.0% over 10 years saves roughly $10,000 in interest but raises the monthly commitment versus a 15-year federal schedule.",
      "If you still carry undergraduate debt at 6.52%, avalanche extra payments toward the 8.07% graduate loans while paying minimums on the lower-rate undergrad notes.",
    ],
    keyResults: [
      { label: "Standard Monthly Payment (15 yr)", value: "$768" },
      { label: "Total Interest (15 yr)", value: "$58,196" },
      { label: "Total Repayment", value: "$138,196" },
      { label: "Payment on 10-yr Term", value: "$974/mo" },
      { label: "Interest Saved (10 vs 15 yr)", value: "$21,366" },
      { label: "Income for Comfortable Repayment", value: "$110,000/yr" },
    ],
    comparisonNote:
      "Graduate borrowing at 8.07% costs $21,366 more in interest on a 15-year path than accelerating to 10 years, but the $768 payment buys breathing room during early-career salaries near $50,000. Compared with the $100,000 tier at 6.52%, graduate-rate debt demands faster payoff or PSLF planning because each extra year at 8%+ compounding adds thousands in interest.",
    faq: [
      {
        q: "When should graduate borrowers switch from RAP to standard repayment?",
        a: "Start on RAP when AGI is below $60,000 and standard payments would consume more than 15% of take-home pay. Once income clears $75,000–$80,000, move to a 10-year standard or fixed private refinance to attack principal — staying on low RAP payments while earning six figures often adds $10,000+ in unnecessary interest at 8%+ rates.",
      },
      {
        q: "Is refinancing graduate school loans a good idea at 8.07%?",
        a: "Refinancing to 6.0% over 10 years saves roughly $10,000 in total interest but requires a $974 payment versus $768 on 15 years. It fits borrowers with two to three years of stable W-2 history, credit scores above 740, and no PSLF path. Social work and education graduates in nonprofit roles should usually keep federal status for PSLF instead.",
      },
      {
        q: "How does PSLF work for graduate borrowers with $80,000 in loans?",
        a: "Make 120 qualifying monthly payments under RAP or another eligible IDR plan while working full time for a qualifying employer. Certify employment each year. Forgiven amounts are tax-free under current law for PSLF — verify eligibility at studentaid.gov before counting on forgiveness instead of refinance savings.",
      },
    ],
    sources: [DIRECT_LOAN_RATES_2026_27, RAP_OVERVIEW],
    sourcesChecked: "October 2026",
  },
];
