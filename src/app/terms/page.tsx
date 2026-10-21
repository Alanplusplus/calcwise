import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `${site.name} terms of service. Read about the terms and conditions for using our financial calculators.`,
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-ink-900">Terms of Service</h1>
      <p className="mt-2 text-sm text-ink-500">Last updated: October 2026</p>

      <div className="prose mt-8">
        <p>
          By accessing and using CalcWise ("the Site"), you agree to
          these Terms of Service. If you do not agree with any part of these
          terms, please do not use the Site.
        </p>

        <h2>Use of Service</h2>
        <p>
          CalcWise provides free online financial calculators and educational
          content. You may use our tools for personal, non-commercial purposes
          without creating an account or providing personal information.
        </p>

        <h2>Disclaimer — Not Financial Advice</h2>
        <p>
          <strong>
            The calculators, tools, and content on this website are for
            informational and educational purposes only. They do not constitute
            financial, tax, legal, or investment advice.
          </strong>
        </p>
        <p>
          Results produced by our calculators are estimates based on the inputs
          you provide and standard financial formulas. Actual results may differ
          due to fees, taxes, market conditions, lender-specific terms, or other
          factors not captured by our tools.
        </p>
        <p>
          Before making any significant financial decision, we strongly
          recommend consulting with a qualified financial advisor, tax
          professional, or other appropriate expert who can provide personalized
          guidance based on your specific circumstances.
        </p>

        <h2>Accuracy</h2>
        <p>
          We strive to maintain accurate and up-to-date calculators and content.
          However, we make no warranties or guarantees regarding the accuracy,
          completeness, or reliability of any information on this site. Financial
          laws, tax rules, and market conditions change frequently. Users are
          responsible for verifying any information before acting on it.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, CalcWise and its operators
          shall not be liable for any direct, indirect, incidental,
          consequential, or special damages arising from your use of or
          inability to use the Site, including but not limited to financial
          losses resulting from decisions made based on calculator outputs or
          content.
        </p>

        <h2>Intellectual Property</h2>
        <p>
          All content on this website — including text, design, graphics, code,
          and calculator logic — is the property of CalcWise and is protected by
          copyright law. You may not reproduce, distribute, or create derivative
          works from our content without written permission.
        </p>
        <p>
          You are welcome to link to any page on our site and to share
          calculator results for personal or educational purposes.
        </p>
        <p>
          Two exceptions apply. First, you may embed the calculators listed on
          our <Link href="/embed">embed page</Link> on your own website, including a
          commercial one, using the snippet provided there, provided the credit
          line below the frame stays in place. Second, the figures we calculate
          in our <Link href="/reports">data reports</Link> and the downloadable
          datasets that accompany them are licensed under{" "}
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noopener noreferrer"
          >
            CC BY 4.0
          </a>
          . You may copy and republish them, including commercially, with a link
          to the report. Public data that we reuse, such as Census Bureau
          figures, stays in the public domain.
        </p>

        <h2>Modifications</h2>
        <p>
          We reserve the right to modify, suspend, or discontinue any part of
          the Site at any time without notice. We may also update these Terms of
          Service periodically. Continued use of the Site after changes
          constitutes acceptance of the revised terms.
        </p>

        <h2>Governing Law</h2>
        <p>
          These terms are governed by the laws of the United States. Any
          disputes arising from the use of this Site shall be subject to the
          exclusive jurisdiction of the courts in the United States.
        </p>

        <h2>Contact</h2>
        <p>
          If you have questions about these terms, please contact us at{" "}
          <a href="mailto:hello@calcwise.tools">hello@calcwise.tools</a>.
        </p>
      </div>
    </div>
  );
}
